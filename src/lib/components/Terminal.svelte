<script lang="ts">
	import type { Snippet } from 'svelte';
	import SpiderLogo from './SpiderLogo.svelte';

	let { children }: { children?: Snippet } = $props();
</script>

<div class="terminal">
	<div class="title-bar">
		<div class="dots">
			<span class="dot dot-red"></span>
			<span class="dot dot-yellow"></span>
			<span class="dot dot-green"></span>
		</div>
		<div class="title">
			<SpiderLogo size={16} />
			<span>josh@spider-iskolars:~</span>
		</div>
		<div class="title-spacer"></div>
	</div>
	<div class="content">
		{@render children?.()}
	</div>
</div>

<style>
	.terminal {
		width: 100%;
		max-width: 1040px;
		background: var(--terminal-bg);
		border: 1px solid var(--border);
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
	}

	.title-bar {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 10px 16px;
		background: var(--terminal-bar);
		border-bottom: 1px solid var(--border);
	}

	.dots {
		display: flex;
		gap: 6px;
	}

	.dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
	}

	.dot-red {
		background: var(--dot-red);
	}

	.dot-yellow {
		background: var(--dot-yellow);
	}

	.dot-green {
		background: var(--dot-green);
	}

	.title {
		display: flex;
		align-items: center;
		gap: 8px;
		color: var(--text-dim);
		font-size: 13px;
	}

	.title-spacer {
		flex: 1;
	}

	.content {
		padding: 24px;
		min-height: 60vh;
		position: relative;
	}
</style>
