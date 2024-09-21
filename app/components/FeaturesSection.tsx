"use client";

import { motion } from "framer-motion";
import { Wallet, Layers, Shield } from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: <Wallet className="h-12 w-12" />,
    title: "Web3 Native",
    description:
      "Connect your wallet and start buying and selling products instantly",
  },
  {
    icon: <Layers className="h-12 w-12" />,
    title: "Manta Network Powered",
    description: "Enjoy fast and low-cost transactions on a layer 2 blockchain",
  },
  {
    icon: <Shield className="h-12 w-12" />,
    title: "Secure & Private",
    description: "Your transactions are protected with zero-knowledge proofs",
  },
];

export default function FeaturesSection() {
  return (
    <section className="container mx-auto px-4 py-20">
      <motion.h2
        className="text-3xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Why Choose web3resell?
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} index={index} />
        ))}
      </div>
    </section>
  );
}
