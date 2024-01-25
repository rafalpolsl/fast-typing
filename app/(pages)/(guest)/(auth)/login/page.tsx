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

import type { ChangeEvent } from "react";

const loginValidationSchema = Yup.object().shape({
  userName: Yup.string().required("This field is required"),
});

const initialValues = {
  userName: "",
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
          //TODO: add auth and handler to send data to BE
          await addUsernameToCookies(values.userName);
          dispatch(authActions.restoreSession({ login: values.userName }));
          router.replace(ROUTES.home);
        }}
        validationSchema={loginValidationSchema}
      >
        {({ setFieldValue }) => {
          const changeFormikValue =
            (field: string) => (event: ChangeEvent<HTMLInputElement>) =>
              setFieldValue(field, event.target.value);

          return (
            <Form className="flex flex-col gap-4 bg-prime_800 p-6 w-full max-w-lg rounded-md shadow-border_1">
              <span className="flex flex-col gap-2">
                <label htmlFor="userName">Username</label>
                <Input
                  id="userName"
                  name="userName"
                  placeholder="Username"
                  onChange={changeFormikValue("userName")}
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
