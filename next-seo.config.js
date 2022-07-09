/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "Alpha Road Workshop",
  titleTemplate: "%s",
  defaultTitle: "Alpha Road Workshop",
  description: "StarknetCC fullstack workshop by ARF",
  canonical: "https://nextarter-chakra.sznm.dev",
  openGraph: {
    url: "https://nextarter-chakra.sznm.dev",
    title: "Alpha Road Workshop",
    description: "StarknetCC fullstack workshop by ARF",
    images: [
      {
        url: "https://testnet.app.alpharoad.fi/alpharoad-banner.png",
        alt: "Alpha Road Workshop",
      },
    ],
    site_name: "alpharoad",
  },
  twitter: {
    handle: "@a5f9t4",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
