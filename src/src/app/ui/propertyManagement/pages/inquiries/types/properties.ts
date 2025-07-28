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
    {label: "Urban Workspace Zürich"},
    {label: "Waldzauber Holzhütte"},
    {label: "Amsterdam Hausboot"},
    {label: "Villa Fiesta del Sol"},
    {label: "Nordseeparadies"},
    {label: "Alpenblick Chalet"},
];

export enum AdditionalInfoType {
    WIFI = "wifi",
    POOL = "pool",
    AIR_CONDITIONING = "airConditioning",
    PARKING = "parking",
    PET_FRIENDLY = "petFriendly"
}