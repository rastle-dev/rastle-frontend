import {
  adminAddDetailImage,
  adminAddMainImage,
  adminAddMainThumbnailImage,
  adminAddSubThumbnailImage,
  adminCreateProduct,
  adminGetBundle,
  adminGetCategory,
} from "@/api/admin";
import useInput from "@/hooks/useInput";
import React, { useState } from "react";
import calculateDiscountPercentAndPrice from "@/utils/calculateDiscountedPrice";
import { useQuery } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import {
  loadMarketProduct,
  loadProductCOLOR,
  loadProductDetail,
} from "@/api/shop";

export default function useUpdateProduct() {
  const [name, onChangeName, setName] = useInput("");
  const [price, onChangePrice, setPrice] = useInput("");
  const [discountPrice, onChangeDiscountPrice, setDiscountPrice] = useInput("");
  const [displayOrder, onChangeDisplayOrder, setDisplayOrder] = useInput("");
  const [bundleId, setBundleId] = useState("");
  const [bundleCategory, setBundleCategory] = useState(false);
  const [productId, setProductId] = useState<number>();
  const [categoryId, setCategoryId] = useState("");
  const [colors, setColors] = useState<string[]>([""]);
  const [sizes, setSizes] = useState<string[]>([""]);
  const [showImageUpload, setshowImageUpload] = useState(false);

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

  const { data: productData } = useQuery([QUERYKEYS.LOAD_PRODUCT_DETAIL], () =>
    selectedProduct ? loadProductDetail(selectedProduct.id) : null,
  );
  const { data: colorAndSizeData } = useQuery(
    [QUERYKEYS.LOAD_PRODUCT_COLOR],
    () => (selectedProduct ? loadProductCOLOR(selectedProduct.id) : null),
  );

  const createProduct = async () => {
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
      const data = await adminCreateProduct({
        name,
        price,
        discountPrice,
        eventCategory: false,
        ...(bundleCategory ? { bundleId } : {}),
        categoryId,
        colorAndSizes,
        displayOrder,
        visible: false,
      });
      if (data) {
        alert("상품이 추가되었습니다. 이미지를 추가해주세요");
        setProductId(data.data.id);
        setshowImageUpload(true);
      }
    } catch (err) {
      console.log(err);
      alert("상품 추가에 실패했습니다.");
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

  const addMainThumbnailImages = async () => {
    const formData = new FormData();

    // 이미지 파일들을 FormData에 추가
    for (let i = 0; i < mainThumbnailFile.length; i += 1) {
      formData.append("mainThumbnail", mainThumbnailFile[i]);
    }

    try {
      // 서버로 FormData를 포함한 POST 요청 보내기
      const data = await adminAddMainThumbnailImage(productId, formData);

      // 서버 응답 처리
      if (data) {
        alert("메인 썸네일이 추가되었습니다.");
      }
    } catch (error) {
      // 오류 처리
      console.error("메인 썸네일 이미지 업로드 오류:", error);
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
      const data = await adminAddSubThumbnailImage(productId, formData);

      if (data) {
        alert("서브 썸네일이 추가되었습니다.");
      }
    } catch (error) {
      // 오류 처리
      console.error("서브 썸네일이미지 업로드 오류:", error);
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
      const data = await adminAddMainImage(productId, formData);

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
      const data = await adminAddDetailImage(productId, formData);

      if (data) {
        alert("상세 페이지 사진들이 추가되었습니다.");
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

    console.log(selectedProduct);
  };

  const handleVisibleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVisible(e.target.checked);
  };

  const loadColorAndSize = () => {
    const uniqueColors: string[] = [];
    const uniqueSizes: string[] = [];
    colorAndSizeData?.data.map((item: ColorAndSize) => {
      if (!uniqueColors.includes(item.color)) {
        uniqueColors.push(item.color);
      }
      if (!uniqueSizes.includes(item.size)) {
        uniqueSizes.push(item.size);
      }
    });

    setColors(uniqueColors);
    setSizes(uniqueSizes);
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
    createProduct,
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
    addMainThumbnailImages,
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
  };
}
