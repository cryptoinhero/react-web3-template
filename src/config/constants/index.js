export const zeroAddress = '0x0000000000000000000000000000000000000000'

export const DefaultChainID = parseInt(process.env.REACT_APP_NETWORK_ID, 10)

export const ChainList = {
  56: 'BSC mainnet',
  97: 'BSC Testnet',
  4: 'Rinkeby Testnet',
};

export const ExplorerUrls = {
  56: 'https://bscscan.com/',
  97: 'https://testnet.bscscan.com/',
  4: 'https://rinkeby.etherscan.io/',
}

export const Currencies = {
  56: [
    {
      id: 'binancecoin',
      name: 'BNB',
      address: zeroAddress,
      symbol: 'BNB',
      chainId: 56,
      decimals: 18,
      icon: '',
    },
    {
      id: 'strite',
      name: 'Strite',
      address: '0x9b93c29595dd603f75854eba3c5f4ee078ee4454',
      symbol: 'STRI',
      chainId: 56,
      decimals: 18,
      icon: '',
    },
    {
      id: 'clout',
      name: 'CLOUT',
      address: '0x9b93c29595dd603f75854eba3c5f4ee078ee4454',
      symbol: 'CLOUT',
      chainId: 56,
      decimals: 18,
      icon: '',
    },
  ],
  97: [
    {
      id: 'binancecoin',
      name: 'BNB',
      address: zeroAddress,
      symbol: 'BNB',
      chainId: 97,
      decimals: 18,
      icon: '',
    },
    {
      id: 'strite',
      name: 'Strite',
      address: '0x1351ecD5cF255285bdfe24dCce7afc7fF3d17550',
      symbol: 'STRI',
      chainId: 4,
      decimals: 18,
      icon: '',
    },
  ],
}