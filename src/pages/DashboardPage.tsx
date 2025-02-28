import { getContract } from "thirdweb";
import { client } from "../utils/client";
import { lineaSepolia } from "thirdweb/chains";
import { CROWDFUNDING_FACTORY } from "../constants/contracts";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import CampaignCard from "../components/CampaignCard";
import { useState } from "react";
import CreateCampaignModal from "../components/CreateCampaignModal";

const DashboardPage = () => {
    const account = useActiveAccount();
    const contract = getContract({
        client: client,
        chain: lineaSepolia,
        address : CROWDFUNDING_FACTORY
    })

    const [isModalOpen, setIsModalOpen] = useState(false);

    const {data, isLoading} = useReadContract({
        contract,
        method:
          "function getUserCampaigns(address _user) view returns ((address campaignAddress, address owner, string name, uint256 creationTime)[])",
        params: [account?.address as string],
    });
    return(
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="py-5 px-5 sm:py-10 sm:px-10 flex flex-row justify-between items-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
            <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-blue-500 text-white items-center mb-8">
                Create Campaign
            </button>
        </div>
        <p className="text-2xl font-semibold mb-4">My Campaigns: </p>
        <div className="grid grid-cols-3 gap-4">
            {
                !isLoading && data && (
                    data && data.length > 0 ? (
                        data.map((campaign, index) =>(
                            <CampaignCard 
                            key={index}
                            campaignAddress={campaign.campaignAddress} />
                        ))
                    ) : (
                        <p>No Campaign not found</p>
                    )
                ) 
            }
            {
                isModalOpen &&(
                    <CreateCampaignModal setIsModalOpen={setIsModalOpen} />
                )
            }
        </div>
    </div>
    )
}

export default DashboardPage;