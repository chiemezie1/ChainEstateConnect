import { ethers } from "ethers";
import RealEstateProperty from "../Contract/RealEstateProperty.json";

const fetchContract = (SignerOrProvider) => {
    return new ethers.Contract(
        RealEstateProperty.address,
        RealEstateProperty.abi,
        SignerOrProvider
    );
};

async function buyProperty(productId) {
    const provider = new ethers.providers.JsonRpcProvider('YOUR_RPC_URL'); // Replace with your RPC URL
    const signer = provider.getSigner();
    const contract = fetchContract(signer);

    try {
        const transaction = await contract.buyProperty(productId);
        await transaction.wait();
        console.info('Contract call success');
    } catch (err) {
        console.error('Contract call failure', err);
    }
}

async function createProperty(_productTitle, price, _category, _location, _description, _imageUrl) {
    const provider = new ethers.providers.JsonRpcProvider('YOUR_RPC_URL');
    const signer = provider.getSigner();
    const contract = createContractInstance(signer);

    try {
        const transaction = await contract.creacteProperty(_productTitle, price, _category, _location, _description, _imageUrl);
        await transaction.wait();
        console.info('Contract call success');
    } catch (err) {
        console.error('Contract call failure', err);
    }
}

async function createReview(productId, rating, comment) {
    const provider = new ethers.providers.JsonRpcProvider('YOUR_RPC_URL'); // Replace with your RPC URL
    const signer = provider.getSigner();

    const contract = createContractInstance(signer);

    try {
        const transaction = await contract.createReview(productId, rating, comment);
        await transaction.wait();
        console.info('Contract call success');
    } catch (err) {
        console.error('Contract call failure', err);
    }
}


async function likeReview(productId, reviewIndex) {
    const provider = new ethers.providers.JsonRpcProvider('YOUR_RPC_URL');
    const signer = provider.getSigner();

    const contract = createContractInstance(signer);

    try {
        const transaction = await contract.likeReview(productId, reviewIndex);
        await transaction.wait();
        console.info('Contract call success');
    } catch (err) {
        console.error('Contract call failure', err);
    }
}

async function dislikeReview(productId, reviewIndex) {
    const provider = new ethers.providers.JsonRpcProvider('YOUR_RPC_URL');
    const signer = provider.getSigner();

    const contract = createContractInstance(signer);

    try {
        const transaction = await contract.dislikeReview(productId, reviewIndex);
        await transaction.wait();
        console.info('Contract call success');
    } catch (err) {
        console.error('Contract call failure', err);
    }
}

async function sendExcessFunds(recipient, amount) {
    const rpcURL = 'YOUR_RPC_URL'; // Replace with your RPC URL
    const provider = new ethers.providers.JsonRpcProvider(rpcURL);
    const signer = provider.getSigner();

    const contract = createContractInstance(signer);

    try {
        const transaction = await contract.sendExcessFunds(recipient, amount);
        await transaction.wait();
        console.info('Contract call success');
    } catch (err) {
        console.error('Contract call failure', err);
    }
}

async function transferOwnership(newOwner) {
    const rpcURL = 'YOUR_RPC_URL'; // Replace with your RPC URL
    const provider = new ethers.providers.JsonRpcProvider(rpcURL);
    const signer = provider.getSigner();

    const contract = createContractInstance(signer);

    try {
        const transaction = await contract.transferOwnership(newOwner);
        await transaction.wait();
        console.info('Contract call success');
    } catch (err) {
        console.error('Contract call failure', err);
    }
}

async function unlistProperty(productId) {
    const rpcURL = 'YOUR_RPC_URL'; // Replace with your RPC URL
    const provider = new ethers.providers.JsonRpcProvider(rpcURL);
    const signer = provider.getSigner();

    const contract = createContractInstance(signer);

    try {
        const transaction = await contract.unlistProperty(productId);
        await transaction.wait();
        console.info('Contract call success');
    } catch (err) {
        console.error('Contract call failure', err);
    }
}

async function updateCommissionRate(commission) {
    const rpcURL = 'YOUR_RPC_URL'; // Replace with your RPC URL
    const provider = new ethers.providers.JsonRpcProvider(rpcURL);
    const signer = provider.getSigner();

    const contract = createContractInstance(signer);

    try {
        const transaction = await contract.updateCommissionRate(commission);
        await transaction.wait();
        console.info('Contract call success');
    } catch (err) {
        console.error('Contract call failure', err);
    }
}

async function updatePropertyPrice(productId, newPrice) {
    const rpcURL = 'YOUR_RPC_URL'; // Replace with your RPC URL
    const provider = new ethers.providers.JsonRpcProvider(rpcURL);
    const signer = provider.getSigner();

    const contract = createContractInstance(signer);

    try {
        const transaction = await contract.updatePropertyPrice(productId, newPrice);
        await transaction.wait();
        console.info('Contract call success');
    } catch (err) {
        console.error('Contract call failure', err);
    }
}


async function updatePropertyDetails(productId, category, location, description, imageUrl) {
    const rpcURL = 'YOUR_RPC_URL'; // Replace with your RPC URL
    const provider = new ethers.providers.JsonRpcProvider(rpcURL);
    const signer = provider.getSigner();

    const contract = createContractInstance(signer);

    try {
        const transaction = await contract.updatePropertyDetails(productId, category, location, description, imageUrl);
        await transaction.wait();
        console.info('Contract call success');
    } catch (err) {
        console.error('Contract call failure', err);
    }
}

