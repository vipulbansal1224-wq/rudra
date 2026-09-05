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
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-800">Content Management</h1>
          <div className="flex items-center space-x-4">
            {message && <span className={`text-sm font-semibold ${message.includes("Error") ? "text-red-500" : "text-green-600"}`}>{message}</span>}
            <button 
              onClick={handleSave} 
              disabled={saving}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-2 px-6 rounded-lg transition-colors"
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

          <p className="text-sm text-gray-500 italic mt-8">Note: Advanced settings (Services, Partners, Gallery) are stored in the JSON but not shown in this simple editor yet. They can be added here easily.</p>

        </div>
      </div>
    </div>
  );
}
