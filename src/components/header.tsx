import { useEffect, useRef } from "react"
import gsap from "gsap"

export function Header() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const glowRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()
    
    if (titleRef.current && subtitleRef.current && glowRef.current) {
      tl.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }
      )
      .fromTo(
        titleRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=1"
      )
      .fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.6"
      )
    }

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div className="relative">
      <div className="flex w-full items-center justify-center mt-20">
        <span
          ref={glowRef}
          className="absolute mx-auto py-4 flex border-0 w-fit bg-gradient-to-r blur-xl from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-4xl box-content font-extrabold text-transparent text-center select-none uppercase"
        >
          Morphilie
        </span>
        <h1
          ref={titleRef}
          className="relative top-0 w-fit h-auto py-4 justify-center flex bg-gradient-to-r items-center from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-5xl font-extrabold text-transparent text-center select-auto"
        >
          Morphilie
        </h1>
      </div>
      <p
        ref={subtitleRef}
        className="text-center mt-4 font-semibold text-secondary-foreground"
      >
        A Free Open Source RUST-based File Converter
      </p>
    </div>
  )
}
