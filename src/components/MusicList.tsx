"use client";

import { useState } from "react";

type MusicItem = {
  id: string;
  title: string;
  audio_url: string;
  note: string | null;
};

export default function MusicList({ items }: { items: MusicItem[] }) {
  const [openNoteId, setOpenNoteId] = useState<string | null>(null);
  const openItem = items.find((it) => it.id === openNoteId) || null;

  return (
    <>
      {items.length === 0 && (
        <p className="text-center text-[#8f8172] font-sans">Belum ada lagu.</p>
      )}

      <div className="grid grid-cols-1 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-[rgba(255,253,248,.96)] border border-[#e2d5bd] rounded-[28px] shadow-[0_12px_35px_rgba(91,75,61,.08)] p-5 w-full"
          >
            <div className="text-xl font-serif mb-3 text-[#5b4b3d]">
              {item.title}
            </div>
            <audio controls src={item.audio_url} className="w-full my-2" />

            <button
              onClick={() => setOpenNoteId(item.id)}
              className="w-full mt-3 border border-[#e2d5bd] bg-[#f8f1e2] rounded-[16px] py-3 text-sm font-sans text-[#5b4b3d]"
            >
              klik kata-katanya ♡
            </button>
          </div>
        ))}
      </div>

      {openItem && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6"
          onClick={() => setOpenNoteId(null)}
        >
          <div
            className="bg-[#fffdf8] border border-[#e2d5bd] rounded-[28px] shadow-[0_12px_35px_rgba(91,75,61,.15)] p-6 max-w-[480px] w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-serif text-[#5b4b3d] mb-3">
              {openItem.title}
            </h3>
            {openItem.note ? (
              <p className="font-sans text-sm leading-relaxed whitespace-pre-wrap text-[#5b4b3d]">
                {openItem.note}
              </p>
            ) : (
              <p className="font-sans text-sm text-[#8f8172]">
                Belum ada kata-kata untuk lagu ini.
              </p>
            )}
            <div className="text-center mt-5">
              <button
                onClick={() => setOpenNoteId(null)}
                className="border border-[#e2d5bd] bg-[#f8f1e2] rounded-[20px] py-2.5 px-5 text-sm"
              >
                tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
