#!/usr/bin/env node
import { defaultSdk, getSdk } from "../src/sdk.js";

async function main() {
  // Use the default SDK (reads MNEMONIC and UNIQUE_BASE_URL from env)
  const { sdk, account } = defaultSdk;

  console.log('Created signer. Account information summary:');
  try {
    // Print basic account metadata safely
    const keys = Object.keys(account || {});
    console.log('Account constructor:', account?.constructor?.name ?? 'unknown');
    console.log('Account keys:', keys.join(', ') || '(no enumerable keys)');
  } catch (e) {
    console.log('Unable to inspect account object:', e.message);
  }

  if (sdk && sdk.api && sdk.api.rpc && sdk.api.rpc.system && typeof sdk.api.rpc.system.chain === 'function') {
    try {
      const chain = await sdk.api.rpc.system.chain();
      console.log('Chain:', chain.toString());
    } catch (err) {
      console.log('RPC call failed (node may be offline or baseUrl incorrect):', err.message);
    }
  } else {
    console.log('SDK RPC not available or not initialised; skipping chain query.');
  }

  console.log('\nIf you need a fresh SDK instance, call getSdk({ baseUrl, mnemonic }).');
}

main().catch((e) => {
  console.error('Example script failed:', e);
  process.exit(1);
});
