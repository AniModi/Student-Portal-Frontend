import axios from "axios";

async function pinJsonToPinata(jsonObject) {

    console.log("Inside pinJsonToPinata function");

    const pinataApiKey = 'aedaf621f9d3dae0a658';
    const pinataSecretApiKey = '0a386cb8987b785219286798a8cbc4730b557c985316fdc0f4158b0351b3e9e2';


    try {
        const jsonString = JSON.stringify(jsonObject);

        const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';

        // Make a POST request to Pinata
        const response = await axios.post(
            url,
            jsonString,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'pinata_api_key': pinataApiKey,
                    'pinata_secret_api_key': pinataSecretApiKey,
                },
            }
        );

        console.log('Pinned successfully:', response.data.IpfsHash);
        return response.data.IpfsHash;
    } catch (error) {
        console.error('Error pinning to Pinata:', error);
        throw error;
    }
}

export { pinJsonToPinata };