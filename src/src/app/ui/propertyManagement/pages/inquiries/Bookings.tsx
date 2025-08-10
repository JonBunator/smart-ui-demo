"use client"
import React, {useEffect, useState} from "react";
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
import {BookingsData, BookingStatus, fakeData} from "@/app/ui/propertyManagement/pages/inquiries/types/bookings";
import {getBookings} from "@/lib/db/database";
import { useSnackbar } from "@/app/ui/providers/SnackbarProvider";

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
                    color = 'success';
                    label = "Bestätigt";
                    break;
                case BookingStatus.NOT_CONFIRMED:
                    color = 'warning';
                    label = "Nicht bestätigt";
                    break;
                case BookingStatus.DENIED:
                    color = 'error';
                    label = "Abgelehnt";
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
    const [rows, setRows] = useState<BookingsData[]>([]);
    const [loading, setLoading] = useState(true);
    const {error} = useSnackbar();

    useEffect(() => {
        getBookings()
            .then((bookings) => {
                const addedBookings: BookingsData[] = bookings.map((booking) => ({
                    id: `added${booking.id}`,
                    name: `${booking.name} ${booking.surname}`,
                    email: booking.eMail,
                    property: booking.property,
                    numAdults: booking.numAdults,
                    numChildren: booking.numChildren,
                    status: BookingStatus.NOT_CONFIRMED,
                    dateRange: {
                        from: new Date(booking.bookingStart),
                        to: new Date(booking.bookingEnd)
                    }
                }));

            setRows([...addedBookings, ...fakeData]);
            setLoading(false);
            })
            .catch(() => error());
    }, [error]);

    function navigateToAddPage() {
        router.push("/survey/bookings/add");
    }

    const AddButton =
        (<SmartButton startIcon={<AddCircleIcon/>} smartSemantic="navigates to the 'add booking request' form"
                            variant="contained" onClick={navigateToAddPage} smartHref="/survey/bookings/add">Hinzufügen</SmartButton>
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
                          slotProps={{ toolbar: { title: "Buchungen", buttonContent: AddButton},
                                  loadingOverlay: {
                                  variant: 'linear-progress',
                                  noRowsVariant: 'circular-progress',
                          }}}
                          onRowSelectionModelChange={(newRowSelectionModel) => {
                              updateSelected(newRowSelectionModel);
                          }}
                          loading={loading}
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