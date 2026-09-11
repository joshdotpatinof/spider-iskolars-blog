function escapeHtml(s: string): string {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}

function inline(text: string): string {
	const codes: string[] = [];
	let t = text.replace(/`([^`]+)`/g, (_m, c) => {
		codes.push(c);
		return `\u0000CODE${codes.length - 1}\u0000`;
	});
	t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
	t = t.replace(/(^|[\s(])\*([^*]+)\*/g, '$1<em>$2</em>');
	t = t.replace(
		/\[([^\]]+)\]\(([^)]+)\)/g,
		'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
	);
	return t.replace(/\u0000CODE(\d+)\u0000/g, (_m, i) => `<code>${codes[Number(i)]}</code>`);
}

export function renderMarkdown(md: string): string {
	const src = escapeHtml(md.replace(/\r\n/g, '\n'));
	const lines = src.split('\n');
	const out: string[] = [];
	let i = 0;

	while (i < lines.length) {
		const raw = lines[i].trimEnd();
		const line = raw.trim();

		if (line === '') {
			i++;
			continue;
		}

		if (line === '---') {
			out.push('<hr>');
			i++;
			continue;
		}

		const heading = line.match(/^(#{1,6})\s+(.*)$/);
		if (heading) {
			const level = heading[1].length;
			out.push(`<h${level}>${inline(heading[2])}</h${level}>`);
			i++;
			continue;
		}

		if (/^>\s?/.test(line)) {
			const block: string[] = [];
			while (i < lines.length && /^>\s?/.test(lines[i].trim())) {
				block.push(lines[i].trim().replace(/^>\s?/, ''));
				i++;
			}
			out.push(`<blockquote>${block.map((b) => `<p>${inline(b)}</p>`).join('')}</blockquote>`);
			continue;
		}

		if (/^[-*]\s+/.test(line)) {
			const items: string[] = [];
			while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
				items.push(inline(lines[i].trim().replace(/^[-*]\s+/, '')));
				i++;
			}
			out.push(`<ul>${items.map((it) => `<li>${it}</li>`).join('')}</ul>`);
			continue;
		}

		if (/^\d+\.\s+/.test(line)) {
			const items: string[] = [];
			while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
				items.push(inline(lines[i].trim().replace(/^\d+\.\s+/, '')));
				i++;
			}
			out.push(`<ol>${items.map((it) => `<li>${it}</li>`).join('')}</ol>`);
			continue;
		}

		const para: string[] = [];
		while (
			i < lines.length &&
			lines[i].trim() !== '' &&
			!/^(#{1,6})\s+/.test(lines[i].trim()) &&
			!/^>\s?/.test(lines[i].trim()) &&
			!/^[-*]\s+/.test(lines[i].trim()) &&
			!/^\d+\.\s+/.test(lines[i].trim()) &&
			lines[i].trim() !== '---'
		) {
			para.push(inline(lines[i].trimEnd()));
			i++;
		}
		out.push(`<p>${para.join(' ')}</p>`);
	}

	return out.join('\n');
}