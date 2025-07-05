import { errorIcon, infoIcon, successIcon, warningIcon } from "@/assets";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

const variantStyles = {
  info: { backgroundColor: "#E6F0FA", borderColor: "#9FCFFF", icon: infoIcon },
  success: {
    backgroundColor: "#ECF7EF",
    borderColor: "#BCF4BA",
    icon: successIcon,
  },
  warn: {
    backgroundColor: "#FFF7EC",
    borderColor: "#EBCDA4",
    icon: warningIcon,
  },
  error: {
    backgroundColor: "#FBECE9",
    borderColor: "#FFC1B4",
    icon: errorIcon,
  },
};

interface ToastProps {
  title?: string;
  message?: string;
  variant?: "info" | "success" | "warn" | "error";
  closeToast?: () => void;
}

const Toast = ({
  title,
  message,
  variant = "success",
  closeToast,
}: ToastProps) => {
  const { icon } = variantStyles[variant] || variantStyles.success;

  const CloseIcon = IoMdClose as React.FC<{ size?: number }>;

  return (
    <div className="flex items-center text-r-dark-2 w-full gap-5 justify-between">
      <div className="flex items-center gap-5">
        <div>
          <img src={icon} alt={variant} className="w-12" />
        </div>
        <div>
          {title ? <h5 className="mb-2 font-bold text-xl">{title}</h5> : ""}
          <p>{message}</p>
        </div>
      </div>
      <button onClick={closeToast}>
        <CloseIcon size={24} />
      </button>
    </div>
  );
};

export const showToast = ({
  message,
  variant = "success",
  title,
}: Partial<ToastProps>) => {
  const { backgroundColor, borderColor } =
    variantStyles[variant] || variantStyles.success;

  toast[variant](<Toast title={title} message={message} variant={variant} />, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeButton: false, //
    pauseOnHover: true,
    icon: false,
    style: {
      borderRadius: "12px",
      backgroundColor,
      border: `1px solid ${borderColor}`,
      width: "450px",
      fontFamily: "var(--primary-font)",
      top: "2rem",
      overflow: "hidden",
    },
  });
};
