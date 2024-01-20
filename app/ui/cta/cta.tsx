import Link, { type LinkProps } from "next/link";
import classnames from "classnames";

import type { ElementProps } from "@/app/types/common";

type CtaVariants = keyof typeof variants;

type ButtonProps = { as?: "button" } & ElementProps<"button">;
type AnchorProps = { as: "a" } & LinkProps & ElementProps<"a">;

export type CtaProps = { variant?: CtaVariants } & (ButtonProps | AnchorProps);

const variants = {
  default: {
    className:
      "p-4 leading-5 bg-prime_900 rounded-md hover:bg-prime_700 shadow-border_1",
  },
  // secondary: { className: "p-4" },
  // outlined: { className: "p-4" },
};

const checkIfAnchor = (
  props: AnchorProps | ButtonProps
): props is AnchorProps => props.as === "a";

export const Cta = ({
  variant = "default",
  ...props
}: CtaProps) => {
  if (checkIfAnchor(props)) {
    return (
      <Link
        {...variants[variant]}
        {...props}
        className={classnames(variants[variant].className, props.className)}
      />
    );
  } else {
    return (
      <button
        {...variants[variant]}
        {...props}
        className={classnames(variants[variant].className, props.className)}
      />
    );
  }
};
