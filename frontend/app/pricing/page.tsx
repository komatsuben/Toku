"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { FileText, Check, X, Zap, FileCheck, Brain, GraduationCap, ChevronDown, Star, Clock } from "lucide-react"
import { useState } from "react"

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <section className="py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-200">
                <Star className="w-3 h-3 mr-1" />
                Powered by Groq AI
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Smarter Reading{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Starts Here
                </span>
            </h1>

            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Toku turns textbooks and notes into instant summaries with AI — save hours every week.
            </p>
            </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Free Trial */}
                <Card className="border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 relative">
                <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Free Trial</CardTitle>
                    <CardDescription className="text-gray-600">Perfect for trying out Toku</CardDescription>
                    <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">Free</span>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                    <div className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">1 free summary</span>
                    </div>
                    <div className="flex items-center">
                        <X className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
                        <span className="text-gray-500">No export</span>
                    </div>
                    <div className="flex items-center">
                        <X className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
                        <span className="text-gray-500">No history</span>
                    </div>
                    </div>
                    <Button className="w-full mt-6 bg-transparent" variant="outline">
                    Try for Free
                    </Button>
                </CardContent>
                </Card>

                {/* Pay As You Go */}
                <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 relative shadow-lg">
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white">
                    Most Popular
                </Badge>
                <CardHeader className="text-center pb-8 pt-8">
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Pay As You Go</CardTitle>
                    <CardDescription className="text-gray-600">Perfect for occasional use</CardDescription>
                    <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">Rp 500</span>
                    <span className="text-gray-600 ml-2">/ summary</span>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                    <div className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">Unlimited summaries</span>
                    </div>
                    <div className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">Export to PDF</span>
                    </div>
                    <div className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">Basic support</span>
                    </div>
                    </div>
                    <Button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Start Summarizing
                    </Button>
                </CardContent>
                </Card>

                {/* Toku Pro */}
                <Card className="border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 relative">
                <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Toku Pro</CardTitle>
                    <CardDescription className="text-gray-600">For power users and students</CardDescription>
                    <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">Rp 25,000</span>
                    <span className="text-gray-600 ml-2">/ month</span>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                    <div className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">100 summaries/month</span>
                    </div>
                    <div className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">Export & History</span>
                    </div>
                    <div className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">Priority AI speed</span>
                    </div>
                    <div className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">Premium support</span>
                    </div>
                    </div>
                    <Button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Go Pro
                    </Button>
                </CardContent>
                </Card>
            </div>
            </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-white/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why Choose Toku?</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Built specifically for students and knowledge workers who value their time
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                    <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast & Accurate Summaries</h3>
                <p className="text-gray-600 text-sm">Get comprehensive summaries in seconds, not hours of reading</p>
                </div>

                <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <FileCheck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Supports Any PDF</h3>
                <p className="text-gray-600 text-sm">
                    Works with textbooks, research papers, notes, and any PDF document
                </p>
                </div>

                <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center">
                    <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Powered by Groq (LLaMA 3)</h3>
                <p className="text-gray-600 text-sm">Latest AI technology ensures high-quality, contextual summaries</p>
                </div>

                <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Student-Friendly Pricing</h3>
                <p className="text-gray-600 text-sm">Affordable plans designed with students and researchers in mind</p>
                </div>
            </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <p className="text-xl text-gray-600">Everything you need to know about Toku</p>
                </div>

                <div className="space-y-4">
                <FAQItem
                    question="Can I cancel anytime?"
                    answer="Yes! You can cancel your subscription at any time. For Pay As You Go, there's no subscription to cancel. For Toku Pro, you can cancel and still use the service until the end of your billing period."
                />

                <FAQItem
                    question="What if my file is scanned?"
                    answer="Toku works with both text-based and scanned PDFs. Our AI can process scanned documents using OCR technology, though text-based PDFs will generally provide faster and more accurate results."
                />

                <FAQItem
                    question="Can I summarize textbooks?"
                    answer="Toku is specifically designed for academic content including textbooks, research papers, lecture notes, and study materials. It excels at breaking down complex academic content into digestible summaries."
                />

                <FAQItem
                    question="How accurate are the summaries?"
                    answer="Our summaries are powered by Groq's LLaMA 3 model, which provides highly accurate and contextual summaries. However, we always recommend reviewing the summaries and referring back to the original document for critical information."
                />

                <FAQItem
                    question="Is there a file size limit?"
                    answer="Free trial users can upload files up to 10MB. Pay As You Go and Pro users can upload files up to 50MB. For larger files, please contact our support team."
                />
                </div>
            </div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Start Summarizing?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of students and professionals who save hours every week with Toku
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                size="lg"
                variant="secondary"
                className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                <Clock className="w-4 h-4 mr-2" />
                Try Free Now
                </Button>
                <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-200 bg-transparent"
                >
                View Demo
                </Button>
            </div>
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
                    AI-powered PDF summarization that transforms how students and professionals consume information.
                </p>
                </div>

                <div>
                <h3 className="font-semibold mb-4">Product</h3>
                <ul className="space-y-2 text-gray-400">
                    <li>
                    <a href="#" className="hover:text-white transition-colors">
                        Pricing
                    </a>
                    </li>
                    <li>
                    <a href="#" className="hover:text-white transition-colors">
                        Features
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
                <h3 className="font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-gray-400">
                    <li>
                    <a href="#" className="hover:text-white transition-colors">
                        Help Center
                    </a>
                    </li>
                    <li>
                    <a href="#" className="hover:text-white transition-colors">
                        Contact
                    </a>
                    </li>
                    <li>
                    <a href="#" className="hover:text-white transition-colors">
                        Status
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
    )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Card className="border border-gray-200 hover:border-gray-300 transition-colors">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                <CardTitle className="text-left text-lg font-semibold text-gray-900">{question}</CardTitle>
                <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </div>
            </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
            <CardContent className="pt-0">
                <p className="text-gray-600 leading-relaxed">{answer}</p>
            </CardContent>
            </CollapsibleContent>
        </Collapsible>
        </Card>
    )
}
