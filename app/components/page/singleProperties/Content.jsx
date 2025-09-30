import React from "react";
import Gallery from "./Gallery";
import GalleryOne from "../../../../public/Image/gallery1.jpg";
import GalleryTwo from "../../../../public/Image/gallery2.jpg";
import GalleryThree from "../../../../public/Image/gallery3.jpg";
import GalleryFour from "../../../../public/Image/gallery4.jpg";
import GalleryFive from "../../../../public/Image/gallery5.jpg";
import Video from "./Video";
import Map from "./Map";
function Content({ activeTab }) {
     const propertyImages = [
       GalleryOne,
       GalleryTwo,
       GalleryThree,
       GalleryFour,
       GalleryFive,
     ];
  return (
    <div className="mt-4 p-2 lg:p-4">
      {activeTab === "gallery" && (
        <div>
          <Gallery images={propertyImages} />
        </div>
      )}

      {activeTab === "video" && (
        <div className="flex justify-center items-center w-full ">
          <Video videoUrl="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
        </div>
      )}

      {activeTab === "googleMap" && (
        <div className="flex justify-center items-center w-full ">
          <Map MapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.903547322509!2d90.39146351429718!3d23.75088589462233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf56c23bfb6b%3A0x39b3e88e5aa8f52b!2sDhaka!5e0!3m2!1sen!2sbd!4v1614312041211!5m2!1sen!2sbd" />
        </div>
      )}
    </div>
  );
}

export default Content;
