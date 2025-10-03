import { Button } from "@/components/ui/enhanced-button";
import { ArrowLeft, MessageCircle, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productApi, type Product } from "@/lib/supabase";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        const productData = await productApi.getById(id);
        if (!productData) {
          navigate('/');
          return;
        }
        
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="bg-muted h-8 w-48 rounded mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-muted h-96 rounded-lg"></div>
              <div className="space-y-4">
                <div className="bg-muted h-8 w-3/4 rounded"></div>
                <div className="bg-muted h-6 w-1/2 rounded"></div>
                <div className="bg-muted h-32 w-full rounded"></div>
                <div className="bg-muted h-12 w-full rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => navigate('/')}>Return Home</Button>
        </div>
      </div>
    );
  }

  const whatsappMessage = `Hi! I'm interested in the ${product.name}. Can you provide pricing and availability details?`;
  const whatsappUrl = `https://wa.me/911234567890?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-8 hover:bg-card/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="glass-card p-4">
              <img 
                src={product.image_urls[selectedImageIndex] || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop'} 
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            
            {/* Image Thumbnails */}
            {product.image_urls.length > 1 && (
              <div className="flex space-x-2">
                {product.image_urls.map((imageUrl, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index ? 'border-primary' : 'border-border'
                    }`}
                  >
                    <img 
                      src={imageUrl} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
                {product.featured && (
                  <span className="bg-gradient-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                )}
              </div>
              
              {product.category && (
                <p className="text-primary font-medium">
                  {product.category.name} Equipment
                </p>
              )}
            </div>

            {/* Description */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Specifications */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-4">Specifications</h2>
                <div className="space-y-3">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="space-y-4">
              <Button 
                variant="whatsapp" 
                size="xl"
                className="w-full text-lg"
                onClick={() => window.open(whatsappUrl, '_blank')}
              >
                <MessageCircle className="w-5 h-5 mr-3" />
                Get Price & Availability
              </Button>
              
              <Button 
                variant="glass" 
                size="lg"
                className="w-full"
                onClick={() => {
                  const customMessage = `Hi! I'd like to discuss a custom gym setup that includes the ${product.name}. Can you help me plan a complete solution?`;
                  window.open(`https://wa.me/911234567890?text=${encodeURIComponent(customMessage)}`, '_blank');
                }}
              >
                Plan Custom Gym Setup
              </Button>
            </div>

            {/* Additional Info */}
            <div className="glass-card p-6 border border-primary/20">
              <h3 className="font-semibold mb-2 text-primary">Why Choose Bodyforce?</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Professional installation included</li>
                <li>• 2-year warranty on all equipment</li>
                <li>• Expert consultation and planning</li>
                <li>• Ongoing maintenance support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;