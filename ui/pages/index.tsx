import { MetaMaskInpageProvider } from '@metamask/providers'
import { ethers } from 'ethers'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import AccordionContent from '../components/Accordion'
import Card from '../components/Card'
import { ethereum } from '../utils/ethereumObject'
import GoerliEtherMarket from '../utils/GoerliEtherMarket.json'

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider
  }
}

const Home: NextPage = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState('')
  const [error, setError] = useState('')
  const [receivableAmount, setReceivableAmount] = useState('')
  const [donateAmount, setDonateAmount] = useState('0')
  const contractAddress = '0x299204B8cDAcC2a3afbCB042884e0F9926C7e9AB'
  const contractABI = GoerliEtherMarket.abi
  const [contractBalance, setContractBalance] = useState('')

  const checkIfMetamaskExist = () => {
    if (ethereum()) {
      return true;
    }
    return false
  }

  const getBalance = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum() as any)
      const signer = provider.getSigner()

      const goerliEtherContract = new ethers.Contract(contractAddress, contractABI, signer)

      const balance = await goerliEtherContract.getBalance()
      setContractBalance(ethers.utils.formatEther(balance))
    } catch (err) {

    }
  }

  const getReceivableAmount = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum() as any)
      const signer = provider.getSigner()

      const goerliEtherContract = new ethers.Contract(contractAddress, contractABI, signer)

      const receivableAmount = await goerliEtherContract.getReceivableAmount()
      setReceivableAmount(ethers.utils.formatEther(receivableAmount))
    } catch (err) {

    }
  }

  const connectMetamask = async () => {
    checkIfMetamaskExist()
    setIsConnected(true)
    try {

      const accounts = await ethereum()?.request({ method: 'eth_requestAccounts' })
      if (Array.isArray(accounts) && accounts.length) {
        setAccount(accounts[0])
      } else {
        return null
      }
    } catch (err) {
      console.log(err)
      return null
    }
  }

  const donateEther = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum() as any)
      const signer = provider.getSigner()

      const goerliEtherContract = new ethers.Contract(contractAddress, contractABI, signer)

      const donateTx = await goerliEtherContract.donateEther({ value: ethers.utils.parseEther(donateAmount) })
      await donateTx.wait()
      getBalance()

    } catch (err: any) {
      if (err.message) {
        setError(err.reason)
      }
    }
  }

  const claimEther = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum() as any)
      const signer = provider.getSigner()

      const etherMarketContract = new ethers.Contract(contractAddress, contractABI, signer)

      const receiveEtherTx = await etherMarketContract.receiveEther()
      await receiveEtherTx.wait()
      getBalance()

    } catch (err: any) {
      if (err.message) {
        setError(err.reason)
      }
    }
  }

  useEffect(() => {
    getBalance()
    getReceivableAmount()
  }, [isConnected, account])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 mt-10">
      {
        isConnected ?
          <>
            <h1 className="text-5xl">Goerli faucet</h1>
            <p className="flex justify-end items-end text-gray-900 text-lg mt-4">Contract balance: {contractBalance} ether</p>
            <Card title="Request Tokens" btnText={account ? `Claim (${receivableAmount}) ether` : 'Enter Valid Address'} handleAction={claimEther}>
              <p className="text-md">Enter your Ethereum address to receive tokens:</p>
              <input value={account} onChange={(e) => setAccount(e.target.value)} className="my-3  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-black-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0xf73F9b47ac3c6Fb96Aa76c1731525402dA5378bd" />
            </Card>
            {error && <p className='text-red-700'>{error}</p>}
            <Card title="Donate" btnText="Donate" handleAction={donateEther}>
              <p className="text-md">Donate on any of the supported networks to keep this service running, and potentially to see your name in the hall of fame 😉</p>
              <span className="block text-sm mt-2 leading-snug text-gray-500">Note: The donation will be sent to our "operator" address, which is authorized to manage the faucet contract. This is so that we can swap your donation into the target distribution of assets before transferring to the faucet.</span>
              <label className="block my-2">Enter an amount(in units of Ether, not Wei)</label>
              <input type="string" value={donateAmount} onChange={(e) => setDonateAmount(e.target.value)} className="my-3  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-black-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" />
            </Card>
            {/* <AccordionContent /> */}
          </>
          :
          <button className="bg-blue-400 p-4 rounded-md text-gray-50 text-md" onClick={connectMetamask}>Connect to MetaMask</button>
      }
    </div>
  )
}

export default Home
