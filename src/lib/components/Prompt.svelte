<script lang="ts">
	let { command = '' }: { command?: string } = $props();
</script>

<div class="prompt-line">
	<span class="prompt">josh@spider-iskolars:~$</span>
	<span class="command">{command}</span>
</div>

<style>
	.prompt-line {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 14px;
		margin-bottom: 8px;
	}

	.prompt {
		color: var(--prompt);
		white-space: nowrap;
	}

	.command {
		color: var(--text-primary);
	}
</style>