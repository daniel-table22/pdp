import { STRAPI_URL } from '../config'

export const getStrapiMedia = (url) => {
    if (!url) return null
    if (url.startsWith('http')) return url
    return `${STRAPI_URL}${url}`
} 