"use client";

import React, { useState, useEffect } from "react";

export function Typewriter({ text, speed = 100 }: { text: string; speed?: number }) {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text, speed]);

    return (
        <div className="relative">
            {/* Invisible placeholder to reserve space */}
            <span
                className="invisible absolute inset-0"
                aria-hidden="true"
                style={{
                    visibility: 'hidden',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word'
                }}
            >
                {text}
            </span>
            {/* Animated text */}
            <span
                className="relative"
                style={{
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word'
                }}
            >
                {displayText}
                {/* Cursor */}
                <span
                    className="inline-block w-0.5 h-[1em] bg-[color:var(--accent)] ml-1 animate-pulse"
                    style={{
                        animation: currentIndex < text.length ? 'pulse 1s infinite' : 'none'
                    }}
                />
            </span>
        </div>
    );
}
