import { useCallback, useEffect, useState } from "react";
import { createContainer } from "unstated-next";
import { HOUR_IN_MILLISECOND } from "../../constants/time";
import { User } from "../../interfaces/User.interface";

const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [tokenExpirationDate, setTokenExpirationDate] =
    useState<Date | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const login = useCallback(
    (user: User, resToken: string, expirationDate: Date) => {
      setToken(resToken);
      setUser(user);
      const tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + HOUR_IN_MILLISECOND);
      setTokenExpirationDate(tokenExpirationDate);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          user,
          token: resToken,
          expiration: tokenExpirationDate.toISOString(),
        })
      );
      setIsLoggedIn(true);
    },
    []
  );

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUser(null);
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
  }, []);

  return {
    token,
    login,
    logout,
    user,
    isLoggedIn,
    isInitialized,
    setIsInitialized,
    setIsLoggedIn,
    setToken,
    setTokenExpirationDate,
    tokenExpirationDate,
  };
};
const UserContainer = createContainer(useAuth);
export default UserContainer;
