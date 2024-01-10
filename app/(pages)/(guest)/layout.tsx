import { Cta } from "@/app/ui/cta/cta";

type GuestLayoutProps = {
  children: React.ReactNode;
};

export default function GuestLayout({ children }: GuestLayoutProps) {
  return (
    <>
      {children}
    </>
  );
}
