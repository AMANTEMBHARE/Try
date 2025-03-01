import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Droplets, Loader2, Trash2, Users, ChartBar, Trophy } from 'lucide-react';
import Link from 'next/link';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to PublicPulse</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Report and track community issues to make our city better
          </p>
          <Link href="/report">
            <Button size="lg" className="bg-primary">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Report an Issue
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Loader2 className="h-6 w-6 mr-2" />
                Road Issues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Report potholes, broken pavements, or any road-related problems.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Droplets className="h-6 w-6 mr-2" />
                Water Issues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Report water leaks, supply problems, or drainage issues.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trash2 className="h-6 w-6 mr-2" />
                Garbage Issues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Report uncollected garbage, illegal dumping, or cleanliness concerns.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-4">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Submit Report</h3>
              <p className="text-muted-foreground">
                Fill out the issue report form with details and location
              </p>
            </div>
            <div className="p-4">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Track Progress</h3>
              <p className="text-muted-foreground">
                Monitor the status of your reported issues
              </p>
            </div>
            <div className="p-4">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Resolution</h3>
              <p className="text-muted-foreground">
                Get updates when your reported issues are resolved
              </p>
            </div>
          </div>
        </div>

        {/* Community Impact Section */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Community Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-6 w-6 mr-2" />
                  Active Citizens
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary">5,000+</p>
                  <p className="text-muted-foreground mt-2">Engaged community members making a difference</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ChartBar className="h-6 w-6 mr-2" />
                  Issues Resolved
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary">1,200+</p>
                  <p className="text-muted-foreground mt-2">Community issues successfully addressed</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-6 w-6 mr-2" />
                  City Improvements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary">85%</p>
                  <p className="text-muted-foreground mt-2">Resolution rate within 2 weeks</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Together, we're building a stronger, safer, and more responsive community. 
              Join us in making a real difference in our city.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}