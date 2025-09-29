import Link from "next/link";

import MarginSection from "../sections/MarginSection";
import Image from "next/image";
import Logo from "../../../public/next.svg"
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import SocialIcons from "../ui/button/SocialIcons";

const Footer = () => {
  return (
    <div className="bg-[#F2F1F1]">
      <MarginSection>
      <footer className=" py-6 flex justify-center lg:justify-between items-center gap-10">
        <div className="">Copyright © 2025. mostofadev.com</div>
        <div className="lg:block hidden">
          <Image
            src={Logo}
            alt="Property Image"
            width={180}
            height={180}
            className="rounded-lg "
          />
        </div>
        <div className="lg:block hidden">
         <SocialIcons />
        </div>

      </footer>
    </MarginSection>
    </div>
  );
};

export default Footer;
