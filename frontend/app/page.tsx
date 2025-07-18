// app/page.tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Sparkles, Scissors, Share2, Upload, Brain, Download, Github, BookOpen, Zap } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Gradient Blob */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="text-center lg:text-left">
              <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Powered PDF Analysis
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Summarize{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Smarter.
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Toku helps you break down any PDF into clean, chapter-based summaries using AI. Transform lengthy
                documents into digestible insights in seconds.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/upload">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Try Toku Now
                </Button>
                </Link>
                <Link href="#features">
                  <Button variant="ghost" size="lg" className="border border-gray-200 hover:bg-gray-50">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Side - Visual Element */}
            <div className="relative flex items-center justify-center lg:justify-end">
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full filter blur-3xl opacity-60 animate-pulse"></div>
                <div className="absolute inset-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full filter blur-2xl opacity-80"></div>
                <div className="absolute inset-8 bg-white rounded-full shadow-2xl flex items-center justify-center">
                  <FileText className="w-24 h-24 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-purple-100 text-purple-700">
              Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Powerful AI at Your Fingertips</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of document analysis with our cutting-edge AI technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">AI-Powered Summaries</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 leading-relaxed">
                  Advanced machine learning algorithms analyze your PDFs and generate intelligent, contextual summaries
                  that capture key insights.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <Scissors className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">Smart PDF Chunking</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 leading-relaxed">
                  Automatically detects and organizes content into logical chapters and sections, making complex
                  documents easy to navigate.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-pink-50 to-rose-50">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center">
                  <Share2 className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">Clean, Shareable Output</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 leading-relaxed">
                  Export beautifully formatted summaries in multiple formats. Share insights with your team or save for
                  future reference.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-green-100 text-green-700">
              How It Works
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Three Simple Steps</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Get from PDF to summary in minutes, not hours</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Upload className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Upload any PDF</h3>
              <p className="text-gray-600 leading-relaxed">
                Simply drag and drop your PDF document or click to select. Toku supports documents of any size and
                complexity.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Let Toku analyze and summarize</h3>
              <p className="text-gray-600 leading-relaxed">
                Our AI processes your document, identifying key themes, chapters, and important information to create
                comprehensive summaries.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Download className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Read & download your summary</h3>
              <p className="text-gray-600 leading-relaxed">
                Review your chapter-wise summaries in a clean, organized format. Download or share your insights
                instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Transform Your PDFs?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already summarizing smarter with Toku
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">Toku</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                AI-powered PDF summarization that transforms how you consume and understand documents.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#features" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors flex items-center">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Docs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors flex items-center">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Toku. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
