import { PortableText, type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import Link from "next/link";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: Awaited<{
  params: { slug: string };
}>) {
  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    { slug: await params.slug }, // Explizit await hinzufügen
    options
  );

  return (
    <main className="container mx-auto min-h-screen flex items-center justify-center p-8 bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
        <Link
          href="/"
          className="hover:underline text-blue-600 text-lg font-medium mb-4 block"
        >
          ← Zurück zu den Chroniken
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-6">
          Veröffentlicht am {new Date(post.publishedAt).toLocaleDateString()}
        </p>
        <div className="prose prose-lg text-gray-800">
          {Array.isArray(post.body) && <PortableText value={post.body} />}
        </div>
      </div>
    </main>
  );
}
