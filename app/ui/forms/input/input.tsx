"use client";

import classNames from "classnames";

import type { ElementProps } from "@/app/types/common";
import type { RefObject } from "react";

const variants = {
  default: {
    className: "p-4 leading-5 rounded-md shadow-border_1 bg-prime_700",
  },
};

type InputVariants = keyof typeof variants;

type InputProps = ElementProps<"input"> & {
  variant?: InputVariants;
  innerRef?: RefObject<HTMLInputElement>;
};

export const Input = ({
  variant = "default",
  innerRef,
  ...props
}: InputProps) => {
  return (
    <input
      {...variants[variant]}
      {...props}
      className={classNames(variants[variant].className, props.className)}
      ref={innerRef}
    />
  );
};
