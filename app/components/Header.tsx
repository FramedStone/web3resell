'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ConnectWalletButton from './ConnectWalletButton'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/80 backdrop-blur-sm' : 'bg-transparent'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold">web3resell</div>
        <nav className="space-x-4">
          <a href="#" className="hover:text-purple-300 transition-colors">Home</a>
          <a href="#" className="hover:text-purple-300 transition-colors">Marketplace</a>
          <a href="#" className="hover:text-purple-300 transition-colors">About</a>
          <a href="#" className="hover:text-purple-300 transition-colors">Contact</a>
        </nav>
        <ConnectWalletButton />
      </div>
    </motion.header>
  )
}