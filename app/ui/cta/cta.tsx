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
  link: { className: "underline underline-offset-8 hover:text-prime_300" },
};

const checkIfAnchor = (
  props: AnchorProps | ButtonProps
): props is AnchorProps => props.as === "a";

export const Cta = ({ variant = "default", ...props }: CtaProps) => {
  if (checkIfAnchor(props)) {
    const { as, ...anchorProps } = props;

    return (
      <Link
        {...variants[variant]}
        {...anchorProps}
        className={classnames(variants[variant].className, props.className)}
      />
    );
  } else {
    const { as, ...buttonProps } = props;

    return (
      <button
        {...variants[variant]}
        {...buttonProps}
        className={classnames(variants[variant].className, props.className)}
      />
    );
  }
};
