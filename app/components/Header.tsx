"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ConnectWalletButton from "./ConnectWalletButton";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-gray-900/80 backdrop-blur-sm" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
        <div className="text-2xl font-bold">web3resell</div>

        <Button
          variant="ghost"
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>

        <nav
          className={`${
            mobileMenuOpen ? "block" : "hidden"
          } w-full lg:w-auto lg:flex lg:items-center lg:space-x-4 mt-4 lg:mt-0`}
        >
          <a
            href="#"
            className="block py-2 lg:inline-block lg:py-0 hover:text-purple-300 transition-colors"
          >
            Home
          </a>
          <a
            href="#"
            className="block py-2 lg:inline-block lg:py-0 hover:text-purple-300 transition-colors"
          >
            Marketplace
          </a>
          <a
            href="#"
            className="block py-2 lg:inline-block lg:py-0 hover:text-purple-300 transition-colors"
          >
            About
          </a>
          <a
            href="#"
            className="block py-2 lg:inline-block lg:py-0 hover:text-purple-300 transition-colors"
          >
            Contact
          </a>
        </nav>

        <div className="w-full lg:w-auto mt-4 lg:mt-0">
          <ConnectWalletButton />
        </div>
      </div>
    </motion.header>
  );
}
