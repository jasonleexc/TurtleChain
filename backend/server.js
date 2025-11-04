import express from 'express';
import dotenv from 'dotenv';
import { getSdk } from '../src/sdk.js';

// we keep a js version until we fully migrate to ts

dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 4000;

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/chain', async (req, res) => {
  try {
    // check whether the sdk's rpc is available, chain method exists 
    const { sdk } = getSdk();
    if (sdk && sdk.api && sdk.api.rpc && sdk.api.rpc.system && typeof sdk.api.rpc.system.chain === 'function') {
      const chain = await sdk.api.rpc.system.chain();
      res.json({ chain: chain.toString() });
    } else {
      res.json({ error: 'SDK RPC not available or not initialised' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/account', (req, res) => {
  try {
    const { account } = getSdk();
    res.json({ address: account?.address ?? null, prefixedAddress: account?.prefixedAddress ?? null });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`TurtleChain backend listening on http://localhost:${PORT}`);
});
