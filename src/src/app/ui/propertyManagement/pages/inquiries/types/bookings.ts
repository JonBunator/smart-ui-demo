import {DateRange} from "react-day-picker";
import {propertyOptions} from "@/app/ui/propertyManagement/pages/inquiries/types/properties";

export enum BookingStatus {
    COMPLETED,
    CONFIRMED,
    NOT_CONFIRMED,
    DENIED
}

export type BookingsData = {
    id: string;
    name: string;
    email: string;
    property: string;
    numAdults: number;
    numChildren: number;
    status: BookingStatus;
    dateRange: DateRange;
}

function _offsetDaysFromToday(days: number) {
    const today = new Date();
    today.setDate(today.getDate() + days);
    return today;
}

export const fakeData: BookingsData[] = [
    {
        id: "fakeData1",
        name: "Hanna Hodel",
        email: "Hanna_Hodel@gmail.com",
        property: propertyOptions[2].label,
        numAdults: 1,
        numChildren: 0,
        status: BookingStatus.NOT_CONFIRMED,
        dateRange: {
            from: new Date(2025, 11, 6),
            to: new Date(2025, 11, 13)
        }
    },
    {
        id: "fakeData2",
        name: "Nathalie Albrecht",
        email: "Nathalieeee73@hotmail.com",
        property: propertyOptions[4].label,
        numAdults: 2,
        numChildren: 3,
        status: BookingStatus.DENIED,
        dateRange: {
            from: new Date(2025, 9, 7),
            to: new Date(2025, 9, 21)
        }
    },
    {
        id: "fakeData3",
        name: "Ricardo Marl",
        email: "Ricardo.Marl38@yahoo.com",
        property: propertyOptions[6].label,
        numAdults: 2,
        numChildren: 1,
        status: BookingStatus.CONFIRMED,
        dateRange: {
            from: _offsetDaysFromToday(-5),
            to: _offsetDaysFromToday(2)
        }
    },
    {
        id: "fakeData4",
        name: "Lennard Haschke",
        email: "Lennard.Haschke@hotmail.com",
        property: propertyOptions[7].label,
        numAdults: 1,
        numChildren: 0,
        status: BookingStatus.CONFIRMED,
        dateRange: {
            from: _offsetDaysFromToday(-3),
            to: _offsetDaysFromToday(2)
        }
    },
    {
        id: "fakeData5",
        name: "Natalia Saile",
        email: "Natalia.Saile13@yahoo.com",
        property: propertyOptions[4].label,
        numAdults: 3,
        numChildren: 2,
        status: BookingStatus.CONFIRMED,
        dateRange: {
            from: _offsetDaysFromToday(-1),
            to: _offsetDaysFromToday(13)
        }
    },
    {
        id: "fakeData6",
        name: "Lisa Ganzmann",
        email: "Lisa.Ganzmann@yahoo.com",
        property: propertyOptions[0].label,
        numAdults: 1,
        numChildren: 0,
        status: BookingStatus.CONFIRMED,
        dateRange: {
            from: _offsetDaysFromToday(-2),
            to: _offsetDaysFromToday(3)
        }
    },
    {
        id: "fakeData7",
        name: "Jakob Rose",
        email: "Jakob.Rose50@yahoo.com",
        property: propertyOptions[5].label,
        numAdults: 5,
        numChildren: 0,
        status: BookingStatus.CONFIRMED,
        dateRange: {
            from: _offsetDaysFromToday(-13),
            to: _offsetDaysFromToday(1)
        }
    },
    {
        id: "fakeData8",
        name: "Mario Borrmann",
        email: "Mario_Borrmann@hotmail.com",
        property: propertyOptions[3].label,
        numAdults: 4,
        numChildren: 2,
        status: BookingStatus.CONFIRMED,
        dateRange: {
            from: _offsetDaysFromToday(-4),
            to: _offsetDaysFromToday(10)
        }
    },
    {
        id: "fakeData9",
        name: "Naemi Schlitzer",
        email: "Naemi.Schlitzer@hotmail.com",
        property: propertyOptions[2].label,
        numAdults: 2,
        numChildren: 0,
        status: BookingStatus.CONFIRMED,
        dateRange: {
            from: _offsetDaysFromToday(-9),
            to: _offsetDaysFromToday(4)
        }
    },
    {
        id: "fakeData10",
        name: "Talea Lohse",
        email: "Talea.Lohse@gmail.com",
        property: propertyOptions[8].label,
        numAdults: 6,
        numChildren: 0,
        status: BookingStatus.CONFIRMED,
        dateRange: {
            from: _offsetDaysFromToday(-4),
            to: _offsetDaysFromToday(17)
        }
    },
    {
        id: "fakeData11",
        name: "Lyn Jaros",
        email: "LynJaros69@gmail.com",
        property: propertyOptions[1].label,
        numAdults: 2,
        numChildren: 0,
        status: BookingStatus.COMPLETED,
        dateRange: {
            from: new Date(2025, 7, 3),
            to: new Date(2025, 7, 10)
        }
    },
    {
        id: "fakeData12",
        name: "Amalric Rousseau",
        email: "Amalric.Rousseau75@yahoo.fr",
        property: propertyOptions[4].label,
        numAdults: 2,
        numChildren: 2,
        status: BookingStatus.COMPLETED,
        dateRange: {
            from: _offsetDaysFromToday(-12),
            to: _offsetDaysFromToday(-2)
        }
    },
    {
        id: "fakeData13",
        name: "Khalid Al-Mansour",
        email: "al-manasour@gmail.com",
        property: propertyOptions[3].label,
        numAdults: 2,
        numChildren: 1,
        status: BookingStatus.COMPLETED,
        dateRange: {
            from: new Date(2025, 6, 22),
            to: new Date(2025, 6, 24)
        }
    },
    {
        id: "fakeData14",
        name: "Rija Stašćik",
        email: "Rija_Stascik@hrnet.hr",
        property: propertyOptions[0].label,
        numAdults: 1,
        numChildren: 0,
        status: BookingStatus.COMPLETED,
        dateRange: {
            from: new Date(2025, 5, 19),
            to: new Date(2025, 5, 26)
        }
    },
    {
        id: "fakeData15",
        name: "Jean-Louis Mercier",
        email: "contact@jean-louis-mercier.com",
        property: propertyOptions[8].label,
        numAdults: 6,
        numChildren: 0,
        status: BookingStatus.COMPLETED,
        dateRange: {
            from: new Date(2025, 6, 4),
            to: new Date(2025, 6, 11)
        }
    },
    {
        id: "fakeData16",
        name: "فائز الرصاع",
        email: "fay190z.alrsae@hotmail.com",
        property: propertyOptions[2].label,
        numAdults: 2,
        numChildren: 1,
        status: BookingStatus.COMPLETED,
        dateRange: {
            from: new Date(2025, 6, 4),
            to: new Date(2025, 6, 18)
        }
    },
    {
        id: "fakeData17",
        name: "Florentine Hohl",
        email: "floraaa0@posteo.com",
        property: propertyOptions[6].label,
        numAdults: 2,
        numChildren: 2,
        status: BookingStatus.COMPLETED,
        dateRange: {
            from: new Date(2025, 6, 18),
            to: new Date(2025, 6, 23)
        }
    },
]