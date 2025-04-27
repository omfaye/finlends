import Banner from "@/components/shared/Banner";
import banner from "@/../public/images/blog_banner.png";
import BlogDes from "@/components/Pages/BlogDetails/BlogDes";
import BlogComments from "@/components/Pages/BlogDetails/BlogComments";
import CommentForm from "@/components/Pages/BlogDetails/CommentForm";
import BlogRightSide from "@/components/Pages/BlogDetails/BlogRightSide";

const BlogDetails = () => {
  return (
    <div className="overflowHidden">
      <Banner
        heading={"Blog-Details"}
        items={["Home", "Pages", "Blog-Details"]}
        banner_img={banner}
      ></Banner>
      <section className="blog-details section">
        <div className="container ">
          <div className="row gy-4 gy-lg-0">
            <div className="col-12 col-lg-7 col-xl-8">
              <div className="gap-4 flex-column overflow-x-hidden">
                <BlogDes />
                <BlogComments />
                <CommentForm />
              </div>
            </div>

            <div className="col-12 col-lg-5 col-xl-4">
              <BlogRightSide />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetails;
