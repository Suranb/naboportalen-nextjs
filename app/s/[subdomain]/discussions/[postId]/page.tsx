"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock data
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

export default function PostPage() {
  const { subdomain, postId } = useParams() as {
    subdomain: string;
    postId: string;
  };

  const post = mockPosts.find((p) => p.id === parseInt(postId));
  const [replying, setReplying] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);

  if (!post) return <p>Post ikke funnet</p>;

  return (
    <div className="mx-auto max-w-4xl p-6 space-y-6">
      {/* Header */}
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold">{subdomain} – Diskusjon</h1>
        <p className="text-muted-foreground">
          Se hele samtalen og legg til dine kommentarer.
        </p>
      </header>

      {/* Hovedpost */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>{post.author}</CardTitle>
          <span className="text-xs text-muted-foreground">2 timer siden</span>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>{post.content}</p>

          {/* Bilde skeleton / placeholder */}
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

          {/* Kommentarer */}
          {post.comments.length > 0 && (
            <div className="space-y-2 border-t pt-3">
              <h4 className="text-sm font-medium">Kommentarer</h4>
              {post.comments.map((c) => (
                <div key={c.id} className="rounded-md bg-muted p-2 text-sm">
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
            onClick={() => setReplying(!replying)}
          >
            Svar
          </Button>

          {replying && (
            <div className="mt-3 space-y-2">
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
        </CardContent>
      </Card>

      {/* Nytt innlegg / bildeopplasting */}
      <Card>
        <CardHeader>
          <CardTitle>Lag nytt innlegg</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <textarea
            rows={4}
            className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Hva vil du dele med nabolaget?"
          />

          {/* Bildeopplasting */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Last opp bilde
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && setNewImage(e.target.files[0])}
            />
            {newImage && (
              <p className="text-sm text-muted-foreground mt-1">
                Valgt fil: {newImage.name}
              </p>
            )}
          </div>

          <Button>Publiser innlegg</Button>
        </CardContent>
      </Card>
    </div>
  );
}
