"use client"

import React, { createContext, useContext, useState } from "react"

type Chapter = {
    id: number
    title: string
    summary: string
    fullContent: string
}

type SummaryContextType = {
    summaries: Chapter[]
    setSummaries: React.Dispatch<React.SetStateAction<Chapter[]>>
}

const SummaryContext = createContext<SummaryContextType | undefined>(undefined)

export const SummaryProvider = ({ children }: { children: React.ReactNode }) => {
    const [summaries, setSummaries] = useState<Chapter[]>([])
    return (
        <SummaryContext.Provider value={{ summaries, setSummaries }}>
            {children}
        </SummaryContext.Provider>
    )
}

export const useSummary = () => {
    const context = useContext(SummaryContext)
    if (!context) throw new Error("useSummary must be used within a SummaryProvider")
    return context
}
