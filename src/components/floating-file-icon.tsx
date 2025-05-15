import { useRef, useEffect } from "react"
import { FileText, Image, Video } from 'lucide-react'
import gsap from "gsap"
import type { ActiveTabType } from "@/pages/home"

interface FloatingFileIconProps {
  activeTab: ActiveTabType
  delay: number
}

export function FloatingFileIcon({ activeTab, delay }: FloatingFileIconProps) {
  const iconRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (iconRef.current) {
      const randomX = (Math.random() - 0.5) * 120
      const randomY = (Math.random() - 0.5) * 120
      const randomRotate = (Math.random() - 0.5) * 60
      
      // Initial animation
      gsap.fromTo(
        iconRef.current,
        { 
          scale: 0, 
          opacity: 0, 
          x: 0, 
          y: 0, 
          rotate: 0 
        },
        {
          scale: 0.7 + Math.random() * 0.4,
          opacity: 0.7 + Math.random() * 0.3,
          x: randomX,
          y: randomY,
          rotate: randomRotate,
          duration: 0.8,
          ease: "elastic.out(1, 0.75)",
          delay: delay * 0.1
        }
      )
      
      // Add floating animation
      gsap.to(iconRef.current, {
        y: `+=${(Math.random() - 0.5) * 30}`,
        x: `+=${(Math.random() - 0.5) * 30}`,
        rotate: `+=${(Math.random() - 0.5) * 20}`,
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })
    }
    
    return () => {
      if (iconRef.current) {
        gsap.killTweensOf(iconRef.current)
      }
    }
  }, [delay])

  let Icon
  let colorClass
  
  switch (activeTab) {
    case 'pdf':
      Icon = FileText
      colorClass = "text-blue-400"
      break
    case 'image':
      Icon = Image
      colorClass = "text-teal-400"
      break
    case 'video':
      Icon = Video
      colorClass = "text-pink-400"
      break
    default:
      Icon = FileText
      colorClass = "text-blue-400"
  }

  return (
    <div
      ref={iconRef}
      className="absolute z-20"
      style={{ top: `calc(50% - 14px)`, left: `calc(50% - 14px)` }}
    >
      <Icon size={28} className={`${colorClass} filter drop-shadow-md`} />
    </div>
  )
}
