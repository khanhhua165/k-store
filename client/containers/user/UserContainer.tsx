import { useCallback, useEffect, useState } from "react";
import { createContainer } from "unstated-next";
import { User } from "../../interfaces/User.interface";

let logoutTimer: NodeJS.Timeout;

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
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
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

  return { token, login, logout, user, isLoggedIn, isInitialized };
};
const UserContainer = createContainer(useAuth);
export default UserContainer;
