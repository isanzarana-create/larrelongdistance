/* Contenido en castellano. Solo hechos oficiales (tools/data/hechos.json). */
export default {
  lang: 'es',
  locale: 'es_ES',
  label: 'Castellano',
  paths: { home: '/', aviso: '/aviso-legal/', priv: '/politica-privacidad/' },
  meta: {
    title: 'Ultra Trail Larre® · Ultra-trail en autosuficiencia, Álava 2027',
    description: 'Ultra-trail en autosuficiencia por las sierras de Álava: 227,5 km y +5.293 m en lazo desde Vitoria-Gasteiz. 300 plazas. I Edición, otoño de 2027.',
    ogLine: 'Ultra-trail en autosuficiencia · Álava · otoño de 2027',
    ogAlt: 'Ultra Trail Larre®: ultra-trail en autosuficiencia por las sierras de Álava, otoño de 2027'
  },
  ui: {
    skip: 'Saltar al contenido',
    home: 'Ultra Trail Larre®, inicio',
    menu: 'Menú',
    menuOpen: 'Abrir menú',
    menuClose: 'Cerrar menú',
    langNav: 'Idioma',
    index: 'Índice de secciones',
    close: 'Cerrar',
    prev: 'Foto anterior',
    next: 'Foto siguiente',
    viewPost: 'Ver en Instagram',
    followIg: 'Seguir en Instagram',
    copy: 'Copiar código',
    copied: 'Código copiado',
    new: 'se abre en una pestaña nueva',
    download: 'Descargar',
    footerOrg: 'Organiza',
    legal: 'Aviso legal',
    privacy: 'Política de privacidad',
    rights: 'Todos los derechos reservados.',
    back: 'Volver a la web'
  },
  nav: [
    ['la-carrera', 'La carrera'],
    ['ruta', 'Ruta'],
    ['instagram', 'Instagram'],
    ['preinscripcion', 'Preinscripción'],
    ['descargas', 'Descargas'],
    ['faq', 'Preguntas frecuentes'],
    ['colabora', 'Colabora'],
    ['contacto', 'Contacto']
  ],
  hero: {
    eyebrow: 'I Edición · otoño de 2027',
    claim: 'Solo tú, un tracker y tu brevet.',
    sub: 'Ultra-trail en autosuficiencia por las sierras de Álava. Un lazo de 227,5 km que sale y llega a Vitoria-Gasteiz.',
    cta: 'Preinscribirme',
    cta2: 'Ver la ruta',
    facts: [
      ['227,5', 'km en lazo'],
      ['+5.293', 'm de desnivel positivo'],
      ['300', 'plazas'],
      ['La Florida', 'salida y meta, Vitoria-Gasteiz']
    ]
  },
  race: {
    h2: 'La carrera',
    lead: 'Una salida, una meta y las sierras de Álava en medio. Lo que ocurra entre una y otra lo resuelves tú.',
    blocks: [
      ['Autosuficiencia', 'Ultra Trail Larre® es un ultra-trail en autosuficiencia: sin asistencia externa y sin avituallamientos de organización. Decides qué llevas, cuándo comes, cuándo duermes y cómo gestionas el agua. Se prepara como una expedición, no como un circuito.'],
      ['Solo tú, un tracker y tu brevet', 'Un tracker te sigue durante toda la carrera y el brevet recoge tu paso por los controles. La navegación forma parte de la prueba.'],
      ['Filosofía', 'No es una carrera de masas ni pretende serlo. Son 300 plazas, y esa cifra es identidad, no un parámetro de mercado. Para muchas personas, el reto será simplemente llegar.'],
      ['Cero residuos', 'Lo que entra contigo en el monte, sale contigo del monte. La única huella que dejamos es la pisada.'],
      ['El monte', 'Cruzamos sierras, pueblos y viñedos de Álava que viven ahí todo el año. Pasamos con respeto y sin dejar rastro: esa es la condición para volver.']
    ],
    forYouH: '¿Es para ti?',
    forYou: 'Ultra Trail Larre® no es una carrera de iniciación. Pide experiencia previa en larga distancia, cabeza fría de madrugada y aceptar la regla de cero residuos. Si eso te suena menos a renuncia que a privilegio, esta es tu carrera.'
  },
  route: {
    h2: 'La ruta',
    lead: 'Un lazo de 227,5 km y +5.293 m con salida y meta en el quiosco del Parque de La Florida, en Vitoria-Gasteiz.',
    figs: [
      ['Distancia', '227,5 km'],
      ['Desnivel positivo', '+5.293 m'],
      ['Salida y meta', 'Parque de La Florida'],
      ['Controles', '6 (4 confirmados)']
    ],
    mapTitle: 'Mapa del recorrido',
    mapAlt: 'Mapa esquemático del lazo de 227,5 km con la salida y meta en el Parque de La Florida (Vitoria-Gasteiz) y los cuatro controles confirmados: Peñacerrada, Laguardia, Santa Cruz de Campezo y Agurain.',
    startLabel: 'Salida y meta',
    profileTitle: 'Perfil de altitud',
    profileSub: 'Una columna por kilómetro, según el track. Del punto más bajo, {min} m, al más alto, {max} m.',
    profileAlt: 'Perfil de altitud del recorrido, una columna por kilómetro, entre {min} y {max} metros.',
    kmAxis: 'km',
    ctrlTitle: 'Controles confirmados',
    ctrlHead: ['Control', 'Km aprox. en el track'],
    ctrlNote: 'Hay seis controles en total: estos cuatro están confirmados y los otros dos están aún por definir. Los kilómetros son aproximados y siguen el sentido del track publicado.',
    towns: { penacerrada: 'Peñacerrada', laguardia: 'Laguardia', campezo: 'Santa Cruz de Campezo', agurain: 'Agurain' },
    gpx: 'Descargar el track (GPX)',
    mapsStart: 'Cómo llegar a la salida'
  },
  ig: {
    h2: 'Instagram',
    lead: 'Desde el monte. Lo último de @ultratraillarre.',
    gallery: 'Galería de fotos de Instagram',
    open: 'Ampliar foto {n} de {total}',
    dialog: 'Visor de fotos',
    counter: 'Foto {n} de {total}'
  },
  pre: {
    h2: 'Preinscripción',
    lead: '300 plazas, asignadas por orden de llegada de la preinscripción.',
    points: [
      'La lista de preinscritos se abre el <strong>1 de diciembre de 2026</strong>.',
      'Incluye una breve descripción personal, obligatoria: sirve para validar la preinscripción, no para filtrar.',
      'No hay reserva de dorsales ni carta de motivación.',
      '<strong>La preinscripción no garantiza plaza.</strong> Recibirás un código de referencia y te comunicaremos la fecha de pago por email en marzo.',
      'En esta fase no pedimos el DNI: lo haremos al confirmar plaza.'
    ],
    closedTitle: 'Todavía no está abierta',
    closedText: 'La preinscripción se abre el 1 de diciembre de 2026. Cuando llegue ese día podrás rellenar aquí el formulario.',
    unavailable: 'No hemos podido comprobar si la preinscripción está abierta. Recarga la página o escríbenos a {email}.',
    form: {
      legend: 'Tus datos',
      nombre: 'Nombre',
      apellidos: 'Apellidos',
      edad: 'Edad',
      sexo: 'Sexo',
      sexoOpts: [['mujer', 'Mujer'], ['hombre', 'Hombre'], ['otro', 'Otro / prefiero no indicarlo']],
      sexoPh: 'Elige una opción',
      email: 'Correo electrónico',
      referencias: 'Referencias en otras pruebas',
      referenciasHint: 'Opcional. Pruebas largas, ultras, travesías o retos que hayas completado.',
      federado: '¿Estás federado/a en montaña?',
      si: 'Sí',
      no: 'No',
      federacion: '¿En qué federación?',
      descripcion: 'Descripción personal',
      descripcionHint: 'Breve y obligatoria. Cuéntanos quién eres y por qué quieres correrla. Sirve para validar la preinscripción; no filtra.',
      observaciones: 'Observaciones',
      observacionesHint: 'Opcional. Alergias, dudas, lo que quieras que sepamos.',
      consent: 'He leído la <a href="{priv}">política de privacidad</a> y consiento el tratamiento de mis datos para gestionar mi preinscripción.',
      submit: 'Enviar preinscripción',
      sending: 'Enviando…',
      required: 'obligatorio',
      count: '{n} / {max}'
    },
    errors: {
      title: 'Revisa estos campos:',
      required: 'Este campo es obligatorio.',
      email: 'Escribe un correo electrónico válido.',
      age: 'Indica una edad entre 18 y 99 años.',
      min: 'Cuéntanos un poco más (mínimo {min} caracteres).',
      consent: 'Necesitamos tu consentimiento para poder continuar.',
      network: 'No hemos podido enviar el formulario. Comprueba tu conexión e inténtalo de nuevo, o escríbenos a {email}.',
      server: 'Algo ha fallado de nuestro lado. No se ha perdido nada: inténtalo de nuevo en unos minutos o escríbenos a {email}.',
      closed: 'La preinscripción todavía no está abierta. Se abre el 1 de diciembre de 2026.',
      rate: 'Has enviado varios formularios seguidos. Espera unos minutos e inténtalo de nuevo.',
      spam: 'No hemos podido validar el envío. Recarga la página e inténtalo de nuevo.'
    },
    ok: {
      title: 'Preinscripción recibida',
      lead: 'Gracias, {nombre}. Este es tu código de referencia:',
      already: 'Ya estabas preinscrito/a con este correo. Este es tu código de referencia:',
      next: 'Te hemos enviado un correo de confirmación a <strong>{email}</strong>. Si no lo ves en unos minutos, revisa la carpeta de spam.',
      steps: ['Guarda tu código: lo necesitarás para cualquier consulta.', 'La preinscripción no garantiza plaza.', 'Te comunicaremos la fecha de pago por email en marzo.'],
      mailFailed: 'Tu preinscripción se ha guardado, pero no hemos podido enviarte el correo de confirmación. Guarda este código y escríbenos a {email} si lo necesitas.'
    }
  },
  dl: {
    h2: 'Descargas',
    lead: 'Para leer con calma y llevar contigo.',
    items: {
      guia: ['Guía de autosuficiencia', 'Cómo se prepara y se corre un ultra-trail sin asistencia: agua, comida, sueño, material y navegación.'],
      reglamento: ['Reglamento', 'Las normas esenciales de la I Edición publicadas hasta ahora. La versión definitiva se publicará antes de la inscripción.'],
      gpx: ['Track de la ruta', 'El recorrido completo en GPX, con la salida y meta marcadas, listo para cargar en tu reloj o en tu móvil.']
    },
    version: 'versión',
    pdf: 'PDF'
  },
  faq: {
    h2: 'Preguntas frecuentes',
    lead: 'Lo esencial, sin rodeos. Si falta algo, escríbenos.',
    items: [
      ['¿Cuándo es la carrera?', 'La I Edición se celebrará en <strong>otoño de 2027</strong>. Todavía no hemos publicado el día exacto.'],
      ['¿Dónde está la salida y dónde la meta?', 'En el quiosco del Parque de La Florida, en Vitoria-Gasteiz. La ruta es un lazo: sales y llegas al mismo sitio.'],
      ['¿Qué distancia y desnivel tiene?', '<strong>227,5 km</strong> y <strong>+5.293 m</strong> de desnivel positivo, en autosuficiencia.'],
      ['¿Cuándo se abre la preinscripción?', 'La lista de preinscritos se abre el <strong>1 de diciembre de 2026</strong>.'],
      ['¿Cómo se asignan las 300 plazas?', 'Por orden de llegada de la preinscripción. La breve descripción personal es obligatoria: sirve para validar la preinscripción, no para filtrar. No hay reserva de dorsales ni carta de motivación.'],
      ['¿La preinscripción garantiza plaza?', 'No. Al preinscribirte recibes un código de referencia por email y te comunicaremos la fecha de pago, también por email, en marzo.'],
      ['¿Qué datos pedís?', 'Nombre, apellidos, edad, sexo, correo, referencias en otras pruebas, si estás federado/a en montaña, una breve descripción personal y, si quieres, observaciones. El DNI lo pediremos al confirmar plaza.'],
      ['¿Qué significa autosuficiencia?', 'Sin asistencia externa y sin avituallamientos de organización: llevas lo que necesitas y gestionas tú el agua, la comida y el sueño. La <a href="{guia}">guía de autosuficiencia</a> lo explica con detalle.'],
      ['¿Cómo funcionan los controles?', 'Hay seis controles. Cuatro están confirmados (Agurain, Santa Cruz de Campezo, Laguardia y Peñacerrada) y los otros dos están por definir. Un tracker te sigue durante toda la carrera y el brevet recoge tu paso.'],
      ['¿Es una buena primera carrera de este tipo?', 'Honestamente, no. Ultra Trail Larre® pide experiencia previa en larga distancia. Para dar los primeros pasos en autosuficiencia, la guía propone distancias menores.'],
      ['¿Qué es el cero residuos?', 'Lo que entra contigo en el monte, sale contigo del monte. Lo recoge el <a href="{reglamento}">reglamento</a>.'],
      ['¿Dónde está el reglamento?', 'En <a href="{reglamento}">este PDF</a>, con las normas esenciales publicadas hasta ahora. El resto se publicará en la versión definitiva.']
    ]
  },
  partners: {
    h2: 'Colabora',
    lead: 'Ultra Trail Larre® es una carrera pequeña y hecha con cuidado. Si quieres sumarte, empezamos por una conversación, no por un dosier.',
    types: [
      ['Marcas', 'Material y producto duradero, hecho con criterio, que tenga sentido en el monte. Cuéntanos qué harías y por qué encaja.'],
      ['Instituciones', 'Territorio, apoyo y puertas abiertas: entidades que quieren que su comarca se conozca con respeto.'],
      ['Medios', 'Una mirada, un relato y un altavoz para una prueba que prefiere el silencio, dirigido a la comunidad ultra.'],
      ['Operadores de eventos', 'Seguimiento, seguridad, logística y producción: la pericia que hace que la infraestructura no se note.']
    ],
    formTitle: 'Cuéntanos tu idea',
    form: {
      empresa: 'Empresa o entidad',
      persona: 'Persona de contacto',
      cargo: 'Cargo',
      email: 'Correo electrónico',
      tipo: 'Tipo de colaboración',
      tipoPh: 'Elige una opción',
      tipoOpts: [['marca', 'Marca'], ['institucion', 'Institución'], ['medio', 'Medio de comunicación'], ['operador', 'Operador de eventos'], ['otro', 'Otro']],
      mensaje: 'Mensaje',
      mensajeHint: 'Qué te gustaría hacer y qué esperas de la conversación.',
      consent: 'He leído la <a href="{priv}">política de privacidad</a> y consiento el tratamiento de mis datos para atender mi propuesta.',
      submit: 'Enviar mensaje',
      sending: 'Enviando…'
    },
    errors: {
      title: 'Revisa estos campos:',
      required: 'Este campo es obligatorio.',
      email: 'Escribe un correo electrónico válido.',
      min: 'Cuéntanos un poco más (mínimo {min} caracteres).',
      consent: 'Necesitamos tu consentimiento para poder continuar.',
      network: 'No hemos podido enviar el mensaje. Comprueba tu conexión e inténtalo de nuevo, o escríbenos a {email}.',
      server: 'Algo ha fallado de nuestro lado. Inténtalo de nuevo en unos minutos o escríbenos a {email}.',
      rate: 'Has enviado varios mensajes seguidos. Espera unos minutos e inténtalo de nuevo.',
      spam: 'No hemos podido validar el envío. Recarga la página e inténtalo de nuevo.'
    },
    ok: {
      title: 'Mensaje recibido',
      lead: 'Gracias, {nombre}. Te hemos enviado un correo de confirmación a <strong>{email}</strong> y te responderemos en persona.',
      mailFailed: 'Tu mensaje se ha guardado, pero no hemos podido enviarte la confirmación. Te responderemos igualmente.'
    }
  },
  contact: {
    h2: 'Contacto',
    lead: '¿Dudas, ideas o ganas de contarnos por qué quieres correrla? Escríbenos.',
    labels: { email: 'Correo', ig: 'Instagram', wa: 'WhatsApp', map: 'Salida y meta' },
    mapText: 'Parque de La Florida, Vitoria-Gasteiz',
    waText: 'Escríbenos por WhatsApp',
    waMsg: 'Hola, quiero hablar sobre Ultra Trail Larre®',
    org: 'Ultra Trail Larre® lo organiza <a href="https://musubigara.org/" rel="noopener">Musubigara®</a>.'
  },
  aria: { social: 'Redes y contacto', ig: 'Instagram de Ultra Trail Larre®', wa: 'WhatsApp', map: 'Cómo llegar a la salida, Parque de La Florida' },
  notFound: { title: 'Página no encontrada', text: 'Esta dirección no existe o ha cambiado. Vuelve al inicio o escríbenos si buscabas algo concreto.', home: 'Ir al inicio' },
  legal: {
    updated: 'Última actualización',
    aviso: {
      title: 'Aviso legal',
      metaDesc: 'Aviso legal de ultratraillarre.org, el sitio de Ultra Trail Larre®.',
      date: '3 de noviembre de 2026',
      sections: [
        ['1. Datos identificativos', ['En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de que este sitio web es titularidad de:', '<strong>Titular:</strong> Ignacio Sanz Arana, titular de la marca Ultra Trail Larre® (organiza Musubigara®).<br><strong>NIF:</strong> 72752567W<br><strong>Domicilio:</strong> Pintor Pablo Uranga 12, 01008, Vitoria-Gasteiz (Álava), España.<br><strong>Correo electrónico:</strong> <a href="mailto:ignacio@musubigara.org">ignacio@musubigara.org</a>']],
        ['2. Objeto y condiciones de uso', ['Este sitio presenta la carrera Ultra Trail Larre® y permite preinscribirse y contactar con la organización. El acceso y uso de la web atribuyen la condición de usuario e implican la aceptación de este aviso legal. El usuario se compromete a hacer un uso adecuado de los contenidos, conforme a la ley, la buena fe y el orden público.']],
        ['3. Carácter informativo', ['La información publicada (fechas, ruta, plazas, controles y condiciones) es informativa y está sujeta a cambios y, en su caso, a las autorizaciones administrativas necesarias para la celebración de la prueba. La preinscripción no garantiza plaza ni constituye una inscripción en la prueba. Las condiciones definitivas se recogerán en el reglamento y en el proceso de inscripción.']],
        ['4. Propiedad intelectual e industrial', ['Los textos, diseños, imágenes, logotipos, estructura y demás contenidos de esta web, así como la marca Ultra Trail Larre®, son titularidad de su titular o se utilizan con la debida autorización. Queda prohibida su reproducción, distribución, comunicación pública o transformación sin autorización expresa y por escrito.']],
        ['5. Responsabilidad', ['Se hace lo posible por que la información sea exacta y esté actualizada, pero no se garantiza la ausencia de errores ni la disponibilidad continua del sitio. La web puede contener enlaces a sitios de terceros (redes sociales, WhatsApp, mapas) sobre cuyo contenido no se tiene control ni se asume responsabilidad.']],
        ['6. Protección de datos', ['El tratamiento de datos personales se rige por la <a href="{priv}">política de privacidad</a>.']],
        ['7. Legislación aplicable y jurisdicción', ['Este aviso legal se rige por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales de Vitoria-Gasteiz, salvo que la normativa de consumidores y usuarios establezca otro fuero imperativo.']]
      ]
    },
    priv: {
      title: 'Política de privacidad',
      metaDesc: 'Política de privacidad de ultratraillarre.org: qué datos tratamos al preinscribirte o contactarnos, para qué y durante cuánto tiempo.',
      date: '3 de noviembre de 2026',
      sections: [
        ['1. Responsable del tratamiento', ['<strong>Titular:</strong> Ignacio Sanz Arana, titular de la marca Ultra Trail Larre® (organiza Musubigara®).<br><strong>NIF:</strong> 72752567W<br><strong>Domicilio:</strong> Pintor Pablo Uranga 12, 01008, Vitoria-Gasteiz (Álava), España.<br><strong>Correo electrónico:</strong> <a href="mailto:ignacio@musubigara.org">ignacio@musubigara.org</a>']],
        ['2. Qué datos tratamos y para qué', ['Tratamos únicamente los datos que nos facilitas tú, por tres vías.', '<strong>2.1. Formulario de preinscripción.</strong> Nombre y apellidos, edad, sexo, correo electrónico, referencias en otras pruebas (opcional), si estás federado/a en montaña y en qué federación, la descripción personal, las observaciones (opcional), el idioma de la página y la fecha y hora del envío. Generamos además un código de referencia único. La finalidad es gestionar tu preinscripción: validarla, asignar las plazas por orden de llegada, enviarte la confirmación y comunicarte por correo la fecha de pago. No pedimos el DNI en esta fase; si confirmas plaza, te lo pediremos entonces y te lo indicaremos en ese momento.', '<strong>2.2. Formulario «Colabora».</strong> Empresa o entidad, nombre, cargo, correo electrónico, tipo de colaboración y mensaje. La finalidad es atender tu propuesta y responderte.', '<strong>2.3. Contacto por correo electrónico o WhatsApp.</strong> Nombre, dirección de correo o teléfono y el contenido de tu mensaje, para atender tu consulta.', 'Preinscribirte no reserva dorsal, no te inscribe en la prueba y no te suscribe a ninguna newsletter. No elaboramos perfiles ni tomamos decisiones automatizadas.']],
        ['3. Base jurídica', ['Tu consentimiento expreso (art. 6.1.a RGPD), que prestas al marcar la casilla antes de enviar cada formulario o al escribirnos. Puedes retirarlo en cualquier momento, sin que ello afecte a la licitud del tratamiento anterior. Cuando tu mensaje busque una colaboración, también aplicamos medidas precontractuales a petición tuya (art. 6.1.b RGPD).']],
        ['4. Destinatarios y transferencias internacionales', ['No cedemos tus datos a terceros salvo obligación legal. Nos apoyamos en proveedores que actúan como encargados del tratamiento por cuenta nuestra:', '<strong>Netlify, Inc.</strong> (Estados Unidos): alojamiento de la web, ejecución de las funciones que procesan los formularios y almacenamiento de los envíos.<br><strong>Resend, Inc.</strong> (Estados Unidos): envío de los correos de confirmación y de aviso.<br><strong>Google Ireland Limited</strong>: servicio de correo desde el que atendemos tus mensajes.<br><strong>Meta Platforms Ireland Ltd.</strong>, únicamente si eres tú quien decide escribirnos por WhatsApp o entrar en Instagram, según su propia política.', 'El alojamiento y el envío de correo implican transferencias internacionales de datos a Estados Unidos, amparadas en las cláusulas contractuales tipo de la Comisión Europea o en el Marco de Privacidad de Datos UE-EEUU, según el proveedor. Las tipografías, imágenes y el resto de recursos se sirven desde el propio dominio, sin peticiones a servidores de terceros.']],
        ['5. Plazo de conservación', ['<strong>Preinscripción:</strong> hasta la celebración de la prueba, prevista para otoño de 2027, y después bloqueados durante los plazos de prescripción de posibles responsabilidades. Se suprimen antes si retiras tu consentimiento o solicitas la supresión.', '<strong>Colabora y contacto:</strong> mientras dure la gestión de tu propuesta o consulta y, después, bloqueados durante los plazos de prescripción legal.']],
        ['6. Tus derechos', ['Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad, y retirar tu consentimiento en cualquier momento, escribiendo a <a href="mailto:ignacio@musubigara.org">ignacio@musubigara.org</a> e indicando el derecho que quieres ejercer y tu código de referencia, si lo tienes. Si consideras que tus derechos no han sido atendidos, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es/" rel="noopener">www.aepd.es</a>).']],
        ['7. Cookies y analítica', ['Esta web no instala cookies propias ni de terceros y no utiliza herramientas de publicidad. La preferencia de idioma se refleja únicamente en la dirección de la página (/, /eu/ y /en/). Si en el futuro se incorporase una analítica o cookies no exentas, se actualizará esta política y, en su caso, se solicitará tu consentimiento previo.']],
        ['8. Menores de edad', ['La preinscripción y la participación en la prueba están dirigidas a personas mayores de edad. No tratamos conscientemente datos de menores sin el consentimiento de sus representantes legales.']],
        ['9. Seguridad y cambios', ['Aplicamos medidas técnicas y organizativas razonables para proteger tus datos: conexión cifrada, claves fuera del código fuente y acceso restringido a los envíos. Podemos actualizar esta política para adaptarla a cambios normativos o de la web; la versión vigente es siempre la publicada aquí.']]
      ]
    }
  }
};
