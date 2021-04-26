import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col mx-6">
      <div className="relative aspect-w-16 aspect-h-6">
        <Image
          src="/images/butcher-page.jpg"
          alt="front page image"
          layout="fill"
          objectFit="cover"
          className="object-bottom rounded-b-lg"
        />
        <div className="absolute w-48 h-64 opacity-25 top-4 left-5 bg-gray-50"></div>
        <div className="absolute w-48 h-32 px-2 py-3 text-3xl uppercase top-4 left-5">
          claim your health
        </div>
      </div>
    </div>
  );
}
