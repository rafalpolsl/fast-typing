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
  error?: string;
};

export const Input = ({
  variant = "default",
  innerRef,
  error,
  ...props
}: InputProps) => {
  return (
    <div className="flex flex-col">
      <input
        ref={innerRef}
        {...variants[variant]}
        {...props}
        className={classNames(variants[variant].className, props.className)}
      />
      {error && <span className="text-sm text-prime_300 mt-2">{error}</span>}
    </div>
  );
};
