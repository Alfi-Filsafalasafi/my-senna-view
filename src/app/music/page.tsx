import { listMusic } from "@/app/actions/media";
import BackButton from "@/components/BackButton";
import MusicList from "@/components/MusicList";

export default async function MusicPage() {
  const items = await listMusic();

  return (
    <main className="block w-full max-w-[720px] mx-auto px-[18px] pt-[18px] pb-[50px]">
      <BackButton />
      <div className="text-center text-[44px] my-2">🎵</div>
      <h2 className="text-center text-[38px] font-medium my-4 font-serif text-[#5b4b3d]">
        music
      </h2>

      <MusicList items={items} />
    </main>
  );
}
