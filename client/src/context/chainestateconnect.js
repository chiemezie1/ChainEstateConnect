import { ethers } from "ethers";
import RealEstateProperty from "../Contract/RealEstateProperty.json";

const fetchContract = (SignerOrProvider) => {
    return new ethers.Contract(
        RealEstateProperty.address,
        RealEstateProperty.abi,
        SignerOrProvider
    );
};


///// WRITER  FUNCTIONS//////////

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

async function withdrawContractOwnerFunds(arg1, arg2 /*, ...other args */) {
    const rpcURL = 'YOUR_RPC_URL'; // Replace with your RPC URL
    const provider = new ethers.providers.JsonRpcProvider(rpcURL);
    const signer = provider.getSigner();

    const contract = createContractInstance(signer);

    try {
        const transaction = await contract.withdrawContractOwnerFunds(arg1, arg2 /*, ...other args */);
        await transaction.wait();
        console.info('Contract call success');
    } catch (err) {
        console.error('Contract call failure', err);
    }
}

async function withdrawSellerFunds(arg1, arg2 /*, ...other args */) {
    const rpcURL = 'YOUR_RPC_URL'; // Replace with your RPC URL
    const provider = new ethers.providers.JsonRpcProvider(rpcURL);
    const signer = provider.getSigner();

    const contract = createContractInstance(signer);

    try {
        const transaction = await contract.withdrawSellerFunds(arg1, arg2 /*, ...other args */);
        await transaction.wait();
        console.info('Contract call success');
    } catch (err) {
        console.error('Contract call failure', err);
    }
}



/////// READ ONLY FUNCTIONS ///////

async function getCommissionRate() {
    const rpcURL = 'YOUR_RPC_URL'; // Replace with your RPC URL
    const provider = new ethers.providers.JsonRpcProvider(rpcURL);

    const contract = createContractInstance(provider);

    try {
        const commissionRate = await contract.commissionRate();
        console.log('Commission Rate:', commissionRate.toString());
        return commissionRate.toString();
    } catch (err) {
        console.error('Failed to fetch commission rate:', err);
        return null;
    }
}

async function getContractBalance() {
    const rpcURL = 'YOUR_RPC_URL'; // Replace with your RPC URL
    const provider = new ethers.providers.JsonRpcProvider(rpcURL);

    const contract = createContractInstance(provider);

    try {
        const contractBalance = await contract.contractBalance();
        console.log('Contract Balance:', contractBalance.toString());
        return contractBalance.toString();
    } catch (err) {
        console.error('Failed to fetch contract balance:', err);
        return null;
    }
}

async function getAllProperties() {
    const rpcURL = 'YOUR_RPC_URL'; // Replace with your RPC URL
    const provider = new ethers.providers.JsonRpcProvider(rpcURL);

    const contract = createContractInstance(provider);

    try {
        const properties = await contract.getAllProperties();
        console.log('All Properties:', properties);
        return properties;
    } catch (err) {
        console.error('Failed to fetch all properties:', err);
        return null;
    }
}

async function getContractBalance() {
    const rpcURL = 'YOUR_RPC_URL'; // Replace with your RPC URL
    const provider = new ethers.providers.JsonRpcProvider(rpcURL);

    const contract = createContractInstance(provider);

    try {
        const contractBalance = await contract.getContractBalance();
        console.log('Contract Balance:', contractBalance.toString());
        return contractBalance.toString();
    } catch (err) {
        console.error('Failed to fetch contract balance:', err);
        return null;
    }
}

async function getHighestRatedProduct() {
    const rpcURL = 'YOUR_RPC_URL'; // Replace with your RPC URL
    const provider = new ethers.providers.JsonRpcProvider(rpcURL);

    const contract = createContractInstance(provider);

    try {
        const highestRatedProduct = await contract.getHighestRatedProduct();
        console.log('Highest Rated Product:', highestRatedProduct.toString());
        return highestRatedProduct.toString();
    } catch (err) {
        console.error('Failed to fetch highest rated product:', err);
        return null;
    }
}

async function getProductReviews(productId) {
    const rpcURL = 'YOUR_RPC_URL'; // Replace with your RPC URL
    const provider = new ethers.providers.JsonRpcProvider(rpcURL);

    const contract = createContractInstance(provider);

    try {
        const reviews = await contract.getProductReviews(productId);
        console.log('Product Reviews:', reviews);
        return reviews;
    } catch (err) {
        console.error('Failed to fetch product reviews:', err);
        return null;
    }
}

async function getPropertiesOnSale() {
    const rpcURL = 'YOUR_RPC_URL'; // Replace with your RPC URL
    const provider = new ethers.providers.JsonRpcProvider(rpcURL);

    const contract = createContractInstance(provider);

    try {
        const propertiesOnSale = await contract.getPropertiesOnSale();
        console.log('Properties on Sale:', propertiesOnSale);
        return propertiesOnSale;
    } catch (err) {
        console.error('Failed to fetch properties on sale:', err);
        return null;
    }
}

