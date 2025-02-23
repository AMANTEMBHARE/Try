import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  const faqs = [
    {
      question: "How quickly will my reported issue be addressed?",
      answer: "Issues are typically reviewed within 24-48 hours. Priority is given to urgent matters affecting public safety. You can track the status of your report through your dashboard."
    },
    {
      question: "Can I report issues anonymously?",
      answer: "Yes, you can submit reports anonymously. However, creating an account helps you track the progress of your reports and receive updates."
    },
    {
      question: "What types of issues can I report?",
      answer: "You can report various civic issues including road problems, water issues, garbage collection, street lighting, public safety concerns, and more."
    },
    {
      question: "How do I track the progress of my report?",
      answer: "Log into your account and visit the dashboard to see real-time updates on all your submitted reports."
    },
    {
      question: "Can I update or add information to my report?",
      answer: "Yes, you can add comments or additional information to your reports through your dashboard at any time."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>

      {/* Contact Information Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="h-6 w-6 mr-2" />
              Phone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Main: (555) 123-4567<br />
              Support: (555) 987-6543
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="h-6 w-6 mr-2" />
              Email
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              General: info@civicwatch.com<br />
              Support: support@civicwatch.com
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-6 w-6 mr-2" />
              Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              123 Civic Center Plaza<br />
              Suite 456<br />
              City, State 12345
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Contact Form */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <Card>
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Input placeholder="Your Name" />
              </div>
              <div>
                <Input type="email" placeholder="Your Email" />
              </div>
              <div>
                <Input placeholder="Subject" />
              </div>
              <div>
                <Textarea placeholder="Your Message" className="min-h-[150px]" />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
