"use client";
import React, { useEffect, useState } from "react";

interface Requirement {
  id: number;
  name: string;
}

interface Office {
  id: number;
  name: string;
  requirements: Requirement[];
}

const AssignRequirementsToOfficePage: React.FC = () => {
  const [offices, setOffices] = useState<Office[]>([]);
  const [selectedOfficeId, setSelectedOfficeId] = useState<number | null>(null);
  const [selectedRequirements, setSelectedRequirements] = useState<number[]>(
    []
  );

  useEffect(() => {
    const fetchOffices = async () => {
      const response = await fetch("/api/offices");
      const data = await response.json();
      setOffices(data);
    };

    fetchOffices();
  }, []);

  const handleOfficeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const officeId = parseInt(event.target.value);
    setSelectedOfficeId(officeId);
  };

  const handleRequirementChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const requirementId = parseInt(event.target.value);
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedRequirements((prevRequirements) => [
        ...prevRequirements,
        requirementId,
      ]);
    } else {
      setSelectedRequirements((prevRequirements) =>
        prevRequirements.filter((id) => id !== requirementId)
      );
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Assign selected requirements to the selected office
    const updatedOffices = offices.map((office) => {
      if (office.id === selectedOfficeId) {
        return {
          ...office,
          requirements: selectedRequirements.map((requirementId) => ({
            id: requirementId,
            name: `Requirement ${requirementId}`,
          })),
        };
      }
      return office;
    });

    setOffices(updatedOffices);
    setSelectedOfficeId(null);
    setSelectedRequirements([]);
  };

  return (
    <div>
      <h1>Assign Requirements to Office</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="office">Select Office:</label>
          <select
            id="office"
            value={selectedOfficeId || ""}
            onChange={handleOfficeChange}
          >
            <option value="">Select an office</option>
            {offices.map((office) => (
              <option key={office.id} value={office.id}>
                {office.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Assign Requirements:</label>
          {selectedOfficeId && (
            <ul>
              {offices
                .find((office) => office.id === selectedOfficeId)
                ?.requirements.map((requirement) => (
                  <li key={requirement.id}>
                    <label>
                      <input
                        type="checkbox"
                        value={requirement.id}
                        checked={selectedRequirements.includes(requirement.id)}
                        onChange={handleRequirementChange}
                      />
                      {requirement.name}
                    </label>
                  </li>
                ))}
            </ul>
          )}
        </div>
        <button type="submit">Assign Requirements</button>
      </form>
    </div>
  );
};

export default AssignRequirementsToOfficePage;
