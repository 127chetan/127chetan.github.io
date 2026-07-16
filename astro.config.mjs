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
						{ label: 'BILL — Zendesk → ReadMe Migration', slug: 'case-studies/bill/zendesk-to-readme' },
						{ label: 'BILL — OpenAPI Spec from Scratch', slug: 'case-studies/bill/openapi-spec' },
						{ label: 'BILL — Two API Versions', slug: 'case-studies/bill/dual-api-versions' },
						{ label: 'BILL — Platform Expansion & Docs Leadership', slug: 'case-studies/bill/platform-expansion' },
					{ label: 'BILL — AI-Powered Postman Collection', slug: 'case-studies/bill/ai-postman-collection' },
						{ label: 'BILL — AI Tooling for Docs', slug: 'case-studies/bill/ai-docs-tooling' },
						{ label: 'BILL — Developer Platform Growth', slug: 'case-studies/bill/growth' },
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
						document.addEventListener('DOMContentLoaded', function() {
							document.querySelectorAll('a[href*="linkedin.com"]').forEach(function(a) {
								a.target = '_blank';
								a.rel = 'noopener noreferrer';
							});
						});
					`,
				},
			],
		}),
	],
});
