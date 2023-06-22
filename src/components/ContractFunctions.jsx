import { useEffect, useState } from 'react';
import { CHAIN_COIN_NAME, TOTAL_SUPPLY_MESSAGE } from '../utils/constants';
import { getWeb3 } from '../web3';

import {
  getBalanceOfEthContractByWalletAddress,
  getTotalSupply,
} from '../web3/ContractIntegrations';
import DepositInTreasury from './ContractFunctions/DepositInTreasury';
import TransferInTreasury from './ContractFunctions/TransferIntoTreasury';

function ContractFunction({ connectedWallet }) {
  console.log(
    'file: ContractFunctions.jsx:8 ~ ContractFunction ~ connectedWallet:',
    connectedWallet
  );
  const [totalSupply, setTotalSupply] = useState(0);
  const [balanceOf, setBalanceOf] = useState(0);
  const [coinName, setCoinName] = useState('');

  const handleTotalSupplyClick = async () => {
    const totalSupplyResponse = await getTotalSupply();

    setTotalSupply(totalSupplyResponse);
  };

  // const handleBalanceOfEthContractClick = async () => {
  //   const balanceOfResponse = await getBalanceOfEthContractByWalletAddress(
  //     connectedWallet?.walletAddress
  //   );
  //   setBalanceOf(balanceOfResponse);
  // };

  useEffect(() => {
    const handleCheckForSelectedChain = async () => {
      try {
        const web3 = await getWeb3();
        const chainId = await web3.eth.getChainId();

        setCoinName(CHAIN_COIN_NAME[chainId]);
      } catch (err) {
        console.log(
          'file: ContractFunctions.jsx:37 ~ handleCheckForSelectedChain ~ err:',
          err
        );
      }
    };
    handleCheckForSelectedChain();
  }, []);

  useEffect(() => {
    const subscribeToMetamaskEvents = () => {
      window?.ethereum?.on('accountsChanged', async (accounts) => {
        console.log(
          'file: ContractFunctions.jsx:54 ~ window?.ethereum?.on ~ accounts:',
          accounts
        );
        // await connectNewUser(accounts);
      });

      window?.ethereum?.on('chainChanged', async (chainId) => {
        setCoinName(CHAIN_COIN_NAME[parseInt(chainId, 16)]);
      });
    };
    subscribeToMetamaskEvents();
  }, []);

  return (
    <div>
      {/* <div>
        <button onClick={handleBalanceOfEthContractClick}>
          Balance Of Eth
        </button>
        <p>{balanceOf}</p>
      </div> */}
      {coinName === 'WSTOR' && (
        <>
          <div>
            <button onClick={handleTotalSupplyClick}>
              {`${TOTAL_SUPPLY_MESSAGE.replace(
                '--{coin-name}--',
                coinName
              )} coin`}
            </button>
            <p>{totalSupply}</p>
          </div>
          <DepositInTreasury />
        </>
      )}
      {coinName === 'STOR' && <TransferInTreasury />}
    </div>
  );
}

export default ContractFunction;
