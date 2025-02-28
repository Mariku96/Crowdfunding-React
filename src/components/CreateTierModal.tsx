import { useState } from "react";
import { prepareContractCall, ThirdwebContract } from "thirdweb";
import { TransactionButton } from "thirdweb/react";

type CreateTierModalProps = {
    setIsModalOpen: (value: boolean) => void;
    contract: ThirdwebContract;
}

const CreateTierModal = ({
    setIsModalOpen,
    contract
}: CreateTierModalProps) => {
    const [tierName, setTierName] = useState<string>("");
    const [tierAmount, setTierAmount] = useState<bigint>(1n);
    return (
        <div className="fixed inset-0 bg-black flex justify-center items-center backdrop-blur-md opacity-75">
            <div className="w-1/2 bg-slate-100 p-6 rounded-md">
                <div className="flex justify-between items-center mb-4">
                    <p className="text-lg font-semibold">Create funding tier</p>

                    <button onClick={() => setIsModalOpen(false)} className="text-sm px-4 py-2 bg-slate-600 text-white rounded-md">
                        Close
                    </button>

                </div>
                <div className="flex flex-col">
                <label>Tier Name</label>
                <input type="text" value={tierName}
                    onChange={(e) => setTierName(e.target.value)}
                    placeholder="Tier Name"
                    className="mb-4 px-4 py-2 bg-slate-200 rounded-md" />
                <label>Tier Cost</label>
                <input type="number"
                    value={parseInt(tierAmount.toString())}
                    onChange={(e) => setTierAmount(BigInt(e.target.value))}
                    className="mb-4 px-4 py-2 bg-slate-200 rounded-md" />

                  <TransactionButton transaction={() => prepareContractCall({
                    contract,
                    method : "function addTier(string _name, uint256 _amount)",
                    params: [tierName, tierAmount]
                  })} onTransactionConfirmed={async () => {
                    alert("Tier added successfully")
                    setIsModalOpen(false)
                  }}>
                    Add Tier 
                    </TransactionButton>                      
            </div>
            </div>
        </div>

    )
}

export default CreateTierModal;
