#!/bin/bash
# usage: shoot.sh <path> <name>  -> shots/new-<name>-d.png and -m.png
# QA only: scroll first (loads lazy images), then switch scroll-driven reveals off (they depend on scroll
# position, so a full-page screenshot would show them hidden). Real visitors see them animate.
P="$1"; N="$2"
for s in "1280 800 d" "390 844 m"; do
  set -- $s
  playwright-cli resize $1 $2 >/dev/null 2>&1
  playwright-cli goto "http://localhost:3100$P" >/dev/null 2>&1
  playwright-cli eval "(async()=>{const H=document.documentElement.scrollHeight;for(let y=0;y<H;y+=400){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,80))}window.scrollTo(0,0);const s=document.createElement('style');s.textContent='*,*::before,*::after{animation:none!important;transition:none!important} .hero-media::after{display:none!important} .cv-sections>section>.wrap{content-visibility:visible!important}';document.head.append(s);await new Promise(r=>setTimeout(r,500));return H})()" >/dev/null 2>&1
  playwright-cli screenshot --full-page --filename="shots/new-$N-$3.png" >/dev/null 2>&1
done
