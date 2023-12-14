import styled from "styled-components";
import React from "react";
import COLORS from "../../constants/color";

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  //align-items: center;
  justify-content: center;
  //width: 100%;
  //height: 100%;
  //border: 1px solid blue;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  align-items: center;
  z-index: 999;
  //border: 1px solid red;
`;
const Loading = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  //padding: 1rem 0;
  //border: 1px solid blueviolet;
  .loader {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 7em;
    display: inline-block;
    position: relative;
    vertical-align: middle;
  }
  .loader,
  .loader:before,
  .loader:after {
    animation: 1s infinite ease-in-out;
  }
  .loader:before,
  .loader:after {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .loader-black {
    background-color: ${COLORS.BLACK};
  }
  .loader-8:before,
  .loader-8:after {
    content: "";
    background-color: ${COLORS.BLACK};
    transform: scale(0);
    animation: loader8 1.5s infinite ease-in-out;
  }
  .loader-8:after {
    animation-delay: 0.75s;
    background-color: ${COLORS.BLACK};
  }

  .loader-6 {
    animation: loader6-1 1.5s infinite linear;
  }
  .loader-6:before,
  .loader-6:after {
    content: "";
    margin: -25px 0 0 -25px;
    top: 50%;
    left: 50%;
    background-color: ${COLORS.BLACK};
    animation-name: loader6-2;
  }
  .loader-6:after {
    animation-direction: reverse;
  }

  @keyframes loader6-1 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes loader6-2 {
    0% {
      transform: scale(0.2);
      left: 0%;
    }
    50% {
      transform: scale(1);
      left: 50%;
    }
    100% {
      transform: scale(0.2);
      left: 100%;
    }
  }

  @keyframes loader8 {
    0% {
      transform: translateX(-100%) scale(0);
    }
    50% {
      transform: translateX(0%) scale(1);
    }
    100% {
      transform: translateX(100%) scale(0);
    }
  }
`;
export default function LoadingBar({ type }: { type: number }) {
  return (
    <Wrapper>
      <Loading key={0}>
        <div className={`loader loader-${type}`} />
      </Loading>
    </Wrapper>
  );
}
