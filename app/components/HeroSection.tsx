"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.section
      className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-16"
      style={{ opacity }}
    >
      <motion.h1
        className="text-4xl lg:text-5xl font-bold mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        The Future of Decentralized Commerce is Here
      </motion.h1>
      <motion.p
        className="text-lg lg:text-xl mb-8 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Buy and sell products securely on web3resell, powered by Manta Network's
        layer 2 blockchain
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Button className="bg-purple-600 hover:bg-purple-700">
          Explore Marketplace <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
      <motion.div
        className="absolute bottom-8"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-8 w-8" />
      </motion.div>
    </motion.section>
  );
}
