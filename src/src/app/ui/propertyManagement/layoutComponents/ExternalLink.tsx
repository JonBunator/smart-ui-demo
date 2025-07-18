import {Link} from "@mui/material"
import LaunchIcon from '@mui/icons-material/Launch'
import "./ExternalLink.scss"

interface ExternalLinkProps {
    link: string
    href: string
}

export default function ExternalLink(props: ExternalLinkProps) {
    const {link, href} = props;
    return (
        <Link className="external-link" color="inherit" href={href}>{link}<LaunchIcon/></Link>
    );
}