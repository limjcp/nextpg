import { auth } from "@/auth";
import AuthButton from "./AuthButton.server";
import prisma from "@/lib/prisma";

export default async function Home() {
  const session = await auth();

  return (
    <main>
      <h1 className="text-3xl font-bold">Homepage</h1>

      <pre>{JSON.stringify(session, null, 2)}</pre>
      <AuthButton />
    </main>
  );
}
