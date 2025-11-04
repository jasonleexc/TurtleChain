import { create } from 'ipfs-http-client';

// keep this until we completely migrate to ts

let client = null;

export function createIpfsClient(url) {
  if (client) return client;
  const endpoint = url || process.env.IPFS_API_URL || 'https://ipfs.infura.io:5001';
  client = create({ url: endpoint });
  return client;
}

export async function uploadBuffer(buffer, fileName) {
  const ipfs = createIpfsClient();
  const result = await ipfs.add({ content: buffer, path: fileName });
  return result.cid.toString();
}

export async function fetchByCid(cid) {
  const ipfs = createIpfsClient();
  const stream = ipfs.cat(cid);
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks.map((c) => Buffer.from(c)));
}

export default { createIpfsClient, uploadBuffer, fetchByCid };
