"use client"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import HolidayVillageOutlinedIcon from '@mui/icons-material/HolidayVillageOutlined';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import HandymanIcon from '@mui/icons-material/Handyman';
import {usePathname, useRouter} from "next/navigation";
import "./NavigationBar.scss";
import Timer from "./Timer";
import SmartButton from '@/app/ui/components/SmartButton';
import { SmartGroup } from 'smart-ui';
import HelpDialogButton from './HelpDialogButton';

const links = [
    { name: 'Buchungen', href: '/survey/bookings', icon: CalendarMonthOutlinedIcon, selectedIcon: CalendarMonthIcon },
    { name: 'Immobilien', href: '/survey/properties', icon: HolidayVillageOutlinedIcon, selectedIcon: HolidayVillageIcon },
    { name: 'Instandhaltungen', href: '/survey/maintenance', icon: HandymanOutlinedIcon, selectedIcon: HandymanIcon },
];

export default function NavLinks() {
    const pathname = usePathname();
    const router = useRouter();

    function isPathSelected(href: string): boolean {
        const parentPath = pathname.substring(0, pathname.lastIndexOf('/'));
        if(href === "/survey") {
            return pathname === href;
        }
        return (pathname === href || parentPath === href);
    }

    function navigate(href: string) {
        router.push(href);
    }

    return (
        <div className="navigation-bar">
            <div className="nav-items">
                <SmartGroup smartSemantic="nav links">
                    {links.map((link) => {
                        const LinkIcon = link.icon;
                        const SelectedIcon = link.selectedIcon;
                        const isSelected = isPathSelected(link.href);
                        return (
                            <SmartButton
                                className={`${isSelected ? "nav-element-selected" : ""}`}
                                startIcon={isSelected ? <SelectedIcon className="nav-icon" /> : <LinkIcon className="nav-icon" />}
                                key={link.name}
                                smartSemantic={`Navigates to the ${link.name} page`}
                                variant={isSelected ? "contained" : "text"}
                                disableElevation
                                onClick={() => navigate(link.href)}
                            >
                                {link.name}
                            </SmartButton>
                        );
                    })}
                </SmartGroup>
            </div>
            <div className="survey-information">
                <HelpDialogButton/>
                <Timer/>
            </div>
        </div>
    );
}