"use client"
import {Link} from "@mui/material"
import LaunchIcon from '@mui/icons-material/Launch'
import "./ExternalLink.scss"
import {usePathname} from "next/navigation";

interface ExternalLinkProps {
    link: string
    href: string
    /**
     * Append href to the current path.
     */
    appendhref?: boolean
}

export default function ExternalLink(props: ExternalLinkProps) {
    const {link, href, appendhref = false} = props;
    const pathname = usePathname();
    const newHref = `${appendhref ? pathname : ""}${href}`;

    return (
        <Link className="external-link" color="inherit" rel="noopener noreferrer" target="_blank"
              href={newHref}>{link}<LaunchIcon/></Link>
    );
}