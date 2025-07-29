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
    pricePerNight: number;
    available: boolean;
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

export const fakeData: PropertyData[] = [
    {
        name: propertyOptions[0].label,
        address: "Dorfstrasse 8, 9835 Zürich, Schweiz",
        image: "/image/properties/property1.png",
        description: "Erleben Sie Zürich in unserer zentral gelegenen Wohnung, die perfekt für Work and Travel ausgestattet ist. Mit einem modernen Computer-Arbeitsplatz bietet diese Unterkunft alles, was Sie für produktives Arbeiten und entspanntes Wohnen benötigen. Genießen Sie die Nähe zu den kulturellen Highlights und den lebhaften Straßen der Stadt, ideal für Geschäftsreisende und digitale Nomaden.",
        type: PropertyType.APARTMENT,
        additionalInfos: [AdditionalInfoType.WIFI, AdditionalInfoType.AIR_CONDITIONING, AdditionalInfoType.PARKING],
        numBeds: 1,
        numBathrooms: 1,
        area: 40,
        pricePerNight: 139,
        available: true,
    },
    {
        name: propertyOptions[1].label,
        address: "Britts Väg 91, 85490 Söderlöv, Schweden",
        image: "/image/properties/property3.png",
        description: "Entfliehen Sie dem Alltag und tauchen Sie ein in die Ruhe der schwedischen Natur mit unserer idyllischen Holzhütte im Herzen des Waldes. Diese gemütliche Unterkunft bietet Ihnen die perfekte Gelegenheit, sich zu entspannen und die unberührte Schönheit der Umgebung zu genießen. Ideal für Naturliebhaber und alle, die eine Auszeit in der Abgeschiedenheit suchen.",
        type: PropertyType.CABIN,
        additionalInfos: [AdditionalInfoType.PARKING, AdditionalInfoType.PET_FRIENDLY],
        numBeds: 2,
        numBathrooms: 1,
        area: 40,
        pricePerNight: 120,
        available: true,
    },
    {
        name: propertyOptions[2].label,
        address: "Jasperplantsoen 618 I, 2975 IY Amsterdam, Niederlande",
        image: "/image/properties/property4.png",
        description: "Erleben Sie Amsterdam auf einzigartige Weise in unserem charmanten Hausboot, das direkt in der Innenstadt auf einem malerischen Fluss liegt. Genießen Sie die Nähe zu den kulturellen Highlights und den lebhaften Straßen der Stadt, während Sie die Ruhe und Gelassenheit des Wassers genießen. Ideal für einen unvergesslichen Aufenthalt in der niederländischen Hauptstadt.",
        type: PropertyType.HOUSE_BOAT,
        additionalInfos: [AdditionalInfoType.AIR_CONDITIONING, AdditionalInfoType.PET_FRIENDLY],
        numBeds: 3,
        numBathrooms: 1,
        area: 20,
        pricePerNight: 169,
        available: true,
    },
    {
        name: propertyOptions[3].label,
        address: "Barrio Roser 5, 05962 Mataró, Spanien",
        image: "/image/properties/property2.png",
        description: "Erleben Sie den ultimativen Luxus in unserer modernen Villa in Spanien, die mit einem beeindruckenden Pool ausgestattet ist. Diese exquisite Unterkunft ist perfekt für stilvolle Cocktailpartys und bietet Ihnen und Ihren Gästen ein unvergessliches Erlebnis. Genießen Sie die elegante Architektur und die erstklassigen Annehmlichkeiten in einer der begehrtesten Lagen Spaniens. Ideal für diejenigen, die das Leben in vollen Zügen genießen möchten.",
        type: PropertyType.VILLA,
        additionalInfos: [AdditionalInfoType.WIFI, AdditionalInfoType.POOL, AdditionalInfoType.AIR_CONDITIONING, AdditionalInfoType.PARKING],
        numBeds: 8,
        numBathrooms: 4,
        area: 320,
        pricePerNight: 1500,
        available: true,
    },
    {
        name: propertyOptions[4].label,
        address: "Fritz-Erler-Str. 96a, 25938 Wyk auf Föhr, Deutschland",
        image: "/image/properties/property5.png",
        description: "Entdecken Sie die Schönheit der nordfriesischen Insel Föhr in unserem großen Haus mit traditionellem Reetdach, direkt am Fluss gelegen. Diese charmante Unterkunft bietet Ihnen eine perfekte Mischung aus traditionellem Charme und natürlicher Schönheit. Genießen Sie die friedliche Umgebung und die malerische Aussicht, ideal für einen erholsamen Urlaub inmitten der Natur.",
        type: PropertyType.HOUSE,
        additionalInfos: [AdditionalInfoType.WIFI, AdditionalInfoType.PARKING, AdditionalInfoType.PET_FRIENDLY],
        numBeds: 6,
        numBathrooms: 2,
        area: 210,
        pricePerNight: 333,
        available: true,
    },
    {
        name: propertyOptions[5].label,
        address: "Lichtmattstrasse 43, 9050 Rüte, Schweiz",
        image: "/image/properties/property6.png",
        description: "Entdecken Sie die Schönheit der Schweizer Alpen in unserem gemütlichen Alpenblick Chalet. Genießen Sie den atemberaubenden Ausblick auf die majestätischen Berge und die unberührte Natur. Die Hütte ist bequem mit dem Auto zu erreichen und bietet Ihnen eine perfekte Mischung aus Ruhe und Erholung. Ideal für Naturliebhaber und Abenteurer!",
        type: PropertyType.CABIN,
        additionalInfos: [AdditionalInfoType.PARKING, AdditionalInfoType.PET_FRIENDLY],
        numBeds: 6,
        numBathrooms: 2,
        area: 290,
        pricePerNight: 419,
        available: true,
    },
]