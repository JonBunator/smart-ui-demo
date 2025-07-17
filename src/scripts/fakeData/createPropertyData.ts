import { de_CH, de, es, nl, it, sv, en, Faker } from '@faker-js/faker';
import {
    DataCategory,
    DataType,
} from "@prisma";

export function createProperty(_: unknown, index: number) {
    const locales = [[de_CH, de], [es, en], [de, en], [it, en], [nl, en], [sv, en]];
    const i = index % locales.length;
    const faker = new Faker({
        locale: locales[i],
    });
    const street = faker.location.street().trim();
    const houseNumber = faker.location.buildingNumber().trim();
    const city = faker.location.city().trim();
    const postalCode = faker.location.zipCode().trim();
    const countries = ["Schweiz", "Spanien", "Deutschland", "Italien", "Niederlande", "Schweden"]
    const country = countries[i];

    return {
        category: DataCategory.GroundTruth,
        type: DataType.Property,
        order: index,
        EMail: {
            create: {
                author: "Kira Bartels",
                authorEmail: "kira.bartels@leafylodges.de",
                subject: "",
                content: "",
            }
        },
        Property: {
            create: {
                name: "",
                description: "",
                street: street,
                houseNumber: houseNumber,
                city: city,
                postalCode: postalCode,
                country: country,
                type: "",
                numBedrooms: 0,
                numBathrooms: 0,
                numMaximumGuests: 0,
                area: 0,
                pricePerNight: 0,
                deposit: 0,
                additionalInfo: []
            }
        }
    }
}