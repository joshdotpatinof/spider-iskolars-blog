<script lang="ts">
	let { size = 48, class: className = '' }: { size?: number; class?: string } = $props();
</script>

<span
	class="spider-logo {className}"
	style="font-size: {size}px"
	role="img"
	aria-label="Spider logo"
>🕷</span>