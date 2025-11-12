// for all providers

import { WalletProvider } from "../components/wallet/WalletContext";
import { UniqueSDKProvider } from "../components/wallet/UniqueSDKContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UniqueSDKProvider>
          <WalletProvider>{children}</WalletProvider>
        </UniqueSDKProvider>
      </body>
    </html>
  );
}
