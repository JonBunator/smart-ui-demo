import {Card, SplitButton, Toolbar, ToolbarButton, ToolbarDivider,} from "@fluentui/react-components";
import {
    ArchiveRegular,
    ArrowForwardRegular,
    ArrowReplyAllRegular,
    ArrowReplyRegular,
    BroomRegular,
    ComposeRegular,
    DeleteRegular,
    FlashRegular,
    FolderArrowRightRegular,
    MoreHorizontalRegular,
    ShieldErrorRegular
} from "@fluentui/react-icons";
import "./MainToolbar.scss"

export default function MainToolbar() {
    return (
        <Card className="toolbar">
            <Toolbar>
                <SplitButton className="send-email" icon={<ComposeRegular/>} appearance="primary">Neue
                    E-Mail</SplitButton>
                <SplitButton icon={<DeleteRegular className="delete-icon"/>} appearance="subtle"></SplitButton>
                <ToolbarButton icon={<ArchiveRegular className="archive-icon"/>}></ToolbarButton>
                <ToolbarButton icon={<ShieldErrorRegular className="shield-icon"/>}></ToolbarButton>
                <ToolbarButton icon={<BroomRegular className="broom-icon"/>}></ToolbarButton>
                <SplitButton icon={<FolderArrowRightRegular className="folder-icon"/>}
                             appearance="subtle"></SplitButton>
                <ToolbarDivider/>
                <ToolbarButton className="hide-1" icon={<ArrowReplyRegular className="reply-icon"/>}></ToolbarButton>
                <ToolbarButton className="hide-1" icon={<ArrowReplyAllRegular className="reply-icon"/>}></ToolbarButton>
                <SplitButton className="hide-1" icon={<ArrowForwardRegular className="forward-icon"/>}
                             appearance="subtle"></SplitButton>
                <ToolbarDivider className="hide-1"/>
                <SplitButton className="hide-2" icon={<FlashRegular className="flash-icon"/>}>Schnellstart</SplitButton>
                <ToolbarDivider className="hide-2"/>
                <ToolbarButton icon={<MoreHorizontalRegular/>}></ToolbarButton>
            </Toolbar>
        </Card>
    );
}