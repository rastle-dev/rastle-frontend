import styled from "styled-components";
import IconButton from "@/components/Common/IconButton";
import COLORS from "@/constants/color";

interface WrapperProps {
  scrolled: boolean;
}
const Wrapper = styled.div<WrapperProps>`
  //width: 92%;
  width: 100%;
  //background-color: white;
  background-color: ${({ scrolled }) => (scrolled ? "white" : "transparent")};
  position: fixed;
  top: 0;
  z-index: 999;
  height: 5.5rem;

  transition: background-color 0.3s ease; /* 배경 색상 변화를 부드럽게 만들기 위한 트랜지션 */
`;

const InnerNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 4.5rem;
  position: relative;
`;

const LeftElement = styled.ul`
  list-style: none;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  padding: 0;

  li {
    padding-right: 2.2rem;
    font-size: 1.17rem;
  }

  a {
    text-decoration: none;
    color: black;
    font-weight: 200;
  }

  @media (max-width: 769px) {
    display: none;
  }
`;

const MenuDiv = styled.div`
  display: none;
  @media (max-width: 769px) {
    width: 80%;
    display: inline;
    position: absolute;
    left: 1.5rem; /* Adjust the value as per your requirement */
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    background-color: transparent;
    z-index: 1000;
  }
`;

const MenuIcon = styled(IconButton)<{ open?: boolean }>`
  @media (max-width: 769px) {
    font-size: 3rem;
    margin-top: 3rem;
    background-color: transparent;
    display: ${(props) => (props.open ? "none" : "block")};
  }
  //border: 1px solid red;
`;

const Hidden = styled.div``;

const MenuBackground = styled.div`
  @media (min-width: 770px) {
    display: none;
  }
  @media (max-width: 769px) {
    background-color: rgba(0, 0, 0, 0.5); /* 검정색 배경과 약간의 투명도 적용 */
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1001; /* 메뉴리스트 위에 위치하도록 z-index 설정 */
  }
`;

const MenuList = styled.ul<{ open?: boolean }>`
  @media (min-width: 770px) {
    display: none;
  }
  @media (max-width: 769px) {
    background-color: #fff; /* 배경색 설정 */
    position: fixed;
    margin: 0;
    padding: 0;
    top: 0;
    width: 80%;
    height: 100%;
    z-index: 1001;
    left: ${(props) =>
      props.open ? "0" : "-80%"}; /* 왼쪽에서 들어오거나 나가도록 설정 */
    transition: left 0.3s; /* 부드러운 애니메이션을 위한 트랜지션 설정 */
  }
`;
const MenuItem = styled.li`
  @media (min-width: 770px) {
    display: none;
  }
  @media (max-width: 769px) {
    list-style: none;
    padding: 2rem 2rem 2rem 0;
    margin: 0;
    font-weight: 400;
    a {
      padding: 2rem 10rem 2rem 2rem;
    }
  }
  &:hover {
    background-color: ${COLORS.GREY[200]};
  }
`;
const CenterElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  span {
    font-size: 2.3rem;
    font-weight: 200;
    @media (max-width: 769px) {
      font-size: 2rem;
    }
  }
  z-index: 1000;
`;

const RightElemet = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  span {
    margin-left: 2rem;
    font-size: 1.17rem;
    font-weight: 200;
  }

  @media (max-width: 769px) {
    display: none;
  }
`;

const PersonDiv = styled.div`
  display: none;

  @media (max-width: 769px) {
    display: inline;
    position: absolute;
    right: 1.5rem; /* Adjust the value as per your requirement */
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    z-index: 1000;
  }
`;
const PersonIcon = styled(IconButton)`
  display: none;

  @media (max-width: 769px) {
    font-size: 3rem;
    cursor: pointer;
  }
`;
export {
  Wrapper,
  InnerNav,
  LeftElement,
  CenterElement,
  RightElemet,
  MenuIcon,
  MenuDiv,
  PersonIcon,
  PersonDiv,
  MenuList,
  MenuItem,
  MenuBackground,
  Hidden,
};
