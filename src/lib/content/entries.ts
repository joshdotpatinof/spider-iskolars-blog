import entry01 from '../../entries/entry-01-project-plan.md?raw';

export interface Entry {
	id: string;
	slug: string;
	file: string;
	title: string;
	date: string;
	description: string;
	body: string;
	url?: string;
	urlLabel?: string;
}

export const entries: Entry[] = [
	{
		id: 'entry-01',
		slug: 'entry-01-project-plan',
		file: 'entry-01-project-plan.md',
		title: 'Project Plan',
		date: '2026-09-11',
		description:
			'Initial project plan and scope for the Spider-Iskolars software engineering project (CS 191).',
		body: entry01,
		url: '../../project-plan.pdf',
		urlLabel: 'View Project Plan →'
	}
];