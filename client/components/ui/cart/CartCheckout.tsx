import CartContainer from "../../../containers/cart/CartContainer";
import CartItemCheckout from "./CarItemCheckout";

const CartCheckout = () => {
  const { cartItem, setShowModal, totalPrice } = CartContainer.useContainer();
  const cartItemsCheckout = cartItem.map(
    ({ product, quantity, totalPrice }) => (
      <CartItemCheckout
        productId={product._id}
        image={product.image}
        name={product.name}
        quantity={quantity}
        totalPrice={totalPrice}
        key={product._id}
      />
    )
  );
  return (
    <div className="flex flex-col w-full max-w-[25rem] xs:max-w-[18rem] space-y-3">
      <div className="items-center justify-end hidden pb-2 space-x-2 border-b-2 border-gray-700 xs:flex">
        <div className="text-lg font-semibold">Your Order</div>
        <div
          className="cursor-pointer hover:text-red-600 active:text-red-700"
          onClick={() => setShowModal(true)}
        >
          (Edit cart)
        </div>
      </div>
      {cartItemsCheckout}
      <div className="flex items-center justify-between pt-2 space-x-2 border-t-2 border-gray-700">
        <div className="text-lg">Total</div>
        <div className="text-lg">${totalPrice}</div>
      </div>
    </div>
  );
};
export default CartCheckout;
