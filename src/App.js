import "./App.css";
import { useEffect, useState } from "react";
import { loginWithMetaMask } from "./web3";
import Dashboard from "./components/Dashboard";

function App() {
  const [connectedWallet, setConnectedWallet] = useState({
    walletAddress: "",
    balance: "",
  });

  const connectWallet = async () => {
    const connectWalletResponse = await loginWithMetaMask("ethereum");
    setConnectedWallet(connectWalletResponse);
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div className="App">
      <Dashboard
        connectedWallet={connectedWallet}
        connectWallet={connectWallet}
      />
    </div>
  );
}

export default App;
