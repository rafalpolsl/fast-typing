"use client";
import { useState } from "react";
import classNames from "classnames";

import { Cta, CtaProps } from "../cta/cta";
import { ChevronDown, ChevronUp }  from "../media";

interface DropdownProps {
  items: DropdownItemProps[];
  className?: string;
}

export type DropdownItemProps = CtaProps & {
  label: string;
};

export const Dropdown = ({ items, className }: DropdownProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const showMenu = () => setIsMenuOpen(true);
  const hideMenu = () => setIsMenuOpen(false);

  return (
    <div className={classNames("relative", className)}>
      <div
        className={"absolute right-0 flex flex-col items-end"}
        onMouseEnter={showMenu}
        onMouseLeave={hideMenu}
      >
        <div className={"relative flex flex-col gap-3 right-0"}>
          <button className="w-max right-0 flex">
            {isMenuOpen ?  <ChevronUp /> : <ChevronDown/> }
          </button>
        </div>
        {isMenuOpen && items.length && (
          <div className={"relative flex flex-col gap-3 right-0 top-2 bg-prime_800 shadow-border_1 p-3 rounded-md w-max"}>
            {items.map((item) => (
              <Cta key={item.id} className={"w-full flex-1"} {...item}>
                {item.label}
              </Cta>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
