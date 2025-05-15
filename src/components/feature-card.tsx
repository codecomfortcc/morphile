"use client"

import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import gsap from "gsap"
import { cn } from "@/lib/utils"
import type { Feature } from "@/lib/feature"

interface FeatureCardProps {
  feature: Feature
  index: number
  type: "pdf" | "image" | "video"
  selectedFiles: File[]
}

export function FeatureCard({ feature, type, selectedFiles }: FeatureCardProps) {
  const navigate = useNavigate()
  const cardRef = useRef<HTMLDivElement | null>(null)
  const iconRef = useRef<HTMLDivElement | null>(null)
  const textRef = useRef<HTMLHeadingElement | null>(null)
  const descriptionRef = useRef<HTMLParagraphElement | null>(null)
  const glowRef = useRef<HTMLDivElement | null>(null)
  const lineRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const [isHovered, setIsHovered] = useState(false)

  const isDisabled = feature.minFilesRequired !== undefined && selectedFiles.length < feature.minFilesRequired

  // Set up colors based on the type parameter (pdf, image, video)
  const colors = {
    pdf: {
      bg: "bg-blue-600",
      glow: "from-blue-500/10 via-purple-500/5 to-pink-500/10",
      line: "from-blue-500 via-purple-500 to-pink-500",
      button: "bg-secondary outline-blue-600 outline-1 text-foreground hover:bg-blue-500 hover:text-white",
      buttonGlow: "shadow-blue-500/40 hover:shadow-blue-700/50",
      iconColor: "text-blue-400",
    },
    image: {
      bg: "bg-teal-600",
      glow: "from-teal-500/10 via-green-500/5 to-cyan-500/10",
      line: "from-teal-500 via-green-500 to-cyan-500",
      button: "bg-secondary outline-teal-600 outline-1 text-foreground hover:bg-teal-500 hover:text-white",
      buttonGlow: "shadow-teal-500/40 hover:shadow-teal-700/50",
      iconColor: "text-teal-400",
    },
    video: {
      bg: "bg-pink-600",
      glow: "from-pink-500/10 via-red-500/5 to-orange-500/10",
      line: "from-pink-500 via-red-500 to-orange-500",
      button: "bg-secondary outline-pink-600 outline-1 text-foreground hover:bg-pink-500 hover:text-white",
      buttonGlow: "shadow-pink-500/40 hover:shadow-pink-700/50",
      iconColor: "text-pink-400",
    },
  }

  const handleCardClick = () => {
    if (isDisabled) return

    // Add click animation
    const clickTimeline = gsap.timeline()
    clickTimeline
      .to(cardRef.current, {
        scale: 0.95,
        duration: 0.1,
      })
      .to(cardRef.current, {
        scale: 1.05,
        duration: 0.2,
        onComplete: () => {
          // Navigate to the feature page using React Router
          navigate(`/tools/${type}/${feature.id}`, {
            state: { selectedFiles },
          })
        },
      })
  }

  // Handle hover animations
  const handleMouseEnter = () => {
    if (isDisabled) return
    setIsHovered(true)

    gsap.to(cardRef.current, {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      duration: 0.3,
    })
    gsap.to(iconRef.current, {
      scale: 1.1,
      y: -5,
      duration: 0.4,
    })
    gsap.to(glowRef.current, {
      opacity: 0.8,
      duration: 0.5,
    })
    gsap.to(lineRef.current, {
      scaleX: 1,
      duration: 0.4,
      ease: "power2.out",
    })
    gsap.to(buttonRef.current, {
      opacity: 1,
      y: -5,
      scale: 1.1,
      duration: 0.3,
    })
  }

  const handleMouseLeave = () => {
    if (isDisabled) return
    setIsHovered(false)

    gsap.to(cardRef.current, {
      scale: 1,
      boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
      duration: 0.3,
    })
    gsap.to(iconRef.current, {
      scale: 1,
      y: 0,
      duration: 0.4,
    })
    gsap.to(glowRef.current, {
      opacity: 0,
      duration: 0.5,
    })
    gsap.to(lineRef.current, {
      scaleX: 0,
      duration: 0.4,
      ease: "power2.in",
    })
    gsap.to(buttonRef.current, {
      opacity: 0.8,
      y: 0,
      scale: 1,
      duration: 0.3,
    })
  }

  return (
    <div
      ref={cardRef}
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "bg-card p-5 rounded-xl shadow-md transition-all duration-300 border border-border overflow-hidden relative flex flex-col h-full",
        isDisabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:border-primary",
      )}
    >
      {/* Glow effect */}
      <div
        ref={glowRef}
        className={`absolute inset-0 bg-gradient-to-r ${colors[type].glow} opacity-0 transition-opacity duration-500`}
      />

      <div className="z-10 relative flex flex-col h-full">
        {/* Icon */}
        <div ref={iconRef} className="text-4xl mx-auto mb-3 transition-transform duration-300">
          {typeof feature.icon !== "string" ? (
            <feature.icon className={cn("text-white p-2 rounded-xl w-10 h-10", colors[type].bg)} />
          ) : (
            <span>{feature.icon}</span>
          )}
        </div>

        {/* Title */}
        <h3 ref={textRef} className="text-base font-semibold text-foreground text-center mb-2">
          {feature.name}
        </h3>

        {/* Description */}
        <p
          ref={descriptionRef}
          className="text-xs text-muted-foreground text-center mt-auto opacity-70 transition-opacity"
        >
          {feature.description}
        </p>

        {/* Button */}
        <div className="mt-4 flex justify-center">
          <button
            ref={buttonRef}
            disabled={isDisabled}
            className={cn(
              "px-3 py-1 rounded-md text-xs font-medium text-white transition-all duration-300 shadow-lg opacity-80 transform",
              colors[type].button,
              colors[type].buttonGlow,
              isDisabled ? "bg-opacity-50" : "",
            )}
          >
            {isDisabled ? `Requires ${feature.minFilesRequired} files` : "Select"}
          </button>
        </div>
      </div>

      {/* Animated bottom line */}
      <div
        ref={lineRef}
        className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${colors[type].line} transform scale-x-0 transition-transform duration-300 origin-left`}
      />
    </div>
  )
}
