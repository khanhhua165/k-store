import Head from "next/head";
import PasswordRecovery from "../../components/forms/PasswordRecovery";

const PasswordRecoveryPage = () => {
  return (
    <>
      <Head>
        <title>V-Mart | Password recovery</title>
        <meta
          name="description"
          content="Forgot your password? Get it back here"
        />
      </Head>
      <PasswordRecovery />
    </>
  );
};

export default PasswordRecoveryPage;
