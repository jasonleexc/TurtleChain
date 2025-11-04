# TurtleChain

# Marine-Chain  
&gt; Non-invasive blockchain identity for endangered marine life

---

## 📌 Project Overview & Objectives

### Problem
- Conservation data is fragmented across NGOs, governments and researchers  
- Physical tags are invasive, expensive and frequently lost  
- No universal, tamper-proof registry for living marine animals exists  

### Objective
Create a **global, trust-less, photo-based identity ledger** so every sighting of the *same* turtle is immutable without ever touching the animal.

---

## Dependencies & Technologies (edit this accordingly as we go along)

| Layer | Tech |
|-------|------|
| **Frontend** | Next.js, React 18, TypeScript, TailwindCSS, Vite |
| **Blockchain** | Unique Network (NFTs), Polkadot.js API |
| **Inter-chain** | Moonbeam / Astar (ERC-20 via atomic swaps) |
| **Storage** | IPFS (off-line storing of images), on-chain hash for integrity |
| **Off-chain** | Substrate OCW (biometric hash generation) |
| **Dev Tools** | Docker, Docker Compose, Node ≥ 18 |

---

## Setup & Usage

### 1. Prerequisites
- Docker & Docker Compose  
- Node.js 18+  
- Polkadot.js browser extension  

### 2. Clone & Install
```bash
git clone https://github.com/jasonleexc/TurtleChain.git
cd TurtleChain
npm install