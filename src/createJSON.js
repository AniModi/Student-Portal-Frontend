import axios from "axios";
import { uploadToIPFS } from "./uploadToPinata";
import { pinJsonToPinata } from "./uploadJSONToPinata";

async function fetchDataAndCreateJSON(student, semester) {
    console.log("Inside createJSON function");
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    try {
        const response = await axios.get(`http://localhost:5000/api/fetch-documents/${student}/${semester}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });

        const response_new = await axios.get(`http://localhost:5000/api/admin/get-student/${student}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });

        const { result } = response.data;
        const { name, walletAddress } = response_new.data.data;
        console.log("Result is", result);

        const jsonObject = {
            "name": `IIITV Student Results Semester ${semester}`,
            "description": `Results for the ${semester} semester of the B.Tech program at IIIT Vadodara`,
            "image": `https://gateway.pinata.cloud/ipfs/` + result,
            "attributes": [
                {
                    "trait_type": "NFT Type",
                    "value": "Results"
                },
                {
                    "trait_type": "Created By",
                    "value": "IIITV"
                },
                {
                    "trait_type": "Issued Date",
                    "value": formattedDate
                },
                {
                    "trait_type": "Student Name",
                    "value": name
                },
                {
                    "trait_type": "Student ID",
                    "value": student
                },
                {
                    "trait_type": "Semester",
                    "value": semester
                }
            ],
        };
        const json_data = JSON.stringify(jsonObject, null, 2);
        console.log(json_data);
        const metadata_hash = await pinJsonToPinata(jsonObject);
        console.log("Metadata Hash is", metadata_hash);
        console.log("Wallet Address is", walletAddress);

    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

export { fetchDataAndCreateJSON };
