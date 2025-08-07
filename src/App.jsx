import { Buffer } from 'buffer';
window.Buffer = Buffer;


import React, { useState } from 'react'
import * as bip39 from 'bip39'
import { ethers } from 'ethers'


const provider = new ethers.JsonRpcProvider("https://ethereum-sepolia.publicnode.com");

export default function App() {
  const [mnemonic, setMnemonic] = useState('')
  const [address, setAddress] = useState('')
  const [privateKey, setPrivateKey] = useState('')
  const [balance, setBalance] = useState('')
  const [gas, setGas] = useState('')
  const [sendTime, setSendTime] = useState('')

  const queryBalance = async (addr) => {
    if (!addr) return
    try {
      const wei = await provider.getBalance(addr)
      setBalance(ethers.formatEther(wei))
    } catch (err) {
      window.alert('查询失败：' + err.message)
    }
  }

  const createWallet = async () => {
    const m = bip39.generateMnemonic()
    setMnemonic(m)
    const wallet = ethers.Wallet.fromPhrase(m)
    setAddress(wallet.address)
    setPrivateKey(wallet.privateKey)
    await queryBalance(wallet.address)
  }

  const importWallet = async () => {
    const m = window.prompt('请输入助记词') || ''
    if (!m) return
    try {
      const wallet = ethers.Wallet.fromPhrase(m)
      setMnemonic(m)
      setAddress(wallet.address)
      setPrivateKey(wallet.privateKey)
      await queryBalance(wallet.address)
    } catch (err) {
      window.alert('导入失败：' + err.message)
    }
  }

  const sendETH = async () => {
    if (!privateKey) {
      window.alert('请先导入或创建钱包')
      return
    }
    const to = window.prompt('请输入收款地址') || ''
    const amount = window.prompt('请输入发送金额(ETH)') || ''
    if (!to || !amount) return
    try {
      const wallet = new ethers.Wallet(privateKey, provider)
      const value = ethers.parseEther(amount)
      const gasLimit = await wallet.estimateGas({ to, value })
      setGas(gasLimit.toString())
      const tx = await wallet.sendTransaction({ to, value, gasLimit })
      const receipt = await tx.wait()
      const block = await provider.getBlock(receipt.blockNumber)
      setSendTime(new Date(block.timestamp * 1000).toLocaleString())
      await queryBalance(wallet.address)
    } catch (err) {
      window.alert('发送失败：' + err.message)
    }
  }

  return (
    <div>
      <h1>钱包管理</h1>
      <button onClick={createWallet}>创建钱包</button>
      <button onClick={importWallet}>导入钱包</button>
      <button onClick={() => queryBalance(address)}>查询余额</button>
      <button onClick={sendETH}>发送ETH</button>
      <p>{mnemonic}</p>
      <p>ETH地址：{address}</p>
      <p>ETH余额：{balance}</p>
      <p>私钥：{privateKey}</p>
      <p>所需Gas：{gas}</p>
      <p>发送时间：{sendTime}</p>
    </div>
  )
}
