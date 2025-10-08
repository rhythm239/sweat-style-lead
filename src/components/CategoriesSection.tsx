import CategoryCard from "./CategoryCard";

const CategoriesSection = () => {
  const categories = [
    {
      title: "Accessories",
      description: "Complete your gym with resistance bands, kettlebells, and training accessories.",
      imageUrl: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=400&h=300&fit=crop",
      href: "/accessories"
    },
    {
      title: "Benches & Racks",
      description: "Professional-grade benches, squat racks, and multi-station systems.",
      imageUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=300&fit=crop",
      href: "/benches-racks"
    },
    {
      title: "Cardio",
      description: "Treadmills, ellipticals, bikes, and rowing machines for cardiovascular fitness.",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      href: "/cardio"
    },
    {
      title: "Strength",
      description: "Power racks, barbells, dumbbells, and plate-loaded machines for serious strength training.",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      href: "/strength"
    }
  ];

  return (
    <section id="categories" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Equipment <span className="gradient-text">Categories</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our comprehensive range of professional fitness equipment, 
            carefully selected for durability and performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              description={category.description}
              imageUrl={category.imageUrl}
              href={category.href}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;