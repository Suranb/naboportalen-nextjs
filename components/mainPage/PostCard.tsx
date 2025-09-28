"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PostCard({
  post,
  subdomain,
  replyingTo,
  setReplyingTo,
  newComment,
  setNewComment,
}) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow rounded-lg overflow-hidden">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>{post.author}</CardTitle>
        <span className="text-xs text-muted-foreground">2 timer siden</span>
      </CardHeader>

      <CardContent className="space-y-3">
        <p>{post.content}</p>

        <div className="bg-gray-200 h-48 w-full rounded-md flex items-center justify-center text-gray-400">
          {post.image ? (
            <img
              src={post.image}
              alt="Post bilde"
              className="object-cover w-full h-full rounded-md"
            />
          ) : (
            "Ingen bilde"
          )}
        </div>

        <div className="flex justify-between mt-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setReplyingTo(replyingTo === post.id ? null : post.id)
            }
          >
            Svar
          </Button>

          <Link
            href={`/s/${subdomain}/discussions/${post.id}`}
            className="text-sm text-blue-600 hover:underline"
          >
            Åpne innlegg →
          </Link>
        </div>

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
      </CardContent>
    </Card>
  );
}
