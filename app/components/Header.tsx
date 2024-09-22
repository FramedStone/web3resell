"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ConnectWalletButton from "./ConnectWalletButton";
import ListProductPopup from "./ListProductPopup";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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

  const isMarketplacePage = pathname === "/marketplace";

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-purple-900 shadow-lg" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-2 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-xl sm:text-2xl font-bold text-white whitespace-nowrap"
              >
                web3resell
                {isMarketplacePage && (
                  <span
                    className={`ml-1 sm:ml-2 text-sm sm:text-base text-purple-300 ${
                      mobileMenuOpen ? "hidden sm:inline" : ""
                    }`}
                  >
                    Marketplace
                  </span>
                )}
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
              <Link
                href="/"
                className="text-sm lg:text-base text-white hover:text-purple-300 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/marketplace"
                className="text-sm lg:text-base text-white hover:text-purple-300 transition-colors"
              >
                Marketplace
              </Link>
              <Link
                href="#"
                className="text-sm lg:text-base text-white hover:text-purple-300 transition-colors"
              >
                About
              </Link>
              <Link
                href="#"
                className="text-sm lg:text-base text-white hover:text-purple-300 transition-colors"
              >
                Contact
              </Link>
            </nav>

            <div className="flex items-center space-x-2 sm:space-x-4">
              {isMarketplacePage && (
                <div className="hidden sm:block">
                  <ListProductPopup />
                </div>
              )}
              <div className="hidden sm:block">
                <ConnectWalletButton />
              </div>
              <motion.button
                className="md:hidden text-white focus:outline-none"
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
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-purple-900 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center mb-8">
                <Link
                  href="/"
                  className="text-xl sm:text-2xl font-bold text-white"
                >
                  web3resell
                </Link>
                <button
                  className="text-white focus:outline-none"
                  onClick={toggleMobileMenu}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex flex-col space-y-6 items-center">
                <Link
                  href="/"
                  className="text-lg sm:text-xl text-white hover:text-purple-300 transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/marketplace"
                  className="text-lg sm:text-xl text-white hover:text-purple-300 transition-colors"
                >
                  Marketplace
                </Link>
                <Link
                  href="#"
                  className="text-lg sm:text-xl text-white hover:text-purple-300 transition-colors"
                >
                  About
                </Link>
                <Link
                  href="#"
                  className="text-lg sm:text-xl text-white hover:text-purple-300 transition-colors"
                >
                  Contact
                </Link>
                {isMarketplacePage && <ListProductPopup />}
                <ConnectWalletButton />
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
