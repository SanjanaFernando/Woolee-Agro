import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import {
  ChevronDown,
  ChevronUp,
  Filter,
  Grid3X3,
  GridIcon,
  Search,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Define price range type
interface PriceRange {
  min: number;
  max: number | null;
  label: string;
}

const Shop = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [gridView, setGridView] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter options
  const priceRanges: PriceRange[] = [
    { min: 0, max: 50, label: "Under $50" },
    { min: 50, max: 100, label: "$50 - $100" },
    { min: 100, max: 500, label: "$100 - $500" },
    { min: 500, max: null, label: "$500+" },
  ];

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "newest", label: "Newest" },
    { value: "rating", label: "Top Rated" },
  ];

  // Filtering and sorting logic
  const filterProducts = () => {
    let filtered = [...products];

    // Apply search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Apply price range filter
    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter((product) => {
        return selectedPriceRanges.some((range) => {
          const { min, max } = priceRanges.find((r) => r.label === range) || {
            min: 0,
            max: null,
          };
          if (max === null) {
            return product.price >= min;
          }
          return product.price >= min && product.price <= max;
        });
      });
    }

    // Apply rating filter
    if (selectedRatings.length > 0) {
      filtered = filtered.filter((product) =>
        selectedRatings.some((rating) => Math.floor(product.rating) === rating)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-high":
        return filtered.sort((a, b) => b.price - a.price);
      case "newest":
        // Assuming id is a rough proxy for newness in this mock data
        return filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
      case "rating":
        return filtered.sort((a, b) => b.rating - a.rating);
      default: // "featured"
        return filtered;
    }
  };

  const filteredProducts = filterProducts();

  // Pagination logic
  const productsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Handle category toggle
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Handle price range toggle
  const togglePriceRange = (range: string) => {
    if (selectedPriceRanges.includes(range)) {
      setSelectedPriceRanges(selectedPriceRanges.filter((r) => r !== range));
    } else {
      setSelectedPriceRanges([...selectedPriceRanges, range]);
    }
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Handle rating toggle
  const toggleRating = (rating: number) => {
    if (selectedRatings.includes(rating)) {
      setSelectedRatings(selectedRatings.filter((r) => r !== rating));
    } else {
      setSelectedRatings([...selectedRatings, rating]);
    }
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    setSelectedRatings([]);
    setSortBy("featured");
    setCurrentPage(1);
  };

  // Filter section component for mobile and desktop (price-range only)
  const FiltersSection = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range, index) => (
            <div key={index} className="flex items-center">
              <Checkbox
                id={`price-${index}`}
                checked={selectedPriceRanges.includes(range.label)}
                onCheckedChange={() => togglePriceRange(range.label)}
              />
              <label
                htmlFor={`price-${index}`}
                className="ml-2 text-sm cursor-pointer"
              >
                {range.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <Button variant="outline" className="w-full" onClick={clearFilters}>
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-green-gradient text-white py-12 md:py-16">
          <div className="container-custom">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Shop Our Products
              </h1>
              <p className="text-lg opacity-90">
                Discover our wide range of high-quality electronic products
                designed to enhance your lifestyle.
              </p>
              <div className="flex items-center gap-2 mt-6 text-sm">
                <Link to="/" className="hover:underline">
                  Home
                </Link>
                <span>/</span>
                <span>Shop</span>
              </div>
            </div>
          </div>
        </section>

        {/* Shop Content */}
        <section className="py-12">
          <div className="container-custom">
            <div className="flex flex-col lg:flex-row gap-8">
              Filters - Desktop
              <div className="w-full lg:w-1/4 hidden lg:block">
                <div className="bg-white rounded-xl p-6 border border-gray-100 sticky top-24">
                  <h2 className="text-xl font-bold mb-6">Filters</h2>
                  <FiltersSection />
                </div>
              </div>
              {/* Products */}
              <div className="w-full lg:w-3/4">
                {/* Mobile Filter Button & Sort Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <Button
                    variant="outline"
                    className="lg:hidden flex items-center gap-2"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter size={18} />
                    Filters
                  </Button>

                  <div className="ml-auto flex items-center gap-4">
                    {/* Results count */}
                    <p className="text-sm text-gray-500 hidden sm:block">
                      Showing {currentProducts.length} of{" "}
                      {filteredProducts.length} products
                    </p>

                    {/* Sort dropdown */}
                    <div className="relative inline-block">
                      <select
                        className="bg-white border border-gray-200 rounded-md py-2 pl-4 pr-8 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-green-light"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        {sortOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                        size={16}
                      />
                    </div>

                    {/* Grid/List view toggle */}
                    <div className="flex items-center border border-gray-200 rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`rounded-none ${
                          gridView ? "bg-gray-100" : "bg-white"
                        }`}
                        onClick={() => setGridView(true)}
                      >
                        <GridIcon size={18} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`rounded-none ${
                          !gridView ? "bg-gray-100" : "bg-white"
                        }`}
                        onClick={() => setGridView(false)}
                      >
                        <Grid3X3 size={18} />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Active filters */}
                {(selectedCategories.length > 0 ||
                  selectedPriceRanges.length > 0 ||
                  selectedRatings.length > 0 ||
                  searchQuery) && (
                  <div className="mb-6 flex flex-wrap gap-2 items-center">
                    <span className="text-sm font-medium">Active filters:</span>

                    {searchQuery && (
                      <span className="bg-green-light/20 text-green-dark text-xs py-1 px-2 rounded-full flex items-center">
                        "Search: {searchQuery}"
                        <button onClick={() => setSearchQuery("")}>
                          <X size={12} className="ml-1" />
                        </button>
                      </span>
                    )}

                    {selectedCategories.map((category) => (
                      <span
                        key={`cat-${category}`}
                        className="bg-green-light/20 text-green-dark text-xs py-1 px-2 rounded-full flex items-center"
                      >
                        {category}
                        <button onClick={() => toggleCategory(category)}>
                          <X size={12} className="ml-1" />
                        </button>
                      </span>
                    ))}

                    {selectedPriceRanges.map((range) => (
                      <span
                        key={`price-${range}`}
                        className="bg-green-light/20 text-green-dark text-xs py-1 px-2 rounded-full flex items-center"
                      >
                        {range}
                        <button onClick={() => togglePriceRange(range)}>
                          <X size={12} className="ml-1" />
                        </button>
                      </span>
                    ))}

                    {selectedRatings.map((rating) => (
                      <span
                        key={`rating-${rating}`}
                        className="bg-green-light/20 text-green-dark text-xs py-1 px-2 rounded-full flex items-center"
                      >
                        {rating}+ Stars
                        <button onClick={() => toggleRating(rating)}>
                          <X size={12} className="ml-1" />
                        </button>
                      </span>
                    ))}

                    <Button
                      variant="ghost"
                      className="text-xs h-auto py-1"
                      onClick={clearFilters}
                    >
                      Clear all
                    </Button>
                  </div>
                )}

                {/* No results message */}
                {currentProducts.length === 0 && (
                  <div className="text-center py-16 bg-gray-50 rounded-xl">
                    <SlidersHorizontal
                      size={48}
                      className="mx-auto mb-4 text-gray-400"
                    />
                    <h3 className="text-xl font-semibold mb-2">
                      No products found
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Try adjusting your filters or search criteria.
                    </p>
                    <Button onClick={clearFilters}>Clear all filters</Button>
                  </div>
                )}

                {/* Product Grid or List */}
                {currentProducts.length > 0 && (
                  <div
                    className={
                      gridView
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        : "flex flex-col gap-6"
                    }
                  >
                    {currentProducts.map((product) => (
                      <div key={product.id}>
                        {gridView ? (
                          // Grid View
                          <ProductCard product={product} />
                        ) : (
                          // List View
                          <div className="flex flex-col md:flex-row bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                            <div className="md:w-1/3 aspect-square">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-6 flex flex-col justify-between flex-1">
                              <div>
                                <div className="flex items-center mb-2">
                                  <div className="flex items-center">
                                    {Array(5)
                                      .fill(0)
                                      .map((_, i) => (
                                        <Star
                                          key={i}
                                          size={14}
                                          className={
                                            i < Math.round(product.rating)
                                              ? "fill-yellow-400 text-yellow-400"
                                              : "text-gray-300"
                                          }
                                        />
                                      ))}
                                  </div>
                                  <span className="text-xs text-gray-500 ml-1">
                                    ({product.rating})
                                  </span>
                                </div>

                                <h3 className="font-semibold text-lg text-green-dark mb-2">
                                  {product.name}
                                </h3>

                                <p className="text-gray-500 mb-4">
                                  {product.description}
                                </p>

                                <div className="flex items-center text-sm text-gray-500 mb-4">
                                  <span className="bg-green-light/10 text-green-dark rounded-full px-3 py-1">
                                    {product.category}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-baseline justify-between">
                                <div>
                                  <span className="font-bold text-lg">
                                    ${product.price.toFixed(2)}
                                  </span>
                                  {product.originalPrice && (
                                    <span className="ml-2 text-sm text-gray-400 line-through">
                                      ${product.originalPrice.toFixed(2)}
                                    </span>
                                  )}
                                </div>

                                <Button className="btn-gradient">
                                  Add to Cart
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {filteredProducts.length > productsPerPage && (
                  <div className="mt-12">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() =>
                              setCurrentPage((p) => Math.max(1, p - 1))
                            }
                            className={
                              currentPage === 1
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                            }
                          />
                        </PaginationItem>

                        {Array.from({ length: totalPages }).map((_, i) => (
                          <PaginationItem key={i}>
                            <PaginationLink
                              onClick={() => setCurrentPage(i + 1)}
                              isActive={currentPage === i + 1}
                            >
                              {i + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() =>
                              setCurrentPage((p) => Math.min(totalPages, p + 1))
                            }
                            className={
                              currentPage === totalPages
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Mobile Filter Drawer */}
      <div
        className={`
        fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300
        ${showFilters ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
      >
        <div
          className={`
          absolute inset-y-0 left-0 w-[80%] max-w-sm bg-white transform transition-transform duration-300 ease-in-out overflow-auto
          ${showFilters ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          <div className="p-4 border-b sticky top-0 bg-white z-10 flex justify-between items-center">
            <h2 className="text-xl font-bold">Filters</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowFilters(false)}
            >
              <X size={20} />
            </Button>
          </div>

          <div className="p-6">
            <FiltersSection />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
