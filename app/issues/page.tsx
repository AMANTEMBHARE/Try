import { useEffect, useState } from "react";

interface Issue {
  _id: string;
  title: string;
  description: string;
}

export default function IssuesPage() {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:5000/api/issues");
      const data = await res.json();
      setIssues(data);
    }
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Reported Issues</h1>
      <ul className="mt-4">
        {issues.map((issue) => (
          <li key={issue._id} className="border p-4 rounded mb-2">
            <strong>{issue.title}</strong>: {issue.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
