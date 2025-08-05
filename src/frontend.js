let provider;

async function connect() {
  if (!window.ethereum) {
    alert('MetaMask is required');
    return;
  }
  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send('eth_requestAccounts', []);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  document.getElementById('account').textContent = 'Address: ' + address;
  const balance = await provider.getBalance(address);
  document.getElementById('balance').textContent = 'Balance: ' + ethers.utils.formatEther(balance) + ' ETH';
  document.getElementById('transfer').style.display = 'block';
}

async function send() {
  const to = document.getElementById('to').value;
  const amount = document.getElementById('amount').value;
  try {
    const signer = provider.getSigner();
    const tx = await signer.sendTransaction({
      to,
      value: ethers.utils.parseEther(amount)
    });
    document.getElementById('tx').textContent = 'Transaction hash: ' + tx.hash;
  } catch (err) {
    document.getElementById('tx').textContent = 'Error: ' + err.message;
  }
}

document.getElementById('connect').addEventListener('click', connect);
document.getElementById('send').addEventListener('click', send);
