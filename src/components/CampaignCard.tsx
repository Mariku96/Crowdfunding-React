import { getContract } from "thirdweb";
import { client } from "../utils/client";
import { lineaSepolia } from "thirdweb/chains";
import { useReadContract } from "thirdweb/react";
import { useNavigate } from "react-router";

type CampaignCardProps = {
    campaignAddress: string;
}

const CampaignCard = ({ campaignAddress }: CampaignCardProps) => {
    const contract = getContract({
        client: client,
        chain: lineaSepolia,
        address: campaignAddress
    })

    const navigate = useNavigate();

    const { data: campaignName } = useReadContract({
        contract,
        method: "function name() view returns (string)",
        params: []
    });

    const { data: campaignDescription } = useReadContract({
        contract,
        method: "function description() view returns (string)",
        params: []
    });

    const { data: goal, isPending: isLoadingGoal } = useReadContract({
        contract,
        method: "function goal() view returns (uint256)",
        params: [],
    });

    const { data: balance, isPending: isLoadingBalance } = useReadContract({
        contract,
        method:
            "function getContractBalance() view returns (uint256)",
        params: [],
    });

    const totalBalance = balance?.toString()
    const totalGoal = goal?.toString()
    let balancePercentage = (parseInt(totalBalance as string) / parseInt(totalGoal as string)) * 100;
    if (balancePercentage >= 100) {
        balancePercentage = 100;
    }
    return (
        <div>
            {
                !isLoadingBalance && !isLoadingGoal && (
                    <div className="mb-4 flex flex-col mx-auto l max-w-7xl justify-between bg-white border border-slate-200 rounded-lg shadow p-2 sm:p-5">
                         <div className="relative w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
                                <div className="h-6 bg-blue-600 rounded-full dark:bg-blue-500 text-right" style={{width: `${balancePercentage}%`}}>
                                    <p className="text-white dark:text-white text-xs p-1">${balance?.toString()}</p>
                                </div>
                                <p className="absolute top-0 right-0 text-white dark:text-white text-xs p-1">
                                    {balancePercentage >= 100 ? "" : `${balancePercentage?.toString()}%`}
                                </p>
                            </div>
                        <h5 className="wb-2 text-2xl font-bold tracking-tight">{campaignName}</h5>
                        <p className="wb-3 font-normal text-gray-700 dark:text-gray-400">{campaignDescription}</p>
                        <button onClick={() => navigate(`../detail/${campaignAddress}`)} className="mt-5 bg-navbar px-5 py-2 cursor-pointer rounded-full text-white  font-semibold hover:bg-slate-950 active:bg-slate-950 focus:ring focus:inset-ring-sky-200">View Campaign</button>
                    </div>
                )
            }
        </div>
    )
}

export default CampaignCard