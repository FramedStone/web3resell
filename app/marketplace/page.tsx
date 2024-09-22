import ProductListing from "../components/ProductListing";
import Header from "../components/Header";
import VerifiedProducts from "../components/VerifiedProducts";

export default function Marketplace() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24">
        <VerifiedProducts />
        <div className="mt-16">
          {" "}
          {/* Added gap */}
          <h2 className="text-3xl font-bold text-white mb-8">All Products</h2>
          <ProductListing />
        </div>
      </main>
    </div>
  );
}
