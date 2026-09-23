import { useEffect } from 'react';

export interface PageSeoConfig {
  title: string;
  description: string;
  canonicalPath: string;
  keywords?: string;
  ogImage?: string;
}

export const SEO_PAGES: Record<string, PageSeoConfig> = {
  home: {
    title: 'Clickit Jaipur – On-Demand Intracity Logistics & Delivery Network',
    description: 'Clickit Jaipur: Book instant bike couriers, 3-wheeler loaders, Tata Ace, and pickup trucks with real-time GPS tracking across Jaipur. 10-minute pickup guaranteed.',
    canonicalPath: '/',
    keywords: 'Clickit, Clickit Jaipur, Click It, Click It Jaipur, Clickit Logistics, Tata Ace Jaipur, mini truck rent Jaipur, intracity delivery Jaipur, bike courier Jaipur',
    ogImage: 'https://www.justclickit.in/favicon-512x512.png',
  },
  'about-us': {
    title: 'About Clickit Jaipur – Moving Jaipur & India Forward',
    description: 'Learn about Clickit Jaipur, our verified driver partner network, intracity freight innovation, and headquarters in Bani Park, Jaipur. On-demand logistics with zero surge.',
    canonicalPath: '/about-us',
    keywords: 'About Clickit Jaipur, Clickit Logistics founder, transport network Jaipur, delivery partners Jaipur, Bani Park logistics company',
    ogImage: 'https://www.justclickit.in/favicon-512x512.png',
  },
  'help-support': {
    title: '24/7 Help & Support – Clickit Jaipur Helpline & Dispatch Office',
    description: 'Contact Clickit Jaipur 24/7 support at +91 141 498 2200 or email support@justclickit.in. Visit our Bani Park HQ for immediate dispatch or enterprise assistance.',
    canonicalPath: '/help-support',
    keywords: 'Clickit Jaipur customer care number, Clickit helpline, Clickit Bani park address, support justclickit in, driver support Jaipur',
    ogImage: 'https://www.justclickit.in/favicon-512x512.png',
  },
  'driver-faqs': {
    title: 'Driver FAQs & Earnings – Join Clickit Jaipur Fleet',
    description: 'Frequently asked questions for delivery drivers and vehicle owners in Jaipur. Learn about daily payouts, commercial vehicle requirements, fuel perks, and joining Clickit.',
    canonicalPath: '/driver-faqs',
    keywords: 'Clickit driver attach Jaipur, Tata Ace attach Clickit, delivery partner earnings Jaipur, driver faqs Clickit',
    ogImage: 'https://www.justclickit.in/favicon-512x512.png',
  },
  'driver-agreement': {
    title: 'Driver Partner Agreement – Clickit Logistics Jaipur',
    description: 'Statutory onboarding terms, delivery partner code of conduct, payment settlement cycles, and terms of service for Clickit Logistics driver partners.',
    canonicalPath: '/driver-agreement',
    keywords: 'Clickit driver partner agreement, delivery partner contract Jaipur, Clickit terms for drivers',
    ogImage: 'https://www.justclickit.in/favicon-512x512.png',
  },
  'terms-and-conditions': {
    title: 'Terms & Conditions – Clickit Logistics Private Limited',
    description: 'Official user terms, cargo booking rules, pricing policies, cancellation terms, and dispute jurisdiction under competent courts in Jaipur, Rajasthan.',
    canonicalPath: '/terms-and-conditions',
    keywords: 'Clickit terms and conditions, terms of service Clickit Jaipur, logistics booking rules Jaipur',
    ogImage: 'https://www.justclickit.in/favicon-512x512.png',
  },
  'privacy-policy': {
    title: 'Privacy Policy – Clickit Logistics Data Protection',
    description: 'Clickit Logistics privacy policy: how we collect, safeguard, and use GPS coordinates, booking records, and contact information under Indian IT Act regulations.',
    canonicalPath: '/privacy-policy',
    keywords: 'Clickit privacy policy, user data security Clickit, GPS location policy Jaipur delivery',
    ogImage: 'https://www.justclickit.in/favicon-512x512.png',
  },
  app: {
    title: 'Download Clickit App – Jaipur’s Fastest Mini-Truck & Courier App',
    description: 'Download the Clickit app for Android & iOS. Book instant Tata Ace, 3-wheeler loaders, and bike deliveries anywhere in Jaipur with live GPS tracking.',
    canonicalPath: '/app',
    keywords: 'Clickit app download, Clickit APK Jaipur, mini truck booking app, Porter alternative Jaipur, Clickit Android app',
    ogImage: 'https://www.justclickit.in/favicon-512x512.png',
  },
};

export function usePageSeo(activeTab: string) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const config = SEO_PAGES[activeTab] || SEO_PAGES.home;
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://www.justclickit.in';
    const canonicalUrl = `${origin}${config.canonicalPath}`;

    // Update document title
    document.title = config.title;

    // Helper to update or create a meta tag
    const updateMeta = (nameAttr: 'name' | 'property', attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${nameAttr}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(nameAttr, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update description & keywords
    updateMeta('name', 'description', config.description);
    if (config.keywords) {
      updateMeta('name', 'keywords', config.keywords);
    }

    // Update OpenGraph tags
    updateMeta('property', 'og:title', config.title);
    updateMeta('property', 'og:description', config.description);
    updateMeta('property', 'og:url', canonicalUrl);
    if (config.ogImage) {
      updateMeta('property', 'og:image', config.ogImage);
    }

    // Update Twitter tags
    updateMeta('name', 'twitter:title', config.title);
    updateMeta('name', 'twitter:description', config.description);
    updateMeta('name', 'twitter:url', canonicalUrl);
    if (config.ogImage) {
      updateMeta('name', 'twitter:image', config.ogImage);
    }

    // Update Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);
  }, [activeTab]);
}
