import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "react-toastify";
import { API_URL, USER_ROUTE } from "../../../constants/api";
import UserContainer from "../../../containers/user/UserContainer";
import { User } from "../../../interfaces/User.interface";
import UserListItem from "./UserListItem";

const UserList = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [hasFetched, setHasFetched] = useState(false);
  const { isLoggedIn, token } = UserContainer.useContainer();

  useEffect(() => {
    if (isLoggedIn && token && !hasFetched) {
      (async () => {
        try {
          const response = (
            await axios.get<{ users: User[] }>(`${API_URL}${USER_ROUTE}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
          ).data;
          setUsers(response.users);
        } catch (e: unknown) {
          toast.warning("Unable to fetch resource, please try again!");
        } finally {
          setHasFetched(true);
        }
      })();
    }
  }, [isLoggedIn, token, hasFetched]);

  if (!hasFetched) {
    return (
      <div className="flex flex-col items-center mt-20">
        <div className="text-4xl font-semibold">All Users</div>
        <div className="flex flex-col items-center text-6xl pt-14">
          <ImSpinner2 className="duration-500 animate-spin" />
        </div>
      </div>
    );
  }

  if (hasFetched && users === null) {
    return (
      <div className="flex flex-col items-center mt-20">
        <div className="text-4xl font-semibold">All Users</div>
        <div className="flex flex-col items-center text-3xl pt-14">N/A</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mx-4 mt-20 mb-8">
      <div className="mb-4 text-4xl font-semibold">All Users</div>
      <div className="inline-block bg-white rounded-lg shadow">
        <table className="text-sm border-collapse table-fixed sm:text-base borshadow-sm">
          <thead className="">
            <tr>
              <th className="px-3 py-3 text-left border-b border-gray-200 ">
                User ID
              </th>
              <th className="px-3 py-3 text-left border-b border-gray-200 ">
                Name
              </th>
              <th className="px-3 py-3 text-left border-b border-gray-200">
                Email
              </th>
              <th className="px-3 py-3 text-center border-b border-gray-200">
                Admin
              </th>
              <th className="px-3 py-3 text-left border-b border-gray-200 "></th>
            </tr>
          </thead>
          <tbody>
            {users!.map((user) => (
              <UserListItem
                user={user}
                key={user._id}
                token={token!}
                setHasFetched={setHasFetched}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
