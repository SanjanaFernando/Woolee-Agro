import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  AtSign,
  Building2,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  User,
} from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent",
        description: "We'll get back to you as soon as possible.",
      });
      setIsSubmitting(false);
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-green-gradient text-white py-12 md:py-16">
          <div className="container-custom">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Get in Touch
              </h1>
              <p className="text-lg opacity-90">
                Have questions, feedback, or need support? We're here to help.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information and Form */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid md:grid-cols-12 gap-10">
              {/* Contact Information */}
              <div className="md:col-span-5 lg:col-span-4">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                  {/* Contact items */}
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-green-light/20 p-3 rounded-full">
                        <MapPin className="text-green-default" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">Our Location</h3>
                        <p className="text-gray-500">
                          123 Tech Street, Digital City
                          <br />
                          New York, NY 10001
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-green-light/20 p-3 rounded-full">
                        <Mail className="text-green-default" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">Email Address</h3>
                        <p className="text-gray-500">
                          info@purplifystore.com
                          <br />
                          support@purplifystore.com
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-green-light/20 p-3 rounded-full">
                        <Phone className="text-green-default" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">Phone Number</h3>
                        <p className="text-gray-500">
                          +1 (555) 123-4567
                          <br />
                          +1 (555) 987-6543
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-green-light/20 p-3 rounded-full">
                        <Clock className="text-green-default" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">Working Hours</h3>
                        <p className="text-gray-500">
                          Monday - Friday: 9AM - 6PM
                          <br />
                          Saturday: 10AM - 4PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
                  <div className="flex gap-3">
                    <a
                      href="#"
                      className="bg-green-gradient w-10 h-10 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                      aria-label="Facebook"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="bg-green-gradient w-10 h-10 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                      aria-label="Twitter"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="bg-green-gradient w-10 h-10 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                      aria-label="Instagram"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="bg-green-gradient w-10 h-10 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                      aria-label="YouTube"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="md:col-span-7 lg:col-span-8">
                <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-6">Send Us A Message</h2>
                  <p className="text-gray-500 mb-8">
                    Fill out the form below and our team will get back to you as
                    soon as possible.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="relative">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium mb-2"
                        >
                          Your Name
                        </label>
                        <div className="relative">
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            required
                            value={formState.name}
                            onChange={handleChange}
                            className="pl-10"
                          />
                          <User
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium mb-2"
                        >
                          Your Email
                        </label>
                        <div className="relative">
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            required
                            value={formState.email}
                            onChange={handleChange}
                            className="pl-10"
                          />
                          <AtSign
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium mb-2"
                      >
                        Subject
                      </label>
                      <div className="relative">
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          placeholder="What is this about?"
                          required
                          value={formState.subject}
                          onChange={handleChange}
                          className="pl-10"
                        />
                        <MessageSquare
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={18}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-2"
                      >
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Your message here..."
                        rows={6}
                        required
                        value={formState.message}
                        onChange={handleChange}
                        className="resize-none"
                      />
                    </div>

                    <div>
                      <Button
                        type="submit"
                        className="btn-gradient w-full md:w-auto"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <Send size={18} className="mr-2" />
                            Send Message
                          </span>
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Find Us On The Map
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Our office is conveniently located in the heart of the tech
                district. Feel free to drop by during working hours.
              </p>
            </div>

            {/* Map placeholder - in a real project you would integrate Google Maps */}
            <div className="h-96 rounded-xl overflow-hidden border border-gray-200 bg-white p-4">
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <MapPin
                    size={48}
                    className="mx-auto mb-4 text-green-default"
                  />
                  <p className="font-medium">Map Placeholder</p>
                  <p className="text-sm text-gray-500 mt-2">
                    In a production environment, an interactive map would be
                    displayed here.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Find answers to common questions about our products, services,
                and policies.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-3">
                  What are your shipping options?
                </h3>
                <p className="text-gray-600">
                  We offer standard shipping (3-5 business days), express
                  shipping (1-2 business days), and next-day delivery options
                  for most locations. Shipping costs and delivery times may vary
                  based on your location.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-3">
                  What is your return policy?
                </h3>
                <p className="text-gray-600">
                  We offer a 30-day return policy for most products. Items must
                  be in their original packaging and in unused condition. Some
                  products may have specific return restrictions, which will be
                  noted in their description.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-3">
                  Do you offer international shipping?
                </h3>
                <p className="text-gray-600">
                  Yes, we ship to most countries worldwide. International
                  shipping costs and delivery times vary by location. Import
                  taxes and duties may apply and are the responsibility of the
                  customer.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-3">
                  How can I track my order?
                </h3>
                <p className="text-gray-600">
                  Once your order ships, you'll receive a confirmation email
                  with tracking information. You can also log into your account
                  on our website to view your order status and tracking details
                  at any time.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-500 mb-4">Still have questions?</p>
              <Button className="btn-gradient">View All FAQs</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
