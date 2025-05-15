
import { useState, useEffect, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { UploadZone } from "@/components/upload-zone"
import { FeatureGrid } from "@/components/feature-grid"
import { Header } from "@/components/header"
import { AnimatedBackground } from "@/components/animated-background"
import { Upload, Download, MoonStar, Sun, Settings } from 'lucide-react'
import { pdfFeatures, imageFeatures, videoFeatures } from "@/lib/feature"
import gsap from "gsap"

// Type Definitions
export type ActiveTabType = 'pdf' | 'image' | 'video'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<ActiveTabType>("pdf")
  const [files, setFiles] = useState<File[]>([])
  const tabsContainerRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const { theme, setTheme } = useTheme()

  // Initial animation for tabs container
  useEffect(() => {
    if (tabsContainerRef.current) {
      gsap.fromTo(
        tabsContainerRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)", delay: 0.5 }
      )
    }
  }, [])

  // Animation for tab content changes
  useEffect(() => {
    if (contentRef.current && contentRef.current.children.length > 0) {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          ease: "power3.out", 
          stagger: 0.03,
          clearProps: "all" // Clear properties after animation to prevent conflicts
        }
      )
    }
  }, [activeTab])

  const handleTabChange = (newTab: string) => {
    if (newTab === "pdf" || newTab === "image" || newTab === "video") {
      // Animate out old content
      if (contentRef.current && contentRef.current.children.length > 0) {
        gsap.to(contentRef.current.children, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: "power3.in",
          stagger: 0.02,
          onComplete: () => {
            setActiveTab(newTab as ActiveTabType)
          }
        })
      } else {
        setActiveTab(newTab as ActiveTabType)
      }
    }
  }

  return (
    <main className="bg-background min-h-screen select-none">
      <ScrollArea className="h-screen">
        <div className="relative w-full min-h-screen px-4 pb-12">
          <AnimatedBackground />
          <Header />

          {/* Navigation Bar */}
          <div className="max-w-md mx-auto mt-12 bg-card/80 backdrop-blur-md p-2 rounded-full flex justify-around items-center mb-8 z-20 relative shadow-xl border border-border/50">
            <Button 
              size="icon"
              variant="ghost"
              aria-label="Upload History"
              className="p-3 rounded-full text-muted-foreground hover:text-foreground transition-all duration-200"
            >
              <Upload size={20} />
            </Button>
            
            <Button 
              size="icon"
              variant="ghost"
              aria-label="Downloads"
              className="p-3 rounded-full text-muted-foreground hover:text-foreground transition-all duration-200"
            >
              <Download size={20} />
            </Button>
            
            <Button 
              size="icon"
              variant="ghost"
              aria-label="Toggle Theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-3 rounded-full text-muted-foreground hover:text-foreground transition-all duration-200"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonStar className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            
            <Button 
              size="icon"
              variant="ghost"
              aria-label="Preferences"
              className="p-3 rounded-full text-muted-foreground hover:text-foreground transition-all duration-200"
            >
              <Settings size={20} />
            </Button>
          </div>
          
          {/* Upload Zone */}
          <UploadZone activeTab={activeTab} files={files} setFiles={setFiles} />

          {/* Tabs and Feature Cards */}
          <div ref={tabsContainerRef} className="max-w-6xl mx-auto mt-8 mb-8 relative z-10">
            <Tabs 
              defaultValue="pdf" 
              value={activeTab} 
              onValueChange={handleTabChange} 
              className="w-full"
            >
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12 bg-card/50 backdrop-blur-sm">
                <TabsTrigger 
                  value="pdf" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1 data-[state=inactive]:hover:bg-secondary/70"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>PDF Tools</span>
                  </div>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="image" 
                  className="data-[state=active]:bg-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-teal-500/30 transition-all duration-300 transform hover:-translate-y-1 data-[state=inactive]:hover:bg-secondary/70"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Image Tools</span>
                  </div>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="video" 
                  className="data-[state=active]:bg-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-pink-500/30 transition-all duration-300 transform hover:-translate-y-1 data-[state=inactive]:hover:bg-secondary/70"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23 7L16 12L23 17V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <rect x="1" y="5" width="15" height="14" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Video Tools</span>
                  </div>
                </TabsTrigger>
              </TabsList>

              {/* Features Grid Section */}
              <div ref={contentRef} className="max-w-6xl mx-auto px-4">
                <TabsContent value="pdf" className="mt-0">
                  <FeatureGrid features={pdfFeatures} type="pdf" selectedFiles={files} />
                </TabsContent>

                <TabsContent value="image" className="mt-0">
                  <FeatureGrid features={imageFeatures} type="image" selectedFiles={files} />
                </TabsContent>

                <TabsContent value="video" className="mt-0">
                  <FeatureGrid features={videoFeatures} type="video" selectedFiles={files} />
                </TabsContent>
              </div>
            </Tabs>
          </div>

          <footer className="text-center py-8 text-muted-foreground text-sm mt-16 border-t border-border/50">
            <p className="mb-2">© {new Date().getFullYear()} Morphilie - Free & Open Source</p>
            <div className="flex justify-center gap-5">
              {["GitHub", "Documentation", "Support"].map(link => (
                <a 
                  key={link} 
                  href="#" 
                  className="hover:text-foreground transition-colors duration-200"
                >
                  {link}
                </a>
              ))}
            </div>
          </footer>
        </div>
      </ScrollArea>
    </main>
  )
}
