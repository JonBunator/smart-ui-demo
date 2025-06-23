import {Prisma, PrismaClient} from "@prisma";
import fs from "fs";

const prisma = new PrismaClient();

const surveyData: Prisma.SurveyCreateInput[] = [
    {
        active: true,
        invitationCode: "invite",
    }
];

function readJSONFile(path: string) {
    try {
        const data = fs.readFileSync(path, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading or parsing the file at ${path}:`, error);
        return null;
    }
}


export async function main() {
    for (const sd of surveyData) {
        await prisma.survey.create({ data: sd });
    }

    const bookingsData: Prisma.DataCreateInput[] = readJSONFile("prisma/seed/bookings.json") as Prisma.DataCreateInput[];
    for (const bd of bookingsData) {
        await prisma.data.create({ data: bd });
    }

    const propertiesData: Prisma.DataCreateInput[] = readJSONFile("prisma/seed/properties.json") as Prisma.DataCreateInput[];
    for (const pd of propertiesData) {
        await prisma.data.create({ data: pd });
    }

    const maintenanceData: Prisma.DataCreateInput[] = readJSONFile("prisma/seed/maintenance.json") as Prisma.DataCreateInput[];
    for (const md of maintenanceData) {
        await prisma.data.create({ data: md });
    }
}

main();