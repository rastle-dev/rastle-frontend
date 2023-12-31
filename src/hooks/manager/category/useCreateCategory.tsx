import { adminCreateCategory } from "@/api/admin";
import useInput from "@/hooks/useInput";

export default function useCreateCategory() {
  const [name, onChangeName, setName] = useInput("");
  const createCategory = async () => {
    if (name.length > 0) {
      try {
        const shouldCreate = window.confirm(
          `'${name}'을(를) 추가하시겠습니까?`,
        );

        if (shouldCreate) {
          const data = await adminCreateCategory({ name });
          console.log(data);
          alert("카테고리 생성을 성공했습니다");
          setName("");
        } else {
          alert("카테고리 추가가 취소되었습니다");
        }
      } catch (error) {
        console.error("카테고리 생성 중 오류 발생:", error);
      }
    } else {
      alert("카테고리 이름을 한글자 이상 적어주세요");
    }
  };

  return {
    createCategory,
    onChangeName,
    name,
  };
}
