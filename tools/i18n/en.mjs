/* English content. Official facts only (tools/data/hechos.json). Written for the ultra community, not translated word for word. */
export default {
  lang: 'en',
  locale: 'en_GB',
  label: 'English',
  paths: { home: '/en/', aviso: '/en/legal-notice/', priv: '/en/privacy-policy/' },
  meta: {
    title: 'Ultra Trail Larre® · Self-supported ultra in Álava, autumn 2027',
    description: 'A self-supported ultra across the mountains of Álava: a 226.9 km loop with 4,825 m of climbing from Vitoria-Gasteiz. 300 places. First edition, autumn 2027.',
    ogLine: 'Self-supported ultra · Álava · autumn 2027',
    ogAlt: 'Ultra Trail Larre®: a self-supported ultra across the mountains of Álava, autumn 2027'
  },
  ui: {
    skip: 'Skip to content',
    home: 'Ultra Trail Larre®, home',
    menu: 'Menu',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    langNav: 'Language',
    index: 'Section index',
    close: 'Close',
    prev: 'Previous photo',
    next: 'Next photo',
    viewPost: 'View on Instagram',
    followIg: 'Follow on Instagram',
    copy: 'Copy code',
    copied: 'Code copied',
    new: 'opens in a new tab',
    download: 'Download',
    footerOrg: 'Organised by',
    legal: 'Legal notice',
    privacy: 'Privacy policy',
    rights: 'All rights reserved.',
    back: 'Back to the site',
    backMenu: 'Back to menu',
    ctaPre: 'Pre-registration',
    ctaWa: "Let's talk"
  },
  nav: [
    ['la-carrera', 'The race'],
    ['ruta', 'Route'],
    ['codigo-cero', 'Zero Waste Code'],
    ['instagram', 'Photos'],
    ['preinscripcion', 'Pre-registration'],
    ['descargas', 'Downloads'],
    ['faq', 'FAQ'],
    ['colabora', 'Partner with us'],
    ['contacto', 'Contact']
  ],
  hero: {
    eyebrow: 'First edition · autumn 2027',
    claim: 'Just you, a tracker and your brevet.',
    sub: 'A self-supported ultra across the mountains of Álava. A 226.9 km loop that starts and finishes in Vitoria-Gasteiz.',
    cta: 'Pre-register',
    cta2: 'See the route',
    facts: [
      ['226.9', 'km loop'],
      ['+4,825', 'm of climbing'],
      ['300', 'places'],
      ['La Florida', 'start and finish, Vitoria-Gasteiz']
    ]
  },
  race: {
    h2: 'The race',
    lead: 'One start, one finish and the mountains of Álava in between. What happens between the two is up to you.',
    blocks: [
      ['Self-supported', 'Ultra Trail Larre® is a self-supported ultra: no outside assistance and no organiser aid stations. You decide what to carry, when to eat, when to sleep and how to manage your water. You prepare for it like an expedition, not like a circuit.'],
      ['Just you, a tracker and your brevet', 'A tracker follows you for the whole race, and your brevet records your passage through the controls. Navigation is part of the challenge.'],
      ['Philosophy', 'It is not a mass-participation race and does not want to be. There are 300 places, and that number is an identity, not a market parameter. For many people, the challenge will simply be to finish.'],
      ['The mountains', 'We cross ranges, villages and vineyards of Álava where people live all year round. We pass through with respect and leave no trace: that is the condition for coming back.']
    ],
    forYouH: 'Is it for you?',
    forYou: 'Ultra Trail Larre® is not a beginner’s race. It asks for previous long-distance experience, a cool head in the small hours and acceptance of the Zero Waste Code. If that sounds more like a privilege than a sacrifice, this is your race.'
  },
  zero: {
    h2: 'Zero Waste Code',
    lead: 'What goes into the mountains with you comes out of the mountains with you. The only trace we leave is our footprints.',
    blocks: [
      ['Your bag', 'Your own rubbish bag in a fixed pocket, always the same one.'],
      ['Every wrapper', 'Gel and bar tabs tied or pocketed the moment you open them, never “later”.'],
      ['Before the start', 'Decant what you can into reusable bags so you carry less packaging from the beginning.']
    ],
    note: 'The specific conditions of the Zero Waste Code will be detailed in the final <a href="{reglamento}">rules</a>. More ideas in the <a href="{guia}">self-sufficiency guide</a>.'
  },
  route: {
    h2: 'The route',
    lead: 'A 226.9 km loop with 4,825 m of climbing, starting and finishing at the bandstand in La Florida Park, Vitoria-Gasteiz.',
    figs: [
      ['Distance', '226.9 km'],
      ['Elevation gain', '+4,825 m'],
      ['Start and finish', 'La Florida Park'],
      ['Controls', '6 (4 confirmed)']
    ],
    mapTitle: 'Route map',
    mapAlt: 'Schematic map of the 226.9 km loop, starting and finishing at La Florida Park in Vitoria-Gasteiz, with the four confirmed controls: Peñacerrada, Laguardia, Santa Cruz de Campezo and Agurain.',
    startLabel: 'Start and finish',
    profileTitle: 'Elevation profile',
    profileSub: 'One column per kilometre, from the track. From the lowest point, {min} m, to the highest, {max} m.',
    profileAlt: 'Elevation profile of the route, one column per kilometre, between {min} and {max} metres.',
    kmAxis: 'km',
    ctrlTitle: 'Confirmed controls',
    ctrlHead: ['Control', 'Approx. km on the track'],
    ctrlNote: 'There are six controls in total: these four are confirmed and the other two are still to be defined. Kilometres are approximate and follow the direction of the published track.',
    towns: { penacerrada: 'Peñacerrada', laguardia: 'Laguardia', campezo: 'Santa Cruz de Campezo', agurain: 'Agurain' },
    gpx: 'Download the track (GPX)',
    mapsStart: 'How to get to the start'
  },
  ig: {
    h2: 'Photos',
    lead: 'From the mountains. The latest from @ultratraillarre.',
    gallery: 'Instagram photo gallery',
    open: 'Enlarge photo {n} of {total}',
    dialog: 'Photo viewer',
    counter: 'Photo {n} of {total}'
  },
  pre: {
    h2: 'Pre-registration',
    lead: '300 places, allocated in order of pre-registration.',
    points: [
      'The pre-registration list opens on <strong>1 December 2026</strong>.',
      'It includes a short personal description, which is compulsory: it is there to validate your pre-registration, not to filter applicants.',
      'There is no bib reservation and no motivation letter.',
      '<strong>Pre-registering does not guarantee a place.</strong> You will receive a reference code, and we will email you the payment date in March.',
      'We do not ask for your ID number at this stage; we will ask when you confirm your place.'
    ],
    closedTitle: 'Not open yet',
    closedText: 'Pre-registration opens on 1 December 2026. When that day comes, you will be able to fill in the form here.',
    unavailable: 'We could not check whether pre-registration is open. Reload the page or write to us at {email}.',
    form: {
      legend: 'Your details',
      nombre: 'First name',
      apellidos: 'Surname',
      edad: 'Age',
      sexo: 'Sex',
      sexoOpts: [['mujer', 'Female'], ['hombre', 'Male'], ['otro', 'Other / prefer not to say']],
      sexoPh: 'Choose an option',
      email: 'Email address',
      referencias: 'Previous races and references',
      referenciasHint: 'Optional. Long races, ultras, crossings or challenges you have completed.',
      federado: 'Are you a member of a mountaineering federation?',
      si: 'Yes',
      no: 'No',
      federacion: 'Which federation?',
      descripcion: 'Personal description',
      descripcionHint: 'Short and compulsory. Tell us who you are and why you want to run it. It validates your pre-registration; it does not filter.',
      observaciones: 'Comments',
      observacionesHint: 'Optional. Allergies, questions, anything you want us to know.',
      consent: 'I have read the <a href="{priv}">privacy policy</a> and consent to my data being processed to manage my pre-registration.',
      submit: 'Send pre-registration',
      sending: 'Sending…',
      required: 'required',
      count: '{n} / {max}'
    },
    errors: {
      title: 'Please check these fields:',
      required: 'This field is required.',
      email: 'Enter a valid email address.',
      age: 'Enter an age between 18 and 99.',
      min: 'Tell us a little more (at least {min} characters).',
      consent: 'We need your consent to continue.',
      network: 'We could not send the form. Check your connection and try again, or write to us at {email}.',
      server: 'Something went wrong on our side. Nothing has been lost: try again in a few minutes or write to us at {email}.',
      closed: 'Pre-registration is not open yet. It opens on 1 December 2026.',
      rate: 'You have sent several forms in a row. Wait a few minutes and try again.',
      spam: 'We could not validate the submission. Reload the page and try again.'
    },
    ok: {
      title: 'Pre-registration received',
      lead: 'Thank you, {nombre}. This is your reference code:',
      already: 'You were already pre-registered with this email. This is your reference code:',
      next: 'We have sent a confirmation email to <strong>{email}</strong>. If you cannot see it within a few minutes, check your spam folder.',
      steps: ['Keep your code: you will need it for any enquiry.', 'Pre-registering does not guarantee a place.', 'We will email you the payment date in March.'],
      mailFailed: 'Your pre-registration has been saved, but we could not send you the confirmation email. Keep this code and write to us at {email} if you need it.'
    }
  },
  dl: {
    h2: 'Downloads',
    lead: 'To read at your own pace and take with you.',
    items: {
      guia: ['Self-sufficiency guide', 'How to prepare for and run an ultra without assistance: water, food, sleep, kit and navigation.'],
      reglamento: ['Race rules', 'The essential rules of the first edition published so far. The final version will be published before registration.'],
      gpx: ['Route track', 'The whole route as a GPX file, with the start and finish marked, ready to load onto your watch or phone.']
    },
    version: 'version',
    pdf: 'PDF'
  },
  faq: {
    h2: 'FAQ',
    lead: 'The essentials, plainly. If something is missing, write to us.',
    items: [
      ['When is the race?', 'The first edition takes place in <strong>autumn 2027</strong>. We have not published the exact day yet.'],
      ['Where are the start and the finish?', 'At the bandstand in La Florida Park, Vitoria-Gasteiz. The route is a loop: you start and finish in the same place.'],
      ['How long is it and how much climbing?', '<strong>226.9 km</strong> and <strong>+4,825 m</strong> of elevation gain, self-supported.'],
      ['When does pre-registration open?', 'The pre-registration list opens on <strong>1 December 2026</strong>.'],
      ['How are the 300 places allocated?', 'In order of pre-registration. The short personal description is compulsory: it validates your pre-registration and does not filter applicants. There is no bib reservation and no motivation letter.'],
      ['Does pre-registering guarantee a place?', 'No. When you pre-register you receive a reference code by email, and we will email you the payment date in March.'],
      ['What data do you ask for?', 'First name, surname, age, sex, email, previous races, whether you are a member of a mountaineering federation, a short personal description and, if you wish, comments. We will ask for your ID number when you confirm your place.'],
      ['What does self-supported mean?', 'No outside assistance and no organiser aid stations: you carry what you need and manage your own water, food and sleep. The <a href="{guia}">self-sufficiency guide</a> explains it in detail.'],
      ['How do the controls work?', 'There are six controls. Four are confirmed (Agurain, Santa Cruz de Campezo, Laguardia and Peñacerrada) and the other two are still to be defined. A tracker follows you throughout the race and your brevet records your passage.'],
      ['Is it a good first race of this kind?', 'Honestly, no. Ultra Trail Larre® asks for previous long-distance experience. For your first steps in self-supported racing, the guide suggests shorter distances.'],
      ['What is the Zero Waste Code?', 'What goes into the mountains with you comes out with you. It is set out in the <a href="{reglamento}">race rules</a>.'],
      ['Where can I read the rules?', 'In <a href="{reglamento}">this PDF</a>, with the essential rules published so far. The rest will be published in the final version.']
    ]
  },
  partners: {
    h2: 'Partner with us',
    lead: 'Ultra Trail Larre® is a small race, made with care. If you want to get involved, we start with a conversation, not a deck.',
    types: [
      ['Brands', 'Durable, well-made kit and products that make sense in the mountains. Tell us what you would do and why it fits.'],
      ['Institutions', 'Territory, support and open doors: bodies that want their region to be discovered with respect.'],
      ['Media', 'A point of view, a story and a loudspeaker for a race that prefers silence, aimed at the ultra community.'],
      ['Event operators', 'Tracking, safety, logistics and production: the expertise that keeps the infrastructure invisible.']
    ],
    formTitle: 'Tell us your idea',
    form: {
      empresa: 'Company or organisation',
      persona: 'Contact person',
      cargo: 'Job title',
      email: 'Email address',
      tipo: 'Type of partnership',
      tipoPh: 'Choose an option',
      tipoOpts: [['marca', 'Brand'], ['institucion', 'Institution'], ['medio', 'Media outlet'], ['operador', 'Event operator'], ['otro', 'Other']],
      mensaje: 'Message',
      mensajeHint: 'What you would like to do and what you expect from the conversation.',
      consent: 'I have read the <a href="{priv}">privacy policy</a> and consent to my data being processed to deal with my proposal.',
      submit: 'Send message',
      sending: 'Sending…'
    },
    errors: {
      title: 'Please check these fields:',
      required: 'This field is required.',
      email: 'Enter a valid email address.',
      min: 'Tell us a little more (at least {min} characters).',
      consent: 'We need your consent to continue.',
      network: 'We could not send the message. Check your connection and try again, or write to us at {email}.',
      server: 'Something went wrong on our side. Try again in a few minutes or write to us at {email}.',
      rate: 'You have sent several messages in a row. Wait a few minutes and try again.',
      spam: 'We could not validate the submission. Reload the page and try again.'
    },
    ok: {
      title: 'Message received',
      lead: 'Thank you, {nombre}. We have sent a confirmation email to <strong>{email}</strong> and we will reply personally.',
      mailFailed: 'Your message has been saved, but we could not send you the confirmation. We will reply all the same.'
    }
  },
  contact: {
    h2: 'Contact',
    lead: 'Questions, ideas, or just want to tell us why you want to run it? Write to us.',
    labels: { email: 'Email', ig: 'Instagram', wa: 'WhatsApp', map: 'Start and finish' },
    mapText: 'La Florida Park, Vitoria-Gasteiz',
    waText: 'Message us on WhatsApp',
    waMsg: 'Hello, I would like to talk about Ultra Trail Larre®',
    org: 'Ultra Trail Larre® is organised by <a href="https://musubigara.org/en/" rel="noopener">Musubigara®</a>.'
  },
  aria: { social: 'Social media and contact', ig: 'Ultra Trail Larre® on Instagram', wa: 'WhatsApp', map: 'How to get to the start, La Florida Park' },
  notFound: { title: 'Page not found', text: 'This address does not exist or has moved. Go back to the home page or write to us if you were looking for something specific.', home: 'Go to the home page' },
  legal: {
    updated: 'Last updated',
    aviso: {
      title: 'Legal notice',
      metaDesc: 'Legal notice of ultratraillarre.org, the website of Ultra Trail Larre®.',
      date: '3 November 2026',
      sections: [
        ['1. Identification details', ['In compliance with Article 10 of Spanish Law 34/2002 on Information Society Services and Electronic Commerce (LSSI-CE), this website is owned by:', '<strong>Owner:</strong> Ignacio Sanz Arana, holder of the Ultra Trail Larre® brand (organised by Musubigara®).<br><strong>Tax ID (NIF):</strong> 72752567W<br><strong>Address:</strong> Pintor Pablo Uranga 12, 01008, Vitoria-Gasteiz (Álava), Spain.<br><strong>Email:</strong> <a href="mailto:ignacio@musubigara.org">ignacio@musubigara.org</a>']],
        ['2. Purpose and terms of use', ['This website presents the Ultra Trail Larre® race and lets you pre-register and contact the organisers. Accessing and using the site makes you a user and implies acceptance of this legal notice. Users agree to use the content appropriately, in accordance with the law, good faith and public order.']],
        ['3. Informational nature', ['The information published (dates, route, places, controls and conditions) is for information only and is subject to change and, where applicable, to the administrative authorisations required to hold the race. Pre-registering does not guarantee a place and is not an entry to the race. The final conditions will be set out in the race rules and in the registration process.']],
        ['4. Intellectual and industrial property', ['The texts, designs, images, logos, structure and other content of this website, and the Ultra Trail Larre® brand, belong to their owner or are used with due authorisation. Reproduction, distribution, public communication or transformation without express written authorisation is prohibited.']],
        ['5. Liability', ['Every effort is made to keep the information accurate and up to date, but the absence of errors and the continuous availability of the site are not guaranteed. The website may contain links to third-party sites (social media, WhatsApp, maps) over whose content we have no control and for which we accept no responsibility.']],
        ['6. Data protection', ['Personal data is processed in accordance with the <a href="{priv}">privacy policy</a>.']],
        ['7. Governing law and jurisdiction', ['This legal notice is governed by Spanish law. For any dispute, the parties submit to the courts of Vitoria-Gasteiz, unless consumer protection legislation establishes a different mandatory jurisdiction.']]
      ]
    },
    priv: {
      title: 'Privacy policy',
      metaDesc: 'Privacy policy of ultratraillarre.org: what data we process when you pre-register or contact us, why, and for how long.',
      date: '3 November 2026',
      sections: [
        ['1. Data controller', ['<strong>Owner:</strong> Ignacio Sanz Arana, holder of the Ultra Trail Larre® brand (organised by Musubigara®).<br><strong>Tax ID (NIF):</strong> 72752567W<br><strong>Address:</strong> Pintor Pablo Uranga 12, 01008, Vitoria-Gasteiz (Álava), Spain.<br><strong>Email:</strong> <a href="mailto:ignacio@musubigara.org">ignacio@musubigara.org</a>']],
        ['2. What data we process and why', ['We only process the data you give us, in three ways.', '<strong>2.1. Pre-registration form.</strong> First name and surname, age, sex, email address, previous races (optional), whether you are a member of a mountaineering federation and which one, your personal description, comments (optional), the language of the page and the date and time of submission. We also generate a unique reference code. The purpose is to manage your pre-registration: validate it, allocate places in order of arrival, send you the confirmation and email you the payment date. We do not ask for your ID number at this stage; if you confirm your place, we will ask for it then and tell you so at that moment.', '<strong>2.2. “Partner with us” form.</strong> Company or organisation, name, job title, email address, type of partnership and message. The purpose is to deal with your proposal and reply to you.', '<strong>2.3. Contact by email or WhatsApp.</strong> Name, email address or phone number and the content of your message, to answer your enquiry.', 'Pre-registering does not reserve a bib, does not enter you in the race and does not subscribe you to any newsletter. We do not build profiles or take automated decisions.']],
        ['3. Legal basis', ['Your express consent (Art. 6.1.a GDPR), given by ticking the box before sending each form or by writing to us. You can withdraw it at any time without affecting the lawfulness of the earlier processing. When your message seeks a partnership, we also apply pre-contractual measures at your request (Art. 6.1.b GDPR).']],
        ['4. Recipients and international transfers', ['We do not pass your data to third parties unless legally required. We rely on providers acting as processors on our behalf:', '<strong>Netlify, Inc.</strong> (United States): website hosting, the functions that process the forms and storage of submissions.<br><strong>Resend, Inc.</strong> (United States): sending of confirmation and notification emails.<br><strong>Google Ireland Limited</strong>: the email service from which we answer your messages.<br><strong>Meta Platforms Ireland Ltd.</strong>, only if you decide to write to us on WhatsApp or visit Instagram, under their own policy.', 'Hosting and email sending involve international transfers of data to the United States, covered by the European Commission’s standard contractual clauses or the EU–US Data Privacy Framework, depending on the provider. Fonts, images and other resources are served from our own domain, with no requests to third-party servers.']],
        ['5. Retention', ['<strong>Pre-registration:</strong> until the race takes place, planned for autumn 2027, and then blocked for the limitation periods of possible liabilities. Deleted earlier if you withdraw your consent or request erasure.', '<strong>Partner form and contact:</strong> for as long as your proposal or enquiry is being handled and then blocked for the statutory limitation periods.']],
        ['6. Your rights', ['You may exercise your rights of access, rectification, erasure, objection, restriction of processing and portability, and withdraw your consent at any time, by writing to <a href="mailto:ignacio@musubigara.org">ignacio@musubigara.org</a> stating the right you wish to exercise and your reference code, if you have one. If you believe your rights have not been respected, you may lodge a complaint with the Spanish Data Protection Agency (<a href="https://www.aepd.es/" rel="noopener">www.aepd.es</a>).']],
        ['7. Cookies and analytics', ['This website does not set its own or third-party cookies and does not use advertising tools. The language preference is reflected only in the page address (/, /eu/ and /en/). If analytics or non-exempt cookies are added in the future, this policy will be updated and, where required, your prior consent will be requested.']],
        ['8. Minors', ['Pre-registration and participation in the race are intended for adults. We do not knowingly process data of minors without the consent of their legal guardians.']],
        ['9. Security and changes', ['We apply reasonable technical and organisational measures to protect your data: encrypted connections, keys kept out of the source code and restricted access to submissions. We may update this policy to reflect legal or website changes; the current version is always the one published here.']]
      ]
    }
  }
};
