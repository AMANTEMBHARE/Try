'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const issueTypes = [
  { value: 'all', label: 'All Issues' },
  { value: 'road', label: 'Road Issue' },
  { value: 'water', label: 'Water Supply' },
  { value: 'garbage', label: 'Garbage Collection' },
  { value: 'electricity', label: 'Electricity' },
  { value: 'other', label: 'Other' },
];

interface Issue {
  _id: string;
  type: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  status: string;
  date: string;
}

export default function DashboardPage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
  const [selectedType, setSelectedType] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIssues();
  }, []);

  useEffect(() => {
    if (selectedType === 'all') {
      setFilteredIssues(issues);
    } else {
      setFilteredIssues(issues.filter(issue => issue.type === selectedType));
    }
  }, [selectedType, issues]);

  const fetchIssues = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/issues');
      if (!response.ok) throw new Error('Failed to fetch issues');
      const data = await response.json();
      setIssues(data);
      setFilteredIssues(data);
    } catch (error) {
      console.error('Error fetching issues:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">Loading...</TableCell>
                    </TableRow>
                  ) : filteredIssues.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">No issues found</TableCell>
                    </TableRow>
                  ) : (
                    filteredIssues.map((issue) => (
                      <TableRow key={issue._id}>
                        <TableCell className="font-medium">{issue.type}</TableCell>
                        <TableCell>{issue.description}</TableCell>
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

        <Card>
          <CardHeader>
            <CardTitle>Issue Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full rounded-md overflow-hidden">
              <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '100%' }}
                  center={{ lat: 20.5937, lng: 78.9629 }}
                  zoom={5}
                >
                  {filteredIssues.map((issue) => (
                    <Marker
                      key={issue._id}
                      position={issue.location}
                      title={issue.type}
                    />
                  ))}
                </GoogleMap>
              </LoadScript>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
