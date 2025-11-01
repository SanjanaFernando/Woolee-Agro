import { Award, Heart, CheckCircle } from "lucide-react";

const ValuesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Our Core Values
          </h2>
          <p className="text-gray-600 text-lg">
            These principles guide our decisions, shape our culture, and help us
            deliver exceptional products and experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Value 1 */}
          <div className="bg-white p-8 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="bg-green-light/20 p-4 rounded-full inline-block mb-6">
              <Award className="text-green-default w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-green-dark">
              Quality Excellence
            </h3>
            <p className="text-gray-600">
              We're committed to delivering products that exceed expectations in
              performance, durability, and user experience. Each product
              undergoes rigorous testing before reaching our customers.
            </p>
          </div>

          {/* Value 2 */}
          <div className="bg-white p-8 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="bg-green-light/20 p-4 rounded-full inline-block mb-6">
              <Heart className="text-green-default w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-green-dark">
              Customer First
            </h3>
            <p className="text-gray-600">
              Our customers are at the heart of everything we do. We listen to
              feedback, anticipate needs, and consistently strive to improve the
              customer journey from browsing to after-sales support.
            </p>
          </div>

          {/* Value 3 */}
          <div className="bg-white p-8 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="bg-green-light/20 p-4 rounded-full inline-block mb-6">
              <CheckCircle className="text-green-default w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-green-dark">
              Innovation
            </h3>
            <p className="text-gray-600">
              We foster a culture of creativity and forward-thinking. By staying
              ahead of industry trends and embracing new technologies, we
              develop products that are both innovative and relevant.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
