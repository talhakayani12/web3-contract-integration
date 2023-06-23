import ContractFunction from "./ContractFunctions";
import { ReactComponent as Logo } from "../assets/images/logo.svg";

function Dashboard({ connectedWallet, connectWallet }) {
  console.log("connected Wallet: ", connectedWallet);
  return (
    <div className="dashboard">
      <div className="header">
        <div className="inner-div">
          <a href="https://storagechain.io/">
            <Logo className="logo" />
          </a>
          <a href="https://storagechain.io/sign-up" className="btn">
            Sign up Free
          </a>
        </div>
      </div>
      <h1 className="title">Swap Token</h1>
      {connectedWallet?.walletAddress ? (
        <div className="box-wrap">
          <p>Connected Wallet: {connectedWallet?.walletAddress}</p>
          <p>Balance: {connectedWallet?.balance}</p>
          <ContractFunction connectedWallet={connectedWallet} />
        </div>
      ) : (
        <div className="box-wrap">
          <button onClick={async () => await connectWallet()}>
            Connect your wallet
          </button>
        </div>
      )}
    </div>
  );
}
export default Dashboard;
