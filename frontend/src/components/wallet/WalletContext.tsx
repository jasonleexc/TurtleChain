"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Polkadot, IPolkadotExtensionAccount, IPolkadotExtensionWalletInfo, } from "@unique-nft/utils/extension";

interface WalletContextType {
  wallets: IPolkadotExtensionWalletInfo[];
  wallet: IPolkadotExtensionWalletInfo | null;
  accounts: IPolkadotExtensionAccount[];
  selectedAccount: IPolkadotExtensionAccount | null;
  isConnecting: boolean;
  connectWallet: (wallet: IPolkadotExtensionWalletInfo) => Promise<void>;
  selectAccount: (account: IPolkadotExtensionAccount) => void;
  disconnectWallet: () => void;
}

// create React context 
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// fetches current wallet context
export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) throw new Error("useWallet must be used within WalletProvider");
  return context;
}

// provider function for wallet context
export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [wallets, setWallets] = useState<IPolkadotExtensionWalletInfo[]>([]);
  const [wallet, setWallet] = useState<IPolkadotExtensionWalletInfo | null>(
    null
  );
  const [accounts, setAccounts] = useState<IPolkadotExtensionAccount[]>([]);
  const [selectedAccount, setSelectedAccount] =
    useState<IPolkadotExtensionAccount | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Load available wallets on mount
  useEffect(() => {
    // get all installed wallet extensions
    Polkadot.listWallets().then((result) => setWallets(result.wallets));
  }, []);

  const connectWallet = useCallback(
    // memoise function across renders
    async (selectedWallet: IPolkadotExtensionWalletInfo) => {
      setIsConnecting(true);
      try {
        // Load wallet with accounts
        // connects to wallet & retrieves accounts with signers ready to use
        const loadedWallet = await Polkadot.loadWalletByName(selectedWallet.name);

        if (!loadedWallet || loadedWallet.accounts.length === 0) {
          throw new Error("No accounts found in wallet");
        }

        setWallet(loadedWallet);
        setAccounts(loadedWallet.accounts);
        setSelectedAccount(loadedWallet.accounts[0]); // Auto-select first account
      } catch (error) {
        console.error("Failed to connect wallet:", error);
        throw error;
      } finally {
        setIsConnecting(false);
      }
    },
    []
  );

  // memoized selectAccount
  const selectAccount = useCallback((account: IPolkadotExtensionAccount) => {
    setSelectedAccount(account);
  }, []);

  // memoized disconnect
  const disconnectWallet = useCallback(() => {
    setWallet(null);
    setAccounts([]);
    setSelectedAccount(null);
  }, []);

  return (
    <WalletContext.Provider
      value={{
        wallets,
        wallet,
        accounts,
        selectedAccount,
        isConnecting,
        connectWallet,
        selectAccount,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );

}

