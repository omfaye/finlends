import Banner from "@/components/shared/Banner";
import banner from "@/../public/images/faq_banner.png";
import According from "@/components/Pages/Home/According";
import LoanSearch from "@/components/Pages/HomeTwo/LoanSearch";
import ClientTestimonal from "@/components/Pages/HomeTwo/ClientTestimonal";

const FAQs = () => {
  return (
    <div>
      <Banner
        heading={"FAQs"}
        items={["Home", "Pages", "FAQs"]}
        banner_img={banner}
      ></Banner>
      <According />
      <LoanSearch />
      <ClientTestimonal />
    </div>
  );
};

export default FAQs;
