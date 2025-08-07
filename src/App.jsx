import { Buffer } from 'buffer';
window.Buffer = Buffer;


import React, { useState } from 'react'
import * as bip39 from 'bip39'
import { ethers } from 'ethers'

export default function App() {
  const [mnemonic, setMnemonic] = useState('')
  const [address, setAddress] = useState('')
  const [privateKey, setPrivateKey] = useState('')

  const generate = () => {
    const m = bip39.generateMnemonic()
    setMnemonic(m)
    // 通过助记词生成钱包和地址
    const wallet = ethers.Wallet.fromPhrase(m)
    setAddress(wallet.address)
    setPrivateKey(wallet.privateKey)
  }

  return (
    <div>
      <h1>助记词生成器</h1>
      <button onClick={generate}>生成助记词</button>
      <p>{mnemonic}</p>
      <p>ETH地址：{address}</p>   
      <p>私钥：{privateKey}</p>
    </div>
  )
}
