'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  type: z.string().min(1, 'Please select an issue type'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

const defaultCenter = {
  lat: 40.7128,
  lng: -74.0060,
};

export default function ReportIssuePage() {
  const [selectedLocation, setSelectedLocation] = useState(defaultCenter);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: '',
      description: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ ...values, location: selectedLocation });
    toast({
      title: 'Issue Reported',
      description: 'Your issue has been successfully reported.',
    });
    form.reset();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Report an Issue</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issue Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select issue type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="road">Road Issue</SelectItem>
                      <SelectItem value="water">Water Issue</SelectItem>
                      <SelectItem value="garbage">Garbage Issue</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the issue in detail..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Location</FormLabel>
              <div className="h-[300px] rounded-md overflow-hidden">
                {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
                  <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
                    <GoogleMap
                      mapContainerStyle={{ width: '100%', height: '100%' }}
                      center={selectedLocation}
                      zoom={13}
                      onClick={(e) => {
                        if (e.latLng) {
                          setSelectedLocation({
                            lat: e.latLng.lat(),
                            lng: e.latLng.lng(),
                          });
                        }
                      }}
                    >
                      <Marker position={selectedLocation} />
                    </GoogleMap>
                  </LoadScript>
                ) : (
                  <div className="h-full flex items-center justify-center bg-muted">
                    <p className="text-muted-foreground">
                      Please configure your Google Maps API key in the .env file
                    </p>
                  </div>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full">
              Submit Report
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}