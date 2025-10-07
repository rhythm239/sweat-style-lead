import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { packageApi, type Package } from "@/lib/supabase"
import { Button } from "@/components/ui/enhanced-button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

const PackageGalleryPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [pkg, setPkg] = useState<Package | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchPackage = async () => {
      if (!id) return
      
      try {
        const packages = await packageApi.getAll()
        const foundPackage = packages.find(p => p.id === id)
        if (foundPackage) {
          setPkg(foundPackage)
        } else {
          navigate('/')
        }
      } catch (error) {
        console.error('Error fetching package:', error)
        navigate('/')
      } finally {
        setLoading(false)
      }
    }

    fetchPackage()
  }, [id, navigate])

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="animate-pulse">
              <div className="bg-muted h-96 rounded-lg mb-8"></div>
              <div className="bg-muted h-8 w-64 rounded mb-4"></div>
              <div className="bg-muted h-6 w-48 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!pkg) return null

  const displayImages = pkg.gallery_images && pkg.gallery_images.length > 0 
    ? pkg.gallery_images 
    : [pkg.image_url || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop']

  const hasImages = pkg.gallery_images && pkg.gallery_images.length > 0

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % displayImages.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card/20">
      <Navigation />
      
      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">{pkg.name}</span>
              </h1>
              <p className="text-2xl font-semibold text-primary">{pkg.price}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="hover:bg-muted"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Gallery Section */}
          <div className="glass-card p-8 mb-8">
            {!hasImages && (
              <div className="mb-4 text-center">
                <span className="bg-muted/90 text-muted-foreground px-4 py-2 rounded-full text-sm inline-block">
                  Package gallery images will be added soon
                </span>
              </div>
            )}
            
            <div className="relative aspect-video bg-muted rounded-lg overflow-hidden group">
              <img
                src={displayImages[currentIndex]}
                alt={`${pkg.name} - Image ${currentIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {displayImages.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background/95 backdrop-blur-sm rounded-full p-3 transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background/95 backdrop-blur-sm rounded-full p-3 transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}

              {/* Slide Indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-medium">
                  {currentIndex + 1} / {displayImages.length}
                </span>
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {displayImages.length > 1 && (
              <div className="flex justify-center gap-3 mt-6 overflow-x-auto pb-2">
                {displayImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentIndex 
                        ? 'border-primary scale-110' 
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Package Details */}
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold mb-4">Package Includes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pkg.equipment_list.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>

            {pkg.description && (
              <div className="mt-6 pt-6 border-t border-border/20">
                <h3 className="text-xl font-bold mb-3">Description</h3>
                <p className="text-muted-foreground">{pkg.description}</p>
              </div>
            )}

            <div className="mt-8 flex gap-4">
              <Button
                variant="whatsapp"
                size="lg"
                className="flex-1"
                onClick={() => {
                  const message = `Hi! I'm interested in the ${pkg.name} package (${pkg.price}). Can you provide more details?`
                  window.open(`https://wa.me/911234567890?text=${encodeURIComponent(message)}`, '_blank')
                }}
              >
                Get This Package
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/')}
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default PackageGalleryPage
