import React, { useState } from 'react';
import { Wallet } from './wallet';

function App() {
  const [mnemonic, setMnemonic] = useState('');

  const generateMnemonic = () => {
    const m = Wallet.generateMnemonic();
    setMnemonic(m);
  };

  return (
    <div>
      <h1>LuckYouWallet</h1>
      <button onClick={generateMnemonic}>Generate Mnemonic</button>
      {mnemonic && (
        <div>
          <p>Your mnemonic phrase:</p>
          <textarea value={mnemonic} readOnly rows={2} cols={60} />
        </div>
      )}
    </div>
  );
}

export default App;
