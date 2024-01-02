import React from "react";
import styled from "styled-components";
import Input from "@/components/Common/Input";
import { useQuery } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import { adminGetBundle } from "@/api/admin";
import useUpdateBundle from "@/hooks/manager/bundle/useUpdateBundle";
import Image from "next/image";
import COLORS from "@/constants/color";

const Title = styled.div`
  margin: 0;
  font-size: 2.2rem;
  padding-bottom: 2rem;
`;

const CategoryDetail = styled.div`
  margin: 0;
  padding-bottom: 1rem;

  label {
    margin-right: 0.5rem;
  }
`;

const CustomTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const PreviewImages = styled.div`
  margin-top: 1rem;
`;

const EventCheckbox = styled.input`
  margin-right: 0.5rem;
  margin-bottom: 1rem;
`;

const BundleSubtitle = styled.div`
  font-size: 1.7rem;
  color: red;
  font-weight: 400;
`;

const BundleList = styled.ul`
  list-style-type: none;
  padding: 0;
`;
const BundleLi = styled.li`
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;
  &:hover {
    background-color: #f0f0f0;
    color: #333;
  }
`;

export const StyledButton = styled.button`
  font-size: 1.18182rem;
  font-weight: 400;
  padding: 1rem;
  border: 0.1px solid ${COLORS.GREY.상세페이지};
  background-color: white;
  cursor: pointer;
  &:hover {
    font-weight: 500;
  }

  /* 버튼이 클릭된 상태일 때의 스타일 */
`;

interface Bundle {
  id: number;
  name: string;
  imageUrls: string;
  description: string;
  saleStartTime: string;
  visible: boolean;
}
export default function UpdateBundle() {
  const {
    description,
    previewImages,
    newPreviewImages,
    handleBundleDescriptionChange,
    handleImageUpload,
    onChangeName,
    onChangeStartDate,
    onChangeStartHour,
    onChangeStartMinute,
    onChangeStartSecond,
    updateBundle,
    updateBundleImages,
    handleVisibleChange,
    handleBundleClick,
    selectedBundle,
    startDate,
    // endDate,
    startHour,
    startMinute,
    startSecond,
    name,
    deleteBundle,
    visible,
  } = useUpdateBundle();

  const { data: bundleData } = useQuery(
    [QUERYKEYS.ADMIN_GET_BUNDLE],
    adminGetBundle,
  );

  return (
    <div>
      <Title>세트 수정</Title>
      <BundleSubtitle>수정할 세트를 선택하세요</BundleSubtitle>
      <BundleList>
        {bundleData?.data.content.map((bundle: Bundle) => (
          <BundleLi key={bundle.id} onClick={() => handleBundleClick(bundle)}>
            {bundle.name}
          </BundleLi>
        ))}
      </BundleList>
      <p>수정할 세트 : {selectedBundle?.name}</p>
      <CategoryDetail>
        <Input
          label="세트 이름"
          size={30}
          onChange={onChangeName}
          value={name}
        />
      </CategoryDetail>
      <CategoryDetail>
        <Input
          label="시작 날짜"
          placeholder="2023-08-23형식"
          size={30}
          onChange={onChangeStartDate}
          value={startDate}
        />
      </CategoryDetail>
      <CategoryDetail>
        <Input
          label="시작 hour(string)"
          placeholder="12"
          size={30}
          onChange={onChangeStartHour}
          value={startHour}
        />
      </CategoryDetail>
      <CategoryDetail>
        <Input
          label="시작 minute(string)"
          placeholder="00"
          size={30}
          onChange={onChangeStartMinute}
          value={startMinute}
        />
      </CategoryDetail>
      <CategoryDetail>
        <Input
          label="시작 second(string)"
          placeholder="00"
          size={30}
          onChange={onChangeStartSecond}
          value={startSecond}
        />
      </CategoryDetail>
      공개:
      <EventCheckbox
        type="checkbox"
        checked={visible}
        onChange={(e) => handleVisibleChange(e)}
      />
      <CategoryDetail>
        세트 설명:
        <CustomTextarea
          id="categoryDescription"
          value={description}
          onChange={(e) => handleBundleDescriptionChange(e)}
        />
      </CategoryDetail>
      <StyledButton type="button" onClick={updateBundle}>
        세트 정보 수정
      </StyledButton>
      <StyledButton type="button" onClick={deleteBundle}>
        세트 삭제
      </StyledButton>
      <p>*이미지는 따로 수정 필요</p>
      <div>
        <p>현재 세트 사진</p>
        {previewImages && previewImages.length > 0 && (
          <PreviewImages>
            {previewImages.map((preview, index) => (
              <Image
                key={preview}
                src={preview}
                alt={`미리보기 이미지 ${index}`}
                width={200} // 이미지 너비
                height={250} // 이미지 높이
                style={{ margin: "5px" }}
              />
            ))}
          </PreviewImages>
        )}
        <p>변경할 세트 사진</p>
        세트 이미지:
        <input
          type="file"
          id="categoryImage"
          accept="image/*"
          multiple // 여러 이미지 업로드 가능하도록
          onChange={handleImageUpload}
        />
        <PreviewImages>
          {newPreviewImages?.map((preview, index) => (
            <Image
              key={preview}
              src={preview}
              alt={`미리보기 이미지 ${index}`}
              width={200} // 이미지 너비
              height={250} // 이미지 높이
              style={{ margin: "5px" }}
            />
          ))}
        </PreviewImages>
        <StyledButton type="button" onClick={updateBundleImages}>
          이미지 추가
        </StyledButton>
      </div>
    </div>
  );
}
