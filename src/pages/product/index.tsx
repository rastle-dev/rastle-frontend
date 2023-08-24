import React, { useState } from "react";
import ColorButton from "@/components/common/ColorButton";
import COLORS from "@/constants/color";
import Icon from "@/components/common/Icon";
import ImageSliderPage from "@/components/Swiper/ImageSliderPage";
import * as S from "@/styles/product/index.styles";

export default function Product() {
  // 상태 변수들

  // 단일 선택 제품정보
  interface SelectedProduct {
    title?: string;
    price: number;
    color?: string | null;
    size?: string | null;
    count: number;
    key?: string;
  }

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

  console.log(selectedProducts);
  console.log(selectedProduct);

  return (
    <S.Wrapper>
      <S.TopLayer>
        <S.ImageLayer>
          <ImageSliderPage images={jsonData.images} />
        </S.ImageLayer>
        <S.ProductContent>
          <S.Title>{jsonData.title}</S.Title>
          {/*<S.Price>{jsonData.price.toLocaleString()}원</S.Price>*/}
          <S.DiscountPrice>
            <h4>{jsonData.price.toLocaleString()}원</h4>
            <span>10% </span>
            {jsonData.price.toLocaleString()}원
          </S.DiscountPrice>
          <S.ColorText>색상</S.ColorText>
          <S.ColorList>
            {jsonData.colors.map((color) => (
              <ColorButton
                key={color}
                size={3}
                clicked={color === selectedProduct.color}
                // @ts-ignore
                color={COLORS[color]}
                onClick={() => handleColorClick(color)} // 클릭 핸들러 연결
              />
            ))}
          </S.ColorList>
          <S.SizeText>사이즈</S.SizeText>
          <S.SizeButtonList>
            {jsonData.sizes.map((size) => (
              <S.SizeButton
                key={size}
                title={size}
                type="size"
                onClick={() => handleSizeClick(size)} // 클릭 핸들러 연결
                // disabled={!selectedProduct.color} // 컬러 선택 전에는 비활성화
                isActive={selectedProduct.size === size}
              />
            ))}
          </S.SizeButtonList>
          {selectedProducts.length > 0 && (
            <>
              <S.ProductCountText>수량</S.ProductCountText>
              {selectedProducts.map((product) => (
                <React.Fragment key={`${product.size}-${product.color}`}>
                  <S.ProductCountInfo>
                    <S.ProductCountLeftInfo>
                      <S.ProductCountTitle>{product.title}</S.ProductCountTitle>
                      <S.ProductCountColor>
                        {product.color} /{" "}
                      </S.ProductCountColor>
                      <S.ProudctCountSize>{product.size}</S.ProudctCountSize>
                    </S.ProductCountLeftInfo>
                    <S.ProductCountRightInfo>
                      <S.ProductCountButton
                        type="number"
                        min={1}
                        value={product.count}
                        onChange={(event) => inputChangeHandler(event)}
                      />
                      <S.NumberInputContainer>
                        <S.CountUpButton
                          src="https://img.echosting.cafe24.com/design/skin/default/product/btn_count_up.gif"
                          onClick={() => handleIncrement(product.key)}
                        />
                        <S.CountDownButton
                          src="https://img.echosting.cafe24.com/design/skin/default/product/btn_count_down.gif"
                          onClick={() => handleDecrement(product.key)}
                        />
                      </S.NumberInputContainer>
                      <S.ProductCountDelete>
                        <Icon
                          size="1.2rem"
                          iconName="delete"
                          color={COLORS.GREY.상세페이지}
                          onClick={() => handleDelete(product.key)}
                        />
                      </S.ProductCountDelete>
                    </S.ProductCountRightInfo>
                  </S.ProductCountInfo>
                </React.Fragment>
              ))}
            </>
          )}
          <S.TotalPrice>
            총 상품 금액:{" "}
            {calculateTotalPrice(selectedProducts).toLocaleString()}원 (
            {calculateTotalCount(selectedProducts)}개)
          </S.TotalPrice>
          <S.Pay>
            <S.StyledBuyButton title="구매하기" type="shop" />
            <S.StyledPayButton title="장바구니에 담기" type="shop" />
            <S.StyledNpayButton title="N Pay 구매하기" type="shop" />
          </S.Pay>
        </S.ProductContent>
      </S.TopLayer>
      <S.ProductDetailList>
        <S.ProductDetail src="/image/product5.jpg" />
        <S.ProductDetail src="/image/homeDesktop2.jpg" />
      </S.ProductDetailList>
    </S.Wrapper>
  );
}
