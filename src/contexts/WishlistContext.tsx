
import React, { createContext, useState, useContext, useEffect } from "react";
import { Product } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

interface WishlistContextType {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const { toast } = useToast();
  
  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("wishlist");
      if (savedWishlist) {
        setWishlistItems(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error("Error loading wishlist from localStorage:", error);
    }
  }, []);
  
  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
    } catch (error) {
      console.error("Error saving wishlist to localStorage:", error);
    }
  }, [wishlistItems]);
  
  // Add product to wishlist
  const addToWishlist = (product: Product) => {
    if (!isInWishlist(product.id)) {
      setWishlistItems(prevItems => [...prevItems, product]);
      
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist`,
      });
    } else {
      removeFromWishlist(product.id);
    }
  };
  
  // Remove product from wishlist
  const removeFromWishlist = (productId: string) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
    
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist",
    });
  };
  
  // Check if product is in wishlist
  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.id === productId);
  };
  
  // Calculate wishlist count
  const wishlistCount = wishlistItems.length;
  
  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      wishlistCount
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
