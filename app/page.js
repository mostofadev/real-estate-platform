
import Layout from "./components/layout/Layout";
import HomeAbout from "./components/page/about/HomeAbout";
import Banner from "./components/page/banner/Banner";
import Blog from "./components/page/blog/Blog";
import FeaturedProperties from "./components/page/featuredProperties/featuredProperties";
import LocationHome from "./components/page/location/LocationHome";
import Subscribe from "./components/page/Subscribe/Subscribe";
import Testimonial from "./components/page/testimonial/Testimonial";

export default function Home() {
  return (
    <>
      <Layout>
        <Banner />
        <LocationHome />
        <FeaturedProperties />
        <Testimonial />
        <HomeAbout />
        <Blog />
        <Subscribe />
      </Layout>
    </>
  );
}
