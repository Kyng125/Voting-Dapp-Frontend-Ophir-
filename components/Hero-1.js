import Image from "next/image";
import HeroImage from "./assets/removalai.png";

const Hero = () => {
  return (
    <div className="flex bg-black items-center justify-center ">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
        <div className="md:w-1/2 md:pr-4">
        <h2 className="text-3xl font-semibold font-bold text-[#44067e] mb-4">
          <strong>Decision: Empowering Members To Make Their Decisions</strong>
        </h2>
          <p className="text-white leading-relaxed mb-8">
            A voting Dapp will enable us to streamline and democratize our
            decision-making processes, ensuring that every member can actively
            participate and contribute to our organization's direction.
          </p>
          <p className="text-white leading-relaxed mb-8">
            At Ophir X Kyng, we believe in the power of collective decision-making.
            That's why we're excited to announce the launch of Decision, our
            innovative decentralized application (dapp) designed to
            revolutionize how we allocate event resources. With Decision, every
            member of our community has a voice in determining the direction of
            our organization.
          </p>
          <p className="text-white leading-relaxed mb-8 mt-2">
            Our voting dapp allows members to participate in important decisions
            regarding the allocation of event resources. We understand the
            significance of grants, donations, and investment funds in driving
            our organization forward. Through Decision, members can cast their
            votes on two crucial proposals: Research Projects and Operational
            Expenses.
          </p>
        </div>

        <div className="md:w-1/2 md:pl-4 mt-4">
          <Image
            src={HeroImage}
            alt="Placeholder image"
            width={600}
            height={600}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
