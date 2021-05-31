import { useEffect } from "react";
import UserContainer from "../containers/user/UserContainer";

let logoutTimer: NodeJS.Timeout;

const useAuth = () => {
  const { setIsInitialized, login, logout, token, tokenExpirationDate } =
    UserContainer.useContainer();

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    console.log("yo");
    const storedData = JSON.parse(localStorage.getItem("userData")!);
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.user, storedData.token, new Date(storedData.expiration));
    }
    setIsInitialized(true);
  }, [login]);
};

export default useAuth;
