import { de, Faker } from '@faker-js/faker';
import {DataCategory, DataType} from "@prisma";

const faker = new Faker({
    locale: [de],
});


export function createMaintenance(_: unknown, index: number) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({firstName, lastName});

    const property = "";
    const category = "";
    const urgency = "";
    const description = "";
    const location = "";

    return {
        "category": DataCategory.GroundTruth,
        "type": DataType.Maintenance,
        "order": index,
        "EMail": {
            "create": {
                "author": `${firstName} ${lastName}`,
                "authorEmail": email,
                "subject": "",
                "content": "",
            }
        },
        "Maintenance": {
            "create": {
                "name": firstName,
                "surname": lastName,
                "eMail": email,
                "property": property,
                "category": category,
                "urgency": urgency,
                "description": description,
                "location": location,
            }
        }
    }
}