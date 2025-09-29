import MarginSection from "../../sections/MarginSection";
import FilterProduct from "./FilterProduct";

export default function VideoBanner() {
  return (
    <div className="w-full">
      {/* Background Video */}
      <div className="relative w-full min-h-52 sm:min-h-[500px] overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover filter brightness-70"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/image/BannerVideo.mp4" type="video/mp4" />
        </video>

        {/* Desktop Only - Overlap FilterService */}
        <div className="hidden lg:block absolute left-1/2 bottom-60  translate-y-1/2 -translate-x-1/2 w-full max-w-6xl px-4">
          <MarginSection>
            <FilterProduct />
          </MarginSection>
        </div>
      </div>

      {/* Mobile/Tablet - Separate FilterService */}
      <div className="block lg:hidden absolute left-1/2 top-[-170px]  translate-y-1/2 -translate-x-1/2 w-full max-w-6xl">
        <MarginSection>
          <FilterProduct />
        </MarginSection>
      </div>
    </div>
  );
}
