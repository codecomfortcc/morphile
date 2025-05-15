import {
  Merge,
  SplitIcon,
  Minimize2,
  FilePenIcon,
  NotepadText,
  Presentation,
  CodeIcon as ChartColumnIncreasing,
  FileImage,
  FileText,
  PenLine,
  Stamp,
  RotateCw,
  Globe,
  LockKeyholeOpen,
  LockKeyhole,
  FileScan,
  ImageIcon,
  ShuffleIcon,
  Palette,
  Eraser,
  Crop,
  Scaling,
  Clapperboard,
  Volume2,
  Film,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface Feature {
  id: string
  name: string
  icon: LucideIcon
  description: string
  minFilesRequired?: number
}

export const pdfFeatures: Feature[] = [
  {
    id: "merge-pdf",
    name: "Merge PDF",
    icon: Merge,
    description: "Combine multiple PDFs into one document",
    minFilesRequired: 2,
  },
  { id: "split", name: "Split PDF", icon: SplitIcon, description: "Extract pages or split into multiple files" },
  { id: "compress", name: "Compress PDF", icon: Minimize2, description: "Reduce file size while maintaining quality" },
  { id: "pdf2word", name: "PDF to Word", icon: FilePenIcon, description: "Convert PDFs to editable Word documents" },
  { id: "word2pdf", name: "Word to PDF", icon: NotepadText, description: "Convert Word documents to PDF format" },
  { id: "ppt2pdf", name: "PowerPoint to PDF", icon: Presentation, description: "Convert presentations to PDF format" },
  {
    id: "xlsx2pdf",
    name: "Excel to PDF",
    icon: ChartColumnIncreasing,
    description: "Convert spreadsheets to PDF format",
  },
  { id: "pdf2jpg", name: "PDF to JPG", icon: FileImage, description: "Extract images from PDF documents" },
  { id: "jpg2pdf", name: "JPG to PDF", icon: FileText, description: "Convert images to PDF format" },
  { id: "sign", name: "Sign PDF", icon: PenLine, description: "Add digital signatures to PDF files" },
  { id: "watermark", name: "Watermark", icon: Stamp, description: "Add text or image watermarks to PDFs" },
  { id: "rotate", name: "Rotate PDF", icon: RotateCw, description: "Change page orientation in PDF files" },
  { id: "html2pdf", name: "HTML to PDF", icon: Globe, description: "Convert web pages to PDF format" },
  { id: "unlock", name: "Unlock PDF", icon: LockKeyholeOpen, description: "Remove password protection from PDFs" },
  { id: "protect", name: "Protect PDF", icon: LockKeyhole, description: "Add password protection to PDF files" },
  { id: "ocr", name: "OCR PDF", icon: FileScan, description: "Make scanned documents searchable" },
]

export const imageFeatures: Feature[] = [
  {
    id: "compress",
    name: "Compress IMAGE",
    icon: Minimize2,
    description: "Reduce image file size without losing quality",
  },
  { id: "resize", name: "Resize IMAGE", icon: Scaling, description: "Change image dimensions easily" },
  { id: "crop", name: "Crop IMAGE", icon: Crop, description: "Cut unwanted parts from images" },
  { id: "convert2jpg", name: "Convert to JPG", icon: ImageIcon, description: "Convert images to JPG format" },
  {
    id: "convert-from-jpg",
    name: "Convert from JPG",
    icon: ShuffleIcon,
    description: "Convert JPG to other image formats",
  },
  { id: "editor", name: "Photo Editor", icon: Palette, description: "Edit and enhance your images" },
  { id: "remove-bg", name: "Remove Background", icon: Eraser, description: "Create transparent background images" },
  { id: "watermark", name: "Watermark IMAGE", icon: Stamp, description: "Add text or image watermarks" },
  { id: "rotate", name: "Rotate IMAGE", icon: RotateCw, description: "Change image orientation" },
  { id: "html2img", name: "HTML to IMAGE", icon: Globe, description: "Convert web pages to image format" },
]

export const videoFeatures: Feature[] = [
  { id: "convert", name: "Video Converter", icon: Clapperboard, description: "Convert between video formats" },
  { id: "sequence-gen", name: "Video to Image Sequence", icon: ImageIcon, description: "Extract frames from videos" },
  { id: "compress", name: "Video Compressor", icon: Minimize2, description: "Reduce video file size" },
  { id: "vid2aud", name: "Video to Audio", icon: Volume2, description: "Extract audio from video files" },
  { id: "change-frame-rate", name: "Change Frame Rate", icon: Film, description: "Adjust video frame rate" },
]
