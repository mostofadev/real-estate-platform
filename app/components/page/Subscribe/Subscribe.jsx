import React from "react";
import SubscribeIcons from "./SubscribeIcons";
import MarginSection from "../../sections/MarginSection";
import SectionTitle from "../../ui/section/SectionTitle";
import SubscribeForm from "./SubscribeForm";

function Subscribe() {
  return (
    <div className="my-23">
      <MarginSection>
        <SubscribeIcons />
        <div className="my-12">
          <SectionTitle
            title={"Stay Up to Date"}
            description={
              "Subscribe to our newsletter to receive our weekly feed."
            }
          />
        </div>
        <div className="my-16">
            <SubscribeForm />
        </div>
      </MarginSection>
    </div>
  );
}

export default Subscribe;
