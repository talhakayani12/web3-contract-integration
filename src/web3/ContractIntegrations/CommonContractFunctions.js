import { CONTRACT_DETAILS } from "../config";
import { getWeb3 } from "../index";
export const initContract = (web3, contractABI, contractAddress) => {
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  return contract;
};

export const getContract = async (web3) => {
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

    const ethConvertedValue = web3.utils.fromWei(
      totalSupplyContractResponse,
      "ether"
    );

    return ethConvertedValue;
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

export const getBalanceOfEthContractByWalletAddress = async (walletAddress) => {
  try {
    const web3 = await getWeb3();

    const contract = await getContract(web3);

    const balanceOfResponse = await contract.methods
      .balanceOf(walletAddress)
      .call();

    const ethConvertedValue = web3.utils.fromWei(balanceOfResponse, "ether");
    return ethConvertedValue;
  } catch (err) {
    console.error(
      "file: ethChainContract.js:33 ~ getBalanceOfEthContractByWalletAddress ~ err:",
      err
    );
  }
};
