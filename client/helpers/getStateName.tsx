import csc from "country-state-city";

export const getStateName = (stateCode: string, countryCode: string) => {
  return csc.getStateByCodeAndCountry(stateCode, countryCode).name;
};
