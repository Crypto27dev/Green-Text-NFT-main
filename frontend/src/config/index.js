import GreenTextNFTAbi from './GreenTextNFTAbi.json';

// real net, avalanche-c chain
var config = {
    GreenTextNFTAbi: GreenTextNFTAbi,
    GreenTextNFTAddress: "0x31DF36303792D2AC3d4b215f3A10b140f9bE90FD", // GreenTextNFT contract address

    /* mainNet URL */
    //mainNetUrl: "https://bsc-dataseed.binance.org", //bsc mainnet RPC
    //chainId: 56, // bsc mainnet chain id

    /* testNet URL */
    mainNetUrl: "https://data-seed-prebsc-1-s1.binance.org:8545", //bsc testnet RPC
    chainId: 97, // bsc testnet chain id
};

export default config; 
