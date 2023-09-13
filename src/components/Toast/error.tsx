import { toast } from "react-toastify";

const errorMsg = (msg: string) => {
  toast.error(msg, {
    autoClose: 2000,
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
  });
};

export default errorMsg;
