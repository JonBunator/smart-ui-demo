import {Typography} from "@mui/material";
import Image from "next/image";
import FrameLayout from "@/app/ui/propertyManagement/layoutComponents/FrameLayout";
import "./FrameLayoutTextImage.scss"

interface FrameLayoutTextImageProps {
    text: string;
    imagePath: string;
    blurUrl: string;
}

export default function FrameLayoutTextImage(props: FrameLayoutTextImageProps) {
    const {text, imagePath, blurUrl} = props;
    return (
        <FrameLayout>
            <div className="frame-layout-text-image">
                <Typography variant="h5">{text}</Typography>
                <Image src={imagePath} width={700} height={700} alt="" placeholder="blur" blurDataURL={blurUrl}/>
            </div>
        </FrameLayout>
    );
}