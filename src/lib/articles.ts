import { getCollection } from 'astro:content';

export async function getArticles() {
	const [posts, notes] = await Promise.all([
		getCollection('blog'),
		getCollection('notes', ({ data }) => !data.draft),
	]);
	return [
		...posts.map((post) => ({
			id: post.id, title: post.data.title, description: post.data.description,
			pubDate: post.data.pubDate, updatedDate: post.data.updatedDate,
			tags: post.data.tags, body: post.body ?? '', href: `/blog/${post.id}/`, source: 'blog' as const,
		})),
		...notes.map((note) => ({
			id: note.id, title: note.data.title, description: note.data.description,
			pubDate: note.data.created, updatedDate: note.data.updated,
			tags: note.data.tags, body: note.body ?? '', href: `/blog/${note.id}/`, source: 'notes' as const,
		})),
	].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());
}
