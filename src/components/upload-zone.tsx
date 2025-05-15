
import type React from "react"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { useDropzone, type Accept } from "react-dropzone"
import { Upload, FileUp, XCircle } from 'lucide-react'
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { FloatingFileIcon } from "@/components/floating-file-icon"
import type { ActiveTabType } from "@/pages/home"

interface UploadZoneProps {
  activeTab: ActiveTabType
  files: File[]
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
}

export function UploadZone({ activeTab, files, setFiles }: UploadZoneProps) {
  const uploadRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const iconContainerRef = useRef<HTMLDivElement | null>(null)
  const textContainerRef = useRef<HTMLDivElement | null>(null)
  const progressCircleRef = useRef<SVGCircleElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [uploading, setUploading] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [textKey, setTextKey] = useState(0)

  // Handle file drop
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return

      // Prevent default form submission behavior
      if (event) {
        event.preventDefault()
      }

      // Set files and start upload animation
      setFiles(acceptedFiles)
      setUploading(true)

      // Animate progress circle
      gsap.fromTo(
        progressCircleRef.current,
        { strokeDashoffset: 283 },
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.inOut",
          onComplete: () => {
            setTimeout(() => {
              setUploading(false)
              // Don't clear files here to allow them to be used with feature cards
              if (progressCircleRef.current) {
                gsap.set(progressCircleRef.current, { strokeDashoffset: 283 })
              }
            }, 800)
          },
        },
      )
    },
    [setFiles],
  )

  // Configure accepted file types based on active tab
  const acceptConfig = useMemo((): Accept => {
    switch (activeTab) {
      case "pdf":
        return { "application/pdf": [".pdf"] }
      case "image":
        return { "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp", ".bmp", ".tiff"] }
      case "video":
        return { "video/*": [".mp4", ".mov", ".avi", ".webm", ".mkv", ".flv"] }
    }
  }, [activeTab])

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: acceptConfig,
    noClick: uploading,
    noKeyboard: uploading,
    preventDropOnDocument: true, // Prevent browser from opening files
  })

  // Theme configuration based on active tab
  const theme = useMemo(() => {
    switch (activeTab) {
      case "image":
        return {
          gradientColors: "from-teal-500/20 to-teal-700/10",
          iconColorClass: "text-teal-400",
          strokeColorClass: "stroke-teal-400",
          borderActiveColor: "border-teal-500",
          activeGlow: "shadow-teal-500/30",
          buttonColor: "bg-teal-600 hover:bg-teal-500",
          buttonGlow: "shadow-teal-500/40 hover:shadow-teal-700/50",
        }
      case "video":
        return {
          gradientColors: "from-pink-500/20 to-pink-700/10",
          iconColorClass: "text-pink-400",
          strokeColorClass: "stroke-pink-400",
          borderActiveColor: "border-pink-500",
          activeGlow: "shadow-pink-500/30",
          buttonColor: "bg-pink-600 hover:bg-pink-500",
          buttonGlow: "shadow-pink-500/40 hover:shadow-pink-700/50",
        }
      case "pdf":
      default:
        return {
          gradientColors: "from-blue-500/20 to-blue-700/10",
          iconColorClass: "text-blue-400",
          strokeColorClass: "stroke-blue-400",
          borderActiveColor: "border-blue-500",
          activeGlow: "shadow-blue-500/30",
          buttonColor: "bg-blue-600 hover:bg-blue-500",
          buttonGlow: "shadow-blue-500/40 hover:shadow-blue-700/50",
        }
    }
  }, [activeTab])

  // Initial animation and hover effects
  useEffect(() => {
    const uploadElement = uploadRef.current
    if (!uploadElement) return

    // Initial entrance animation
    gsap.fromTo(
      uploadElement,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.3 },
    )

    // Hover animations
    const handleMouseEnter = () => {
      if (!isDragActive && !uploading) {
        setIsHovering(true)
        gsap.to(uploadElement, {
          scale: 1.015,
          boxShadow: `0 0 20px rgba(var(--${theme.activeGlow.split("-")[1].split("/")[0]}), 0.2)`,
          duration: 0.3,
        })
      }
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
      if (!isDragActive && !uploading) {
        gsap.to(uploadElement, {
          scale: 1,
          boxShadow: "0 0 0px rgba(0,0,0,0)",
          duration: 0.3,
        })
      }
    }

    uploadElement.addEventListener("mouseenter", handleMouseEnter)
    uploadElement.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      uploadElement.removeEventListener("mouseenter", handleMouseEnter)
      uploadElement.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isDragActive, uploading, theme.activeGlow])

  // Drag state animations
  useEffect(() => {
    const uploadElement = uploadRef.current
    const iconElement = iconContainerRef.current
    if (!uploadElement || !iconElement) return

    if (isDragActive) {
      gsap.to(uploadElement, {
        scale: 1.03,
        boxShadow: `0 0 35px ${isDragReject ? "rgba(239, 68, 68, 0.4)" : "rgba(var(--" + theme.activeGlow.split("-")[1].split("/")[0] + "), 0.4)"}`,
        borderColor: isDragReject ? "rgb(239, 68, 68)" : `rgb(var(--${theme.borderActiveColor.split("-")[1]}))`,
        duration: 0.3,
      })

      gsap.to(contentRef.current, { scale: 1.02, duration: 0.3 })

      gsap.to(iconElement, {
        scale: 1.25,
        y: -8,
        rotate: isDragReject ? "15deg" : isDragAccept ? "-5deg" : "0deg",
        duration: 0.4,
        ease: "back.out(2)",
      })
    } else if (!isHovering) {
      gsap.to(uploadElement, {
        scale: 1,
        boxShadow: "0 0 0px rgba(0,0,0,0)",
        borderColor: "rgb(var(--border))",
        duration: 0.3,
      })

      gsap.to(contentRef.current, { scale: 1, duration: 0.3 })

      gsap.to(iconElement, {
        scale: 1,
        y: 0,
        rotate: "0deg",
        duration: 0.4,
        ease: "back.out(1.7)",
      })
    }
  }, [isDragActive, isDragAccept, isDragReject, theme, isHovering])

  // Text content for instructions
  const mainTextContent = useMemo(() => {
    if (isDragActive) {
      return isDragReject ? "Unsupported file type" : "Drop to upload files!"
    }
    return `Drop your ${activeTab} files here`
  }, [isDragActive, isDragReject, activeTab])

  const subTextContent = useMemo(() => {
    if (isDragActive) {
      return isDragReject ? "Please drop only supported file types." : `Ready to accept ${activeTab} files.`
    }

    switch (activeTab) {
      case "pdf":
        return "Modify or convert PDFs to other formats."
      case "image":
        return "Edit, compress, or convert images."
      case "video":
        return "Convert, compress, or extract video content."
      default:
        return ""
    }
  }, [isDragActive, isDragReject, activeTab])

  // Animate text changes
  useEffect(() => {
    setTextKey((prevKey) => prevKey + 1)

    if (textContainerRef.current) {
      gsap.fromTo(
        textContainerRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
      )
    }
  }, [mainTextContent, subTextContent])

  // Handle button click to trigger file input
  const handleSelectFilesClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    
    if (!uploading && fileInputRef.current) {
      // Use dispatchEvent instead of click() for better TypeScript compatibility
      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      })
      fileInputRef.current.dispatchEvent(event)
    }
  }

  return (
    <div
      ref={uploadRef}
      {...getRootProps()}
      className={cn(
        "max-w-2xl mx-auto mt-8 mb-16 border-2 border-dashed rounded-xl p-10 cursor-pointer group transition-all duration-300 relative overflow-hidden",
        isDragActive
          ? isDragReject
            ? "border-red-500"
            : theme.borderActiveColor
          : "border-border hover:border-border/80",
        "bg-gradient-to-r",
        theme.gradientColors,
        uploading && "pointer-events-none",
      )}
      onClick={(e) => {
        // Prevent default behavior to avoid form submission
        e.preventDefault()
        // Only trigger dropzone click if not uploading
        if (!uploading) {
          getRootProps().onClick?.(e)
        }
      }}
    >
      <input {...getInputProps()} ref={fileInputRef} />

      {/* Drag effect background */}
      {isDragActive && (
        <div className="absolute inset-0 z-0">
          <div
            className={`absolute inset-0 bg-gradient-to-r ${
              isDragReject
                ? "from-red-500/10 via-red-600/10 to-red-700/10"
                : activeTab === "pdf"
                  ? "from-blue-500/10 via-purple-500/10 to-pink-500/10"
                  : activeTab === "image"
                    ? "from-teal-500/10 via-green-500/10 to-cyan-500/10"
                    : "from-pink-500/10 via-red-500/10 to-orange-500/10"
            } animate-pulse opacity-75`}
          />
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 ${
              isDragReject ? "bg-red-500/20" : `bg-${theme.iconColorClass.split("-")[1]}/20`
            } rounded-full animate-ping opacity-60`}
          />
        </div>
      )}

      <div
        ref={contentRef}
        className="flex flex-col items-center justify-center text-center transition-transform duration-300 relative z-10"
      >
        {uploading ? (
          <div className="relative flex flex-col items-center">
            <svg className="w-20 h-20" viewBox="0 0 100 100">
              <circle
                className="text-gray-700"
                strokeWidth="7"
                stroke="currentColor"
                fill="transparent"
                r="45"
                cx="50"
                cy="50"
              />
              <circle
                ref={progressCircleRef}
                className={theme.strokeColorClass}
                strokeWidth="7"
                strokeDasharray="283"
                strokeDashoffset="283"
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="45"
                cx="50"
                cy="50"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-md font-medium text-foreground">
              {files.length} {files.length === 1 ? "file" : "files"}
            </span>
            <p className="text-foreground font-medium mt-5 text-lg">Processing...</p>
          </div>
        ) : (
          <div key={textKey} ref={textContainerRef} className="flex flex-col items-center">
            <div
              ref={iconContainerRef}
              className={`${theme.iconColorClass} mb-4 transition-all duration-300 transform group-hover:scale-105`}
            >
              {isDragActive ? (
                isDragReject ? (
                  <XCircle size={48} className="transition-transform duration-300" />
                ) : (
                  <FileUp size={48} className="transition-transform duration-300" />
                )
              ) : (
                <Upload size={48} className="transition-transform duration-300" />
              )}
            </div>
            <h3 className="font-semibold text-xl text-foreground mb-2">{mainTextContent}</h3>
            <p className="text-muted-foreground mb-5 max-w-md text-sm">{subTextContent}</p>
            <button
              type="button"
              className={cn(
                "px-8 py-3 rounded-lg text-sm font-medium text-white transition-all duration-300 shadow-lg transform group-hover:-translate-y-0.5",
                theme.buttonColor,
                theme.buttonGlow,
                isDragActive && (isDragAccept ? "scale-105" : "opacity-70"),
              )}
              onClick={handleSelectFilesClick}
            >
              Or Select Files
            </button>
          </div>
        )}
      </div>

      {/* Floating file icons during upload */}
      {uploading && files.map((_file, index) => <FloatingFileIcon key={index} activeTab={activeTab} delay={index} />)}
    </div>
  )
}
