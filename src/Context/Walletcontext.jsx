import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";

export const Walletcontext = createContext();

export const WalletProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [chainId, setChainId] = useState(null);
    const [chainName, setChainName] = useState(null);
    const [provider, setProvider] = useState(null);

    const checkWalletAvailability = () => {
        if (window.ethereum) {
            setProvider(new ethers.BrowserProvider(window.ethereum));
            return true;
        } else {
            alert("MetaMask not installed!");
            return false;
        }
    };

    const updateChainInfo = async (chainId) => {
        let chainName = "";

        switch (chainId) {
            case "0x1":
                chainName = "Ethereum Mainnet";
                break;
            case "0x38":
                chainName = "BNB Smart Chain";
                break;
             case "0x138de":
                 chainName = "Berachain";
                 break;
             case "0x2105":
                 chainName = "Base";
                 break;
             case "0xa4b1":
                 chainName = "Arbitrum One";
                 break;
            case "0x92":
                 chainName = "Sonic Mainnet";
                 break;
            case "0xa86a":
                 chainName = "Avalanche C-Chain";
                  break;
            case "0x89":
                 chainName = "Polygon Mainnet";
                 break;
            case "0xa":
                 chainName = "OP Mainnet";
                break;
            case "0x531":
                 chainName = "Sei Network";
                 break;
            case "0x1388":
                 chainName = "Mantle";
                 break;
            case "0xe708":
                 chainName = "Linea";
                 break;
            case "0x13e31":
                 chainName = "Blast";
                 break;
            case "0x144":
                 chainName = "zkSync Mainnet";
                 break;
            case "0x8173":
                 chainName = "ApeChain";
                 break;
            case "0x208d":
                 chainName = "B3";
                 break;
            case "0x2eb":
                 chainName = "Flow EVM Mainnet";
                 break;
            case "0x7e4":
                 chainName = "Ronin";
                 break;
            case "0x168":
                 chainName = "Shape";
                 break;
            case "0x74c ":
                 chainName = "Soneium";
                 break;
            case "0x82":
                 chainName = "Unichain";
                 break;
            case "0x76adf1":
                 chainName = "Zora";
                 break;
            case "0xa4ec":
                 chainName = "Celo Mainnet";
                 break;
            case "0x504":
                 chainName = "Moonbeam";
                 break;
            case "0xa729":
                 chainName = "Etherlink Mainnet";
                 break;
            case "0x343b":
                 chainName = "Immutable zkEVM";
                 break;
            default:
                chainName = "Unknown Network";
                break;
              
        }
          localStorage.setItem("chainName", chainName);
          setChainId(chainId);
          setChainName(chainName);
    };

    const connectWallet = async () => {
        if (!checkWalletAvailability()) return;

        try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            if (accounts.length === 0) {
                alert("No account found!");
                return;
            }

            const chainId = await window.ethereum.request({ method: "eth_chainId" });

            localStorage.setItem("walletAddress", accounts[0]);
            setAccount(accounts[0]);
            updateChainInfo(chainId);
        } catch (error) {
            alert("Wallet connection failed:", error);
        }
    };

    const disconnectWallet = () => {
        setAccount(null);
        setChainId(null);
        setChainName(null);
        localStorage.removeItem("walletAddress");
        localStorage.removeItem("chainName");
    };

    useEffect(() => {
        
        if (checkWalletAvailability()) {
            const savedAccount = localStorage.getItem("walletAddress");
            const savedChainName = localStorage.getItem("chainName");
            if (savedAccount) {
                setAccount(savedAccount);
            }
            if (savedChainName) {
                setChainName(savedChainName);
            }
        }
    }, []);

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    localStorage.setItem("walletAddress", accounts[0]);
                } else {
                    disconnectWallet();
                }
            });

            window.ethereum.on("chainChanged", (chainId) => {
                updateChainInfo(chainId);
            });

            return () => {
                window.ethereum.removeListener("accountsChanged", () => {});
                window.ethereum.removeListener("chainChanged", () => {});
            };
        }
    }, []);

    return (
        <Walletcontext.Provider value={{ account, chainName, connectWallet, disconnectWallet }}>
            {children}
        </Walletcontext.Provider>
    );
};

export default function useWallet() {
    return useContext(Walletcontext);
}
