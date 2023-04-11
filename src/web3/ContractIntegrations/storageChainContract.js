import { CONTRACT_DETAILS } from "../config";
import { getWeb3 } from "../index";

const initContract = (web3, contractABI, contractAddress) => {
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  return contract;
};

const getContract = async (web3) => {
  const networkChainId = await web3.eth.getChainId();
  const contractDetails = CONTRACT_DETAILS[networkChainId];

  const contract = initContract(
    web3,
    contractDetails?.abi,
    contractDetails?.address
  );
  return contract;
};

export const getTotalSupply = async () => {
  try {
    const web3 = await getWeb3();

    const contract = await getContract(web3);

    const totalSupplyContractResponse = await contract.methods
      .totalSupply()
      .call();

    return totalSupplyContractResponse;
  } catch (err) {
    console.error(
      "file: storageChainContract.js:21 ~ getTotalSupply ~ err:",
      err
    );
  }
};

export const getContractName = async () => {
  try {
    const web3 = await getWeb3();
    const contract = await getContract(web3);
    const contractNameContractResponse = await contract.methods.name().call();

    return contractNameContractResponse;
  } catch (err) {
    console.error(
      "file: storageChainContract.js:58 ~ getContractName ~ err:",
      err
    );
  }
};

// Write function implemnetation

export const deposit = async (depositAmount) => {
  try {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();

    const contract = await getContract(web3);
    const depositAmountWei = web3.utils.toWei(depositAmount.toString());

    const estimatedGasFees = await contract.methods
      .Deposit()
      .estimateGas({ from: accounts[0] });

    const depositContractResponse = await contract.methods.Deposit().send({
      from: accounts[0],
      gas: estimatedGasFees,
      value: depositAmountWei,
    });

    return depositContractResponse;
  } catch (err) {
    console.error("file: storageChainContract.js:73 ~ deposit ~ err:", err);
  }
};
