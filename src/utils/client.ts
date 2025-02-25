import { createThirdwebClient } from "thirdweb";

const clients = import.meta.env.VITE_KEY_PUBLIC;
if(!clients){
    throw new Error("No Client Id Provider")
}

export const client = createThirdwebClient({
    clientId: clients,
})