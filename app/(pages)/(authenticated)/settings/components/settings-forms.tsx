"use client";

import { ChangeEvent } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { Cta } from "@/app/ui/cta/cta";
import { Input } from "@/app/ui/forms/input/input";
import { removeScores } from "@/app/lib/cookies/score";
import { REQUIRED_FIELD_ERROR } from "@/app/lib/helpers/validation";
import { addUsernameToCookies } from "@/app/lib/cookies/auth";

type SettingsFormProps = {
  username: string;
};

const changeUsernameValidationSchema = Yup.object({
  username: Yup.string().required(REQUIRED_FIELD_ERROR),
});

export const ChangeUsernameForm = ({ username }: SettingsFormProps) => {
  const changeUsername = async (values: { username: string }) => {
    return addUsernameToCookies(values.username)
  };

  return (
    <Formik
      validationSchema={changeUsernameValidationSchema}
      initialValues={{
        username,
      }}
      onSubmit={changeUsername}
    >
      {({ values, errors, setFieldValue }) => {
        const changeValue = (event: ChangeEvent<HTMLInputElement>) =>
          setFieldValue(event.target.name, event.target.value);

        return (
          <Form className="flex flex-col gap-2">
            <div className="flex gap-3">
              <Input
                id="username"
                name="username"
                value={values.username}
                onChange={changeValue}
                error={errors.username}
              />
              <Cta type="submit" className="h-fit">Change</Cta>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export const RemoveScoreButton = () => {
  return <Cta onClick={removeScores}>Reset</Cta>;
};
