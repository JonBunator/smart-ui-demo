import React from "react";
import {Typography,} from "@mui/material";
import "./InquiryPageLayout.scss"

interface InquiryPageLayoutProps {
    /**
     * Title of the page
     */
    title: string;
    /**
     * Button element.
     */
    buttonContent: React.ReactNode;
    className?: string;
    children: React.ReactNode;
}

export default function InquiryPageLayout(props: InquiryPageLayoutProps) {
    const {title, buttonContent, children, className} = props;

    return (
        <div className={`inquiry-page ${className ?? ''}`}>
            <div className="header-row">
                <Typography variant="h6">
                    {title}
                </Typography>
                {buttonContent}
            </div>
            {children}
        </div>
    );
}