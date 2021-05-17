import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import UserContainer from "../../containers/user/UserContainer";

const useAuthenticated = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn, isInitialized, user } = UserContainer.useContainer();
  useEffect(() => {
    if (isInitialized && !isLoggedIn) {
      setIsLoading(false);
    }
  }, [isInitialized]);
  return { isLoading, isLoggedIn, user, isInitialized };
};

export default useAuthenticated;
