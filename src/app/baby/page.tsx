import BackButton from "@/components/BackButton";
import BabyDots from "@/components/BabyDots";

// Catatan per titik: mata, hidung, bibir, pipi (urutan harus sama dengan BABY_DOTS)
const BABY_NOTES: string[] = [
  "mata kamu cantik banget sayanggg",
  "hidung naa juga lucuu sekaliii",
  "seksi banget gilaaaaaaa",
  "AKU SUKA BANGETTT YANG INII, PENGEN AKU UNYEL UNYELLL. ini pipi atau bakpaooo",
];

export default function BabyPage() {
  return (
    <main className="app max-w-[720px] mx-auto px-[18px] pt-[18px] pb-[50px]">
      <BackButton />
      <div className="text-center text-[44px] my-2">🌻</div>
      <h2 className="text-center text-[38px] font-medium my-4 font-serif text-[#5b4b3d]">
        My baby
      </h2>

      <div className="bg-white border border-[#e2d5bd] rounded-[18px] p-3.5">
        <BabyDots notes={BABY_NOTES} />

        <p className="text-center text-[#8f8172] font-sans text-xs mt-3">
          ketuk titik di foto untuk lihat catatannya
        </p>
      </div>
    </main>
  );
}
