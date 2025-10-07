import { useState, useEffect } from "react"
import { packageApi, type Package } from "@/lib/supabase"
import PackageCard from "./PackageCard"

const DynamicPackagesSection = () => {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await packageApi.getAll()
        setPackages(data)
      } catch (error) {
        console.error('Error fetching packages:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPackages()
  }, [])

  if (loading) {
    return (
      <section id="packages" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-card/20">
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
            {[...Array(3)].map((_, i) => (
              <div key={i} className="glass-card p-8 animate-pulse">
                <div className="bg-muted h-40 rounded-lg mb-6"></div>
                <div className="bg-muted h-6 rounded mb-4"></div>
                <div className="bg-muted h-8 rounded mb-6"></div>
                <div className="space-y-3 mb-8">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="bg-muted h-4 rounded"></div>
                  ))}
                </div>
                <div className="bg-muted h-12 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="packages" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-card/20">
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
            <div key={pkg.id} className="animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
              <PackageCard
                name={pkg.name}
                price={pkg.price}
                equipment={pkg.equipment_list}
                imageUrl={pkg.image_url || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'}
                featured={pkg.featured}
                galleryImages={pkg.gallery_images}
              />
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
  )
}

export default DynamicPackagesSection