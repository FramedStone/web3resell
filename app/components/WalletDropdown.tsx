"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, ChevronDown, Plus, DollarSign } from "lucide-react";

export default function WalletDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const connectWallet = () => {
    // Implement wallet connection logic here
    setWalletConnected(true);
  };

  const becomeSeller = () => {
    // Implement logic to become a seller
    console.log("Becoming a seller...");
  };

  const listProduct = () => {
    // Implement logic to list a product
    console.log("Listing a product...");
  };

  const topUpTokens = () => {
    // Implement logic to top up tokens
    console.log("Topping up tokens...");
  };

  return (
    <div className="relative">
      <button
        onClick={walletConnected ? toggleDropdown : connectWallet}
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded inline-flex items-center transition-colors duration-200"
      >
        <Wallet className="mr-2" />
        {walletConnected ? (
          <>
            <span className="mr-2">0x1234...5678</span>
            <ChevronDown
              className={`transform transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </>
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && walletConnected && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md overflow-hidden shadow-xl z-10"
          >
            <button
              onClick={becomeSeller}
              className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 transition-colors duration-200"
            >
              <Plus className="inline-block mr-2" size={16} />
              Become a Seller
            </button>
            <button
              onClick={listProduct}
              className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 transition-colors duration-200"
            >
              <Plus className="inline-block mr-2" size={16} />
              List a Product
            </button>
            <button
              onClick={topUpTokens}
              className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 transition-colors duration-200"
            >
              <DollarSign className="inline-block mr-2" size={16} />
              Top Up Tokens
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
