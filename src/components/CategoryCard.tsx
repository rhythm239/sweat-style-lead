import { Button } from "@/components/ui/enhanced-button";

interface CategoryCardProps {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
  delay?: number;
}

const CategoryCard = ({ title, description, imageUrl, href, delay = 0 }: CategoryCardProps) => {
  return (
    <div 
      className="group glass-card p-6 text-center hover:scale-105 transition-all duration-500 animate-fade-in flex flex-col h-full"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative overflow-hidden rounded-lg mb-6">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60"></div>
      </div>
      
      <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
        {description}
      </p>
      
      <Button 
        variant="glass" 
        className="w-full group-hover:border-primary/50 mt-auto"
        onClick={() => window.location.href = href}
      >
        Explore {title}
      </Button>
    </div>
  );
};

export default CategoryCard;