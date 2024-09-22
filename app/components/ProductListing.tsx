"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  priceRM: number | null;
  priceMANTA: number | null;
  image: string;
  seller: string;
  isVerified: boolean;
}

const dummyProducts: Product[] = [
  {
    id: 1,
    name: "Vintage Watch",
    priceRM: 150,
    priceMANTA: 1500,
    image: "/placeholder.svg",
    seller: "0x1234...5678",
    isVerified: true,
  },
  {
    id: 2,
    name: "Antique Vase",
    priceRM: 300,
    priceMANTA: null,
    image: "/placeholder.svg",
    seller: "0x8765...4321",
    isVerified: false,
  },
  {
    id: 3,
    name: "Rare Coin",
    priceRM: null,
    priceMANTA: 5000,
    image: "/placeholder.svg",
    seller: "0x2468...1357",
    isVerified: true,
  },
  {
    id: 4,
    name: "Art Print",
    priceRM: 75,
    priceMANTA: 750,
    image: "/placeholder.svg",
    seller: "0x1357...2468",
    isVerified: false,
  },
  {
    id: 5,
    name: "Collectible Figurine",
    priceRM: 200,
    priceMANTA: 2000,
    image: "/placeholder.svg",
    seller: "0x3691...2580",
    isVerified: true,
  },
  {
    id: 6,
    name: "Vintage Camera",
    priceRM: 250,
    priceMANTA: 2500,
    image: "/placeholder.svg",
    seller: "0x1470...2580",
    isVerified: false,
  },
];

export default function ProductListing() {
  const [products] = useState<Product[]>(dummyProducts);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <motion.div
          key={product.id}
          className="bg-purple-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
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
            {product.priceRM !== null && (
              <p className="text-purple-300 mb-1">
                Price: RM {product.priceRM.toFixed(2)}
              </p>
            )}
            {product.priceMANTA !== null && (
              <p className="text-purple-300 mb-2">
                Price: {product.priceMANTA.toFixed(2)} MANTA
              </p>
            )}
            <p className="text-purple-400 text-sm mb-4">
              Seller: {product.seller}
            </p>
            {product.isVerified && (
              <p className="text-green-400 text-sm mb-4">Verified Product</p>
            )}
            <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
              Buy Now
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
