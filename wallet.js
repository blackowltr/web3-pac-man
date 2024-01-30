const connectToArtelaTestNetAutomatically = async () => {
    try {
        const networkName = 'Artela TestNet';
        const rpcUrl = 'https://betanet-rpc1.artela.network';
        const chainId = '11822';
        const symbol = 'ART';
        const blockExplorerUrl = 'https://betanet-scan.artela.network';

        // Bağlantı bilgilerini kullanarak ağa bağlanma işlemi
        const provider = new Web3.providers.HttpProvider(rpcUrl);
        const web3 = new Web3(provider);

        // Ağa başarıyla bağlanıldı mesajını gösterme
        console.log(`Connected to ${networkName} TestNet`);

        // İsteğe bağlı olarak diğer bilgileri de kullanabilirsiniz
        console.log('ChainID:', chainId);
        console.log('Symbol:', symbol);
        console.log('Block Explorer URL:', blockExplorerUrl);

        // Bağlantıyı döndürme
        return web3;
    } catch (err) {
        console.error(err);
        throw err; // Hata durumunda hatayı tekrar fırlat
    }
};

const getProvider = async () => {
    try {
        const web3 = await connectToArtelaTestNetAutomatically();
        const provider = web3.currentProvider;

        // MetaMask kontrolü ekleme
        if (provider.isMetaMask) {
            return provider;
        } else {
            throw new Error('MetaMask not detected.');
        }
    } catch (err) {
        console.error(err);
        throw err; // Hata durumunda hatayı tekrar fırlat
    }
};

const connectWallet = async () => {
    try {
        const provider = await getProvider();
        // Metamask bağlantısını sağlama
        await provider.request({ method: "eth_requestAccounts" });
    } catch (err) {
        console.error(err);
    }
};

const requestWalletConnection = async () => {
    try {
        const provider = await getProvider();
        // Metamask bağlantı talebini sağlama
        await provider.request({ method: "eth_requestAccounts" });
    } catch (err) {
        console.error(err);
    }
};

const getWalletAddress = async () => {
    try {
        const provider = await getProvider();
        // Metamask'tan cüzdan adresini al
        const accounts = await provider.request({ method: "eth_accounts" });
        return accounts[0] || '';
    } catch (err) {
        return '';
    }
};

// Kullanıcıyı ağa bağlanmaya davet etme
connectWallet();
