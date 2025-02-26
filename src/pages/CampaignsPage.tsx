import { getContract} from "thirdweb"
import { client } from "../utils/client"
import { lineaSepolia } from "thirdweb/chains"
import { CROWDFUNDING_FACTORY } from "../constants/contracts"
import { useReadContract } from "thirdweb/react"
import CampaignCard from "../components/CampaignCard"

const CampaignsPage = () => {

    const contract = getContract({
        client : client,
        chain : lineaSepolia,
        address: CROWDFUNDING_FACTORY,
    });

    const {data: campaigns, isLoading} = useReadContract({
        contract,
        method:
          "function getAllCampaigns() view returns ((address campaignAddress, address owner, string name, uint256 creationTime)[])",
        params: [],
      });

      

    return (
        <div className="mx-auto  max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="py-5 px-5 sm:py-10 sm:px-10">
            <h1 className="text-4xl font-bold mb-4">Campaigns</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {
                    isLoading ? (
                        <p>Loading ...</p>    
                    ) :
                    !isLoading && campaigns && (
                        campaigns.length > 0 ? (
                            campaigns.map((campaign) => (
                                <CampaignCard 
                                key={campaign.campaignAddress}
                                campaignAddress={campaign.campaignAddress}/>
                            ))
                        ) : (
                            <p>No Campaign found</p>
                        )
                        
                    )
                }
            </div>
        </div>
    </div>
    )
}

export default CampaignsPage