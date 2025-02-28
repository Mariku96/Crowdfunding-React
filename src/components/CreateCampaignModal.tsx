import { useState } from "react";
import { useActiveAccount } from "thirdweb/react"
import { client } from "../utils/client";
import { deployPublishedContract } from "thirdweb/deploys";
import { lineaSepolia } from "thirdweb/chains";

type CreateCampaignModalProps = {
    setIsModalOpen: (value: boolean) => void
}

const CreateCampaignModal = ({ setIsModalOpen }: CreateCampaignModalProps) => {
    const account = useActiveAccount();
    const [campaignName, setCampaignName] = useState<string>("");
    const [campaignDescription, setCampaignDescription] = useState<string>("");
    const [campaignGoal, setCampaignGoal] = useState<number>(1);
    const [campaignDeadline, setCampaignDeadline] = useState<number>(1);
    const [isDeployContract, setIsDeployContract] = useState<boolean>(false);

    const handleDeployContract = async () => {
        setIsDeployContract(true)
        try {
            const contractAddress = await deployPublishedContract({
                client: client,
                chain: lineaSepolia,
                account: account!,
                contractId: "CrowdFunding",
                contractParams: {
                    _name : campaignName,
                    _description : campaignDescription,
                    _goal :campaignGoal,
                    _durationInDays : campaignDeadline
                },
                publisher: "0xF57E1d9167bDE4d299186Bd0EC8Adb210bDDA7a7",
                version: "1.0.0",
            })
            alert("Campaign created successfully!")
        } catch (error) {
            console.log(error);

        } finally {
            setIsDeployContract(false)
            setIsModalOpen(false)
        }
    }

    const handleCampaignGoal = (value : number) => {
        if(value < 1){
            setCampaignGoal(1);
        } else {
            setCampaignGoal(value);
        }
    }

    const handleCampaignLength = (value: number) => {
        if(value < 1){
            setCampaignDeadline(1);
        } else {
            setCampaignDeadline(value)
        }
    }
    
    return (
        <div className="fixed inset-0 bg-black backdrop-opacity-75 flex justify-center items-center backdrop-blur-md">
            <div className="w-1/2 bg-slate-100 p-6 rounded-md">
                <div className="flex justify-between items-center mb-4">
                    <p className="text-lg font-semibold">Create Campaign</p>
                    <button onClick={() => setIsModalOpen(false)} className="text-sm px-4 py-2 bg-slate-600 text-white rounded-md">
                        Close 
                    </button>
                </div>
                <div className="flex flex-col">
                    <p>Campaign Name : </p>
                    <input type="text" value={campaignName} onChange={(e) => setCampaignName(e.target.value)} placeholder="Campaign Name"
                    className="mb-4 px-4 py-2 bg-slate-300 rounded-md" />
                    <p>Campaign Description : </p>
                    <textarea value={campaignDescription} onChange={(e) => setCampaignDescription(e.target.value)} placeholder="Campaign Description"
                        className="mb-4 px-4 py-2 bg-slate-300 rounded-md"></textarea>
                    <p>Campaign Total : </p>
                    <input type="number" value={campaignGoal} onChange={(e) => handleCampaignGoal(parseInt(e.target.value))} 
                    className="mb-4 px-4 py-2 bg-slate-300 rounded-md" />    
                    <p>{`Campaign Length (Days)`}</p>
                    <div className="flex space-x-4">
                        <input type="number"
                        value={campaignDeadline}
                        onChange={(e) => handleCampaignLength(parseInt(e.target.value))}
                        className="mb-4 px-4 py-2 bg-slate-300 rounded-md" />
                    </div>
                    <button disabled={isDeployContract} onClick={handleDeployContract} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
                        {
                            isDeployContract ? "Creating Campaign ..." : "Create Campaign"
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateCampaignModal