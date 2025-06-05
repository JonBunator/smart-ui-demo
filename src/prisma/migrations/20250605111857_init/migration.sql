-- CreateEnum
CREATE TYPE "DataType" AS ENUM ('Booking', 'Property', 'Maintenance');

-- CreateEnum
CREATE TYPE "DataCategory" AS ENUM ('Initial', 'GroundTruth', 'UserAdded');

-- CreateEnum
CREATE TYPE "AISupport" AS ENUM ('NONE', 'AGENT', 'PROACTIVE_AGENT');

-- CreateTable
CREATE TABLE "Survey" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL,
    "invitationCode" TEXT NOT NULL,
    "nextAISupportOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Survey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Data" (
    "id" SERIAL NOT NULL,
    "order" INTEGER,
    "category" "DataCategory" NOT NULL,
    "type" "DataType" NOT NULL,

    CONSTRAINT "Data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "dataId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "eMail" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "houseNumber" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "bookingStart" TIMESTAMP(3) NOT NULL,
    "bookingEnd" TIMESTAMP(3) NOT NULL,
    "numAdults" INTEGER NOT NULL,
    "numChildren" INTEGER NOT NULL,
    "property" TEXT NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" SERIAL NOT NULL,
    "dataId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "houseNumber" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "numBedrooms" INTEGER NOT NULL,
    "numBathrooms" INTEGER NOT NULL,
    "numMaximumGuests" INTEGER NOT NULL,
    "area" DOUBLE PRECISION NOT NULL,
    "pricePerNight" DOUBLE PRECISION NOT NULL,
    "deposit" DOUBLE PRECISION NOT NULL,
    "additionalInfo" TEXT[],

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Maintenance" (
    "id" SERIAL NOT NULL,
    "dataId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "property" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "eMail" TEXT NOT NULL,
    "urgency" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "Maintenance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EMail" (
    "id" SERIAL NOT NULL,
    "subjectName" TEXT NOT NULL,
    "subjectEmail" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "dataId" INTEGER NOT NULL,

    CONSTRAINT "EMail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participation" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "state" TEXT,
    "aiSupportOrder" INTEGER NOT NULL,
    "promptHistory" TEXT,
    "surveyId" INTEGER NOT NULL,

    CONSTRAINT "Participation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UseCaseParticipation" (
    "id" SERIAL NOT NULL,
    "aiSupport" "AISupport" NOT NULL,
    "participationId" TEXT NOT NULL,
    "dataId" INTEGER NOT NULL,

    CONSTRAINT "UseCaseParticipation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipationData" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "useCaseParticipationId" INTEGER NOT NULL,
    "dataId" INTEGER NOT NULL,
    "groundTruthId" INTEGER NOT NULL,

    CONSTRAINT "ParticipationData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Survey_invitationCode_key" ON "Survey"("invitationCode");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_dataId_key" ON "Booking"("dataId");

-- CreateIndex
CREATE UNIQUE INDEX "Property_dataId_key" ON "Property"("dataId");

-- CreateIndex
CREATE UNIQUE INDEX "Maintenance_dataId_key" ON "Maintenance"("dataId");

-- CreateIndex
CREATE UNIQUE INDEX "EMail_dataId_key" ON "EMail"("dataId");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_dataId_fkey" FOREIGN KEY ("dataId") REFERENCES "Data"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_dataId_fkey" FOREIGN KEY ("dataId") REFERENCES "Data"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Maintenance" ADD CONSTRAINT "Maintenance_dataId_fkey" FOREIGN KEY ("dataId") REFERENCES "Data"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EMail" ADD CONSTRAINT "EMail_dataId_fkey" FOREIGN KEY ("dataId") REFERENCES "Data"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participation" ADD CONSTRAINT "Participation_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "Survey"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UseCaseParticipation" ADD CONSTRAINT "UseCaseParticipation_participationId_fkey" FOREIGN KEY ("participationId") REFERENCES "Participation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipationData" ADD CONSTRAINT "ParticipationData_useCaseParticipationId_fkey" FOREIGN KEY ("useCaseParticipationId") REFERENCES "UseCaseParticipation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipationData" ADD CONSTRAINT "ParticipationData_dataId_fkey" FOREIGN KEY ("dataId") REFERENCES "Data"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipationData" ADD CONSTRAINT "ParticipationData_groundTruthId_fkey" FOREIGN KEY ("groundTruthId") REFERENCES "Data"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
