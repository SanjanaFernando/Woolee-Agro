import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-green-dark text-white py-16 md:py-24">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              We're On A Mission To Redefine Your Shopping Experience
            </h1>
            <p className="text-gray-200 mb-8 text-lg">
              Founded in 2015, Purplify has grown from a small startup to a
              trusted name in the electronics industry. Our commitment to
              quality, innovation, and customer satisfaction drives everything
              we do.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop">
                <Button className="btn-gradient" size="lg">
                  View Our Products
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="outline"
                  className="bg-white text-green-dark border-white hover:bg-white/90"
                  size="lg"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <img
              src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1974&auto=format"
              alt="Team working together"
              className="rounded-xl shadow-lg w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
