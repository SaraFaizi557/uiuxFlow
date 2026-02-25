import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await currentUser();

  // If no authenticated user or email, return 401
  if (!user || !user.primaryEmailAddress?.emailAddress) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = user.primaryEmailAddress.emailAddress;

  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  // If user not found in DB, create it
  if (users.length === 0) {
    const [result] = await db
      .insert(usersTable)
      .values({
        email,
        age: 0, // or any default age you prefer
      })
      .returning();

    return NextResponse.json(result);
  }

  // User already exists, return existing record
  return NextResponse.json(users[0])
}