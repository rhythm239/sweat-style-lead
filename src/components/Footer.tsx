import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-card/50 border-t border-border/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold gradient-text mb-4">Bodyforce</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Your trusted partner for premium gym equipment. We provide professional-grade 
              fitness solutions for home gyms, commercial spaces, and everything in between.
            </p>
            <button 
              className="btn-primary"
              onClick={() => window.open('https://wa.me/911234567890?text=Hi!%20I%27d%20like%20to%20know%20more%20about%20Bodyforce', '_blank')}
            >
              Contact Us on WhatsApp
            </button>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><Link to="/category/strength" className="text-muted-foreground hover:text-primary transition-colors">Strength Equipment</Link></li>
              <li><Link to="/category/cardio" className="text-muted-foreground hover:text-primary transition-colors">Cardio Machines</Link></li>
              <li><Link to="/category/benches-and-racks" className="text-muted-foreground hover:text-primary transition-colors">Benches & Racks</Link></li>
              <li><Link to="/category/accessories" className="text-muted-foreground hover:text-primary transition-colors">Accessories</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/#packages" className="text-muted-foreground hover:text-primary transition-colors">Gym Packages</Link></li>
              <li><span className="text-muted-foreground">Custom Design</span></li>
              <li><span className="text-muted-foreground">Installation</span></li>
              <li><span className="text-muted-foreground">Maintenance</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/20 mt-12 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 Bodyforce. All rights reserved. | Built with premium standards for premium equipment.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;