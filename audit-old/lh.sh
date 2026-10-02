#!/bin/bash
# usage: lh.sh <tag> <path>...   Lighthouse mobile (default throttling) on local production build -> audit-old/lh-<tag>-<n>.json + one summary line each
tag=$1; shift
for p in "$@"; do n=${p:-home}; n=${n//\//-}
  timeout 280 npx --yes lighthouse "http://localhost:3100/$p" --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless=new --no-sandbox" --output=json --output-path="audit-old/lh-$tag-$n.json" --quiet >/dev/null 2>&1
  node -e "const r=require('./audit-old/lh-$tag-$n.json');const c=r.categories,a=r.audits;console.log('$tag $n',Object.entries(c).map(([k,v])=>k.slice(0,4)+':'+Math.round(v.score*100)).join(' '),'FCP',a['first-contentful-paint'].displayValue,'LCP',a['largest-contentful-paint'].displayValue,'TBT',a['total-blocking-time'].displayValue,'CLS',a['cumulative-layout-shift'].displayValue)"
done
