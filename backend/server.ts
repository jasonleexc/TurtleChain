import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { getSdk } from '../src/sdk.js';
import ipfs from '../src/ipfs.js';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const app = express();
const PORT = process.env.API_PORT ? Number(process.env.API_PORT) : 4000;

app.use(express.json({ limit: '10mb' }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/chain', async (_req, res) => {
  try {
    const { sdk } = getSdk();
    if (sdk && (sdk as any).rpc && (sdk as any).rpc.system && typeof (sdk as any).rpc.system.chain === 'function') {
      const chain = await (sdk as any).rpc.system.chain();
      res.json({ chain: chain.toString() });
    } else {
      res.json({ error: 'SDK RPC not available or not initialised' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err?.message ?? String(err) });
  }
});

app.get('/account', (_req, res) => {
  try {
    const { account } = getSdk();
    res.json({ address: account?.address ?? null, prefixedAddress: account?.prefixedAddress ?? null });
  } catch (err: any) {
    res.status(500).json({ error: err?.message ?? String(err) });
  }
});

// Scaffold: upload image to IPFS and return CID; optionally include a mint step stub
app.post('/upload', async (req, res) => {
  try {
    const { data, fileName } = req.body; // expect base64 or binary buffer encoded as base64 string
    if (!data) return res.status(400).json({ error: 'Missing `data` in request body' });

    const buffer = Buffer.from(data, 'base64');
    // ipfs helper expects compiled JS; we try to call uploadBuffer
    const cid = await (ipfs as any).uploadBuffer(buffer, fileName);
    res.json({ cid });
  } catch (err: any) {
    res.status(500).json({ error: err?.message ?? String(err) });
  }
});

// Scaffolded blockchain action: this endpoint shows how you'd prepare a mint request.
app.post('/mint', async (req, res) => {
  try {
    const { metadataCid, name } = req.body;
    if (!metadataCid) return res.status(400).json({ error: 'Missing metadataCid' });

    const { sdk, account } = getSdk();

    // The real Unique SDK call will differ — this is a scaffold showing the flow.
    // - Build the extrinsic
    // - Sign with `account.signer` or account.sign
    // - Submit the extrinsic via sdk.api.tx.someModule.someCall(...)

    // Example (pseudocode):
    // const tx = sdk.api.tx.uniques.createCollection(...)
    // const signed = await account.sign(tx);
    // const hash = await tx.signAndSend(account);

    // For now, return a stubbed response describing the steps.
    res.json({
      status: 'scaffold',
      message: 'Prepared mint flow. Implement the actual extrinsic and signing using the Unique SDK API.',
      data: { metadataCid, name }
    });
  } catch (err: any) {
    res.status(500).json({ error: err?.message ?? String(err) });
  }
});

app.listen(PORT, () => {
  console.log(`TurtleChain (TS scaffold) backend listening on http://localhost:${PORT}`);
});
