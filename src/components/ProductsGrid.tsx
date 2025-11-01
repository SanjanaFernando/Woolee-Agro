import { useState } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const ProductsGrid = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProducts =
    activeFilter === "All"
      ? products
      : products.filter((product) => product.category === activeFilter);

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">
              Best Selling Products
            </h2>
            <p className="text-gray-500">
              Discover our most popular products loved by customers
            </p>
          </div>

          <Link
            to="/shop"
            className="flex items-center text-[#63b516] font-semibold hover:text-[#7ad92b] transition-colors"
          >
            View All Products <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>

        {/* If you enable filters later */}
        {/* <div className="flex flex-wrap items-center gap-2 mb-8 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              className={
                activeFilter === filter
                  ? "bg-[#63b516] hover:bg-[#7ad92b] text-white border-none"
                  : "border-[#63b516] text-[#63b516] hover:bg-[#e8f9d8]"
              }
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsGrid;
