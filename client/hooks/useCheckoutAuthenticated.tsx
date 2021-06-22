import { useEffect } from "react";
import CheckoutContainer from "../containers/checkout/CheckoutContainer";
import UserContainer from "../containers/user/UserContainer";

const useCheckoutAuthenticated = () => {
  const {
    setAddress,
    setCity,
    setName,
    setPhone,
    setState,
    setEmail,
    resetInfo,
  } = CheckoutContainer.useContainer();
  const { isInitialized, isLoggedIn, user } = UserContainer.useContainer();
  useEffect(() => {
    if (isInitialized && isLoggedIn) {
      setName(user!.name);
      setPhone(user!.phone || "");
      setState(user!.state || "");
      setCity(user!.city || "");
      setAddress(user!.address || "");
      setEmail(user!.email);
    }
    if (isInitialized && !isLoggedIn) {
      resetInfo();
    }
  }, [isLoggedIn]);
};

export default useCheckoutAuthenticated;
