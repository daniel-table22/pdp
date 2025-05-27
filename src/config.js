// Strapi API configuration
// Local development URL
// export const STRAPI_URL = 'http://localhost:1337'

// Strapi Cloud URL
export const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'https://majestic-rhythm-cd26cbae12.strapiapp.com'
export const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_TOKEN || '40238a60c214e3f39a98973a81286cc418f9964ff18b99a534cde82b15a84a20360c2bd976d78ed04fdb63ee2d40ab119de1c4bd685b893e07ac4f7fa3e8ba188103bae244dd974017ae355bbdd62e19ca2087c58bcb567d37f54fdbed4fa9a863fdae663701cc3abd63e5c84228aa33d44fd972e8ce8a87b1bf083ab2cdf177' 