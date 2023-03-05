/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `MeetsWith` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `MeetsWith_name_key` ON `MeetsWith`(`name`);
