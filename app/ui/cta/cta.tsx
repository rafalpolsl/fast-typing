import Link, { type LinkProps } from "next/link";
import classnames from "classnames";

import type { ElementProps } from "@/app/types/common";

type CtaVariants = keyof typeof variants;

type ButtonProps = ElementProps<"button">;
type AnchorProps = LinkProps & ElementProps<"a">;

export type CtaProps = { variant?: CtaVariants; as?: "button" | "a" } & (
  | ButtonProps
  | AnchorProps
);

const variants = {
  default: { className: "p-4 leading-5 bg-prime_900 rounded-md hover:bg-prime_700 shadow-border_1" },
  // secondary: { className: "p-4" },
  // outlined: { className: "p-4" },
};

const checkIfAnchor = (
  as: "button" | "a",
  props: ButtonProps | AnchorProps
): props is AnchorProps => as === "a";

export const Cta = ({
  as = "button",
  variant = "default",
  ...props
}: CtaProps) => {
  if (checkIfAnchor(as, props)) {
    return (
      <Link
        {...variants[variant]}
        {...props}
        className={classnames(variants[variant].className, props.className)}
      />
    );
  }

  return (
    <button
      {...variants[variant]}
      {...props}
      className={classnames(variants[variant].className, props.className)}
    />
  );
};
