"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock data for posts
const mockPosts = [
  {
    id: 1,
    author: "Ola Nordmann",
    content: "Hei, er det noen som kan anbefale en elektriker?",
    image: null,
    comments: [
      { id: 1, author: "Kari", content: "Ja, vi brukte Hansen Elektro." },
      {
        id: 2,
        author: "Admin",
        content: "Husk å bruke autoriserte elektrikere!",
      },
    ],
  },
  {
    id: 2,
    author: "Kari",
    content: "Hva synes folk om å arrangere en sommerfest i juni?",
    image: null,
    comments: [],
  },
];

interface DiscussionsPageProps {
  params: { subdomain: string };
}

export default function DiscussionsPage({ params }: DiscussionsPageProps) {
  const { subdomain } = params;
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [newComment, setNewComment] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);

  return (
    <div className="mx-auto max-w-6xl p-6">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold">{subdomain} – Diskusjoner</h1>
      </header>

      {/* Main layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Feed (left, 2/3) */}
        <div className="md:col-span-2 space-y-4">
          {mockPosts.map((post) => (
            <Card key={post.id}>
              <CardHeader className="flex justify-between items-center">
                <CardTitle>{post.author}</CardTitle>
                <span className="text-xs text-muted-foreground">
                  2 timer siden
                </span>
              </CardHeader>
              <CardContent className="space-y-3">
                <p>{post.content}</p>

                {/* Image skeleton / placeholder */}
                <div className="bg-gray-200 h-48 w-full rounded-md flex items-center justify-center text-gray-400">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt="Post bilde"
                      className="object-cover w-full h-48 rounded-md"
                    />
                  ) : (
                    "Ingen bilde"
                  )}
                </div>

                {/* Comments */}
                {post.comments.length > 0 && (
                  <div className="space-y-2 border-t pt-2">
                    <h4 className="text-sm font-medium">Kommentarer</h4>
                    {post.comments.map((c) => (
                      <div
                        key={c.id}
                        className="rounded-md bg-muted p-2 text-sm"
                      >
                        <span className="font-medium">{c.author}: </span>
                        {c.content}
                      </div>
                    ))}
                  </div>
                )}

                {/* Inline reply */}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    setReplyingTo(replyingTo === post.id ? null : post.id)
                  }
                >
                  Svar
                </Button>

                {replyingTo === post.id && (
                  <div className="mt-2 space-y-2">
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

                {/* Ny knapp for å åpne hele innlegget */}
                <div className="mt-3">
                  <Link href={`/s/${subdomain}/discussions/${post.id}`}>
                    <Button size="sm" variant="secondary" className="w-full">
                      Åpne innlegg →
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Right sidebar */}
        <aside className="space-y-4">
          {/* Nytt innlegg modal */}
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" variant="secondary" className="w-full">
                Nytt innlegg
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Lag nytt innlegg</DialogTitle>
              </DialogHeader>

              <div className="space-y-4 mt-2">
                <textarea
                  rows={4}
                  className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Hva vil du dele med nabolaget?"
                />

                {/* File upload */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Last opp bilde
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      e.target.files && setNewImage(e.target.files[0])
                    }
                  />
                  {newImage && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Valgt fil: {newImage.name}
                    </p>
                  )}
                </div>

                <Button>Publiser innlegg</Button>
              </div>
            </DialogContent>
          </Dialog>
        </aside>
      </div>
    </div>
  );
}
