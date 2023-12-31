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
    const provider = new ethers.providers.JsonRpcProvider('YOUR_RPC_URL'); // Replace with your RPC URL
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

