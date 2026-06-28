FROM nginx:1.27-alpine

COPY index.html robots.txt sitemap.xml CNAME Lg.jpg Lg2.png /usr/share/nginx/html/
COPY assets /usr/share/nginx/html/assets
COPY css /usr/share/nginx/html/css
COPY js /usr/share/nginx/html/js

EXPOSE 80
