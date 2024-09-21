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

  return (
    <Button
      className={`w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 ease-in-out ${
        walletAddress ? "text-xs sm:text-sm" : "text-sm sm:text-base"
      }`}
      onClick={walletAddress ? handleDisconnect : handleConnect}
    >
      <Wallet className="mr-2 h-4 w-4" />
      <span className="truncate max-w-[120px] sm:max-w-[200px]">
        {walletAddress ? walletAddress : "Connect Wallet"}
      </span>
    </Button>
  );
}
