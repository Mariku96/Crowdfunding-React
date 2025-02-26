import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { ConnectButton, useActiveAccount } from 'thirdweb/react'
import { wallets, navigation, navigationGuest } from '../utils/datas'
import { client } from '../utils/client'
import { useNavigate } from 'react-router'



const NavBar = () => {
  
  const account = useActiveAccount();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  
  return (
    <Disclosure as="nav" className="bg-navbar top-0">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <a href="#" className=' font-logo font-bold text-white'>CrowdFunding</a>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {
                  navigationGuest.map((item) => (
                    <a key={item.name} href={item.href} className='text-white'>
                      {item.name}
                    </a>
                  ))
                }
                { 
                  account && (
                    navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className='text-white'
                      >
                        {item.name}
                      </a>
                    ))
                  )}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <ConnectButton client={client} wallets={wallets} onDisconnect={handleLogout}
              connectModal={{ size: "compact" }} connectButton={{ style: { minWidth: "25px", maxHeight: "35px" }}} />
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {
            navigationGuest.map((item) => (
              <a key={item.name} href={item.href} className='text-white flex p-1'>
                {item.name}
              </a>
            ))
          }
          {
            account && (
              navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className='text-white flex p-1'
                >
                  {item.name}
                </a>
              ))
            )}
        </div>
      </DisclosurePanel>
    </Disclosure>

  )
}

export default NavBar;