import FooterTwo from "@/components/shared/FooterTwo";
import NavbarTwo from "@/components/shared/NavbarTwo";

export default function LayoutTwo({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavbarTwo />
      {children}
      <FooterTwo />
    </div>
  );
}
