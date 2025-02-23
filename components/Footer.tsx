import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-100 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">CivicWatch</h3>
            <p className="text-gray-600">Making our community better, one report at a time.</p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">About Us</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-600 hover:text-gray-900">Our Story</Link></li>
              <li><Link href="/about#mission" className="text-gray-600 hover:text-gray-900">Mission & Vision</Link></li>
              <li><Link href="/about#environment" className="text-gray-600 hover:text-gray-900">Environmental Impact</Link></li>
              <li><Link href="/about#team" className="text-gray-600 hover:text-gray-900">Our Team</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link></li>
              <li><Link href="/report" className="text-gray-600 hover:text-gray-900">Report Issue</Link></li>
              <li><Link href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact & Support</h4>
            <ul className="space-y-2">
              <li><Link href="/contact#faq" className="text-gray-600 hover:text-gray-900">FAQs</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-gray-900">Get in Touch</Link></li>
              <li className="text-gray-600">Email: contact@civicwatch.com</li>
              <li className="text-gray-600">Phone: (555) 123-4567</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} CivicWatch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
