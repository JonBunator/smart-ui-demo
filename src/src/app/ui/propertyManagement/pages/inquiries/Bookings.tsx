"use client"
import React from "react";
import {useRouter} from "next/navigation";
import SmartButton from "@/app/ui/components/SmartButton";

export default function Bookings() {
    const router = useRouter();

    function navigateToAddPage() {
        router.push("/survey/bookings/add");
    }

    return (
        <SmartButton smartSemantic="navigates to the 'add booking request' form" variant="contained" onClick={navigateToAddPage}>Hinzufügen</SmartButton>
    );
}