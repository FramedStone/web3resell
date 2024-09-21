"use client";

import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

const providerOptions = {
  // modify with custom SDK (coinbase, bitget...) if needed
};

export default function ConnectWalletButton() {
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem("isWalletConnected") === "true") {
        try {
          await handleConnect();
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    connectWalletOnPageLoad();
  }, []);

  async function handleConnect() {
    try {
      const web3modal = new Web3Modal({
        cacheProvider: true,
        providerOptions,
      });

      const web3modal_instance = await web3modal.connect();
      const web3modal_provider = new ethers.BrowserProvider(web3modal_instance);
      const web3modal_signer = await web3modal_provider.getSigner();

      const wallet_address = await web3modal_signer.getAddress();
      setWalletAddress(wallet_address);
      localStorage.setItem("isWalletConnected", "true");
    } catch (error) {
      console.error(error);
      setWalletAddress("");
      localStorage.removeItem("isWalletConnected");
    }
  }

  function handleDisconnect() {
    setWalletAddress("");
    localStorage.removeItem("isWalletConnected");
    const web3modal = new Web3Modal({
      cacheProvider: true,
      providerOptions,
    });
    web3modal.clearCachedProvider();
  }

  return walletAddress ? (
    <Button
      className="bg-purple-600 hover:bg-purple-700"
      onClick={handleDisconnect}
    >
      <Wallet className="mr-2 h-4 w-4" /> {walletAddress}
    </Button>
  ) : (
    <Button
      className="bg-purple-600 hover:bg-purple-700"
      onClick={handleConnect}
    >
      <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
    </Button>
  );
}
