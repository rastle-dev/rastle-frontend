import styled from "styled-components";
import IconButton from "@/components/common/IconButton";

const Wrapper = styled.div`
  //width: 92%;
  width: 100%;
  background-color: white;
  position: fixed;
  top: 0;
  z-index: 999;
  height: 5.5rem;
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
  position: absolute;
  left: 1.5rem; /* Adjust the value as per your requirement */
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1000;
`;

const MenuIcon = styled(IconButton)`
  display: none;

  @media (max-width: 769px) {
    font-size: 2rem;
    cursor: pointer;
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
    font-size: 3rem;
    font-weight: 200;
  }
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
  position: absolute;
  right: 1.5rem; /* Adjust the value as per your requirement */
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1000;
`;
const PersonIcon = styled(IconButton)`
  display: none;

  @media (max-width: 769px) {
    font-size: 2rem;
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
};
