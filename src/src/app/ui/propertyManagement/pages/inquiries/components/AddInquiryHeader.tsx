"use client"
import React, {useEffect, useState} from "react";
import {
    Divider,
    Tooltip,
    Typography,
    IconButton
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SmartPasteButton from "@/app/ui/components/SmartPasteButton";
import {getAISupportForCurrentUseCase} from "@/lib/db/database";
import {AISupport} from "@prisma";
import {usePathname, useRouter} from "next/navigation";
import "./AddInquiryHeader.scss"

interface AddInquiryHeaderProps {
    /**
     * Content displayed in the title
     */
    titleContent: React.ReactNode;
}

export default function AddInquiryHeader(props: AddInquiryHeaderProps) {
    const {titleContent} = props;
    const router = useRouter();
    const pathname = usePathname();
    const [showSmartPasteButton, setShowSmartPasteButton] = useState(false);

    useEffect(() => {
        getAISupportForCurrentUseCase()
            .then(aiSupport => setShowSmartPasteButton(aiSupport === AISupport.PROACTIVE_AGENT || aiSupport === AISupport.AGENT ))
    }, []);

    function navigateToParentPage() {
        const parentPath = pathname.substring(0, pathname.lastIndexOf('/'));
        router.push(parentPath);
    }

    return (
        <div className="add-inquiry-header">
            <div className="header-row">
                <IconButton onClick={navigateToParentPage}><ArrowBackIcon fontSize="large"/></IconButton>
                <Typography variant="h6">
                    {titleContent}
                </Typography>
                <div className="spacer"/>
                {showSmartPasteButton &&
                    <Tooltip title="Intelligentes Ausfüllen aus der Zwischenablage">
                        <SmartPasteButton>Ausfüllen</SmartPasteButton>
                    </Tooltip>
                }
            </div>
            <Divider/>
        </div>
    );
}