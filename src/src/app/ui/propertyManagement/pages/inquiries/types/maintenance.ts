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
    { label: "HVAC", value: "hvac" },
    { label: "Gebäude", value: "structural" },
    { label: "Garten", value: "garden" },
    { label: "Möbel", value: "furniture" },
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
        description: "Dies ist eine sehr lange Nachricht lorum ipsum lora sit amet",
        property: "Waldblick",
        category: "Garten",
        urgency: Urgency.LOW,
    },
    {
        id: "fakeData2",
        completed: true,
        name: "Lucas de Vries",
        email: "Lucas.deVries@gmail.com\"",
        description: "Dies ist eine sehr lange Nachricht",
        property: "Landhaus",
        category: "Möbel",
        urgency: Urgency.MEDIUM,
    },
    {
        id: "fakeData3",
        completed: true,
        name: "Kata Stuparić",
        email: "Kata.Stuparic@hrnet.hr",
        description: "Dies ist eine sehr lange Nachricht",
        property: "Ferienoase",
        category: "Klempnerarbeit",
        urgency: Urgency.HIGH,
    },
    {
        id: "fakeData4",
        completed: true,
        name: "فائز الرصاع",
        email: "fay190z.alrsae@hotmail.com",
        description: "Dies ist eine sehr lange Nachricht",
        property: "Ferienoase",
        category: "Klempnerarbeit",
        urgency: Urgency.HIGH,
    },
    {
        id: "fakeData5",
        completed: true,
        name: "María Elena Pichardo Figueroa",
        email: "pichardo-figueroa@gmail.com",
        description: "Dies ist eine sehr lange Nachricht",
        property: "Ferienoase",
        category: "Klempnerarbeit",
        urgency: Urgency.HIGH,
    },
    {
        id: "fakeData6",
        completed: true,
        name: "Vanda Mamojková",
        email: "Vanda_Mamojkova@zoznam.sk",
        description: "Dies ist eine sehr lange Nachricht",
        property: "Ferienoase",
        category: "Klempnerarbeit",
        urgency: Urgency.HIGH,
    }
]