"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function NewPostModal({ isOpen, setIsOpen, subdomain }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Nytt innlegg</h3>
        <textarea
          rows={4}
          className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          placeholder="Hva vil du dele?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files && setImage(e.target.files[0])}
        />
        {image && <p className="text-sm mt-1">Valgt fil: {image.name}</p>}

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Avbryt
          </Button>
          <Button
            onClick={() => {
              console.log({ content, image });
              setIsOpen(false);
            }}
          >
            Publiser
          </Button>
        </div>
      </div>
    </div>
  );
}
