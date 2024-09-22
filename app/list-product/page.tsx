import ListProductForm from "../components/ListProductForm";
import Header from "../components/Header";

export default function ListProductPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24">
        <h1 className="text-4xl font-bold mb-8 text-white">List a Product</h1>
        <ListProductForm />
      </main>
    </div>
  );
}
