-- CreateEnum
CREATE TYPE "SurveyState" AS ENUM ('NOT_STARTED', 'STARTED', 'USE_CASE_1', 'USE_CASE_1_QUESTIONS', 'USE_CASE_2', 'USE_CASE_2_QUESTIONS', 'USE_CASE_3', 'USE_CASE_3_QUESTIONS', 'FINISHED');

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
CREATE TABLE "UseCase" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "surveyId" INTEGER NOT NULL,

    CONSTRAINT "UseCase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EMail" (
    "id" SERIAL NOT NULL,
    "subjectName" TEXT NOT NULL,
    "subjectEmail" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "useCaseId" INTEGER NOT NULL,

    CONSTRAINT "EMail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participation" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "state" "SurveyState" NOT NULL DEFAULT 'NOT_STARTED',
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
    "useCaseId" INTEGER NOT NULL,

    CONSTRAINT "UseCaseParticipation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipationData" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data" TEXT,
    "useCaseParticipationId" INTEGER NOT NULL,

    CONSTRAINT "ParticipationData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Survey_invitationCode_key" ON "Survey"("invitationCode");

-- CreateIndex
CREATE UNIQUE INDEX "UseCase_url_key" ON "UseCase"("url");

-- CreateIndex
CREATE UNIQUE INDEX "UseCase_order_key" ON "UseCase"("order");

-- AddForeignKey
ALTER TABLE "UseCase" ADD CONSTRAINT "UseCase_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "Survey"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EMail" ADD CONSTRAINT "EMail_useCaseId_fkey" FOREIGN KEY ("useCaseId") REFERENCES "UseCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participation" ADD CONSTRAINT "Participation_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "Survey"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UseCaseParticipation" ADD CONSTRAINT "UseCaseParticipation_participationId_fkey" FOREIGN KEY ("participationId") REFERENCES "Participation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UseCaseParticipation" ADD CONSTRAINT "UseCaseParticipation_useCaseId_fkey" FOREIGN KEY ("useCaseId") REFERENCES "UseCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipationData" ADD CONSTRAINT "ParticipationData_useCaseParticipationId_fkey" FOREIGN KEY ("useCaseParticipationId") REFERENCES "UseCaseParticipation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
