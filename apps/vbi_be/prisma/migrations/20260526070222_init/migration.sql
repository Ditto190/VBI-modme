-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "data" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chart" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "data" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Insight" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "data" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Insight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportCollaborationUpdate" (
    "id" BIGSERIAL NOT NULL,
    "reportId" TEXT NOT NULL,
    "data" BYTEA NOT NULL,
    "merged" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReportCollaborationUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChartCollaborationUpdate" (
    "id" BIGSERIAL NOT NULL,
    "chartId" TEXT NOT NULL,
    "data" BYTEA NOT NULL,
    "merged" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChartCollaborationUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsightCollaborationUpdate" (
    "id" BIGSERIAL NOT NULL,
    "insightId" TEXT NOT NULL,
    "data" BYTEA NOT NULL,
    "merged" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InsightCollaborationUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Report_updatedAt_idx" ON "Report"("updatedAt");

-- CreateIndex
CREATE INDEX "Chart_updatedAt_idx" ON "Chart"("updatedAt");

-- CreateIndex
CREATE INDEX "Insight_updatedAt_idx" ON "Insight"("updatedAt");

-- CreateIndex
CREATE INDEX "ReportCollaborationUpdate_reportId_id_idx" ON "ReportCollaborationUpdate"("reportId", "id");

-- CreateIndex
CREATE INDEX "ReportCollaborationUpdate_reportId_merged_idx" ON "ReportCollaborationUpdate"("reportId", "merged");

-- CreateIndex
CREATE INDEX "ChartCollaborationUpdate_chartId_id_idx" ON "ChartCollaborationUpdate"("chartId", "id");

-- CreateIndex
CREATE INDEX "ChartCollaborationUpdate_chartId_merged_idx" ON "ChartCollaborationUpdate"("chartId", "merged");

-- CreateIndex
CREATE INDEX "InsightCollaborationUpdate_insightId_id_idx" ON "InsightCollaborationUpdate"("insightId", "id");

-- CreateIndex
CREATE INDEX "InsightCollaborationUpdate_insightId_merged_idx" ON "InsightCollaborationUpdate"("insightId", "merged");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
