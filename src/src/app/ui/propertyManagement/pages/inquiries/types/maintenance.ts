import {propertyOptions} from "@/app/ui/propertyManagement/pages/inquiries/types/properties";

export enum Urgency {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
}

export type MaintenanceData = {
    id: string;
    completed: boolean;
    name: string;
    email: string;
    property: string;
    category: string;
    urgency: Urgency;
    description: string;
}

export const categoryOptions = [
    { label: "Klempnerarbeit", value: "plumbing" },
    { label: "Elektrik", value: "electrical" },
    { label: "HVAC (Heizung, Lüftung, Klima)", value: "hvac" },
    { label: "Gebäude", value: "structural" },
    { label: "Garten", value: "garden" },
    { label: "Möbel", value: "furniture" },
    { label: "Schädlingsbekämpfung", value: "pestControl" }
];

export const urgencyOptions = [
    { label: "Niedrig", value: Urgency.LOW },
    { label: "Mittel", value: Urgency.MEDIUM },
    { label: "Hoch", value: Urgency.HIGH },
];

export const fakeData: MaintenanceData[] = [
    {
        id: "fakeData1",
        completed: false,
        name: "Amalric Rousseau",
        email: "Amalric.Rousseau75@yahoo.fr",
        description: "Rasen ist zu lange und Sträucher wurden nicht geschnitten",
        property: propertyOptions[4].label,
        category: "Garten",
        urgency: Urgency.LOW,
    },
    {
        id: "fakeData2",
        completed: true,
        name: "Khalid Al-Mansour",
        email: "al-manasour@gmail.com",
        description: "Stuhl ist unter Gewicht zusammengebrochen",
        property: propertyOptions[3].label,
        category: "Möbel",
        urgency: Urgency.MEDIUM,
    },
    {
        id: "fakeData3",
        completed: true,
        name: "Rija Stašćik",
        email: "Rija_Stascik@hrnet.hr",
        description: "Das Licht in der Küche flackert ständig",
        property: propertyOptions[0].label,
        category: "Elektrik",
        urgency: Urgency.HIGH,
    },
    {
        id: "fakeData4",
        completed: true,
        name: "فائز الرصاع",
        email: "fay190z.alrsae@hotmail.com",
        description: "Ein Rohr im Badezimmer leckt, Wasserschaden droht",
        property: propertyOptions[2].label,
        category: "Klempnerarbeit",
        urgency: Urgency.HIGH,
    },
    {
        id: "fakeData5",
        completed: true,
        name: "Jean-Louis Mercier",
        email: "contact@jean-louis-mercier.com",
        description: "Die Eingangstür klemmt und ist schwer zu öffnen",
        property: propertyOptions[8].label,
        category: "Gebäude",
        urgency: Urgency.LOW,
    },
    {
        id: "fakeData6",
        completed: true,
        name: "Eduardo Hohl",
        email: "eduardo.hohl1@posteo.com",
        description: "Ameisen im Badezimmer",
        property: propertyOptions[6].label,
        category: "Schädlingsbekämpfung",
        urgency: Urgency.MEDIUM,
    }
]