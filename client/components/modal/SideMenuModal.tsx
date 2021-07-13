import clsx from "clsx";
import Menubar from "../ui/menu/Menubar";
import { MdCancel } from "react-icons/md";
interface Props {
  showModal: boolean;
  cb: () => void;
}

const SideMenuModal: React.FC<Props> = ({ cb, showModal }) => {
  const modalClasses = clsx({
    "-translate-x-full": !showModal,
    "translate-x-0": showModal,
  });
  return (
    <>
      <div
        className={`fixed top-0 left-0 h-screen transition transform duration-[700ms] shadow-md z-50 overflow-y-auto pt-14 px-4 sm:hidden ${modalClasses} bg-gray-100`}
      >
        <div className="flex justify-end w-full mb-4">
          <MdCancel
            onClick={cb}
            className="text-4xl text-gray-500 cursor-pointer hover:text-gray-600 active:text-gray-700"
          />
        </div>
        <Menubar />
      </div>
      <div
        className={`fixed inset-0 z-40 bg-black opacity-50 sm:hidden transition duration-[700ms] ${
          !showModal && "hidden"
        }`}
        onClick={cb}
      ></div>
    </>
  );
};

export default SideMenuModal;
