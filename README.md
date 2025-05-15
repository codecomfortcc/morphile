# 🧩 Morphile — The All-in-One Desktop File Converter

![Tauri](https://img.shields.io/badge/Tauri-v2-blue.svg) ![React](https://img.shields.io/badge/React-Typescript-blue.svg) ![Rust](https://img.shields.io/badge/Rust-Backend-orange.svg) ![License](https://img.shields.io/github/license/codecomfortcc/morphile)

**Morphile** is a modern, privacy-first desktop application built with Tauri + React + TypeScript + Rust that offers powerful tools to convert, compress, merge, and edit PDFs, images, and videos — all locally on your machine.

---

## ✨ Features

### 📄 PDF Tools

- Merge PDF (requires 2+ PDFs)
- Split PDF
- Compress PDF
- PDF to Word / Word to PDF
- PowerPoint to PDF / Excel to PDF
- Sign PDF
- Watermark PDF
- Rotate PDF
- Unlock / Protect PDF
- OCR PDF

### 🖼️ Image Tools

- JPG to PNG / PNG to JPG
- Merge, Compress, Resize, Crop images
- Convert to/from JPG
- Photo Editor
- Upscale Image
- Remove Background
- Watermark Image
- Rotate Image
- HTML to IMAGE

### 🎥 Video Tools

- Convert to MP3
- Video to Image Sequence
- Compress Video
- Change Frame Rate
- Video to Audio

---

## 🔍 Key Features

- **Local Processing**: No cloud, full privacy. Temporary files stored in a temp folder.
- **Dropzone Uploads**: Upload once, access multiple tools.
- **Smart Workflow**: Automatic updates to temp files. No need to re-upload.
- **Undo / Redo System**: Step back and forth on your changes.
- **Persistent Sessions**: Resume where you left off using recent edit logs.
- **Modern UI**: Built with TailwindCSS + Shadcn/UI + GSAP animations.
- **Type Safety**: Fully type-safe architecture in both frontend and backend using TypeScript and Rust.
- **Recent Edits Section**: View unsaved changes and navigate quickly.

---

## 🧠 Tech Stack

| Layer      | Tech                                            |
| ---------- | ----------------------------------------------- |
| Frontend   | React, TypeScript, TailwindCSS, Shadcn/UI, GSAP |
| Backend    | Rust (Tauri v2)                                 |
| State Mgmt | Local state + undo/redo logic                   |
| UI Routing | React Router DOM                                |

---

## 🔧 Installation

### Prerequisites

- Node.js (>= 18)
- Rust (stable)
- Cargo
- pnpm / yarn / npm

### Steps

```bash
# Clone the repo
git clone https://github.com/codecomfortcc/Morphile.git
cd Morphile

# Install dependencies
pnpm install

# Run the app
pnpm tauri dev
```
