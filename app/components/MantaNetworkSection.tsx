"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Eye, Zap } from "lucide-react";
import Image from "next/image";

export default function MantaNetworkSection() {
  return (
    <motion.section
      className="container mx-auto px-4 py-20 bg-white/5 backdrop-blur-lg rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl lg:text-3xl font-bold mb-8 text-center">
        Powered by Manta Network
      </h2>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        <div className="lg:w-1/2">
          <Image
            src="https://manta.network/assets/img/logo.svg"
            alt="Manta Network"
            className="mx-auto"
            height={300}
            width={300}
          />
        </div>
        <div className="lg:w-1/2 space-y-4">
          <h3 className="text-xl lg:text-2xl font-semibold">
            Layer 2 Blockchain Solution
          </h3>
          <p className="text-gray-300">
            web3resell leverages Manta Network&rsquo;s cutting-edge technology
            to provide:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>High-performance layer 2 blockchain architecture</li>
            <li>Zero-knowledge proofs for enhanced privacy</li>
            <li>Scalability through ZK-rollups</li>
            <li>Interoperability with Ethereum and other chains</li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button className="flex-1 bg-white text-purple-700 hover:bg-gray-200">
              <Eye className="mr-2 h-4 w-4" /> Manta Pacific Testnet
            </Button>
            <Button className="flex-1 bg-white text-purple-700 hover:bg-gray-200">
              <Zap className="mr-2 h-4 w-4" /> Manta Atlantic Mainnet
            </Button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
