"use client"
import React, {useState, useEffect} from "react";
import Confetti from 'react-confetti'
import FrameLayoutTextImage from "@/app/ui/propertyManagement/layoutComponents/FrameLayoutTextImage";

export default function CompletedPage() {
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    });

    function updateWindowSize() {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }

    useEffect(() => {
        updateWindowSize();
        const handleResize = () => {
            updateWindowSize();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <>
            <Confetti
                width={windowSize.width}
                height={windowSize.height}
                numberOfPieces={50}
            />
            <FrameLayoutTextImage text="Die Umfrage wurde erfolgreich abgeschlossen. Vielen Dank für die Teilnahme!"
                                    imagePath="/image/cat-completed.png" blurUrl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAATCAMAAACnUt2HAAAAilBMVEUUFQ8YGBISEgwHCgkeHBW/v7crJyEjIBmjopyIgXcxLSY5LyJjWlCQioELDgutrqZEPjY4NCwoJBzHxr+2t7CTj4ehnZRoYFZxa2JWTkW6urJFOi+wsam1tKxeU0iFfG4DBASOhnmYlIunp6GcmI9SQjJ4cWjNzcaspJtNRz52aFuCdGd9eG9PPS5Ze2OMAAABJElEQVQY0xWQV5KFMAwE5RwAY5Nzzry9//XW6E9drZopgZTrcoRRhCCggDEGBBg8LCr7WxAW9EOeYVhXOQ/BsWi/eyIEBoBNPcMfV+svvJ1ObFEDRRDuu7aujH7HFpXlFX8X0AYOWdG+9bBKyyPlRQ9bLfhUFUOeslAMtUE+3zrAE1JXHF3n6IbQIAq+nTGTzpf+LPpTHtUnAmADaJ+XMbuuk3XKZ1MwYJJ9L7dqLGTfsFjTRAAB3Ia1m+dHFVkTpznnHAyhwf2Os6qfKt+atOPIm0QktdqyLl+KmDGW3kZ409BQRV2fsfRMWZ+WmH6Q+M/JLmtYw1jW35TCgMjkchl3sc+Wx2hbnsDzOkJ0papS5SVHgZ8Eyne2XwXONSJCI5T88X9xgRgjxS5H3AAAAABJRU5ErkJggg=="/>
        </>
    );
}