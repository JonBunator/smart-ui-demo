"use client"
import {
    Body1,
    Toolbar,
    Button,
    Card,
    CardFooter,
    CardHeader,
    CardPreview,
    ToolbarDivider,
    ToolbarButton, SplitButton,
} from "@fluentui/react-components";
import { ComposeRegular, DeleteRegular, ShieldErrorRegular, ArchiveRegular, BroomRegular, FolderArrowRightRegular, ArrowForwardRegular, ArrowReplyAllRegular, ArrowReplyRegular, FlashRegular, MoreHorizontalRegular} from "@fluentui/react-icons";
import "./MainToolbar.scss"

export default function MainToolbar() {
    return (
        <Card className="toolbar">
            <Toolbar>
                <SplitButton className="send-email" icon={<ComposeRegular/>} appearance="primary">Neue E-Mail</SplitButton>
                <SplitButton icon={<DeleteRegular className="delete-icon"/>} appearance="subtle"></SplitButton>
                <ToolbarButton icon={<ArchiveRegular className="archive-icon"/>}></ToolbarButton>
                <ToolbarButton icon={<ShieldErrorRegular className="shield-icon"/>}></ToolbarButton>
                <ToolbarButton icon={<BroomRegular className="broom-icon"/>}></ToolbarButton>
                <SplitButton icon={<FolderArrowRightRegular className="folder-icon"/>} appearance="subtle"></SplitButton>
                <ToolbarDivider />
                <ToolbarButton icon={<ArrowReplyRegular className="reply-icon"/>}></ToolbarButton>
                <ToolbarButton icon={<ArrowReplyAllRegular className="reply-icon"/>}></ToolbarButton>
                <SplitButton icon={<ArrowForwardRegular className="forward-icon"/>} appearance="subtle"></SplitButton>
                <ToolbarDivider />
                <SplitButton icon={<FlashRegular className="flash-icon"/>}>Schnellstart</SplitButton>
                <ToolbarDivider />
                <ToolbarButton icon={<MoreHorizontalRegular/>}></ToolbarButton>
            </Toolbar>
        </Card>
    );
}