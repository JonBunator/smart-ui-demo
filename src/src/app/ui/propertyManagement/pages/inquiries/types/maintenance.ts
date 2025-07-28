export enum Urgency {
    LOW,
    MEDIUM,
    HIGH
}

export type MaintenanceData = {
    id: number;
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
    { label: "Niedrig", value: "low" },
    { label: "Mittel", value: "medium" },
    { label: "Hoch", value: "high" },
];