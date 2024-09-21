"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConnectWalletButton from "./ConnectWalletButton";
import { Menu, X } from "lucide-react";

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-gray-900/80 backdrop-blur-sm" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">web3resell</div>

            <motion.button
              className="lg:hidden text-white focus:outline-none"
              onClick={toggleMobileMenu}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={mobileMenuOpen ? "open" : "closed"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            <nav className="hidden lg:flex space-x-8 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <a href="#" className="hover:text-purple-300 transition-colors">
                Home
              </a>
              <a href="#" className="hover:text-purple-300 transition-colors">
                Marketplace
              </a>
              <a href="#" className="hover:text-purple-300 transition-colors">
                About
              </a>
              <a href="#" className="hover:text-purple-300 transition-colors">
                Contact
              </a>
            </nav>

            <div className="hidden lg:block">
              <ConnectWalletButton />
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMobileMenu}
          >
            <motion.nav
              className="bg-gray-900 w-full"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="container mx-auto px-4 py-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-2xl font-bold">web3resell</div>
                  <button
                    className="text-white focus:outline-none"
                    onClick={toggleMobileMenu}
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="flex flex-col space-y-4 items-center">
                  <motion.a
                    href="#"
                    className="text-xl hover:text-purple-300 transition-colors"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    Home
                  </motion.a>
                  <motion.a
                    href="#"
                    className="text-xl hover:text-purple-300 transition-colors"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Marketplace
                  </motion.a>
                  <motion.a
                    href="#"
                    className="text-xl hover:text-purple-300 transition-colors"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    About
                  </motion.a>
                  <motion.a
                    href="#"
                    className="text-xl hover:text-purple-300 transition-colors"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Contact
                  </motion.a>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <ConnectWalletButton />
                  </motion.div>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
