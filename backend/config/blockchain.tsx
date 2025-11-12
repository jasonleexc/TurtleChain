// configure blockchain connection settings

export const BLOCKCHAIN_CONFIG = {
  // RPC endpoint for Unique Network (Opal testnet)
  baseUrl: process.env.UNIQUE_BASE_URL || "https://rest.unique.network/opal/v1",

  // Future extension: add networkId, timeout, retries, etc.
  networkId: "unique-opal",
};

