import ContractFunction from './ContractFunctions';
import { ReactComponent as Logo } from '../assets/images/logo.svg';
import { loginWithMetaMask } from '../web3';
import { useState } from 'react';

function Dashboard({ connectedWallet, connectWallet }) {
  console.log('connected Wallet: ', connectedWallet);

  const [currentSelectedNetwork, setCurrentSelectedNetwork] =
    useState('polygon');

  const handleNetworkSwitch = (selectedBlockchain) => {
    loginWithMetaMask(selectedBlockchain);
  };

  return (
    <div className='dashboard'>
      <div className='header'>
        <div className='inner-div'>
          <a href='https://storagechain.io/'>
            <Logo className='logo' />
          </a>
          <a href='https://storagechain.io/sign-up' className='btn'>
            Sign up Free
          </a>
        </div>
      </div>
      <h1 className='title'>Swap Token</h1>

      {connectedWallet?.walletAddress ? (
        <>
          <div className='tabsContainer'>
            <button
              className={`${
                currentSelectedNetwork === 'polygon' && 'selected'
              }`}
              onClick={() => handleNetworkSwitch('polygon')}
            >
              WSTOR to STOR
            </button>
            <button
              className={`${
                currentSelectedNetwork === 'storagechain' && 'selected'
              }`}
              onClick={() => handleNetworkSwitch('storagechain')}
            >
              STOR to WSTOR
            </button>
          </div>
          <div className='box-wrap'>
            <p>Connected Wallet: {connectedWallet?.walletAddress}</p>
            <p>Balance: {connectedWallet?.balance}</p>
            <ContractFunction
              connectedWallet={connectedWallet}
              setCurrentSelectedNetwork={setCurrentSelectedNetwork}
            />
          </div>
        </>
      ) : (
        <div className='box-wrap'>
          <button onClick={async () => await connectWallet()}>
            Connect your wallet
          </button>
        </div>
      )}
    </div>
  );
}
export default Dashboard;
