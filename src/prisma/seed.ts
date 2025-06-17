import {DataCategory, DataType, Prisma, PrismaClient} from "../generated/prisma";

const prisma = new PrismaClient();

const surveyData: Prisma.SurveyCreateInput[] = [
    {
        active: true,
        invitationCode: "invite",
    }
];

const bookingsData: Prisma.DataCreateInput[] = [
    {
        category: DataCategory.GroundTruth,
        type: DataType.Booking,
        order: 0,
        EMail: {
            create: {
                author: "Luke Skywalker",
                authorEmail: "luke@rebellion.com",
                subject: "Hi there",
                content: "Hi I am Luke"
            }
        },
        Booking: {
            create: {
                name: "Luke",
                surname: "Skywalker",
                phoneNumber: "1234567890",
                eMail: "luke@rebellion.com",
                street: "Some street 1",
                houseNumber: "4",
                city: "City 1",
                postalCode: "12345",
                country: "Germany",
                bookingStart: new Date(),
                bookingEnd: new Date(),
                numAdults: 2,
                numChildren: 0,
                property: "Death Star",
            }
        }
    },
    {
        category: DataCategory.GroundTruth,
        type: DataType.Booking,
        order: 1,
        EMail: {
            create: {
                author: "Leia Organa",
                authorEmail: "leia@rebellion.com",
                subject: "Booking Confirmation",
                content: "Hello, this is Leia."
            }
        },
        Booking: {
            create: {
                name: "Leia",
                surname: "Organa",
                phoneNumber: "0987654321",
                eMail: "leia@rebellion.com",
                street: "Alderaan Avenue",
                houseNumber: "10",
                city: "City 2",
                postalCode: "54321",
                country: "Germany",
                bookingStart: new Date(),
                bookingEnd: new Date(),
                numAdults: 1,
                numChildren: 1,
                property: "Millennium Falcon",
            }
        }
    },
    {
        category: DataCategory.GroundTruth,
        type: DataType.Booking,
        order: 2,
        EMail: {
            create: {
                author: "Han Solo",
                authorEmail: "han@rebellion.com",
                subject: "Reservation Details",
                content: "Hey, Han here."
            }
        },
        Booking: {
            create: {
                name: "Han",
                surname: "Solo",
                phoneNumber: "1122334455",
                eMail: "han@rebellion.com",
                street: "Corellia Street",
                houseNumber: "7",
                city: "City 3",
                postalCode: "67890",
                country: "Germany",
                bookingStart: new Date(),
                bookingEnd: new Date(),
                numAdults: 2,
                numChildren: 0,
                property: "Millennium Falcon",
            }
        }
    },
    {
        category: DataCategory.GroundTruth,
        type: DataType.Booking,
        order: 3,
        EMail: {
            create: {
                author: "Obi-Wan Kenobi",
                authorEmail: "obiwan@rebellion.com",
                subject: "Booking Inquiry",
                content: "Greetings, Obi-Wan here."
            }
        },
        Booking: {
            create: {
                name: "Obi-Wan",
                surname: "Kenobi",
                phoneNumber: "5566778899",
                eMail: "obiwan@rebellion.com",
                street: "Jedi Temple Road",
                houseNumber: "3",
                city: "City 4",
                postalCode: "98765",
                country: "Germany",
                bookingStart: new Date(),
                bookingEnd: new Date(),
                numAdults: 1,
                numChildren: 0,
                property: "Jedi Temple",
            }
        }
    },
    {
        category: DataCategory.GroundTruth,
        type: DataType.Booking,
        order: 4,
        EMail: {
            create: {
                author: "Yoda",
                authorEmail: "yoda@rebellion.com",
                subject: "Booking Request",
                content: "Yoda, I am."
            }
        },
        Booking: {
            create: {
                name: "Yoda",
                surname: "",
                phoneNumber: "6677889900",
                eMail: "yoda@rebellion.com",
                street: "Dagobah Swamp",
                houseNumber: "1",
                city: "City 5",
                postalCode: "11111",
                country: "Germany",
                bookingStart: new Date(),
                bookingEnd: new Date(),
                numAdults: 1,
                numChildren: 0,
                property: "Dagobah Hut",
            }
        }
    }
];

export async function main() {
    for (const sd of surveyData) {
        await prisma.survey.create({ data: sd });
    }
    for (const bd of bookingsData) {
        await prisma.data.create({ data: bd });
    }
}

main();