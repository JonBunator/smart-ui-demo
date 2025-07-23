"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SmartButton from "@/app/ui/components/SmartButton";
import {Chip, Typography} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import "./Maintenance.scss"
import InquiryPageLayout from "@/app/ui/propertyManagement/pages/inquiries/components/InquiryPageLayout";

enum Urgency {
    LOW,
    MEDIUM,
    HIGH
}

type MaintenanceData = {
    id: number;
    name: string;
    email: string;
    property: string;
    category: string;
    urgency: Urgency;
    description: string;
}

const rows: MaintenanceData[] = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        description: "Dies ist eine sehr lange Nachricht lorum ipsum lora sit amet",
        property: "Waldblick",
        category: "Garten",
        urgency: Urgency.LOW,
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        description: "Dies ist eine sehr lange Nachricht",
        property: "Landhaus",
        category: "Möbel",
        urgency: Urgency.MEDIUM,
    },
    {
        id: 3,
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        description: "Dies ist eine sehr lange Nachricht",
        property: "Ferienoase",
        category: "Klempnerarbeit",
        urgency: Urgency.HIGH,
    },
]

const columns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Verfasser',
        flex: 1,
        maxWidth: 250,
        renderCell: (params) => (
            <div>
                <Typography>{params.row.name}</Typography>
                <Typography className="email" color="textSecondary">{params.row.email}</Typography>
            </div>
        ),
    },
    {
        field: 'urgency',
        headerName: 'Dringlichkeit',
        width: 130,
        renderCell: (params) => {
            let color;
            switch (params.value) {
                case Urgency.LOW:
                    color = 'success';
                    break;
                case Urgency.MEDIUM:
                    color = 'warning';
                    break;
                case Urgency.HIGH:
                    color = 'error';
                    break;
                default:
                    color = 'default';
            }
            return <Chip label={Urgency[params.value]} color={color as ('success' | 'warning' | 'error' | 'default')} />;
        },
    },
    { field: 'property', headerName: 'Immobilie', width: 130 },
    { field: 'category', headerName: 'Kategorie', width: 130 },
    { field: 'description', headerName: 'Beschreibung', flex: 1,
        renderCell: (params) => (
            <span className="description">
                {params.row.description}
            </span>
        ),},
];

export default function Maintenance() {
    const router = useRouter();

    function navigateToAddPage() {
        router.push("/survey/maintenance/add");
    }

    return (
        <InquiryPageLayout title="Instandhaltungen"
                           className="maintenance"
                           buttonContent={<SmartButton startIcon={<AddCircleIcon/>} smartSemantic="navigates to the 'add new maintenance request' form" variant="contained" onClick={navigateToAddPage}>Hinzufügen</SmartButton>}
        >
            <DataGrid rowHeight={60} rows={rows} columns={columns} pageSizeOptions={[5, 10, 25]} />
        </InquiryPageLayout>
    );
}