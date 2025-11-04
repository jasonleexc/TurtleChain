import { create, IPFSHTTPClient } from 'ipfs-http-client';

let client: IPFSHTTPClient | null = null;

export function createIpfsClient(url?: string) {
  if (client) return client;
  const endpoint = url || process.env.IPFS_API_URL || 'https://ipfs.infura.io:5001';
  client = create({ url: endpoint });
  return client;
}

export async function uploadBuffer(buffer: Uint8Array | Buffer, fileName?: string) {
  const ipfs = createIpfsClient();
  const { cid } = await ipfs.add({ content: buffer, path: fileName });
  return cid.toString();
}

export async function fetchByCid(cid: string) {
  const ipfs = createIpfsClient();
  const stream = ipfs.cat(cid);
  const chunks: Uint8Array[] = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks.map((c) => Buffer.from(c)));
}

export default { createIpfsClient, uploadBuffer, fetchByCid };
