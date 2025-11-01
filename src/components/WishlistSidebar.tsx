import React from "react";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";

interface WishlistSidebarProps {
  open: boolean;
  onClose: () => void;
}

const WishlistSidebar = ({ open, onClose }: WishlistSidebarProps) => {
  const { wishlistItems, removeFromWishlist, wishlistCount } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full max-w-sm sm:max-w-md flex flex-col">
        <SheetHeader className="space-y-0.5 pr-6">
          <SheetTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Wishlist ({wishlistCount})
          </SheetTitle>
        </SheetHeader>
        <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </SheetClose>

        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 py-12">
            <Heart className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-lg font-medium text-gray-500 mb-2">
              Your wishlist is empty
            </p>
            <p className="text-gray-400 text-center mb-6">
              Looks like you haven't added any products to your wishlist yet.
            </p>
            <SheetClose asChild>
              <Link to="/shop">
                <Button variant="outline">Explore Products</Button>
              </Link>
            </SheetClose>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-6">
              <div className="space-y-4">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b pb-4">
                    <div className="h-24 w-24 flex-shrink-0 rounded-md border overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium">
                          <h3>
                            <Link
                              to={`/product/${item.id}`}
                              onClick={onClose}
                              className="hover:text-green-default"
                            >
                              {item.name}
                            </Link>
                          </h3>
                          <p className="ml-4">${item.price.toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 line-clamp-1">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 text-xs"
                          onClick={() => handleAddToCart(item)}
                        >
                          <ShoppingBag className="h-3 w-3" />
                          Add to Cart
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromWishlist(item.id)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <SheetFooter className="border-t pt-4">
              <div className="w-full space-y-4">
                <SheetClose asChild>
                  <Button className="w-full bg-green-gradient">
                    Continue Shopping
                  </Button>
                </SheetClose>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default WishlistSidebar;
