import PackageCard from "./PackageCard";

const PackagesSection = () => {
  const packages = [
    {
      name: "Starter Package",
      price: "₹2,50,000",
      equipment: [
        "2x Adjustable Dumbbells (5-50kg)",
        "Adjustable Bench",
        "Olympic Barbell with Plates",
        "Squat Rack",
        "Rubber Floor Mats"
      ],
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
    },
    {
      name: "Professional Package", 
      price: "₹6,50,000",
      equipment: [
        "Complete Power Rack System",
        "Commercial Treadmill",
        "Cable Crossover Machine",
        "Complete Dumbbell Set (2.5-50kg)",
        "Olympic Barbells & Plates Set",
        "Professional Bench Set",
        "Functional Training Area Setup"
      ],
      imageUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=300&fit=crop",
      featured: true
    },
    {
      name: "Elite Package",
      price: "₹12,00,000",
      equipment: [
        "Full Commercial Gym Setup",
        "3x Premium Cardio Machines",
        "Complete Strength Training Zone",
        "Functional Training Area",
        "Recovery & Stretching Zone",
        "Sound System Integration",
        "Professional Installation & Setup"
      ],
      imageUrl: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=400&h=300&fit=crop"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-card/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Complete <span className="gradient-text">Gym Packages</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready-to-go gym solutions designed for different space and budget requirements. 
            Each package includes professional installation and setup.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div key={pkg.name} className="animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
              <PackageCard {...pkg} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Need a custom solution? We can design a package specifically for your space and requirements.
          </p>
          <button 
            className="btn-primary"
            onClick={() => window.open('https://wa.me/911234567890?text=Hi!%20I%27d%20like%20to%20discuss%20a%20custom%20gym%20package%20for%20my%20space.', '_blank')}
          >
            Request Custom Package
          </button>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;