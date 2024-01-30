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
    }
};

const getProvider = async () => {
    try {
        const web3 = await connectToArtelaTestNetAutomatically();
        return web3.currentProvider;
    } catch (err) {
        console.error(err);
    }
};

const connectWallet = async () => {
    const provider = await getProvider();
    try {
        // Metamask bağlantısını sağlama
        await provider.request({ method: "eth_requestAccounts" });
    } catch (err) {
        console.error(err);
    }
};

const requestWalletConnection = async () => {
    const provider = await getProvider();
    try {
        // Metamask bağlantı talebini sağlama
        await provider.request({ method: "eth_requestAccounts" });
    } catch (err) {
        console.error(err);
    }
};

const getWalletAddress = async () => {
    const provider = await getProvider();
    try {
        // Metamask'tan cüzdan adresini al
        const accounts = await provider.request({ method: "eth_accounts" });
        return accounts[0] || '';
    } catch (err) {
        return '';
    }
};
