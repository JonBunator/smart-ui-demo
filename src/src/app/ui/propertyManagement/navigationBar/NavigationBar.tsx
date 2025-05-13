"use client"
import { Button } from "@mui/material";
import Link from 'next/link';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import HolidayVillageOutlinedIcon from '@mui/icons-material/HolidayVillageOutlined';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import HandymanIcon from '@mui/icons-material/Handyman';
import { usePathname } from "next/navigation";
import "./NavigationBar.scss";

const links = [
    { name: 'Home', href: '/', icon: HomeOutlinedIcon, selectedIcon: HomeIcon },
    { name: 'Buchungen', href: '/bookings', icon: CalendarMonthOutlinedIcon, selectedIcon: CalendarMonthIcon },
    { name: 'Immobilien', href: '/properties', icon: HolidayVillageOutlinedIcon, selectedIcon: HolidayVillageIcon },
    { name: 'Instandhaltung', href: '/maintenance', icon: HandymanOutlinedIcon, selectedIcon: HandymanIcon },
];

export default function NavLinks() {
    const pathname = usePathname();

    function isPathSelected(href: string): boolean {
        return pathname === href;
    }

    return (
        <div className="navigation-bar">
            {links.map((link) => {
                const LinkIcon = link.icon;
                const SelectedIcon = link.selectedIcon;
                const isSelected = isPathSelected(link.href);
                return (
                    <Button
                        className={`${isSelected ? "nav-element-selected" : ""}`}
                        startIcon={isSelected ? <SelectedIcon className="nav-icon" /> : <LinkIcon className="nav-icon" />}
                        component={Link}
                        key={link.name}
                        href={link.href}
                        variant={isSelected ? "contained" : "text"}
                        disableElevation
                    >
                        {link.name}
                    </Button>
                );
            })}
        </div>
    );
}