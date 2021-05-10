import UserContext from "./UserContext";

const useSettingUser = () => {
  const [userId, setUserId] = UserContext.useContainer();
  const setUser = (id: string) => setUserId(id);
  const clearUser = () => setUserId(null);
  return { userId, setUser, clearUser };
};

export default useSettingUser;
