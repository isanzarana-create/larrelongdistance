#!/bin/sh
# Regenera todo el sitio en orden y deja el resultado publicable en site/
set -e
cd "$(dirname "$0")/.."
for g in pages home pages_en pages_eu forms seo; do python3 -I tools/$g.py | tail -1; done
