import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  ShoppingBag,
  Twitter,
  Youtube,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-dark text-gray-100">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <span className="font-bold text-xl text-white">Woolee Agro</span>
            </Link>
            <p className="text-gray-300 mb-6 max-w-sm">
              We provide high-quality agro products that bring freshness,
              sustainability, and innovation to your lifestyle.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Youtube, href: "#" },
              ].map(({ icon: Icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  className="p-2 bg-white/10 rounded-full hover:bg-green-vivid/30 transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Home", to: "/" },
                { label: "Shop", to: "/shop" },
                { label: "Categories", to: "/categories" },
                { label: "About Us", to: "/about" },
                { label: "Contact", to: "/contact" },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-gray-300 hover:text-green-vivid transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">
              Customer Service
            </h3>
            <ul className="space-y-2">
              {[
                { label: "FAQs", to: "/faq" },
                { label: "Shipping Info", to: "/shipping" },
                { label: "Returns Policy", to: "/returns" },
                { label: "Track Order", to: "/track-order" },
                { label: "Privacy Policy", to: "/privacy-policy" },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-gray-300 hover:text-green-vivid transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">
              Contact Us
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li>
                <p className="font-medium text-white">Address:</p>
                <p>123 Green Street, Colombo, Sri Lanka</p>
              </li>
              <li>
                <p className="font-medium text-white">Phone:</p>
                <p>+94 77 123 4567</p>
              </li>
              <li>
                <p className="font-medium text-white">Email:</p>
                <p>info@wooleeagro.com</p>
              </li>
              <li>
                <p className="font-medium text-white">Hours:</p>
                <p>Mon–Fri: 9AM – 6PM</p>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-white/10 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Woolee Agro. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-gray-400">
            <Link
              to="/terms"
              className="hover:text-green-vivid transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/privacy"
              className="hover:text-green-vivid transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/cookies"
              className="hover:text-green-vivid transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
