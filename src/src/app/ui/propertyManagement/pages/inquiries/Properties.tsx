"use client"
import React from "react";
import {useRouter} from "next/navigation";
import SmartButton from "@/app/ui/components/SmartButton";

export default function Properties() {
    const router = useRouter();

    function navigateToAddPage() {
        router.push("/survey/properties/add");
    }

    return (
        <SmartButton smartSemantic="navigates to the 'add vacation home' form" variant="contained" onClick={navigateToAddPage}>Hinzufügen</SmartButton>
    );
}