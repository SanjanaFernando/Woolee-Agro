import React from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
}

const CartSidebar = ({ open, onClose }: CartSidebarProps) => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } =
    useCart();

  // WhatsApp ordering
  // NOTE: WhatsApp requires an international phone format without the leading plus or zeros.
  // The given number `0713274105` appears local — assuming Sri Lanka (+94), we convert to `94713274105`.
  // If you want a different country code, update `orderPhone` accordingly.
  const orderPhone = "94713274105";

  const handleOrder = async () => {
    if (!cartItems || cartItems.length === 0) return;

    const lines = [];
    lines.push("Hello, I'd like to place an order:");
    lines.push("");
    cartItems.forEach((item) => {
      const name = item.product.name;
      const qty = item.quantity;
      const total = (item.product.price * item.quantity).toFixed(2);
      lines.push(`- ${name} x${qty} — $${total}`);
    });
    lines.push("");
    lines.push(`Subtotal: $${cartTotal.toFixed(2)}`);
    const message = lines.join("\n");

    // Try to copy to clipboard
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(message);
      } else {
        const el = document.createElement("textarea");
        el.value = message;
        // Avoid visible focus
        el.style.position = "fixed";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
    } catch (err) {
      // ignore clipboard errors and proceed to open WhatsApp
      // console.warn("Clipboard write failed", err);
    }

    const waUrl = `https://wa.me/${orderPhone}?text=${encodeURIComponent(
      message
    )}`;
    window.open(waUrl, "_blank");
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full max-w-sm sm:max-w-md flex flex-col">
        <SheetHeader className="space-y-0.5 pr-6">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart ({cartCount})
          </SheetTitle>
        </SheetHeader>
        <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </SheetClose>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 py-12">
            <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-lg font-medium text-gray-500 mb-2">
              Your cart is empty
            </p>
            <p className="text-gray-400 text-center mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <SheetClose asChild>
              <Link to="/shop">
                <Button variant="outline">Continue Shopping</Button>
              </Link>
            </SheetClose>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-6">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 border-b pb-4"
                  >
                    <div className="h-24 w-24 flex-shrink-0 rounded-md border overflow-hidden">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium">
                          <h3>
                            <Link
                              to={`/product/${item.product.id}`}
                              onClick={onClose}
                              className="hover:text-green-default"
                            >
                              {item.product.name}
                            </Link>
                          </h3>
                          <p className="ml-4">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 line-clamp-1">
                          {item.product.description}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between">
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="mx-2 w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.product.id)}
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
                <div className="flex justify-between text-base font-medium">
                  <p>Subtotal</p>
                  <p>${cartTotal.toFixed(2)}</p>
                </div>
                <p className="text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <SheetClose asChild>
                  <Button
                    className="w-full bg-green-gradient"
                    onClick={handleOrder}
                  >
                    Order
                  </Button>
                </SheetClose>
                <div className="flex justify-center">
                  <SheetClose asChild>
                    <Link
                      to="/shop"
                      className="text-sm font-medium text-green-default hover:text-green-dark"
                    >
                      Continue Shopping
                    </Link>
                  </SheetClose>
                </div>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
