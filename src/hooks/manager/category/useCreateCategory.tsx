import { adminCreateCategory } from "@/api/admin";
import useInput from "@/hooks/useInput";

export default function useCreateCategory() {
  const [name, onChangeName] = useInput("");

  const createCategory = async () => {
    try {
      const data = await adminCreateCategory({ name });
      console.log(data);
    } catch (error) {
      console.error("카테고리 생성 중 오류 발생:", error);
    }
  };

  return {
    createCategory,
    onChangeName,
    name,
  };
}
