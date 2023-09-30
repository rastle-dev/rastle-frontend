import { adminCreateCategory, adminUpdateCategory } from "@/api/admin";
import useInput from "@/hooks/useInput";
import { useState } from "react";

interface Category {
  id: number;
  name: string;
}

export default function useUpdateCategory() {
  const [name, onChangeName, setName] = useInput("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  ); // 선택된 카테고리 상태 추가

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category); // 목록에서 카테고리 선택
    console.log(selectedCategory);
  };

  const updateCategory = async () => {
    try {
      const shouldCreate = window.confirm(
        `'${selectedCategory?.name}'을  '${name}' 으로 변경하시겠습니까? `,
      );

      if (shouldCreate) {
        const data = await adminUpdateCategory(selectedCategory?.id, { name });
        console.log(data);
        alert("카테고리 수정을 성공했습니다");
      } else {
        alert("카테고리 수정이 취소되었습니다");
      }
    } catch (error) {
      console.error("카테고리 수정 중 오류 발생:", error);
    }
  };

  return {
    updateCategory,
    onChangeName,
    name,
    handleCategoryClick,
    selectedCategory,
  };
}
