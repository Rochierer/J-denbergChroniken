import Image from "next/image";
import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8 relative">
      {/* Hintergrund-Wappen */}
      <div className="absolute inset-0 z-0 flex justify-center items-center opacity-10">
        <Image
          src="/chronik-wappen.png" // Stelle sicher, dass dieses Bild existiert
          alt="Wappen der Gemeinde"
          width={600}
          height={600}
        />
      </div>

      <header className="text-center relative z-10">
        <h1 className="text-6xl font-fraktur text-red-700">
          Chronik der Gemeinde
        </h1>
        <h2 className="text-4xl font-serif text-gray-700 mt-4">Jüdenberg</h2>
        <p className="text-lg text-gray-600 mt-6">
          Ein Blick in die Geschichte und Tradition unserer Gemeinschaft.
        </p>
      </header>

      {/* Blog-Liste */}
      <main className="relative z-10 container mx-auto mt-16 max-w-3xl p-8">
        <ul className="flex flex-col gap-y-4">
          {posts.map((post) => (
            <li className="hover:underline" key={post._id}>
              <Link href={`/${post.slug.current}`}>
                <div className="bg-white shadow-md p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold">{post.title}</h2>
                  <p className="text-gray-500 mt-2">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
