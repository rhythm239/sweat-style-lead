import { Button } from "@/components/ui/enhanced-button";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { categoryApi, productApi, type Category, type Product } from "@/lib/supabase";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      
      try {
        const categoryData = await categoryApi.getBySlug(slug);
        if (!categoryData) {
          navigate('/');
          return;
        }
        
        setCategory(categoryData);
        const productsData = await productApi.getByCategory(categoryData.id);
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching category data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="bg-muted h-8 w-48 rounded mb-8"></div>
            <div className="bg-muted h-12 w-96 rounded mb-4"></div>
            <div className="bg-muted h-6 w-full max-w-2xl rounded mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass-card p-6">
                  <div className="bg-muted h-48 rounded-lg mb-4"></div>
                  <div className="bg-muted h-6 rounded mb-2"></div>
                  <div className="bg-muted h-4 rounded mb-4"></div>
                  <div className="bg-muted h-10 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category not found</h1>
          <Button onClick={() => navigate('/')}>Return Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-8 hover:bg-card/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        {/* Category Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">{category.name}</span> Equipment
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {category.description}
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className="glass-card p-6 group hover:scale-105 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden rounded-lg mb-6">
                  <img 
                    src={product.image_urls[0] || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop'} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-gradient-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {product.name}
                </h3>
                
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {product.description}
                </p>

                <div className="space-y-3">
                  <Button 
                    variant="glass" 
                    className="w-full"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    View Details
                  </Button>
                  
                  <Button 
                    variant="whatsapp" 
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      const message = `Hi! I'm interested in the ${product.name}. Can you provide more details and pricing?`;
                      window.open(`https://wa.me/911234567890?text=${encodeURIComponent(message)}`, '_blank');
                    }}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Ask About This Product
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold mb-4">No products available</h3>
            <p className="text-muted-foreground mb-8">
              We're working on adding products to this category. Check back soon!
            </p>
            <Button 
              variant="whatsapp"
              onClick={() => {
                const message = `Hi! I'm looking for ${category.name.toLowerCase()} equipment. Can you help me find what I need?`;
                window.open(`https://wa.me/911234567890?text=${encodeURIComponent(message)}`, '_blank');
              }}
            >
              Contact Us for Custom Options
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;