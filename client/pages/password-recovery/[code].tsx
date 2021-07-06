import axios from "axios";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import ResetPassword from "../../components/forms/ResetPassword";
import { API_URL, USER_ROUTE } from "../../constants/api";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const code = context.params!.code;
  try {
    await axios.get(`${API_URL}${USER_ROUTE}/password-recovery/${code}`);
  } catch (e: unknown) {
    return { notFound: true };
  }
  return { props: { code } };
};

const PasswordResetPage = ({
  code,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <ResetPassword code={code} />;
};

export default PasswordResetPage;
