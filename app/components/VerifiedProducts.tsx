"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
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
];

export default function VerifiedProducts() {
  const calculateCtPrice = (priceRM: number) => {
    return priceRM / CT_EXCHANGE_RATE;
  };

  return (
    <div className="bg-purple-900 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-8 text-center">
          Verified Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyVerifiedProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-black text-white overflow-hidden relative">
                <CardContent className="p-0">
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
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      {product.name}
                    </h3>
                    <div className="space-y-1 mb-4">
                      <p className="text-2xl font-bold">
                        RM {product.priceRM.toFixed(2)}
                      </p>
                      <p className="text-lg text-purple-300">
                        {calculateCtPrice(product.priceRM).toFixed(2)} CT
                      </p>
                    </div>
                    <Button className="w-full bg-purple-500 hover:bg-purple-600">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
