import * as React from 'react'
import { useState } from 'react'
import { useSendTransaction } from 'wagmi' 
import { parseEther } from 'viem'
import { ethers } from 'ethers'

// Infura set up
const infuraUrl = 'https://testnet.infura.io/v3/';
// Initialize provider
const provider = new ethers.providers.InfuraProvider(infuraUrl);
// Now we can use'provider' to interact with the Ethereum blockchain

// AMS - duplicate Call the function to initialize the Web3Provider
//const { provider, signer } = initializeWeb3Provider();


// AMS - ssuming MySmartContract.json contains the ABI and bytecode of your smart contract
import SampleContract from './followbackgame.sol'; // AMS - Change name

function initializeWeb3Provider() {
  if (typeof window !== 'undefined' && window.ethereum && ethers.providers.Web3Provider) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    // Continue with your code that depends on the provider and signer
  } else {
    console.error('Web3Provider is not available.');
    return null; // Optionally return null or handle the absence of Web3Provider
}
}

// AMS - duplicate Call the function to initialize the Web3Provider
//const { provider, signer } = initializeWeb3Provider();

// Example usage: if you need to use provider and signer in a component
function MyComponent() {
    // Use provider and signer here
}

// AMS - END

export function SendTransaction() {
  const { data: hash, sendTransaction, isPending} = useSendTransaction() 
  const [contract, setContract] = useState(null)

  async function submit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault() 
    const formData = new FormData(e.target as HTMLFormElement)
    const value = formData.get('value') as string 

  // Check if contract is initialized
  if (!contract) {
    // Initialize contract
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractAddress = '0xaA668D25e82f48036efe6820923E581fe96566b3'; // AMS - Replace with actual contract address
    const contractInstance = new ethers.Contract(contractAddress, MySmartContract.abi, signer);
    setContract(contractInstance);
  } else {
    // Call the smart contract function
    const result = await contract.mySmartContractFunction(parseEther(value));
    console.log('Result:', result);
  }
  }


// AMS - END NEW STUFF

/* AMS - COMMENTED OUT JUST TRANSACTION
    sendTransaction({ to: '0xB650E0F70643bb67Fd8a41eF65Ff9A094f6533DB', value: parseEther(value) }) 
  } 

  // AMS - 
    <form className="flex flex-col items-center justify-center space-y-4">
      <button disabled={isPending} onClick = {e => sendMoney(e)} className="p-2 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed bg-purple w-100">
        {isPending ? 'Confirming...' : 'Start'}
      </button>
      {hash && <div className="text-gray-500">Transaction Hash: {hash}</div>}
    </form>
*/

  return (
    <form onSubmit={submit} className="flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold">Start Follow Back game!</h1>
      <input name="value" placeholder="Enter game price" required className="p-2 border border-gray-300 rounded" />
      <input name="value" placeholder="Enter player capacity" required className="p-2 border border-gray-300 rounded" />
      <button type="submit" disabled={isPending} className="p-2 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed bg-purple w-100">
        {isPending ? 'Confirming...' : 'PLAY'}
      </button>
      {hash && <div className="text-gray-500">Transaction Hash: {hash}</div>}
    </form>
  )
}