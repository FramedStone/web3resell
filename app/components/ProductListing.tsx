"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Shield } from "lucide-react";

export interface Product {
  id: number;
  name: string;
  priceRM: number;
  image: string;
  seller: string;
  isVerified: boolean;
}

export const dummyProducts: Product[] = [
  {
    id: 1,
    name: "Vintage Watch",
    priceRM: 150,
    image: "/placeholder.svg",
    seller: "0x1234...5678",
    isVerified: true,
  },
  {
    id: 2,
    name: "Antique Vase",
    priceRM: 300,
    image: "/placeholder.svg",
    seller: "0x8765...4321",
    isVerified: false,
  },
  {
    id: 3,
    name: "Rare Coin",
    priceRM: 500,
    image: "/placeholder.svg",
    seller: "0x2468...1357",
    isVerified: true,
  },
  {
    id: 4,
    name: "Art Print",
    priceRM: 75,
    image: "/placeholder.svg",
    seller: "0x1357...2468",
    isVerified: false,
  },
  {
    id: 5,
    name: "Collectible Figurine",
    priceRM: 200,
    image: "/placeholder.svg",
    seller: "0x3691...2580",
    isVerified: true,
  },
  {
    id: 6,
    name: "Vintage Camera",
    priceRM: 250,
    image: "/placeholder.svg",
    seller: "0x1470...2580",
    isVerified: false,
  },
];

// Assume 1 CT = 0.1 RM for this example
const CT_EXCHANGE_RATE = 0.1;

export default function ProductListing() {
  const [products] = useState<Product[]>(dummyProducts);

  const calculateCtPrice = (priceRM: number) => {
    return priceRM / CT_EXCHANGE_RATE;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <motion.div
          key={product.id}
          className="bg-purple-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {product.isVerified && (
            <div
              className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full z-10"
              title="Verified Product"
            >
              <Shield size={16} />
            </div>
          )}
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={300}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2 text-white">
              {product.name}
            </h2>
            <p className="text-2xl font-bold mb-1 text-white">
              RM {product.priceRM.toFixed(2)}
            </p>
            <p className="text-lg text-purple-300 mb-2">
              {calculateCtPrice(product.priceRM).toFixed(2)} CT
            </p>
            <p className="text-purple-400 text-sm mb-4">
              Seller: {product.seller}
            </p>
            <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
              Buy Now
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
