import { createWallet } from "thirdweb/wallets";

const navigation = [
  { name: 'Dashboard', href: '/dashboard', current: true },
  
]

const navigationGuest = [
  {
    name: 'Home', href: '/', current: true,
  },
  {
    name: 'Campaigns', href:'/campaigns', current: true 
  }
]


const wallets = [
    createWallet("io.metamask"),
    createWallet("me.rainbow"),
    createWallet("io.rabby"),
    createWallet("io.zerion.wallet"),
    createWallet("com.bitget.web3"),
    createWallet("com.okex.wallet"),
  ];

  export {wallets, navigation, navigationGuest};