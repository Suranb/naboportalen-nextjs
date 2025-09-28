"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  ChevronRight,
  Calendar,
  MessageSquare,
  Users,
  Car,
  Wrench,
  MapPin,
  Home,
  Coffee,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Post {
  id: number;
  author: string;
  content: string;
  image?: string | null;
  comments: Array<{
    id: number;
    author: string;
    content: string;
  }>;
}

interface ActivitiesFeedProps {
  posts: Post[];
  subdomain: string;
}

const upcomingEvents = [
  {
    title: "Høstdugnad",
    date: "15. oktober",
    time: "kl 12:00",
  },
  {
    title: "Julebord",
    date: "1. desember",
    time: "kl 18:00",
  },
];

const categories = [
  { name: "Parkering", icon: Car, color: "bg-emerald-500" },
  { name: "Vaktmester", icon: Wrench, color: "bg-orange-500" },
  { name: "Postkasse", icon: MapPin, color: "bg-purple-500" },
  { name: "Naboer", icon: Users, color: "bg-pink-500" },
  { name: "Vaskeri", icon: Home, color: "bg-indigo-500" },
  { name: "Fellesarealer", icon: Coffee, color: "bg-teal-500" },
];

export default function ActivitiesFeed({
  posts,
  subdomain,
}: ActivitiesFeedProps) {
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [newComment, setNewComment] = useState("");

  // Transform posts to news items with categories
  const newsItems = posts.map((post, index) => ({
    id: post.id,
    title:
      post.content.substring(0, 50) + (post.content.length > 50 ? "..." : ""),
    description: post.content,
    author: post.author,
    category: index === 0 ? "Viktig melding" : "Oppussing",
    categoryColor:
      index === 0 ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800",
    time: "2 timer siden",
    urgent: index === 0,
    comments: post.comments,
  }));

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - News Feed */}
          <div className="lg:col-span-2 space-y-8">
            {/* News Section */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Nyheter
                </h3>
                <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors">
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {newsItems.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-xl border-l-4 ${
                      item.urgent
                        ? "border-l-red-500 bg-red-50 dark:bg-red-500/10"
                        : "border-l-blue-500 bg-blue-50 dark:bg-blue-500/10"
                    } hover:shadow-sm transition-shadow cursor-pointer group`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${item.categoryColor}`}
                          >
                            {item.category}
                          </span>
                          <span className="text-xs text-slate-500">
                            {item.time}
                          </span>
                        </div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-2">
                          Av: {item.author}
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                          {item.description}
                        </p>

                        {/* Comments preview */}
                        {item.comments.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-600">
                            <p className="text-xs text-slate-500 mb-2">
                              {item.comments.length} kommentar
                              {item.comments.length !== 1 ? "er" : ""}
                            </p>
                            <div className="text-sm text-slate-600 dark:text-slate-400">
                              <span className="font-medium">
                                {item.comments[0].author}:{" "}
                              </span>
                              {item.comments[0].content}
                              {item.comments.length > 1 && (
                                <span className="text-slate-400">
                                  {" "}
                                  og {item.comments.length - 1} til...
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors ml-4 flex-shrink-0" />
                    </div>

                    {/* Action buttons */}
                    <div className="mt-4 flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setReplyingTo(replyingTo === item.id ? null : item.id)
                        }
                      >
                        Svar
                      </Button>
                      <Link href={`/s/${subdomain}/discussions/${item.id}`}>
                        <Button size="sm" variant="secondary">
                          Se hele innlegget →
                        </Button>
                      </Link>
                    </div>

                    {/* Inline reply */}
                    {replyingTo === item.id && (
                      <div className="mt-4 space-y-2">
                        <textarea
                          rows={3}
                          className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Skriv svaret ditt her..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                        />
                        <Button size="sm">Publiser svar</Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <Link href={`/s/${subdomain}/discussions`}>
                <Button variant="outline" className="w-full mt-6">
                  Se alle diskusjoner →
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Kommende arrangementer
                </h3>
                <button className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors"
                  >
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 dark:text-white text-sm">
                        {event.title}
                      </p>
                      <p className="text-xs text-slate-500">
                        {event.date} {event.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Kategorier
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className="flex flex-col items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group"
                  >
                    <div
                      className={`${category.color} w-10 h-10 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}
                    >
                      <category.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300 text-center">
                      {category.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Discussions */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                Diskusjoner
              </h3>

              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
                  Se hva andre beboere diskuterer og bli med i samtalen.
                </p>
                <Link href={`/s/${subdomain}/discussions`}>
                  <Button variant="outline" size="sm">
                    Gå til diskusjoner →
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
              <h3 className="font-semibold mb-4">Nabolaget ditt</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-emerald-100">Aktive beboere</span>
                  <span className="font-semibold">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-emerald-100">Nye meldinger</span>
                  <span className="font-semibold">{newsItems.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-emerald-100">
                    Kommende arrangementer
                  </span>
                  <span className="font-semibold">{upcomingEvents.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
