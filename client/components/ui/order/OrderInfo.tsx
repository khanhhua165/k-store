import { OrderResponse } from "../../../interfaces/Order.interface";
import CartItemCheckout from "../cart/CarItemCheckout";
import csc from "country-state-city";
import clsx from "clsx";
interface Props {
  order: OrderResponse;
}

const OrderInfo: React.FC<Props> = ({ order }) => {
  const {
    address,
    cart,
    city,
    createdAt,
    isDelivered,
    isPaid,
    name,
    phone,
    state,
    totalItem,
    totalPrice,
    email,
  } = order;
  const deliveryClasses = clsx({
    "text-yellow-500": !isDelivered,
    "text-green-500": isDelivered,
  });
  const paidClasses = clsx({
    "text-yellow-500": !isPaid,
    "text-green-500": isPaid,
  });
  const orderDate = new Date(Date.parse(createdAt)).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
  const items = cart.map(({ product, quantity, totalPrice }) => (
    <CartItemCheckout
      image={product.image}
      name={product.name}
      productId={product._id}
      quantity={quantity}
      totalPrice={totalPrice}
      key={product._id}
    />
  ));

  return (
    <div className="flex w-11/12 max-w-4xl mx-auto mb-6 mt-9">
      <div className="flex flex-col items-start w-full mx-1 space-y-3 xs:flex-row xs:space-y-0">
        <div className="flex flex-col space-y-3 xs:w-7/12 xs:max-w-[25rem]">
          <div className="flex items-center justify-start pb-2 space-x-2 border-b-2 border-gray-700">
            <div className="text-lg font-semibold">Your Information</div>
          </div>
          <div className="pr-3">
            <span className="font-semibold">Order Date:</span> {orderDate}
          </div>
          <div className="pr-3">
            <span className="font-semibold">Recipient:</span> {name}
          </div>
          <div className="pr-3">
            <span className="font-semibold">Email:</span> {email}
          </div>
          <div className="pr-3">
            <span className="font-semibold">Shipping Address:</span>
            {` ${address}, ${city}, ${
              csc.getStateByCodeAndCountry(state, "VN").name
            }.`}
          </div>
          <div className="pr-3">
            <span className="font-semibold">Phone:</span> {phone}
          </div>
          <div className="pr-3">
            <span className="font-semibold">Delivery Status:</span>
            <span className={deliveryClasses}>
              {isDelivered ? " Shipped" : " Delivering"}
            </span>
          </div>
          <div className="pr-3">
            <span className="font-semibold">Payment Status:</span>
            <span className={paidClasses}>
              {isPaid ? " Paid" : " Not Yet Paid"}
            </span>
          </div>
        </div>
        <div className="flex flex-col xs:w-5/12 w-full xs:max-w-[22rem] space-y-3">
          <div className="flex items-center justify-start pb-2 space-x-2 border-b-2 border-gray-700 xs:justify-end">
            <div className="text-lg font-semibold">Your Order</div>
          </div>
          {items}
          <div className="flex items-center justify-between pt-2 space-x-2 border-t-2 border-gray-700">
            <div className="text-lg">Total Item</div>
            <div className="text-lg">{totalItem}</div>
          </div>
          <div className="flex items-center justify-between space-x-2">
            <div className="text-lg">Total Price</div>
            <div className="text-lg">${totalPrice}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
