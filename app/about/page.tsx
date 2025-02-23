import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Users, Target, User } from 'lucide-react';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: '/team/sarah.jpg',
      bio: 'Passionate about urban development and community engagement'
    },
    {
      name: 'Michael Chen',
      role: 'Technical Director',
      image: '/team/michael.jpg',
      bio: 'Expert in civic technology and smart city solutions'
    },
    {
      name: 'Priya Patel',
      role: 'Community Manager',
      image: '/team/priya.jpg',
      bio: 'Dedicated to fostering community relationships'
    },
    {
      name: 'David Kim',
      role: 'Environmental Specialist',
      image: '/team/david.jpg',
      bio: 'Focused on sustainable urban development'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Mission & Vision Section */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold text-center mb-12">About CivicWatch</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-6 w-6 mr-2" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To empower citizens and local authorities to work together in creating
                cleaner, safer, and more efficient communities through technology-driven
                civic engagement.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-6 w-6 mr-2" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To build a world where every community member has the power to
                contribute to positive change, creating smart, sustainable cities
                that work for everyone.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Environmental Impact Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Environmental Impact</h2>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Leaf className="h-6 w-6 mr-2" />
              Our Commitment to Sustainability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                At CivicWatch, we're committed to environmental sustainability through:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Reducing paper waste through digital reporting</li>
                <li>Promoting efficient resource allocation in city services</li>
                <li>Supporting green infrastructure initiatives</li>
                <li>Encouraging community-led environmental projects</li>
                <li>Tracking and reducing carbon footprint in civic operations</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Our Team Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <User className="h-16 w-16 text-primary" />
                </div>
                <CardTitle className="text-center">{member.name}</CardTitle>
                <p className="text-center text-sm text-muted-foreground">{member.role}</p>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
