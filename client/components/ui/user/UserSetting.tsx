import React, { useState } from "react";
import UserInfoSetting from "../../forms/UserInfoSetting";
import UserPasswordChange from "../../forms/UserPasswordChange";

const UserSetting: React.FC = () => {
  const [currentTab, setCurrentTab] = useState("info");

  return (
    <div className="flex flex-col items-center mx-auto mt-24">
      <div className="flex mb-3 space-x-3">
        <button
          className="px-4 py-1 text-lg text-white bg-blue-500 rounded-xl hover:bg-blue-600 active:bg-blue-700"
          onClick={() => setCurrentTab("info")}
        >
          Edit Profile
        </button>
        <button
          className="px-4 py-1 text-lg text-white bg-blue-500 rounded-xl hover:bg-blue-600 active:bg-blue-700"
          onClick={() => setCurrentTab("password")}
        >
          Change Password
        </button>
      </div>
      <div className="flex w-full mt-2">
        {currentTab === "info" ? <UserInfoSetting /> : <UserPasswordChange />}
      </div>
    </div>
  );
};

export default UserSetting;
