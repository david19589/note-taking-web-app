import clsx from "clsx";
import ReactDOM from "react-dom";
import { useUIStore } from "../../stores/useUIStore";

const Modal = (props: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  const { darkMode } = useUIStore();

  if (!props.isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="md:p-[2rem] flex items-center justify-center fixed inset-0 bg-[#0000008f] p-[1.5rem] z-20"
      onClick={props.onClose}
    >
      <div
        className={clsx(
          darkMode
            ? "bg-[#2B303B] border-[0.0625rem] border-[#525866]"
            : "bg-[#FFF]",
          "relative w-full max-w-[30rem] p-[1rem] rounded-lg"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {props.children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
