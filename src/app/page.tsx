import Link from "next/link";
import { getContent } from "@/lib/getContent";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const content = await getContent();
  const hero = content.hero || {};
  const about = content.about || {};
  const services = content.services || [];
  const gallery = content.gallery || [];
  const partners = content.partners || [];

  return (
    <main className="flex-grow">
      <div>
        <section className="relative overflow-hidden text-white py-32 px-4 text-center min-h-[70vh] flex items-center justify-center">
          <video autoPlay className="absolute inset-0 w-full h-full object-cover z-0" loop muted playsInline>
            <source src="/video-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/35 z-10"></div>
          <div className="relative max-w-4xl mx-auto z-20">
            <div className="inline-flex items-center space-x-2 bg-black/30 px-3 py-1 rounded-full text-xs font-semibold mb-6 border border-white/10 backdrop-blur-sm">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
              <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">{hero.tagline || "ISO 9001:2015 Certified Company"}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]">
              {hero.title || "Complete Technology & Infrastructure Solutions"}
            </h1>
            <p className="text-lg md:text-xl text-gray-100 mb-10 max-w-2xl mx-auto font-medium drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)]">
              {hero.subtitle || "We supply, install, and integrate Audio-Visual Systems, Workspace Furniture, IT Solutions, and Surveillance setups for corporate, education, and government sectors."}
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link className="bg-secondary text-gray-950 font-bold px-8 py-3.5 rounded-lg flex items-center justify-center hover:bg-yellow-500 transition-colors hover:text-gray-950 text-decoration-none" href="/services">
                Our Solutions
                <svg className="lucide lucide-arrow-right w-4.5 h-4.5 ml-2" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Link>
              <Link className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-8 py-3.5 rounded-lg transition-colors text-decoration-none" href="/contact">
                Get free quote
              </Link>
            </div>
          </div>
        </section>
        
        <section className="py-20 max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Key Business Solutions</h2>
            <div className="w-12 h-1 bg-secondary mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-xl mx-auto">From consult to integration, we deliver high-performance products suited for your technical workspace.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.slice(0, 4).map((s: any, idx: number) => (
              <Link key={idx} className="group relative h-64 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-end text-decoration-none border border-gray-100 p-4" href={`/services#${s.id || ''}`}>
                <img alt={s.title} className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300" src={s.image} />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent"></div>
                <div className="relative p-6 z-10">
                  <div className="w-9 h-9 bg-secondary text-gray-950 rounded-lg flex items-center justify-center mb-3">
                    <svg className="lucide lucide-tv w-4.5 h-4.5" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                      <rect height="15" rx="2" ry="2" width="20" x="2" y="7"></rect>
                      <polyline points="17 2 12 7 7 2"></polyline>
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-white tracking-wide uppercase leading-tight">{s.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="py-20 bg-gray-100 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-bold text-secondary uppercase tracking-widest block mb-2">ABOUT OUR COMPANY</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{about.title || "Empowering Modern Workspaces Since 2023"}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{about.description1}</p>
              <p className="text-gray-600 leading-relaxed mb-8">{about.description2}</p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <svg className="lucide lucide-circle-check w-5 h-5 text-secondary flex-shrink-0" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  <span className="text-sm font-semibold text-gray-800">ISO 9001:2015 Standards</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="lucide lucide-circle-check w-5 h-5 text-secondary flex-shrink-0" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  <span className="text-sm font-semibold text-gray-800">Expert Team Support</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-6 text-primary border-b pb-3">Why Partner With Us?</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-50 text-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="lucide lucide-award w-5 h-5" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                      <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
                      <circle cx="12" cy="8" r="6"></circle>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Genuine High-Quality Products</h4>
                    <p className="text-gray-600 text-sm mt-1">We source directly from leading OEMs, ensuring authentic products with full warranty.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-50 text-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="lucide lucide-star w-5 h-5" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">End-to-End Execution</h4>
                    <p className="text-gray-600 text-sm mt-1">We handle site assessment, cabling, setup, installation, testing, and training.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-50 text-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="lucide lucide-circle-check w-5 h-5" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Competitive Pricing</h4>
                    <p className="text-gray-600 text-sm mt-1">Transparent quoting and bulk project discount structures for budget comfort.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Installations</h2>
            <div className="w-12 h-1 bg-secondary mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-xl mx-auto">A glimpse of our recent Audio-Visual integration, CCTV setups, and institutional workspace assemblies.</p>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-500">
              {gallery.slice(0, 4).map((img: any, idx: number) => (
                <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all group">
                  <div className="h-64 overflow-hidden bg-white flex items-center justify-center">
                    <img alt={img.title} className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300" src={img.src} />
                  </div>
                  <div className="p-3 text-center">
                    <p className="text-xs font-semibold text-gray-700 truncate">{img.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white overflow-hidden">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Partners</h2>
            <div className="w-12 h-1 bg-secondary mx-auto mb-4"></div>
            <p className="text-gray-650 max-w-xl mx-auto text-sm">We integrate high-performance products from trusted industry leading brands.</p>
          </div>
          <div className="relative w-full overflow-hidden py-6 bg-gray-50 border-y border-gray-100 flex items-center">
            <div className="animate-marquee flex whitespace-nowrap space-x-12 items-center">
              {[...partners, ...partners, ...partners].map((partner: any, idx: number) => (
                <div key={idx} className="flex-shrink-0 flex items-center justify-center bg-white p-4 h-24 w-44 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <img alt={partner.name} className="max-h-16 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" src={partner.src} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary text-white py-16 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to upgrade your infrastructure?</h2>
            <p className="text-gray-200 mb-8 max-w-lg mx-auto text-sm">Contact our sales team today to discuss your audio-visual, furniture, IT, or surveillance project requirements.</p>
            <Link className="bg-secondary text-gray-950 font-bold px-8 py-3.5 rounded-lg inline-flex items-center hover:bg-yellow-500 transition-colors text-decoration-none hover:text-gray-950" href="/contact">
              Get in touch
              <svg className="lucide lucide-arrow-right w-4.5 h-4.5 ml-2" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}