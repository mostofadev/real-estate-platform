
import TeamImg1 from "../../../../public/team/t1.png";
import TeamImg2 from "../../../../public/team/t2.png";
import TeamImg3 from "../../../../public/team/t3.png";
import TeamImg4 from "../../../../public/team/t4.png";
import MarginSection from "../../sections/MarginSection";
import TeamCard from "../../ui/card/TeamCard";
import SectionTitle from "../../ui/section/SectionTitle";

const teamMembers = [
  { id: 1, img: TeamImg1, name: "Milani Mou", position: "Business Agent" },
  { id: 2, img: TeamImg2, name: "John Doe", position: "Marketing Expert" },
  { id: 3, img: TeamImg3, name: "Jane Smith", position: "Developer" },
  { id: 4, img: TeamImg4, name: "Alex Ray", position: "Designer" },
  
];

export default function TeamItems() {
  return (
    <MarginSection>
      <>
        <div className="my-32">
          <SectionTitle title={"Our Agents"} />
          <div className="flex flex-wrap ">
            {teamMembers.map((member) => (
              <TeamCard
                key={member.id}
                imgSrc={member.img}
                name={member.name}
                position={member.position}
              />
            ))}
          </div>
        </div>
      </>
    </MarginSection>
  );
}
