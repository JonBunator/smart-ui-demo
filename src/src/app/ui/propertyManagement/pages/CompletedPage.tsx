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
                                    imagePath="/image/cat-completed.png"/>
        </>
    );
}