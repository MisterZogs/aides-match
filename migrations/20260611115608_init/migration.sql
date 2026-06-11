-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT,
    "username" TEXT,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "paymentProcessorUserId" TEXT,
    "lemonSqueezyCustomerPortalUrl" TEXT,
    "subscriptionStatus" TEXT,
    "subscriptionPlan" TEXT,
    "datePaid" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aide" (
    "id" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "criteresJson" JSONB,
    "criteresConfiance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "montantMin" DOUBLE PRECISION,
    "montantMax" DOUBLE PRECISION,
    "tauxAide" DOUBLE PRECISION,
    "typeMontant" TEXT,
    "deadline" TIMESTAMP(3),
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "portee" TEXT NOT NULL,
    "codesRegion" TEXT[],
    "codesDept" TEXT[],
    "derniereVerif" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Aide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntrepriseProfile" (
    "id" TEXT NOT NULL,
    "siren" TEXT NOT NULL,
    "siret" TEXT NOT NULL,
    "denomination" TEXT NOT NULL,
    "codeNaf" TEXT NOT NULL,
    "libelleNaf" TEXT NOT NULL,
    "formeJuridique" TEXT NOT NULL,
    "effectifTranche" TEXT,
    "dateCreation" TIMESTAMP(3),
    "codePostal" TEXT NOT NULL,
    "codeInsee" TEXT NOT NULL,
    "codeRegion" TEXT NOT NULL,
    "codeDept" TEXT NOT NULL,
    "tva" TEXT,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EntrepriseProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchResult" (
    "id" TEXT NOT NULL,
    "sirenId" TEXT NOT NULL,
    "aideId" TEXT NOT NULL,
    "score" TEXT NOT NULL,
    "detail" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MatchResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alerte" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "siren" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "filtres" JSONB NOT NULL,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "dernierEnvoi" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Alerte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LlmLog" (
    "id" TEXT NOT NULL,
    "aideId" TEXT NOT NULL,
    "tokens" INTEGER NOT NULL,
    "confiance" DOUBLE PRECISION NOT NULL,
    "duree" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LlmLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyStats" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalViews" INTEGER NOT NULL DEFAULT 0,
    "prevDayViewsChangePercent" TEXT NOT NULL DEFAULT '0',
    "userCount" INTEGER NOT NULL DEFAULT 0,
    "paidUserCount" INTEGER NOT NULL DEFAULT 0,
    "userDelta" INTEGER NOT NULL DEFAULT 0,
    "paidUserDelta" INTEGER NOT NULL DEFAULT 0,
    "totalRevenue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalProfit" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "DailyStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageViewSource" (
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dailyStatsId" INTEGER,
    "visitors" INTEGER NOT NULL,

    CONSTRAINT "PageViewSource_pkey" PRIMARY KEY ("date","name")
);

-- CreateTable
CREATE TABLE "Logs" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message" TEXT NOT NULL,
    "level" TEXT NOT NULL,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactFormMessage" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "repliedAt" TIMESTAMP(3),

    CONSTRAINT "ContactFormMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Auth" (
    "id" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthIdentity" (
    "providerName" TEXT NOT NULL,
    "providerUserId" TEXT NOT NULL,
    "providerData" TEXT NOT NULL DEFAULT '{}',
    "authId" TEXT NOT NULL,

    CONSTRAINT "AuthIdentity_pkey" PRIMARY KEY ("providerName","providerUserId")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_paymentProcessorUserId_key" ON "User"("paymentProcessorUserId");

-- CreateIndex
CREATE INDEX "Aide_actif_idx" ON "Aide"("actif");

-- CreateIndex
CREATE INDEX "Aide_portee_idx" ON "Aide"("portee");

-- CreateIndex
CREATE INDEX "Aide_deadline_idx" ON "Aide"("deadline");

-- CreateIndex
CREATE UNIQUE INDEX "Aide_sourceId_source_key" ON "Aide"("sourceId", "source");

-- CreateIndex
CREATE UNIQUE INDEX "EntrepriseProfile_siren_key" ON "EntrepriseProfile"("siren");

-- CreateIndex
CREATE INDEX "EntrepriseProfile_codeNaf_idx" ON "EntrepriseProfile"("codeNaf");

-- CreateIndex
CREATE INDEX "EntrepriseProfile_codeRegion_idx" ON "EntrepriseProfile"("codeRegion");

-- CreateIndex
CREATE UNIQUE INDEX "MatchResult_sirenId_aideId_key" ON "MatchResult"("sirenId", "aideId");

-- CreateIndex
CREATE INDEX "Alerte_actif_idx" ON "Alerte"("actif");

-- CreateIndex
CREATE UNIQUE INDEX "DailyStats_date_key" ON "DailyStats"("date");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_userId_key" ON "Auth"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_id_key" ON "Session"("id");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- AddForeignKey
ALTER TABLE "MatchResult" ADD CONSTRAINT "MatchResult_sirenId_fkey" FOREIGN KEY ("sirenId") REFERENCES "EntrepriseProfile"("siren") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchResult" ADD CONSTRAINT "MatchResult_aideId_fkey" FOREIGN KEY ("aideId") REFERENCES "Aide"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alerte" ADD CONSTRAINT "Alerte_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LlmLog" ADD CONSTRAINT "LlmLog_aideId_fkey" FOREIGN KEY ("aideId") REFERENCES "Aide"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageViewSource" ADD CONSTRAINT "PageViewSource_dailyStatsId_fkey" FOREIGN KEY ("dailyStatsId") REFERENCES "DailyStats"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactFormMessage" ADD CONSTRAINT "ContactFormMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthIdentity" ADD CONSTRAINT "AuthIdentity_authId_fkey" FOREIGN KEY ("authId") REFERENCES "Auth"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Auth"("id") ON DELETE CASCADE ON UPDATE CASCADE;
