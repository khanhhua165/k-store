import { User } from "../../../interfaces/User.interface";
import { FaTrashAlt, FaCheck } from "react-icons/fa";
import React, { useState } from "react";
import axios from "axios";
import { API_URL, USER_ROUTE } from "../../../constants/api";
import { toast } from "react-toastify";
import { ImSpinner8 } from "react-icons/im";
import { ImCross } from "react-icons/im";

interface Props {
  user: User;
  setHasFetched: (a: boolean) => void;
  token: string;
}

const UserListItem: React.FC<Props> = ({ user, token, setHasFetched }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTogglingType, setIsTogglingType] = useState(false);
  const [currentType, setCurrentType] = useState(user.isAdmin);

  const handleChangeUserType = async () => {
    setIsTogglingType(true);
    try {
      await axios.patch(
        `${API_URL}${USER_ROUTE}/update-type`,
        { isAdmin: !user.isAdmin, id: user._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCurrentType(!currentType);
      setIsTogglingType(false);
    } catch (e: unknown) {
      setIsTogglingType(false);
      toast.error("Operation was unsuccessful, please try again!");
    }
  };

  const handleDeleteUser = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`${API_URL}${USER_ROUTE}/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsDeleting(false);
      setHasFetched(false);
    } catch (e: unknown) {
      setIsDeleting(false);
      toast.error("Operation was unsuccessful, please try again!");
    }
  };

  const adminChangeName = currentType
    ? "Change to Customer"
    : "Change to Admin";

  return (
    <tr className="">
      <td className="px-3 py-3 break-all border-b border-gray-200">
        {user._id}
      </td>
      <td className="px-3 py-3 break-all border-b border-gray-200">
        {user.name.split(" ")[0].toString()}
      </td>
      <td className="px-3 py-3 break-all border-b border-gray-200">
        {user.email}
      </td>
      <td className="px-3 py-3 break-all border-b border-gray-200">
        <div className="flex flex-col items-center justify-center space-y-1">
          <div className="text-xl">
            {currentType ? (
              <FaCheck className="text-green-700" />
            ) : (
              <ImCross className="text-red-600" />
            )}
          </div>
          {isTogglingType ? (
            <span className="duration-300 animate-spin">
              <ImSpinner8 />
            </span>
          ) : (
            <span
              className="text-red-600 cursor-pointer hover:underline"
              onClick={handleChangeUserType}
            >
              {adminChangeName}
            </span>
          )}
        </div>
      </td>
      <td className="px-3 py-3 text-center border-b border-gray-200">
        {isDeleting ? (
          <span className="text-xl duration-300 animate-spin">
            <ImSpinner8 />
          </span>
        ) : (
          <button onClick={handleDeleteUser} className="text-xl">
            <FaTrashAlt />
          </button>
        )}
      </td>
    </tr>
  );
};

export default UserListItem;
