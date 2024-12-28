import Card from "@/components/Card";
import Link from "next/link";
import { getImages } from "@/lib/data";
export default async function Home() {
  const images = await getImages()
  return (
    <div className="max-w-screen-lg mx-auto py-14">
      <div className="flex justify-between items-end">
        <h1>letest Image</h1>
        <Link href="/create" className="py-3 px-6 bg-blue-500 hover:bg-blue-700 text-white">Uplod Image</Link>
      </div>
      <div className="grid md:grid-cols-3 gap-5 mt-10">
        {images.map((item) =>(
        <Card key={item.id} data={item}/>

        ))}
      </div>
    </div>
  );
}
