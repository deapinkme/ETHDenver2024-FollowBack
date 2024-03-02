const axios = require("axios");
require("dotenv").config();

const apiKey = process.env.PHOSPHOR_API_KEY;

const headers = {
  "Content-Type": "application/json",
  "Phosphor-Api-Key": apiKey,
};

/**
 * Create and deploy a creator friendship contract
 *
 *
 * @param {string} creatorname - The name of the creator
 * @param {string} descripton - The description of the NFT
 * @param {string} png - The image of the NFT
 * @param {string} Network_ID - The network ID
 * @param {string} nftsymbol - The NFT symbol
 * @param {string} nftowneraddress - The NFT owner address
 */
async function creatorContract(
  creatorname,
  descripton,
  png,
  Network_ID,
  nftsymbol,
  nftowneraddress
) {
  /** Create and deploy a creator friendship contract
   * POST /v1/collections
   *
   * @param {string} creatorname - The name of the creator
   * @param {string} descripton - The description of the NFT
   * @param {string} png - The image of the NFT
   * @param {string} Network_ID - The network ID
   * @param {string} nftsymbol - The NFT symbol
   * @param {string} nftowneraddress - The NFT owner address
   *
   * @returns {string} collectionId - The collection ID
   * @returns {string} transactionId - The transaction ID
   */
  apiUrl = "https://admin-api.phosphor.xyz/v1/collections";
  const create_friendship_collection = `
  {
    "name": "Friendship NFT Collection - {{${creatorname}}}",
    "description": "{{${descripton}}}",
    "media": {
        "thumbnail_image_url": "${png}"
    },
    "editable_metadata": true,
    "deployment_request": {
        "network_id": ${Network_ID},
        "type": "PLATFORM",
        "token_id_assignment_strategy": "AUTOMATIC",
        "platform": {
            "variant": "FlexibleERC721",
            "symbol": "${nftsymbol}",
            "owner": "${nftowneraddress}"
        }
    }
  }`;

  axios
    .post(apiUrl, JSON.parse(create_friendship_collection), { headers })
    .then((response) => {
      // console.log("API Response:", response.data);
      return reponse.json().id, response.json().deployment.transaction_id;
    })
    .catch((error) => {
      console.error("API Error:", error.message);
    });
}

async function checkDeployment(collectionId, transactionId) {
  /**
   * Check collection details, deployment, and return creation transaction
   *
   * Collection details -> GET /v1/collections/:collection_id
   * Check deployment -> GET /v1/collections/:collection_id/deployment-request
   * Get creation tx -> GET /v1/transactions/:transaction_id
   */

  try {
    // Collection details
    const collectionDetailsUrl = `https://admin-api.phosphor.xyz/v1/collections/${collectionId}`;
    const collectionDetailsResponse = await axios.get(collectionDetailsUrl, {
      headers,
    });
    console.log("Collection Details:", collectionDetailsResponse.data);

    // Check deployment
    const deploymentUrl = `https://admin-api.phosphor.xyz/v1/collections/${collectionId}/deployment-request`;
    const deploymentResponse = await axios.get(deploymentUrl, { headers });
    console.log("Deployment:", deploymentResponse.data);

    // Get creation tx
    const creationTxUrl = `https://admin-api.phosphor.xyz/v1/transactions/${transactionId}`;
    const creationTxResponse = await axios.get(creationTxUrl, { headers });
    console.log("Creation Transaction:", creationTxResponse.data);

    return creationTxResponse.data;
  } catch (error) {
    console.error("API Error:", error.message);
  }
}
