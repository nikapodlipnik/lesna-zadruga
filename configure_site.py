"""Pripravi canonical naslove, zemljevid strani in strukturirane podatke."""
from pathlib import Path
from urllib.parse import urlsplit
import sys, json
from bs4 import BeautifulSoup

ROOT=Path(__file__).resolve().parent
PAGES={'index.html':'/','vizitka/index.html':'/vizitka/','apartma-podcetrtek/index.html':'/apartma-podcetrtek/'}

def main():
    """Nastavi domeno in ustvari SEO datoteke."""
    if len(sys.argv)!=2:
        raise SystemExit('Uporaba: python configure_site.py https://vasa-domena.si')
    base=sys.argv[1].rstrip('/')
    parsed=urlsplit(base)
    if parsed.scheme!='https' or not parsed.netloc or parsed.path or parsed.query or parsed.fragment:
        raise SystemExit('Uporabi HTTPS domeno brez poti, npr. https://vasa-domena.si')
    for file,path in PAGES.items():
        target=ROOT/file
        soup=BeautifulSoup(target.read_text(encoding='utf-8'),'html.parser')
        url=base+path
        for old in soup.select('link[rel="canonical"], meta[property="og:url"], script[data-generated-seo]'): old.decompose()
        soup.head.append(soup.new_tag('link',rel='canonical',href=url))
        soup.head.append(soup.new_tag('meta',attrs={'property':'og:url','content':url}))
        if path=='/':
            data={'@context':'https://schema.org','@type':'Organization','name':'Lesna zadruga za Selško dolino, z.o.o.','url':base+'/','email':'lesna.zadruga@gmail.com','telephone':'+38641805484','address':{'@type':'PostalAddress','streetAddress':'Češnjica 54','postalCode':'4228','addressLocality':'Železniki','addressCountry':'SI'}}
            tag=soup.new_tag('script',type='application/ld+json',attrs={'data-generated-seo':'true'})
            tag.string=json.dumps(data,ensure_ascii=False)
            soup.head.append(tag)
        target.write_text(str(soup),encoding='utf-8')
        print('Posodobljena stran:',file)
    from xml.sax.saxutils import escape
    sitemap='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+''.join('  <url><loc>'+escape(base+p)+'</loc></url>\n' for p in PAGES.values())+'</urlset>\n'
    (ROOT/'sitemap.xml').write_text(sitemap,encoding='utf-8')
    (ROOT/'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: '+base+'/sitemap.xml\n',encoding='utf-8')
    print('Ustvarjena sitemap.xml in robots.txt za',base)

if __name__=='__main__': main()
