const getProvider = () => {
    if ('ethereum' in window) { // 'phantom' yerine 'ethereum' kullanıyoruz
        const provider = window.ethereum;

        if (provider.isMetaMask) { // 'isPhantom' yerine 'isMetaMask' kullanıyoruz
            return provider;
        }
    }

    // Metamask bulunamadıysa, kullanıcıyı yönlendir veya başka bir şey yapabilirsiniz.
    // Örneğin, kullanıcıyı Metamask indirmeye yönlendirme:
    // window.open('https://metamask.io/download.html', '_blank');
};

const connectWallet = async () => {
    const provider = getProvider();
    try {
        // Metamask bağlantısını sağlama
        await provider.request({ method: "eth_requestAccounts" });
    } catch (err) {
        console.error(err);
    }
}

const requestWalletConnection = async () => {
    const provider = getProvider();
    try {
        // Metamask bağlantı talebini sağlama
        await provider.request({ method: "eth_requestAccounts" });
    } catch (err) {
        console.error(err);
    }
}

const getWalletAddress = () => {
    const provider = getProvider();
    try {
        // Metamask'tan cüzdan adresini al
        return provider?.selectedAddress || '';
    } catch (err) {
        return '';
    }
}
