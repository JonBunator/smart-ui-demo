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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const rows: MaintenanceData[] = [
    {
        id: 1,
        completed: false,
        name: "Amalric Rousseau",
        email: "Amalric.Rousseau75@yahoo.fr",
        description: "Dies ist eine sehr lange Nachricht lorum ipsum lora sit amet",
        property: "Waldblick",
        category: "Garten",
        urgency: Urgency.LOW,
    },
    {
        id: 2,
        completed: true,
        name: "Lucas de Vries",
        email: "Lucas.deVries@gmail.com\"",
        description: "Dies ist eine sehr lange Nachricht",
        property: "Landhaus",
        category: "Möbel",
        urgency: Urgency.MEDIUM,
    },
    {
        id: 3,
        completed: true,
        name: "Kata Stuparić",
        email: "Kata.Stuparic@hrnet.hr",
        description: "Dies ist eine sehr lange Nachricht",
        property: "Ferienoase",
        category: "Klempnerarbeit",
        urgency: Urgency.HIGH,
    },
    {
        id: 4,
        completed: true,
        name: "فائز الرصاع",
        email: "fay190z.alrsae@hotmail.com",
        description: "Dies ist eine sehr lange Nachricht",
        property: "Ferienoase",
        category: "Klempnerarbeit",
        urgency: Urgency.HIGH,
    },
    {
        id: 5,
        completed: true,
        name: "María Elena Pichardo Figueroa",
        email: "pichardo-figueroa@gmail.com",
        description: "Dies ist eine sehr lange Nachricht",
        property: "Ferienoase",
        category: "Klempnerarbeit",
        urgency: Urgency.HIGH,
    },
    {
        id: 6,
        completed: true,
        name: "Vanda Mamojková",
        email: "Vanda_Mamojkova@zoznam.sk",
        description: "Dies ist eine sehr lange Nachricht",
        property: "Ferienoase",
        category: "Klempnerarbeit",
        urgency: Urgency.HIGH,
    }
]

const columns: GridColDef[] = [
    {
        field: 'completed',
        headerName: 'Status',
        flex: 1,
        minWidth: 5,
        renderCell: (params) => {
            if(params.value) {
                return <CheckCircleIcon color="success"/>
            }
            return <CancelIcon color="error"/>
        },
    },
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
    { field: 'property', headerName: 'Immobilie', flex: 2, minWidth: 150,
        renderCell: (params) => (
            <span className="ellipsis">
                {params.value}
            </span>
        )},
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