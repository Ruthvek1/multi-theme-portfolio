'use client';

import React, { useState, useEffect } from 'react';
import { usePortfolio } from '@/core/PortfolioContext';
import Link from 'next/link';
import { auth } from '@/lib/firebase/client';
import { 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';

export default function AdminDashboard() {
  const { refreshData } = usePortfolio();
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState<any>(null);
  const [status, setStatus] = useState('');
  
  // Auth state
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginStep, setLoginStep] = useState<'credentials' | 'forgot' | 'reset'>('credentials');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [forgotMessage, setForgotMessage] = useState('');

  // Check session
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    fetch(`/api/data?type=${activeTab}`)
      .then(r => r.json())
      .then(data => setFormData(data))
      .catch(e => console.error(e));
  }, [activeTab, user]);

  // Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setLoginError(error.message || 'Invalid email or password');
    } finally {
      setLoginLoading(false);
    }
  };

  // Forgot password
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setForgotMessage('');
    setLoginLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setForgotMessage('Password reset email sent! Check your inbox.');
      setLoginStep('reset');
    } catch (error: any) {
      setLoginError(error.message || 'Failed to send reset email');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setFormData(null);
    setLoginStep('credentials');
    setPassword('');
  };

  if (authLoading) {
    return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-sans"><p className="text-gray-400">Checking session...</p></div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-sans">
        
        {/* Step 1: Credentials */}
        {loginStep === 'credentials' && (
          <form onSubmit={handleLogin} className="bg-white/5 p-8 border border-white/10 rounded-xl w-full max-w-md flex flex-col gap-4 shadow-2xl">
            <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>
            {loginError && <p className="text-red-500 text-sm font-bold text-center bg-red-500/10 py-2 rounded">{loginError}</p>}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                className="bg-black/50 border border-white/20 rounded p-3 text-white text-sm focus:border-white/50 outline-none transition-colors"
                required 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                className="bg-black/50 border border-white/20 rounded p-3 text-white text-sm focus:border-white/50 outline-none transition-colors"
                required 
              />
            </div>
            <button type="submit" disabled={loginLoading} className="w-full py-3 bg-white text-black hover:bg-gray-200 rounded font-bold transition shadow-lg disabled:opacity-50 mt-2">
              {loginLoading ? 'Logging in...' : 'Login'}
            </button>
            <button 
              type="button" 
              onClick={() => { setLoginStep('forgot'); setLoginError(''); }}
              className="text-center text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              Forgot Password?
            </button>
            <Link href="/" className="text-center text-gray-400 hover:text-white text-sm transition-colors">
              Back to Portfolio
            </Link>
          </form>
        )}

        {/* Forgot Password */}
        {loginStep === 'forgot' && (
          <form onSubmit={handleForgotPassword} className="bg-white/5 p-8 border border-white/10 rounded-xl w-full max-w-md flex flex-col gap-4 shadow-2xl">
            <h1 className="text-xl font-bold text-center">Forgot Password</h1>
            <p className="text-gray-400 text-sm text-center">Enter your email to receive a password reset link.</p>
            {loginError && <p className="text-red-500 text-sm font-bold text-center bg-red-500/10 py-2 rounded">{loginError}</p>}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                className="bg-black/50 border border-white/20 rounded p-3 text-white text-sm focus:border-white/50 outline-none transition-colors"
                required 
              />
            </div>
            <button type="submit" disabled={loginLoading} className="w-full py-3 bg-white text-black hover:bg-gray-200 rounded font-bold transition shadow-lg disabled:opacity-50 mt-2">
              {loginLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
            <button 
              type="button" 
              onClick={() => { setLoginStep('credentials'); setLoginError(''); }}
              className="text-center text-gray-400 hover:text-white text-sm transition-colors"
            >
              ← Back to Login
            </button>
          </form>
        )}

        {/* Password Reset Success */}
        {loginStep === 'reset' && (
          <div className="bg-white/5 p-8 border border-white/10 rounded-xl w-full max-w-md flex flex-col gap-4 shadow-2xl text-center">
            <div className="flex justify-center mb-2">
              <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
            </div>
            <h1 className="text-xl font-bold">Email Sent!</h1>
            <p className="text-green-400 text-sm">{forgotMessage}</p>
            <button 
              onClick={() => { setLoginStep('credentials'); setLoginError(''); setForgotMessage(''); setPassword(''); }}
              className="w-full py-3 bg-white text-black hover:bg-gray-200 rounded font-bold transition shadow-lg mt-4"
            >
              Go to Login
            </button>
          </div>
        )}

      </div>
    );
  }

  // Helper to get auth token
  const getAuthHeaders = async (): Promise<Record<string, string>> => {
    if (!user) return {};
    const token = await user.getIdToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const handleSave = async () => {
    setStatus('Saving...');
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`/api/data?type=${activeTab}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('Saved successfully!');
        refreshData(); 
        setTimeout(() => setStatus(''), 2000);
      } else {
        setStatus('Failed to save.');
      }
    } catch (e) {
      setStatus('Error saving.');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string, index?: number) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setStatus('Uploading...');
    const file = e.target.files[0];
    const data = new FormData();
    data.append('file', file);
    
    try {
      const token = await user?.getIdToken();
      const headers: Record<string, string> = token ? { 'Authorization': `Bearer ${token}` } : {};

      const res = await fetch('/api/upload', { 
        method: 'POST', 
        headers,
        body: data 
      });
      const json = await res.json();
      if (json.success) {
        if (typeof index === 'number') {
          handleArrayItemChange(index, field, json.url);
        } else {
          setFormData((prev: any) => ({ ...prev, [field]: json.url }));
        }
        setStatus('Uploaded successfully!');
        setTimeout(() => setStatus(''), 2000);
      } else {
        setStatus('Upload failed.');
      }
    } catch (error) {
      setStatus('Upload error.');
    }
  };

  const handleChangePersonal = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: e.target.value }));
  };

  const handleArrayItemChange = (index: number, field: string, value: any) => {
    const newData = [...formData];
    newData[index][field] = value;
    setFormData(newData);
  };

  const addArrayItem = (template: any) => {
    setFormData((prev: any) => [...prev, template]);
  };

  const removeArrayItem = (index: number) => {
    setFormData((prev: any) => prev.filter((_: any, i: number) => i !== index));
  };

  if (!formData) return <div className="p-10 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Portfolio CMS</h1>
            <p className="text-gray-400 text-sm mt-1">Manage your data visually without touching code.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition text-sm">
              Exit to Portfolio
            </Link>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-600/30 rounded transition text-sm"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-56 shrink-0 flex flex-col gap-2">
            {['personal', 'projects', 'experience', 'education', 'skills', 'certifications', 'socials'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-left px-4 py-3 rounded capitalize text-sm transition ${activeTab === tab ? 'bg-white text-black font-bold' : 'text-gray-400 hover:bg-white/5'}`}
              >
                {tab}
              </button>
            ))}
          </aside>

          <main className="flex-1 bg-white/5 border border-white/10 rounded-xl p-8 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8 sticky top-0 bg-[#0a0a0a] p-4 -mt-4 border-b border-white/10 z-10">
              <h2 className="text-2xl font-bold capitalize">{activeTab}</h2>
              <button 
                onClick={handleSave}
                className="px-6 py-2 bg-[#E50914] hover:bg-red-700 text-white rounded font-bold transition text-sm flex items-center gap-2"
              >
                {status || 'Save Changes'}
              </button>
            </div>

            {/* PERSONAL & SOCIALS (Object Form) */}
            {(activeTab === 'personal' || activeTab === 'socials') && !Array.isArray(formData) && (
              <div className="grid gap-6">
                {Object.keys(formData).map(key => (
                  <div key={key} className="flex flex-col gap-2">
                    <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">{key}</label>
                    {key === 'bio' || key === 'description' ? (
                      <textarea 
                        value={formData[key] || ''} 
                        onChange={(e) => handleChangePersonal(e, key)}
                        className="bg-black/50 border border-white/20 rounded p-4 text-white text-sm h-32 focus:border-[#E50914] outline-none transition-colors"
                      />
                    ) : (
                      <div className="flex gap-4">
                        <input 
                          type="text" 
                          value={formData[key] || ''} 
                          onChange={(e) => handleChangePersonal(e, key)}
                          className="flex-1 bg-black/50 border border-white/20 rounded p-4 text-white text-sm focus:border-[#E50914] outline-none transition-colors"
                        />
                        {(key.toLowerCase().includes('url') || key.toLowerCase().includes('image') || key.toLowerCase().includes('logo') || key.toLowerCase().includes('thumbnail') || key.toLowerCase().includes('avatar')) && (
                          <label className="flex shrink-0 items-center justify-center px-6 bg-white/10 hover:bg-white/20 text-white font-bold rounded cursor-pointer transition-colors text-sm">
                            Upload
                            <input 
                              type="file" 
                              accept="image/*,.pdf,.doc,.docx"
                              className="hidden" 
                              onChange={(e) => handleFileUpload(e, key)} 
                            />
                          </label>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* ARRAYS (Projects, Experience, Skills, Certs) */}
            {Array.isArray(formData) && (
              <div className="flex flex-col gap-10">
                {formData.map((item, index) => (
                  <div key={index} className="bg-black/40 border border-white/10 p-6 rounded-lg relative">
                    <button 
                      onClick={() => removeArrayItem(index)}
                      className="absolute top-4 right-4 text-red-500 hover:text-red-400 text-sm font-bold bg-red-500/10 px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                    
                    <div className="grid gap-4 mt-4">
                      {Object.keys(item).map(key => {
                        if (key === 'id') return null; // hide IDs

                        if (Array.isArray(item[key])) {
                          return (
                            <div key={key} className="flex flex-col gap-2 col-span-full">
                              <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">{key} (Comma separated list)</label>
                              <input 
                                type="text"
                                value={item[key].join(', ')}
                                onChange={(e) => handleArrayItemChange(index, key, e.target.value.split(',').map(s => s.trim()))}
                                className="bg-black/50 border border-white/20 rounded p-3 text-white text-sm focus:border-[#E50914] outline-none"
                              />
                            </div>
                          );
                        }

                        return (
                          <div key={key} className={`flex flex-col gap-2 ${key === 'description' ? 'col-span-full' : ''}`}>
                            <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">{key}</label>
                            {key === 'description' ? (
                              <textarea 
                                value={item[key] || ''}
                                onChange={(e) => handleArrayItemChange(index, key, e.target.value)}
                                className="bg-black/50 border border-white/20 rounded p-3 text-white text-sm h-24 focus:border-[#E50914] outline-none"
                              />
                            ) : (
                              <div className="flex gap-4">
                                <input 
                                  type="text"
                                  value={item[key] || ''}
                                  onChange={(e) => handleArrayItemChange(index, key, e.target.value)}
                                  className="flex-1 bg-black/50 border border-white/20 rounded p-3 text-white text-sm focus:border-[#E50914] outline-none"
                                />
                                {(key.toLowerCase().includes('url') || key.toLowerCase().includes('image') || key.toLowerCase().includes('logo') || key.toLowerCase().includes('thumbnail') || key.toLowerCase().includes('avatar')) && (
                                  <label className="flex shrink-0 items-center justify-center px-6 bg-white/10 hover:bg-white/20 text-white font-bold rounded cursor-pointer transition-colors text-sm">
                                    Upload
                                    <input 
                                      type="file" 
                                      accept="image/*,.pdf,.doc,.docx"
                                      className="hidden" 
                                      onChange={(e) => handleFileUpload(e, key, index)} 
                                    />
                                  </label>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <button 
                  onClick={() => {
                    let template: any = { id: Date.now().toString() };
                    if (formData.length > 0) {
                      Object.keys(formData[0]).forEach(k => {
                        if (k === 'id') return;
                        if (Array.isArray(formData[0][k])) template[k] = [];
                        else template[k] = '';
                      });
                    }
                    addArrayItem(template);
                  }}
                  className="w-full py-4 border-2 border-dashed border-white/20 text-white/50 hover:text-white hover:border-white/50 rounded-lg font-bold transition-colors"
                >
                  + Add New Item
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
