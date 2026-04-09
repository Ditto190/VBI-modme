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

-- MigrateData
INSERT INTO "ReportCollaborationUpdate" ("reportId", "data", "merged", "createdAt", "updatedAt")
SELECT "resourceId", "data", "merged", "createdAt", "updatedAt"
FROM "CollaborationUpdate"
WHERE "resourceType" = 'report';

INSERT INTO "ChartCollaborationUpdate" ("chartId", "data", "merged", "createdAt", "updatedAt")
SELECT "resourceId", "data", "merged", "createdAt", "updatedAt"
FROM "CollaborationUpdate"
WHERE "resourceType" = 'chart';

INSERT INTO "InsightCollaborationUpdate" ("insightId", "data", "merged", "createdAt", "updatedAt")
SELECT "resourceId", "data", "merged", "createdAt", "updatedAt"
FROM "CollaborationUpdate"
WHERE "resourceType" = 'insight';

-- DropTable
DROP TABLE "CollaborationUpdate";

-- DropEnum
DROP TYPE "ResourceType";
