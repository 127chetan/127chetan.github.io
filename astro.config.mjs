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
			defaultTheme: 'light',
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
						{ label: 'BILL — Payment API Docs', slug: 'case-studies/bill-payment-api' },
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
		}),
	],
});
