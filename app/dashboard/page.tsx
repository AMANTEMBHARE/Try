'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const dummyIssues = [
  {
    id: 1,
    type: 'road',
    description: 'Large pothole on Main Street',
    status: 'pending',
    date: '2024-03-20',
    location: '40.7128, -74.0060',
  },
  {
    id: 2,
    type: 'water',
    description: 'Water leak from broken pipe',
    status: 'in-progress',
    date: '2024-03-19',
    location: '40.7129, -74.0061',
  },
  {
    id: 3,
    type: 'garbage',
    description: 'Uncollected trash on Park Avenue',
    status: 'resolved',
    date: '2024-03-18',
    location: '40.7130, -74.0062',
  },
];

const statusColors = {
  pending: 'bg-yellow-500/10 text-yellow-500',
  'in-progress': 'bg-blue-500/10 text-blue-500',
  resolved: 'bg-green-500/10 text-green-500',
};

export default function DashboardPage() {
  const [filter, setFilter] = useState('all');

  const filteredIssues = filter === 'all'
    ? dummyIssues
    : dummyIssues.filter(issue => issue.type === filter);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Issue Reports</CardTitle>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Issues</SelectItem>
                <SelectItem value="road">Road Issues</SelectItem>
                <SelectItem value="water">Water Issues</SelectItem>
                <SelectItem value="garbage">Garbage Issues</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIssues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell>{issue.id}</TableCell>
                  <TableCell className="capitalize">{issue.type}</TableCell>
                  <TableCell>{issue.description}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={`${
                        statusColors[issue.status as keyof typeof statusColors]
                      }`}
                    >
                      {issue.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{issue.date}</TableCell>
                  <TableCell>{issue.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}