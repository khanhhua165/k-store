import { useState } from "react";
import { createContainer } from "unstated-next";

const useUser = (initialState = null) => {
  return useState<string | null>(initialState);
};

const UserContext = createContainer(useUser);
export default UserContext;
