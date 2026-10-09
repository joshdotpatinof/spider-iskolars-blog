import entry01 from '../../entries/entry-01-project-plan.md?raw';
import entry02 from '../../entries/entry-02-project-plan-v2.md?raw';

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
	},
	{
		id: 'entry-02',
		slug: 'entry-02-project-plan-v2',
		file: 'entry-02-project-plan-v2.md',
		title: 'Project Plan v2',
		date: '2026-10-09',
		description:
			'Updated project plan with the Spider-Iskolars Gantt chart and bi-weekly sprint schedule.',
		body: entry02,
		url: '../../project-plan-v2.pdf',
		urlLabel: 'View Project Plan v2 →'
	}
];