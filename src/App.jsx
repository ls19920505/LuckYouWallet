import { Buffer } from 'buffer';
window.Buffer = Buffer;


import React, { useState } from 'react'
import * as bip39 from 'bip39'
import { ethers } from 'ethers'

export default function App() {
  const [mnemonic, setMnemonic] = useState('')
  const [address, setAddress] = useState('')
  const [privateKey, setPrivateKey] = useState('')

  const createWallet = () => {
    const m = bip39.generateMnemonic()
    setMnemonic(m)
    const wallet = ethers.Wallet.fromPhrase(m)
    setAddress(wallet.address)
    setPrivateKey(wallet.privateKey)
  }

  const importWallet = () => {
    const m = window.prompt('请输入助记词') || ''
    if (!m) return
    try {
      const wallet = ethers.Wallet.fromPhrase(m)
      setMnemonic(m)
      setAddress(wallet.address)
      setPrivateKey(wallet.privateKey)
    } catch (err) {
      window.alert('导入失败：' + err.message)
    }
  }

  return (
    <div>
      <h1>钱包管理</h1>
      <button onClick={createWallet}>创建钱包</button>
      <button onClick={importWallet}>导入钱包</button>
      <p>{mnemonic}</p>
      <p>ETH地址：{address}</p>
      <p>私钥：{privateKey}</p>
    </div>
  )
}
