import { Button } from "@/components/ui/enhanced-button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    { name: "Strength", to: "/category/strength" },
    { name: "Cardio", to: "/category/cardio" },
    { name: "Benches & Racks", to: "/category/benches-and-racks" },
    { name: "Accessories", to: "/category/accessories" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-card border-b border-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold gradient-text">
              FitEquip Pro
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.to}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                {category.name}
              </Link>
            ))}
            <Link
              to="/#packages"
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              Packages
            </Link>
          </div>

          {/* WhatsApp CTA */}
          <div className="hidden md:block">
            <Button 
              variant="whatsapp"
              onClick={() => window.open('https://wa.me/911234567890?text=Hi!%20I%27m%20interested%20in%20your%20gym%20equipment', '_blank')}
            >
              Get Quote
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.to}
                  className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200"
                >
                  {category.name}
                </Link>
              ))}
              <Link
                to="/#packages"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200"
              >
                Packages
              </Link>
              <div className="px-3 pt-2">
                <Button 
                  variant="whatsapp" 
                  className="w-full"
                  onClick={() => window.open('https://wa.me/911234567890?text=Hi!%20I%27m%20interested%20in%20your%20gym%20equipment', '_blank')}
                >
                  Get Quote
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;