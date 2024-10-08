import { auth } from "@/auth";

import WhoAmIServerAction from "./WhoAmIServerAction";
import WhoAmIAPI from "./WhoAmIAPI";
import WhoAmIRSC from "./WhoAmIRSC";

export default async function TestRoute() {
  const session = await auth();
  console.log("Session data:", session); // Log the session data

  async function onGetUserAction() {
    "use server";
    const session = await auth();
    console.log("Session data in onGetUserAction:", session); // Log the session data in the action
    return session?.user?.name ?? null;
  }

  return (
    <main>
      <h1 className="text-3xl mb-5">Test Route</h1>
      <div>User: {session?.user?.name}</div>
      <WhoAmIServerAction onGetUserAction={onGetUserAction} />
      <WhoAmIAPI />
      <WhoAmIRSC />
    </main>
  );
}
