#!/usr/bin/env python3
"""Páginas interiores EU (redactadas para revisión). Uso: python3 -I tools/pages_eu.py"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
import pages as P
import gallery
from pages import page, sec, dl, write, H, URLS, route_module
P.LANG = "eu"
L = lambda k: URLS[k][1]
CTA = '<a class="cta" href="%s">Aurrez-izena · 2026ko abenduaren 1a</a>'

def p_ruta():
    data, map_svg, prof_svg, rd = route_module("eu"); rmax = round(rd["km_total"] * 10)
    mod = f'''<div class="rmod" id="rmod" data-src="/datos/larre-2027.json" {data}>
<figure class="rprof">{prof_svg}<input id="rscrub" class="scrub" type="range" min="0" max="{rmax}" step="1" value="0" aria-label="Ibilbidea kilometroz kilometro egin" aria-controls="rread" hidden></figure>
<p class="rread mono" id="rread" data-default="Punturik garaiena: 1.383 m · 152,5. km">Punturik garaiena: 1.383 m · 152,5. km</p>
<p class="visually-hidden" id="rlive" aria-live="polite"></p>
<figure class="rmap">{map_svg}</figure></div>'''
    ficha = dl([("Distantzia", "226,9 km"), ("Igoera positiboa", "4.644 m"), ("Altitudea", "515 m-tik 1.383 m-ra (punturik garaiena 152,5. km-an)"),
                ("Formatua", "Etapa bakarra, non-stop, zirkularra"), ("Irteera eta helmuga", "Florida parkea, Gasteiz"), ("Irteera-ordua", "16:00"),
                ("Denbora-muga", "50 ordu (kontrolaren itxiera 18:00etan)"), ("Eremuak", "Entzia, Toloño, Kantabria eta Izki mendilerroak, eta Arabako Errioxa"), ("Plazak", "300 korrikalari")], "ficha")
    b = sec('<h2 class="h2s">Ibilbidearen datuak</h2>' + ficha + '<p class="note">Distantzia track ofizialean neurtua. Igoera positiboa GPSaren altitude leundutik kalkulatzen da; leundu gabe, GPSaren zaratak ia 5.000 m-ra arte puztuko luke.</p>')
    b += sec('<h2 class="h2s">Mapa eta profila</h2><p>Mugitu irristagailua profilaren gainean, ibilbidea kilometroz kilometro egiteko.</p>' + mod + '<p class="mono" style="margin-top:var(--s3)">Track ofiziala · <span>larre-2027.gpx</span> · irteera baino 30 egun lehenago argitaratuko da</p>', "alt")
    b += sec('<h2 class="h2s">Zigilatze-checkpointak</h2><p>Ibilbideak 6 zigilatze-checkpoint ditu, eta ez dira janari-postuak: Ultra Trail Larre autosufizientzian korritzen da. Haien kokapena izen-emateak ireki aurretik berretsiko da.</p>')
    b += sec(f'<h2 class="h2s">Nabigazioa</h2><p>GPS track ofiziala nahitaezkoa da. Korrikalari bakoitzak SOS botoia duen GPS tracker bat darama, eta antolakuntzak kontrol-zentro bat du Gasteizen.</p><p>Horrelako ibilbide batean ura, janaria, loa eta materiala nola planifikatu <a href="{L("guia")}">autosufizientzia gidan</a> azaltzen da.</p><p style="margin-top:var(--s4)">{CTA % L("preinscripcion")}</p>', "alt")
    write(L("ruta"), page("ruta", "Ibilbidea · Ultra Trail Larre® · 226,9 km Arabako lau aurpegietan zehar", "226,9 km eta 4.644 m-ko igoera positiboa dituen ibilbide zirkularra, Arabako lau aurpegietan zehar, etapa bakarrean eta autosufizientzian. Mapa, profila, datuak eta checkpointak.",
        "Ibilbidea", "226,9 km-ko<br>ibilbidea", "Ultra Trail Larre® non-stop ultra-trail bat da: Gasteizko Florida parkean hasi eta amaitzen den etapa bakarreko zirkuitua, Arabako lau aurpegietan zehar.", b, extra_js=True))

RULES = [("Hondakinik ez mendian.", "Zabor guztia korrikalariaren motxilan ateratzen da, hurrengo biztanle-gunera arte.", "Deskalifikazioa"),
 ("Ontzi berrerabilgarriak nahitaezkoak.", "Bidoiak edo soft flask-ak. Aldi bakarrerako botilak debekatuta daude irteerako materialean.", "Deskalifikazioa"),
 ("Gelak eta barrak: bilgarria motxilan.", "Sartzen den bilgarri bakoitzak atera egin behar du. Helmugan eta checkpointetan egiaztatzen da.", "Deskalifikazioa"),
 ("Off-track debekatuta.", "Ezin da trazaduratik atera, baimendutako desbideratzeetatik kanpo: ez argazki baterako, ez lasterbiderako, ez bibakerako.", "Deskalifikazioa"),
 ("Arrastorik gabeko bibaka.", "Mendian atseden hartzen baduzu, ez duzu seinalerik uzten. Suziririk ez. Ikusteko moduko hondakin organikorik ez.", "Deskalifikazioa"),
 ("Ekitaldira garraio publikoz iritsi.", "Trena autoaren gainetik sustatzen dugu.", "Konpromisoa"),
 ("Pack berrerabilgarria, aldi bakarrerako plastikorik gabe.", "Kotoi organikoa, FSC kartulina, ehun tekniko birziklatua. Blisterrik ez, banakako poltsarik ez.", "Ekoizpena"),
 ("Tracker-ak betiko alokairuan.", "Elektronika-parkea urtez urte alokatzen da. Ez ditugu GPS botagarriak erosten. Uhalak eta zorroak berrerabiltzen dira.", "Ekoizpena"),
 ("Helmugako janaria 0. km-tik.", "Gutxienez %70 bertako produktua, ibilbidetik 30 km baino gutxiagoko erradioan. Banakako ontzirik gabe.", "Ekoizpena"),
 ("Urteroko auditoria publikoa.", "Ekitaldiaren aztarnaren kalkulua eta argitalpena (garraioa, ekoizpena, logistika). Lehenik, benetako murrizketa neurtua, eta ondoren geratzen diren isurien kONpentsazio sinbolikoa Retree the Planet-en bidez.".replace("kONpentsazio", "konpentsazio"), "Gardentasuna")]
def p_reglamento():
    ess = dl([("Formatua", "226,9 km eta 4.644 m D+ dituen non-stop etapa bakarra."), ("Autosufizientzia", "Laguntzarik eta ohiko janari-posturik gabe: korrikalari bakoitzak behar duena berarekin darama."),
        ("Nabigazioa", "GPS track ofiziala nahitaezkoa, eta 6 checkpointetan zigilatzea."), ("Denbora-muga", "Irteeratik 50 ordu, kontrolaren itxierarekin 18:00etan."),
        ("Parte-hartzea", "300 plaza, aurrez-izenaren iristeko ordenan; aurrez-izenak nahitaezko deskribapen pertsonal labur bat dauka. Izen-emateak 2027ko urtarrilean."),
        ("Segurtasuna", "SOS botoia duen GPS tracker-a, kontrol-zentroa Gasteizen eta ultra-trailerako berariazko asegurua, erreskate-estaldurarekin (helikopteroa barne) eta nazioarteko erantzukizun zibilarekin."),
        ("Irudi-eskubideak", "Korrikalariak irudi-eskubideak lagatzen ditu ekitaldiaren erabilera editorial eta promozionalerako; zuzeneko erabilera komertzialak banakako idatzizko baimena behar du."),
        ("Nahitaezko materiala", "I. edizioko behin betiko araudiarekin batera argitaratuko da.")])
    rules = "".join(f'<li><span class="rt"><strong>{H(a)}</strong> {H(c)}</span><span class="tag mono">{H(t)}</span></li>' for a, c, t in RULES)
    b = f'<section><div class="wrap two"><div><h2 class="h2s">Oinarrizko arauak</h2>' + ess + f'<p class="note">Orain arte argitaratutako I. edizioko oinarrizko arauen laburpena. Zalantzak: <a href="mailto:ignacio@musubigara.org">ignacio@musubigara.org</a>.</p><p style="margin-top:var(--s4)"><a class="cta" style="margin-top:0" href="/araudia-ultratraillarre-2027.pdf" download>Deskargatu araudia · PDF</a></p><p style="margin-top:var(--s3)">Autosufizientzian korritzeak zer dakarren <a href="{L("guia")}">autosufizientzia gidan</a> dago. <a href="{L("preinscripcion")}">Aurrez-izena</a> 2026ko abenduaren 1ean irekiko da.</p></div>'
    b += '<div><h2 class="h2s">Zero Kodea · 10 arau</h2><p><strong class="acc">Ibilbidean ontzi bakar bat botatzeak berehalako deskalifikazioa dakar eta hurrengo edizioetan debekua. Apelaziorik gabeko arau bakarra da.</strong></p><ol class="rules">' + rules + '</ol></div></div></section>'
    write(L("reglamento"), page("reglamento", "Araudia · Ultra Trail Larre® · Oinarrizko arauak eta Zero Kodea", "Ultra Trail Larre®-ren I. edizioko oinarrizko arauak eta Zero Kodearen 10 arauak: autosufizientzia, hondakinik ez eta berehalako deskalifikazioa.",
        "Araudia", "Jokoaren<br>arauak", "I. edizioko araudiaren funtsezkoa, orri batean.", b, compact=True))

NOT = [("mendian janari-posturik beroak", "Autosufizientzia ez da ibilbidearen erdian zartagi bero bat. Edo zuk prestatzen duzu, edo jendearentzat irekita dagoen taberna batean erosten duzu."),
 ("irteerako arku puzgarria", "PVC, sorgailua, garraioa, hondakina. Irteera korrikalariak dauden lekuan dago, ez babesleen puzgarria dagoen lekuan."),
 ("musikarik edo aurkezlerik irteeran", "Hau ez da erromeria bat. Mendiak ez ditu bozgorailuak behar. Lehen urratsaren aurreko isiltasuna erritu horren parte da."),
 ("plastikozko dominarik edo serigrafia termosoldaturik", "Finisher domina metal solido birziklatuzkoa da, Euskal Herriko hornitzaile batek moztua. Pisatzen du, irauten du, oinordetzan uzten da. Ez da txapa bat."),
 ("diru-saririk lehenari", "Abiadurarentzat ez dago primarik. Finisher bakoitzak oparia bera jasotzen du. Lehenaren pribilegioa lehena izatea da, besterik ez."),
 ("poliesterrezko «opari» kamisetarik", "Mikroplastikoa garbitzean, bi urtera botatzen duzu. Larreren kamiseta kotoi organiko ziurtatuzkoa da, edizio bakoitzean eredu bakarrekoa. Zuk erosiko ez bazenu, ez dizugu ematen."),
 ("plazak handitzea «jendea kanpoan gelditzen bada»", "300 hirurehun dira. II. edizioan 300 izango dira. X. edizioan 300 izango dira. Zenbakia identitatea da, ez merkatuko parametro bat. Sartzen ez bazara, hurrengo urtean itzultzen zara."),
 ("herrietan hesirik, moketarik edo alfonbra gorririk", "Urte osoan bizi diren herrietatik pasatzen gara. Korrikalariaren igarotzea ikusgarria baina diskretua izan behar da. Plaza eta kaleetan azpiegitura iragankorrik ez.")]
TERR = [("Pack-a 4 funtsezkoetara murriztua", "Kotoi organikozko txanoa eta kamiseta (urteko eredu bakarra · bildumagarria), roadbook-brevet fusionatua FSC kartulinan, finisher domina metal birziklatuan. Dortsal teknikoa bereizita, elementu operatibo gisa. Aldi bakarrerako plastikorik ez, merchandising apaingarririk ez."),
 ("Bertako ekoizpena", "Pack-a Araban ekoiztua, ahal denean: serigrafia lokala, lurraldeko tailerretan josia, eta helmugarako ardoak eta kontserbak ibilbidetik 30 km baino gutxiagora dauden ekoizleengandik."),
 ("Tracker berrerabilgarriak", "Urtez urte alokatutako GPS gailuak, ez fungigarriak. Zorroak eta uhalak berrerabiliak. Ekitaldiko elektronika guztia alokairu-zirkuituan kudeatzen da, ez erosketan."),
 ("Mugikortasun garbia", "Komunikazio etengabea trena autoaren gainetik sustatzeko. Staff-aren ibilgailu partekatuak eta, ahal denean, elektrikoak."),
 ("Karbono-aztarna", "Ekitaldiaren isurien urteko kalkulua (garraioa, ekoizpena, staff-aren ostatua) eta konpentsazioa Retree the Planet-ekin birpopulatuz eta HAZIren / Foru Aldundiaren proiektuekin bertako landaketa eginez."),
 ("Iraunkortasuna, lehenik", "Packeko material bakoitza urteak irauteko diseinatua dago, ez orduak. Txanoak 2032an erabiltzen jarraitu behar du. Roadbook-brevet-a markoan jarri behar da, ez bota. Kotoi organikozko kamiseta —edizio bakoitzean eredu bakarra— bildumako objektu bihurtzen da: Larre errepikatzen duenak urtero pieza ezberdin bat metatzen du. Ekitaldi-kitaren aurkakoa da.")]
def p_filosofia():
    b = sec('''<h2 class="h2s" id="etimologia">Etimologia</h2><p class="mono">larre [ ˈla.re ] · euskara · izena</p>
<p>Zentzurik literalenean, <em>larre</em>k mendiko belardia eta bazkalekua izendatzen ditu: lantzen ez den lur zabala, abereak askatasunean bazkatzen dutena. Baina baita mendi irekia eta bide markaturik gabeko lekua ere —hedaduraz, lur basati eta latz oro— eta, zentzu figuratuan, menperatu gabea: oraindik guztiona eta inorena ez dena.</p>
<p>Silaba bakarrean, hitzak Arabako mapa osoa biltzen du: Izkiko Natur Parkeko pagadiak eta Valderejoko Natur Parkeko harizti-basoak; Toloño mendilerroaren azpiko Arabako Errioxako mahasti-sestrak; Okinako lur kareharria eta arroilak; Arabako Lautadako labore-lautada; Entziako mendilerroko artzain-bide garaiak; eta Ullibarri-Ganboako urtegi handia, lurraldearen barne-ispilua.</p>
<p>Aukeratutako izenak Arabako artzain-kultura gogorarazten du: mendeetan zehar Arabako lau aurpegiak urtaro-mugimendu bakar batean josi zituzten artaldeak, basoa, mahastia, mendilerroa eta lautada zeharkatuz. Larre bidaia bera da, orain <strong>oinez</strong>.</p>''')
    b += sec('''<h2 class="h2s" id="manifestua">Manifestua</h2>
<p>Gasteiztik irten eta hegoalderantz abiatzen gara, Urizaharrera eta Biasteriko mahastietara iristeko, Toloño mendilerroaren azpian, Ebro haranaren aurrean eta Errioxako lehen lurren parean.</p>
<p>Arabako Errioxako herriak zeharkatzen ditugu, Santikurutze Kanpezurantz igotzen gara eta Entziako mendilerrora igotzen gara, non oraindik bazkatzen duten Arabako azken artzain trashumanteen artaldeek, Agurainetik Gasteizera itzuli aurretik.</p>
<p class="big">226,9 km, Arabako lau aurpegiak lerro bakar batean josten dituztenak.</p>
<p>Basoa, mahastia, mendilerroa eta lautada. Laguntzarik gabe, ohiko janari-posturik gabe, nahitaezko atsedenik gabe. GPS track batekin, brevet card batekin eta <strong>mendia pausoz pauso irabazten dela</strong> jakitearekin.</p>
<ul class="premisas mono"><li>Autosufizientzia osoa</li><li>Ohiko janari-posturik ez</li><li>Hondakinik ez mendian</li><li>GPS tracker-a nahitaezkoa</li><li>Roadbook-brevet fusionatua</li><li>Nahitaezko materiala berrikusia</li><li>Egilearen ekoizpen ikus-entzunezkoa</li><li>Komunitate txikia eta zorrotza</li><li>Material iraunkorrak · ekitaldi-kitik ez</li><li>Lurraldearekiko errespetu absolutua</li></ul>''', "alt")
    b += sec('''<h2 class="h2s" id="lasterketa-al-da">Lasterketa al da?</h2><p class="big">Ez.</p>
<p>Batzuek hala hartuko duten arren, Larre <strong>erronka pertsonal</strong> bat da. Askorentzat, erronka amaitzea besterik ez da izango.</p>
<p>Iristeko ordenaren araberako azken sailkapena egongo da. Baina ultraziklismoaren, bikepacking-aren eta autosufizientziako ibilbide handien tradizioei jarraituz, ez da sarik egongo parte-hartzaile azkarrenarentzat, lehena iristearen ohorea ez bada.</p>
<p>Hemen ez dira abiaduragatiko garaikurrak banatzen. Bertan egon izanaren pribilegioa banatzen da.</p>
<p>Autosufizientziaren kulturak badaki garaipena ez dela ondokoa gainditzea, baizik eta 226,9 kilometro mendian erritmoa eusten, inork ez dizula ura, afaria edo loa konpontzen. Hori da axola duen lehia bakarra.</p>''')
    zero = ["Inolako bilgarririk, inolako pegatinarik, inolako gelik, inolako zinta-zatirik ez. Korrikalariarekin mendira sartzen dena, korrikalariarekin ateratzen da mendi hartatik.",
        "Ez da leloa. Izena emateko baldintza da. Brevet card bakoitzak briefing-ean sinatutako zero hondakin protokolo bat darama. Ibilbidean ontzi bakar bat botatzeak —argazkiz, antolatzaileak, boluntarioak, beste korrikalari batek edo scouting kamerak dokumentatuta— <strong>berehalako deskalifikazioa eta hurrengo edizioetan debekua</strong> dakar. Ñabardurarik gabe, aurretiko ohartarazpenik gabe, bigarren aukerarik gabe.",
        "Gogortasun hori nahita da. Horrela bakarrik eraikitzen da Toloño eta Entzia zeharkatzeko pribilegioa ulertzen duen komunitate bat. Dagoeneko autosufizientzian korritzen duten korrikalari gehienek modu naturalean bizi dute; guk idatzi egiten dugu, inor jakin gabe ager ez dadin.",
        "Bigarren ardatza materiaren iraunkortasuna da. Objektu gutxi ekoizten ditugu, urteak irauteko egiten ditugu, eta bakoitza diseinatzen dugu nola botako den baino lehen nola konponduko den pentsatuz. I. edizioko txanoak 2032an erabiltzen jarraitu behar du. Brevet card-a ez da papera: markoan jartzeko pentsatutako FSC kartulina da. Dortsala josturaz indartutako ehun teknikoa da, ez goiz bat irauten duen tyvek zati bat.",
        "Ekoizten dugunik jasangarriena ekoizten ez duguna da. Urtero pack osoa berrikusten dugu eta ezer ematen ez duena kentzen dugu. Ez dugu oparirik egiten opari egiteagatik. Kamiseta bat urte honetan izango duzun kamiseta onena ez bada, ez dizugu ematen."]
    b += sec('<h2 class="h2s" id="zero-kodea">Zero Kodea</h2><p class="big">Mendian uzten dugun arrasto bakarra oinatza da.</p>' + "".join(f"<p>{x}</p>" for x in zero) + f'<p><a href="{L("reglamento")}">Zero Kodearen 10 arauak →</a></p>', "alt")
    nh = "".join(f'<li><span class="num">/ {i+1:02d}</span><div><h3>Ez {H(a)}</h3><p>{H(c)}</p></div></li>' for i, (a, c) in enumerate(NOT))
    b += sec('<h2 class="h2s" id="ez-dugu-egiten">BAI esan baino askoz lehenago, EZ esaten dugu</h2><p>Larre definitzen duen ia guztia egingo ez ditugun gauzen zerrenda bat da. Orri honetako EZ bakoitza erabaki kontziente bat da: trail-merkatuaren inertziak egitera bultzatuko gintuzkeen zerbait, proiektuarekin bateraezintzat jota baztertu duguna.</p><p>EZ esatea da axola duena babesteko modu bakarra. Zerrenda hau ez da zehatza ez behin betikoa: urtero hazten da, probari zer higatzen dion eta zerk eusten dion ikasten dugun heinean.</p><ul class="nolist">' + nh + '</ul><p>Zerrenda hau urtero hazi egingo da. Gaur hartzen dugun erabaki bat proiektuarekin bateraezina bada, hurrengo urtean EZ DUGU zerrendan sartzen da eta bertan gelditzen da. Hobetzeko bide zintzo bakarra da: defendatzen duguna ez ezik, baztertzen duguna ere dokumentatzea.</p>')
    tr = "".join(f'<li><span class="num">{chr(65+i)}</span><div><h3>{H(a)}</h3><p>{H(c)}</p></div></li>' for i, (a, c) in enumerate(TERR))
    b += sec('<h2 class="h2s" id="lurraldea">Lurraldea · inpaktu zero, zintzo</h2><p>Larreren jasangarritasuna ez da web-orri bateko zigilu bat: proiektuaren fase bakoitzeko erabaki teknikoen sorta bat da. Greenwashing-ik eta marketin berderik ez: benetako murrizketa neurtua eta saihetsezinaren konpentsazio sinbolikoa, Retree the Planet-en bidez.</p><ul class="nolist">' + tr + '</ul>', "alt")
    write(L("filosofia"), page("filosofia", "Filosofia · Ultra Trail Larre® · Etimologia, manifestua eta Zero Kodea", "Zer esan nahi duen «larre»k, Ultra Trail Larre®-ren manifestua, zergatik ez den lasterketa, Zero Kodea eta egingo ez dugun guztia.",
        "Filosofia", "Zer da<br>Larre", "Etimologia, manifestua eta inoiz egingo ez ditugun gauzen zerrenda.", b))

def p_llegar():
    f = dl([("Lekua", "Florida parkea"), ("Hiria", "Gasteiz, Araba (Euskadi)"), ("Irteera", "16:00 · 2027ko udazkena (I. edizioa; data zehatza geroago iragarriko da)"), ("Helmuga", "Parke bera, irteeratik 50 ordura arte")])
    b = sec('<h2 class="h2s">Irteera eta helmuga</h2>' + f + '<p style="margin-top:var(--s4)"><a class="cta" href="https://www.google.com/maps/search/?api=1&amp;query=Parque+de+la+Florida+Vitoria-Gasteiz" target="_blank" rel="noopener">Ikusi Florida parkea Google Maps-en</a></p>')
    b += sec(f'<h2 class="h2s">Gasteizera nola iritsi</h2><p><strong>Trenez edo autobusez:</strong> hiriak tren-geltokia eta autobus-geltokia ditu, biak erdigunetik minutu gutxira.</p><p><strong>Hegazkinez:</strong> Gasteizek aireportu propioa du (Foronda). Bilboko aireportua errepidez ordu bat baino piska bat gehiagora dago.</p><p><strong>Autoz:</strong> hiria autobidez ondo komunikatuta dago Bilborekin, Donostiarekin, Iruñearekin eta Burgosekin.</p><p>Trena autoaren gainetik sustatzen dugu: <a href="{L("reglamento")}">Zero Kodearen</a> arauetako bat da.</p>', "alt")
    b += sec('<h2 class="h2s">Logistika-zalantzarik?</h2><p>Idatzi <a href="mailto:ignacio@musubigara.org">ignacio@musubigara.org</a> helbidera edo <a href="https://wa.me/34620463558?text=Kaixo%20Ignacio%2C%20Ultra%20Trail%20Larreri%20buruz%20hitz%20egin%20nahi%20dut" target="_blank" rel="noopener">WhatsApp</a> bidez.</p>')
    write(L("como-llegar"), page("como-llegar", "Nola iritsi · Ultra Trail Larre® · Florida parkea, Gasteiz", "Ultra Trail Larre®-ren irteerara nola iritsi: Florida parkea, Gasteizen, trenez, autobusez, hegazkinez edo autoz.",
        "Nola iritsi", "Irteerara<br>nola iritsi", "Ultra Trail Larre® leku berean hasi eta amaitzen da: Florida parkea, Gasteizen erdian, Euskadiko hiriburuan.", b))

GUIDE = '''<h2>Zer da autosufizientziako ultra-trail bat</h2>
<p>Autosufizientziako ultra-trail bat korrikalari bakoitzak behar duen guztia berarekin daraman lasterketa da. Ez dago hamabost kilometrotik behingo janari-posturik, ez dago bizi-bolsarik, ez dago gailurrean zain dagoen talde-autorik. Checkpointak badaude, bai, baina kontrol- eta zigilatze-puntuak dira: zu hortik pasatu zarela berresten dute, ez dizute jaten ematen.</p>
<p>Ohiko ultra batekiko aldea ez da logistika soilik. Erabakitzen duzuna aldatzen da. Laguntzadun ultra batean, erabaki garrantzitsua erritmoa da. Autosufizientzian, erabaki garrantzitsua baliabideen kudeaketa da: zenbat pisu daramazun, non berrizten duzun ura, noiz jaten duzun, noiz lo egiten duzun. Ia inork ez du horrelako lasterketa bat uzten hankarik ezagatik; uzten du ura, janaria edo hotza gaizki kalkulatu duelako.</p>
<div class="tablew"><table>
<thead><tr><th>Alderdia</th><th>Laguntzadun ultra</th><th>Autosufizientzia</th></tr></thead>
<tbody>
<tr><td>Janari-postuak</td><td>10–20 km-ro</td><td>Bat ere ez</td></tr>
<tr><td>Bizi-bolsa</td><td>Ohikoa</td><td>Ez da existitzen</td></tr>
<tr><td>Kanpoko laguntza</td><td>Markatutako guneetan baimenduta</td><td>Debekatuta</td></tr>
<tr><td>Motxilaren pisua</td><td>1–3 kg</td><td>3–6 kg</td></tr>
<tr><td>Erabaki kritikoa</td><td>Erritmoa</td><td>Baliabideak</td></tr>
</tbody></table></div>
<h2>Ura da lehen arazoa</h2>
<p>Urak kilo bat pisatzen du litroko eta ezin da guztia eraman. Horregatik planifikazioa ez da kilometroka egiten, ur-puntu fidagarrien arteko tarteka baizik: herriko iturriak, tabernak, hilerriak, kiroldegiak. Irten aurretik mapan markatzen dira, bat lehor edo gauez itxita badago alternatiba batekin.</p>
<p>Erreferentzia gisa, mendi ertaineko lurzoruan 400–500 ml edaten dira orduko tenperatura leunean, eta 600–800 ml orduko beroarekin. Bost orduko tartea duten bi punturen artean, bi litro baino gehiago dira. Ur-iragazki batek edo pastila potabilizatzaileek oso gutxi pisatzen dute eta edozein erreka aukera bihurtzen dute; abereentzako askak, ez.</p>
<p>Udazkenean, Arabako mendilerroetan, tranpa guztiek espero dutenaren aurkakoa da: freskoa egiten du, uste baino gutxiago edaten da eta deshidratatuta iristen da, inoiz beroa pasatu gabe.</p>
<h2>Janaria: orduka kalkulatu, ez kilometroka</h2>
<p>Lasterketa luzeetan korrikalari gehienek orduko 200 eta 300 kcal artean eusten dute, eta ia inoiz ez gehiago. Berrogei edo berrogeita hamar ordu iraun dezakeen proba batean, mila asko kaloria dira: motxila arrazoizko batean sartzen direnak baino gehiago. Horregatik galdera ez da «zenbat janari eramaten dut», baizik «zenbat janari daramat gainean eta nondik datorren gainerakoa».</p>
<p>Funtzionatzen duena: gozoa eta gazia txandakatzea urdailak itxi aurretik, solidoa likidoarekin konbinatzea, goizalderako zerbait beroa edo gazia eramatea eta goragalearekin ere sartzen zaizkizula dakizun bi edo hiru aukera izatea. Funtzionatzen ez duena: entrenamendu luzeetan probatu ez duzun gel, barra edo zaporea lasterketan estreinatzea.</p>
<p>Lasterketa bakoitzak bere araudian zehazten du ibilbideko dendetan erosi daitekeen edo iturri publikoetan berritu daitekeen, eta horrek janari-plana erabat aldatzen du. Irakurri behar den lehenengo gauza da. Ultra Trail Larre-n funtsezkoa <a href="/eu/araudia/">araudian</a> laburbilduta dago.</p>
<h2>Lo egin, edo ez lo egin</h2>
<p>Berrogeita hamar orduko denbora-muga duen proba batek bi gau zeharkatzen ditu. Korrikalari gehienentzat, berrogei ordu eta gehiagoz batere lo ez egiteak bigarren goizaldera haluzinazioekin, desorientazioarekin eta erabakiek axola duten lurzoruan erabaki txarrekin iristea esan nahi du.</p>
<p>Benetan erabiltzen diren hiru estrategiak: lo ez egitea (entrenamenduan probatu baduzu bakarrik eta zure buruak nola erantzuten duen badakizu), hamar eta hogei minutuko mikro-loak lehen jaitsiera larria agertzen denean, edo aldez aurretik erabakitako puntu batean ordu bat edo bi orduko geldialdi planifikatua. Funtzionatzearen eta ez funtzionatzearen arteko aldea irten aurretik erabakita edukitzea da, ez goizaldeko lauretan lubaki batean etzanda.</p>
<h2>Benetan axola duen materiala</h2>
<p>Antolakuntza bakoitzak eskatzen duenaz haratago, autosufizientzian eztabaidatzen ez den nukleo bat dago:</p>
<ul>
<li>Autonomia ona duen frontala eta pila-joko bat edo bateria ordezkoa. Bi gauak argi-ordu asko dira.</li>
<li>Kapusaina duen xaketa ur-iragazgaitza eta geruza termiko lehor bat, gauerako edo geldialdi baterako gordea.</li>
<li>Mugikorra kargatuta, kanpo-bateria eta kableak. Mapa, larrialdi-telefonoa eta erreserbako linterna da.</li>
<li>1,5–2 litroko ur-edukiera, gehi iragazkia edo pastilak.</li>
<li>Biziraupen-manta eta txistua. Ezer ez pisatzen dute eta laguntza iritsi bitartean bizirik mantentzen zaituztenak dira.</li>
<li>Oinetarako gutxieneko kita: esparatrapua, guraizeak, orratza, orbainetarako zerbait. Orbain gaizki sendatuak aldapa batek baino jende gehiago erretiratzen du.</li>
<li>Eskularruak eta txanoa edo lepoko. Gailurrean goizaldeko hotzak ez du irteerakoarekin zerikusirik.</li>
</ul>
<p>Ultra Trail Larre-ren nahitaezko materialaren zerrenda I. edizioko behin betiko araudiarekin batera argitaratuko da. Prest dagoenean, bere orria izango du eta <a href="https://www.instagram.com/ultratraillarre/" target="_blank" rel="noopener">@ultratraillarre</a> kontuan iragarriko da.</p>
<h2>GPS trackarekin nabigatu</h2>
<p>Autosufizientziako lasterketetan ibilbidea ez da zintekin markatzen: GPS track ofizial bat jarraitzen da. Horrek esan nahi du nabigazioa probaren parte dela eta aldapa bat entrenatzen den bezala entrenatzen dela.</p>
<p>Praktikan: trackak erlojuan eta mugikorrean kargatu, inguruko mapak estaldurarik gabe erabiltzeko deskargatuta; checkpointak interes-puntu gisa markatu; erlojuak trazaduratik atera zarela abisatzen duenean zer egin jakin (gelditu, azken puntu segururaino atzera egin, gauez lasterbide inprobisaturik ez); eta ez baterai bakar baten mende egon non zauden esaten dizun gauza bakarrarentzat.</p>
<h2>Hondakinik ez: nola korritu ezer utzi gabe</h2>
<p>Ultra Trail Larre-n ontzi bakar bat botatzeak berehalako deskalifikazioa dakar, eta apelaziorik onartzen ez duen araudiko arau bakarra da. Praktikan hiru keinutan ebazten da: zabor-poltsa propioa poltsiko finko batean, beti berean; gelen eta barren bilgarriaren zati guztiak lotuta edo gordeta irekitzen duzun unean, inoiz ez «gero»; eta ahal dena poltsa berrerabilgarrietara pasatzea irten aurretik, hasieratik bilgarri gutxiago eramateko.</p>
<h2>Nola prestatu 200 km-ko distantzia</h2>
<p>Urtebete aurretik dagoenean, prestakuntza hiru blokeetan antolatzen da. Ez da entrenamendu-plan pertsonalizatu bat —hori zure historiaren eta, osasun-zalantzak badaude, profesional baten mende dago—, baina helmugara iristen direnen ia guztiek partekatzen duten egitura da.</p>
<ul>
<li><strong>Oinarria · 1. eta 4. hilabeteen artean</strong>Bolumena eta metatutako desnibela, erritmo erosoan. Denbora asko zutik, intentsitate gutxi. Hemen ordu asko eusteko gaitasuna eraikitzen da, ez abiadura.</li>
<li><strong>Espezifikoa · 5. eta 8. hilabeteen artean</strong>Irteera luzeak back-to-back (larunbata eta igandea jarraian), gutxienez bi gaueko irteera osoak, eta guztia motxila lasterketako benetako pisuarekin kargatuta. Urdaila entrenatzen da probaren egunean jango duzuna martxan janez.</li>
<li><strong>Finketa · 9. eta 10. hilabeteen artean</strong>12 eta 24 ordu arteko simulazio luze bat behin betiko materialarekin, janari- eta oinetako-proba finala, eta gero benetako atsedena. Une honetan probatu gabe dagoena ez da lasterketan estreinatzen.</li>
</ul>
<p>Bi saio ez dira negoziagarriak: gauez korritzea, hainbat orduz, garbi ez ikustea normala izan arte; eta bi egun luze jarraian lotzea, gorputzak nola erantzuten duen jakiteko hankak dagoeneko kargatuta hasten denean. Eta ia inork entrenatzen ez dituen bi zati daude, lasterketak erabakitzen dituztenak: urdaila eta oinak.</p>
<h2>Errepikatzen diren hamar akats</h2>
<ul>
<li>Lehen lau orduetan azkarregi irtetea, motxilak oraindik ez duelako pisurik.</li>
<li>Materiala, oinetakoak edo elikadura lasterketa-egunean estreinatzea.</li>
<li>Ura kilometroka kalkulatzea, eta ez puntu fidagarrien arteko denboraren arabera.</li>
<li>Lo egiteko planik ez edukitzea eta goizaldean erabakitzea, irizpiderik gabe.</li>
<li>Frontal bakarra eramatea, edo erdi gastatutako pila ordezkoak.</li>
<li>Goragalea agertu bezain pronto jateari uztea, ehundura edo zaporea aldatu beharrean.</li>
<li>Oineko lehen eragozpena ez sendatzea, hamar minutu ez galtzeko.</li>
<li>GPSarentzat baterai bakar baten mende egotea.</li>
<li>Janzki epel minimoarekin joatea, irteeran eguraldi ona zegoelako.</li>
<li>Araudia aurreko astera arte irakurri gabe edukitzea.</li>
</ul>
<h2>Horrek zer esan nahi du Ultra Trail Larre-n</h2>
<dl class="ficha"><div><dt>Distantzia eta desnibela</dt><dd>226,9 km · 4.644 m D+</dd></div><div><dt>Formatua</dt><dd>Etapa bakarra, non-stop, zirkularra, autosufizientzian</dd></div><div><dt>Denbora-muga</dt><dd>50 ordu</dd></div><div><dt>Irteera-ordua</dt><dd>16:00</dd></div><div><dt>Zigilatze-checkpointak</dt><dd>6, brevet-arekin</dd></div><div><dt>GPS track ofiziala</dt><dd>Irteera baino 30 egun lehenago ematen da</dd></div><div><dt>Segurtasuna</dt><dd>SOS botoia duen GPS tracker-a eta kontrol-zentroa Gasteizen</dd></div></dl>
<p>16:00etako irteera ez da xehetasun estetiko bat: gauean goiz sartzen da, hankak oso-osorik eta ibilbide ia guztia aurretik dagoela. Gauez entrenatu duenak eskertzen du hor. Trazadura osoa <a href="/eu/ibilbidea/">ibilbidearen</a> orrian dago.</p>
<h2>Ohiko galderak</h2>
<h3>200 km-ko ultra bat korri daiteke aurretik 100 bat egin gabe?</h3>
<p>Daiteke, baina helmugara iristeko probabilitatea asko jaisten da. 100 km-ko edo 24 orduko proba batek ematen duena ez dira kilometroak: gau bat korrika pasatu izana da, jaitsiera larri bat kudeatu izana eta zure urdailak hogeigarren orduan zer jaten duen jakitea. Aurretik ultra luzerik ez badago, zentzuzkoena antzeko lurzoruan 15 eta 24 ordu arteko irteera propioak egitea da.</p>
<h3>Zenbat pisatu behar du motxilak?</h3>
<p>Benetako autosufizientzian, hiru eta sei kilo artean urarekin, klimaren eta lo-estrategiaren arabera. Hiru azpitik, normalean zerbait garrantzitsua falta dela esan nahi du; sei gainetik, beldurra pisu moduan eramaten dela.</p>
<h3>Zer gertatzen da ibilbidearen erdian erretiratzea erabakitzen badut?</h3>
<p>Autosufizientziako lasterketa batean erretiratzea beti jakinarazten zaio antolakuntzari, inoiz ez da isilean uzten: jakin arte, kontrol-zentroarentzat mendian jarraitzen duzu. Ultra Trail Larre-ren prozedura zehatza —jasotze-puntuak eta telefonoa— behin betiko araudiaren eta aurreko eguneko nahitaezko briefing-aren parte izango da.</p>
<h3>Ultra Trail Larre autosufizientziako lehen lasterketa egokia da?</h3>
<p>Zintzotasunez, ez. Bigarren edo hirugarren urrats ona da. Formatuan hasteko, zentzuzkoagoa da laguntzarik gabeko 50 eta 100 km arteko proba bat, edo bi eguneko ibilbide propio bat. Ultra Trail Larre-k bai da autosufizientzia kartelaren apaingarri ez den lekua: 226,9 km, hondakinik ez eta zu, mendia eta zure brevet-a dauden track bat.</p>
<h2>Plazak</h2>
<p>I. edizioak 300 dortsal ditu eta aurrez-izenaren iristeko ordenan esleitzen dira; aurrez-izenak nahitaezko deskribapen pertsonal labur bat dauka. Izen-emateak 2027ko urtarrilean irekiko dira. Lehen egunean abisatzea nahi baduzu, utzi zure datuak <a href="/eu/aurrez-izena-eman/">aurrez-izenen zerrendan</a>.</p>
'''
def p_guia():
    b = f'<section><div class="wrap prose">{GUIDE}<p style="margin-top:var(--s4)">{CTA % L("preinscripcion")}</p></div></section>'
    write(L("guia"), page("guia", "Autosufizientzia gida · Nola prestatu 200 km-ko ultra-trail bat", "Laguntzarik gabe ultra-trail bat korritzeak zer esan nahi duen: ura, janaria, loa, materiala, GPS bidezko nabigazioa eta 200 km-ko distantzia nola prestatu.",
        "Autosufizientzia gida", "Autosufizientzian<br>korritu", "Laguntzarik gabe ultra-trail bat korritzeak zer esan nahi duen, zenbat ur eta janari behar den, noiz lo egin eta 200 km-ko distantzia nola prestatzen den.", b))

def p_galeria():
    li = "".join(f'<li><figure><a href="/fotos/{f}.webp"><img src="/fotos/{f}-400.webp" width="400" height="400" loading="lazy" decoding="async" alt="{H(c)}"></a><figcaption><strong class="ft">{H(t)}</strong>{H(c)}</figcaption></figure></li>' for f, t, c in gallery.titled('eu'))
    b = f'<section><div class="wrap"><ul class="grid4">{li}</ul><p style="margin-top:var(--s4)">Gehiago Instagrameko <a href="https://www.instagram.com/ultratraillarre/" target="_blank" rel="noopener">@ultratraillarre</a> kontuan.</p></div></section>'
    write(L("galeria"), page("galeria", "Argazkiak · Ultra Trail Larre® · Lurretik", "Ezagutza-irteeretako, ibilbideko tarteetako eta mendiaren argazkiak, mendia den bezala, @ultratraillarre kontuan argitaratuak.",
        "Argazkiak", "Lurretik", "@ultratraillarre kontuan argitaratutako azkena: ezagutza-irteerak, ibilbideko tarteak eta mendia den bezala.", b))

if __name__ == "__main__":
    for f in (p_ruta, p_reglamento, p_filosofia, p_llegar, p_guia, p_galeria): f()
    print("páginas EU generadas")
