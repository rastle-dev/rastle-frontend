
# RECORDY SLOW

> @rastle__fashion 팔로워들이 주 고객층인 쇼핑몰 레코디 슬로우의 프로토타입 버전 쇼핑몰입니다.

## 배포 링크 
> www.recordyslow.com

**서비스 종료 후 배포 링크를 www.rastle.site로 변경하였습니다!**

## 목차
- **[고객 이용 페이지 주요 기능](#고객-이용-페이지-주요-기능)** 
- **[관리자 페이지 주요 기능](#관리자-페이지-주요-기능)**
- **[SEO 향상을 위한 노력](#seo-향상을-위한-노력)**
- **[웹페이지 최적화를 위한 노력](#웹페이지-최적화를-위한-노력)**
- **[기술 스택](#기술-스택)**
- **[시스템 아키텍쳐](#시스템-아키텍쳐)**

<br/>

## 주요 기능
> **고객 이용 페이지**, **관리자 페이지**로 구분되어있어요.
> <br/>
> 관리자 페이지의 경우, 특정 아이디로만 이용 가능해요.

<br/>

## 고객 이용 페이지 주요 기능
> 고객이 이용하는 모든 페이지는 반응형으로 구현되어있어요. 모바일부터 데스크톱까지 모두 이용 가능하게 반응형으로 구현했어요.

### 회원가입 및 로그인
> 소셜 계정을 통해 간편하게 회원가입 및 로그인이 가능해요.

### 메인 페이지 및 제품 페이지
> 메인 페이지에서는 대표 제품들을 한눈에 볼 수 있어요.
> <br/>
> 제품 사진에 마우스를 가져다 놓으면, 제품의 다른 사진을 볼 수 있어요.
> <br/>
> 제품 페이지에서는 카테고리별로 인기순, 신상품순으로 제품을 볼 수 있어요.
> <br/>
> 제품을 클릭 시 제품 상세 페이지로 이동해요.
> <br/>
> <br/>
![GIFMaker_me (3)](https://github.com/rastle-dev/rastle-frontend/assets/97940568/245643a2-d500-4509-a5a6-64f696eb4ccc)


### 제품 상세 페이지
> 스와이프를 통해 대표 제품 사진들을 확인 가능해요.
> <br/>
> 색상을 선택 후 사이즈를 선택할 수 있게 함으로써, 사용자 경험을 향상시켰어요.
> <br/>
> 구매하기 버튼을 클릭하여, 결제 페이지로 바로 이동 or 장바구니에 해당 상품을 담고 쇼핑을 계속할 수 있어요.
> <br/>
> <br/>
![GIFMaker_me (4)](https://github.com/rastle-dev/rastle-frontend/assets/97940568/1844b1c0-3b9e-4561-8970-b6876947dd5d)


### 응모 상세 페이지
> 응모에 참여한 사용자에 한해 추첨을 통해 제품을 주는 응모 페이지에요.
> <br/>
> 남은 시간과 응모에 참여한 사용자 수를 확인 가능해요.
> <br/>
> 추후에 **마이페이지 -> 응모내역**에서 번호 및 인스타그램 아이디를 수정할 수 있어요.
> <br/>
> <br/>
![GIFMaker_me (1)](https://github.com/rastle-dev/rastle-frontend/assets/97940568/3da75f0a-33ae-4815-8004-d67fbd721c5f)


### 코디 제품 페이지
> 제품 페이지에 등장하는 제품들은 대부분 코디제품들로 연관 관계가 되어있어요.
> <br/>
> 같은 코디로 분류된 제품들은 코디 소개 하단에 해당 제품들로 소개 되어요.

### 마이 페이지
> 주문내역, 장바구니, 로그인 정보, 기본 배송지, 쿠폰함 카테고리가 있어요.
> <br/>
> 주문별, 제품별로 현재 배송 상태를 추적할 수 있고, 주문 내역을 상세 조회할 수 있어요.
> <br/>
> 장바구니에 담은 제품들을 관리 및 구매할 수 있어요.
> <br/>
> 기본 배송지 및 비밀번호를 변경이 가능해요.

### 결제 페이지
> 제품 상세페이지, 장바구니 경로에서 접근 가능해요.
> <br/>
> 기본 배송지를 불러오거나, 신규 배송지를 입력할 수 있어요. 새로 입력한 배송지를 기본 배송지로 등록 가능해요.
> <br/>
> **PortOne** 플랫폼을 이용하여 실제 결제 시스템을 연동했어요.

### 주문 취소 및 환불 페이지
> **마이페이지 -> 주문내역 -> 주문 상세 내역 조회 -> 취소 및 환불 요청 버튼 클릭** 을 통해 주문 취소 및 환불이 가능해요.
> <br/>
> 하나의 주문 내에 여러 제품이 있는 경우, 부분 주문 취소 및 부분 환불 취소 가능하게 구현했어요.

<br/>
<br/>

## 관리자 페이지 주요 기능
> **제품들의 사진 및 정보**(사이즈,색상,코디상품 여부)를 등록하고 업로드해요.
> <br/>
> **이벤트 상품**을 **이벤트 참여 가능 기간**과 함께 업로드해요. 이벤트에 참여한 사용자들을 호출할 수 있어요.
> <br/>
> **주문 내역**을 불러오고, **취소 및 환불 요청이 들어온 주문들을 처리**해요.
> <br/>
> 취소 및 환불이 들어온 요청들은 처리 즉시, **웹훅이 호출되어 고객에게 환불처리** 돼요.
> <br/>
> 배송 준비가 완료된 제품들은 **송장번호를 등록**해요.(등록, 수정, 삭제 가능)

<br/>
<br/>

## SEO 향상을 위한 노력
> 한번 등록되면 잘 수정하지 않는 제품의 정보들은 SSG, SSR로 호출하여 SEO를 향상시켰어요.
><br/>
> 최신화된 구글 SEO 방침을 적용하여, 각 페이지마다 적절한 스니펫을 적용하여 SEO를 향상시켰어요.
> <br/>
> 구글 검색 시, 향상된 SEO를 확인해볼 수 있어요.
> 

<br/>

## 웹페이지 최적화를 위한 노력
> Next/image를 활용하여 초기 뷰포인트 로딩시간을 대폭 감소시켰어요.
> <br/>
> 폰트 확장자 otf → woff2로 변경 및 font-display를 활용하여 폰트 로딩시간을 감소시켰어요.
> <br/>
> [Error Boundary](https://github.com/rastle-dev/rastle-frontend/pull/36)를 구축하여 사용자가 화면에 갇히는 상황을 방지했어요.
  
<br/>
<br/>

## 기술 스택
| 분류 | 스택 |
|---------|---------|
| 코어   | <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"> |
| 패키지 매니저   | <img src="https://img.shields.io/badge/yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white"> |
| 상태 관리   | <img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"> <img src="https://img.shields.io/badge/recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white"> |
| 스타일   | <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"> <img src="https://img.shields.io/badge/storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white"> |
| 린트   | <img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"> <img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white"> |
| 테스트   | <img src="https://img.shields.io/badge/cypress-69D3A7?style=for-the-badge&logo=cypress&logoColor=white"> <img src="https://img.shields.io/badge/chromatic-FC521F?style=for-the-badge&logo=chromatic&logoColor=white">    |
| CI/CD   | <img src="https://img.shields.io/badge/githubactions-2088FF?style=for-the-badge&logo=cypress&logoColor=white"> |
| 배포   | <img src="https://img.shields.io/badge/awsamplify-FF9900?style=for-the-badge&logo=awsamplify&logoColor=white"> <img src="https://img.shields.io/badge/amazonroute53-8C4FFF?style=for-the-badge&logo=amazonroute53&logoColor=white"> |
| 협업   | <img src="https://img.shields.io/badge/jira-0052CC?style=for-the-badge&logo=jira&logoColor=white"> <img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"> <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"> | 
<br/>
<br/>




## 시스템 아키텍쳐
![system](https://github.com/rastle-dev/rastle-frontend/assets/97940568/2f55d60e-c43a-4280-9274-04f91bd7f8d1)










