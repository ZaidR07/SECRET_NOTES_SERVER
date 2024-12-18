/*
  Warnings:

  - Added the required column `title` to the `Notes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notes" ADD COLUMN     "title" TEXT NOT NULL;
