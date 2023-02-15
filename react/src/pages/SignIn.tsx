import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../helpers/LoginForm";

import FormWrapper from "../components/sections/Layout/FormWrapper";
import FormGroup from "../components/sections/Forms/Form";

import { useLoginMutation } from "../libs/redux/auth.api";
import { chatState } from "../components/meta/Context/ChatProvider";
import { Text } from "../components/general";
import { AppRoutes } from "../constants/routes.constants";

export default function SignIn() {
  const { auth, setAuth } = chatState();
  const [login, { data, isLoading, isError }] = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit = async (val: {}) => {
    login(val);
  };

  useEffect(() => {
    if (data) {
      localStorage.setItem("auth", JSON.stringify(data));
      navigate(AppRoutes.home());
      setAuth(true);
    }
  }, [isLoading]);

  return (
    <FormWrapper signIn>
      <>
        {isError && (
          <Text color="red" fSize="18px" fWeight="600" lineHeight="15px">
            Invalid email or password
          </Text>
        )}
        <br />
        <FormGroup signIn onFinish={onSubmit} formItems={LoginForm} />
      </>
    </FormWrapper>
  );
}
