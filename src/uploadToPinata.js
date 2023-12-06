import axios from "axios";

const uploadToIPFS = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const pinataApiKey = 'aedaf621f9d3dae0a658';
  const pinataSecretApiKey = '0a386cb8987b785219286798a8cbc4730b557c985316fdc0f4158b0351b3e9e2';

  const url1 = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  try {
    const response = await axios.post(url1, formData, {
      headers: {
        'Content-Type': `multipart/form-data; boundary= ${formData._boundary}`,
        'pinata_api_key': pinataApiKey,
        'pinata_secret_api_key': pinataSecretApiKey,
      },
    });

    return response.data.IpfsHash;
  } catch (error) {
    console.error(error);
  }
}


export { uploadToIPFS };