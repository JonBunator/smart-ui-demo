import {Prisma, PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

const surveyData: Prisma.SurveyCreateInput[] = [
    {
        active: true,
        invitationCode: "invite",
        UseCases: {
            create: [
                {
                    url: "bookings",
                    order: 0
                },
                {
                    url: "properties",
                    order: 1,
                },
                {
                    url: "maintenance",
                    order: 2
                },
            ]
        }
    }
];

export async function main() {
    for (const sd of surveyData) {
        await prisma.survey.create({ data: sd });
    }
}

main();