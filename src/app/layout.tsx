import { Jost } from "next/font/google";
import "@/../../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import "@/../public/scss/style.scss";
import BackToTop from "@/components/UI/BackToTop";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
import Loading from "./loading";
import Bootstrap from "@/components/Bootstrap/Bootstrap";
import { Metadata } from "next";
import "./globals.css";
// import RTLButton from "@/components/RTLButton/RTLButton";

const jost = Jost({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--jost",
});

export const metadata: Metadata = {
  title: "FINVIEW-Financial Loan Review",
  description: "Financial Loan Review and Comparison Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={jost.className}>
        <Bootstrap>
          <Suspense fallback={<Loading />}>
            {children}
            <BackToTop />
            <ToastContainer />
            {/* <RTLButton /> */}
          </Suspense>
        </Bootstrap>
      </body>
    </html>
  );
}
