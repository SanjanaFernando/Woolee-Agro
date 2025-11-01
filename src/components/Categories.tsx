import { Link } from "react-router-dom";
import { categories } from "@/data/products";
import { ChevronRight } from "lucide-react";

const Categories = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Shop by Category
            </h2>
            <p className="text-gray-500">
              Discover our wide range of product categories
            </p>
          </div>
          <Link
            to="/categories"
            className="flex items-center text-green-default font-semibold hover:underline"
          >
            View All Categories <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.name.toLowerCase()}`}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] transition-transform hover:scale-[1.01] duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-green-dark/80 to-transparent transition-opacity group-hover:opacity-90"></div>
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                <p className="text-white/80 text-sm">
                  {category.count} Products
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
