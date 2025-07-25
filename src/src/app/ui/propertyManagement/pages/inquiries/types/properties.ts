export enum PropertyType {
    VILLA = "villa",
    HOUSE = "house",
    CABIN = "cabin",
    HOUSE_BOAT = "house-boat",
    APARTMENT = "apartment"
}

export const propertyTypes = [
    { label: "Haus", value: PropertyType.HOUSE },
    { label: "Wohnung", value: PropertyType.APARTMENT },
    { label: "Villa", value: PropertyType.VILLA },
    { label: "Hütte", value: PropertyType.CABIN },
    { label: "Hausboot", value: PropertyType.HOUSE_BOAT },
];

export interface PropertyData {
    name: string;
    address: string;
    image: string;
    description: string;
    type: PropertyType;
    additionalInfos: AdditionalInfoType[]
    numBeds: number;
    numBathrooms: number;
    area: number;
    price: number;
}

export const propertyOptions = [
    {label: "Nordseeparadies"},
    {label: "Alpenblick"},
    {label: "Seeblick"},
    {label: "Bergpanorama"},
    {label: "Waldblick"},
    {label: "Stadtvilla"},
    {label: "Landhaus"},
    {label: "Strandresort"},
    {label: "Bergchalet"},
    {label: "Ferienoase"},
];

export enum AdditionalInfoType {
    WIFI = "wifi",
    POOL = "pool",
    AIR_CONDITIONING = "airConditioning",
    PARKING = "parking",
    PET_FRIENDLY = "petFriendly"
}