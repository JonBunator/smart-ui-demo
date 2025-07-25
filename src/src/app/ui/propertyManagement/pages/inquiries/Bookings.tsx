"use client"
import React, {useState} from "react";
import { useRouter } from "next/navigation";
import {DataGrid, GridColDef, GridRowSelectionModel} from '@mui/x-data-grid';
import SmartButton from "@/app/ui/components/SmartButton";
import {Chip, NoSsr, Typography} from '@mui/material';
import WcIcon from '@mui/icons-material/Wc';
import BoyIcon from '@mui/icons-material/Boy';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {DateRange, DayPicker} from "react-day-picker";
import "react-day-picker/style.css";
import { de } from "react-day-picker/locale";
import "./Bookings.scss"
import DataGridToolbar from "./components/DataGridToolbar";
import { BookingsData, BookingStatus } from "@/app/ui/propertyManagement/pages/inquiries/types/bookings";

const rows: BookingsData[] = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        property: "Waldblick",
        numAdults: 1,
        numChildren: 0,
        status: BookingStatus.NOT_CONFIRMED,
        dateRange: {
            from: new Date(2025, 9, 2),
            to: new Date(2025, 9, 9)
        }
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        property: "Landhaus",
        numAdults: 2,
        numChildren: 2,
        status: BookingStatus.CONFIRMED,
        dateRange: {
            from: new Date(2025, 9, 14),
            to: new Date(2025, 9, 28)
        }
    },
    {
        id: 3,
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        property: "Ferienoase",
        numAdults: 2,
        numChildren: 3,
        status: BookingStatus.COMPLETED,
        dateRange: {
            from: new Date(2025, 10, 19),
            to: new Date(2025, 10, 26)
        }
    },
    {
        id: 4,
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        property: "Ferienoase",
        numAdults: 2,
        numChildren: 3,
        status: BookingStatus.COMPLETED,
        dateRange: {
            from: new Date(2025, 10, 19),
            to: new Date(2025, 10, 26)
        }
    },
    {
        id: 5,
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        property: "Ferienoase",
        numAdults: 2,
        numChildren: 3,
        status: BookingStatus.COMPLETED,
        dateRange: {
            from: new Date(2025, 10, 19),
            to: new Date(2025, 10, 26)
        }
    },
    {
        id: 6,
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        property: "Ferienoase",
        numAdults: 2,
        numChildren: 3,
        status: BookingStatus.COMPLETED,
        dateRange: {
            from: new Date(2025, 10, 19),
            to: new Date(2025, 10, 26)
        }
    },
]

const columns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Gast',
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
        field: 'status',
        headerName: 'Status',
        flex: 1,
        minWidth: 130,
        renderCell: (params) => {
            let color;
            let label;
            switch (params.value) {
                case BookingStatus.COMPLETED:
                    color = 'success';
                    label = "Abgeschlossen";
                    break;
                case BookingStatus.CONFIRMED:
                    color = 'warning';
                    label = "Bestätigt";
                    break;
                case BookingStatus.NOT_CONFIRMED:
                    color = 'error';
                    label = "Nicht bestätigt";
                    break;
                default:
                    color = 'default';
            }
            return <Chip label={label} size="small" color={color as ('success' | 'warning' | 'error' | 'default')} />;
        },
    },
    { field: 'property', headerName: 'Immobilie', flex: 1, minWidth: 100 },
    { field: 'dateRange', headerName: 'Buchungszeitraum', flex: 2, minWidth: 180,
        valueGetter: (value: DateRange) => {
            return `${value.from?.toLocaleDateString()} - ${value.to?.toLocaleDateString()}`;
        },
        renderCell: (params) => (
            <span className="ellipsis">
                {params.value}
            </span>
        )
    },
    { field: 'numVisitors', headerName: 'Gästeanzahl', flex: 1, minWidth: 110,
        valueGetter: (value, row) => {
            return row.numAdults + row.numChildren;
        },
        renderCell: (params) => (
            <div className="num-visitors">
                {params.row.numAdults > 0 && <div className="num-adults">
                    <WcIcon/>
                    <span>{params.row.numAdults}x</span>
                </div>}
                {params.row.numChildren > 0 && <div className="num-children">
                    <BoyIcon/>
                    <span>{params.row.numChildren}x</span>
                </div>}
            </div>
        ),},
];



export default function Bookings() {
    const router = useRouter();
    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>({ type: 'include', ids: new Set() });
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
    const [month, setMonth] = useState<Date | undefined>(undefined);

    function navigateToAddPage() {
        router.push("/survey/bookings/add");
    }

    const AddButton =
        (<SmartButton startIcon={<AddCircleIcon/>} smartSemantic="navigates to the 'add booking request' form"
                            variant="contained" onClick={navigateToAddPage}>Hinzufügen</SmartButton>
        );

    function updateSelected(model: GridRowSelectionModel) {
        setRowSelectionModel(model);
        const selected = rows.filter(row => model.ids.has(row.id));
        if(selected.length > 0) {
            setDateRange(selected[0].dateRange);
            setMonth(selected[0].dateRange?.from);
        } else {
            setDateRange(undefined);
            setMonth(undefined);
        }
    }

    return (
        <div className="bookings">
            <NoSsr>
                <DataGrid rowHeight={60} rows={rows} columns={columns} pageSizeOptions={[5, 25, 100]} checkboxSelection disableMultipleRowSelection showToolbar
                          slots={{ toolbar: DataGridToolbar }}
                          slotProps={{ toolbar: { title: "Buchungen", buttonContent: AddButton}}}
                          onRowSelectionModelChange={(newRowSelectionModel) => {
                              updateSelected(newRowSelectionModel);
                          }}
                          initialState={{
                              pagination: {
                                  paginationModel: {
                                      pageSize: 5,
                                  },
                              },
                          }}
                          rowSelectionModel={rowSelectionModel}
                />
            </NoSsr>
            <DayPicker
                className="calendar"
                animate
                required={false}
                mode="range"
                numberOfMonths={2}
                locale={de}
                month={month}
                onMonthChange={setMonth}
                selected={dateRange}
                onSelect={() => {}}
            />
        </div>
    );
}