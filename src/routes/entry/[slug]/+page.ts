import { error } from '@sveltejs/kit';
import { entries as allEntries } from '$lib/content/entries';
import { renderMarkdown } from '$lib/markdown';
import type { Entry } from '$lib/content/entries';

export const prerender = true;

export interface EntryLoadData {
	entry: Entry;
	html: string;
}

export function entries() {
	return allEntries.map((e) => ({ slug: e.slug }));
}

export function load({ params }: { params: { slug: string } }): EntryLoadData {
	const entry = allEntries.find((e) => e.slug === params.slug);
	if (!entry) error(404, `No such entry: ${params.slug}`);
	return { entry, html: renderMarkdown(entry.body) };
}