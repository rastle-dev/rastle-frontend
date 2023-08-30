import styled from "styled-components";
import COLORS from "@/constants/color";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

// eslint-disable-next-line import/prefer-default-export
export const Container = styled.div`
  width: 100%;
  //height: 200px;
  //display: flex;
  //align-items: center;
  //flex-direction: column;
  margin-top: 5.5rem;
  //border: 1px solid red;
  padding-top: 2rem;
  h1 {
    font-size: 2.5rem;
    font-weight: 200;
    padding: 4rem 0 5rem 7.84rem;
  }
`;
export const Wrapper = styled.div`
  display: flex;
  border-top: 1px solid ${COLORS.GREY[200]};
  //border-top: 1px solid #e6e6e6;
`;
export const Sidebar = styled.div`
  flex: 17;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4.1rem;
  //border: 1px solid red;
  padding-top: 4.1rem;
`;
export const Content = styled.div`
  flex: 83;
  padding: 4.1rem 0 0 2rem;
  //border: 1px solid blue;
  h2 {
    font-size: 1.63rem;
    margin: 0;
    font-weight: 500;
  }
`;
export const Menu = styled.div`
  width: 7rem;
  h2 {
    font-size: 1.63rem;
    margin: 0;
    font-weight: 500;
    padding-bottom: 1.63rem;
  }
`;
export const SubMenu = styled.div`
  font-size: 1.36rem;
  padding-bottom: 1.18rem;
`;
export const TabMenu = styled.div`
  width: 90rem;
  display: flex;
  gap: 1rem;
  justify-content: right;
  p {
    font-size: 1.18rem;
    border-bottom: 1px solid ${COLORS.GREY[400]};
    color: ${COLORS.GREY[400]};
    font-weight: 200;
    cursor: pointer;
    margin: 0 0 1.4rem 0;
  }
`;
export const Table = styled.div`
  //margin-top: 4.1rem;
  border: 1px solid;
  //width: 90%;
  width: 90rem;
  height: 50vh;
`;
export const Select = styled(Input)`
  width: 2rem;
`;
export const TableHeader = styled.div`
  border-bottom: 1px solid;
  display: grid;
  align-items: center;
  //justify-content: center;
  grid-template-columns: 17rem 22rem 12.5rem 11rem 12.5rem 11rem 5rem;
  p {
    margin: 1rem 0 1rem 0;
    //padding: ;
    font-size: 1.45rem;
    font-weight: 500;
    //border: 1px solid;
  }
`;
export const TableContent = styled.div`
  //display: grid;
  //grid-template-columns: 15rem 19rem 8rem 8rem 8rem 8rem;
`;
export const ProductInfo = styled.div`
  display: grid;
  grid-template-columns: 3.2rem 10rem 24rem 13.8rem 9.8rem 11.5rem 11rem 6.2rem;
`;
export const Img = styled.img`
  width: 7.5rem;
  height: 8.2rem;
`;
export const TextInfo = styled.div``;
export const SelectTab = styled.div``;
export const SelectButton = styled(Button)`
  margin: 0;
  padding: 0;
`;
