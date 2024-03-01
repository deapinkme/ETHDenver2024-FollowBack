import * as React from 'react'
import { useSendTransaction } from 'wagmi' 
import { parseEther } from 'viem' 
 
export function SendTransaction() {
  const { data: hash, sendTransaction, isPending} = useSendTransaction() 

  async function submit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault() 
    const formData = new FormData(e.target as HTMLFormElement)
    const value = formData.get('value') as string 
    sendTransaction({ to: '0xB650E0F70643bb67Fd8a41eF65Ff9A094f6533DB', value: parseEther(value) }) 
  } 

  // AMS - remove the asking of a coffee
/*
    <form className="flex flex-col items-center justify-center space-y-4">
      <button disabled={isPending} onClick = {e => sendMoney(e)} className="p-2 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed bg-purple w-100">
        {isPending ? 'Confirming...' : 'Start'}
      </button>
      {hash && <div className="text-gray-500">Transaction Hash: {hash}</div>}
    </form>
  )
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