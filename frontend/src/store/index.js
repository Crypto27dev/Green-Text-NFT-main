import { createStore } from 'redux'
import Web3 from 'web3';
import Web3Modal from "web3modal";
import config from '../config/index';
import { toast } from 'react-toastify';

const providerOptions = {};
const web3Modal = new Web3Modal({
    //network: "testnet", // optional
    cacheProvider: true, // optional
    providerOptions // required
});
const provider = await web3Modal.connect();
const web3 = new Web3(provider);
//const web3 = new Web3(new Web3.providers.HttpProvider(config.mainNetUrl));

const ERC721Con = new web3.eth.Contract(config.ERC721Abi, config.ERC721Address);

const uploadImage = (blob, url, fileName) => {
    const formData = new FormData();
    formData.append('image', blob, fileName);

    fetch(url, {
        method: 'POST',
        mode: "no-cors",
        headers: {
            'Access-Control-Allow-Origin': '*',
            //'Content-Type': 'multipart/form-data',
        },
        body: formData
    }).then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error);
    });
};

const mint = async (state, image) => {
    if (!state.account) {
        alertMsg("Please connect metamask!");
        return;
    }

    try {
        const ethers = web3.utils.toWei(0.003, 'ether');
        console.log("Ethers:", ethers);
        console.log("Account:", state.account);
        await ERC721Con.methods.mint().send({ from: state.account, value: ethers });

        const count = await ERC721Con.methods.balanceOf(state.account).call();
        const tokenId = await ERC721Con.methods.tokenOfOwnerByIndex(state.account, parseInt(count) - 1).call();
        uploadImage(image, "http://localhost/green-text-nft", `${tokenId}.png`);
    } catch (e) {
        console.log(e);
    }
}

const alertMsg = (msg) => {
    toast.info(msg, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

const checkNetwork = (chainId) => {
    if (chainId !== config.chainId) {
        alertMsg("Change network to BSC Mainnet!");
        return false;
    } else {
        return true;
    }
}

const changeNetwork = async () => {
    try {
        console.log("changeNetwork: chain_id=", config.chainId);
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: web3.utils.toHex(config.chainId) }],
        });
    } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: web3.utils.toHex(config.chainId),
                            chainName: 'Avalanche',
                            rpcUrls: [config.mainNetUrl] /* ... */,
                        },
                    ],
                });
            } catch (addError) {
            }
        }
    }
}

if (window.ethereum) {
    window.ethereum.on('accountsChanged', function (accounts) {
        console.log("Accounts changed: ", accounts);
        store.dispatch({
            type: "UPDATE_ACCOUNTS",
            payload: {
                accounts: accounts
            }
        });
    });

    window.ethereum.on('chainChanged', function (chainId) {
        console.log("chainChanged: ", parseInt(chainId));
        store.dispatch({
            type: "UPDATE_CHAIN_ID",
            payload: {
                chainId: parseInt(chainId)
            }
        });
    });

    web3.eth.getChainId().then((chainId) => {
        console.log("getChainId: ", parseInt(chainId));
        store.dispatch({
            type: "UPDATE_CHAIN_ID",
            payload: {
                chainId: parseInt(chainId)
            }
        });
    })
}

const _initialState = {
    account: "",
    chainId: 0,
    NFTs: 0,
};

const reducer = (state = _initialState, action) => {
    switch (action.type) {
        case "UPDATE_CHAIN_ID":
            state = {
                ...state,
                chainId: action.payload.chainId,
            };
            if (action.payload.chainId !== config.chainId) {
                state = {
                    ...state,
                    account: ""
                };
            }
            break;

        case "UPDATE_ACCOUNTS":
            if (state.account) {
                /*if (action.payload.accounts.length > 0) {
                    let options = {
                        filter: {
                            _from: 0,
                            _to: action.payload.accounts[0]
                        }
                    };
                    ERC721Con.events.Transfer(options, event => {
                        console.log("event", event);
                    });
                }*/

                state = {
                    ...state,
                    account: action.payload.accounts.length > 0 ? action.payload.accounts[0] : ""
                };
            }
            break;
        
        case "CONNECT":
            console.log("Trying CONNECT<state, config>:", state.chainId, config.chainId);
            if (!checkNetwork(state.chainId)) {
                changeNetwork();
                return state;
            }

            window.ethereum.request({ method: 'eth_accounts' }).then((accounts) => { 
                if (accounts.length > 0) {
                    /*let options = {
                        filter: {
                            _from: 0,
                            _to: accounts[0]
                        }
                    };
                    ERC721Con.events.Transfer(options, event => {
                        console.log("event", event);
                    });*/

                    store.dispatch({
                        type: 'UPDATE',
                        payload: {
                            account: accounts[0]
                        }
                    });
                }
            })
            .catch((err) => {
                console.error(err);
            });
            break;

        case "MINT":
            if (!checkNetwork(state.chainId)) {
                changeNetwork();
                return state;
            }

            ERC721Con.events.Transfer({
                filter: { _to: state.account }
            }).on("data", event=> {
                let data = event.returnValues;
                console.log(data);
            });

            mint(state, action.payload.image);
            break;


        case "UPDATE":
            return Object.assign({}, state, action.payload);

        default:
            break;
    }
    return state;
}

const store = createStore(reducer);
export default store