import {DateRange} from "react-day-picker";

export enum BookingStatus {
    COMPLETED,
    CONFIRMED,
    NOT_CONFIRMED,
}

export type BookingsData = {
    id: number;
    name: string;
    email: string;
    property: string;
    numAdults: number;
    numChildren: number;
    status: BookingStatus;
    dateRange: DateRange;
}