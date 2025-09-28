"use client";

import { Bell, Settings } from "lucide-react";

interface SubdomainData {
  id: string;
  subdomain: string;
  emoji: string;
  name: string;
  description: string | null;
  banner_image_url: string | null;
  about_url: string | null;
  created_at: string;
  updated_at: string;
}

interface HeroProps {
  subdomainData: SubdomainData | null;
}

export default function Hero({ subdomainData }: HeroProps) {
  if (!subdomainData) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Subdomain not found
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <span className="text-2xl">{subdomainData.emoji}</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {subdomainData.name}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-xl bg-white/10 backdrop-blur-sm overflow-hidden border border-white/20">
              {subdomainData.banner_image_url ? (
                <img
                  src={subdomainData.banner_image_url}
                  alt={`${subdomainData.name} logo`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl">
                  {subdomainData.emoji}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">
                Velkommen til {subdomainData.name}
              </h2>
              <p className="text-blue-100 text-lg">
                {subdomainData.description ||
                  "Din digitale nabolagsportal - hold deg oppdatert og del med fellesskapet"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
