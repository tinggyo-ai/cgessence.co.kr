# CGEssence public site deployment

This site is a static website. There is no build step.

## Files to publish

Upload the project root, excluding `.git`.

Required files and folders:

- `index.html`
- `robots.txt`
- `sitemap.xml`
- `Lg2.png`
- `Lg.jpg`
- `assets/`
- `css/`
- `js/`

## Recommended setup

Use a static hosting provider such as Netlify, Vercel, Cloudflare Pages, GitHub Pages, or Gabia web hosting.

For Netlify/Vercel/Cloudflare Pages:

- Build command: leave blank
- Publish directory: project root
- Production domain: `cgessence.co.kr`
- Add `www.cgessence.co.kr` too, then redirect one domain to the other

## Gabia DNS checklist

The domain currently uses Gabia nameservers. After adding `cgessence.co.kr` to the hosting provider, copy the exact DNS records shown by that provider into Gabia DNS.

Common patterns:

- `www` usually uses a `CNAME` record.
- The root/apex domain `cgessence.co.kr` usually uses an `A`, `ALIAS`, `ANAME`, or provider-managed record, depending on the host.
- DNS propagation can take from several minutes to a few hours.

## Local preview

From this folder:

```powershell
python -m http.server 5173 --bind 127.0.0.1
```

Open:

```text
http://127.0.0.1:5173/index.html
```
