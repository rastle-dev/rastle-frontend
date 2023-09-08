import { useState } from "react";
interface SelectedProduct {
  title?: string;
  price: number;
  color?: string | null;
  size?: string | null;
  count: number;
  key?: string;
}

export default function useProduct() {
  // TODO: 의성) 실제 데이터 api호출로 추가 , 비동기처리 주의해야함
  const jsonData = {
    images: [
      "/image/product5.jpg",
      "/image/product6.jpg",
      "/image/product1.jpg",
      "/image/whiteBackground.png",
    ],
    title: "틴 워시드 버뮤다 데님 팬츠",
    price: 56200,
    colors: ["화이트", "블랙", "블루"],
    sizes: ["M", "L"],
    remain: {
      M: 3,
      L: 4,
    },
    imageDetails: ["/image/product5.jpg", "/image/homeDesktop2.jpg"],
  };

  // TODO: 의성) title, price에 api에서 받아온 실제 제품의 정보 기입
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct>({
    title: jsonData.title,
    price: jsonData.price,
    color: null,
    size: null,
    count: 0, // 기본 수량
  });

  // 선택된 제품 정보들을 관리하는 상태 변수
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    [],
  );

  // 컬러 버튼 클릭 핸들러
  const handleColorClick = (color: string) => {
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      color,
      size: null,
      count: 0,
    }));
  };

  // 사이즈 버튼 클릭 핸들러
  const handleSizeClick = (size: string) => {
    if (selectedProduct.color === null) {
      alert("색상을 먼저 선택하세요");
    } else {
      setSelectedProduct((prevProduct) => ({
        ...prevProduct,
        size,
        count: 1, // 사이즈를 고르면 count가 1 증가함
      }));

      const newProduct: SelectedProduct = {
        title: jsonData.title,
        price: jsonData.price,
        color: selectedProduct.color,
        size,
        count: 1, // 사이즈를 고르면 count가 1 증가함
        key: `${size}-${selectedProduct.color}`, // 문자열로 결합
      };

      // 이미 동일한 color와 size를 가진 제품이 있는지 확인

      const hasDuplicate = selectedProducts.some(
        (product) =>
          product.color === newProduct.color &&
          product.size === newProduct.size,
      );

      if (!hasDuplicate) {
        // 이전에 선택된 제품 정보들과 새로운 제품 정보를 합쳐서 새로운 배열 생성
        const updatedProducts = [...selectedProducts, newProduct];
        setSelectedProducts(updatedProducts);
      }
    }
  };

  const inputChangeHandler = (event: any) => {
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      count: event.target.value,
    }));
  };

  const handleIncrement = (key: string | undefined) => {
    setSelectedProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.key === key) {
          return {
            ...product,
            count: product.count + 1,
          };
        }
        return product;
      });
    });
  };

  // TODO:의성) 1 미만일때 alert 창 띄우기
  const handleDecrement = (key: string | undefined) => {
    setSelectedProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.key === key && product.count > 1) {
          return {
            ...product,
            count: product.count - 1,
          };
        }
        return product;
      });
    });
  };

  const handleDelete = (key: string | undefined) => {
    setSelectedProducts((prevProducts) => {
      return prevProducts.filter((product) => product.key !== key);
    });
  };

  function calculateTotalPrice(products: SelectedProduct[]) {
    return products.reduce(
      (total, product) => total + product.price * product.count,
      0,
    );
  }

  function calculateTotalCount(products: SelectedProduct[]) {
    return products.reduce(
      (totalCount, product) => totalCount + product.count,
      0,
    );
  }
  return {
    handleColorClick,
    handleSizeClick,
    inputChangeHandler,
    handleIncrement,
    handleDecrement,
    handleDelete,
    calculateTotalPrice,
    calculateTotalCount,
    selectedProduct,
    selectedProducts,
    jsonData,
  };
}