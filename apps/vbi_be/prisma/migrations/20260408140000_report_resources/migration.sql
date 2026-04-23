-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('report', 'chart', 'insight');

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
CREATE TABLE "CollaborationUpdate" (
    "id" BIGSERIAL NOT NULL,
    "resourceType" "ResourceType" NOT NULL,
    "resourceId" TEXT NOT NULL,
    "data" BYTEA NOT NULL,
    "merged" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CollaborationUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Report_updatedAt_idx" ON "Report"("updatedAt");

-- CreateIndex
CREATE INDEX "Chart_updatedAt_idx" ON "Chart"("updatedAt");

-- CreateIndex
CREATE INDEX "Insight_updatedAt_idx" ON "Insight"("updatedAt");

-- CreateIndex
CREATE INDEX "CollaborationUpdate_resourceType_resourceId_id_idx" ON "CollaborationUpdate"("resourceType", "resourceId", "id");

-- CreateIndex
CREATE INDEX "CollaborationUpdate_resourceType_resourceId_merged_idx" ON "CollaborationUpdate"("resourceType", "resourceId", "merged");

-- DropForeignKey
ALTER TABLE "DocumentUpdate" DROP CONSTRAINT "DocumentUpdate_documentId_fkey";

-- DropTable
DROP TABLE "DocumentUpdate";

-- DropTable
DROP TABLE "Document";
