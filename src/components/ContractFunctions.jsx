import { useState } from "react";

import {
  getBalanceOfEthContractByWalletAddress,
  getTotalSupply,
} from "../web3/ContractIntegrations";
import DepositInTreasury from "./ContractFunctions/DepositInTreasury";
import TransferInTreasury from "./ContractFunctions/TransferIntoTreasury";

function ContractFunction({ connectedWallet }) {
  console.log(
    "file: ContractFunctions.jsx:8 ~ ContractFunction ~ connectedWallet:",
    connectedWallet
  );
  const [totalSupply, setTotalSupply] = useState(0);
  const [balanceOf, setBalanceOf] = useState(0);

  const handleTotalSupplyClick = async () => {
    const totalSupplyResponse = await getTotalSupply();

    setTotalSupply(totalSupplyResponse);
  };

  const handleBalanceOfEthContractClick = async () => {
    const balanceOfResponse = await getBalanceOfEthContractByWalletAddress(
      connectedWallet?.walletAddress
    );
    setBalanceOf(balanceOfResponse);
  };

  return (
    <div>
      <div>
        <button onClick={handleTotalSupplyClick}>Total Supply</button>
        <p>{totalSupply}</p>
      </div>
      <div>
        <button onClick={handleBalanceOfEthContractClick}>
          Balance Of Eth
        </button>
        <p>{balanceOf}</p>
      </div>
      <DepositInTreasury />
      <TransferInTreasury />
    </div>
  );
}

export default ContractFunction;
