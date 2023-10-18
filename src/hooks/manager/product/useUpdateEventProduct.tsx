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
  loadEventProduct,
  loadMarketProduct,
  loadProductCOLOR,
  loadProductDetail,
  loadProductImage,
} from "@/api/shop";

export default function useUpdateEventProduct() {
  const [name, onChangeName, setName] = useInput("");
  const [price, onChangePrice, setPrice] = useInput("");
  const [discountPrice, onChangeDiscountPrice, setDiscountPrice] = useInput("");
  const [displayOrder, onChangeDisplayOrder, setDisplayOrder] = useInput("");
  const [bundleCategory, setBundleCategory] = useState(false);
  const [productId, setProductId] = useState<number>();
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
  const [selectedProduct, setSelectedProduct] = useState<EventProduct | null>(
    null,
  ); // 선택된 카테고리 상태 추가
  const [blockMainThumbnailButton, setBlockMainThumbnailButton] =
    useState(false);
  const [blockSubThumbnailButton, setBlockSubThumbnailButton] = useState(false);
  const [blockMainImagesButton, setBlockMainImagesButton] = useState(false);
  const [blockDetailImagesButton, setBlockDetailImagesButton] = useState(false);
  interface ColorAndSize {
    color: string;
    size: string;
    count: number;
  }

  interface EventProduct {
    discountPrice: number;
    displayOrder: number;
    endDate: string;
    eventDescription: string;
    eventId: number;
    eventImageUrls: string;
    eventName: string;
    eventVisible: boolean;
    mainThumbnail: string;
    price: number;
    productId: number;
    productName: string;
    productVisible: boolean;
    startDate: string;
    subThumbnail: string;
  }
  const colorAndSizes: ColorAndSize[] = [];

  const { data: eventProductListData } = useQuery(
    [QUERYKEYS.LOAD_EVENTPRODUCT],
    loadEventProduct,
  );

  console.log(eventProductListData);

  const { data: colorAndSizeData, refetch: refetchColorAndSizeData } = useQuery(
    [QUERYKEYS.LOAD_PRODUCT_COLOR],
    () =>
      selectedProduct ? loadProductCOLOR(selectedProduct.productId) : null,
    {
      enabled: false, // 처음에 쿼리를 실행하지 않음
    },
  );

  const { data: mainImageData, refetch: refetchMainImageData } = useQuery(
    [QUERYKEYS.LOAD_PRODUCT_IMAGE],
    () =>
      selectedProduct ? loadProductImage(selectedProduct.productId) : null,
    {
      enabled: showImageUpload, // 처음에 쿼리를 실행하지 않음
    },
  );

  const loadColorAndSize = () => {
    if (selectedProduct) {
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
    } else {
      alert("상품을 선택해주세요");
    }
  };

  useEffect(() => {
    if (selectedProduct) {
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
      if (name && price && colorAndSizes.length >= 1 && displayOrder) {
        const data = await adminUpdateProduct(selectedProduct?.productId, {
          name,
          price,
          discountPrice,
          colorAndSizes,
          displayOrder,
          visible,
        });
        if (data) {
          alert("상품이 수정되었습니다. ");
        }
      } else {
        alert("필수 항목을 다 채워주세요");
      }
    } catch (err) {
      console.log(err);
      alert("상품 수정에 실패했습니다.");
    }
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
          const sanitizedFileName = file.name.replace(/\s/g, "");

          // 수정된 파일 이름으로 새로운 File 객체 생성
          const modifiedFile = new File([file], sanitizedFileName, {
            type: file.type,
          });

          const reader = new FileReader();

          reader.onloadend = () => {
            newImages.push(modifiedFile);

            setMainThumbnailFile(newImages.slice(0, 1)); // 최대 3개까지만 유지
            setMainThumbnail(reader.result as string);
          };

          reader.readAsDataURL(modifiedFile);
        }
      }
    }
  };

  const updateMainThumbnailImages = async () => {
    if (mainThumbnailFile.length === 0) {
      // images 배열이 비어있으면 아무 작업도 수행하지 않습니다.
      alert("이미지를 하나 추가해주세요");
      return;
    }

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
        setBlockMainThumbnailButton(true);
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
          const sanitizedFileName = file.name.replace(/\s/g, "");

          // 수정된 파일 이름으로 새로운 File 객체 생성
          const modifiedFile = new File([file], sanitizedFileName, {
            type: file.type,
          });

          const reader = new FileReader();

          reader.onloadend = () => {
            newImages.push(modifiedFile);

            setSubThumbnailFile(newImages.slice(0, 1)); // 최대 3개까지만 유지
            setSubThumbnail(reader.result as string);
          };

          reader.readAsDataURL(modifiedFile);
        }
      }
    }
  };

  const addSubThumbnailImages = async () => {
    if (subThumbnailFile.length === 0) {
      // images 배열이 비어있으면 아무 작업도 수행하지 않습니다.
      alert("이미지를 하나 추가해주세요");
      return;
    }

    const formData = new FormData();

    // 이미지 파일들을 FormData에 추가
    for (let i = 0; i < subThumbnailFile.length; i += 1) {
      formData.append("subThumbnail", subThumbnailFile[i]);
    }

    console.log(formData);

    try {
      // 서버로 FormData를 포함한 POST 요청 보내기
      const data = await adminUpdateSubThumbnailImage(productId, formData);

      if (data) {
        setBlockSubThumbnailButton(true);
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
          const sanitizedFileName = file.name.replace(/\s/g, "");

          // 수정된 파일 이름으로 새로운 File 객체 생성
          const modifiedFile = new File([file], sanitizedFileName, {
            type: file.type,
          });

          const reader = new FileReader();

          reader.onloadend = () => {
            newImages.push(modifiedFile);
            newPreviews.push(reader.result as string);

            setMainImageFiles(newImages.slice(0, 10)); // 최대 3개까지만 유지
            setMainImages(newPreviews.slice(0, 10));
          };

          reader.readAsDataURL(modifiedFile);
        }
      }
    }
    console.log(mainImageFiles);
  };
  const addMainImages = async () => {
    if (mainImageFiles.length === 0) {
      // images 배열이 비어있으면 아무 작업도 수행하지 않습니다.
      alert("이미지를 하나이상 추가해주세요");
      return;
    }

    const formData = new FormData();

    // 이미지 파일들을 FormData에 추가
    for (let i = 0; i < mainImageFiles.length; i += 1) {
      formData.append("mainImages", mainImageFiles[i]);
    }

    console.log(formData);

    try {
      // 서버로 FormData를 포함한 POST 요청 보내기
      const data = await adminUpdateMainImage(productId, formData);

      // 서버 응답 처리
      console.log(data);
      if (data) {
        setBlockMainImagesButton(true);
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
          const sanitizedFileName = file.name.replace(/\s/g, "");

          // 수정된 파일 이름으로 새로운 File 객체 생성
          const modifiedFile = new File([file], sanitizedFileName, {
            type: file.type,
          });

          const reader = new FileReader();

          reader.onloadend = () => {
            newImages.push(modifiedFile);
            newPreviews.push(reader.result as string);

            setDetailImageFiles(newImages); // 최대 3개까지만 유지
            setDetailImages(newPreviews);
          };

          reader.readAsDataURL(modifiedFile);
        }
      }
    }
  };

  const addDetailImages = async () => {
    if (detailImageFiles.length === 0) {
      // images 배열이 비어있으면 아무 작업도 수행하지 않습니다.
      alert("이미지를 하나이상 추가해주세요");
      return;
    }

    const formData = new FormData();

    // 이미지 파일들을 FormData에 추가
    for (let i = 0; i < detailImageFiles.length; i += 1) {
      formData.append("detailImages", detailImageFiles[i]);
    }

    try {
      // 서버로 FormData를 포함한 POST 요청 보내기
      const data = await adminUpdateDetailImage(productId, formData);

      if (data) {
        setBlockDetailImagesButton(true);
        alert("상세 페이지 사진들이 수정되었습니다.");
      }
    } catch (error) {
      // 오류 처리
      console.error("이미지 업로드 오류:", error);
    }
  };

  const handleProductClick = (product: EventProduct) => {
    setSelectedProduct(product); // 목록에서 카테고리 선택
    setName(product.productName);
    setPrice(product.price);
    setDiscountPrice(product.discountPrice);
    setDisplayOrder(product.displayOrder);
    setVisible(product.productVisible);
    setProductId(product.productId);
  };

  const handleVisibleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVisible(e.target.checked);
  };

  const loadImages = () => {
    if (selectedProduct) {
      setshowImageUpload(true);
    } else {
      alert("수정할 상품을 선택해주세요");
    }
  };

  const deleteProduct = async () => {
    if (selectedProduct) {
      try {
        // 서버로 FormData를 포함한 POST 요청 보내기
        const data = await adminDeleteProduct(selectedProduct?.productId);

        if (data) {
          alert("상품이 제거되었습니다.");
        }
      } catch (error) {
        // 오류 처리
        console.error("상품 제거 실패:", error);
      }
    } else {
      alert("삭제할 상품을 선택해주세요");
    }
  };

  return {
    onChangeName,
    name,
    price,
    onChangePrice,
    onChangeDiscountPrice,
    colors,
    setColors,
    sizes,
    setSizes,
    showImageUpload,
    setshowImageUpload,
    displayOrder,
    onChangeDisplayOrder,
    updateProduct,
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
    mainImageData,
    loadImages,
    deleteProduct,
    eventProductListData,
  };
}
