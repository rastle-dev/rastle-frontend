import {
  adminDeleteProduct,
  adminGetBundle,
  adminGetCategory,
  adminUpdateDetailImage,
  adminUpdateMainImage,
  adminUpdateMainThumbnailImage,
  adminUpdateProduct,
  adminUpdateSubThumbnailImage,
} from "@/api/admin";
import useInput from "@/hooks/useInput";
import React, { useEffect, useState } from "react";
import calculateDiscountPercentAndPrice from "@/utils/calculateDiscountedPrice";
import { useQuery } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import {
  loadMarketProduct,
  loadProductCOLOR,
  loadProductDetail,
  loadProductImage,
} from "@/api/shop";

export default function useUpdateProduct() {
  const [name, onChangeName, setName] = useInput("");
  const [price, onChangePrice, setPrice] = useInput("");
  const [discountPrice, onChangeDiscountPrice, setDiscountPrice] = useInput("");
  const [displayOrder, onChangeDisplayOrder, setDisplayOrder] = useInput("");
  const [bundleId, setBundleId] = useState<string>();
  const [bundleCategory, setBundleCategory] = useState(false);
  const [productId, setProductId] = useState<number>();
  const [categoryId, setCategoryId] = useState<string>();
  const [colors, setColors] = useState<string[]>([""]);
  const [sizes, setSizes] = useState<string[]>([""]);
  const [showImageUpload, setshowImageUpload] = useState(false);
  const [mainThumbnail, setMainThumbnail] = useState("");
  const [mainThumbnailFile, setMainThumbnailFile] = useState<File[]>([]);
  const [subThumbnail, setSubThumbnail] = useState("");
  const [subThumbnailFile, setSubThumbnailFile] = useState<File[]>([]);
  const [mainImages, setMainImages] = useState<string[]>([]);
  const [mainImageFiles, setMainImageFiles] = useState<File[]>([]);
  const [detailImages, setDetailImages] = useState<string[]>([]);
  const [detailImageFiles, setDetailImageFiles] = useState<File[]>([]);
  const [visible, setVisible] = useState<boolean>();
  const { discountPercent, discountedPrice } = calculateDiscountPercentAndPrice(
    price,
    discountPrice,
  );
  const [selectedProduct, setSelectedProduct] = useState<PRODUCT | null>(null); // 선택된 카테고리 상태 추가
  interface ColorAndSize {
    color: string;
    size: string;
    count: number;
  }

  interface PRODUCT {
    id: number;
    name: string;
    price: number;
    discountPrice: number;
    event: boolean;
    mainThumbnail: string;
    subThumbnail: string;
    displayOrder: number;
    visible: boolean;
    bundleId: string;
    categoryId: string;
  }

  const colorAndSizes: ColorAndSize[] = [];

  const { data: productListData } = useQuery(
    [QUERYKEYS.LOAD_PRODUCT],
    loadMarketProduct,
  );

  const { data: bundleData } = useQuery(
    [QUERYKEYS.ADMIN_GET_BUNDLE],
    adminGetBundle,
  );

  const { data: categoryData } = useQuery(
    [QUERYKEYS.ADMIN_GET_CATEGORY],
    adminGetCategory,
  );

  const { data: productData, refetch: refetchProductData } = useQuery(
    [QUERYKEYS.LOAD_PRODUCT_DETAIL],
    () => (selectedProduct ? loadProductDetail(selectedProduct.id) : null),
    {
      enabled: false, // 처음에 쿼리를 실행하지 않음
    },
  );

  const { data: colorAndSizeData, refetch: refetchColorAndSizeData } = useQuery(
    [QUERYKEYS.LOAD_PRODUCT_COLOR],
    () => (selectedProduct ? loadProductCOLOR(selectedProduct.id) : null),
    {
      enabled: false, // 처음에 쿼리를 실행하지 않음
    },
  );

  const { data: mainImageData, refetch: refetchMainImageData } = useQuery(
    [QUERYKEYS.LOAD_PRODUCT_IMAGE],
    () => (selectedProduct ? loadProductImage(selectedProduct.id) : null),
    {
      enabled: showImageUpload, // 처음에 쿼리를 실행하지 않음
    },
  );

  console.log(mainImageData);

  const loadColorAndSize = () => {
    const uniqueColors: string[] = [];
    const uniqueSizes: string[] = [];
    console.log(colorAndSizeData);
    colorAndSizeData?.data.map((item: ColorAndSize) => {
      if (!uniqueColors.includes(item.color)) {
        uniqueColors.push(item.color);
      }
      if (!uniqueSizes.includes(item.size)) {
        uniqueSizes.push(item.size);
      }
      return null; // 값을 반환하도록 수정
    });

    setColors(uniqueColors);
    setSizes(uniqueSizes);
  };

  useEffect(() => {
    if (selectedProduct) {
      refetchProductData();
      refetchColorAndSizeData();
      setColors([""]);
      setSizes([""]);
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (selectedProduct && showImageUpload) {
      refetchMainImageData();
    }
  }, [selectedProduct]);

  console.log(productData);
  console.log(productListData);

  console.log(colorAndSizeData);

  const updateProduct = async () => {
    colors.forEach((color) => {
      sizes.forEach((size) => {
        colorAndSizes.push({
          color,
          size,
          count: 1000,
        });
      });
    });
    try {
      if (
        name &&
        price &&
        discountPrice &&
        categoryId &&
        colorAndSizes.length > 1 &&
        displayOrder
      ) {
        const data = await adminUpdateProduct(selectedProduct?.id, {
          name,
          price,
          discountPrice,
          eventCategory: false,
          ...(bundleCategory ? { bundleId } : {}),
          categoryId,
          colorAndSizes,
          displayOrder,
          visible,
        });
        if (data) {
          alert("상품이 수정되었습니다. ");
          setProductId(data.data.id);
        }
      } else {
        alert("필수 항목을 다 채워주세요");
      }
    } catch (err) {
      console.log(err);
      alert("상품 수정에 실패했습니다.");
    }
  };

  const handleBundleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBundleCategory(e.target.checked);
  };

  const handleBundleIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBundleId(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(e.target.value);
  };

  const handleColorChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newColors = [...colors];
    newColors[index] = e.target.value;
    setColors(newColors);
  };

  const addColorInput = () => {
    setColors([...colors, ""]);
  };

  const removeColorInput = (indexToRemove: number) => {
    const newColors = colors.filter((_, index) => index !== indexToRemove);
    setColors(newColors);
  };

  const removeSizeInput = (indexToRemove: number) => {
    const newSizes = sizes.filter((_, index) => index !== indexToRemove);
    setColors(newSizes);
  };

  const handleSizeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newSizes = [...sizes];
    newSizes[index] = e.target.value;
    setSizes(newSizes);
  };

  const addSizeInput = () => {
    setSizes([...sizes, ""]);
  };

  const handleMainThumbnailChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { files } = e.target;

    if (files && files.length > 0) {
      const newImages: File[] = [...mainThumbnailFile];
      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];

        if (file) {
          const reader = new FileReader();

          reader.onloadend = () => {
            newImages.push(file);

            setMainThumbnailFile(newImages.slice(0, 1)); // 최대 3개까지만 유지
            setMainThumbnail(reader.result as string);
          };

          reader.readAsDataURL(file);
        }
      }
    }
  };

  const updateMainThumbnailImages = async () => {
    const formData = new FormData();

    // 이미지 파일들을 FormData에 추가
    for (let i = 0; i < mainThumbnailFile.length; i += 1) {
      formData.append("mainThumbnail", mainThumbnailFile[i]);
    }

    try {
      // 서버로 FormData를 포함한 POST 요청 보내기
      const data = await adminUpdateMainThumbnailImage(productId, formData);

      // 서버 응답 처리
      if (data) {
        alert("메인 썸네일이 수정되었습니다.");
      }
    } catch (error) {
      // 오류 처리
      console.error("메인 썸네일 이미지 수정 오류:", error);
    }
  };

  const handleSubThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length > 0) {
      const newImages: File[] = [...subThumbnailFile];

      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];

        if (file) {
          const reader = new FileReader();

          reader.onloadend = () => {
            newImages.push(file);

            setSubThumbnailFile(newImages.slice(0, 1)); // 최대 3개까지만 유지
            setSubThumbnail(reader.result as string);
          };

          reader.readAsDataURL(file);
        }
      }
    }
  };

  const addSubThumbnailImages = async () => {
    const formData = new FormData();

    // 이미지 파일들을 FormData에 추가
    for (let i = 0; i < subThumbnailFile.length; i += 1) {
      formData.append("subThumbnail", subThumbnailFile[i]);
    }

    try {
      // 서버로 FormData를 포함한 POST 요청 보내기
      const data = await adminUpdateSubThumbnailImage(productId, formData);

      if (data) {
        alert("서브 썸네일이 수정되었습니다.");
      }
    } catch (error) {
      // 오류 처리
      console.error("서브 썸네일이미지 수정 오류:", error);
    }
  };

  const handleMainImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length > 0) {
      const newImages: File[] = [...mainImageFiles];
      const newPreviews: string[] = [...mainImages];

      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];

        if (file) {
          const reader = new FileReader();

          reader.onloadend = () => {
            newImages.push(file);
            newPreviews.push(reader.result as string);

            setMainImageFiles(newImages.slice(0, 10)); // 최대 3개까지만 유지
            setMainImages(newPreviews.slice(0, 10));
          };

          reader.readAsDataURL(file);
        }
      }
    }
  };
  const addMainImages = async () => {
    const formData = new FormData();

    // 이미지 파일들을 FormData에 추가
    for (let i = 0; i < mainImageFiles.length; i += 1) {
      formData.append("mainImages", mainImageFiles[i]);
    }

    try {
      // 서버로 FormData를 포함한 POST 요청 보내기
      const data = await adminUpdateMainImage(productId, formData);

      // 서버 응답 처리
      console.log(data);
      if (data) {
        alert("메인 이미지가 추가되었습니다.");
      }
    } catch (error) {
      // 오류 처리
      console.error("메인 이미지 업로드 오류:", error);
    }
  };

  const handleDetailImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length > 0) {
      const newImages: File[] = [...detailImageFiles];
      const newPreviews: string[] = [...detailImages];

      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];

        if (file) {
          const reader = new FileReader();

          reader.onloadend = () => {
            newImages.push(file);
            newPreviews.push(reader.result as string);

            setDetailImageFiles(newImages); // 최대 3개까지만 유지
            setDetailImages(newPreviews);
          };

          reader.readAsDataURL(file);
        }
      }
    }
  };

  const addDetailImages = async () => {
    const formData = new FormData();

    // 이미지 파일들을 FormData에 추가
    for (let i = 0; i < detailImageFiles.length; i += 1) {
      formData.append("detailImages", detailImageFiles[i]);
    }

    try {
      // 서버로 FormData를 포함한 POST 요청 보내기
      const data = await adminUpdateDetailImage(productId, formData);

      if (data) {
        alert("상세 페이지 사진들이 수정되었습니다.");
      }
    } catch (error) {
      // 오류 처리
      console.error("이미지 업로드 오류:", error);
    }
  };

  const handleProductClick = (product: PRODUCT) => {
    setSelectedProduct(product); // 목록에서 카테고리 선택
    setName(product.name);
    setPrice(product.price);
    setDiscountPrice(product.discountPrice);
    setDisplayOrder(product.displayOrder);
    setVisible(product.visible);
    setCategoryId(product.categoryId);
    setProductId(product.id);

    // 세트가 구성되어있지 않음
    if (product.bundleId === null) {
      setBundleCategory(false);
    }
    // 세트가 존재함
    else {
      setBundleCategory(true);
      setBundleId(product.bundleId);
    }

    console.log(selectedProduct);
  };

  const handleVisibleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVisible(e.target.checked);
  };

  const loadImages = () => {
    setshowImageUpload(true);
  };

  const deleteProduct = async () => {
    try {
      // 서버로 FormData를 포함한 POST 요청 보내기
      const data = await adminDeleteProduct(selectedProduct?.id);

      if (data) {
        alert("상품이 제거되었습니다.");
      }
    } catch (error) {
      // 오류 처리
      console.error("상품 제거 실패:", error);
    }
  };

  return {
    onChangeName,
    name,
    price,
    onChangePrice,
    onChangeDiscountPrice,
    bundleId,
    categoryId,
    handleBundleChange,
    handleBundleIdChange,
    handleCategoryChange,
    colors,
    setColors,
    sizes,
    setSizes,
    showImageUpload,
    setshowImageUpload,
    displayOrder,
    onChangeDisplayOrder,
    createProduct: updateProduct,
    productId,
    discountPrice,
    bundleCategory,
    discountPercent,
    handleColorChange,
    discountedPrice,
    addColorInput,
    removeColorInput,
    removeSizeInput,
    handleSizeChange,
    addSizeInput,
    handleMainThumbnailChange,
    updateMainThumbnailImages,
    handleSubThumbnailChange,
    addSubThumbnailImages,
    handleMainImagesChange,
    addMainImages,
    handleDetailImagesChange,
    addDetailImages,
    mainThumbnail,
    subThumbnail,
    mainImages,
    detailImages,
    handleProductClick,
    handleVisibleChange,
    visible,
    selectedProduct,
    colorAndSizeData,
    loadColorAndSize,
    productListData,
    bundleData,
    categoryData,
    productData,
    mainImageData,
    loadImages,
    deleteProduct,
  };
}
