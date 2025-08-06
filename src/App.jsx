import { Buffer } from 'buffer';
window.Buffer = Buffer;


import React, { useState } from 'react'
import * as bip39 from 'bip39'

export default function App() {
  const [mnemonic, setMnemonic] = useState('')

  const generate = () => {
    const m = bip39.generateMnemonic()
    setMnemonic(m)
  }

  return (
    <div>
      <h1>助记词生成器</h1>
      <button onClick={generate}>生成助记词</button>
      <p>{mnemonic}</p>
    </div>
  )
}
