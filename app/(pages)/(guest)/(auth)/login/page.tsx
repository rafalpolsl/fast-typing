"use client";
import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { Cta } from "@/app/ui/cta/cta";
import { Input } from "@/app/ui/forms/input/input";

import { authActions } from "@/app/lib/redux/slices/auth";
import { useAppDispatch } from "@/app/lib/redux/hooks";
import { addUsernameToCookies } from "@/app/lib/cookies/auth";
import { ROUTES } from "@/app/lib/routes";
import { REQUIRED_FIELD_ERROR } from "@/app/lib/helpers/validation";

import type { ChangeEvent } from "react";

const loginValidationSchema = Yup.object().shape({
  username: Yup.string().required(REQUIRED_FIELD_ERROR),
});

const initialValues = {
  username: "",
};

export default function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <div className="h-full flex justify-center items-center mx-4">
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          "use client";
          addUsernameToCookies(values.username);
          dispatch(authActions.createSession({ username: values.username }));
          
          router.replace(ROUTES.home);
        }}
        validationSchema={loginValidationSchema}
      >
        {({ errors, setFieldValue }) => {
          const changeFormikValue =
            (field: string) => (event: ChangeEvent<HTMLInputElement>) =>
              setFieldValue(field, event.target.value);

          return (
            <Form className="flex flex-col gap-4 bg-prime_800 p-6 w-full max-w-lg rounded-md shadow-border_1">
              <span className="flex flex-col gap-2">
                <label htmlFor="username">Username</label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Username"
                  onChange={changeFormikValue("username")}
                  error={errors.username}
                />
              </span>
              <Cta as={"button"} type={"submit"} className={"w-fit"}>
                Log in
              </Cta>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
