import axios from "axios";
import PATH from "@/constants/path";
import toastMsg from "@/components/Toast";
import API from "./config";

axios.defaults.baseURL = API.BASE_URL;
axios.defaults.withCredentials = true;

// 사용자가 인증되지 않은 상태로 간주되면, 로컬 스토리지를 비우고 메인 화면으로 리디렉션하는 역할 수행
const handleUnauthorized = () => {
  localStorage.clear();
  window.location.href = PATH.LOGIN;
};

// axios.create()함수를 사용하여 새로운 Axios 인스턴스를 생성
// 이 인스턴스는 api 요청을 보낼때 인증에 필요한 설정과 헤더를 가지고있음
const authorizationClient = axios.create({
  baseURL: "https://api.recordyslow.com",
  withCredentials: true, // 요청보낼 때 자격 증명 정보(인증 헤더 등)을 포함시킴
});
const unAuthorizationClient = axios.create({
  baseURL: "https://api.recordyslow.com",
  withCredentials: true,
});

// Axios 인스턴스에 요청 인터셉터를 추가하는 부분
// API 요청이 전송되기 전에 실행되며, 요청 구성(config)을 조작하여 헤더에 인증 정보를 추가하는 역할 수행
// 즉 모든 API 요청이 전송되기 전에 헤더에 인증 정보를 추가하는 역할 수행
// 헤더에 accessToken을 담음
authorizationClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    return Object.assign(config, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
  return config;
});

// 엑세스 토큰을 가져오는 중인지 여부를 나타냄
let isAlreadyFetchingAccessToken = false;
type Subscriber = (accessToken: string) => void;
// 엑세스 토큰 갱신 후에 실행할 콜백 함수들을 저장하는 배열
let subscribers: Subscriber[] = [];
// 새로운 콜백함수를 subscribers 배열에 추가하는 역할
function addSubscriber(callback: Subscriber) {
  subscribers.push(callback);
}
// 엑세스 토큰을 가져왔을 때 호출됨
// subscribers 배열에 저장된 모든 콜백 함수를 실행함
// 실행 후에는 subscrbers 배열을 초기화하여 새로운 엑세스 토큰을 받을 준비함.
function onAccessTokenFetched(accessToken: string) {
  subscribers.forEach((callback) => callback(accessToken));
  subscribers = [];
}
/*
 이러한 기능들을 통해 엑세스 토큰을 갱신하고 관리하는 동안 필요한 작업을 처리할 수 있음
 엑세스 토큰이 만료되었을 때 이전 요청을 일시 중지하고 엑세스 토큰을 갱신한 후에 다시 요청을 수행하는 등의 작업이 가능
 다시 새로운 subscribers를 추가하고 엑세스 토큰이 갱신되면 실행해서 이전 요청을 재시도
 */

// 이 함수는 엑세스 토큰을 재발급하고 원래의 요청을 재시도하는 기능을 맡음
// 말그대로 토큰을 리셋하고 request를 재시도
async function resetTokenAndReattemptRequest(error: any) {
  try {
    const { response: errorResponse } = error; // 요청에 대한 에러 응답 정보 추출
    console.log(error);
    // 엑세스 토큰을 얻었을 때, 원래의 요청을 재시도하는데 사용
    const retryOriginalRequest = new Promise((resolve, reject) => {
      addSubscriber(async (accessToken: string) => {
        // 엑세스 토큰을 매개변수로 받아
        try {
          // 받은 엑세스토큰을 에러 헤더에 넣고, 요청을 재시도하는데 사용하는 authorizationClient 호출
          errorResponse.config.headers.Authorization = `Bearer ${accessToken}`;
          resolve(authorizationClient(errorResponse.config));
        } catch (err) {
          reject(err);
        }
      });
    });

    // 이미 엑세스 토큰을 가져오고 있는지 판단
    if (!isAlreadyFetchingAccessToken) {
      console.log("리이슈ㅠ1");
      isAlreadyFetchingAccessToken = true;
      await unAuthorizationClient
        // 재발급 요청하고 새로 받은 액세스 토큰을 로컬 스토리지에 저장
        .post(API.REISSUE)
        .then(({ headers }: { headers: any }) => {
          console.log("넘어왔나?", headers);
          const token = headers.authorization.replace("Bearer ", "");
          console.log("리이슈 체킹", token);
          localStorage.setItem("accessToken", token);
          isAlreadyFetchingAccessToken = false;
          onAccessTokenFetched(token);
        })
        .catch((err) => {
          // 요청 실패시
          // toastMsg("로그인 정보가 없어 메인 화면으로 이동합니다.");
          console.log("토큰 재발급 실패");
          handleUnauthorized();
          return Promise.reject(err);
        });
    }
    // 엑세스 토큰을 재발급하고 난 후 이전에 실패한 원래 요청을 재시도
    return await retryOriginalRequest;
  } catch (refreshError) {
    toastMsg("로그인 정보가 없어 메인 화면으로 이동합니다.");
    handleUnauthorized();
    return Promise.reject(refreshError);
  }
}

authorizationClient.interceptors.response.use(
  (response) => {
    return response; // 서버로부터 받은 응답 객체
  },
  // 서버로부터 받은 응답이 에러인 경우
  async function (error) {
    console.log("error", error);
    console.log("에러를 잡아줘", error.message);
    console.log("에러를 잡아줘", error.message.includes("401"));
    console.log("에러를 잡아줘", error.response.data.errorCode);
    if (
      // 401 인증에러이면서 로컬 스토리지에 엑세스 토큰이 존재하는 경우
      error.response.data.errorCode === 401 &&
      localStorage.getItem("accessToken")
    ) {
      // 엑세스 토큰을 재발급하고 요청을 다시 시도
      return resetTokenAndReattemptRequest(error);
    }
    // 에러 거부하고 호출자한테 반환 -> 인증 에러가 아닌 다른 에러일 경우에 해당
    return Promise.reject(error);
  },
);

unAuthorizationClient.interceptors.response.use(
  (response) => {
    // 특정 도메인에 대한 접근 허용, 로그인을 하지 않은 인증되지 않은 사용자니까
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000";
    return response;
  },
  (error) => {
    console.error("[Axios]", error);
    return Promise.reject(error);
  },
);

export { authorizationClient, unAuthorizationClient };

/*
1. 엑세스 토큰
유효기간: 보통 몇 분~몇 시간
2. 리프레시 토큰
유효기간: 보통 몇 일 ~ 몇 주, 몇 달
ex> 엑세스 토큰 : 30분 , 리프레시 토큰 : 1주일
-> 사용자가 로그인하고 30분동안 로그인 상태가 유지되며 엑세스 토큰도 유지가 됨. 30분이 지나면 서버로 reissue 요청을 보내서 새로운 엑세스 토큰을 발급 받고 해당 엑세스 토큰도 30분 유지가 됨
   리프레시 토큰 유효 기간( 1주일 ) 동안은 계속 엑세스 토큰 reissue 요청이 가능함. 그리고 그 리프레시 토큰 기간은 마지막 엑세스 토큰 요청 시간 부터 1주일임
   즉, 리프레시 토큰이 만료가 되면 리이슈 요청이 불가능하며 재로그인해야함.

   ( 엑세스 토큰이 만료가 되면 하던 모든 동작이 일시정지되고 새로 받은 엑세스 토큰을 확인해 그 동작들을 이어서 처리할지 결정 )
 */
