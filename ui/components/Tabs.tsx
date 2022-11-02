import { useState } from "react";
import EthereumIcon from '../assets/ethereum.svg';

const Tabs = () => {
  const [openTab, setOpenTab] = useState(1);

  return (
    <div className="p-10 shadow-2xl">
      <div className="container mx-auto">
        <h1 className="my-4">ethereum goerli testnet faucet</h1>
        <div className="flex flex-col items-center justify-center max-w-xl">
          <EthereumIcon className="w-24" />
          <ul className="flex space-x-2">
            <li>
              <a href="#" onClick={() => setOpenTab(1)} className={`${openTab === 1 ? "bg-green-300 text-white" : ""}
                inline-block px-4 py-2 text-gray-600 bg-white rounded shadow`}>
                Get Ether
              </a>
            </li>
            <li>
              <a href="#" onClick={() => setOpenTab(2)} className={`${openTab === 2 ? "bg-green-300 text-white" : ""}
                inline-block px-4 py-2 text-gray-600 bg-white rounded shadow`}>
                Send Ether
              </a>
            </li>
          </ul>
          <div className="p-3 mt-6 bg-white border">
            <div className={openTab === 1 ? "block" : "hidden"}>
              React JS with Tailwind CSS Tab 1 Content show
            </div>
            <div className={openTab === 2 ? "block" : "hidden"}>
              React JS with Tailwind CSS Tab 2 Content show
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm">Please consider to deposit ether. So, other users can also get the benefit of test ethers</p>
      </div>
    </div>
  )
}

export default Tabs;