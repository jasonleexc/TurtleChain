import { useEffect, useState } from 'react';

export default function Home() {
  const [chain, setChain] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    async function fetchInfo() {
      try {
        const c = await fetch('http://localhost:4000/chain').then(r => r.json());
        setChain(c);
      } catch (e) {
        setChain({ error: e.message });
      }
      try {
        const a = await fetch('http://localhost:4000/account').then(r => r.json());
        setAccount(a);
      } catch (e) {
        setAccount({ error: e.message });
      }
    }
    fetchInfo();
  }, []);

  return (
    <main style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1>TurtleChain — Web dApp skeleton</h1>
      <section>
        <h2>Chain</h2>
        <pre>{JSON.stringify(chain, null, 2)}</pre>
      </section>
      <section>
        <h2>Account</h2>
        <pre>{JSON.stringify(account, null, 2)}</pre>
      </section>
      <p>
        This page calls the backend at <code>http://localhost:4000</code>. Start the backend first.
      </p>
    </main>
  );
}
