import CheckoutContainer from "../../../containers/checkout/CheckoutContainer";

const RecipientInfo = () => {
  const { address, city, email, name, phone, state } =
    CheckoutContainer.useContainer();
  if (!address || !city || !email || !name || !phone || !state) return null;
  return (
    <div className="flex flex-col w-full max-w-md sm:text-lg">
      <div>Name: {name}</div>
      <div className="">Phone number: {phone}</div>
      <div className="">Email: {email}</div>
      <div className="">
        Address: {`${address}, ${city}, ${state}, Vietnam.`}
      </div>
    </div>
  );
};

export default RecipientInfo;
