"use client";

import { motion } from "framer-motion";
import ConnectWalletButton from "./ConnectWalletButton";

export default function CTASection() {
  return (
    <motion.section
      className="container mx-auto px-4 py-20 text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold mb-6">
        Ready to Join the Decentralized Marketplace?
      </h2>
      <p className="text-xl mb-8">
        Connect your wallet and start buying and selling products on web3resell
      </p>
      <ConnectWalletButton />
      <p className="mt-4 text-sm text-gray-400">
        Supported wallets: MetaMask, WalletConnect, BitgetWallet
      </p>
    </motion.section>
  );
}
