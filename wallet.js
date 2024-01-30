document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("keydown", async (event) => {
        if (event.key === 'w') {
            await connectWallet();
        }
    });

    const connectToArtelaTestNetAutomatically = async () => {
        try {
            const networkName = 'Artela TestNet';
            const rpcUrl = 'https://betanet-rpc1.artela.network';
            const chainId = '11822';

            const provider = new Web3.providers.HttpProvider(rpcUrl);
            const web3 = new Web3(provider);

            // Kontrol: Artela ağını MetaMask'e ekleyip ekleyemediğini kontrol et
            const isArtelaNetworkAdded = await addArtelaNetworkToMetaMask(networkName, chainId, rpcUrl);

            if (!isArtelaNetworkAdded) {
                throw new Error('Artela Network could not be added to MetaMask.');
            }

            console.log(`Connected to ${networkName} TestNet`);
            return web3;
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    const addArtelaNetworkToMetaMask = async (networkName, chainId, rpcUrl) => {
        try {
            if ('ethereum' in window && window.ethereum.isMetaMask) {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: `0x${chainId.toString(16)}`,
                            chainName: networkName,
                            rpcUrls: [rpcUrl],
                            nativeCurrency: {
                                name: 'ART',
                                symbol: 'ART',
                                decimals: 18,
                            },
                            blockExplorerUrls: ['https://betanet-scan.artela.network/'],
                        },
                    ],
                });
                return true;
            }
            return false;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const getProvider = async () => {
        try {
            const web3 = await connectToArtelaTestNetAutomatically();
            const provider = web3.currentProvider;

            if (provider.isMetaMask) {
                return provider;
            } else {
                throw new Error('MetaMask not detected.');
            }
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    const connectWallet = async () => {
        try {
            const provider = await getProvider();
            await provider.request({ method: "eth_requestAccounts" });
            console.log('Wallet connected successfully!');
        } catch (err) {
            console.error(err);
        }
    });
};
