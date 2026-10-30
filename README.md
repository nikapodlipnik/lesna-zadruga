# Lesna zadruga za Selško dolino — spletna stran

Statični projekt za https://lesna-zadruga.si/ s stranmi **Domov**, **Vizitka** in **Apartma Podčetrtek**.

## Lokalni predogled

V mapi `lesna-zadruga` izvedite `python -m http.server 8000`, nato odprite http://localhost:8000/.

## GitHub → Cloudflare Pages

1. Naložite **vsebino mape `lesna-zadruga`** v GitHub repozitorij (koren repozitorija).
2. V Cloudflare Pages izberite GitHub repozitorij, `Build command` pustite prazno, `Build output directory` nastavite na `/` (ali `.` glede na vmesnik).
3. Preverite stran na dodeljenem naslovu `*.pages.dev`, tudi na telefonu in pri povečavi slik.
4. Pred spremembo DNS pri G-Serverju izvozite/prepišite obstoječe DNS zapise, posebej MX, TXT (SPF, DKIM, DMARC), CNAME, A/AAAA. Nastavite zahtevane zapise v Cloudflare.
5. Sledite navodilom za vključitev domene pri Cloudflare Pages; šele nato pri registrarju spremenite nameserverje. Ne izklopite starega gostovanja pred uspešnim preizkusom.
6. V Google Search Console potrdite lastništvo domene in oddajte https://lesna-zadruga.si/sitemap.xml.

## Slike in logotip

V `images/arhiv-*.webp` je 8 programsko izboljšanih zgodovinskih fotografij (brez generiranih zgodovinskih prizorov). V `images/ap*.png` je 6 trenutnih fotografij nastanitve. Logotip je `assets/logotip.svg`, ikona zavihka `favicon.svg`.

## Google Koledar

Vdelava v `apartma-podcetrtek/index.html` uporablja koledar `lesna.zadruga@gmail.com`. Obiskovalci ne smejo videti osebnih podatkov gostov. Pred objavo preverite prikaz koledarja v zasebnem oknu, z javno objavo samo zasedenosti. Če koledar ni javno deljen, vdelava ne bo delovala. Rezervacije se opravijo s klicem Tomaža Demšarja, ki jih nato vnese v koledar. Karte niso predmet ločenih rezervacij.

## Preverjanje pred javno objavo

Preverite aktualnost poslovnih podatkov, pogojev kart za kopališča in morebitne varnostne oziroma pravne obveznosti. Upoštevajte, da 100-odstotne razpoložljivosti ni mogoče zagotoviti.
