import { Button } from "@/components/ui/enhanced-button";
import { Check } from "lucide-react";

interface PackageCardProps {
  name: string;
  price: string;
  equipment: string[];
  imageUrl: string;
  featured?: boolean;
}

const PackageCard = ({ name, price, equipment, imageUrl, featured = false }: PackageCardProps) => {
  const whatsappMessage = `Hi! I'm interested in the ${name} package (${price}). Can you provide more details?`;
  const whatsappUrl = `https://wa.me/911234567890?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className={`glass-card p-8 relative ${featured ? 'border-primary/50 scale-105' : ''} hover:scale-105 transition-all duration-300`}>
      {featured && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <img 
          src={imageUrl} 
          alt={name}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        <div className="text-3xl font-bold gradient-text">{price}</div>
      </div>

      <div className="space-y-3 mb-8">
        {equipment.map((item, index) => (
          <div key={index} className="flex items-start space-x-3">
            <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-foreground">{item}</span>
          </div>
        ))}
      </div>

      <Button 
        variant="whatsapp" 
        className="w-full"
        onClick={() => window.open(whatsappUrl, '_blank')}
      >
        Get This Package
      </Button>
    </div>
  );
};

export default PackageCard;