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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, section: string, index: number, field: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        
        const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
        handleArrayChange(section, index, field, dataUrl);
      };
    };
  };

  const handleArrayChange = (section: string, index: number, field: string, value: any) => {
    const newData = { ...data };
    newData[section][index][field] = value;
    setData(newData);
  };

  const handleServiceItemChange = (serviceIndex: number, itemIndex: number, value: string) => {
    const newData = { ...data };
    const currentItem = newData.services[serviceIndex].items[itemIndex];
    if (typeof currentItem === 'string') {
      newData.services[serviceIndex].items[itemIndex] = { text: value, images: [] };
    } else {
      newData.services[serviceIndex].items[itemIndex].text = value;
    }
    setData(newData);
  };

  const handleServiceItemImageUpload = (e: React.ChangeEvent<HTMLInputElement>, serviceIndex: number, itemIndex: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        
        const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
        
        const newData = { ...data };
        const currentItem = newData.services[serviceIndex].items[itemIndex];
        if (typeof currentItem === 'string') {
          newData.services[serviceIndex].items[itemIndex] = { text: currentItem, images: [dataUrl] };
        } else {
          if (!newData.services[serviceIndex].items[itemIndex].images) {
            newData.services[serviceIndex].items[itemIndex].images = [];
          }
          newData.services[serviceIndex].items[itemIndex].images.push(dataUrl);
        }
        setData(newData);
      };
    };
  };

  const handleDeleteServiceItemImage = (serviceIndex: number, itemIndex: number, imageIndex: number) => {
    if(confirm("Delete this image?")) {
      const newData = { ...data };
      newData.services[serviceIndex].items[itemIndex].images.splice(imageIndex, 1);
      setData(newData);
    }
  };

  const handleAddItem = (section: string, defaultItem: any) => {
    const newData = { ...data };
    if (!newData[section]) newData[section] = [];
    newData[section].push(defaultItem);
    setData(newData);
  };

  const handleDeleteItem = (section: string, index: number) => {
    if(confirm("Are you sure you want to delete this item?")) {
      const newData = { ...data };
      newData[section].splice(index, 1);
      setData(newData);
    }
  };

  const handleAddServiceItem = (serviceIndex: number) => {
    const newData = { ...data };
    newData.services[serviceIndex].items.push({ text: "", images: [] });
    setData(newData);
  };

  const handleDeleteServiceItem = (serviceIndex: number, itemIndex: number) => {
    const newData = { ...data };
    newData.services[serviceIndex].items.splice(itemIndex, 1);
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
          
          <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Theme Settings (Colors & Font Sizes)</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Primary Color</label>
                <div className="flex items-center space-x-2">
                  <input type="color" value={data.theme?.primary || "#1e3a8a"} onChange={(e) => setData({...data, theme: {...(data.theme || {}), primary: e.target.value}})} className="w-10 h-10 border-0 rounded cursor-pointer" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Secondary Color</label>
                <div className="flex items-center space-x-2">
                  <input type="color" value={data.theme?.secondary || "#facc15"} onChange={(e) => setData({...data, theme: {...(data.theme || {}), secondary: e.target.value}})} className="w-10 h-10 border-0 rounded cursor-pointer" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Heading Text Color</label>
                <div className="flex items-center space-x-2">
                  <input type="color" value={data.theme?.headingText || "#111827"} onChange={(e) => setData({...data, theme: {...(data.theme || {}), headingText: e.target.value}})} className="w-10 h-10 border-0 rounded cursor-pointer" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Body Text Color</label>
                <div className="flex items-center space-x-2">
                  <input type="color" value={data.theme?.bodyText || "#4b5563"} onChange={(e) => setData({...data, theme: {...(data.theme || {}), bodyText: e.target.value}})} className="w-10 h-10 border-0 rounded cursor-pointer" />
                </div>
              </div>
            </div>
            
            <h3 className="text-md font-bold mb-3 text-gray-700">Text Sizes (Pixels)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Hero Title Size</label>
                <input type="number" value={data.theme?.heroTitleSize || "60"} onChange={(e) => setData({...data, theme: {...(data.theme || {}), heroTitleSize: e.target.value}})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Hero Subtitle Size</label>
                <input type="number" value={data.theme?.heroSubtitleSize || "20"} onChange={(e) => setData({...data, theme: {...(data.theme || {}), heroSubtitleSize: e.target.value}})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">General Heading Size</label>
                <input type="number" value={data.theme?.headingSize || "36"} onChange={(e) => setData({...data, theme: {...(data.theme || {}), headingSize: e.target.value}})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Body Paragraph Size</label>
                <input type="number" value={data.theme?.bodySize || "16"} onChange={(e) => setData({...data, theme: {...(data.theme || {}), bodySize: e.target.value}})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white" />
              </div>
            </div>
          </section>

          <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Contact Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Phone 1</label>
                <input type="text" value={data.contact.phone1} onChange={(e) => setData({...data, contact: {...data.contact, phone1: e.target.value}})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Phone 2</label>
                <input type="text" value={data.contact.phone2} onChange={(e) => setData({...data, contact: {...data.contact, phone2: e.target.value}})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Email</label>
                <input type="text" value={data.contact.email} onChange={(e) => setData({...data, contact: {...data.contact, email: e.target.value}})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Working Hours</label>
                <input type="text" value={data.contact.workingHours} onChange={(e) => setData({...data, contact: {...data.contact, workingHours: e.target.value}})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 mb-1">Address</label>
                <input type="text" value={data.contact.address} onChange={(e) => setData({...data, contact: {...data.contact, address: e.target.value}})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white" />
              </div>
            </div>
          </section>

          <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Home Page (Hero Section)</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Tagline</label>
                <input type="text" value={data.hero.tagline} onChange={(e) => setData({...data, hero: {...data.hero, tagline: e.target.value}})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Title</label>
                <input type="text" value={data.hero.title} onChange={(e) => setData({...data, hero: {...data.hero, title: e.target.value}})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Subtitle</label>
                <textarea value={data.hero.subtitle} onChange={(e) => setData({...data, hero: {...data.hero, subtitle: e.target.value}})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white" rows={3} />
              </div>
            </div>
          </section>

          <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Home Page (About Section)</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Title</label>
                <input type="text" value={data.about.title} onChange={(e) => setData({...data, about: {...data.about, title: e.target.value}})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Description Paragraph 1</label>
                <textarea value={data.about.description1} onChange={(e) => setData({...data, about: {...data.about, description1: e.target.value}})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white" rows={3} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Description Paragraph 2</label>
                <textarea value={data.about.description2} onChange={(e) => setData({...data, about: {...data.about, description2: e.target.value}})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white" rows={3} />
              </div>
            </div>
          </section>

          <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Services / Solutions</h2>
              <button onClick={() => handleAddItem('services', { title: "New Service", description: "", image: "", id: "new", items: [] })} className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-blue-700">
                + Add Service
              </button>
            </div>
            <div className="space-y-6">
              {data.services?.map((service: any, sIdx: number) => (
                <div key={sIdx} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col md:flex-row gap-6 relative">
                  <button onClick={() => handleDeleteItem('services', sIdx)} className="absolute top-2 right-2 bg-red-100 text-red-600 p-1.5 rounded-md hover:bg-red-200" title="Delete Service">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                  <div className="w-full md:w-1/3 flex flex-col pt-4">
                    <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden relative mb-2 flex items-center justify-center border border-gray-200">
                      <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                    </div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Upload New Image</label>
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'services', sIdx, 'image')} className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                  </div>
                  <div className="w-full md:w-2/3 pt-4">
                    <div className="grid grid-cols-1 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Title</label>
                        <input type="text" value={service.title} onChange={(e) => handleArrayChange('services', sIdx, 'title', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Description</label>
                        <textarea value={service.description} onChange={(e) => handleArrayChange('services', sIdx, 'description', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50" rows={2} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="block text-xs font-semibold text-gray-500">Service Items (Bullet points)</label>
                        <button onClick={() => handleAddServiceItem(sIdx)} className="text-blue-600 text-xs hover:underline">+ Add Point</button>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {service.items?.map((item: any, iIdx: number) => {
                          const itemText = typeof item === 'string' ? item : (item.text || "");
                          const itemImages = typeof item === 'string' ? [] : (item.images || []);
                          return (
                            <div key={iIdx} className="flex flex-col space-y-2 border border-gray-200 p-3 rounded bg-white">
                              <div className="flex space-x-2">
                                <input type="text" value={itemText} onChange={(e) => handleServiceItemChange(sIdx, iIdx, e.target.value)} className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs bg-gray-50" placeholder="Bullet point text" />
                                <button onClick={() => handleDeleteServiceItem(sIdx, iIdx)} className="text-red-500 hover:text-red-700 p-1 font-bold">✕</button>
                              </div>
                              <div className="pt-2 border-t border-gray-100">
                                {itemImages.length > 0 && (
                                  <div className="flex flex-wrap gap-2 mb-2">
                                    {itemImages.map((img: string, imgIdx: number) => (
                                      <div key={imgIdx} className="relative w-12 h-12 border border-gray-200 rounded overflow-hidden">
                                        <img src={img} className="w-full h-full object-cover" />
                                        <button onClick={() => handleDeleteServiceItemImage(sIdx, iIdx, imgIdx)} className="absolute top-0 right-0 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center">✕</button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                                <label className="block text-[10px] font-semibold text-gray-500 mb-1">Add Image to Point</label>
                                <input type="file" accept="image/*" onChange={(e) => handleServiceItemImageUpload(e, sIdx, iIdx)} className="w-full text-[10px] text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Gallery Images</h2>
              <button onClick={() => handleAddItem('gallery', { title: "New Image", src: "" })} className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-blue-700">
                + Add Image
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {data.gallery?.map((img: any, gIdx: number) => (
                <div key={gIdx} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm text-xs space-y-2 relative pt-8">
                  <button onClick={() => handleDeleteItem('gallery', gIdx)} className="absolute top-2 right-2 bg-red-100 text-red-600 p-1 rounded hover:bg-red-200">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                  <div className="w-full h-24 bg-gray-100 rounded overflow-hidden mb-2 relative flex items-center justify-center">
                    <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-500 mb-1">Upload New Image</label>
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'gallery', gIdx, 'src')} className="w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-500 mb-1 mt-2">Caption / Title</label>
                    <input type="text" value={img.title} onChange={(e) => handleArrayChange('gallery', gIdx, 'title', e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1 bg-gray-50" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Partners / Brands</h2>
              <button onClick={() => handleAddItem('partners', { name: "New Partner", src: "" })} className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-blue-700">
                + Add Partner
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {data.partners?.map((partner: any, pIdx: number) => (
                <div key={pIdx} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm text-xs space-y-2 relative pt-8">
                  <button onClick={() => handleDeleteItem('partners', pIdx)} className="absolute top-2 right-2 bg-red-100 text-red-600 p-1 rounded hover:bg-red-200">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                  <div className="w-full h-16 bg-gray-100 rounded overflow-hidden flex items-center justify-center relative border border-gray-200">
                    <img src={partner.src} alt={partner.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-500 mb-1">Upload New Logo</label>
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'partners', pIdx, 'src')} className="w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-500 mb-1 mt-2">Brand Name</label>
                    <input type="text" value={partner.name} onChange={(e) => handleArrayChange('partners', pIdx, 'name', e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1 bg-gray-50" />
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
