/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['firebasestorage.googleapis.com'],
    },
    i18n: {
        defaultLocale: 'ka',
        locales: ['ka', 'en', 'az'],
        localeDetection: false,
    },
}

module.exports = nextConfig
