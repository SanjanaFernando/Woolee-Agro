import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronRight, Grid3X3, List } from "lucide-react";
import { useState } from "react";

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName?: string }>();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Get the category data
  const category = categoryName
    ? categories.find(
        (c) => c.name.toLowerCase() === categoryName.toLowerCase()
      )
    : null;

  // Get products for the category or all categories if on the categories page
  const filteredProducts = categoryName
    ? products.filter(
        (product) =>
          product.category.toLowerCase() === categoryName.toLowerCase()
      )
    : products;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="bg-green-gradient text-white py-16">
          <div className="container-custom">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {categoryName
                  ? `${category?.name || categoryName}`
                  : "All Categories"}
              </h1>
              <div className="flex items-center text-sm">
                <Link to="/" className="hover:underline">
                  Home
                </Link>
                <ChevronRight size={16} className="mx-2" />
                {!categoryName ? (
                  <span>Categories</span>
                ) : (
                  <>
                    <Link to="/categories" className="hover:underline">
                      Categories
                    </Link>
                    <ChevronRight size={16} className="mx-2" />
                    <span>{category?.name || categoryName}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container-custom">
            {!categoryName && (
              // Categories grid (only shown on /categories)
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6">
                  Browse All Categories
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/category/${category.name.toLowerCase()}`}
                      className="group relative overflow-hidden rounded-xl aspect-[4/3] transition-transform hover:scale-[1.01] duration-300"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-green-dark/80 to-transparent transition-opacity group-hover:opacity-90"></div>
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 p-6 text-white">
                        <h3 className="text-xl font-semibold mb-1">
                          {category.name}
                        </h3>
                        <p className="text-white/80 text-sm">
                          {category.count} Products
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Products Section */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold">
                  {categoryName
                    ? `${category?.name || categoryName} Products`
                    : "Featured Products"}
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">View:</span>
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    className={viewMode === "grid" ? "btn-gradient" : ""}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 size={18} />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    className={viewMode === "list" ? "btn-gradient" : ""}
                    onClick={() => setViewMode("list")}
                  >
                    <List size={18} />
                  </Button>
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                      : "flex flex-col gap-4"
                  }
                >
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className={viewMode === "list" ? "w-full" : ""}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-xl font-medium mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500 mb-6">
                    We couldn't find any products in this category.
                  </p>
                  <Button className="btn-gradient" asChild>
                    <Link to="/shop">Browse All Products</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
