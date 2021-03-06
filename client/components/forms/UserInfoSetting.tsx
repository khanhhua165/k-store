import React from "react";
import csc from "country-state-city";
import Select from "react-select";
import Creatable from "react-select/creatable";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import UserContainer from "../../containers/user/UserContainer";
import NumberFormat from "react-number-format";
import axios from "axios";
import { API_URL, USER_ROUTE } from "../../constants/api";
import { toast } from "react-toastify";
import { ImSpinner8 } from "react-icons/im";
import { getStateName } from "../../helpers/getStateName";

type Inputs = {
  name: string;
  phone: string;
  state: { label: string; value: string };
  city: { label: string; value: string };
  address: string;
};

const cityOptions = csc.getStatesOfCountry("VN").map(({ name, isoCode }) => ({
  value: isoCode,
  label: name,
}));

const UserInfoSetting: React.FC = () => {
  const { user, token, setUser, tokenExpirationDate } =
    UserContainer.useContainer();
  const { name, address, phone, city, state } = user!;
  const {
    handleSubmit,
    control,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      state: state
        ? {
            value: state,
            label: getStateName(state, "VN"),
          }
        : undefined,
    },
  });
  const watchState = watch("state");
  const onSubmit: SubmitHandler<Inputs> = async ({
    address,
    city,
    name,
    phone,
    state,
  }) => {
    try {
      await axios.patch(
        `${API_URL}${USER_ROUTE}/update`,
        { address, city: city.value, name, phone, state: state.value },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const newUser = {
        ...user!,
        address,
        city: city.value,
        name,
        phone,
        state: state.value,
      };
      setUser(newUser);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          user: newUser,
          token,
          expiration: tokenExpirationDate!.toISOString(),
        })
      );
      toast.success("Profile updated successfully!!");
    } catch (e: unknown) {
      toast.warning("There was some unexpected error, please try again!!");
    }
  };
  return (
    <form
      className="flex flex-col w-3/4 max-w-md mx-auto mb-4 sm:text-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <span className="label-style">Name</span>
      <input
        className="input-style"
        type="text"
        placeholder="Your Name"
        defaultValue={name}
        {...register("name", {
          required: "You need to input your name",
        })}
      />
      {errors.name && (
        <p className="input-error">
          <span>{errors.name.message}</span>
        </p>
      )}

      <span className="label-style">Phone Number</span>
      <Controller
        name="phone"
        {...(phone ? { defaultValue: phone } : {})}
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
          <span>You need to input a valid phone number</span>
        </p>
      )}

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
          <span>You need to choose a state</span>
        </p>
      )}

      {watchState && (
        <>
          <span className="mb-1 label-style">City</span>
          <Controller
            {...(city
              ? {
                  defaultValue: {
                    value: city,
                    label: city,
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
              <span>You need to choose a city</span>
            </p>
          )}
        </>
      )}

      <span className="label-style">Address</span>
      <input
        className="input-style"
        {...(address ? { defaultValue: address } : {})}
        type="text"
        placeholder="Your Address"
        {...register("address", {
          required: "You need to input an address",
        })}
      />
      {errors.address && (
        <p className="input-error">
          <span>{errors.address.message}</span>
        </p>
      )}
      <button
        disabled={isSubmitting}
        type="submit"
        className="flex justify-center py-2 mt-3 bg-blue-600 border-2 border-gray-300 rounded-md cursor-pointer text-gray-50 hover:bg-blue-700 focus:bg-blue-800"
      >
        {isSubmitting ? (
          <span className="duration-300 animate-spin">
            <ImSpinner8 />
          </span>
        ) : (
          "Save Changes"
        )}
      </button>
    </form>
  );
};

export default UserInfoSetting;
