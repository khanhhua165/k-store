import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col mx-6">
      <div className="relative aspect-w-16 aspect-h-6">
        <Image
          src="/images/butcher-page.jpg"
          alt="front page image"
          layout="fill"
          objectFit="cover"
          className="object-bottom rounded-b-lg shadow-lg"
        />
        <div className="absolute h-56 rounded-md opacity-40 w-60 top-10 left-5 bg-gray-50"></div>
        <div className="absolute w-48 top-10 left-5">
          <div className="px-2 py-3 text-5xl font-bold uppercase">
            claim your health
          </div>
          <Link href="/shop">
            <a className="flex items-center justify-center h-10 font-semibold transition bg-blue-600 border-gray-600 rounded-r-md text-gray-50 hover:bg-blue-700 active:bg-blue-800">
              Shop Now
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
