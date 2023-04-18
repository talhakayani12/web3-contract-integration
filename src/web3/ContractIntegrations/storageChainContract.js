import { getWeb3 } from "../index";
import { getContract } from "./CommonContractFunctions";

export const transferIntoTreasury = async (amountTransferIntoTreasury) => {
  try {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();

    const contract = await getContract(web3);
    const amountTransferIntoTreasuryWei = web3.utils.toWei(
      amountTransferIntoTreasury.toString()
    );

    const transferIntoTreasuryResponse = await contract.methods
      .transferIntoTreasury()
      .send({ from: accounts[0], value: amountTransferIntoTreasuryWei });

    return transferIntoTreasuryResponse;
  } catch (err) {
    console.error(
      "file: storageChainContract.js:34 ~ transferIntoTreasury ~ err:",
      err
    );
  }
};
