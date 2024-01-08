import styled from "styled-components";
import "bootstrap-icons/font/bootstrap-icons.css";

const Wrapper = styled.button``;

const StyledIcon = styled.i<{ border: number }>`
  ${({ border }) => `
   -webkit-text-stroke: ${border}px;  
`}
`;

export { StyledIcon, Wrapper };
