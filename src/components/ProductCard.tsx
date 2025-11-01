import { useState } from "react";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToWishlist(product);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative bg-white rounded-2xl overflow-hidden border border-green-100 transition-all duration-300 hover:shadow-md hover:border-[#63b516]/40 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product badge */}
      {product.badge && (
        <div
          className={`
            absolute top-4 left-4 z-10 px-2 py-1 rounded-md text-xs font-medium text-white
            ${product.badge === "Sale" ? "bg-red-500" : "bg-[#63b516]"}
          `}
        >
          {product.badge}
        </div>
      )}

      {/* Product image */}
      <div className="relative aspect-square overflow-hidden bg-green-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Quick actions */}
        <div
          className={
            `absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 transform translate-y-0 opacity-100 ` +
            (isHovered
              ? "md:translate-y-0 md:opacity-100"
              : "md:translate-y-full md:opacity-0")
          }
        >
          <div className="flex gap-2">
            <Button
              className="flex-1 bg-[#63b516] hover:bg-[#559d14] text-white text-sm py-2 shadow-md transition-transform duration-200 hover:scale-105"
              size="sm"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="mr-2" size={16} />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={`bg-white/90 border ${
                isInWishlist(product.id)
                  ? "text-red-500 border-red-200"
                  : "text-[#63b516] border-green-200 hover:bg-green-50"
              }`}
              onClick={handleWishlist}
            >
              <Heart
                size={16}
                className={isInWishlist(product.id) ? "fill-red-500" : ""}
              />
            </Button>
          </div>
        </div>
      </div>

      {/* Product details */}
      <div className="p-4 flex flex-col flex-1">
        {/* Rating */}
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
                      ? "fill-[#63b516] text-[#63b516]"
                      : "text-gray-300"
                  }
                />
              ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-[#4b7f10] line-clamp-1 mb-1">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-baseline mt-3">
          <span className="font-bold text-lg text-[#63b516]">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="ml-2 text-sm text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
