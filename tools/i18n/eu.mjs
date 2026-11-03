/* Euskarazko edukia. Datu ofizialak soilik (tools/data/hechos.json).
 * LEHEN IRAKURKETA TEKNIKOA: Ignaciok berrikusi beharra dauka argitaratu aurretik. */
export default {
  lang: 'eu',
  locale: 'eu_ES',
  label: 'Euskara',
  paths: { home: '/eu/', aviso: '/eu/lege-oharra/', priv: '/eu/pribatutasun-politika/' },
  meta: {
    title: 'Ultra Trail Larre® · Autohornikuntzako ultra-trail-a, Araba 2027',
    description: 'Autohornikuntzako ultra-trail-a Arabako mendilerroetan: 227,5 km eta +5.293 m, Gasteizen hasi eta bukatzen den begizta. 300 plaza. I. edizioa, 2027ko udazkena.',
    ogLine: 'Autohornikuntzako ultra-trail-a · Araba · 2027ko udazkena',
    ogAlt: 'Ultra Trail Larre®: autohornikuntzako ultra-trail-a Arabako mendilerroetan, 2027ko udazkena'
  },
  ui: {
    skip: 'Eduki nagusira saltatu',
    home: 'Ultra Trail Larre®, hasiera',
    menu: 'Menua',
    menuOpen: 'Menua ireki',
    menuClose: 'Menua itxi',
    langNav: 'Hizkuntza',
    index: 'Ataleen aurkibidea',
    close: 'Itxi',
    prev: 'Aurreko argazkia',
    next: 'Hurrengo argazkia',
    viewPost: 'Instagramen ikusi',
    followIg: 'Instagramen jarraitu',
    copy: 'Kodea kopiatu',
    copied: 'Kodea kopiatu da',
    new: 'fitxa berri batean irekitzen da',
    download: 'Deskargatu',
    footerOrg: 'Antolatzailea:',
    legal: 'Lege-oharra',
    privacy: 'Pribatutasun-politika',
    rights: 'Eskubide guztiak erreserbatuta.',
    back: 'Webgunera itzuli'
  },
  nav: [
    ['la-carrera', 'Lasterketa'],
    ['ruta', 'Ibilbidea'],
    ['instagram', 'Instagram'],
    ['preinscripcion', 'Aurre-izen-ematea'],
    ['descargas', 'Deskargak'],
    ['faq', 'Maiz egindako galderak'],
    ['colabora', 'Lagun gaitzazu'],
    ['contacto', 'Harremana']
  ],
  hero: {
    eyebrow: 'I. edizioa · 2027ko udazkena',
    claim: 'Zu bakarrik, tracker bat eta zure brevet-a.',
    sub: 'Autohornikuntzako ultra-trail-a Arabako mendilerroetan. Gasteizen hasi eta bukatzen den 227,5 km-ko begizta.',
    cta: 'Aurre-izena eman',
    cta2: 'Ikusi ibilbidea',
    facts: [
      ['227,5', 'km begizta batean'],
      ['+5.293', 'm-ko desnibel positiboa'],
      ['300', 'plaza'],
      ['La Florida', 'irteera eta helmuga, Gasteiz']
    ]
  },
  race: {
    h2: 'Lasterketa',
    lead: 'Irteera bat, helmuga bat eta Arabako mendilerroak tartean. Bien artean gertatzen dena zuk ebazten duzu.',
    blocks: [
      ['Autohornikuntza', 'Ultra Trail Larre® autohornikuntzako ultra-trail-a da: kanpoko laguntzarik gabe eta antolakuntzaren hornidura-postuak gabe. Zuk erabakitzen duzu zer eramango duzun, noiz jango duzun, noiz egingo duzun lo eta urarekin nola moldatuko zaren. Espedizio bat bezala prestatzen da, ez zirkuitu bat bezala.'],
      ['Zu bakarrik, tracker bat eta zure brevet-a', 'Tracker batek jarraituko zaitu lasterketa osoan zehar, eta brevet-ak kontrol-guneetatik egindako igarobidea jasoko du. Nabigazioa probaren parte da.'],
      ['Filosofia', 'Ez da jendetza handiko lasterketa bat, eta ez du izan nahi. 300 plaza dira, eta zifra hori nortasuna da, ez merkatu-parametro bat. Askorentzat erronka, besterik gabe, helmugara iristea izango da.'],
      ['Hondakin zero', 'Zurekin mendira sartzen dena, zurekin aterako da mendi-gainetik. Uzten dugun aztarna bakarra urratsarena da.'],
      ['Mendia', 'Urte osoan bizirik dauden Arabako mendilerro, herri eta mahastiak zeharkatuko ditugu. Errespetuz eta aztarnarik utzi gabe igaroko gara: hori da itzultzeko baldintza.']
    ],
    forYouH: 'Zuretzat al da?',
    forYou: 'Ultra Trail Larre® ez da hasiberrientzako lasterketa bat. Distantzia luzeko aurretiko esperientzia eskatzen du, goizaldean burua hotz mantentzea eta hondakin zeroko araua onartzea. Horrek uko egitea baino pribilegio bat dela iruditzen bazaizu, hau da zure lasterketa.'
  },
  route: {
    h2: 'Ibilbidea',
    lead: '227,5 km eta +5.293 m-ko begizta, Gasteizko La Florida parkeko kioskotik hasi eta bertan bukatzen dena.',
    figs: [
      ['Distantzia', '227,5 km'],
      ['Desnibel positiboa', '+5.293 m'],
      ['Irteera eta helmuga', 'La Florida parkea'],
      ['Kontrol-guneak', '6 (4 baieztatuta)']
    ],
    mapTitle: 'Ibilbidearen mapa',
    mapAlt: '227,5 km-ko begiztaren mapa eskematikoa: irteera eta helmuga Gasteizko La Florida parkean, eta baieztatutako lau kontrol-guneak: Urizaharra, Biasteri, Santikurutze Kanpezu eta Agurain.',
    startLabel: 'Irteera eta helmuga',
    profileTitle: 'Altitude-profila',
    profileSub: 'Kilometro bakoitzeko zutabe bat, trackaren arabera. Punturik baxuenetik, {min} m, altuenera, {max} m.',
    profileAlt: 'Ibilbidearen altitude-profila, kilometro bakoitzeko zutabe bat, {min} eta {max} metro artean.',
    kmAxis: 'km',
    ctrlTitle: 'Baieztatutako kontrol-guneak',
    ctrlHead: ['Kontrol-gunea', 'Km gutxi gorabehera trackean'],
    ctrlNote: 'Guztira sei kontrol-gune daude: lau hauek baieztatuta daude, eta beste biak oraindik zehazteke. Kilometroak gutxi gorabeherakoak dira eta argitaratutako trackaren norabidea jarraitzen dute.',
    towns: { penacerrada: 'Urizaharra (Peñacerrada)', laguardia: 'Biasteri (Laguardia)', campezo: 'Santikurutze Kanpezu', agurain: 'Agurain' },
    gpx: 'Trackaren deskarga (GPX)',
    mapsStart: 'Irteerara nola iritsi'
  },
  ig: {
    h2: 'Instagram',
    lead: 'Mendi gainetik. @ultratraillarre-ren azken argitalpenak.',
    gallery: 'Instagrameko argazki-galeria',
    open: 'Handitu {n}. argazkia, {total} artean',
    dialog: 'Argazki-ikuskatzailea',
    counter: '{n}. argazkia, {total} artean'
  },
  pre: {
    h2: 'Aurre-izen-ematea',
    lead: '300 plaza, aurre-izen-emateak iritsi diren hurrenkeran esleituak.',
    points: [
      'Aurre-izena emandakoen zerrenda <strong>2026ko abenduaren 1ean</strong> irekiko da.',
      'Azalpen pertsonal labur bat sartu behar da, derrigorrez: aurre-izen-ematea balioztatzeko balio du, ez iragazteko.',
      'Ez dago dortsalik erreserbatzerik, ezta motibazio-gutunik ere.',
      '<strong>Aurre-izen-emateak ez du plazarik bermatzen.</strong> Erreferentzia-kode bat jasoko duzu, eta ordainketa-data martxoan jakinaraziko dizugu posta elektronikoz.',
      'Une honetan ez dugu NANik eskatzen; plaza berretsi behar duzunean eskatuko dugu.'
    ],
    closedTitle: 'Oraindik ez dago irekita',
    closedText: 'Aurre-izen-ematea 2026ko abenduaren 1ean irekiko da. Egun hori iristen denean, hemen bertan bete ahal izango duzu inprimakia.',
    unavailable: 'Ezin izan dugu egiaztatu aurre-izen-ematea irekita dagoen. Kargatu berriro orria edo idatzi iezaguzu {email} helbidera.',
    form: {
      legend: 'Zure datuak',
      nombre: 'Izena',
      apellidos: 'Abizenak',
      edad: 'Adina',
      sexo: 'Sexua',
      sexoOpts: [['mujer', 'Emakumea'], ['hombre', 'Gizona'], ['otro', 'Beste bat / nahiago dut ez adierazi']],
      sexoPh: 'Aukeratu aukera bat',
      email: 'Posta elektronikoa',
      referencias: 'Beste proba batzuetako erreferentziak',
      referenciasHint: 'Aukerakoa. Amaitu dituzun proba luzeak, ultrak, zeharkaldiak edo erronkak.',
      federado: 'Mendi-federatua zara?',
      si: 'Bai',
      no: 'Ez',
      federacion: 'Zein federaziotan?',
      descripcion: 'Azalpen pertsonala',
      descripcionHint: 'Laburra eta derrigorrezkoa. Kontatu zeinen zaren eta zergatik egin nahi duzun. Aurre-izen-ematea balioztatzeko balio du; ez du iragazten.',
      observaciones: 'Oharrak',
      observacionesHint: 'Aukerakoa. Alergiak, zalantzak, jakinarazi nahi diguzun edozer.',
      consent: '<a href="{priv}">Pribatutasun-politika</a> irakurri dut, eta nire datuak aurre-izen-ematea kudeatzeko tratatzeko baimena ematen dut.',
      submit: 'Aurre-izen-ematea bidali',
      sending: 'Bidaltzen…',
      required: 'derrigorrezkoa',
      count: '{n} / {max}'
    },
    errors: {
      title: 'Berrikusi eremu hauek:',
      required: 'Eremu hau derrigorrezkoa da.',
      email: 'Idatzi baliozko posta elektroniko bat.',
      age: 'Adierazi 18 eta 99 urte arteko adin bat.',
      min: 'Kontatu iezaguzu pixka bat gehiago (gutxienez {min} karaktere).',
      consent: 'Zure baimena behar dugu aurrera egiteko.',
      network: 'Ezin izan dugu inprimakia bidali. Egiaztatu konexioa eta saiatu berriro, edo idatzi iezaguzu {email} helbidera.',
      server: 'Gure aldean zerbait huts egin du. Ez da ezer galdu: saiatu berriro minutu batzuk barru edo idatzi iezaguzu {email} helbidera.',
      closed: 'Aurre-izen-ematea oraindik ez dago irekita. 2026ko abenduaren 1ean irekiko da.',
      rate: 'Inprimaki bat baino gehiago bidali dituzu segidan. Itxaron minutu batzuk eta saiatu berriro.',
      spam: 'Ezin izan dugu bidalketa balioztatu. Kargatu berriro orria eta saiatu berriro.'
    },
    ok: {
      title: 'Aurre-izen-ematea jaso dugu',
      lead: 'Eskerrik asko, {nombre}. Hau da zure erreferentzia-kodea:',
      already: 'Posta elektroniko honekin aurre-izena emana zenuen jada. Hau da zure erreferentzia-kodea:',
      next: 'Berrespen-mezu bat bidali dugu <strong>{email}</strong> helbidera. Minutu batzuetan ikusten ez baduzu, begiratu spam karpetan.',
      steps: ['Gorde zure kodea: edozein kontsultatarako beharko duzu.', 'Aurre-izen-emateak ez du plazarik bermatzen.', 'Ordainketa-data martxoan jakinaraziko dizugu posta elektronikoz.'],
      mailFailed: 'Zure aurre-izen-ematea gorde da, baina ezin izan dugu berrespen-mezua bidali. Gorde kode hau eta idatzi iezaguzu {email} helbidera behar baduzu.'
    }
  },
  dl: {
    h2: 'Deskargak',
    lead: 'Patxadaz irakurtzeko eta zurekin eramateko.',
    items: {
      guia: ['Autohornikuntzaren gida', 'Laguntzarik gabeko ultra-trail bat nola prestatzen eta egiten den: ura, janaria, loa, materiala eta nabigazioa.'],
      reglamento: ['Araudia', 'I. edizioaren oinarrizko arauak, oraingoz argitaratutakoak. Behin betiko bertsioa izen-ematea baino lehen argitaratuko da.'],
      gpx: ['Ibilbidearen tracka', 'Ibilbide osoa GPX formatuan, irteera eta helmuga markatuta, zure erlojuan edo telefonoan kargatzeko prest.']
    },
    version: 'bertsioa',
    pdf: 'PDF'
  },
  faq: {
    h2: 'Maiz egindako galderak',
    lead: 'Funtsezkoena, biribilkeriarik gabe. Zerbait falta bada, idatzi iezaguzu.',
    items: [
      ['Noiz da lasterketa?', 'I. edizioa <strong>2027ko udazkenean</strong> izango da. Oraindik ez dugu zehaztu eguna.'],
      ['Non dira irteera eta helmuga?', 'Gasteizko La Florida parkeko kioskoan. Ibilbidea begizta bat da: toki berean hasi eta bukatzen duzu.'],
      ['Zenbat distantzia eta desnibel ditu?', '<strong>227,5 km</strong> eta <strong>+5.293 m</strong>-ko desnibel positiboa, autohornikuntzan.'],
      ['Noiz irekitzen da aurre-izen-ematea?', 'Aurre-izena emandakoen zerrenda <strong>2026ko abenduaren 1ean</strong> irekiko da.'],
      ['Nola esleitzen dira 300 plazak?', 'Aurre-izen-emateak iritsi diren hurrenkeran. Azalpen pertsonal laburra derrigorrezkoa da: aurre-izen-ematea balioztatzeko balio du, ez iragazteko. Ez dago dortsalik erreserbatzerik, ezta motibazio-gutunik ere.'],
      ['Aurre-izen-emateak plaza bermatzen al du?', 'Ez. Aurre-izena ematean erreferentzia-kode bat jasoko duzu posta elektronikoz, eta ordainketa-data ere posta elektronikoz jakinaraziko dizugu, martxoan.'],
      ['Zer datu eskatzen dituzue?', 'Izena, abizenak, adina, sexua, posta elektronikoa, beste proba batzuetako erreferentziak, mendi-federatua zaren, azalpen pertsonal labur bat eta, nahi baduzu, oharrak. NANa plaza berresten duzunean eskatuko dugu.'],
      ['Zer esan nahi du autohornikuntzak?', 'Kanpoko laguntzarik gabe eta antolakuntzaren hornidura-postuak gabe: behar duzuna zeuk eramaten duzu, eta zeuk kudeatzen dituzu ura, janaria eta loa. <a href="{guia}">Autohornikuntzaren gidak</a> xehetasunez azaltzen du.'],
      ['Nola funtzionatzen dute kontrol-guneek?', 'Sei kontrol-gune daude. Lau baieztatuta daude (Agurain, Santikurutze Kanpezu, Biasteri eta Urizaharra), eta beste biak zehazteke daude. Tracker batek jarraituko zaitu lasterketa osoan zehar, eta brevet-ak zure igarobidea jasoko du.'],
      ['Mota honetako lehen lasterketa egokia al da?', 'Egia esan, ez. Ultra Trail Larre®-k distantzia luzeko aurretiko esperientzia eskatzen du. Autohornikuntzan lehen urratsak emateko, gidak distantzia txikiagoak proposatzen ditu.'],
      ['Zer da hondakin zeroa?', 'Zurekin mendira sartzen dena, zurekin aterako da. <a href="{reglamento}">Araudiak</a> jasotzen du.'],
      ['Non dago araudia?', '<a href="{reglamento}">PDF honetan</a>, oraingoz argitaratutako oinarrizko arauekin. Gainerakoa behin betiko bertsioan argitaratuko da.']
    ]
  },
  partners: {
    h2: 'Lagun gaitzazu',
    lead: 'Ultra Trail Larre® lasterketa txikia da, kontuz eginekoa. Bat egin nahi baduzu, elkarrizketa batekin hasiko gara, ez dosier batekin.',
    types: [
      ['Markak', 'Material eta produktu iraunkorrak, irizpidez eginak, mendian zentzua dutenak. Kontatu zer egingo zenukeen eta zergatik datorren ondo.'],
      ['Erakundeak', 'Lurraldea, laguntza eta ateak irekita: bere eskualdea errespetuz ezagutarazi nahi duten erakundeak.'],
      ['Hedabideak', 'Begirada bat, kontakizun bat eta bozgorailu bat isiltasuna maite duen proba batentzat, ultra-komunitateari zuzendua.'],
      ['Ekitaldi-eragileak', 'Jarraipena, segurtasuna, logistika eta ekoizpena: azpiegitura nabaritu ez dadin behar den trebetasuna.']
    ],
    formTitle: 'Kontatu zure ideia',
    form: {
      empresa: 'Enpresa edo erakundea',
      persona: 'Harremanetarako pertsona',
      cargo: 'Kargua',
      email: 'Posta elektronikoa',
      tipo: 'Lankidetza mota',
      tipoPh: 'Aukeratu aukera bat',
      tipoOpts: [['marca', 'Marka'], ['institucion', 'Erakundea'], ['medio', 'Hedabidea'], ['operador', 'Ekitaldi-eragilea'], ['otro', 'Beste bat']],
      mensaje: 'Mezua',
      mensajeHint: 'Zer egin nahi zenukeen eta zer espero duzun elkarrizketatik.',
      consent: '<a href="{priv}">Pribatutasun-politika</a> irakurri dut, eta nire datuak proposamena kudeatzeko tratatzeko baimena ematen dut.',
      submit: 'Mezua bidali',
      sending: 'Bidaltzen…'
    },
    errors: {
      title: 'Berrikusi eremu hauek:',
      required: 'Eremu hau derrigorrezkoa da.',
      email: 'Idatzi baliozko posta elektroniko bat.',
      min: 'Kontatu iezaguzu pixka bat gehiago (gutxienez {min} karaktere).',
      consent: 'Zure baimena behar dugu aurrera egiteko.',
      network: 'Ezin izan dugu mezua bidali. Egiaztatu konexioa eta saiatu berriro, edo idatzi iezaguzu {email} helbidera.',
      server: 'Gure aldean zerbait huts egin du. Saiatu berriro minutu batzuk barru edo idatzi iezaguzu {email} helbidera.',
      rate: 'Mezu bat baino gehiago bidali dituzu segidan. Itxaron minutu batzuk eta saiatu berriro.',
      spam: 'Ezin izan dugu bidalketa balioztatu. Kargatu berriro orria eta saiatu berriro.'
    },
    ok: {
      title: 'Mezua jaso dugu',
      lead: 'Eskerrik asko, {nombre}. Berrespen-mezu bat bidali dugu <strong>{email}</strong> helbidera, eta pertsonalki erantzungo dizugu.',
      mailFailed: 'Zure mezua gorde da, baina ezin izan dugu berrespena bidali. Hala ere erantzungo dizugu.'
    }
  },
  contact: {
    h2: 'Harremana',
    lead: 'Zalantzak, ideiak, edo zergatik egin nahi duzun kontatzeko gogoa? Idatzi iezaguzu.',
    labels: { email: 'Posta elektronikoa', ig: 'Instagram', wa: 'WhatsApp', map: 'Irteera eta helmuga' },
    mapText: 'La Florida parkea, Gasteiz',
    waText: 'Idatzi iezaguzu WhatsAppez',
    waMsg: 'Kaixo, Ultra Trail Larre®-ri buruz hitz egin nahi nuke',
    org: 'Ultra Trail Larre®-ren antolatzailea <a href="https://musubigara.org/eu/" rel="noopener">Musubigara®</a> da.'
  },
  aria: { social: 'Sare sozialak eta harremana', ig: 'Ultra Trail Larre® Instagramen', wa: 'WhatsApp', map: 'Irteerara nola iritsi, La Florida parkea' },
  notFound: { title: 'Ez da orria aurkitu', text: 'Helbide hau ez dago edo aldatu egin da. Itzuli hasierara, edo idatzi iezaguzu zerbait zehatza bilatzen bazenuen.', home: 'Hasierara joan' },
  legal: {
    updated: 'Azken eguneratzea',
    aviso: {
      title: 'Lege-oharra',
      metaDesc: 'ultratraillarre.org webgunearen lege-oharra, Ultra Trail Larre®-ren webgunea.',
      date: '2026ko azaroaren 3a',
      sections: [
        ['1. Identifikazio-datuak', ['Informazioaren Gizarteko Zerbitzuei eta Merkataritza Elektronikoari buruzko 34/2002 Legearen (LSSI-CE) 10. artikulua betez, jakinarazten da webgune hau honako honen titulartasunekoa dela:', '<strong>Titularra:</strong> Ignacio Sanz Arana, Ultra Trail Larre® markaren titularra (Musubigara®-k antolatua).<br><strong>IFZ:</strong> 72752567W<br><strong>Helbidea:</strong> Pintor Pablo Uranga 12, 01008, Gasteiz (Araba), Espainia.<br><strong>Posta elektronikoa:</strong> <a href="mailto:ignacio@musubigara.org">ignacio@musubigara.org</a>']],
        ['2. Xedea eta erabilera-baldintzak', ['Webgune honek Ultra Trail Larre® lasterketa aurkezten du, eta aurre-izena emateko eta antolakuntzarekin harremanetan jartzeko aukera ematen du. Webgunera sartzeak eta erabiltzeak erabiltzaile izaera ematen du, eta lege-ohar hau onartzea dakar. Erabiltzaileak eduki egokiak erabiltzeko konpromisoa hartzen du, legearen, mesfidantza ezaren eta ordena publikoaren arabera.']],
        ['3. Informazio-izaera', ['Argitaratutako informazioa (datak, ibilbidea, plazak, kontrol-guneak eta baldintzak) informatiboa da, eta aldaketen mende dago; hala badagokio, proba egiteko behar diren administrazio-baimenen mende ere. Aurre-izen-emateak ez du plazarik bermatzen, eta ez da probarako izen-ematea. Behin betiko baldintzak araudian eta izen-emate prozesuan jasoko dira.']],
        ['4. Jabetza intelektuala eta industriala', ['Webgune honetako testuak, diseinuak, irudiak, logotipoak, egitura eta gainerako edukiak, eta Ultra Trail Larre® marka, titularrarenak dira edo behar bezalako baimenarekin erabiltzen dira. Debekatuta dago horiek erreproduzitzea, banatzea, jendaurrean jakinaraztea edo eraldatzea berariazko idatzizko baimenik gabe.']],
        ['5. Erantzukizuna', ['Informazioa zehatza eta eguneratua izan dadin ahalegina egiten da, baina ez da bermatzen akatsik ez egotea ezta gunea etengabe erabilgarri egotea ere. Webguneak hirugarrenen guneetarako estekak izan ditzake (sare sozialak, WhatsApp, mapak); haien edukiaren gaineko kontrolik ez dago eta ez da erantzukizunik hartzen.']],
        ['6. Datuen babesa', ['Datu pertsonalen tratamendua <a href="{priv}">pribatutasun-politikak</a> arautzen du.']],
        ['7. Aplikatu beharreko legeria eta jurisdikzioa', ['Lege-ohar hau Espainiako legeriak arautzen du. Edozein eztabaidarako, aldeek Gasteizko epaitegi eta auzitegien mende jartzen dira, kontsumitzaileen eta erabiltzaileen araudiak beste foru nahitaezko bat ezartzen ez badu.']]
      ]
    },
    priv: {
      title: 'Pribatutasun-politika',
      metaDesc: 'ultratraillarre.org webgunearen pribatutasun-politika: zer datu tratatzen ditugun aurre-izena ematen edo gurekin harremanetan jartzen zarenean, zertarako eta noiz arte.',
      date: '2026ko azaroaren 3a',
      sections: [
        ['1. Tratamenduaren arduraduna', ['<strong>Titularra:</strong> Ignacio Sanz Arana, Ultra Trail Larre® markaren titularra (Musubigara®-k antolatua).<br><strong>IFZ:</strong> 72752567W<br><strong>Helbidea:</strong> Pintor Pablo Uranga 12, 01008, Gasteiz (Araba), Espainia.<br><strong>Posta elektronikoa:</strong> <a href="mailto:ignacio@musubigara.org">ignacio@musubigara.org</a>']],
        ['2. Zer datu tratatzen ditugun eta zertarako', ['Zuk emandako datuak soilik tratatzen ditugu, hiru bidetatik.', '<strong>2.1. Aurre-izen-emateko inprimakia.</strong> Izena eta abizenak, adina, sexua, posta elektronikoa, beste proba batzuetako erreferentziak (aukerakoa), mendi-federatua zaren eta zein federaziotan, azalpen pertsonala, oharrak (aukerakoak), orriaren hizkuntza eta bidalketaren data eta ordua. Erreferentzia-kode bakarra ere sortzen dugu. Xedea zure aurre-izen-ematea kudeatzea da: balioztatzea, plazak iritsiera-hurrenkeran esleitzea, berrespena bidaltzea eta ordainketa-data posta elektronikoz jakinaraztea. Une honetan ez dugu NANik eskatzen; plaza berresten baduzu, orduan eskatuko dugu eta une horretan adieraziko dizugu.', '<strong>2.2. «Lagun gaitzazu» inprimakia.</strong> Enpresa edo erakundea, izena, kargua, posta elektronikoa, lankidetza mota eta mezua. Xedea zure proposamena kudeatzea eta erantzutea da.', '<strong>2.3. Posta elektronikoz edo WhatsAppez egindako harremana.</strong> Izena, posta-helbidea edo telefonoa eta zure mezuaren edukia, zure kontsulta kudeatzeko.', 'Aurre-izena emateak ez du dortsalik erreserbatzen, ez zaitu probarako izena ematen eta ez zaitu inolako buletinetara harpidetzen. Ez dugu profilik egiten eta ez dugu erabaki automatizaturik hartzen.']],
        ['3. Oinarri juridikoa', ['Zure berariazko baimena (DBEOren 6.1.a artikulua), inprimaki bakoitza bidali aurretik laukitxoa markatuz edo guri idatziz ematen duzuna. Edonoiz atzera egin dezakezu, aurreko tratamenduaren zilegitasunari eragin gabe. Zure mezuak lankidetza bilatzen duenean, zure eskariz kontratu-aurreko neurriak ere aplikatzen ditugu (DBEOren 6.1.b artikulua).']],
        ['4. Hartzaileak eta nazioarteko transferentziak', ['Ez dizkiegu zure datuak hirugarrenei lagatzen, lege-betebeharrik ez bada. Gure izenean tratamenduaren arduradun gisa jarduten duten hornitzaileen laguntza dugu:', '<strong>Netlify, Inc.</strong> (Estatu Batuak): webgunearen ostatua, inprimakiak prozesatzen dituzten funtzioak eta bidalketen biltegiratzea.<br><strong>Resend, Inc.</strong> (Estatu Batuak): berrespen- eta jakinarazpen-mezuen bidalketa.<br><strong>Google Ireland Limited</strong>: zure mezuei erantzuteko erabiltzen dugun posta elektronikoko zerbitzua.<br><strong>Meta Platforms Ireland Ltd.</strong>, zuk WhatsAppez idaztea edo Instagramera sartzea erabakitzen baduzu soilik, haien politikaren arabera.', 'Ostatuak eta posta-bidalketak datuen nazioarteko transferentziak dakartza Estatu Batuetara, Europako Batzordearen kontratu-klausula tipoek edo EB-AEB Datuen Pribatutasun Esparruak babestuta, hornitzailearen arabera. Letra-tipoak, irudiak eta gainerako baliabideak gure domeinutik bertatik zerbitzatzen dira, hirugarrenen zerbitzarietara eskaerarik egin gabe.']],
        ['5. Kontserbazio-epea', ['<strong>Aurre-izen-ematea:</strong> proba egin arte, 2027ko udazkenerako aurreikusia, eta ondoren blokeatuta, erantzukizun posibleen preskripzio-epeetan. Lehenago ezabatuko dira baimena kentzen baduzu edo ezabatzea eskatzen baduzu.', '<strong>Lagundu eta harremana:</strong> zure proposamena edo kontsulta kudeatzen den bitartean, eta ondoren blokeatuta, legezko preskripzio-epeetan.']],
        ['6. Zure eskubideak', ['Sartzeko, zuzentzeko, ezabatzeko, aurka egiteko, tratamendua mugatzeko eta eramangarritasunerako eskubideak baliatu ditzakezu, eta baimena edonoiz kendu, <a href="mailto:ignacio@musubigara.org">ignacio@musubigara.org</a> helbidera idatziz, baliatu nahi duzun eskubidea eta, baduzu, zure erreferentzia-kodea adieraziz. Zure eskubideak bete ez direla uste baduzu, erreklamazioa aurkez dezakezu Datuak Babesteko Espainiako Agentzian (<a href="https://www.aepd.es/" rel="noopener">www.aepd.es</a>).']],
        ['7. Cookieak eta analitika', ['Webgune honek ez du cookie propiorik ez hirugarrenenik jartzen, eta ez du publizitate-tresnarik erabiltzen. Hizkuntza-lehentasuna orriaren helbidean bakarrik islatzen da (/, /eu/ eta /en/). Etorkizunean analitikaren bat edo salbuetsita ez dauden cookieak gehituz gero, politika hau eguneratuko da eta, hala badagokio, zure aurretiko baimena eskatuko da.']],
        ['8. Adin txikikoak', ['Aurre-izen-ematea eta probako parte-hartzea adinez nagusientzat dira. Ez ditugu jakinaren gainean adin txikikoen datuak tratatzen, haien legezko ordezkarien baimenik gabe.']],
        ['9. Segurtasuna eta aldaketak', ['Zure datuak babesteko neurri tekniko eta antolatzaile arrazoizkoak aplikatzen ditugu: konexio zifratua, gakoak iturburu-kodetik kanpo eta bidalketetarako sarbide murriztua. Politika hau eguneratu dezakegu lege- edo webgune-aldaketetara egokitzeko; indarrean dagoena hemen argitaratua dagoena da beti.']]
      ]
    }
  }
};
