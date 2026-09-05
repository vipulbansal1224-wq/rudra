import Link from "next/link";
import { getContent } from "@/lib/getContent";

export const dynamic = 'force-dynamic';

export default async function Page() {
  const content = await getContent();
  const contact = content.contact || {};

  return (
    <main className="flex-grow">
      <div className="bg-gray-50 min-h-screen">
        <section className="bg-gradient-to-br from-primary to-slate-800 text-white py-16 px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Contact Our Sales Desk</h1>
          <p className="text-gray-300 max-w-xl mx-auto text-sm md:text-base font-light">
            Get in touch with our tech experts in Panchkula to receive customized quotes.
          </p>
        </section>
        <section className="py-16 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">Corporate Office</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <svg className="lucide lucide-map-pin w-6 h-6 text-secondary mr-4 flex-shrink-0 mt-0.5" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Office Address</h4>
                      <p className="text-gray-600 text-sm mt-1 leading-relaxed">{contact.address || "34 A, SD Complex, Opposite Housing Board, Distt Panchkula, Haryana, 133302"}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="lucide lucide-phone w-6 h-6 text-secondary mr-4 flex-shrink-0 mt-0.5" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Call/WhatsApp Desk</h4>
                      <p className="text-gray-600 text-sm mt-1">{contact.phone1 || "+91 97790 74420"} (Sales)</p>
                      <p className="text-gray-600 text-sm mt-0.5">{contact.phone2 || "+91 95881 00159"} (Support)</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="lucide lucide-mail w-6 h-6 text-secondary mr-4 flex-shrink-0 mt-0.5" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><rect height="16" rx="2" width="20" x="2" y="4"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Email Support</h4>
                      <p className="text-gray-600 text-sm mt-1">{contact.email || "info@rudrakashenterprises.com"}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="lucide lucide-clock w-6 h-6 text-secondary mr-4 flex-shrink-0 mt-0.5" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Working Hours</h4>
                      <p className="text-gray-600 text-sm mt-1">{contact.workingHours || "Monday - Saturday (09:30 AM - 06:30 PM)"}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-2 rounded-2xl border border-gray-200 shadow-sm overflow-hidden h-72">
                <iframe className="rounded-lg" height="100%" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=34%20A%2C%20SD%20Complex%2C%20Opposite%20Housing%20Board%2C%20Panchkula%2C%20Haryana%20133302&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=&amp;output=embed" style={{ border: 0 }} title="Office Location Map" width="100%"></iframe>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-200 shadow-sm h-full">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Quote / Submit Query</h3>
                <p className="text-gray-600 text-sm mb-8">Fill out the technical requirements form below. Our project engineer will call you back within 24 hours.</p>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                      <input className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary" placeholder="Enter your name" required type="text" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
                      <input className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary" placeholder="Enter phone number" required type="tel" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      <input className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary" placeholder="Enter email address" type="email" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Organization</label>
                      <input className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary" placeholder="Enter organization / school" type="text" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Solutions Needed</label>
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary">
                      <option value="all">Complete Technology Setup</option>
                      <option value="av">Audio-Visual Integration</option>
                      <option value="furniture">Institutional Furniture</option>
                      <option value="it">IT Hardware Solutions</option>
                      <option value="security">CCTV &amp; Surveillance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Project Requirements</label>
                    <textarea className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary" placeholder="Describe your site details, specific requirements, number of components, or product models..." required rows={5}></textarea>
                  </div>
                  <button className="w-full bg-primary hover:bg-blue-800 text-white font-bold py-3.5 px-6 rounded-lg transition-colors flex items-center justify-center text-sm" type="submit">
                    <svg className="lucide lucide-send w-4.5 h-4.5 mr-2" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>
                    Submit Booking Query
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
