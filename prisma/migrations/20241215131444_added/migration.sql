-- CreateTable
CREATE TABLE "Notes" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Notes_pkey" PRIMARY KEY ("id")
);
