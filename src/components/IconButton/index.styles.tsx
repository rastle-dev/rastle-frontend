import React from "react";
import styled from "styled-components";
import Icons from "../../constants/icon";
import "bootstrap-icons/font/bootstrap-icons.css";

const Wrapper = styled.button<{}>``;

const StyledIcon = styled.i<{ border: number }>`
  ${({ border }) => `
   -webkit-text-stroke: ${border}px;
`}
`;

export { StyledIcon, Wrapper };
