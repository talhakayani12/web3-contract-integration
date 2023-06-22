// import {
//   getUserNonceByWalletAddress,
//   updateSignedNonceByWalletAddress,
// } from "../store/reducers/userReducer";
import Web3 from 'web3';
import { networks } from './networksParams';

// interface NativeCurrencyInterface {
//   name: string;
//   symbol: string;
//   decimals: number;
// }

// interface NetworkParamsInterface {
//   chainId: string;
//   chainName: string;
//   nativeCurrency: NativeCurrencyInterface;
//   rpcUrls: Array<string>;
//   blockExplorerUrls: Array<string>;
// }

const isMetaMaskAvailable = () => {
  if (typeof window.ethereum !== 'undefined') {
    return true;
  }
  return false;
};

const getWeb3 = async () => {
  if (isMetaMaskAvailable()) {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    if (accounts?.length > 1)
      throw new Error(
        'You have to connect only one account at a time with the site. Goto MetaMask and diconnect all other accounts from this site'
      );
    return web3;
  }
};

const getCustomRPCWeb3Instance = async (RPC) => {
  if (isMetaMaskAvailable()) {
    const web3Provider = new Web3.providers.HttpProvider(RPC);
    const web3 = new Web3(web3Provider);
    const accounts = await web3.eth.getAccounts();
    if (accounts?.length > 1)
      throw new Error(
        'You have to connect only one account at a time with the site. Goto MetaMask and diconnect all other accounts from this site'
      );
    return web3;
  }
};

const getChainId = async () => {
  return parseInt(await window.ethereum.request({ method: 'eth_chainId' }));
};

const addMultichainNetwork = async (networkParams) => {
  console.log(
    'file: index.jsx:59 ~ addMultichainNetwork ~ networkParams:',
    networkParams
  );
  try {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [networkParams],
    });
  } catch (err) {
    console.log('🚀 ~ file: config.tsx ~ line 37 ~ err', err);
  }
};

const addingChainNetworkIfNotExsists = async (chainId, networkParams) => {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }],
    });
    return true;
  } catch (err) {
    console.error(
      'file: index.jsx:77 ~ addingChainNetworkIfNotExsists ~ err:',
      err
    );
    if (err.code === 4902) {
      try {
        await addMultichainNetwork(networkParams);
        return true;
      } catch (err) {
        return false;
      }
    }
  }
};

const checkForMetamaskNetwork = async (selectedBlockChainType) => {
  if (!isMetaMaskAvailable()) return false;
  const chainId = await getChainId();

  if (selectedBlockChainType === 'storagechain') {
    console.log(
      'this is running...',
      process.env.REACT_APP_NETWORK === 'devnet'
    );
    if (process.env.REACT_APP_NETWORK === 'devnet') {
      return addingChainNetworkIfNotExsists(
        '0x2236',
        networks.storagechain.testnet
      );
    }
  }

  if (selectedBlockChainType === 'ethereum') {
    if (process.env.REACT_APP_NETWORK !== 'devnet' && chainId !== 1) {
      return addingChainNetworkIfNotExsists('0x1', networks.ethereum.mainnet);
    }

    if (process.env.REACT_APP_NETWORK === 'devnet' && chainId !== 5) {
      return addingChainNetworkIfNotExsists('0x5', networks.ethereum.testnet);
    }
    return true;
  }

  if (selectedBlockChainType === 'binance') {
    if (process.env.REACT_APP_NETWORK !== 'devnet' && chainId !== 56) {
      return addingChainNetworkIfNotExsists('0x38', networks.binance.mainnet);
    }

    if (process.env.REACT_APP_NETWORK === 'devnet' && chainId !== 97) {
      return addingChainNetworkIfNotExsists('0x61', networks.binance.testnet);
    }
    return true;
  }

  if (process.env.REACT_APP_NETWORK !== 'devnet' && chainId !== 137) {
    return addingChainNetworkIfNotExsists('0x89', networks.polygon.mainnet);
  }

  if (process.env.REACT_APP_NETWORK === 'devnet' && chainId !== 80001) {
    return addingChainNetworkIfNotExsists('0x13881', networks.polygon.testnet);
  }
  return true;
};

const getAccounts = async () => {
  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
  return accounts;
};

const getAccountBalance = async (walletAddress, selectedBlockChainType) => {
  const web3 = await getWeb3(selectedBlockChainType);
  return web3.utils.fromWei(await web3.eth.getBalance(walletAddress));
};

const getAccountInformation = async (selectedBlockChainType, walletAddress) => {
  try {
    const accounts = await getAccounts();
    const balance = await getAccountBalance(
      walletAddress || accounts[0],
      selectedBlockChainType
    );
    return { accounts, balance };
  } catch (err) {
    console.log(
      '🚀 ~ file: config.tsx ~ line 104 ~ getAccountInformation ~ err',
      err
    );
  }
};
const connect = async (selectedBlockChainType) => {
  const data = await getAccountInformation(selectedBlockChainType);
  const wallet = {
    walletAddress: data.accounts[0],
    balance: data.balance,
  };
  return wallet;
};

// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
// }

// const getNonceString = async (walletAddress, selectedBlockChainType) => {
//   try {
//     const res = { data: getRandomInt(10000, 10000) };
//     // getUserNonceByWalletAddress(
//     //   walletAddress,
//     //   selectedBlockChainType
//     // );

//     return {
//       nonceString: `I am signing my one-time nonce for Piqsol: ${res?.data?.nonce}`,
//       nonceValue: res?.data?.nonce,
//     };
//   } catch (err) {
//     console.log("🚀 ~ file: config.tsx ~ line 143 ~ getNonceString ~ err", err);
//   }
// };

// const getUserNonceForMetaMask = async (
//   walletAddress,
//   selectedBlockChainType
// ) => {
//   try {
//     const nonceMessageWithNonce = await getNonceString(
//       walletAddress,
//       selectedBlockChainType
//     );
//     if (nonceMessageWithNonce === true) return true;
//     const web3 = await getWeb3();
//     const signature = await web3.eth.personal.sign(
//       web3.utils.fromUtf8(nonceMessageWithNonce?.nonceString),
//       walletAddress,
//       "One time nonce"
//     );

//     return { signature, nonce: nonceMessageWithNonce?.nonceValue };
//   } catch (err) {
//     console.log(
//       "🚀 ~ file: config.tsx ~ line 150 ~ getUserNonceForMetaMask ~ err",
//       err
//     );
//   }
// };

const loginWithMetaMask = async (selectedBlockChainType) => {
  try {
    const networkResponse = await checkForMetamaskNetwork(
      selectedBlockChainType
    );

    if (!networkResponse) {
      return -1;
    }
    const walletInformation = await connect(selectedBlockChainType);
    console.log(
      'file: index.jsx:209 ~ loginWithMetaMask ~ walletInformation:',
      walletInformation
    );

    // const nonceSign = await getUserNonceForMetaMask(
    //   walletInformation.primaryAccount,
    //   selectedBlockChainType
    // );

    // return {
    //   walletAddress: walletInformation?.primaryAccount,
    //   nonce: nonceSign?.nonce,
    //   signature: nonceSign.signature,
    // };
    return walletInformation;
  } catch (err) {
    console.log(
      '🚀 ~ file: config.tsx ~ line 138 ~ loginWithMetaMask ~ err',
      err
    );
  }
};

export {
  getWeb3,
  isMetaMaskAvailable,
  checkForMetamaskNetwork,
  getAccountInformation,
  connect,
  // getNonceString,
  loginWithMetaMask,
  getCustomRPCWeb3Instance,
};
