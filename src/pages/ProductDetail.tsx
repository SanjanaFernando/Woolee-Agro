import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import ProductCard from "@/components/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Check,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  Share2,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  // Find the product by ID
  const product = products.find((p) => p.id === id) || products[0]; // Fallback to first product if not found

  // State management
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Product specifications
  const specifications = [
    { name: "Brand", value: "Purplify" },
    { name: "Model", value: `P-${product.id}5000` },
    { name: "Connectivity", value: "Wireless" },
    { name: "Battery Life", value: "Up to 24 hours" },
    { name: "Warranty", value: "2 years" },
    { name: "Dimensions", value: "8.5 x 6.3 x 3.2 inches" },
    { name: "Weight", value: "0.95 lbs" },
    { name: "Color Options", value: "Black, Silver, Rose Gold" },
  ];

  // Mock reviews
  const reviews = [
    {
      id: 1,
      author: "Sarah Johnson",
      rating: 5,
      date: "August 12, 2023",
      content:
        "This product exceeded my expectations! The sound quality is crystal clear and the battery lasts forever. I've been using it daily for over a month and I'm still impressed with its performance.",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3087&auto=format",
    },
    {
      id: 2,
      author: "Michael Chang",
      rating: 4,
      date: "July 28, 2023",
      content:
        "Great product for the price. The build quality is excellent and it works as advertised. The only minor issue is that it takes a bit longer to charge than I expected, but overall I'm very satisfied.",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=3087&auto=format",
    },
    {
      id: 3,
      author: "Emma Wilson",
      rating: 5,
      date: "June 15, 2023",
      content:
        "I've tried many similar products and this one is by far the best. The features are intuitive and it pairs easily with all my devices. Highly recommend!",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=3061&auto=format",
    },
  ];

  // Similar products - filter products from the same category, excluding current product
  const similarProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Increment quantity
  const incrementQuantity = () => {
    setQuantity((q) => q + 1);
  };

  // Decrement quantity
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  // Add to cart
  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} has been added to your cart`,
    });
  };

  // Add to wishlist
  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-white pt-8 pb-4 border-b">
          <div className="container-custom">
            <div className="flex items-center gap-2 text-sm">
              <Link
                to="/"
                className="text-gray-500 hover:text-green-default transition-colors"
              >
                Home
              </Link>
              <ChevronRight size={14} className="text-gray-300" />
              <Link
                to="/shop"
                className="text-gray-500 hover:text-green-default transition-colors"
              >
                Shop
              </Link>
              <ChevronRight size={14} className="text-gray-300" />
              <Link
                to={`/category/${product.category.toLowerCase()}`}
                className="text-gray-500 hover:text-green-default transition-colors"
              >
                {product.category}
              </Link>
              <ChevronRight size={14} className="text-gray-300" />
              <span className="text-gray-600 font-medium">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Detail */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-10">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="aspect-[4/3] overflow-hidden rounded-xl border border-gray-100">
                  <img
                    src={product.images[selectedImage]}
                    alt={`${product.name} - view ${selectedImage + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <div
                      key={index}
                      className={`aspect-square cursor-pointer border rounded-md overflow-hidden transition-all ${
                        selectedImage === index
                          ? "ring-2 ring-green-default"
                          : "opacity-70 hover:opacity-100"
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div>
                {product.badge && (
                  <span
                    className={`
                    inline-block px-3 py-1 rounded-full text-xs font-medium text-white mb-4
                    ${
                      product.badge === "Sale"
                        ? "bg-red-500"
                        : "bg-green-gradient"
                    }
                  `}
                  >
                    {product.badge}
                  </span>
                )}

                <h1 className="text-3xl md:text-4xl font-bold text-green-dark mb-4">
                  {product.name}
                </h1>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={
                            i < Math.round(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                  </div>
                  <span className="text-gray-500">
                    ({product.rating}) · {reviews.length} reviews
                  </span>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-3xl font-bold">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xl text-gray-400 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                    {product.originalPrice && (
                      <span className="bg-red-100 text-red-700 text-sm px-2 py-1 rounded">
                        Save $
                        {(product.originalPrice - product.price).toFixed(2)}
                      </span>
                    )}
                  </div>
                  <p className="text-green-600 flex items-center">
                    <Check size={16} className="mr-1" />
                    In Stock
                  </p>
                </div>

                <div className="mb-6">
                  <p className="text-gray-600">{product.description}</p>
                </div>

                {/* Quantity Selector */}
                <div className="mb-8">
                  <p className="font-medium mb-2">Quantity</p>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus size={16} />
                    </Button>
                    <span className="w-16 text-center font-medium">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={incrementQuantity}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button
                    className="btn-gradient flex-1 gap-2"
                    onClick={handleAddToCart}
                    size="lg"
                  >
                    <ShoppingBag size={18} />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-green-light hover:bg-green-light/10"
                    onClick={handleAddToWishlist}
                  >
                    <Heart size={18} />
                    <span className="ml-2 hidden sm:inline-block">
                      Add to Wishlist
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-green-light hover:bg-green-light/10"
                  >
                    <Share2 size={18} />
                  </Button>
                </div>

                {/* Delivery Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex gap-4 mb-2">
                    <Truck className="text-green-default" size={20} />
                    <div>
                      <p className="font-medium text-green-dark">
                        Fast Delivery
                      </p>
                      <p className="text-sm text-gray-600">
                        Free shipping on orders over $50
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 pl-9">
                    Estimated delivery: 2-4 business days
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Tabs */}
        <section className="py-8 bg-white border-t border-b">
          <div className="container-custom">
            <Tabs defaultValue="description">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">
                  Reviews ({reviews.length})
                </TabsTrigger>
              </TabsList>

              {/* Description Tab */}
              <TabsContent value="description" className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Product Description</h2>
                <p className="text-gray-600">
                  Experience unparalleled quality with the {product.name}.
                  Designed with the latest technology and premium materials,
                  this product delivers exceptional performance and reliability
                  for all your needs.
                </p>
                <p className="text-gray-600">
                  The {product.name} features advanced noise-cancellation
                  technology, immersive sound quality, and extended battery
                  life. Its ergonomic design ensures comfort during extended
                  use, while its durable construction guarantees longevity.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-4">Key Features</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check
                          className="text-green-600 mr-2 mt-0.5"
                          size={18}
                        />
                        <span>
                          Premium build quality with durable materials
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check
                          className="text-green-600 mr-2 mt-0.5"
                          size={18}
                        />
                        <span>Advanced noise cancellation technology</span>
                      </li>
                      <li className="flex items-start">
                        <Check
                          className="text-green-600 mr-2 mt-0.5"
                          size={18}
                        />
                        <span>Bluetooth 5.0 for seamless connectivity</span>
                      </li>
                      <li className="flex items-start">
                        <Check
                          className="text-green-600 mr-2 mt-0.5"
                          size={18}
                        />
                        <span>
                          Up to 24 hours of battery life on a single charge
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check
                          className="text-green-600 mr-2 mt-0.5"
                          size={18}
                        />
                        <span>Compatible with voice assistants</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-4">
                      What's in the Box
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check
                          className="text-green-600 mr-2 mt-0.5"
                          size={18}
                        />
                        <span>{product.name}</span>
                      </li>
                      <li className="flex items-start">
                        <Check
                          className="text-green-600 mr-2 mt-0.5"
                          size={18}
                        />
                        <span>USB-C charging cable</span>
                      </li>
                      <li className="flex items-start">
                        <Check
                          className="text-green-600 mr-2 mt-0.5"
                          size={18}
                        />
                        <span>User manual</span>
                      </li>
                      <li className="flex items-start">
                        <Check
                          className="text-green-600 mr-2 mt-0.5"
                          size={18}
                        />
                        <span>Carrying case</span>
                      </li>
                      <li className="flex items-start">
                        <Check
                          className="text-green-600 mr-2 mt-0.5"
                          size={18}
                        />
                        <span>2-year warranty card</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              {/* Specifications Tab */}
              <TabsContent value="specifications">
                <h2 className="text-2xl font-bold mb-6">
                  Technical Specifications
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <tbody>
                      {specifications.map((spec, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          }
                        >
                          <td className="py-3 px-4 font-medium">{spec.name}</td>
                          <td className="py-3 px-4 text-gray-600">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-lg mb-4">
                    System Requirements
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Compatible with iOS 10.0 or later, Android 5.0 or later, and
                    most devices with Bluetooth capability.
                  </p>
                  <h3 className="font-bold text-lg mb-4 mt-6">
                    Warranty Information
                  </h3>
                  <p className="text-gray-600">
                    This product comes with a 2-year limited manufacturer's
                    warranty covering defects in materials and workmanship under
                    normal use. Please register your product on our website
                    within 30 days of purchase to activate your warranty.
                  </p>
                </div>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <h2 className="text-2xl font-bold mb-4">
                      Customer Reviews
                    </h2>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-3xl font-bold">
                          {product.rating.toFixed(1)}
                        </span>
                        <div>
                          <div className="flex">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  size={18}
                                  className={
                                    i < Math.round(product.rating)
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }
                                />
                              ))}
                          </div>
                          <p className="text-sm text-gray-500">
                            Based on {reviews.length} reviews
                          </p>
                        </div>
                      </div>

                      {/* Rating breakdown */}
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((star) => {
                          const count = reviews.filter(
                            (r) => Math.round(r.rating) === star
                          ).length;
                          const percentage =
                            reviews.length > 0
                              ? (count / reviews.length) * 100
                              : 0;

                          return (
                            <div key={star} className="flex items-center">
                              <span className="text-sm w-6">{star}</span>
                              <Star
                                size={14}
                                className="fill-yellow-400 text-yellow-400 mr-2"
                              />
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-yellow-400 h-2 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-500 ml-2 w-8">
                                {count}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      <Button className="btn-gradient w-full mt-6">
                        Write a Review
                      </Button>
                    </div>
                  </div>

                  <div className="md:w-2/3">
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div
                          key={review.id}
                          className="border-b pb-6 last:border-b-0"
                        >
                          <div className="flex items-start gap-4">
                            <img
                              src={review.avatar}
                              alt={review.author}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <p className="font-medium">{review.author}</p>
                              <div className="flex items-center gap-2">
                                <div className="flex">
                                  {Array(5)
                                    .fill(0)
                                    .map((_, i) => (
                                      <Star
                                        key={i}
                                        size={14}
                                        className={
                                          i < review.rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-300"
                                        }
                                      />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-500">
                                  {review.date}
                                </span>
                              </div>
                              <p className="mt-2 text-gray-600">
                                {review.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Similar Products Section - Enhanced with carousel for better display */}
        <section className="py-16">
          <div className="container-custom">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
              <h2 className="text-2xl font-bold">Similar Products</h2>
              <Link
                to="/shop"
                className="flex items-center text-green-default font-semibold hover:underline"
              >
                View All <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
