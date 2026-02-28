"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
    startOnLoad: true,
    theme: "dark",
    securityLevel: "loose",
    fontFamily: "var(--font-sans)",
});

interface MermaidProps {
    chart: string;
}

export function Mermaid({ chart }: MermaidProps) {
    const [svgImage, setSvgImage] = useState<string>("");
    const ref = useRef<HTMLDivElement>(null);
    const id = useRef(`mermaid-${Math.random().toString(36).substring(2, 9)}`);

    useEffect(() => {
        const renderChart = async () => {
            if (chart) {
                try {
                    const { svg } = await mermaid.render(id.current, chart);
                    setSvgImage(svg);
                } catch (error) {
                    console.error("Mermaid rendering failed:", error);
                    setSvgImage(`<p class="text-red-500">Failed to render Mermaid diagram.</p>`);
                }
            }
        };

        renderChart();
    }, [chart]);

    // Use a wrapper div to contain the SVG content
    return (
        <div
            ref={ref}
            className="w-full flex justify-center my-8 overflow-x-auto bg-[#0d1117] p-8 border border-white/10 rounded-xl shadow-xl"
            dangerouslySetInnerHTML={{ __html: svgImage }}
        />
    );
}
