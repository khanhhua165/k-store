import csc from "country-state-city";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineWarning } from "react-icons/ai";
import NumberFormat from "react-number-format";
import Select from "react-select";
import Creatable from "react-select/creatable";
import CheckoutContainer from "../../containers/checkout/CheckoutContainer";
import UserContainer from "../../containers/user/UserContainer";

type Inputs = {
  name: string;
  phone: string;
  email: string;
  state: { label: string; value: string };
  city: { label: string; value: string };
  address: string;
};

interface Props {
  cb: (showInfo: boolean) => void;
}

const cityOptions = csc.getStatesOfCountry("VN").map(({ name, isoCode }) => ({
  value: isoCode,
  label: name,
}));
const ShippingInfo: React.FC<Props> = ({ cb }) => {
  const {
    address,
    city,
    email,
    name,
    phone,
    state,
    setAddress,
    setCity,
    setEmail,
    setName,
    setPhone,
    setState,
  } = CheckoutContainer.useContainer();
  const { user } = UserContainer.useContainer();

  const defaultState = state || user?.state || null;

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    watch,
  } = useForm<Inputs>({
    defaultValues: {
      state: defaultState
        ? {
            value: defaultState,
            label: csc.getStateByCodeAndCountry(defaultState, "VN").name,
          }
        : undefined,
    },
  });
  const watchState = watch("state");
  const defaultName = name || user?.name || "";
  const defaultEmail = email || user?.email || "";
  const defaultPhone = phone || user?.phone || "";
  const defaultCity = city || user?.city || "";
  const defaultAddress = address || user?.address || "";

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setName(data.name);
    setEmail(data.email);
    setPhone(data.phone);
    setState(data.state.value);
    setCity(data.city.value);
    setAddress(data.address);
    cb(false);
  };

  return (
    <form
      className="flex flex-col w-full max-w-md sm:text-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex pb-2 text-xl border-b-2 border-gray-700">
        Recipient
      </div>
      <span className="label-style">Name</span>
      <input
        className="input-style"
        type="text"
        placeholder="Your Name"
        {...(defaultName ? { defaultValue: defaultName } : {})}
        {...register("name", {
          required: "You need to input your name",
        })}
      />
      {errors.name && (
        <p className="input-error">
          <AiOutlineWarning />
          <span>{errors.name.message}</span>
        </p>
      )}

      <div className="flex flex-col w-full xs:flex-row xs:space-x-2">
        <div className="flex flex-col xs:w-3/5">
          <span className="label-style">Email</span>
          <input
            type="text"
            placeholder="Email"
            className="input-style"
            {...(defaultEmail ? { defaultValue: defaultEmail } : {})}
            {...register("email", {
              required: "You need to input an email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "You need to input a valid email",
              },
            })}
          />
          {errors.email && (
            <p className="input-error">
              <AiOutlineWarning />
              <span>{errors.email.message}</span>
            </p>
          )}
        </div>
        <div className="flex flex-col xs:w-2/5">
          <span className="label-style">Phone Number</span>
          <Controller
            name="phone"
            {...(defaultPhone ? { defaultValue: defaultPhone } : {})}
            control={control}
            rules={{ pattern: /^[0-9]*$/ }}
            render={({ field }) => (
              <NumberFormat
                {...field}
                isNumericString={true}
                format="##########"
                allowEmptyFormatting
                mask="_"
                className="input-style"
              />
            )}
          />
          {errors.phone && (
            <p className="input-error">
              <AiOutlineWarning />
              <span>Invalid phone</span>
            </p>
          )}
        </div>
      </div>

      <span className="mb-1 label-style">State</span>
      <Controller
        name="state"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Select
            {...field}
            className="text-base border border-blue-600"
            isClearable={true}
            isSearchable={true}
            options={cityOptions}
          />
        )}
      />
      {errors.state && (
        <p className="input-error">
          <AiOutlineWarning />
          <span>You need to choose a state</span>
        </p>
      )}

      {watchState && (
        <>
          <span className="mb-1 label-style">City</span>
          <Controller
            {...(defaultCity
              ? {
                  defaultValue: {
                    value: defaultCity,
                    label: defaultCity,
                  },
                }
              : {})}
            name="city"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Creatable
                {...field}
                className="text-base border border-blue-600"
                isClearable={true}
                isSearchable={true}
                options={csc
                  .getCitiesOfState("VN", watchState.value)
                  .map(({ name }) => ({
                    value: name,
                    label: name,
                  }))}
              />
            )}
          />
          {errors.city && (
            <p className="input-error">
              <AiOutlineWarning />
              <span>You need to choose a city</span>
            </p>
          )}
        </>
      )}
      <span className="label-style">Address</span>
      <input
        className="input-style"
        {...(defaultAddress ? { defaultValue: defaultAddress } : {})}
        type="text"
        placeholder="Your Address"
        {...register("address", {
          required: "You need to input an address",
        })}
      />
      {errors.address && (
        <p className="input-error">
          <AiOutlineWarning />
          <span>{errors.address.message}</span>
        </p>
      )}
      <button
        disabled={isSubmitting}
        type="submit"
        className="flex justify-center py-2 mt-3 bg-blue-600 border-2 border-gray-300 rounded-md cursor-pointer text-gray-50 hover:bg-blue-700 focus:bg-blue-800"
      >
        Continue to Payment
      </button>
    </form>
  );
};

export default ShippingInfo;
