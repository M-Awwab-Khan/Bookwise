"use client";
import Authform from "@/components/Authform";
import { signUpSchema } from "@/lib/validations";
import React from "react";

const SignUp = () => {
  return (
    <Authform
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{
        email: "",
        password: "",
        fullname: "",
        university_id: 0,
        university_card: "",
      }}
      onSubmit={() => {}}
    />
  );
};

export default SignUp;
