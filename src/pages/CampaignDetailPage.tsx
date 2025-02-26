import { getContract } from "thirdweb"
import { client } from "../utils/client"
import { lineaSepolia } from "thirdweb/chains"
import { useParams } from "react-router"
import { useReadContract } from "thirdweb/react"
import TierCard from "../components/TierCard"

const CampaignDetailPage = () =>{
    const {address} = useParams();
    const contract = getContract({
        client: client,
        chain: lineaSepolia,
        address: address as string
    })

    const { data: nameCampaign, isPending: isLoadingName } = useReadContract({
        contract,
        method: "function name() view returns (string)",
        params: [],
      });

    const { data : description, isPending } = useReadContract({
        contract,
        method: "function description() view returns (string)",
        params: [],
      });

      const { data : deadline, isPending: isLoadingDeadline } = useReadContract({
        contract,
        method: "function deadline() view returns (uint256)",
        params: [],
      });

      const { data : goal, isPending: isLoadingGoal } = useReadContract({
        contract,
        method: "function goal() view returns (uint256)",
        params: [],
      });

      const { data : balance, isPending:isLoadingBalance } = useReadContract({
        contract,
        method:
          "function getContractBalance() view returns (uint256)",
        params: [],
      });

      const { data: tiers, isPending: isLoadingTiers } = useReadContract({
        contract,
        method:
          "function getTiers() view returns ((string name, uint256 amount, uint256 backers)[])",
        params: [],
      });

      const { data : owner, isPending : isLoadingOwner } = useReadContract({
        contract,
        method: "function owner() view returns (address)",
        params: [],
      });

      const { data : status, isPending: isLoadingStatus } = useReadContract({
        contract,
        method:
          "function getCampaignStatus() view returns (uint8)",
        params: [],
      });
      
      const deadlineDate = new Date(parseInt(deadline?.toString() as string ) * 1000);
      const deadlineDatePassed = deadlineDate < new Date();

      const totalBalance = balance?.toString()
      const totalGoal = goal?.toString()
      let balancePercentage = (parseInt(totalBalance as string) / parseInt(totalGoal as string)) * 100;
      if (balancePercentage >= 100) {
          balancePercentage = 100;
      }
    
    return(
        <div className="mx-auto max-w-7xl px-2 mt-4 sm:px-6 lg:px-8">
            <div className="flex flex-row justify-between items-center">
                {
                    !isLoadingName && (
                        <p className="text-4xl font-semibold">{nameCampaign}</p>
                    )
                }
            </div>
            <div className="my-4">
                    <p className="text-lg font-semibold">Description</p>
                    {
                        !isLoadingDeadline && (

                            <p>{deadlineDate.toDateString()}</p>
                        )
                    }
                    <p>{description}</p>
                </div>
                <div className="mb-4">
                    <p className="text-lg font-semibold">Deadline</p>
                    {
                        !isLoadingDeadline && (
                            <p>{deadlineDate.toDateString()}</p>
                        )
                    }                
                </div>
                {
                    !isLoadingBalance && !isLoadingGoal &&(
                        <div className="mb-4">
                            <p className="text-lg font-semibold">Campaign Goal: ${goal?.toString()} </p>
                            <div className="relative w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
                                <div className="h-6 bg-blue-600 rounded-full dark:bg-blue-500 text-right" style={{width: `${balancePercentage}%`}}>
                                    <p className="text-white dark:text-white text-xs p-1">${balance?.toString()}</p>
                                </div>
                                <p className="absolute top-0 right-0 text-white dark:text-white text-xs p-1">
                                    {balancePercentage >= 100 ? "" : `${balancePercentage?.toString()}%`}
                                </p>
                            </div>
                        </div>   
                    )
                }
                <div>
                    <p className="text-lg font-semibold">Tiers: </p>
                    <div className="grid grid-cols-3 gap-4">
                        {
                           isLoadingTiers ? (
                            <p>Loading ...</p>
                           ) : (
                            tiers && tiers.length > 0 ? (
                                tiers.map((tier, index) =>(
                                    <TierCard 
                                    key={index}
                                    tier={tier}
                                    index={index}
                                    contract={contract}
                                    />
                                ))
                            ) : (
                                <p>No Tiers available</p>
                            )
                           )
                        }
                    </div>
                </div>
        </div>
    )
}

export default CampaignDetailPage