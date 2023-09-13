import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StyledContainer = styled(ToastContainer)`
  &&.Toastify__toast-container {
    padding: 0;
    width: auto;
    max-width: 575px;
    height: 5rem;
    text-align: center;
  }
  .Toastify__toast {
    position: relative;
    padding: 0;
    min-height: 0;
    border-radius: 30px;
    background-color: #3d3d3d;
  }
  .Toastify__toast-body {
    padding: 1.2rem 2.2rem;
    margin: 0;
    color: white;
    font-size: 1rem;
  }
`;

export default StyledContainer;
