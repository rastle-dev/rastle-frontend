import {
  adminAddDetailImage,
  adminAddMainImage,
  adminAddMainThumbnailImage,
  adminAddSubThumbnailImage,
  adminCreateProduct,
} from "@/api/admin";
import useInput from "@/hooks/useInput";
import React, { useState } from "react";
import calculateDiscountPercentAndPrice from "@/utils/calculateDiscountedPrice";

export default function useCreateEventProduct() {
  const [name, onChangeName] = useInput("");
  const [price, onChangePrice] = useInput("");
  const [discountPrice, onChangeDiscountPrice] = useInput("");
  const [displayOrder, onChangeDisplayOrder] = useInput("");
  const [eventId, setEventId] = useState("");
  const [bundleCategory, setBundleCategory] = useState(false);
  const [productId, setProductId] = useState<number>();
  const [categoryId, setCategoryId] = useState("");
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
  const [displayOrderCheck, setDisplayOrderCheck] = useState<boolean>(false);
  const [blockCreateProductButton, setBlockCreateProductButton] =
    useState(false);
  const [blockMainThumbnailButton, setBlockMainThumbnailButton] =
    useState(false);
  const [blockSubThumbnailButton, setBlockSubThumbnailButton] = useState(false);
  const [blockMainImagesButton, setBlockMainImagesButton] = useState(false);
  const [blockDetailImagesButton, setBlockDetailImagesButton] = useState(false);
  const { discountPercent, discountedPrice } = calculateDiscountPercentAndPrice(
    price,
    discountPrice,
  );
  interface ColorAndSize {
    color: string;
    size: string;
    count: number;
  }

  const colorAndSizes: ColorAndSize[] = [];

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
    if (
      name.length >= 2 &&
      price !== null &&
      discountPrice !== null &&
      colorAndSizes.length > 0 &&
      displayOrder !== null &&
      categoryId !== null
    ) {
      console.log(eventId);
      try {
        const data = await adminCreateProduct({
          name,
          price,
          discountPrice,
          event: true,
          eventId,
          categoryId,
          colorAndSizes,
          displayOrder,
          visible: false,
        });
        if (data) {
          console.log(data);
          alert("상품이 추가되었습니다. 이미지를 추가해주세요");
          setProductId(data.data.id);
          setshowImageUpload(true);
          setBlockCreateProductButton(true);
        }
      } catch (err) {
        console.log(err);
        alert("상품 추가에 실패했습니다.");
      }
    } else {
      alert("필수 항목들을 다 채워주세요.");
    }
  };

  const handleBundleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBundleCategory(e.target.checked);
  };

  const handleBundleIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEventId(e.target.value);
    console.log(eventId);
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

  const handleDisplayOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayOrderCheck(e.target.checked);
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
          // 파일 이름에서 공백 제거
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

  const addMainThumbnailImages = async () => {
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
      const data = await adminAddMainThumbnailImage(productId, formData);

      // 서버 응답 처리
      if (data) {
        setBlockMainThumbnailButton(true);
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

    try {
      // 서버로 FormData를 포함한 POST 요청 보내기
      const data = await adminAddSubThumbnailImage(productId, formData);

      if (data) {
        setBlockSubThumbnailButton(true);
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

    try {
      // 서버로 FormData를 포함한 POST 요청 보내기
      const data = await adminAddMainImage(productId, formData);

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
      const data = await adminAddDetailImage(productId, formData);

      if (data) {
        setBlockDetailImagesButton(true);
        alert(
          "상세 페이지 사진들이 추가되었습니다. 상품 수정에서 공개처리를 해주세요",
        );
        window.location.reload(); // 페이지 새로고침
      }
    } catch (error) {
      // 오류 처리
      console.error("이미지 업로드 오류:", error);
    }
  };

  return {
    onChangeName,
    name,
    price,
    onChangePrice,
    onChangeDiscountPrice,
    eventId,
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
    handleDisplayOrderChange,
    displayOrderCheck,
    blockMainThumbnailButton,
    blockSubThumbnailButton,
    blockMainImagesButton,
    blockDetailImagesButton,
    blockCreateProductButton,
  };
}
