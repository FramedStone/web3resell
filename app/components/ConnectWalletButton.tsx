"use client";

import { Button } from "@/components/ui/button";
import { Wallet, ChevronDown, Plus, DollarSign } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

const providerOptions = {
  // modify with custom SDK (coinbase, bitget...) if needed
};

export default function ConnectWalletButton() {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
    setIsDropdownOpen(false);
  }

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function handleListProduct() {
    // Implement logic to list a product
    console.log("Listing a product...");
    setIsDropdownOpen(false);
  }

  function handleTopUpTokens() {
    // Implement logic to top up tokens
    console.log("Topping up tokens...");
    setIsDropdownOpen(false);
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        className={`w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 ease-in-out ${
          walletAddress ? "text-xs sm:text-sm" : "text-sm sm:text-base"
        }`}
        onClick={walletAddress ? toggleDropdown : handleConnect}
      >
        <Wallet className="mr-2 h-4 w-4" />
        <span className="truncate max-w-[120px] sm:max-w-[200px]">
          {walletAddress
            ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
            : "Connect Wallet"}
        </span>
        {walletAddress && (
          <ChevronDown
            className={`ml-2 h-4 w-4 transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </Button>
      {isDropdownOpen && walletAddress && (
        <div className="absolute right-0 mt-2 w-48 bg-purple-800 rounded-md overflow-hidden shadow-xl z-10">
          <button
            onClick={handleListProduct}
            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-purple-700 transition-colors duration-200"
          >
            <Plus className="inline-block mr-2" size={16} />
            List a Product
          </button>
          <button
            onClick={handleTopUpTokens}
            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-purple-700 transition-colors duration-200"
          >
            <DollarSign className="inline-block mr-2" size={16} />
            Top Up Tokens
          </button>
          <button
            onClick={handleDisconnect}
            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-purple-700 transition-colors duration-200"
          >
            <Wallet className="inline-block mr-2" size={16} />
            Disconnect Wallet
          </button>
        </div>
      )}
    </div>
  );
}
