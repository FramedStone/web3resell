"use client";

import { useState } from "react";
import { Wallet, ChevronDown, Coins, Package, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ConnectWalletButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const connectWallet = () => {
    // Simulating wallet connection
    setIsConnected(true);
  };

  const disconnectWallet = () => {
    // Simulating wallet disconnection
    setIsConnected(false);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center items-center w-full rounded-md border border-transparent px-4 py-2 bg-purple-600 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:text-sm"
          id="connect-wallet-button"
          aria-haspopup="true"
          aria-expanded={isOpen}
          onClick={isConnected ? toggleDropdown : connectWallet}
        >
          {isConnected ? (
            <>
              <Wallet className="mr-2 h-5 w-5" aria-hidden="true" />
              <span className="hidden sm:inline">0x1234...5678</span>
              <span className="sm:hidden">Wallet</span>
              <ChevronDown className="ml-2 h-5 w-5" aria-hidden="true" />
            </>
          ) : (
            <>
              <Wallet className="mr-2 h-5 w-5" aria-hidden="true" />
              <span>Connect Wallet</span>
            </>
          )}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="connect-wallet-button"
          >
            <div className="py-1" role="none">
              <a
                href="#"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                <Coins
                  className="mr-3 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                CT Tokens
              </a>
              <a
                href="#"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                <Package
                  className="mr-3 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                Products (Seller)
              </a>
            </div>
            <div className="py-1" role="none">
              <button
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={disconnectWallet}
              >
                <LogOut
                  className="mr-3 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                Disconnect Wallet
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
