"use client"
import React, {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SmartButton from "@/app/ui/components/SmartButton";
import {Chip, NoSsr, Typography} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import "./Maintenance.scss"
import DataGridToolbar from "@/app/ui/propertyManagement/pages/inquiries/components/DataGridToolbar";
import {categoryOptions, MaintenanceData, Urgency} from "@/app/ui/propertyManagement/pages/inquiries/types/maintenance";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import {getMaintenances} from "@/lib/db/database";
import {fakeData} from "@/app/ui/propertyManagement/pages/inquiries/types/maintenance";
import { useSnackbar } from "@/app/ui/providers/SnackbarProvider";

const columns: GridColDef[] = [
    {
        field: 'completed',
        headerName: 'Status',
        flex: 1,
        minWidth: 70,
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
    { field: 'category', headerName: 'Kategorie', flex: 1, minWidth: 120,
        renderCell: (params) => (
            <span className="ellipsis">
                {params.value}
            </span>
        ),},
    { field: 'description', headerName: 'Beschreibung', flex: 3, minWidth: 100,
        renderCell: (params) => (
            <span className="ellipsis">
                {params.value}
            </span>
        ),},
];

export default function Maintenance() {
    const router = useRouter();
    const [rows, setRows] = useState<MaintenanceData[]>([]);
    const [loading, setLoading] = useState(true);
    const {error} = useSnackbar();

    useEffect(() => {
        getMaintenances().then((maintenances) => {
            const addedMaintenances: MaintenanceData[] = maintenances.map((maintenance) => ({
                id: `added${maintenance.id}`,
                completed: false,
                name: `${maintenance.name} ${maintenance.surname}`,
                email: maintenance.eMail,
                description: maintenance.description,
                property: maintenance.property,
                category: categoryOptions.find(option => option.value === maintenance.category)?.label ?? "",
                urgency: maintenance.urgency as unknown as Urgency,
            }));

            setRows([...addedMaintenances, ...fakeData]);
            setLoading(false);
            })
            .catch(() => error());
    }, [error]);

    function navigateToAddPage() {
        router.push("/survey/maintenance/add");
    }

    const AddButton = (<SmartButton startIcon={<AddCircleIcon/>} smartSemantic="navigates to the 'add new maintenance request' form" variant="contained" onClick={navigateToAddPage} smartHref="/survey/maintenance/add">Hinzufügen</SmartButton>);

    return (
        <div className="maintenance">
            <NoSsr>
                <DataGrid rowHeight={60} rows={rows} columns={columns} pageSizeOptions={[10, 25, 100]} disableRowSelectionOnClick showToolbar
                          slots={{ toolbar: DataGridToolbar }}
                          slotProps={{ toolbar: { title: "Instandhaltungen", buttonContent: AddButton},
                              loadingOverlay: {
                                  variant: 'linear-progress',
                                  noRowsVariant: 'circular-progress',
                          }}}
                          loading={loading}
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