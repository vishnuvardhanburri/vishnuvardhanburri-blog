import type { Metadata, Viewport } from 'next';
import { Outfit, JetBrains_Mono, Playfair_Display, Alex_Brush } from 'next/font/google';
import { getMessages, getLocale } from 'next-intl/server';
import { ThemeProvider, I18nProvider, SmoothScrollProvider } from '@/providers';

import '@/styles/globals.css';

const inter = Outfit({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains',
    display: 'swap',
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
});

const signature = Alex_Brush({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-signature',
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        default: 'Vishnu Vardhan Burri | Principal Architect & CEO',
        template: '%s | Vishnu Vardhan Burri',
    },
    description: 'Founder & CEO at XAVIRA Technologies | Toptal Top 3% SDE/ML Engineer | Designing High-Scale Backend Architecture & Production-AI Infrastructure.',
    keywords: ['Vishnu Vardhan Burri', 'XAVIRA Technologies', 'Principal Architect', 'Machine Learning Engineer', 'Cybersecurity', 'Toptal SDE', 'London', 'Software Engineer'],
    authors: [{ name: 'Vishnu Vardhan Burri', url: 'https://www.vishnuvardhanburri.in' }],
    creator: 'Vishnu Vardhan Burri',
    metadataBase: new URL('https://www.vishnuvardhanburri.in'),
    alternates: {
        canonical: '/',
        languages: {
            'en-US': '/en',
        },
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://www.vishnuvardhanburri.in',
        title: 'Vishnu Vardhan Burri | Principal Architect',
        description: 'Founder & CEO at XAVIRA Technologies | Designing High-Scale Backend Architecture & Production-AI Infrastructure.',
        siteName: 'Vishnu Vardhan Burri',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Vishnu Vardhan Burri | Principal Architect',
        description: 'Founder & CEO at XAVIRA Technologies | Designing High-Scale Backend Architecture & Production-AI Infrastructure.',
        creator: '@vishnuvardhanburri',
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'add-your-google-site-verification-here',
    }
};

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
    ],
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
};

import { ThemeAwareClickSpark } from '@/components/ui/ThemeAwareClickSpark';
import { ConditionalNavigation } from '@/components/layout/ConditionalNavigation';
import { ArcPreloaderWrapper } from '@/components/layout/ArcPreloaderWrapper';
import { ChatBot } from '@/components/layout/ChatBot';

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Person",
                "@id": "https://www.vishnuvardhanburri.in/#person",
                "name": "Vishnu Vardhan Burri",
                "url": "https://www.vishnuvardhanburri.in",
                "image": "https://www.vishnuvardhanburri.in/gallery/vishnu-me.jpg",
                "jobTitle": ["Founder & CEO", "Director", "Principal Architect", "Toptal Top 3% SDE/ML Engineer"],
                "worksFor": [
                    {
                        "@type": "Organization",
                        "name": "XAVIRA Technologies",
                        "url": "https://xaviratechlabs.com"
                    },
                    {
                        "@type": "Organization",
                        "name": "Toptal",
                        "url": "https://www.toptal.com"
                    }
                ],
                "alumniOf": {
                    "@type": "CollegeOrUniversity",
                    "name": "The Apollo University"
                },
                "knowsAbout": ["Artificial Intelligence", "Machine Learning", "Cybersecurity", "Distributed Systems", "Cloud Architecture", "Zero-Knowledge Proofs", "Rust", "Python"],
                "sameAs": [
                    "https://www.linkedin.com/in/vishnuvardhanburri/",
                    "https://github.com/vishnuvardhanburri",
                    "https://orcid.org/0009-0004-7513-0528",
                    "https://xaviratechlabs.com"
                ]
            },
            {
                "@type": "WebSite",
                "@id": "https://www.vishnuvardhanburri.in/#website",
                "url": "https://www.vishnuvardhanburri.in",
                "name": "Vishnu Vardhan Burri - CEO & Principal Architect",
                "description": "Founder & CEO at XAVIRA Technologies | Designing High-Scale Backend Architecture & Production-AI Infrastructure.",
                "publisher": {
                    "@id": "https://www.vishnuvardhanburri.in/#person"
                }
            }
        ]
    };

    const locale = await getLocale();
    const messages = await getMessages();

    return (
        <html lang={locale} data-scroll-behavior="smooth" suppressHydrationWarning>
            <body className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} ${signature.variable} font-sans relative`}>
                <ThemeProvider>
                    <I18nProvider locale={locale} messages={messages}>
                        <SmoothScrollProvider>
                            <ThemeAwareClickSpark>
                                <ArcPreloaderWrapper>
                                    <ConditionalNavigation>
                                        {children}
                                    </ConditionalNavigation>
                                </ArcPreloaderWrapper>
                                <ChatBot headless />
                            </ThemeAwareClickSpark>
                        </SmoothScrollProvider>
                    </I18nProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
