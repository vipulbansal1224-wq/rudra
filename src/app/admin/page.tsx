/* eslint-disable */
"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/content")
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          setData(res.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "Rudra@123") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("Saving...");
    
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, data }),
      });
      
      const resData = await res.json();
      if (resData.success) {
        setMessage("Content saved successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Error saving: " + resData.error);
      }
    } catch (err: any) {
      setMessage("Error saving: " + err.message);
    }
    
    setSaving(false);
  };

  // Helper for arrays (services, gallery, partners)
  const handleArrayChange = (section: string, index: number, field: string, value: any) => {
    const newData = { ...data };
    newData[section][index][field] = value;
    setData(newData);
  };

  const handleServiceItemChange = (serviceIndex: number, itemIndex: number, value: string) => {
    const newData = { ...data };
    newData.services[serviceIndex].items[itemIndex] = value;
    setData(newData);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm text-black">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">Admin Login</h1>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors">
            Login
          </button>
        </form>
      </div>
    );
  }

  if (loading) return <div className="p-8 text-center text-black">Loading content...</div>;
  if (!data) return <div className="p-8 text-center text-red-500">Error loading content</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 text-black">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm p-6 md:p-8">
        <div className="flex justify-between items-center mb-8 border-b pb-4 sticky top-0 bg-white z-10 pt-4">
          <h1 className="text-3xl font-bold text-gray-800">Content Management</h1>
          <div className="flex items-center space-x-4">
            {message && <span className={`text-sm font-semibold ${message.includes("Error") ? "text-red-500" : "text-green-600"}`}>{message}</span>}
            <button 
              onClick={handleSave} 
              disabled={saving}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-md"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Contact Details */}
          <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Contact Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Phone 1</label>
                <input 
                  type="text" 
                  value={data.contact.phone1} 
                  onChange={(e) => setData({...data, contact: {...data.contact, phone1: e.target.value}})}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Phone 2</label>
                <input 
                  type="text" 
                  value={data.contact.phone2} 
                  onChange={(e) => setData({...data, contact: {...data.contact, phone2: e.target.value}})}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Email</label>
                <input 
                  type="text" 
                  value={data.contact.email} 
                  onChange={(e) => setData({...data, contact: {...data.contact, email: e.target.value}})}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Working Hours</label>
                <input 
                  type="text" 
                  value={data.contact.workingHours} 
                  onChange={(e) => setData({...data, contact: {...data.contact, workingHours: e.target.value}})}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 mb-1">Address</label>
                <input 
                  type="text" 
                  value={data.contact.address} 
                  onChange={(e) => setData({...data, contact: {...data.contact, address: e.target.value}})}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white"
                />
              </div>
            </div>
          </section>

          {/* Hero Section */}
          <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Home Page (Hero Section)</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Tagline</label>
                <input 
                  type="text" 
                  value={data.hero.tagline} 
                  onChange={(e) => setData({...data, hero: {...data.hero, tagline: e.target.value}})}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Title</label>
                <input 
                  type="text" 
                  value={data.hero.title} 
                  onChange={(e) => setData({...data, hero: {...data.hero, title: e.target.value}})}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Subtitle</label>
                <textarea 
                  value={data.hero.subtitle} 
                  onChange={(e) => setData({...data, hero: {...data.hero, subtitle: e.target.value}})}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white"
                  rows={3}
                />
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Home Page (About Section)</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Title</label>
                <input 
                  type="text" 
                  value={data.about.title} 
                  onChange={(e) => setData({...data, about: {...data.about, title: e.target.value}})}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Description Paragraph 1</label>
                <textarea 
                  value={data.about.description1} 
                  onChange={(e) => setData({...data, about: {...data.about, description1: e.target.value}})}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Description Paragraph 2</label>
                <textarea 
                  value={data.about.description2} 
                  onChange={(e) => setData({...data, about: {...data.about, description2: e.target.value}})}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white"
                  rows={3}
                />
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Services / Solutions</h2>
            <div className="space-y-6">
              {data.services?.map((service: any, sIdx: number) => (
                <div key={sIdx} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-md mb-4 text-primary">Service {sIdx + 1}: {service.title}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Title</label>
                      <input 
                        type="text" 
                        value={service.title} 
                        onChange={(e) => handleArrayChange('services', sIdx, 'title', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Image URL</label>
                      <input 
                        type="text" 
                        value={service.image} 
                        onChange={(e) => handleArrayChange('services', sIdx, 'image', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Description</label>
                      <textarea 
                        value={service.description} 
                        onChange={(e) => handleArrayChange('services', sIdx, 'description', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50"
                        rows={2}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-2">Service Items (Bullet points)</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.items?.map((item: string, iIdx: number) => (
                        <input 
                          key={iIdx}
                          type="text" 
                          value={item} 
                          onChange={(e) => handleServiceItemChange(sIdx, iIdx, e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-2 text-xs bg-gray-50"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Gallery Section */}
          <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Gallery Images</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {data.gallery?.map((img: any, gIdx: number) => (
                <div key={gIdx} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm text-xs space-y-2">
                  <div className="w-full h-24 bg-gray-100 rounded overflow-hidden mb-2 relative flex items-center justify-center">
                    <img src={img.src} alt={img.title} className="max-h-full max-w-full object-cover" />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-500 mb-1">Image URL</label>
                    <input 
                      type="text" 
                      value={img.src} 
                      onChange={(e) => handleArrayChange('gallery', gIdx, 'src', e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1 bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-500 mb-1">Caption / Title</label>
                    <input 
                      type="text" 
                      value={img.title} 
                      onChange={(e) => handleArrayChange('gallery', gIdx, 'title', e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1 bg-gray-50"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Partners Section */}
          <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Partners / Brands</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {data.partners?.map((partner: any, pIdx: number) => (
                <div key={pIdx} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm text-xs space-y-2">
                  <div className="w-full h-16 bg-gray-100 rounded overflow-hidden flex items-center justify-center relative">
                    <img src={partner.src} alt={partner.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-500 mb-1">Logo URL</label>
                    <input 
                      type="text" 
                      value={partner.src} 
                      onChange={(e) => handleArrayChange('partners', pIdx, 'src', e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1 bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-500 mb-1">Brand Name</label>
                    <input 
                      type="text" 
                      value={partner.name} 
                      onChange={(e) => handleArrayChange('partners', pIdx, 'name', e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1 bg-gray-50"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
