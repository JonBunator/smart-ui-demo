import { fr, nl, hr, de, ar, es, sk, Faker } from '@faker-js/faker';
import {DataCategory, DataType} from "@prisma";

const faker = new Faker({
    locale: [fr, nl, hr, de, ar, es],
});


export function createBooking(_: unknown, index: number) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({firstName, lastName});
    const bookingStart = faker.date.between({ from: '2025-09-01T00:00:00.000Z', to: '2025-11-01T00:00:00.000Z' })
    const bookingEnd = new Date(bookingStart);
    bookingEnd.setDate(bookingEnd.getDate() + faker.number.int({min: 1, max: 14}))
    const countries = {"CH": "Schweiz", "DE": "Deutschland", "AT": "Österreich"}
    const phoneNumber = faker.phone.number({ style: 'international' });
    const street = faker.location.street();
    const houseNumber = faker.location.buildingNumber();
    const city = faker.location.city();
    const postalCode = faker.location.zipCode();
    const country = countries[faker.location.countryCode() as "DE" | "AT" | "CH"];
    const numAdults = faker.number.int({min: 1, max: 5});
    const numChildren = faker.number.int({min: 1, max: 3})

    const property = "";

    //TODO Create from template
    function createEmailContent() {
        faker.helpers.mustache('I found {{count}} instances of "{{word}}".', {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            street: street,
            houseNumber: houseNumber,
            city: city,
            postalCode: postalCode,
            country: country,
            bookingStart: bookingStart.toLocaleDateString(),
            bookingEnd: bookingEnd.toLocaleDateString(),
            numAdults: numAdults.toString(),
            numChildren: numChildren.toString(),
            property: property,
        })
    }

    return {
        "category": DataCategory.GroundTruth,
        "type": DataType.Booking,
        "order": index,
        "EMail": {
            "create": {
                "author": `${firstName} ${lastName}`,
                "authorEmail": email,
                "subject": "",
                "content": "",
            }
        },
        "Booking": {
            "create": {
                "name": firstName,
                "surname": lastName,
                "phoneNumber": phoneNumber,
                "eMail": email,
                "street": street,
                "houseNumber": houseNumber,
                "city": city,
                "postalCode": postalCode,
                "country": country,
                "bookingStart": bookingStart,
                "bookingEnd": bookingEnd,
                "numAdults": numAdults,
                "numChildren": numChildren,
                "property": ""
            }
        }
    }
}