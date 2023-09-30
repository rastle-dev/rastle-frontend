import {
  adminCreateCategory,
  adminCreateMarket,
  adminCreateProduct,
} from "@/api/admin";
import useInput from "@/hooks/useInput";
import React, { useState } from "react";

export default function useCreateProduct() {
  const [name, onChangeName] = useInput("");
  const [price, onChangePrice] = useInput("");
  const [discount, onChangeDiscount] = useInput("");
  const [displayOrder, onChangeDisplayOrder] = useInput("");
  const [eventCategory, setEventCategory] = useState(false);
  const [marketId, setMarketId] = useState("");
  const [productId, setProductId] = useState<number>();
  const [categoryId, setCategoryId] = useState("");
  const [colors, setColors] = useState<string[]>([""]);
  const [sizes, setSizes] = useState<string[]>([""]);
  const [showImageUpload, setshowImageUpload] = useState(false);

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
    console.log(colorAndSizes);
    try {
      setshowImageUpload(true);

      console.log(colorAndSizes);
      const data = await adminCreateProduct({
        name,
        price,
        discount,
        eventCategory,
        marketId,
        categoryId,
        colorAndSizes,
        displayOrder,
      });
      if (data) {
        console.log(data);
        setProductId(data.data.id);
        console.log(data.data.id);
        setshowImageUpload(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventCategory(e.target.checked);
  };

  const handleMarketChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMarketId(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(e.target.value);
  };

  return {
    onChangeName,
    name,
    price,
    onChangePrice,
    discount,
    onChangeDiscount,
    eventCategory,
    marketId,
    categoryId,
    setEventCategory,
    handleEventChange,
    handleMarketChange,
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
  };
}
