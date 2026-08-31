import { useEffect, useRef, useState } from "react";

interface Props {
    description: string;
}

export default function OfferModalDetails({ description }: Props) {
    const [expanded, setExpanded] = useState(false);
    const [canExpand, setCanExpand] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);
 
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
            <h4 className="text-xs font-semibold text-gray-900">Details</h4>
            <p
                ref={textRef}
                className={`text-[10px] text-gray-600 ${expanded ? '' : 'line-clamp-1'}`}
            >
                {description}
            </p>
            {canExpand && (
                <button
                    type="button"
                    onClick={() => setExpanded((v) => !v)}
                    className="text-primary text-[10px] font-medium cursor-pointer"
                >
                    {expanded ? 'less' : 'more'}
                </button>
            )}
        </div>
    );
}
