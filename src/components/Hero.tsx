import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import image1 from "../assests/images/plant1.png";
import image2 from "../assests/images/plant2.png";
import image3 from "../assests/images/plant3.png";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#d7f9c3] to-[#f6fff0] overflow-hidden">
      <div className="container-custom grid md:grid-cols-2 gap-8 py-12 md:py-20">
        {/* Text Content */}
        <div className="flex flex-col justify-center space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#4b7f10]">
            Grow{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#63b516] to-[#8ad93d]">
              Happiness
            </span>
            &nbsp;with Whoolee Agro
          </h1>

          <p className="text-lg text-gray-600 max-w-lg">
            Explore a range of small plants that bring peace, freshness, and
            beauty into your home — naturally cared and grown with love.
          </p>

          <div className="flex flex-wrap gap-4 pt-3">
            <Button className="bg-[#63b516] hover:bg-[#559d14] text-white text-base px-6 py-6 rounded-xl shadow-md transition-transform duration-200 hover:scale-105">
              Shop Now
            </Button>
          </div>

          <div className="flex items-center gap-6 pt-3">
            <div className="flex flex-col">
              <span className="font-bold text-2xl text-[#63b516]">2K+</span>
              <span className="text-sm text-gray-500">Happy Gardeners</span>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="flex flex-col">
              <span className="font-bold text-2xl text-[#63b516]">100+</span>
              <span className="text-sm text-gray-500">Plant Varieties</span>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="flex flex-col">
              <span className="font-bold text-2xl text-[#63b516]">95%</span>
              <span className="text-sm text-gray-500">Positive Reviews</span>
            </div>
          </div>
        </div>

        {/* Hero Image (rotating circular plants) */}
        <HeroImageRotator />
      </div>

      {/* Decorative Elements */}
      <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-[#e5f9d2] rounded-full blur-3xl"></div>
      <div className="absolute top-20 -right-20 w-72 h-72 bg-[#d7f9c3] rounded-full blur-3xl"></div>
    </section>
  );
};

export default Hero;

const HeroImageRotator = () => {
  const images = [image1, image2, image3];

  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 4000);
    return () => clearInterval(id);
  }, [images.length, isPaused]);

  const variants = {
    initial: (direction: number) => ({
      opacity: 0,
      x: 40 * direction,
      scale: 0.95,
    }),
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: (direction: number) => ({
      opacity: 0,
      x: -40 * direction,
      scale: 0.95,
    }),
  };

  // direction can be used if we add prev/next controls; keep as 1 for now
  const direction = 1;

  return (
    <div
      className="relative w-full flex items-center justify-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute w-[320px] h-[320px] md:w-[500px] md:h-[500px] bg-[#63b516]/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-[320px] h-[320px] md:w-[500px] md:h-[500px] overflow-hidden rounded-full drop-shadow-2xl">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            alt={`Plant ${index + 1}`}
            custom={direction}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="w-full h-full object-contain"
          />
        </AnimatePresence>
      </div>

      {/* Dots / indicators */}
      <div className="absolute bottom-4 flex gap-2 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Show plant ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              i === index ? "bg-white scale-110" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
