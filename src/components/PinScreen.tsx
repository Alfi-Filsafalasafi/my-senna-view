"use client";

import { useState, useTransition } from "react";
import { verifyPin } from "@/app/actions/auth";

const PIN_LENGTH = 6;

export default function PinScreen({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState("");
  const [msg, setMsg] = useState("");
  const [isPending, startTransition] = useTransition();

  function pressKey(key: string) {
    if (isPending) return;
    setMsg("");

    if (key === "back") {
      setPin((p) => p.slice(0, -1));
      return;
    }

    if (pin.length >= PIN_LENGTH) return;

    const next = pin + key;
    setPin(next);

    if (next.length === PIN_LENGTH) {
      startTransition(async () => {
        const result = await verifyPin(next);
        if (result.success) {
          onUnlock();
        } else {
          setMsg("pin-nya belum tepat, coba lagi ya sayang");
          setPin("");
        }
      });
    }
  }

  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "back", "0"];

  return (
    <div className="pin-screen min-h-screen flex items-center justify-center p-6">
      <div className="pin-card w-full max-w-[470px] px-6 py-10 text-center bg-[#fffdf8] border border-[#e2d5bd] rounded-[28px] shadow-[0_12px_35px_rgba(91,75,61,0.08)]">
        <div className="text-[44px] my-2">🌻</div>
        <div className="text-[22px]">🌼</div>
        <h1 className="text-[48px] font-medium my-2 font-serif text-[#5b4b3d]">
          my senna ♡
        </h1>
        <div className="font-sans text-[16px] text-[#8f8172] min-h-[24px]">
          ayo sayang, kira-kira apa pin-nya? wkwkwk
        </div>

        <div className="flex gap-3 justify-center my-6">
          {Array.from({ length: PIN_LENGTH }).map((_, i) => (
            <div
              key={i}
              className={`w-[17px] h-[17px] rounded-full border-[3px] border-[#c99d3d] ${
                i < pin.length ? "bg-[#c99d3d]" : ""
              }`}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3 max-w-[410px] mx-auto">
          {keys.map((k, i) =>
            k === "back" ? (
              <button
                key={i}
                onClick={() => pressKey("back")}
                className="bg-[#fffdf8] border border-[#e2d5bd] rounded-[22px] py-5 px-2 text-[20px]"
              >
                ⌫
              </button>
            ) : (
              <button
                key={i}
                onClick={() => pressKey(k)}
                className="bg-[#fffdf8] border border-[#e2d5bd] rounded-[22px] py-5 px-2 text-[24px]"
              >
                {k}
              </button>
            ),
          )}
        </div>

        <div className="font-sans text-[#8f8172] min-h-[24px] mt-4">{msg}</div>
      </div>
    </div>
  );
}
