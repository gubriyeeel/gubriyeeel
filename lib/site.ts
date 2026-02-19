const rawUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

const normalizedUrl = rawUrl.endsWith("/") ? rawUrl.slice(0, -1) : rawUrl;

export const siteConfig = {
  name: "Gabriel Sufrir",
  description: "Personal website of Gubriyeeel",
  url: normalizedUrl,
  links: {
    linkedin: "https://www.linkedin.com/in/gubriyeeel/",
    email: "mailto:work.gabrielsufrir@gmail.com",
  },
};
