import { UniqueChain } from "@unique-nft/sdk";
import { Sr25519Account } from "@unique-nft/sr25519";

// Default base URL for a local node; change for production
const DEFAULT_BASE_URL = process.env.UNIQUE_BASE_URL || "http://localhost:3000";

/**
 * Create an Sr25519Account from mnemonic. Falls back to process.env.MNEMONIC.
 * @param {string} [mnemonic]
 * @returns {any} account
 */
export function createAccountFromMnemonic(mnemonic = process.env.MNEMONIC) {
  if (!mnemonic) {
    console.warn('No mnemonic provided. Set MNEMONIC in your environment or pass it to createAccountFromMnemonic.');
  }
  return Sr25519Account.fromUri(mnemonic || "");
}

/**
 * Create a configured UniqueChain SDK instance and the signer account.
 * @param {{ baseUrl?: string, mnemonic?: string }} [opts]
 */
export function getSdk({ baseUrl = DEFAULT_BASE_URL, mnemonic } = {}) {
  const account = createAccountFromMnemonic(mnemonic);
  const sdk = UniqueChain({ baseUrl, account });
  return { sdk, account };
}

// default export: preconfigured instance using environment variables
export const defaultSdk = getSdk();

export default defaultSdk;
