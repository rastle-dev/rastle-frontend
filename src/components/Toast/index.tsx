import { toast } from "react-toastify";

const toastMsg = (msg: string) => {
  toast.success(msg, {
    hideProgressBar: true,
    autoClose: 1000,
    draggable: true,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "light",
  });
};

export default toastMsg;
