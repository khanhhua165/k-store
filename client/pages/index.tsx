import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/ui/landing/Footer";
import ImageHeader from "../components/ui/landing/ImageHeader";
import SecondSection from "../components/ui/landing/SecondSection";
import ThirdSection from "../components/ui/landing/ThirdSection";

export default function Home() {
  return (
    <>
      <Head>
        <title>V-Mart | Homepage</title>
        <meta
          name="description"
          content="The best place to get your animal nutrition"
        />
      </Head>
      <div className="flex flex-col">
        <ImageHeader />
        <SecondSection />
        <ThirdSection />
      </div>
    </>
  );
}
