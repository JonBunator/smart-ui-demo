import {Prisma, PrismaClient} from "@prisma";
import fs from "fs";

const prisma = new PrismaClient();

const surveyGroupData: Prisma.SurveyGroupCreateInput[] = [
    {
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
        await prisma.survey.create({});

    for (const sd of surveyGroupData) {
        await prisma.surveyGroup.create({ data: sd });
    }

    const dataSet0: Prisma.DataCreateInput[] = readJSONFile("prisma/seed/dataset0.json") as Prisma.DataCreateInput[];
    for (const d of dataSet0) {
        await prisma.data.create({ data: d });
    }

    const dataSet1: Prisma.DataCreateInput[] = readJSONFile("prisma/seed/dataset1.json") as Prisma.DataCreateInput[];
    for (const d of dataSet1) {
        await prisma.data.create({ data: d });
    }

    const dataSet2: Prisma.DataCreateInput[] = readJSONFile("prisma/seed/dataset2.json") as Prisma.DataCreateInput[];
    for (const d of dataSet2) {
        await prisma.data.create({ data: d });
    }
}

main().then();