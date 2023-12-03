import styled from "styled-components";
import COLORS from "@/constants/color";
import Button from "@/components/common/Button";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 5.5rem;
  padding-top: 2rem;
`;
export const Header = styled.header`
  width: 88%;
  h1 {
    font-size: 2.5rem;
    font-weight: 200;
    padding: 4rem 0 5rem 0;
  }
`;
export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  border-top: 1px solid ${COLORS.GREY[200]};
  @media (max-width: 1007px) {
    display: flex;
    flex-direction: column;
    border-top: none;
  }
`;
export const Sidebar = styled.div`
  flex: 17;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4.1rem;
  padding-top: 4.1rem;
  @media (max-width: 1007px) {
    flex-direction: row;
    border-bottom: 1px solid ${COLORS.GREY[200]};
    padding-left: 3rem;
    padding-top: 0;
  }
`;
export const Content = styled.div`
  flex: 83;
  padding: 4.1rem 0 0 2rem;
  h2 {
    font-size: 1.63rem;
    margin: 0;
    font-weight: 500;
  }
  @media (max-width: 1007px) {
    flex-direction: row;
    padding-left: 3rem;
  }
`;
export const Menu = styled.div`
  h2 {
    font-size: 1.63rem;
    margin: 0;
    font-weight: 500;
    padding-bottom: 1.63rem;
    @media (max-width: 1007px) {
      display: none;
    }
  }
  @media (min-width: 1007px) {
    width: 7rem;
  }
  @media (max-width: 1007px) {
    display: flex;
    //width: 17rem;
    gap: 3rem;
  }
`;
export const Logout = styled(Button)`
  border: none;
  padding-right: 2rem;
  font-size: 1.2rem;
  color: red;
  width: 7rem;
  font-weight: 300;
  margin-top: 4rem;
  &:hover {
    border: none;
    color: red;
    font-weight: 500;
  }
  @media (max-width: 1007px) {
    display: none;
  }
`;
export const Box = styled.div`
  border: none;
`;
export const SubMenu = styled.div<{ active: boolean }>`
  color: ${(props) => (props.active ? COLORS.블랙 : COLORS.GREY[300])};
  font-size: 1.36rem;
  padding-bottom: 1.18rem;
  cursor: pointer;
  font-weight: 300;
  @media (max-width: 1007px) {
    font-size: 1.63rem;
  }
`;
export const TabMenu = styled.div`
  width: 90.5rem;
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
