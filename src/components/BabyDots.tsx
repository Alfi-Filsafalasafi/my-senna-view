"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export type BabyDotConfig = {
  label: string;
  x: number; // persen, relatif terhadap GAMBAR asli (bukan wrapper)
  y: number;
};

// Koordinat titik. Kalau masih meleset, pakai mode kalibrasi (lihat bawah file)
// untuk dapat angka x/y yang presisi, lalu update array ini.
export const BABY_DOTS: BabyDotConfig[] = [
  { label: "mata", x: 56, y: 56 },
  { label: "hidung", x: 30, y: 53 },
  { label: "bibir", x: 11, y: 62 },
  { label: "pipi", x: 39, y: 69 },
];

// Foto tetap, bukan dari database / upload.
export const BABY_IMAGE_SRC = "/images/senna-baby.jpg";

type Box = { left: number; top: number; width: number; height: number };

export default function BabyDots({
  src = BABY_IMAGE_SRC,
  notes,
  calibrate = false,
}: {
  src?: string;
  notes: string[];
  calibrate?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [box, setBox] = useState<Box | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Hitung area gambar yang benar-benar tampil (karena object-fit: contain)
  const recalc = useCallback(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img || !img.naturalWidth || !img.naturalHeight) return;

    const wrapW = wrap.clientWidth;
    const wrapH = wrap.clientHeight;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const wrapRatio = wrapW / wrapH;

    let width: number, height: number, left: number, top: number;

    if (imgRatio > wrapRatio) {
      width = wrapW;
      height = wrapW / imgRatio;
      left = 0;
      top = (wrapH - height) / 2;
    } else {
      height = wrapH;
      width = wrapH * imgRatio;
      top = 0;
      left = (wrapW - width) / 2;
    }

    setBox({ left, top, width, height });
  }, []);

  useEffect(() => {
    recalc();
    const ro = new ResizeObserver(recalc);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener("orientationchange", recalc);
    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", recalc);
    };
  }, [recalc]);

  function handleCalibrateClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!calibrate || !box) return;
    const rect = wrapRef.current!.getBoundingClientRect();
    const clickX = e.clientX - rect.left - box.left;
    const clickY = e.clientY - rect.top - box.top;
    const pctX = ((clickX / box.width) * 100).toFixed(1);
    const pctY = ((clickY / box.height) * 100).toFixed(1);
    alert(`x: ${pctX}, y: ${pctY}`);
  }

  const activeDot = activeIndex !== null ? BABY_DOTS[activeIndex] : null;

  return (
    <>
      <div
        ref={wrapRef}
        onClick={handleCalibrateClick}
        className="relative w-full rounded-[22px] overflow-hidden bg-[#eee8db]"
        style={{ aspectRatio: "3 / 4" }}
      >
        <img
          ref={imgRef}
          src={src}
          onLoad={recalc}
          className="w-full h-full object-contain block"
          alt="My baby"
        />

        {box &&
          BABY_DOTS.map((dot, i) => {
            const left = box.left + (dot.x / 100) * box.width;
            const top = box.top + (dot.y / 100) * box.height;
            return (
              <button
                key={dot.label}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(i);
                }}
                aria-label={dot.label}
                className="absolute w-[26px] h-[26px] sm:w-[30px] sm:h-[30px] rounded-full bg-[#c99d3d]/90 border-[3px] border-white shadow-md -translate-x-1/2 -translate-y-1/2 animate-pulse"
                style={{ left, top }}
              />
            );
          })}
      </div>

      {activeDot && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="bg-[#fffdf8] border border-[#e2d5bd] rounded-[22px] shadow-xl max-w-[380px] w-full p-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-[32px] mb-1">🌼</div>
            <h3 className="font-serif text-[22px] text-[#5b4b3d] capitalize mb-2">
              {activeDot.label}
            </h3>
            <p className="font-sans text-sm leading-relaxed text-[#5b4b3d]">
              {notes?.[activeIndex!] || "Belum ada catatan."}
            </p>
            <button
              onClick={() => setActiveIndex(null)}
              className="mt-5 border border-[#e2d5bd] bg-[#f2dfae] rounded-[16px] py-2 px-4 text-sm"
            >
              tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
}
