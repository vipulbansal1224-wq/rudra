/* eslint-disable */
import Link from "next/link";
import { getContent } from "@/lib/getContent";

export const dynamic = 'force-dynamic';

export default async function Page() {
  const content = await getContent();
  const services = content.services || [];

  return (
    <main className="flex-grow">
      <div className="bg-gray-50 min-h-screen">
        <section className="bg-gradient-to-br from-primary to-slate-800 text-white py-16 px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Our Technology & Infrastructure Solutions</h1>
          <p className="text-gray-300 max-w-xl mx-auto text-sm md:text-base font-light">
            Complete, end-to-end design, supply, integration, and technical support.
          </p>
        </section>
        
        <section className="py-16 max-w-7xl mx-auto px-4 space-y-16">
          {services.map((service: any, idx: number) => (
            <div key={idx} className="bg-white p-8 md:p-12 rounded-2xl border border-gray-200 shadow-sm scroll-mt-24" id={service.id}>
              <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                <div className="lg:w-1/3 border-b lg:border-b-0 lg:border-r border-gray-150 pb-6 lg:pb-0 lg:pr-8">
                  <div className="relative w-full h-64 mb-6 bg-gray-100 rounded-xl overflow-hidden shadow-inner">
                    <img alt={service.title} className="w-full h-full object-cover" src={service.image} />
                    <div className="absolute top-3 left-3 w-10 h-10 bg-primary/90 text-white rounded-lg flex items-center justify-center shadow-md">
                      <svg className="lucide lucide-tv w-5 h-5" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <rect height="15" rx="2" ry="2" width="20" x="2" y="7"></rect>
                        <polyline points="17 2 12 7 7 2"></polyline>
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-heading mb-4">{service.title}</h2>
                  <p className="text-gray-650 text-xs leading-relaxed mb-6">{service.description}</p>
                  <Link className="inline-flex items-center text-sm font-bold text-primary hover:underline text-decoration-none" href="/contact">
                    Request custom setup
                    <svg className="lucide lucide-arrow-right w-4 h-4 ml-1.5" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
                <div className="lg:w-2/3">
                  <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-6">WHAT WE OFFER (Click for details)</h3>
                  <div className="grid grid-cols-1 gap-6">
                    {service.items.map((item: any, itemIdx: number) => {
                      const itemText = typeof item === 'string' ? item : (item.text || "");
                      const itemImages = typeof item === 'string' ? [] : (item.images || []);
                      return (
                        <div key={itemIdx} className="flex flex-col bg-white p-4 rounded-xl border border-gray-150 shadow-sm hover:border-primary hover:shadow-md transition-all group">
                          <div className="flex items-center text-left space-x-3 text-gray-700">
                            <div className="w-2 h-2 bg-secondary rounded-full flex-shrink-0 group-hover:bg-primary transition-colors"></div>
                            <span className="font-bold flex-1 text-base">{itemText}</span>
                          </div>
                          {itemImages.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                              {itemImages.map((img: string, imgIdx: number) => (
                                <div key={imgIdx} className="h-24 overflow-hidden rounded-lg border border-gray-100">
                                  <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={itemText} />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}