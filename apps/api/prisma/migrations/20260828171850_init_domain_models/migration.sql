-- CreateEnum
CREATE TYPE "caregiver_role" AS ENUM ('OWNER', 'CAREGIVER');

-- CreateEnum
CREATE TYPE "sex" AS ENUM ('MALE', 'FEMALE', 'OTHER', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "feeding_type" AS ENUM ('BREASTFEEDING', 'BOTTLE', 'FORMULA', 'STORED_BREAST_MILK', 'OTHER');

-- CreateEnum
CREATE TYPE "breast_side" AS ENUM ('LEFT', 'RIGHT', 'BOTH');

-- CreateEnum
CREATE TYPE "diaper_type" AS ENUM ('PEE', 'POOP', 'BOTH');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "baby_caregivers" (
    "id" TEXT NOT NULL,
    "baby_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role" "caregiver_role" NOT NULL DEFAULT 'CAREGIVER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "baby_caregivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "babies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birth_date" DATE NOT NULL,
    "birth_time" TEXT,
    "sex" "sex" NOT NULL DEFAULT 'UNKNOWN',
    "birth_weight" DECIMAL(6,3),
    "birth_weight_unit" TEXT NOT NULL DEFAULT 'kg',
    "birth_height" DECIMAL(6,2),
    "birth_height_unit" TEXT NOT NULL DEFAULT 'cm',
    "photo_url" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "babies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feeding_records" (
    "id" TEXT NOT NULL,
    "baby_id" TEXT NOT NULL,
    "occurred_at" TIMESTAMP(3) NOT NULL,
    "started_at" TIMESTAMP(3),
    "ended_at" TIMESTAMP(3),
    "duration_minutes" INTEGER,
    "type" "feeding_type" NOT NULL,
    "breast_side" "breast_side",
    "quantity" DECIMAL(8,2),
    "quantity_unit" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feeding_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diaper_records" (
    "id" TEXT NOT NULL,
    "baby_id" TEXT NOT NULL,
    "occurred_at" TIMESTAMP(3) NOT NULL,
    "type" "diaper_type" NOT NULL,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "diaper_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sleep_records" (
    "id" TEXT NOT NULL,
    "baby_id" TEXT NOT NULL,
    "occurred_at" TIMESTAMP(3) NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL,
    "ended_at" TIMESTAMP(3),
    "duration_minutes" INTEGER,
    "location" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sleep_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weight_records" (
    "id" TEXT NOT NULL,
    "baby_id" TEXT NOT NULL,
    "occurred_at" TIMESTAMP(3) NOT NULL,
    "weight" DECIMAL(6,3) NOT NULL,
    "unit" TEXT NOT NULL DEFAULT 'kg',
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "weight_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "height_records" (
    "id" TEXT NOT NULL,
    "baby_id" TEXT NOT NULL,
    "occurred_at" TIMESTAMP(3) NOT NULL,
    "height" DECIMAL(6,2) NOT NULL,
    "unit" TEXT NOT NULL DEFAULT 'cm',
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "height_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diary_entries" (
    "id" TEXT NOT NULL,
    "baby_id" TEXT NOT NULL,
    "occurred_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "photo_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "diary_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "milestone_events" (
    "id" TEXT NOT NULL,
    "baby_id" TEXT NOT NULL,
    "occurred_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "photo_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "milestone_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "baby_caregivers_user_id_idx" ON "baby_caregivers"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "baby_caregivers_baby_id_user_id_key" ON "baby_caregivers"("baby_id", "user_id");

-- CreateIndex
CREATE INDEX "feeding_records_baby_id_occurred_at_idx" ON "feeding_records"("baby_id", "occurred_at" DESC);

-- CreateIndex
CREATE INDEX "diaper_records_baby_id_occurred_at_idx" ON "diaper_records"("baby_id", "occurred_at" DESC);

-- CreateIndex
CREATE INDEX "sleep_records_baby_id_occurred_at_idx" ON "sleep_records"("baby_id", "occurred_at" DESC);

-- CreateIndex
CREATE INDEX "weight_records_baby_id_occurred_at_idx" ON "weight_records"("baby_id", "occurred_at" DESC);

-- CreateIndex
CREATE INDEX "height_records_baby_id_occurred_at_idx" ON "height_records"("baby_id", "occurred_at" DESC);

-- CreateIndex
CREATE INDEX "diary_entries_baby_id_occurred_at_idx" ON "diary_entries"("baby_id", "occurred_at" DESC);

-- CreateIndex
CREATE INDEX "milestone_events_baby_id_occurred_at_idx" ON "milestone_events"("baby_id", "occurred_at" DESC);

-- AddForeignKey
ALTER TABLE "baby_caregivers" ADD CONSTRAINT "baby_caregivers_baby_id_fkey" FOREIGN KEY ("baby_id") REFERENCES "babies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "baby_caregivers" ADD CONSTRAINT "baby_caregivers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feeding_records" ADD CONSTRAINT "feeding_records_baby_id_fkey" FOREIGN KEY ("baby_id") REFERENCES "babies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diaper_records" ADD CONSTRAINT "diaper_records_baby_id_fkey" FOREIGN KEY ("baby_id") REFERENCES "babies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sleep_records" ADD CONSTRAINT "sleep_records_baby_id_fkey" FOREIGN KEY ("baby_id") REFERENCES "babies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weight_records" ADD CONSTRAINT "weight_records_baby_id_fkey" FOREIGN KEY ("baby_id") REFERENCES "babies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "height_records" ADD CONSTRAINT "height_records_baby_id_fkey" FOREIGN KEY ("baby_id") REFERENCES "babies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diary_entries" ADD CONSTRAINT "diary_entries_baby_id_fkey" FOREIGN KEY ("baby_id") REFERENCES "babies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "milestone_events" ADD CONSTRAINT "milestone_events_baby_id_fkey" FOREIGN KEY ("baby_id") REFERENCES "babies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
