"use client";

import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

const providerOptions = {
  // modify with custom SDK (coinbase, bitget...) if needed
};

export default function ConnectWalletButton() {
  const [wallet_address, set_walletAddress] = useState<any>(null);

  async function handleConnect() {
    try {
      const web3modal = new Web3Modal({
        cacheProvider: false,
        providerOptions,
      });

      const web3modal_instance = await web3modal.connect();
      const web3modal_provider = new ethers.BrowserProvider(web3modal_instance);
      const web3modal_signer = await web3modal_provider.getSigner();

      const wallet_address = await web3modal_signer.getAddress();
      set_walletAddress(wallet_address);
    } catch (error) {
      console.error(error);
      set_walletAddress(null);
    }
  }

  return (
    <Button
      className="bg-purple-600 hover:bg-purple-700"
      onClick={handleConnect}
    >
      <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
    </Button>
  );
}
