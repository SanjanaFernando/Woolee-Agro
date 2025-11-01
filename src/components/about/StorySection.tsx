const StorySection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
          <p className="text-gray-600 text-lg">
            The journey that led to what Purplify is today - a story of passion,
            resilience, and commitment to excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format"
              alt="Team working together"
              className="rounded-xl shadow-lg"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4 text-green-dark">
              From Garage to Global
            </h3>
            <p className="text-gray-600 mb-6">
              Purplify began in 2015 in a small garage with just three people
              and a vision to create electronics that would truly enhance
              people's lives. Our founders, all tech enthusiasts with
              backgrounds in engineering, wanted to build products that were not
              only technologically advanced but also accessible and
              user-friendly.
            </p>
            <p className="text-gray-600 mb-6">
              Within five years, we expanded from our humble beginnings to a
              team of over 200 passionate individuals across three continents.
              Today, we pride ourselves on maintaining the same enthusiasm and
              customer-focused approach that drove us from day one.
            </p>
            <div className="flex gap-8 mt-8">
              <div>
                <p className="text-4xl font-bold text-green-default mb-1">
                  200+
                </p>
                <p className="text-gray-500">Team Members</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-green-default mb-1">
                  50+
                </p>
                <p className="text-gray-500">Countries</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-green-default mb-1">
                  1M+
                </p>
                <p className="text-gray-500">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
