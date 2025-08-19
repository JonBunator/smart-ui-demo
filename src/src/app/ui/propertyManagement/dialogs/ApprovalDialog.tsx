"use client"
import React from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import "./ApprovalDialog.scss"

interface ApprovalDialogProps extends Omit<DialogProps, 'title' | 'content'> {
    /**
     * When true, dialog is open.
     */
    open: boolean
    /**
     * Invoked when the dialog is approved.
     */
    onApprove?: () => void
    /**
     * Title of the approval button.
     */
    approvalTitle?: string
    /**
     * Invoked when the dialog is closed or cancel button is clicked.
     */
    onClose?: () => void
    /**
     * When false, the dialog can't be closed. Only approval is possible.
     */
    closable?: boolean
    /**
     * When true, approval button is disabled.
     */
    buttonDisabled?: boolean
    /**
     * Text at the side of approval button.
     */
    approvalButtonSideText?: string
    /**
     * Title of the dialog.
     */
    title?: React.ReactNode
    /**
     * Content of the dialog.
     */
    content?: React.ReactNode
}

export default function ApprovalDialog(props: ApprovalDialogProps) {
    const { open, onApprove, onClose, closable = true, buttonDisabled = false, approvalTitle, approvalButtonSideText, title, content, ...dialogProps } = props;

    return (
        <Dialog className="approval-dialog" open={open} onClose={closable ? onClose : undefined} {...dialogProps}>
            {title && <DialogTitle>{title}</DialogTitle>}
            <DialogContent>
                {content}
            </DialogContent>
            <DialogActions className="dialog-actions">
                {approvalButtonSideText !== undefined && <Typography color="textSecondary">{approvalButtonSideText}</Typography>}
                <Button onClick={onApprove} disabled={buttonDisabled} variant="contained">{approvalTitle ?? "Starten"}</Button>
            </DialogActions>
        </Dialog>
    );
}