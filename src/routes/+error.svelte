<script lang="ts">
	import Terminal from '$lib/components/Terminal.svelte';
	import Prompt from '$lib/components/Prompt.svelte';

	let { error, status }: { error?: unknown; status?: number } = $props();

	let message = $derived(
		typeof error === 'object' && error !== null && 'message' in error
			? String(error.message)
			: error
				? String(error)
				: 'The requested resource does not exist in this filesystem.'
	);
</script>

<svelte:head>
	<title>{status ?? 404} | Spider-Iskolars</title>
</svelte:head>

<div class="error-page">
	<Terminal>
		<div class="error-content">
			<div class="error-code">
				<span class="code-text">{status ?? 404}</span>
				<span class="code-label">NOT FOUND</span>
			</div>
			<div class="divider">{'─'.repeat(40)}</div>
			<Prompt command="cat /dev/null" />
			<p class="message">{message}</p>
			<p class="hint">
				<span class="dim">$</span> Try going back to the
				<a href="./">home directory</a>.
			</p>
		</div>
	</Terminal>
</div>

<style>
	.error-page {
		width: 100%;
		max-width: 860px;
		display: flex;
		justify-content: center;
	}

	.error-content {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.error-code {
		display: flex;
		align-items: baseline;
		gap: 12px;
		margin-bottom: 8px;
	}

	.code-text {
		font-size: 3rem;
		font-weight: 700;
		color: var(--dot-red);
	}

	.code-label {
		font-size: 1rem;
		color: var(--text-dim);
		letter-spacing: 4px;
	}

	.divider {
		color: var(--text-dim);
		opacity: 0.3;
		font-size: 12px;
		overflow: hidden;
	}

	.message {
		color: var(--text-dim);
		font-size: 14px;
		margin-top: 8px;
	}

	.hint {
		font-size: 13px;
		margin-top: 4px;
	}

	.dim {
		color: var(--text-dim);
	}
</style>