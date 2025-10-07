import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

interface PackageGalleryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  packageName: string
  images: string[]
}

const PackageGalleryDialog = ({ open, onOpenChange, packageName, images }: PackageGalleryDialogProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const hasImages = images && images.length > 0
  const displayImages = hasImages ? images : [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop'
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % displayImages.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text">
            {packageName} - Gallery
          </DialogTitle>
        </DialogHeader>
        
        <div className="relative">
          {!hasImages && (
            <div className="absolute top-4 left-0 right-0 z-10 text-center">
              <span className="bg-muted/90 text-muted-foreground px-4 py-2 rounded-full text-sm">
                Package gallery images will be added soon
              </span>
            </div>
          )}
          
          <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
            <img
              src={displayImages[currentIndex]}
              alt={`${packageName} - Image ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            {displayImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background/90"
                  onClick={prevSlide}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background/90"
                  onClick={nextSlide}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
          </div>
          
          {displayImages.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {displayImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-primary w-8' 
                      : 'bg-muted-foreground/30'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PackageGalleryDialog
