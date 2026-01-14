import { getCollection } from 'astro:content';

export async function GET() {
  const episodios = await getCollection('episodios');
  const posts = await getCollection('blog');

  const allContent = [
    ...episodios.map((episode) => ({
      title: episode.data.title,
      description: episode.data.description,
      slug: `/ep/${episode.slug}`,
      type: 'Episodio',
      date: episode.data.pubDate,
      image: episode.data.image,
    })),
    ...posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      slug: `/blog/${post.slug}`,
      type: 'Artículo',
      date: post.data.pubDate,
      image: post.data.image,
    })),
  ];

  // Ordenar por fecha (más reciente primero)
  allContent.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return new Response(JSON.stringify(allContent), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
