const axios = require("axios");
require("dotenv").config();

const apiKey = process.env.PHOSPHOR_API_KEY;

const headers = {
  "Content-Type": "application/json",
  "Phosphor-Api-Key": apiKey,
};

/**
 * Mint Friend NFT for winner
 *
 * @param {*} collectionId
 * @param {*} description
 * @param {*} date
 * @param {*} game_winner
 * @param {*} ipfs_url
 */
async function mintNFT(collectionId, description, date, game_winner, ipfs_url) {
  /**
   * Mint NFT
   *
   * @param {string} collectionId - The collection ID
   * @param {string} ipfs_url - The IPFS URL
   *
   * @returns {string} item_id - The item ID
   */
  apiUrl = "https://admin-api.phosphor.xyz/v1/items";
  const mint_nft = `
  {
    "collection_id": "{{${collectionId}}}",
    "attributes": {
        "title": "My Biggest Fan NFT",
        "description": "{{${description}}}",
        "any trait 1": "${date}",
        "any trait 2": "${game_winner}",
        "image_url": "${ipfs_url}"
    }
  }
  `;
  axios
    .post(apiUrl, mint_nft, { headers })
    .then((response) => {
      console.log("API Response:", response.data);
      return reponse.json().id;
    })
    .catch((error) => {
      console.error("API Error:", error.message);
    });
}

// airdrop Winner NFT(s)
async function lockNFT(item_id) {
  /**
   * Lock NFT
   *
   * @param {string} item_id - The item ID
   */
  apiUrl = "https://admin-api.phosphor.xyz/v1/items/lock";
  const lock_nft = `  {
    "item_id": "{{Item_Id}}"
  }`;

  axios
    .post(apiUrl, lock_nft, { headers })
    .then((response) => {
      console.log("API Response:", response.data);
    })
    .catch((error) => {
      console.error("API Error:", error.message);
    });
}

async function airdropNFT(item_id, recipient_address) {
  /**
   * Airdrop NFT
   *
   * @param {string} item_id - The item ID
   * @param {string} recipient_address - The recipient address
   *
   * @returns {string} transactionId - The transaction ID
   */
  apiUrl = "https://admin-api.phosphor.xyz/v1/transactions";
  const airdrop_nft = `
  {
    "item_id": "{{${item_id}}}",
    "recipient_address": "{{${recipient_address}}}"
  }
  `;
  axios
    .post(apiUrl, airdrop_nft, { headers })
    .then((response) => {
      console.log("API Response:", response.data);
    })
    .catch((error) => {
      console.error("API Error:", error.message);
    });
}
