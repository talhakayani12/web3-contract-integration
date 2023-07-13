import GoerliContractABI from "../ABIs/GoerliContractABI.json";
import StorageChainContractABI from "../ABIs/StorageChainContractABI.json";

export const CONTRACT_DETAILS = {
  80001: {
    abi: GoerliContractABI,
    address: process.env.REACT_APP_GOERLI_CONTRACT_ADDRESS,
  },
  8726: {
    abi: StorageChainContractABI,
    // address: "0x06F94372C780952D9B2200C75Ac1e2b36B67609c",
    address: process.env.REACT_APP_STORAGECHAIN_CONTRACT_ADDRESS,
  },
};
