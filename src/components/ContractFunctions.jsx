import { useState } from "react";
import { getTotalSupply } from "../web3/ContractIntegrations";

function ContractFunction({ connectedWallet }) {
  const [totalSupply, setTotalSupply] = useState(0);

  const handleTotalSupplyClick = async () => {
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
