const STRAPI_URL = 'http://localhost:1337'

export const getStrapiMedia = (url) => {
    if (!url) return null
    if (url.startsWith('http')) return url
    return `${STRAPI_URL}${url}`
} 