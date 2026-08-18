import { useEffect, useRef, useState } from "react";

interface OfferDetailsProps {
    description: string;
}

export default function OfferDetails({ description }: OfferDetailsProps) {
    const textRef = useRef<HTMLParagraphElement>(null);
    const [expanded, setExpanded] = useState(false);
    const [canExpand, setCanExpand] = useState(false);

    useEffect(() => {
        const element = textRef.current;

        if (!element) return;

        const checkOverflow = () => {
            if (expanded) {
                setCanExpand(true);
                return;
            }
            setCanExpand(element.scrollHeight > element.clientHeight);
        };

        checkOverflow();

        const observer = new ResizeObserver(checkOverflow);
        observer.observe(element);

        return () => observer.disconnect();
    }, [description, expanded]); 

    return (
        <div className="mt-2">
            <h4 className="text-sm font-semibold text-gray-900">
                Details
            </h4>

            <p
                ref={textRef}
                className={`text-xs xs:text-sm lg:text-base text-muted mt-1 ${
                    expanded ? '' : 'line-clamp-1'
                }`}
            >
                {description}
            </p>

            {canExpand && (
                <button
                    type="button"
                    onClick={() => setExpanded((prev) => !prev)}
                    className="text-primary text-xs sm:text-sm font-medium cursor-pointer"
                >
                    {expanded ? 'less' : 'more'}
                </button>
            )}
        </div>
    );
}