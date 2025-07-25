"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SmartButton from "@/app/ui/components/SmartButton";
import {Chip, NoSsr, Typography} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import "./Maintenance.scss"
import DataGridToolbar from "@/app/ui/propertyManagement/pages/inquiries/components/DataGridToolbar";
import { MaintenanceData, Urgency } from "@/app/ui/propertyManagement/pages/inquiries/types/maintenance";

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
    {
        id: 4,
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        description: "Dies ist eine sehr lange Nachricht",
        property: "Ferienoase",
        category: "Klempnerarbeit",
        urgency: Urgency.HIGH,
    },
    {
        id: 5,
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        description: "Dies ist eine sehr lange Nachricht",
        property: "Ferienoase",
        category: "Klempnerarbeit",
        urgency: Urgency.HIGH,
    },
    {
        id: 6,
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        description: "Dies ist eine sehr lange Nachricht",
        property: "Ferienoase",
        category: "Klempnerarbeit",
        urgency: Urgency.HIGH,
    },
    {
        id: 7,
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        description: "Dies ist eine sehr lange Nachricht",
        property: "Ferienoase",
        category: "Klempnerarbeit",
        urgency: Urgency.HIGH,
    },
    {
        id: 8,
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        description: "Dies ist eine sehr lange Nachricht",
        property: "Ferienoase",
        category: "Klempnerarbeit",
        urgency: Urgency.HIGH,
    },
    {
        id: 9,
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        description: "Dies ist eine sehr lange Nachricht",
        property: "Ferienoase",
        category: "Klempnerarbeit",
        urgency: Urgency.HIGH,
    },
    {
        id: 10,
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        description: "Dies ist eine sehr lange Nachricht",
        property: "Ferienoase",
        category: "Klempnerarbeit",
        urgency: Urgency.HIGH,
    },
    {
        id: 11,
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
        flex: 2,
        minWidth: 150,
        renderCell: (params) => (
            <div className="ellipsis">
                <Typography className="ellipsis">{params.row.name}</Typography>
                <Typography className="email ellipsis" color="textSecondary">{params.row.email}</Typography>
            </div>
        ),
    },
    {
        field: 'urgency',
        headerName: 'Dringlichkeit',
        flex: 1,
        minWidth: 100,
        renderCell: (params) => {
            let color;
            let label;
            switch (params.value) {
                case Urgency.LOW:
                    color = 'success';
                    label = "Niedrig";
                    break;
                case Urgency.MEDIUM:
                    color = 'warning';
                    label = "Mittel";
                    break;
                case Urgency.HIGH:
                    color = 'error';
                    label = "Hoch";
                    break;
                default:
                    color = 'default';
            }
            return <Chip label={label} size="small" color={color as ('success' | 'warning' | 'error' | 'default')} />;
        },
    },
    { field: 'property', headerName: 'Immobilie', flex: 1, minWidth: 100 },
    { field: 'category', headerName: 'Kategorie', flex: 1, minWidth: 120 },
    { field: 'description', headerName: 'Beschreibung', flex: 3, minWidth: 200,
        renderCell: (params) => (
            <span className="ellipsis">
                {params.value}
            </span>
        ),},
];

export default function Maintenance() {
    const router = useRouter();

    function navigateToAddPage() {
        router.push("/survey/maintenance/add");
    }

    const AddButton = (<SmartButton startIcon={<AddCircleIcon/>} smartSemantic="navigates to the 'add new maintenance request' form" variant="contained" onClick={navigateToAddPage}>Hinzufügen</SmartButton>);

    return (
        <div className="maintenance">
            <NoSsr>
                <DataGrid rowHeight={60} rows={rows} columns={columns} pageSizeOptions={[10, 25, 100]} disableRowSelectionOnClick showToolbar
                          slots={{ toolbar: DataGridToolbar }}
                          slotProps={{ toolbar: { title: "Instandhaltungen", buttonContent: AddButton}}}
                          initialState={{
                              pagination: {
                                  paginationModel: {
                                      pageSize: 10,
                                  },
                              },
                          }}
                />
            </NoSsr>
        </div>
    );
}