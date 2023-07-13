export const networks = {
  storagechain: {
    testnet: {
      chainId: '0x2216',
      chainName: 'StorageChain Testnet',
      nativeCurrency: {
        name: 'Storchain',
        symbol: 'STOR',
        decimals: 18,
      },
      // rpcUrls: ['https://validator-node1.invo.zone'],
      rpcUrls: ['https://testnet-validator.storagechain.io'],
      blockExplorerUrls: ['https://evm.storscan.io/'],
    },
  },
  ethereum: {
    mainnet: {
      chainId: '0x1',
      chainName: 'Ethereum Mainnet',
      nativeCurrency: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 1,
      },
      rpcUrls: ['https://mainnet.infura.io/v3/'],
      blockExplorerUrls: ['https://etherscan.io'],
    },
    testnet: {
      chainId: '0x5',
      chainName: 'Goerli Testnet',
      nativeCurrency: {
        name: 'Goerli Ethereum',
        symbol: 'GoerliETH',
        decimals: 5,
      },
      rpcUrls: ['https://goerli.infura.io/v3/'],
      blockExplorerUrls: ['https://goerli.etherscan.io'],
    },
  },
  binance: {
    mainnet: {
      chainId: '0x38',
      chainName: 'Binance Mainnet',
      nativeCurrency: {
        name: 'Binance',
        symbol: 'BNB',
        decimals: 18,
      },
      rpcUrls: ['https://bsc-dataseed.binance.org/'],
      blockExplorerUrls: ['https://bscscan.com'],
    },
    testnet: {
      chainId: '0x61',
      chainName: 'Binance Testnet',
      nativeCurrency: {
        name: 'Binance',
        symbol: 'BNB',
        decimals: 18,
      },
      rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
      blockExplorerUrls: ['https://testnet.bscscan.com'],
    },
  },
  polygon: {
    mainnet: {
      chainId: '0x89',
      chainName: 'Polygon Mainnet',
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpcUrls: ['https://polygon-rpc.com/'],
      blockExplorerUrls: ['https://polygonscan.com/'],
    },
    testnet: {
      chainId: '0x13881',
      chainName: 'Polygon Testnet',
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpcUrls: [
        'https://polygon-mumbai.infura.io/v3/7a9d2a7b9c6f459ea3cddcd3a917c460',
      ], // https://rpc-mumbai.maticvigil.com/
      blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
    },
  },
};
