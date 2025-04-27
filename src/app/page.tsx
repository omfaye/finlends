import About from "@/components/Pages/Home/About";
import According from "@/components/Pages/Home/According";
import Calculetor from "@/components/Pages/Home/Calculetor";
import ChooseUs from "@/components/Pages/Home/ChooseUs";
import DownloadApp from "@/components/Pages/Home/DownloadApp";
import Featured from "@/components/Pages/Home/Featured";
import Hero from "@/components/Pages/Home/Hero";
import Testimonials from "@/components/Pages/Home/Testimonials";
import WorkingProcess from "@/components/Pages/Home/WorkingProcess";
import FooterOne from "@/components/shared/FooterOne";
import NavbarOne from "@/components/shared/NavbarOne";

const HomeOne = () => {
  return (
    <main>
      <NavbarOne />
      <Hero />
      <Featured />
      <ChooseUs />
      <WorkingProcess />
      <About />
      <Calculetor />
      <Testimonials />
      <DownloadApp />
      <According />
      <FooterOne />
    </main>
  );
};

export default HomeOne;
