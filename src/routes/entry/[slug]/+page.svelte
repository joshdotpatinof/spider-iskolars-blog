<script lang="ts">
	import Terminal from '$lib/components/Terminal.svelte';
	import Prompt from '$lib/components/Prompt.svelte';
	import { base } from '$app/paths';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.entry.title} | Spider-Iskolars</title>
</svelte:head>

<div class="page">
	<Terminal>
		<div class="terminal-inner">
			<div class="top-nav">
				<a href={`${base}/`}>← back to entries</a>
			</div>

			<div class="body">
				{@html data.html}
			</div>
		</div>
	</Terminal>
</div>

<style>
	.page {
		width: 100%;
		max-width: 1080px;
		display: flex;
		justify-content: center;
	}

	.terminal-inner {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.top-nav a {
		font-size: 12px;
		color: var(--text-dim);
	}

	.top-nav a:hover {
		color: var(--text-primary);
	}

	.body {
		font-size: 13px;
		line-height: 1.7;
		color: var(--text-primary);
	}

	.body :global(h1) {
		color: var(--text-white);
		font-size: 1.4rem;
		font-weight: 700;
		margin: 0 0 12px;
	}

	.body :global(h2) {
		color: var(--text-white);
		font-size: 1.1rem;
		font-weight: 600;
		margin: 20px 0 8px;
	}

	.body :global(p) {
		margin: 0 0 10px;
	}

	.body :global(ul),
	.body :global(ol) {
		margin: 0 0 10px;
		padding-left: 24px;
	}

	.body :global(li) {
		margin: 3px 0;
	}

	.body :global(a) {
		color: var(--accent);
	}

	.body :global(a:hover) {
		color: var(--text-primary);
	}

	.body :global(strong) {
		color: var(--text-white);
	}

	.body :global(hr) {
		border: none;
		border-top: 1px solid var(--border);
		margin: 16px 0;
		opacity: 0.5;
	}
</style>