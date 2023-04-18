// TODO: Ethereum contract function
import { getWeb3 } from "../index";
import { getContract } from "./CommonContractFunctions";

export const burnWrapStor = async (amountToLockInTreasure) => {
  try {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();

    const contract = await getContract(web3);
    const amountToLockInTreasureWei = web3.utils.toWei(
      amountToLockInTreasure?.toString()
    );

    const depositInTreasuryResponse = await contract.methods
      .burn(amountToLockInTreasureWei)
      .send({
        from: accounts[0],
      });

    return depositInTreasuryResponse;
  } catch (err) {
    console.error(
      "file: ethChainContract.js:7 ~ depositInTreasury ~ err:",
      err
    );
  }
};
