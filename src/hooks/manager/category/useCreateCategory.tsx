import { adminCreateCategory } from "@/api/admin";
import useInput from "@/hooks/useInput";

export default function useCreateCategory() {
  const [name, onChangeName] = useInput("");

  const createCategory = async () => {
    const data = await adminCreateCategory({ name });
    console.log(data);
  };

  return {
    createCategory,
    onChangeName,
    name,
  };
}
