"use client";
import Authform from "@/components/Authform";
import { signInSchema } from "@/lib/validations";
import React from "react";

const SignIn = () => {
  return (
    <Authform
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={() => {}}
    />
  );
};

export default SignIn;
