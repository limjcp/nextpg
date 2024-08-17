"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import React from "react";
import { useSession } from "next-auth/react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ClearancePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [studentId, setStudentId] = useState<string | null>(null);

  useEffect(() => {
    console.log("Session data:", session);
    if (session && session.user && session.user.studentId) {
      setStudentId(session.user.studentId);
      router.push(`/clearance?studentId=${session.user.studentId}`);
    }
  }, [session, router]);

  useEffect(() => {
    console.log("Router is ready:", router.isReady);
    console.log("Router query:", router.query);
    if (router.isReady && router.query.studentId) {
      setStudentId(router.query.studentId as string);
    }
  }, [router.isReady, router.query]);

  const { data, error } = useSWR(
    studentId ? `/api/clearance/${studentId}` : null,
    fetcher
  );

  if (!studentId) return <div>Missing student ID</div>;
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Clearance Status</h2>
      <table className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Office</th>
            <th className="border border-gray-300 p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((clearance) =>
            clearance.steps.map((step, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">
                  {step.office.name}
                </td>
                <td className="border border-gray-300 p-2">
                  <span
                    className={`px-2 py-1 rounded ${
                      step.status === "CLEARED"
                        ? "bg-green-200 text-green-800"
                        : step.status === "PENDING"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-red-200 text-red-800"
                    }`}
                  >
                    {step.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClearancePage;
