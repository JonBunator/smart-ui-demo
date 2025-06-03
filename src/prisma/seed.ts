import {DataCategory, DataType, Prisma, PrismaClient} from "../generated/prisma";

const prisma = new PrismaClient();

const surveyData: Prisma.SurveyCreateInput[] = [
    {
        active: true,
        invitationCode: "invite",
    }
];

const mainData:  Prisma.DataCreateInput[] = [
    {
        category: DataCategory.GroundTruth,
        type: DataType.Booking,
        order: 0,
        EMail: {
            create: {
                subjectName: "Luke Skywalker",
                subjectEmail: "luke@rebellion.com",
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
    }
]

export async function main() {
    for (const sd of surveyData) {
        await prisma.survey.create({ data: sd });
    }
    for (const md of mainData) {
        await prisma.data.create({ data: md });
    }
}

main();