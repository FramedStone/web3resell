"use client";

import { useState, useEffect } from "react";
import ProductListing from "../components/ProductListing";
import Header from "../components/Header";
import VerifiedProducts from "../components/VerifiedProducts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Product, dummyProducts } from "../components/ProductListing";

type FilterOption = "all" | "verified" | "non-verified";

export default function Marketplace() {
  const [filter, setFilter] = useState<FilterOption>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(dummyProducts);

  useEffect(() => {
    const filtered = dummyProducts.filter((product) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "verified" && product.isVerified) ||
        (filter === "non-verified" && !product.isVerified);

      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.priceRM.toString().includes(searchQuery);

      return matchesFilter && matchesSearch;
    });
    setFilteredProducts(filtered);
  }, [filter, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24">
        <VerifiedProducts />
        <div className="mt-16">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
            <h2 className="text-3xl font-bold text-white">All Products</h2>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 bg-purple-700 text-white border-purple-600 placeholder-purple-400"
              />
              <Select onValueChange={(value: FilterOption) => setFilter(value)}>
                <SelectTrigger className="w-full md:w-[180px] bg-purple-700 text-white border-purple-600">
                  <SelectValue placeholder="Filter products" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  <SelectItem value="verified">Verified Only</SelectItem>
                  <SelectItem value="non-verified">
                    Non-Verified Only
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <ProductListing products={filteredProducts} />
        </div>
      </main>
    </div>
  );
}
