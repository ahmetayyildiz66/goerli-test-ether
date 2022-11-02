import type { NextPage } from 'next'
import Example from '../components/Accordion'
import Card from '../components/Card'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 mt-10">
      <h1 className="text-5xl">Bootstrap your Goerli testnet wallet</h1>
      <Card title="Request Tokens" btnText="Enter Valid Address">
        <p className="text-md">Enter your Ethereum address to receive tokens:</p>
        <input className="my-3  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-black-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0xfA697D0D2D40713fA5E6A9086da646B6207B00C5" />
      </Card>

      <Card title="Donate" btnText="Donate">
        <p className="text-md">Donate on any of the supported networks to keep this service running, and potentially to see your name in the hall of fame 😉</p>
        <span className="block text-sm mt-2 leading-snug text-gray-500">Note: The donation will be sent to our "operator" address, which is authorized to manage the faucet contract. This is so that we can swap your donation into the target distribution of assets before transferring to the faucet.</span>
        <label className="block my-2">Enter an amount(in units of Ether, not Wei)</label>
        <input type="number" className="my-3  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-black-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" />
      </Card>

      <Example />
    </div>
  )
}

export default Home
