"use client"
import React, {useEffect, useState} from "react";
import {Breadcrumbs, Divider, IconButton, Link, Tooltip, Typography} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SmartPasteButton from "@/app/ui/components/SmartPasteButton";
import {getAISupportForCurrentSurveyStep} from "@/lib/db/database";
import {AISupport} from "@/lib/types"
import {usePathname, useRouter} from "next/navigation";
import {useSnackbar} from "@/app/ui/providers/SnackbarProvider";
import "./AddInquiryHeader.scss"

interface AddInquiryHeaderProps {
    /**
     * Content displayed in the title
     */
    titleContent: React.ReactNode;
    /**
     * Parent page title.
     */
    title: string;
}

export default function AddInquiryHeader(props: AddInquiryHeaderProps) {
    const {titleContent, title} = props;
    const router = useRouter();
    const pathname = usePathname();
    const [showSmartPasteButton, setShowSmartPasteButton] = useState(false);
    const parentPath = pathname.substring(0, pathname.lastIndexOf('/'));
    const {error} = useSnackbar();

    useEffect(() => {
        getAISupportForCurrentSurveyStep()
            .then(aiSupport => setShowSmartPasteButton(aiSupport === AISupport.PROACTIVE_AGENT || aiSupport === AISupport.AGENT))
            .catch(() => error())
    }, [error]);

    function navigateToParentPage() {
        router.push(parentPath);
    }

    return (
        <div className="add-inquiry-header">

            <div className="header-row">
                <IconButton onClick={navigateToParentPage}><ArrowBackIcon sx={{color: 'text.secondary'}}
                                                                          fontSize="large"/></IconButton>
                <Breadcrumbs>
                    <Link
                        underline="hover"
                        color="inherit"
                        href={parentPath}
                        variant="h6"
                    >
                        {title}
                    </Link>
                    <Typography variant="h6" sx={{color: 'text.primary'}}>
                        {titleContent}
                    </Typography>
                </Breadcrumbs>
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