import Image from "next/image";
import Research from "./assets/research.jpeg";
import Operation from "./assets/operation.jpeg";
import Infrastructure from "./assets/Infrastructure.jpeg";
import Talent from "./assets/Talent.jpeg";
import Hackathons from "./assets/Hackathons.png";
import Grant from "./assets/Grant.jpeg";
import ContractABI from "./ContractABI";
import { ethers } from "ethers";
import { useState } from "react";
import { useSnackbar } from "notistack";

const VoteForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const contractAddress = "0x01cdf001d2dfb001d41658f3232e7ed117608df5";

  const [value, setValue] = useState("");

  const handleInput = (event) => {
    const inputValue = event.target.checked ? event.target.value : "";
    setValue(inputValue);
    console.log(inputValue);
  };

  const winningCandidate = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const votingContract = new ethers.Contract(
        contractAddress,
        ContractABI,
        signer
      );
      console.log(votingContract);
      const winningName = await votingContract.winningName();
      console.log(winningName)
      const convertByte = ethers.utils.parseBytes32String(winningName);

      console.log(convertByte);
      enqueueSnackbar(convertByte + " Project Is Leading", {
        variant: "success",
      });
    } catch (error) {
      console.log("Error Message: ", error.data);
    }
  };

  const voteCandidate = async (event) => {
    event.preventDefault();
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      let receipt;
      const votingContract = new ethers.Contract(
        contractAddress,
        ContractABI,
        signer
      );
      const voterInfo = await votingContract.voters(address);
      const hasVoted = voterInfo.anyvotes;
      console.log(hasVoted);

      if (hasVoted) {
        console.log("Already voted");
      } else {
        // Process the vote
        console.log("Voting...");
      }

      // Proceed with voting
      const transaction = await votingContract.vote(value);

      receipt = await wait(transaction);

      console.log("Vote submitted successfully!");
      enqueueSnackbar("Vote Successful", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.data.message, { variant: "error" });
      console.log("Failed, reason: ", error.data.message);
    }
  };

  return (
    <>
      <span className="flex bg-black items-center justify-center">
        <h1 className="text-3xl font-bold text-[#44067e]">The Voting Form</h1>
      </span>
      <div className="flex flex-col md:flex-row bg-black py-8 px-4">
        <div className="md:w-1/2 bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-center">
            <h3 className="text-xl font-semibold text-black mb-4">
              Research Projects
            </h3>
          </div>
          <div className="flex justify-center">
            <Image
              src={Research}
              alt="Placeholder image"
              className="rounded-lg mb-4"
            />
          </div>
          <p className="text-black leading-relaxed">
            With Research Projects, we aim to foster innovation and explore new
            frontiers. Members can vote on proposals that focus on
            groundbreaking research initiatives, seeking to push the boundaries
            of knowledge in our industry. By supporting Research Projects, we
            invest in the future and nurture a culture of discovery within our
            organization.
          </p>
        </div>

        <div className="md:w-1/2 bg-white rounded-lg shadow-lg p-8 mt-4 md:mt-0 md:ml-4">
          <div className="flex justify-center">
            <h3 className="text-xl font-semibold text-black mb-4">
              Operational Resources
            </h3>
          </div>
          <div className="flex justify-center">
            <Image
              src={Operation}
              alt="Placeholder image"
              className="rounded-lg mb-4"
              height={300}
              width={400}
            />
          </div>
          <p className="text-black leading-relaxed">
            Operational Expenses play a critical role in the day-to-day
            functioning of our organization. Voting on Operational Expenses
            proposals enables members to make decisions regarding the allocation
            of resources for essential activities such as infrastructure,
            staffing, and logistical needs. These decisions directly impact our
            operational efficiency and sustainability.
          </p>
        </div>

        <div className="md:w-1/2 bg-white rounded-lg shadow-lg p-8 mt-4 md:mt-0 md:ml-4">
          <div className="flex justify-center">
            <h3 className="text-xl font-semibold text-black mb-4">
              Infrastructure Development
            </h3>
          </div>
          <div className="flex justify-center">
            <Image
              src={Infrastructure}
              alt="Placeholder image"
              className="rounded-lg mb-4"
            />
          </div>
          <p className="text-black leading-relaxed">
          Infrastructure Development is crucial for our 
          organization's growth and stability. Voting on proposals 
          empowers members to allocate resources for building a strong 
          infrastructure, supporting our operations, and driving technological 
          advancements. By participating in these decisions, members contribute to our 
          long-term efficiency and effectiveness.
          </p>
        </div>

        <div className="md:w-1/2 bg-white rounded-lg shadow-lg p-8 mt-4 md:mt-0 md:ml-4">
          <div className="flex justify-center">
            <h3 className="text-xl font-semibold text-black mb-4">
              Talent Acquisition
            </h3>
          </div>
          <div className="flex justify-center">
            <Image
              src={Talent}
              alt="Placeholder image"
              className="rounded-lg mb-4"
            />
          </div>
          <p className="text-black leading-relaxed">
          Talent Acquisition drives our organization's success. 
          Voting on proposals shapes our strategy for attracting skilled 
          professionals. By participating, members build a talented, 
          diverse workforce that fosters innovation and collaboration. 
          Investing in talent is investing in our future.
          </p>
        </div>

        <div className="md:w-1/2 bg-white rounded-lg shadow-lg p-8 mt-4 md:mt-0 md:ml-4">
          <div className="flex justify-center">
            <h3 className="text-xl font-semibold text-black mb-4">
              Hackathons
            </h3>
          </div>
          <div className="flex justify-center">
            <Image
              src={Hackathons}
              alt="Placeholder image"
              className="rounded-lg mb-4"
            />
          </div>
          <p className="text-black leading-relaxed">
          Hackathons drive innovation, collaboration, 
          and creativity. Voting shapes and supports these 
          dynamic events. Members foster experimentation, 
          problem-solving, and cross-functional learning. 
          It's a platform to showcase skills, build connections, 
          and contribute to our organization's success through 
          cutting-edge projects.
          </p>
        </div>

        <div className="md:w-1/2 bg-white rounded-lg shadow-lg p-8 mt-4 md:mt-0 md:ml-4">
          <div className="flex justify-center">
            <h3 className="text-xl font-semibold text-black mb-4">
              Grant Funding
            </h3>
          </div>
          <div className="flex justify-center">
            <Image
              src={Grant}
              alt="Placeholder image"
              className="rounded-lg mb-4"
            />
          </div>
          <p className="text-black leading-relaxed">
          Grant funding drives impactful initiatives. Voting empowers 
          members to award financial support. It enables groundbreaking 
          research, education, and community initiatives. Grants turn 
          innovative ideas into reality, fostering growth, 
          collaboration, and positive change.
          </p>
        </div>
        
      </div>

      <div className="flex bg-black justify-center py-4 px-8 mt-4">
        <form onSubmit={voteCandidate}>
          <label className="block text-white mb-4">
            <input
              type="radio"
              name="option"
              value="0"
              className="mr-2"
              onChange={handleInput}
            />
            Research Projects
          </label>
          <label className="block text-white mb-4">
            <input
              type="radio"
              name="option"
              value="1"
              className="mr-2"
              onChange={handleInput}
            />
            Operational Expenses
          </label>
          <label className="block text-white mb-4">
            <input
              type="radio"
              name="option"
              value="2"
              className="mr-2"
              onChange={handleInput}
            />
            Infrastructure Development
          </label>
          <label className="block text-white mb-4">
            <input
              type="radio"
              name="option"
              value="3"
              className="mr-2"
              onChange={handleInput}
            />
            Talent Acquisition
          </label>
          <label className="block text-white mb-4">
            <input
              type="radio"
              name="option"
              value="4"
              className="mr-2"
              onChange={handleInput}
            />
            Hackathons
          </label>
          <label className="block text-white mb-4">
            <input
              type="radio"
              name="option"
              value="5"
              className="mr-2"
              onChange={handleInput}
            />
            Grant Funding
          </label>
          <button
            type="submit"
            className="bg-[#44067e] text-white py-2 px-4 rounded-lg shadow-lg"
          >
            Vote Now
          </button>
        </form>
      </div>

      <div className="flex bg-black justify-end mt-4 mr-4">
        <button
          className="bg-[#44067e] text-white py-2 px-4 shadow-md"
          onClick={winningCandidate}
        >
          Check Election Result
        </button>
      </div>
    </>
  );
};

export default VoteForm;
