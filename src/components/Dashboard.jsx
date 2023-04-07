import ContractFunction from "./ContractFunctions";

function Dashboard({ connectedWallet, connectWallet }) {
  console.log("connected Wallet: ", connectedWallet);
  return (
    <div>
      <h1>Dashboard</h1>
      {connectedWallet?.walletAddress ? (
        <div>
          <p>Connected Wallet: {connectedWallet?.walletAddress}</p>
          <p>Balance: {connectedWallet?.balance}</p>
          <ContractFunction connectedWallet={connectedWallet} />
        </div>
      ) : (
        <button onClick={async () => await connectWallet()}>
          Connect your wallet
        </button>
      )}
    </div>
  );
}
export default Dashboard;
