'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const issueTypes = [
  { value: 'road', label: 'Road Issue' },
  { value: 'water', label: 'Water Supply' },
  { value: 'garbage', label: 'Garbage Collection' },
  { value: 'electricity', label: 'Electricity' },
  { value: 'other', label: 'Other' },
];

const defaultCenter = {
  lat: 20.5937, // Default to India's center
  lng: 78.9629,
};

export function IssueForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(defaultCenter);
  const [formData, setFormData] = useState({
    type: '',
    description: '',
  });

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setLocation({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/issues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          location,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit issue');
      }

      toast({
        title: 'Success!',
        description: 'Issue has been reported successfully.',
      });

      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit issue. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Issue Type</label>
          <Select
            value={formData.type}
            onValueChange={(value) => setFormData({ ...formData, type: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select issue type" />
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

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe the issue..."
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Location</label>
          <div className="h-[300px] w-full rounded-md overflow-hidden">
            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={location}
                zoom={5}
                onClick={handleMapClick}
              >
                <Marker position={location} />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Issue'}
        </Button>
      </form>
    </Card>
  );
}
