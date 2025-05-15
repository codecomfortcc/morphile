"use client"

import { useRef, useEffect } from "react"
import { FeatureCard } from "@/components/feature-card"
import gsap from "gsap"
import type { Feature } from "@/lib/feature"

interface FeatureGridProps {
  features: Feature[]
  type: "pdf" | "image" | "video"
  selectedFiles: File[]
}

export function FeatureGrid({ features, type, selectedFiles }: FeatureGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (gridRef.current) {
      // Staggered entrance animation for cards
      gsap.fromTo(
        gridRef.current.children,
        {
          y: 30,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "back.out(1.7)",
          clearProps: "all", // Clear properties after animation
        },
      )
    }

    return () => {
      if (gridRef.current) {
        gsap.killTweensOf(gridRef.current.children)
      }
    }
  }, [features])

  return (
    <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <FeatureCard key={feature.id} feature={feature} index={index} type={type} selectedFiles={selectedFiles} />
      ))}
    </div>
  )
}
