ALTER TABLE "public"."interactions" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."interaction_type";--> statement-breakpoint
CREATE TYPE "public"."interaction_type" AS ENUM('VIEW', 'BORROW', 'FAVORITE', 'RATE');--> statement-breakpoint
ALTER TABLE "public"."interactions" ALTER COLUMN "type" SET DATA TYPE "public"."interaction_type" USING "type"::"public"."interaction_type";