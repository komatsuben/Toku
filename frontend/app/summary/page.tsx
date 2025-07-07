"use client"

import React, { useMemo } from "react"
import { FileText, Download, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useSummary } from "@/context/SummaryContext"

type Chapter = {
    id: number
    title: string
    summary: string
    fullContent: string
}

export default function SummaryPage() {
    const { summaries } = useSummary()

    const handleDownloadSummary = () => {
    if (!summaries.length) return

    const summaryText = summaries
        .map(
        (chapter) =>
            `# ${chapter.title}\n\n${chapter.fullContent}\n\n---\n\n`
        )
        .join("")

    const blob = new Blob([summaryText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "toku-summary.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    }

    return (
    <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Chapter Summaries
                </h1>
                <p className="text-gray-600">
                AI-generated summaries from your PDF document
                </p>
            </div>
            <Button
            onClick={handleDownloadSummary}
            variant="outline"
            className="shadow-sm bg-transparent"
            disabled={summaries.length === 0}
            >
            <Download className="mr-2 h-4 w-4" />
            Download Summary
            </Button>
        </div>

        {summaries.length === 0 ? (
            <p className="text-center text-gray-500">
                No summaries available. Please upload a PDF first.
            </p>
            ) : (
            <div className="space-y-4">
                {summaries.map((chapter) => (
                <ChapterCard key={chapter.id} chapter={chapter} />
                ))}
            </div>
            )}
        </div>
        </div>
    )
}

function ChapterCard({ chapter }: { chapter: Chapter }) {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <Card className="shadow-md hover:shadow-lg transition-shadow">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                <div className="text-left">
                    <CardTitle className="text-lg font-semibold text-gray-900">
                    {chapter.title}
                    </CardTitle>
                    <CardDescription className="mt-2 text-gray-600">
                    {chapter.summary}
                    </CardDescription>
                </div>
                <div className="ml-4 flex-shrink-0">
                    {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                </div>
                </div>
            </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
            <CardContent className="pt-0">
                <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-2">Full Content:</h4>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {chapter.fullContent}
                </p>
                </div>
            </CardContent>
            </CollapsibleContent>
        </Collapsible>
        </Card>
    )
}
