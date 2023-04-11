import { useState } from "react";
import { getTotalSupply, deposit } from "../web3/ContractIntegrations";

function ContractFunction({ connectedWallet }) {
  const [totalSupply, setTotalSupply] = useState(0);

  const handleTotalSupplyClick = async () => {
    const depositResponse = await deposit(10);
    console.log(
      "file: ContractFunctions.jsx:9 ~ handleTotalSupplyClick ~ depositResponse:",
      depositResponse
    );
    const totalSupplyResponse = await getTotalSupply();
    console.log(
      "file: ContractFunctions.jsx:9 ~ handleTotalSupplyClick ~ totalSupplyResponse:",
      totalSupplyResponse
    );
    setTotalSupply(totalSupplyResponse);
  };

  return (
    <div>
      <div>
        <button onClick={handleTotalSupplyClick}>Total Supply</button>
        <p>{totalSupply}</p>
      </div>
    </div>
  );
}

export default ContractFunction;
