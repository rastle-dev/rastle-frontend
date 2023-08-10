import styled from "styled-components";

export const Wrapper = styled.div`
  padding-top: 9rem; /* header때문에 추가 */
  width: 88%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
`;

export const TopLayer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  width: 100%;
  padding: 16px;
`;

export const ImageLayer = styled.div`
  width: 50%;
  height: auto;
  padding-right: 3.72rem;
  border-right: 1px solid black;
`;

export const ProductContent = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  background-color: lightblue; /* 임시 스타일 */
`;

export const Price = styled.div`
  background-color: lightgreen; /* 임시 스타일 */
`;

export const Color = styled.div`
  background-color: lightpink; /* 임시 스타일 */
`;

export const Size = styled.div`
  background-color: lightyellow; /* 임시 스타일 */
`;

export const ProductCount = styled.div`
  background-color: lightcoral; /* 임시 스타일 */
`;

export const TotalPrice = styled.div`
  background-color: lightseagreen; /* 임시 스타일 */
`;

export const Pay = styled.div`
  background-color: lightsalmon; /* 임시 스타일 */
`;
