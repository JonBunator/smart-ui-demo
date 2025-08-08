import {Typography} from "@mui/material";
import Image from "next/image";
import FrameLayout from "@/app/ui/propertyManagement/layoutComponents/FrameLayout";
import "./FrameLayoutTextImage.scss"

interface FrameLayoutTextImageProps {
    text: string;
    subText?: string
    imagePath: string;
    blurUrl: string;
}

export default function FrameLayoutTextImage(props: FrameLayoutTextImageProps) {
    const {text, subText, imagePath, blurUrl} = props;
    return (
        <FrameLayout>
            <div className="frame-layout-text-image">
                <div className="text-content">
                    <Typography variant="h5">{text}</Typography>
                    {subText && <Typography variant="h6">{subText}</Typography>}
                </div>
                <Image src={imagePath} width={700} height={700} alt="" placeholder="blur" blurDataURL={blurUrl}/>
            </div>
        </FrameLayout>
    );
}