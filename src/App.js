import './App.scss';
import { useEffect, useState } from 'react';
import { loginWithMetaMask } from './web3';
import Dashboard from './components/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [connectedWallet, setConnectedWallet] = useState({
    walletAddress: '',
    balance: '',
  });

  const connectWallet = async () => {
    const connectWalletResponse = await loginWithMetaMask('polygon');
    setConnectedWallet(connectWalletResponse);
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div className='App'>
      <ToastContainer />
      <Dashboard
        connectedWallet={connectedWallet}
        connectWallet={connectWallet}
      />
    </div>
  );
}

export default App;
