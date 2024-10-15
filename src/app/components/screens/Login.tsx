import { useGoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import React from "react";


export const Login = () => {
  const [authToken, setAuthToken] = React.useState<string | null>(null);

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      setAuthToken(tokenResponse.access_token)
    },
    scope: 'https://www.googleapis.com/auth/userinfo.email'
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute bottom-0 right-0">
        <button onClick={() => login()}>
          Log In With Google
        </button>



        <div>{authToken}</div>
      </div>
    </motion.div>
  );
}
