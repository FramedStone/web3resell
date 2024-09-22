import ProductListing from "../components/ProductListing";
import Header from "../components/Header";
import VerifiedProducts from "../components/VerifiedProducts";

export default function Marketplace() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24">
        <VerifiedProducts />
        <ProductListing />
      </main>
    </div>
  );
}
