<script lang="ts">
	import Terminal from '$lib/components/Terminal.svelte';
	import SpiderLogo from '$lib/components/SpiderLogo.svelte';
	import Prompt from '$lib/components/Prompt.svelte';
	import EntryListing from '$lib/components/EntryListing.svelte';
	import { entries } from '$lib/content/entries';
</script>

<svelte:head>
	<title>Spider-Iskolars | Project Log</title>
</svelte:head>

<div class="page">
	<header class="header">
		<SpiderLogo size={64} class="logo-main" />
		<h1>Spider-Iskolars</h1>
		<p class="subtitle">Project Log — CS 191</p>
	</header>

	<Terminal>
		<div class="terminal-inner">
			<div class="welcome-block">
				<h2>Welcome to Spider-Iskolars Project Log</h2>
				<p class="desc">Tracking software engineering updates, one entry at a time.</p>
			</div>

			<div class="divider">{'─'.repeat(50)}</div>

			<Prompt command="ls -la entries/" />

			<div class="listing">
				<div class="listing-rows">
					{#each entries as entry (entry.id)}
						<EntryListing
							file={entry.file}
							slug={entry.slug}
							description={entry.description}
						/>
					{/each}
				</div>
			</div>
		</div>
	</Terminal>
</div>

<style>
	.page {
		width: 100%;
		max-width: 1080px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 32px;
	}

	.header {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
	}

	.header :global(.logo-main) {
		animation: pulse 3s ease-in-out infinite;
		line-height: 1;
	}

	.header h1 {
		font-size: 1.8rem;
		font-weight: 700;
		color: var(--text-white);
		letter-spacing: 2px;
	}

	.subtitle {
		color: var(--text-dim);
		font-size: 13px;
	}

	.terminal-inner {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.welcome-block {
		margin-bottom: 8px;
	}

	.welcome-block h2 {
		color: var(--text-white);
		font-size: 1.1rem;
		font-weight: 600;
		margin-bottom: 4px;
	}

	.desc {
		color: var(--text-dim);
		font-size: 13px;
	}

	.divider {
		color: var(--text-dim);
		opacity: 0.3;
		font-size: 12px;
		margin: 12px 0;
		overflow: hidden;
	}

	.listing {
		margin-top: 8px;
	}

	.listing-rows {
		display: flex;
		flex-direction: column;
	}
</style>