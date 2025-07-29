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
        name: "Lyn Jaros",
        email: "LynJaros69@gmail.com",
        property: propertyOptions[1].label,
        numAdults: 2,
        numChildren: 0,
        status: BookingStatus.CONFIRMED,
        dateRange: {
            from: new Date(2025, 9, 3),
            to: new Date(2025, 9, 10)
        }
    },
    {
        id: "fakeData4",
        name: "Khalid Al-Mansour",
        email: "al-manasour@gmail.com",
        property: propertyOptions[3].label,
        numAdults: 2,
        numChildren: 1,
        status: BookingStatus.CONFIRMED,
        dateRange: {
            from: new Date(2025, 7, 22),
            to: new Date(2025, 7, 24)
        }
    },
    {
        id: "fakeData5",
        name: "Rija Stašćik",
        email: "Rija_Stascik@hrnet.hr",
        property: propertyOptions[0].label,
        numAdults: 1,
        numChildren: 0,
        status: BookingStatus.COMPLETED,
        dateRange: {
            from: new Date(2025, 7, 19),
            to: new Date(2025, 7, 26)
        }
    },
    {
        id: "fakeData6",
        name: "Jean-Louis Mercier",
        email: "contact@jean-louis-mercier.com",
        property: propertyOptions[3].label,
        numAdults: 6,
        numChildren: 0,
        status: BookingStatus.COMPLETED,
        dateRange: {
            from: new Date(2025, 7, 4),
            to: new Date(2025, 7, 11)
        }
    },
    {
        id: "fakeData7",
        name: "Florentine Hohl",
        email: "floraaa0@posteo.com",
        property: "Ferienoase",
        numAdults: 2,
        numChildren: 3,
        status: BookingStatus.COMPLETED,
        dateRange: {
            from: new Date(2025, 7, 4),
            to: new Date(2025, 7, 18)
        }
    },
    {
        id: "fakeData8",
        name: "Omar Tonat",
        email: "omarowich897@gmail.com",
        property: propertyOptions[2].label,
        numAdults: 2,
        numChildren: 1,
        status: BookingStatus.COMPLETED,
        dateRange: {
            from: new Date(2025, 6, 23),
            to: new Date(2025, 6, 29)
        }
    },
    {
        id: "fakeData9",
        name: "Amalric Rousseau",
        email: "Amalric.Rousseau75@yahoo.fr",
        property: propertyOptions[2].label,
        numAdults: 2,
        numChildren: 1,
        status: BookingStatus.COMPLETED,
        dateRange: {
            from: new Date(2025, 6, 30),
            to: new Date(2025, 7, 5)
        }
    },
    {
        id: "fakeData10",
        name: "Lucas de Vries",
        email: "Lucas.deVries@gmail.com",
        property: propertyOptions[2].label,
        numAdults: 2,
        numChildren: 1,
        status: BookingStatus.COMPLETED,
        dateRange: {
            from: new Date(2025, 7, 6),
            to: new Date(2025, 7, 11)
        }
    },
    {
        id: "fakeData11",
        name: "Kata Stuparić",
        email: "Kata.Stuparic@hrnet.hr",
        property: propertyOptions[2].label,
        numAdults: 2,
        numChildren: 1,
        status: BookingStatus.COMPLETED,
        dateRange: {
            from: new Date(2025, 7, 12),
            to: new Date(2025, 7, 17)
        }
    },
    {
        id: "fakeData12",
        name: "فائز الرصاع",
        email: "fay190z.alrsae@hotmail.com",
        property: propertyOptions[2].label,
        numAdults: 2,
        numChildren: 1,
        status: BookingStatus.COMPLETED,
        dateRange: {
            from: new Date(2025, 7, 18),
            to: new Date(2025, 7, 23)
        }
    },
    {
        id: "fakeData13",
        name: "María Elena Pichardo Figueroa",
        email: "pichardo-figueroa@gmail.com",
        property: propertyOptions[2].label,
        numAdults: 2,
        numChildren: 1,
        status: BookingStatus.COMPLETED,
        dateRange: {
            from: new Date(2025, 7, 24),
            to: new Date(2025, 7, 29)
        }
    },
    {
        id: "fakeData14",
        name: "Vanda Mamojková",
        email: "Vanda_Mamojkova@zoznam.sk",
        property: propertyOptions[2].label,
        numAdults: 2,
        numChildren: 1,
        status: BookingStatus.COMPLETED,
        dateRange: {
            from: new Date(2025, 7, 30),
            to: new Date(2025, 8, 4)
        }
    }
]