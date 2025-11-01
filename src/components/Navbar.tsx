import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Menu, ShoppingBag, User, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "./ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import CartSidebar from "./CartSidebar";
import WishlistSidebar from "./WishlistSidebar";
import Logo from "../../public/logo.png";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="container-custom flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="bg-transparent p-0 rounded-md">
            <img
              src={Logo}
              alt="Purplify logo"
              className="w-[190px] object-contain"
            />
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="font-medium hover:text-green-default transition-colors"
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="font-medium hover:text-green-default transition-colors"
          >
            Shop
          </Link>
          <Link
            to="/categories"
            className="font-medium hover:text-green-default transition-colors"
          >
            Categories
          </Link>
          <Link
            to="/about"
            className="font-medium hover:text-green-default transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="font-medium hover:text-green-default transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:flex relative"
            onClick={() => setIsWishlistOpen(true)}
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-gradient text-[10px] text-white flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-gradient text-[10px] text-white flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>

          {/* Mobile Menu Button - Using Sheet component */}
          {isMobile && (
            <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent
                className="bg-green-dark border-none p-0 rounded-l-xl w-[300px] max-h-screen overflow-y-auto"
                side="right"
              >
                <MobileNavigation
                  onClose={() => setIsDrawerOpen(false)}
                  onOpenCart={() => {
                    setIsDrawerOpen(false);
                    setIsCartOpen(true);
                  }}
                  onOpenWishlist={() => {
                    setIsDrawerOpen(false);
                    setIsWishlistOpen(true);
                  }}
                  cartCount={cartCount}
                  wishlistCount={wishlistCount}
                />
              </SheetContent>
            </Sheet>
          )}

          {/* Cart Sidebar */}
          <CartSidebar open={isCartOpen} onClose={() => setIsCartOpen(false)} />

          {/* Wishlist Sidebar */}
          <WishlistSidebar
            open={isWishlistOpen}
            onClose={() => setIsWishlistOpen(false)}
          />
        </div>
      </div>
    </header>
  );
};

const MobileNavigation = ({
  onClose,
  onOpenCart,
  onOpenWishlist,
  cartCount,
  wishlistCount,
}: {
  onClose: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  cartCount: number;
  wishlistCount: number;
}) => {
  return (
    <div className="flex flex-col h-full p-6 text-white overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <Link to="/" className="flex items-center gap-2" onClick={onClose}>
          <span className="bg-transparent p-0 rounded-md">
            <img
              src={Logo}
              alt="Purplify logo"
              className="w-7 h-7 object-contain"
            />
          </span>
          <span className="font-bold text-xl text-white">Purplify</span>
        </Link>
        <SheetClose asChild>
          <Button
            variant="outline"
            size="icon"
            className="text-white border border-white/20 hover:bg-white/10 hover:text-white"
          >
            <X size={20} className="text-white" />
          </Button>
        </SheetClose>
      </div>

      <div className="flex-1">
        <nav className="mb-8">
          <h3 className="text-white/70 text-sm font-semibold mb-4 pl-1">
            Navigation
          </h3>
          <div className="flex flex-col gap-2">
            <NavLink to="/" label="Home" onClick={onClose} />
            <NavLink to="/shop" label="Shop" onClick={onClose} />
            <NavLink to="/categories" label="Categories" onClick={onClose} />
            <NavLink to="/about" label="About" onClick={onClose} />
            <NavLink to="/contact" label="Contact" onClick={onClose} />
          </div>
        </nav>

        <div className="space-y-3 mt-6">
          <h3 className="text-white/70 text-sm font-semibold mb-4 pl-1">
            Account
          </h3>
          <Button
            variant="outline"
            className="w-full justify-start gap-2.5 border-white/20 hover:bg-white/10 hover:text-white text-white"
            onClick={onClose}
            asChild
          >
            <Link to="/account">
              <User size={18} />
              <span>My Account</span>
            </Link>
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start gap-2.5 border-white/20 hover:bg-white/10 text-white"
            onClick={onOpenWishlist}
          >
            <Heart size={18} />
            <span className="flex-1 text-left">Wishlist</span>
            {wishlistCount > 0 && (
              <span className="bg-white/20 text-white px-2 py-0.5 text-xs rounded-full">
                {wishlistCount}
              </span>
            )}
          </Button>
          <Button
            className="w-full justify-start gap-2.5 bg-green-gradient hover:opacity-90 transition-all duration-300 mt-2"
            onClick={onOpenCart}
          >
            <ShoppingBag size={18} />
            <span className="flex-1 text-left">View Cart</span>
            {cartCount > 0 && (
              <span className="bg-white/20 text-white px-2 py-0.5 text-xs rounded-full">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      <SheetFooter className="px-0 pt-6">
        <SheetClose asChild>
          <Button
            variant="outline"
            className="w-full border-white/20 text-white hover:bg-white/10"
            onClick={onClose}
          >
            Close Menu
          </Button>
        </SheetClose>
      </SheetFooter>
    </div>
  );
};

const NavLink = ({
  to,
  label,
  onClick,
}: {
  to: string;
  label: string;
  onClick: () => void;
}) => (
  <SheetClose asChild>
    <Link
      to={to}
      className="py-3 px-4 text-lg font-medium text-white hover:bg-white/10 rounded-md transition-colors"
      onClick={onClick}
    >
      {label}
    </Link>
  </SheetClose>
);

export default Navbar;
