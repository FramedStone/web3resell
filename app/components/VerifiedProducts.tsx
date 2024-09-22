"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";

interface VerifiedProduct {
  id: number;
  name: string;
  priceRM: number;
  image: string;
}

const CT_EXCHANGE_RATE = 0.1; // Assume 1 CT = 0.1 RM

const dummyVerifiedProducts: VerifiedProduct[] = [
  {
    id: 1,
    name: "Authentic Designer Watch",
    priceRM: 1000,
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Certified Antique Vase",
    priceRM: 500,
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Limited Edition Collectible",
    priceRM: 750,
    image: "/placeholder.svg",
  },
  { id: 4, name: "Rare Vintage Coin", priceRM: 300, image: "/placeholder.svg" },
  {
    id: 5,
    name: "Authenticated Artwork",
    priceRM: 1200,
    image: "/placeholder.svg",
  },
  {
    id: 6,
    name: "Verified Sports Memorabilia",
    priceRM: 800,
    image: "/placeholder.svg",
  },
];

export default function VerifiedProducts() {
  const [products, setProducts] = useState<VerifiedProduct[]>(
    dummyVerifiedProducts
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  const calculateCtPrice = (priceRM: number) => {
    return priceRM / CT_EXCHANGE_RATE;
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const totalWidth = scrollContainer.scrollWidth / 2;
    let scrollAmount = 0;
    const scrollSpeed = 0.5; // Adjust this value to change scroll speed

    const scroll = () => {
      scrollAmount += scrollSpeed;
      if (scrollAmount >= totalWidth) {
        scrollAmount = 0;
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft = scrollAmount;
      }
    };

    const intervalId = setInterval(scroll, 20);

    return () => clearInterval(intervalId);
  }, [products]);

  return (
    <div className="bg-purple-900 py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-8 text-center">
          Verified Products
        </h2>
        <div ref={scrollRef} className="flex overflow-x-hidden">
          <div className="flex">
            {[...products, ...products].map((product, index) => (
              <motion.div
                key={`${product.id}-${index}`}
                className="flex-shrink-0 w-64 mx-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="bg-black text-white overflow-hidden h-full">
                  <CardContent className="p-0 h-full flex flex-col">
                    <div className="relative">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                      <div
                        className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full"
                        title="Verified Product"
                      >
                        <Shield size={16} />
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold mb-2">
                        {product.name}
                      </h3>
                      <div className="space-y-1 mt-auto">
                        <p className="text-2xl font-bold">
                          RM {product.priceRM.toFixed(2)}
                        </p>
                        <p className="text-lg text-purple-300">
                          {calculateCtPrice(product.priceRM).toFixed(2)} CT
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
