/* Euskarazko edukia. Datu ofizialak soilik (tools/data/hechos.json).
 * LEHEN IRAKURKETA TEKNIKOA: Ignaciok berrikusi beharra dauka argitaratu aurretik. */
export default {
  lang: 'eu',
  locale: 'eu_ES',
  label: 'Euskara',
  paths: { home: '/eu/', aviso: '/eu/lege-oharra/', priv: '/eu/pribatutasun-politika/', reg: '/eu/araudia/' },
  meta: {
    title: 'Ultra Trail Larre® · 227 km Araban, bakarka edo erreleboka',
    description: 'Autohornikuntzako ultra-trail-a Araban, 2027ko urriaren 29tik 31ra: 227 km eta +5.590 m Gasteiztik, bakarka edo erreleboka (3 edo 4 laguneko taldeak).',
    ogLine: 'Bakarka edo erreleboka · Araba · 2027/10/29–31',
    ogAlt: 'Ultra Trail Larre®: autohornikuntzako ultra-trail-a Arabako mendilerroetan, bakarka edo erreleboka, 2027ko urriaren 29tik 31ra'
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
    rules: 'Araudia',
    rights: 'Eskubide guztiak erreserbatuta.',
    back: 'Webgunera itzuli',
    backMenu: 'Menura itzuli',
    ctaPre: 'Aurre-izena',
    ctaWa: 'Hitz egin dezagun'
  },
  nav: [
    ['preinscripcion', 'Aurre-izen-ematea'],
    ['la-carrera', 'Lasterketa'],
    ['ruta', 'Ibilbidea'],
    ['codigo-cero', 'Zero Kodea'],
    ['descargas', 'Deskargak'],
    ['colabora', 'Lagun gaitzazu'],
    ['instagram', 'Argazkiak'],
    ['faq', 'Maiz egindako galderak'],
    ['contacto', 'Harremana']
  ],
  hero: {
    eyebrow: 'I. edizioa · 2027ko urriaren 29tik 31ra',
    modes: 'Bakarka edo 3-4 laguneko erreleboetan.',
    claim: 'Zu bakarrik, tracker bat eta zure brevet-a.',
    sub: 'Autohornikuntzako ultra-trail-a Arabako mendilerroetan. Gasteizen hasi eta bukatzen den 227 km-ko begizta.',
    cta: 'Aurre-izena eman',
    cta2: 'Ikusi ibilbidea',
    facts: [
      ['227', 'km begizta batean'],
      ['+5.590', 'm-ko desnibel positiboa'],
      ['300', 'plaza'],
      ['3–4', 'lagun errelebo-talde bakoitzeko'],
      ['La Florida', 'irteera eta helmuga, Gasteiz']
    ]
  },
  race: {
    h2: 'Lasterketa',
    lead: 'Irteera bat, helmuga bat eta Arabako mendilerroak tartean. Bien artean gertatzen dena zuk ebazten duzu.',
    blocks: [
      ['Autohornikuntza', 'Ultra Trail Larre® autohornikuntzako ultra-trail-a da: kanpoko laguntzarik gabe eta antolakuntzaren hornidura-postuak gabe. Zuk erabakitzen duzu zer eramango duzun, noiz jango duzun, noiz egingo duzun lo eta urarekin nola moldatuko zaren. Espedizio bat bezala prestatzen da, ez zirkuitu bat bezala.'],
      ['Bakarka edo erreleboka, 3 edo 4 laguneko taldeetan', '227 km-ak zuk bakarrik korri ditzakezu, edo 3 edo 4 laguneko errelebo-talde batean banatu. Talde bakoitza nahi duen moduan antolatzen da: tracker bakarra dago, korrikalari batetik hurrengora pasatzen dena, eta derrigorrezko gauza bakarra kontrol guztietatik pasatzea da. Ultra Trail Larre®-ren ezaugarri nagusietako bat da: autohornikuntzako 227 km-ko ultra bat, taldean ere bizi daitekeena.'],
      ['Zu bakarrik, tracker bat eta zure brevet-a', 'Tracker batek jarraituko zaitu lasterketa osoan zehar, eta brevet-ak kontrol-guneetatik egindako igarobidea jasoko du. Nabigazioa probaren parte da.'],
      ['Filosofia', 'Ez da jendetza handiko lasterketa bat, eta ez du izan nahi. 300 plaza dira, eta zifra hori nortasuna da, ez merkatu-parametro bat. Askorentzat erronka, besterik gabe, helmugara iristea izango da.'],
      ['Mendia', 'Urte osoan bizirik dauden Arabako mendilerro, herri eta mahastiak zeharkatuko ditugu. Errespetuz eta aztarnarik utzi gabe igaroko gara: hori da itzultzeko baldintza.']
    ],
    forYouH: 'Zuretzat al da?',
    forYou: 'Ultra Trail Larre® ez da hasiberrientzako lasterketa bat. Distantzia luzeko aurretiko esperientzia eskatzen du, goizaldean burua hotz mantentzea eta Zero Kodea onartzea. Horrek uko egitea baino pribilegio bat dela iruditzen bazaizu, hau da zure lasterketa.'
  },
  zero: {
    h2: 'Zero Kodea',
    lead: 'Zurekin mendira sartzen dena, zurekin aterako da mendi-gainetik. Uzten dugun aztarna bakarra urratsarena da.',
    blocks: [
      ['Zure poltsa', 'Zakar-poltsa propioa poltsiko finko batean, beti berean.'],
      ['Bilgarri bakoitza', 'Gel eta barren hegatsak irekitzen diren unean lotuta edo gordeta, inoiz ez «gero».'],
      ['Irten aurretik', 'Ahal duzuna berrerabilgarriak diren poltsetara pasa, hasieratik bilgarri gutxiago eramateko.']
    ],
    note: 'Zero Kodearen baldintzak <a href="{reglamento}">araudian</a> daude.'
  },
  routePage: {
    path: '/eu/ibilbidea/',
    metaTitle: 'Ultra Trail Larre®-ren ibilbidea: 227 km, +5.590 m Araban',
    metaDesc: 'Ultra Trail Larre®-ren ibilbidea, profila eta desnibela: 227 km eta +5.590 m-ko begizta Gasteizetik Arabako mendilerroetan zehar. 6 kontrolgune, GPX tracka.',
    eyebrow: 'Ibilbidea',
    h1: 'Ibilbidea eta desnibela: 227 km Arabako mendilerroetan',
    lead: 'Ultra Trail Larre® 227 km eta +5.590 m-ko desnibel positiboa duen begizta bat da, Gasteizko Florida Parkeko kioskoan hasi eta bukatzen dena. Autohornikuntzan korritzen da, tracker batekin eta brevet batekin, bakarka edo erreleboka, 3 edo 4 laguneko taldeetan. I. edizioa 2027ko urriaren 29tik 31ra egingo da.',
    figsTitle: 'Ibilbidea zifretan',
    extraFigs: [['Altitude minimoa', '{min} m'], ['Altitude maximoa', '{max} m'], ['Modalitateak', 'Bakarka edo erreleboka (3 edo 4 laguneko taldeak)'], ['Data', '2027ko urriaren 29–31'], ['Plazak', '300']],
    terrainTitle: 'Zer nolako lurra da',
    terrain: 'Komooten ibilbidearen plangintzaren arabera, 227 km-ren %{np} inguru zolatu gabeko pistetatik eta bideetatik doa, eta %{pv} asfaltotik edo zolatutako pistetatik. Datuak orientagarriak dira: lurraren benetako egoera urtaroaren eta baldintzen arabera alda daiteke.',
    nextTitle: 'Irteera baino lehen',
    next: ['I. edizioa 2027ko urriaren 29tik 31ra egingo da.', 'Aurre-izen-emateen zerrenda 2026ko abenduaren 1ean, 14:00etan, irekiko da.', '300 plazak aurre-izen-emateen iritsiera-ordenaren arabera esleitzen dira; aurre-izen-emateak ez du plaza bermatzen.'],
    ctaPre: 'Aurre-izen-ematea',
    ctaRules: 'Araudia (PDF)',
    more: 'Ibilbidearen fitxa osoa'
  },
  route: {
    h2: 'Ibilbidea',
    lead: '227 km eta +5.590 m-ko begizta, Gasteizko La Florida parkeko kioskotik hasi eta bertan bukatzen dena.',
    figs: [
      ['Distantzia', '227 km'],
      ['Desnibel positiboa', '+5.590 m'],
      ['Irteera eta helmuga', 'La Florida parkea'],
      ['Kontrol-guneak', '6 (4 baieztatuta)']
    ],
    mapTitle: 'Ibilbidearen mapa',
    mapAlt: '227 km-ko begiztaren mapa eskematikoa: irteera eta helmuga Gasteizko La Florida parkean, eta baieztatutako lau kontrol-guneak: Urizaharra, Biasteri, Santikurutze Kanpezu eta Agurain.',
    startLabel: 'Irteera eta helmuga',
    profileTitle: 'Altitude-profila',
    profileSub: 'Kilometro bakoitzeko zutabe bat, trackaren arabera. Punturik baxuenetik, {min} m, altuenera, {max} m.',
    profileAlt: 'Ibilbidearen altitude-profila, kilometro bakoitzeko zutabe bat, {min} eta {max} metro artean.',
    kmAxis: 'km',
    ctrlTitle: 'Baieztatutako kontrol-guneak',
    ctrlHead: ['Kontrol-gunea', 'Km gutxi gorabehera trackean'],
    ctrlNote: 'Guztira sei kontrol-gune daude: lau hauek baieztatuta daude, eta beste biak oraindik zehazteke. Kilometroak gutxi gorabeherakoak dira eta argitaratutako trackaren norabidea jarraitzen dute.',
    towns: { penacerrada: 'Urizaharra (Peñacerrada)', laguardia: 'Biasteri (Laguardia)', campezo: 'Santikurutze Kanpezu', agurain: 'Agurain' },
    rKm: 'Km',
    rEle: 'Altitudea',
    rSlope: 'Malda',
    sliderLabel: 'Posizioa ibilbidean',
    interactHint: 'Pasatu kurtsorea, irristatu hatza edo erabili teklatuko geziak profilaren edo mapa gainean kilometroa, altitudea eta malda ikusteko.',
    surfTitle: 'Zoru motak',
    surfSub: '227 km-ren banaketa, Komooten ibilbidearen plangintzaren arabera; Komootek zorua OpenStreetMapeko datuekin sailkatzen du. Orientagarria da: lurzoruaren benetako egoera aldatu daiteke eguraldiaren edo obren arabera.',
    wayTitle: 'Bide motak',
    surfaces: { pistaNoPav: 'Zolatu gabeko pista', caminoNatural: 'Bide naturala', pistaPav: 'Zolatutako pista', grava: 'Legarrezko bidea', asfalto: 'Asfaltoa', pistaAlpina: 'Pista alpinoa', desconocido: 'Ezezaguna' },
    ways: { senda: 'Bidexka', sendero: 'Bide-zidorra', carretera: 'Errepidea', vereda: 'Zidorra', camino: 'Bidea', calle: 'Kalea', senderoMontana: 'Mendi-bidea', fueraVias: 'Ezagutzen diren bideetatik kanpo', carreteraNacional: 'Errepide nazionala' },
    gpx: 'Trackaren deskarga (GPX)',
    mapsStart: 'Irteerara nola iritsi',
    anim: { skip: 'Saltatu animazioa', replay: 'Errepikatu ibilbidea', legend: 'Altitudea', climb: 'desnibela', north: 'I', scale: '10 km', legendAlt: 'Ibilbidearen altitudearen araberako kolore-legenda:' }
  },
  ig: {
    h2: 'Argazkiak',
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
      'Aurre-izena emandakoen zerrenda <strong>2026ko abenduaren 1ean, 14:00etan</strong> irekiko da.',
      'Izen-emate kuota: <strong>185 €</strong> banakako modalitatean; <strong>135 €</strong> parte-hartzaile bakoitzeko erreleboetan (3 edo 4 laguneko taldeak).',
      'Azalpen pertsonal labur bat sartu behar da, derrigorrez: aurre-izen-ematea balioztatzeko balio du, ez iragazteko.',
      'Ez dago dortsalik erreserbatzerik, ezta motibazio-gutunik ere.',
      '<strong>Aurre-izen-emateak ez du plazarik bermatzen.</strong> Erreferentzia-kode bat jasoko duzu. Izen-ematea <strong>2027ko urtarrilaren 2an</strong> irekiko da, eta egun horretatik aurrera ordaindu ahal izango da: plaza ordaintzean berresten da.',
      'Une honetan ez dugu NANik eskatzen; plaza berretsi behar duzunean eskatuko dugu.'
    ],
    closedTitle: 'Oraindik ez dago irekita',
    closedText: 'Aurre-izen-ematea 2026ko abenduaren 1ean, 14:00etan, irekiko da. Ordu horretatik aurrera, hemen bertan bete ahal izango duzu inprimakia.',
    noscript: 'Aurre-izena emateko JavaScript aktibatuta izan behar duzu. Ezin baduzu aktibatu, idatzi iezaguzu {email} helbidera.',
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
      modalidad: 'Modalitatea',
      modalidadOpts: [['individual', 'Bakarka'], ['relevos', 'Erreleboka (3 edo 4 laguneko taldea)']],
      equipo: 'Taldearen izena',
      equipoHint: 'Kide bakoitzak bere aldetik eman behar du aurre-izena, izen bera erabiliz. Taldeak 3 edo 4 lagunekoak dira.',
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
      closed: 'Aurre-izen-ematea oraindik ez dago irekita. 2026ko abenduaren 1ean, 14:00etan, irekiko da.',
      rate: 'Inprimaki bat baino gehiago bidali dituzu segidan. Itxaron minutu batzuk eta saiatu berriro.',
      spam: 'Ezin izan dugu bidalketa balioztatu. Kargatu berriro orria eta saiatu berriro.'
    },
    ok: {
      title: 'Aurre-izen-ematea jaso dugu',
      lead: 'Eskerrik asko, {nombre}. Hau da zure erreferentzia-kodea:',
      already: 'Posta elektroniko honekin aurre-izena emana zenuen jada. Hau da zure erreferentzia-kodea:',
      next: 'Berrespen-mezu bat bidali dugu <strong>{email}</strong> helbidera. Minutu batzuetan ikusten ez baduzu, begiratu spam karpetan.',
      steps: ['Gorde zure kodea: edozein kontsultatarako beharko duzu.', 'Aurre-izen-emateak ez du plazarik bermatzen.', 'Izen-ematea eta ordainketa 2027ko urtarrilaren 2an irekiko dira.'],
      mailFailed: 'Zure aurre-izen-ematea gorde da, baina ezin izan dugu berrespen-mezua bidali. Gorde kode hau eta idatzi iezaguzu {email} helbidera behar baduzu.'
    }
  },
  dl: {
    h2: 'Deskargak',
    lead: 'Patxadaz irakurtzeko eta zurekin eramateko.',
    items: {
      gpx: ['Ibilbidearen tracka', 'Ibilbide osoa GPX formatuan, irteera eta helmuga markatuta, zure erlojuan edo telefonoan kargatzeko prest.']
    },
    version: 'bertsioa',
    pdf: 'PDF'
  },
  faq: {
    h2: 'Maiz egindako galderak',
    lead: 'Funtsezkoena, biribilkeriarik gabe. Zerbait falta bada, idatzi iezaguzu.',
    items: [
      ['Noiz da lasterketa?', 'I. edizioa <strong>2027ko urriaren 29tik 31ra</strong> egingo da, irteera eta helmuga Gasteizko Florida parkean dituela.'],
      ['Erreleboka korritu daiteke?', 'Bai. Banakako modalitateaz gain, <strong>3 edo 4 laguneko talde batean</strong> erreleboka korri dezakezu. Talde bakoitza nahi duen moduan antolatzen da: tracker bakarra eramaten duzue, hurrengo korrikalariari pasatzen zaiona, eta derrigorrezko gauza bakarra kontrol guztietatik pasatzea da. Erreleboen kuota <strong>135 €</strong> da parte-hartzaile bakoitzeko.'],
      ['Zenbat lagunek osatzen dute errelebo-talde bat?', '<strong>3 edo 4 lagunek.</strong> 227 km-ak nahi duzuen moduan banatzen dituzue, beti tracker bakar batekin talde bakoitzeko.'],
      ['Non dira irteera eta helmuga?', 'Gasteizko La Florida parkeko kioskoan. Ibilbidea begizta bat da: toki berean hasi eta bukatzen duzu.'],
      ['Zenbat distantzia eta desnibel ditu?', '<strong>227 km</strong> eta <strong>+5.590 m</strong>-ko desnibel positiboa, autohornikuntzan.'],
      ['Noiz irekitzen da aurre-izen-ematea?', 'Bi fasetan: <strong>aurre-izen-ematea</strong> (ordaindu gabe) <strong>2026ko abenduaren 1ean, 14:00etan</strong> irekiko da, eta <strong>izen-ematea</strong>, ordainketarekin, <strong>2027ko urtarrilaren 2an</strong>.'],
      ['Nola esleitzen dira 300 plazak?', 'Aurre-izen-emateak iritsi diren hurrenkeran. Azalpen pertsonal laburra derrigorrezkoa da: aurre-izen-ematea balioztatzeko balio du, ez iragazteko. Ez dago dortsalik erreserbatzerik, ezta motibazio-gutunik ere.'],
      ['Aurre-izen-emateak plaza bermatzen al du?', 'Ez. Aurre-izena ematean erreferentzia-kode bat jasoko duzu posta elektronikoz. Izen-ematea <strong>2027ko urtarrilaren 2an</strong> irekiko da, egun horretatik aurrera ordaintzeko aukerarekin, eta plaza ordaintzean berresten da.'],
      ['Zer datu eskatzen dituzue?', 'Modalitatea (bakarka edo erreleboka) eta, erreleboetan, taldearen izena; izena, abizenak, adina, sexua, posta elektronikoa, beste proba batzuetako erreferentziak, mendi-federatua zaren, azalpen pertsonal labur bat eta, nahi baduzu, oharrak. NANa plaza berresten duzunean eskatuko dugu.'],
      ['Nola funtzionatzen dute kontrol-guneek?', 'Sei kontrol-gune daude. Lau baieztatuta daude (Agurain, Santikurutze Kanpezu, Biasteri eta Urizaharra), eta beste biak zehazteke daude. Tracker batek jarraituko zaitu lasterketa osoan zehar, eta brevet-ak zure igarobidea jasoko du.'],
      ['Zer da Zero Kodea?', 'Zurekin mendira sartzen dena, zurekin aterako da. <a href="{reglamento}">Araudiak</a> jasotzen du.'],
      ['Non dago araudia?', '<a href="{reglamento}">Araudian</a>, I. edizioaren baldintza guztiekin. <a href="{reglamentoPdf}">PDFn</a> ere deskargatu dezakezu.']
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
    org: 'Ultra Trail Larre®-ren antolatzailea Ignacio Sanz Arana (<a href="https://musubigara.org/eu/" rel="noopener">Musubigara®</a>) da.'
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
      date: '2026ko azaroaren 14a',
      sections: [
        ['1. Tratamenduaren arduraduna', ['<strong>Titularra:</strong> Ignacio Sanz Arana, Ultra Trail Larre® markaren titularra (Musubigara®-k antolatua).<br><strong>IFZ:</strong> 72752567W<br><strong>Helbidea:</strong> Pintor Pablo Uranga 12, 01008, Gasteiz (Araba), Espainia.<br><strong>Posta elektronikoa:</strong> <a href="mailto:ignacio@musubigara.org">ignacio@musubigara.org</a>']],
        ['2. Zer datu tratatzen ditugun eta zertarako', ['Zuk emandako datuak soilik tratatzen ditugu, hiru bidetatik.', '<strong>2.1. Aurre-izen-emateko inprimakia.</strong> Modalitatea (bakarka edo erreleboka) eta, erreleboetan, taldearen izena; izena eta abizenak, adina, sexua, posta elektronikoa, beste proba batzuetako erreferentziak (aukerakoa), mendi-federatua zaren eta zein federaziotan, azalpen pertsonala, oharrak (aukerakoak), orriaren hizkuntza eta bidalketaren data eta ordua. Erreferentzia-kode bakarra ere sortzen dugu. Xedea zure aurre-izen-ematea kudeatzea da: balioztatzea, plazak iritsiera-hurrenkeran esleitzea, berrespena bidaltzea eta ordainketa-data posta elektronikoz jakinaraztea. Une honetan ez dugu NANik eskatzen; plaza berresten baduzu, orduan eskatuko dugu eta une horretan adieraziko dizugu.', '<strong>2.2. «Lagun gaitzazu» inprimakia.</strong> Enpresa edo erakundea, izena, kargua, posta elektronikoa, lankidetza mota eta mezua. Xedea zure proposamena kudeatzea eta erantzutea da.', '<strong>2.3. Posta elektronikoz edo WhatsAppez egindako harremana.</strong> Izena, posta-helbidea edo telefonoa eta zure mezuaren edukia, zure kontsulta kudeatzeko.', 'Aurre-izena emateak ez du dortsalik erreserbatzen, ez zaitu probarako izena ematen eta ez zaitu inolako buletinetara harpidetzen. Ez dugu profilik egiten eta ez dugu erabaki automatizaturik hartzen.']],
        ['3. Oinarri juridikoa', ['Zure berariazko baimena (DBEOren 6.1.a artikulua), inprimaki bakoitza bidali aurretik laukitxoa markatuz edo guri idatziz ematen duzuna. Edonoiz atzera egin dezakezu, aurreko tratamenduaren zilegitasunari eragin gabe. Zure mezuak lankidetza bilatzen duenean, zure eskariz kontratu-aurreko neurriak ere aplikatzen ditugu (DBEOren 6.1.b artikulua).']],
        ['4. Hartzaileak eta nazioarteko transferentziak', ['Ez dizkiegu zure datuak hirugarrenei lagatzen, lege-betebeharrik ez bada. Gure izenean tratamenduaren arduradun gisa jarduten duten hornitzaileen laguntza dugu:', '<strong>Netlify, Inc.</strong> (Estatu Batuak): webgunearen ostatua, inprimakiak prozesatzen dituzten funtzioak eta bidalketen biltegiratzea.<br><strong>Resend, Inc.</strong> (Estatu Batuak): berrespen- eta jakinarazpen-mezuen bidalketa.<br><strong>Google Ireland Limited</strong>: zure mezuei erantzuteko erabiltzen dugun posta elektronikoko zerbitzua.<br><strong>Meta Platforms Ireland Ltd.</strong>, zuk WhatsAppez idaztea edo Instagramera sartzea erabakitzen baduzu soilik, haien politikaren arabera.', 'Ostatuak eta posta-bidalketak datuen nazioarteko transferentziak dakartza Estatu Batuetara, Europako Batzordearen kontratu-klausula tipoek edo EB-AEB Datuen Pribatutasun Esparruak babestuta, hornitzailearen arabera. Letra-tipoak, irudiak eta gainerako baliabideak gure domeinutik bertatik zerbitzatzen dira, hirugarrenen zerbitzarietara eskaerarik egin gabe.']],
        ['5. Kontserbazio-epea', ['<strong>Aurre-izen-ematea:</strong> proba egin arte, 2027ko udazkenerako aurreikusia, eta ondoren blokeatuta, erantzukizun posibleen preskripzio-epeetan. Lehenago ezabatuko dira baimena kentzen baduzu edo ezabatzea eskatzen baduzu.', '<strong>Lagundu eta harremana:</strong> zure proposamena edo kontsulta kudeatzen den bitartean, eta ondoren blokeatuta, legezko preskripzio-epeetan.']],
        ['6. Zure eskubideak', ['Sartzeko, zuzentzeko, ezabatzeko, aurka egiteko, tratamendua mugatzeko eta eramangarritasunerako eskubideak baliatu ditzakezu, eta baimena edonoiz kendu, <a href="mailto:ignacio@musubigara.org">ignacio@musubigara.org</a> helbidera idatziz, baliatu nahi duzun eskubidea eta, baduzu, zure erreferentzia-kodea adieraziz. Zure eskubideak bete ez direla uste baduzu, erreklamazioa aurkez dezakezu Datuak Babesteko Espainiako Agentzian (<a href="https://www.aepd.es/" rel="noopener">www.aepd.es</a>).']],
        ['7. Cookieak eta analitika', ['Webgune honek ez du cookie propiorik ez hirugarrenenik jartzen, eta ez du publizitate-tresnarik erabiltzen. Hizkuntza-lehentasuna orriaren helbidean bakarrik islatzen da (/, /eu/ eta /en/). Etorkizunean analitikaren bat edo salbuetsita ez dauden cookieak gehituz gero, politika hau eguneratuko da eta, hala badagokio, zure aurretiko baimena eskatuko da.']],
        ['8. Adin txikikoak', ['Aurre-izen-ematea eta probako parte-hartzea adinez nagusientzat dira. Ez ditugu jakinaren gainean adin txikikoen datuak tratatzen, haien legezko ordezkarien baimenik gabe.']],
        ['9. Segurtasuna eta aldaketak', ['Zure datuak babesteko neurri tekniko eta antolatzaile arrazoizkoak aplikatzen ditugu: konexio zifratua, gakoak iturburu-kodetik kanpo eta bidalketetarako sarbide murriztua. Politika hau eguneratu dezakegu lege- edo webgune-aldaketetara egokitzeko; indarrean dagoena hemen argitaratua dagoena da beti.']]
      ]
    },
    reg: {
      title: 'Araudia',
      metaDesc: 'Ultra Trail Larre®-ren araudi ofiziala, I. Edizioa: parte-hartzea, autohornikuntza, kontrolak, denbora-muga, asegurua, erantzukizuna eta Zero Kodea.',
      date: '2026ko azaroaren 23a',
      sections: [
        ['1. Xedea eta aplikazio-eremua', ['Araudi honek Ultra Trail Larre®-n, I. Edizioan (2027ko urriaren 29tik 31ra), parte hartzea arautzen du, eta antolakuntza eta izena eman duen pertsona oro lotzen ditu. Aurre-izen-ematea ez dakar araudi hau onartzea: onarpen berariazkoa izen-ematea osatzean gertatzen da, ordainketarekin, 2027ko urtarrilaren 2an irekiko den fasean. Araudi honek lehentasuna du webgunean, sare sozialetan edo antolakuntzaren jakinarazpen informaletan argitaratutako aurreko edozein informazioren aurretik.']],
        ['2. Antolakuntza', ['Ultra Trail Larre® Ignacio Sanz Aranak antolatzen du (IFZ 72752567W), Pintor Pablo Uranga 12, 01008, Gasteiz (Araba), Espainia helbidean, Musubigara® markaren pean. Araudi honetan «antolakuntzari» egiten zaion erreferentzia oro Ignacio Sanz Aranari egina dela ulertu behar da. Antolakuntzaren harremanetarako helbidea <a href="mailto:ignacio@musubigara.org">ignacio@musubigara.org</a> da.']],
        ['3. Edizioa, data, lekua eta modalitateak', ['I. Edizioa 2027ko urriaren 29tik 31ra ospatuko da, irteera eta helmuga Gasteizko Florida Parkeko kioskoan izanik. Antolakuntzak irteerako ordu zehatza jakinaraziko du izen-emateari antzeko aurrerapenarekin.', 'Bi modalitatetan parte hartu daiteke: <strong>bakarka</strong>, ibilbide osoa bakarrik korrituz, edo <strong>erreleboka</strong>, 3 edo 4 laguneko taldeetan, ibilbidea nahi duten moduan banatuz, dortsal bakar batekin eta talde bakoitzeko tracker bakar batekin, korrikalari batetik hurrengora pasatzen dena. Bi modalitateetan derrigorrezkoa da ibilbide ofizialaren kontrol guztietatik pasatzea, haren norabidean eta hurrenkeran.']],
        ['4. Ibilbidea eta kontrolguneak', ['Ibilbidea 227 km-ko eta +5.590 m-ko desnibel positiboko begizta bat da, antolakuntzak argitaratutako track ofizialaren arabera (GPX webgunean eskuragarri). Gertatutako arrazoiengatik ibilbidean gerta daitekeen aldaketa oro (obrak, klima, administrazio-baimena, segurtasuna) antolakuntzak jakinaraziko du, eta ez du erreklamaziorako ez itzulketarako eskubiderik emango probaren izaera funtsean aldatzen ez badu.', 'Sei kontrolgune daude, korrikalari edo talde bakoitzaren tracker eta brevet bidez egiaztatuak. Korrikalaria kontrol guztietatik pasatzearen arduradun da; ez egiteak diskalifikazioa ekar dezake, 9. artikuluaren arabera.']],
        ['5. Autohornikuntza eta korrikalariaren materiala', ['Ultra Trail Larre® autohornikuntzako proba da: antolakuntzak ez du hornitegirik ez kanpoko laguntzarik eskaintzen ibilbidean, seinaleztapena, kontrolguneak eta tracker bidezko jarraipena izan ezik. Korrikalari bakoitzak erabakitzen du eta berekin darama proba egiteko behar duena —elikagaiak, ura, arropa, argiztapena eta nabigazio- eta segurtasun-materiala—, eta erabaki horren arduradun bakarra da.', 'Antolakuntzak, izen-emateari aurrerapen nahikoarekin, material-zerrenda derrigorrezko edo gomendatua argitara dezake. Argitaratuz gero, araudi honen parte izango da, eta ez betetzeak 9. artikuluaren arabera zehatu daiteke.']],
        ['6. Onarpen-baldintzak eta parte hartzeko gaitasuna', ['Parte hartzeko beharrezkoa da: (a) proba egunean 18 urte beteta izatea; (b) mendi-lasterketa luzeetan gaitasun fisiko eta aurretiko esperientzia nahikoa izatea —Ultra Trail Larre® ez da hastapenerako proba—; (c) araudi hau eta Zero Kodea (13. artikulua) berariaz onartzea izen-ematea osatzean; eta (d) parte-hartzea eragotzi edo ez gomendatzen duen inolako gaixotasunik ez izatearen adierazpena egitea, norberaren erantzukizunpean, eta 11. artikuluan aipatzen den asegurua izatea.', 'Antolakuntzak izen-emate bat ukatu edo baliogabetu ahal izango du baldintza horiek betetzen ez direla egiaztatzen badu. Ez-betetzea parte-hartzaileari egotzi badakioke —adibidez, datu faltsuak eman izana—, baliogabetzeak ez du itzulketa-eskubiderik ematen.']],
        ['7. Aurre-izen-ematea eta izen-ematea', ['Prozesua bi fasetan dago. <strong>Aurre-izen-ematea</strong>, ordainketarik gabe, 2026ko abenduaren 1ean 14:00etan irekiko da, eta azalpen pertsonal labur bat dakar, derrigorrezkoa; balioztatu egiten da, baina ez du iragazten. Ez dago dortsal-erreserbarik ez motibazio-gutunik. Aurre-izen-emateak ez du plazarik bermatzen: 300 plazak aurre-izen-emateen iritsiera-hurrenkeraren arabera esleitzen dira. <strong>Izen-ematea</strong>, ordainketarekin, 2027ko urtarrilaren 2an irekiko da; plaza ordaintzean berresten da.', 'Izen-emate kuota 185 € da banakako modalitatean eta 135 € parte-hartzaile bakoitzeko erreleboetan (3 edo 4 laguneko taldeak). Kuotak ez du asegurua barne hartzen: ikus 11. artikulua. NANa edo identifikazio-agiri bat plaza berrestean eskatuko da.']],
        ['8. Erreleboko taldeak', ['Erreleboko talde bakoitzeko kide bakoitzak banan-banan eman behar du izena, eta 6. artikuluko baldintzak ere banan-banan bete behar ditu. Taldeak askatasunez antolatzen du ibilbidearen banaketa, dortsal bakar batekin eta korrikalari batetik hurrengora ematen den tracker bakar batekin; derrigorrezko bakarra da, taldean, kontrol guztietatik pasatzea.', 'Taldearen izen-ematea kudeatzen duen pertsonak antolakuntzarekiko solaskide gisa jarduten du. Kide bakoitza banan-banan erantzule da araudi hau betetzeaz; kide baten ez-betetze larriak taldearen sailkapenari edo diskalifikazioari eragin diezaioke, 9. artikuluaren arabera.']],
        ['9. Denbora-muga eta diskalifikazioa', ['Ibilbidea osatzeko eta sailkapenean agertzeko denbora-muga <strong>60 ordu</strong>koa da, irteeratik kontatzen hasita. Denbora hori gaindituz gero, parte-hartzailea edo taldea sailkapenetik kanpo geratzen da; nahi izanez gero, norberaren erantzukizunpean jarraitu ahal izango du, antolakuntzari horren berri emanda.', 'Diskalifikazio-arrazoiak dira, besteak beste: kontrolgune batetik ez pasatzea; denbora-muga gainditzea; autohornikuntza-araubideak baimentzen ez duen kanpoko laguntza jasotzea; Zero Kodea edo araudi honetako jokabide-arauak larriki ez betetzea; eta izen-emateko edo kontroletatik pasatzeko datuak faltsutzea. Erabakia antolakuntzari dagokio, 18. artikuluko prozeduraren arabera.']],
        ['10. Erretiratzea eta proba uztea', ['Erretiratzea erabakitzen duen parte-hartzaileak ahalik eta lasterren jakinarazi behar dio antolakuntzari edo hurbilen dagoen kontrolguneari, bilaketa alferrikakorik ez abiarazteko. Antolakuntzak ez du erreskate- edo ebakuazio-zerbitzurik eskaintzen: larrialdi baten aurrean, larrialdi publikoko zerbitzuak (112) abiarazten dira. Larrialdi-araudiak bestelakorik ezartzen ez badu, lekualdatze edo ebakuazio baten kostua parte-hartzaileari berari dagokio.']],
        ['11. Parte-hartzaileen osasuna eta asegurua', ['Parte-hartzaile bakoitzak, bere kontura, mendi-lasterketa luzeen praktika estaltzen duen istripu- eta erantzukizun zibileko asegurua izan behar du indarrean proba osoan —adibidez, mendi-federazio baten lizentzia bidez edo beste baliokide bat bidez—, eta izen-emate prozesuan adierazi behar du. Antolakuntzak ez du parte-hartzailerik asegururik kontratatzen, eta ez du erantzukizunik hartzen parte-hartzailearen aseguru-falta, -nahikotasun ezta edo -iraungitzea ondorio izanik. Gainera, probaren ahaleginera egokitutako aurretiko osasun-azterketa gomendatzen da.']],
        ['12. Arriskuen onartzea eta antolakuntzaren erantzukizuna', ['Ultra Trail Larre®-n parte hartzeak mendi-lasterketa luze eta autohornikuntzako proba bati berezkoak zaizkion arriskuak onartzea dakar: besteak beste, lurra, desnibela, klima, fauna, nekea, deshidratazioa, hipotermia edo bero-kolpea, nabigazioa eta kontrolen arteko kanpo-laguntzarik eza. Parte-hartzaileak arrisku horiek askatasunez, informatuta eta borondatez onartzen ditu izena ematean, eta onartzen du antolakuntzak ezin dituela ezabatu.', 'Antolakuntzak erantzukizuna du berari egotz daitekeen ez-betetze batetik zuzenean eratorritako kalteengatik —seinaleztapen larriki akastuna, antolakuntzaren mende soilik dagoen kontrol-sistemaren hutsa, berari dagozkion segurtasun-neurriak ez betetzea—, legeria aplikagarriaren arabera, eta ez du bazter uzten bere doluzko edo erru larriko erantzukizuna, Kode Zibilaren 1.102 artikuluaren arabera.', 'Antolakuntzak ez du erantzukizunik hartzen honako hauen ondoriozko kalteengatik: artikulu honen arabera onartutako kiroleko berezko arriskuak; ezinbesteko edo zorizko kausak; parte-hartzaileak araudi hau, antolakuntzaren jarraibideak edo segurtasun-arauak ez betetzea; parte-hartzaileak berak probaren garaian hartutako erabakiak —nekearen edo lesioaren aurrean jarraitzea, materiala edo erritmoa aukeratzea, nabigazioa—; edo antolakuntzatik kanpoko hirugarrenen jarduera. Inolaz ere ez du erantzukizunik hartzen zeharkako kalte, irabazi-galera edo kalte moralengatik.', 'Hala ere, antolakuntzaren erantzukizunen bat aitortuko balitz parte-hartzaile baten aurrean probarekin lotutako gertakariengatik, erantzukizun hori mugatuta geratzen da, kontsumitzaileen araudi aplikagarriak baimentzen duen neurrian, eragindako parte-hartzaileak ordaindutako izen-emate kuotaren zenbatekora.']],
        ['13. Zero Kodea', ['Korrikalariarekin mendira sartzen dena, berarekin ateratzen da. Debekatuta dago ibilbidean edozein hondakin uztea. Antolakuntzak edo kontrolgune batek egiaztatutako ez-betetzea denbora-zehapen batekin zehatzen da, edo, ez-betetze larri edo errepikatua izanez gero, diskalifikazioarekin.']],
        ['14. Kirol-jokabidea eta dopina', ['Edonoiz exigitzen da joko garbia, gainerako parte-hartzaileekiko, ibilbidean aurkitzen diren pertsona eta abelburuekiko errespetua, eta proba gertatzen den ingurune naturalarekiko errespetua. Debekatuta dago autohornikuntza-araubideak baimentzen ez duen kanpoko laguntza jasotzea eta kirolari aplikagarri zaion dopin-araudiak debekatutako substantzia edo metodoak erabiltzea. Antolakuntzak organismo eskudun batek ezarritako dopin-zehapen indarrean duen edozein parte-hartzaile baztertu edo diskalifikatu ahal izango du.']],
        ['15. Irudi-eskubideak', ['Parte-hartzaileak antolakuntzari baimena ematen dio, doan, probaren garaian hartutako bere irudia eta ahotsa (argazkiak, bideoa, emaitzak eta sailkapen-datuak) jaso eta erabiltzeko, Ultra Trail Larre®-ren eta Musubigara®-ren informazio-, promozio- eta komunikazio-helburuetarako, webgunean, sare sozialetan eta zabalkunde-materialetan, 1/1982 Lege Organikoaren 8.2.c) artikuluaren arabera. Baimen hori eman nahi ez duenak idatziz jakinarazi behar dio antolakuntzari proba hasi aurretik; ukatzeak ez du parte hartzea eragozten, antolakuntzak ibilbideko, irteerako edo helmugako talde-irudietatik bere irudia baztertzea bermatu ezin badu ere.']],
        ['16. Proba aldatzea, atzeratzea eta bertan behera uztea', ['Antolakuntzak ibilbidea, formatua edo datak alda ditzake segurtasun-, klima-, administrazio-baimen- edo ezinbesteko arrazoiengatik, izena eman duten parte-hartzaileei jakinaraziz. Antolakuntzaren erabakiz proba bertan behera uzten bada edo data berriago batera atzeratzen bada, kuotaren itzulketa diruz ez da bideratuko: izena eman duen parte-hartzaile bakoitzak bere kuotaren zenbateko osoagatik hurrengo edizioan parte hartzeko bono bat jasoko du.']],
        ['17. Borondatezko baja eta itzulketak', ['Izen-emate kuota ez da itzulgarria parte-hartzailearen borondatezko bajaren kasuan, arrazoia dena dela —osasun-, lan- edo arrazoi pertsonalak barne—, 16. artikuluan antolakuntzaren erabakiz bertan behera uzteko edo atzeratzeko aurreikusitakoa izan ezik. Dortsala beste pertsona bati lagatzea ez da onartzen.']],
        ['18. Erreklamazioak eta diziplina-araubidea', ['Sailkapena behin-behinekotasunez argitaratzen da. Sailkapenari edo araudi honen aplikazioari buruzko edozein erreklamazio idatziz aurkeztu behar da antolakuntzari, haren harremanetarako bide ofizialaren bidez, sailkapen behin-behinekoa argitaratu edo erreklamatutako gertakaria izan eta hurrengo 15 egunetan. Antolakuntzak arrazoituta ebazten du, eta erabaki horrek barne-bide kirol administratiboa amaitzen du, parte-hartzaileak bide judizialera jotzeko duen eskubidea albo batera utzi gabe, 20. artikuluaren arabera.']],
        ['19. Datuen babesa eta jabetza intelektuala', ['Izen-ematean emandako datu pertsonalen tratamendua <a href="{priv}">pribatutasun-politikak</a> arautzen du. Araudi honetako eta webguneko testuak, ibilbidea, logotipoak eta gainerako edukiak, baita Ultra Trail Larre® marka ere, <a href="{aviso}">lege-oharrak</a> arautzen ditu.']],
        ['20. Onarpena, araudiaren aldaketak eta legeria aplikagarria', ['Izen-ematea osatzean, parte-hartzaileak araudi hau osorik onartzen du. Antolakuntzak araudi honen bertsio eguneratuak argitara ditzake probaren aurretik; indarrean dagoen bertsioa beti da orrialde honetan argitaratua dagoena, hasieran ageri den «Azken eguneratzea» datarekin. Araudi hau Espainiako legeriak arautzen du. Edozein eztabaidarako, aldeek Gasteizko epaitegi eta auzitegien mende jartzen dira, kontsumitzaileen eta erabiltzaileen araudiak beste foru nahitaezko bat ezartzen ez badu.']]
      ]
    }
  }
};
