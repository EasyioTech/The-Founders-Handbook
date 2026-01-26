import Script from 'next/script';

export default function StructuredData() {
    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
            // Website
            {
                '@type': 'WebSite',
                '@id': 'https://the-founders-handbook.com/#website',
                url: 'https://the-founders-handbook.com',
                name: 'The Founders Handbook',
                description: 'Comprehensive startup handbook for Indian founders',
                publisher: {
                    '@id': 'https://the-founders-handbook.com/#organization',
                },
                inLanguage: 'en-IN',
            },
            // Organization
            {
                '@type': 'Organization',
                '@id': 'https://the-founders-handbook.com/#organization',
                name: 'Easyio Technologies',
                url: 'https://easyio.tech',
                logo: {
                    '@type': 'ImageObject',
                    url: 'https://the-founders-handbook.com/logo.png',
                },
                contactPoint: {
                    '@type': 'ContactPoint',
                    contactType: 'Customer Support',
                    email: 'contact@easyio.tech',
                },
            },
            // Educational Course/Guide
            {
                '@type': 'Course',
                name: 'The Founders Handbook - Complete Startup Guide',
                description: 'Comprehensive startup handbook covering fundraising, product development, financial metrics and legal compliance for Indian founders',
                provider: {
                    '@type': 'Organization',
                    name: 'Easyio Technologies',
                    url: 'https://easyio.tech',
                },
                audience: {
                    '@type': 'EducationalAudience',
                    audienceType: 'Startup Founders',
                },
                educationalLevel: 'Beginner to Advanced',
                coursePrerequisites: 'None',
                hasCourseInstance: {
                    '@type': 'CourseInstance',
                    courseMode: 'online',
                    courseWorkload: 'Self-paced',
                },
                about: [
                    'Startup Fundraising',
                    'Product Development',
                    'Financial Metrics',
                    'Legal Compliance',
                    'Indian SaaS Ecosystem',
                ],
            },
            // Knowledge Base
            {
                '@type': 'WebPage',
                '@id': 'https://the-founders-handbook.com/#webpage',
                url: 'https://the-founders-handbook.com',
                name: 'The Founders Handbook - Complete Startup Guide for Indian Founders',
                description: 'Learn fundraising (Pre-Seed to Series A), product development, financial metrics & legal compliance. India-focused with INR calculations.',
                isPartOf: {
                    '@id': 'https://the-founders-handbook.com/#website',
                },
                about: {
                    '@type': 'Thing',
                    name: 'Startup Education',
                },
                primaryImageOfPage: {
                    '@type': 'ImageObject',
                    url: 'https://the-founders-handbook.com/og-image.png',
                    width: 1200,
                    height: 630,
                },
                datePublished: '2025-01-01',
                dateModified: new Date().toISOString(),
                inLanguage: 'en-IN',
            },
            // Breadcrumb List
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Home',
                        item: 'https://the-founders-handbook.com',
                    },
                ],
            },
            // FAQPage (can be expanded)
            {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'What is The Founders Handbook?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'The Founders Handbook is a comprehensive guide for Indian startup founders covering the complete journey from ideation to Series A funding and beyond. It includes practical frameworks, calculators, and India-specific insights with all monetary values in INR.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'Who is this handbook for?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'This handbook is designed for early-stage startup founders in India, entrepreneurs raising Pre-Seed to Series A funding, product builders navigating the Indian SaaS ecosystem, and technical founders learning business fundamentals.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'What funding stages are covered?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'The handbook covers Pre-Seed (₹1-4 Cr), Seed (₹4-16 Cr), and Series A (₹25-80 Cr) funding stages with India-specific insights, iSAFE notes explanation, and term sheet guidance.',
                        },
                    },
                ],
            },
        ],
    };

    return (
        <Script
            id="structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            strategy="beforeInteractive"
        />
    );
}
