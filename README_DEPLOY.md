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

## Current deployment

The site is deployed with GitHub Pages.

- Repository: `https://github.com/tinggyo-ai/cgessence.co.kr`
- Pages source: `master` branch, project root
- Custom domain configured in GitHub Pages: `cgessence.co.kr`

## GitHub Pages DNS records for Gabia

In Gabia DNS, add these records for the root domain.

| Type | Host | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | tinggyo-ai.github.io |

Optional IPv6 records:

| Type | Host | Value |
| --- | --- | --- |
| AAAA | @ | 2606:50c0:8000::153 |
| AAAA | @ | 2606:50c0:8001::153 |
| AAAA | @ | 2606:50c0:8002::153 |
| AAAA | @ | 2606:50c0:8003::153 |

After DNS propagation, enable HTTPS in GitHub repository settings:

`Settings` -> `Pages` -> `Enforce HTTPS`

## Alternative setup

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
