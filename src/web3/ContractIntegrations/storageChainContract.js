// const getContractName = async (contractAddress: string) => {
//   const web3 = await getWeb3();
//   const contract = initContract(
//     web3,
//     COMMON_CONTRACT_ABI.contractABI,
//     contractAddress
//   );

import { CONTRACT_DETAILS } from "../config";
import { getWeb3 } from "../index";

const initContract = (web3, contractABI, contractAddress) => {
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  return contract;
};

export const getTotalSupply = async () => {
  try {
    const web3 = await getWeb3();

    const networkChainId = await web3.eth.getChainId();
    const contractDetails = CONTRACT_DETAILS[networkChainId];

    const contract = initContract(
      web3,
      contractDetails?.abi,
      contractDetails?.address
    );

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

    const networkChainId = await web3.eth.getChainId();
    const contractDetails = CONTRACT_DETAILS[networkChainId];

    const contract = initContract(
      web3,
      contractDetails?.abi,
      contractDetails?.address
    );

    const contractNameContractResponse = await contract.methods.name().call();

    return contractNameContractResponse;
  } catch (err) {
    console.error(
      "file: storageChainContract.js:58 ~ getContractName ~ err:",
      err
    );
  }
};
