"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const issueTypes = [
  { value: "all", label: "All Issues" },
  { value: "road", label: "Road Issue" },
  { value: "water", label: "Water Supply" },
  { value: "garbage", label: "Garbage Collection" },
  { value: "electricity", label: "Electricity" },
  { value: "other", label: "Other" },
];

interface Issue {
  _id: string;
  type: string;
  title: string;
  description: string;
  imageUrl?: string;
  location: { lat: number; lng: number };
  status: string;
  date: string;
}

export default function DashboardPage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [selectedType, setSelectedType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/api/issues");
      if (!response.ok) throw new Error("Failed to fetch issues");
      const data = await response.json();
      setIssues(data);
    } catch (err) {
      setError("Failed to load issues.");
      console.error("Error fetching issues:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredIssues = useMemo(() => {
    return selectedType === "all" ? issues : issues.filter((issue) => issue.type === selectedType);
  }, [selectedType, issues]);

  const mapCenter = useMemo(() => {
    if (filteredIssues.length === 0) return { lat: 20.5937, lng: 78.9629 }; // Default (India)
    return filteredIssues[0].location; // Center on first issue
  }, [filteredIssues]);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Issues Dashboard</h1>
        <div className="w-[200px]">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              {issueTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Issues List */}
        <Card>
          <CardHeader>
            <CardTitle>Issues List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-gray-500">Loading...</TableCell>
                    </TableRow>
                  ) : error ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-red-500">{error}</TableCell>
                    </TableRow>
                  ) : filteredIssues.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-gray-500">No issues found</TableCell>
                    </TableRow>
                  ) : (
                    filteredIssues.map((issue) => (
                      <TableRow key={issue._id}>
                        <TableCell className="font-medium">{issue.type}</TableCell>
                        <TableCell>{issue.title}</TableCell>
                        <TableCell>{issue.description}</TableCell>
                        <TableCell>
                          {issue.imageUrl ? (
                            <img src={issue.imageUrl} alt="Issue" className="w-20 h-20 rounded-md object-cover" />
                          ) : (
                            <span className="text-gray-400">No Image</span>
                          )}
                        </TableCell>
                        <TableCell>{issue.status}</TableCell>
                        <TableCell>{formatDate(issue.date)}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Google Maps Integration */}
        <Card>
          <CardHeader>
            <CardTitle>Issue Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full rounded-md overflow-hidden">
              {loading ? (
                <div className="flex justify-center items-center h-full text-gray-500">Loading map...</div>
              ) : (
                <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
                  <GoogleMap
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    center={mapCenter}
                    zoom={filteredIssues.length > 0 ? 12 : 5}
                  >
                    {filteredIssues.map((issue) => (
                      <Marker key={issue._id} position={issue.location} title={issue.type} />
                    ))}
                  </GoogleMap>
                </LoadScript>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
