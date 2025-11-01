import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Mail } from "lucide-react";

const NewsletterSection = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email) {
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="relative section-padding overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-green-gradient opacity-5"></div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block p-3 bg-green-default/10 rounded-full mb-6">
            <Mail size={24} className="text-green-default" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Stay updated with our latest products, special offers, and tech news
            delivered directly to your inbox.
          </p>

          <form
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-default/50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" className="btn-gradient px-6 py-3 text-base">
              Subscribe
            </Button>
          </form>

          <p className="mt-4 text-xs text-gray-500">
            By subscribing you agree to our Privacy Policy. You can unsubscribe
            at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
