import { createWallet } from "thirdweb/wallets";

const wallets = [
    createWallet("io.metamask"),
    createWallet("me.rainbow"),
    createWallet("io.rabby"),
    createWallet("io.zerion.wallet"),
    createWallet("com.bitget.web3"),
    createWallet("com.okex.wallet"),
  ];

  export {wallets};