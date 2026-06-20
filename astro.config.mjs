// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://127chetan.github.io',
	integrations: [
		starlight({
			title: 'Chetan Bhatia',
			defaultLocale: 'en',
			description: 'Technical Writer with 14 years of experience in developer documentation, API references, and content strategy.',
			social: [
				{ icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/cbhatia/' },
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/127chetan' },
			],
			sidebar: [
				{
					label: 'Case Studies',
					items: [
						{ label: 'Overview', slug: 'case-studies' },
						{
							label: 'BILL — developer.bill.com',
							items: [
								{ label: 'Overview', slug: 'case-studies/bill' },
								{ label: '1. Zendesk → ReadMe (2021)', slug: 'case-studies/bill/zendesk-to-readme' },
								{ label: '2. OpenAPI Spec (2022)', slug: 'case-studies/bill/openapi-spec' },
								{ label: '3. Dual API Versions (2023–2024)', slug: 'case-studies/bill/dual-api-versions' },
								{ label: '4. AI Postman Collection (2025)', slug: 'case-studies/bill/ai-postman-collection' },
								{ label: '5. Growth (2025–2026)', slug: 'case-studies/bill/growth' },
							],
						},
					],
				},
				{
					label: 'Writing Samples',
					items: [
						{ label: 'Overview', slug: 'writing-samples' },
					],
				},
				{
					label: 'Resume',
					items: [
						{ label: 'Experience & Skills', slug: 'resume' },
					],
				},
			],
			customCss: ['./src/styles/custom.css'],
			head: [
				{
					tag: 'script',
					content: `
						if (!localStorage.getItem('starlight-theme')) {
							localStorage.setItem('starlight-theme', 'light');
						}
					`,
				},
			],
		}),
	],
});
