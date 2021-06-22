import { createContainer } from "unstated-next";
import { useCallback, useState } from "react";

const useCheckout = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [isCOD, setIsCOD] = useState(true);
  const resetInfo = useCallback(() => {
    setName("");
    setEmail("");
    setPhone("");
    setPhone("");
    setState("");
    setCity("");
    setAddress("");
    setIsCOD(true);
  }, []);
  return {
    name,
    setName,
    phone,
    setPhone,
    state,
    setState,
    city,
    setCity,
    address,
    setAddress,
    isCOD,
    setIsCOD,
    email,
    setEmail,
    resetInfo,
  };
};

const CheckoutContainer = createContainer(useCheckout);

export default CheckoutContainer;
