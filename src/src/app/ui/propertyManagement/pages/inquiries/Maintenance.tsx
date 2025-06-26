"use client"
import React from "react";
import {useRouter} from "next/navigation";
import SmartButton from "@/app/ui/components/SmartButton";

export default function Maintenance() {
    const router = useRouter();

    function navigateToAddPage() {
        router.push("/survey/maintenance/add");
    }

    return (
        <SmartButton smartSemantic="navigates to the 'add new maintenance request' form" variant="contained" onClick={navigateToAddPage}>Hinzufügen</SmartButton>
    );
}