"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, Loader2, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useSummary } from "@/context/SummaryContext"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { setSummaries } = useSummary()
  const router = useRouter()

  const [isDragging, setIsDragging] = useState(false)

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile)
    } else {
      alert("Please upload a valid PDF file.")
    }
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0]
    if (uploadedFile) setFile(uploadedFile)
  }

  const handleUpload = async () => {
    if (!file) return

    setIsLoading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("http://localhost:5000/api/summarize", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Upload failed")

      const data = await response.json()

      // Assume: data = [{ id, title, summary, fullContent }]
      setSummaries(data)
      router.push("/summary")
    } catch (error) {
      console.error("Upload error:", error)
      alert("Failed to summarize PDF.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center p-4 min-h-[calc(100vh-4rem)]">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center px-6 py-5">
              <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Upload Your PDF</CardTitle>
              <CardDescription>Upload a PDF document to generate AI-powered chapter summaries</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 px-6 py-6">
            <div className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragging
                    ? "border-blue-500 bg-blue-50"
                    : file
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 hover:border-gray-400"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDragLeave}
                onDragOver={handleDrag}
                onDrop={handleDrop}>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={isLoading}
                  />
                  <div className="space-y-2">
                  <Upload className={`mx-auto w-12 h-12 ${file ? "text-green-500" : "text-gray-400"}`} />
                  <div className="text-sm">
                    {file ? (
                      <p className="text-green-600 font-medium">{file.name}</p>
                    ) : (
                      <>
                        <p className="text-gray-600">
                          <span className="font-medium">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-gray-500">PDF files only</p>
                      </>
                    )}
                  </div>
                </div>
            </div>

            <Button onClick={handleUpload} disabled={!file || isLoading} className="w-full" size="lg">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing PDF...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
          </CardContent>
        </Card>
    </div>
  )
}
