<script lang="ts">
	import { base } from '$app/paths';

	let {
		file,
		slug,
		description
	}: {
		file: string;
		slug: string;
		description: string;
	} = $props();

	const href = $derived(`${base}/entry/${slug}/`);
</script>

<a class="row" href={href} title={description}>
	<span class="col-file">{file}</span>
	<span class="col-author">Spider-Iskolars</span>
</a>

<style>
	.row {
		display: flex;
		align-items: baseline;
		white-space: nowrap;
		padding: 6px 8px;
		border-radius: 4px;
		color: var(--text-primary);
		text-decoration: none;
		transition: background 0.15s ease;
		gap: 12px;
	}

	.row:hover {
		background: rgba(0, 255, 0, 0.08);
	}

	.col-file {
		color: var(--text-white);
		font-weight: 600;
		font-size: 13px;
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.col-author {
		color: var(--text-dim);
		font-size: 12px;
		text-align: right;
	}

	.row:hover .col-file {
		color: var(--text-primary);
		text-decoration: underline;
	}
</style>