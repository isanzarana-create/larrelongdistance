#!/usr/bin/env python3
"""Páginas interiores EN. Uso: python3 -I tools/pages_en.py"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
import pages as P
import gallery
from pages import page, sec, dl, write, H, URLS, route_module
P.LANG = "en"
L = lambda k: URLS[k][2]
CTA = '<a class="cta" href="%s">Pre-registration · 1 Dec 2026</a>'

def p_ruta():
    data, map_svg, prof_svg, rd = route_module("en"); rmax = round(rd["km_total"] * 10)
    mod = f'''<div class="rmod" id="rmod" data-src="/datos/larre-2027.json" {data}>
<figure class="rprof">{prof_svg}<input id="rscrub" class="scrub" type="range" min="0" max="{rmax}" step="1" value="0" aria-label="Move along the route by kilometre" aria-controls="rread" hidden></figure>
<p class="rread mono" id="rread" data-default="Highest point: 1,383 m · km 152.5">Highest point: 1,383 m · km 152.5</p>
<p class="visually-hidden" id="rlive" aria-live="polite"></p>
<figure class="rmap">{map_svg}</figure></div>'''
    ficha = dl([("Distance", "226.9 km"), ("Elevation gain", "4,644 m"), ("Altitude", "515 m to 1,383 m (highest point at km 152.5)"),
                ("Format", "A single non-stop stage, loop"), ("Start and finish", "Parque de la Florida, Vitoria-Gasteiz"), ("Start time", "16:00"),
                ("Time limit", "50 hours (control closes at 18:00)"), ("Areas", "Entzia, Toloño, Cantabria and Izki ranges, and the Rioja Alavesa"), ("Places", "300 runners")], "ficha")
    cp = "".join(f'<tr><td>Passage control</td><td>{n}</td><td class="tbd">To be confirmed</td></tr>' for n in ["Agurain", "Santa Cruz de Campezo", "Laguardia", "Peñacerrada"]) + '<tr><td>Passage control</td><td class="tbd">To be confirmed</td><td class="tbd">To be confirmed</td></tr>' * 2
    b = sec('<h2 class="h2s">Route data</h2>' + ficha + '<p class="note">Distance measured on the official track. Elevation gain is calculated from smoothed GPS altitude; unsmoothed, GPS noise would inflate it to nearly 5,000 m.</p>')
    b += sec('<h2 class="h2s">Map and profile</h2><p>Move the slider over the profile to follow the route kilometre by kilometre.</p>' + mod + '<p class="mono" style="margin-top:var(--s3)">Official track · <span>larre-2027.gpx</span> · published 30 days before the start</p>', "alt")
    b += sec('<h2 class="h2s">Stamping checkpoints</h2><p>The route includes 6 stamping checkpoints. They are not aid stations: Ultra Trail Larre is run self-supported. The passage controls will be in Agurain, Santa Cruz de Campezo, Laguardia and Peñacerrada; the other two points and the exact kilometres will be confirmed before registrations open.</p><div class="tablew"><table><thead><tr><th>Point</th><th>Place</th><th>Kilometre</th></tr></thead><tbody><tr><td>Start</td><td>Vitoria-Gasteiz · Parque de la Florida</td><td>0</td></tr>' + cp + '<tr><td>Finish</td><td>Vitoria-Gasteiz · Parque de la Florida</td><td>226.9</td></tr></tbody></table></div>')
    b += sec(f'<h2 class="h2s">Navigation</h2><p>The official GPS track is mandatory. Every runner carries a GPS tracker with an SOS button, and the organisation runs a control centre in Vitoria-Gasteiz.</p><p>How to plan water, food, sleep and gear on a route like this is explained in the <a href="{L("guia")}">self-supported ultra guide</a>.</p><p style="margin-top:var(--s4)">{CTA % L("preinscripcion")}</p>', "alt")
    write(L("ruta"), page("ruta", "Route · Ultra Trail Larre® · 226.9 km across the four Álavas", "A 226.9 km, 4,644 m D+ loop ultra-trail across the four Álavas, in a single self-supported stage. Map, profile, key data and checkpoints.",
        "Route", "The 226.9 km<br>route", "Ultra Trail Larre® is a non-stop ultra-trail: a single-stage loop that starts and finishes at Parque de la Florida in Vitoria-Gasteiz and crosses the four Álavas.", b, extra_js=True))

RULES = [("Zero waste in the mountains.", "All litter leaves in the runner's pack until the next inhabited place.", "Disqualification"),
 ("Reusable containers required.", "Flasks or soft flasks. Single-use bottles are banned from the starting kit.", "Disqualification"),
 ("Gels and bars: wrapper in your pack.", "Every wrapper that goes in must come out. Checked at the finish and at checkpoints.", "Disqualification"),
 ("No going off-track.", "You may not leave the route except on authorised diversions: not for a photo, a shortcut or a bivouac.", "Disqualification"),
 ("Bivouac without a trace.", "If you rest in the mountains, you leave no sign. No fires. No visible organic waste.", "Disqualification"),
 ("Reach the event by public transport.", "We promote train over car.", "Commitment"),
 ("Reusable pack, no single-use plastic.", "Organic cotton, FSC card, recycled technical fabric. No blister packs, no individual bags.", "Production"),
 ("Trackers on perpetual rental.", "The electronics fleet is rented year after year. We do not buy disposable GPS units. Straps and cases are reused.", "Production"),
 ("Finish-line food at km 0.", "At least 70% local produce from within 30 km of the route. No individual packaging.", "Production"),
 ("Annual public audit.", "The event's footprint (transport, production, logistics) is calculated and published. Real, measured reduction comes first, with symbolic offsetting of residual emissions through Retree the Planet.", "Transparency")]
def p_reglamento():
    ess = dl([("Format", "A single non-stop stage of 226.9 km and 4,644 m D+."), ("Self-sufficiency", "No assistance and no classic aid stations: each runner carries what they need."),
        ("Navigation", "Official GPS track required, and stamping at the 6 checkpoints."), ("Time limit", "50 hours from the start, with the control closing at 18:00."),
        ("Participation", "300 places in order of arrival of the pre-registration, which includes a mandatory short personal description. Registrations in January 2027."),
        ("Safety", "GPS tracker with SOS button, a control centre in Vitoria-Gasteiz and specific ultra-trail insurance covering rescue, helicopter included, and international civil liability."),
        ("Image rights", "The runner grants image rights for editorial and promotional use of the event; direct commercial use requires individual written authorisation."),
        ("Mandatory gear", "To be published with the final rules of the 1st Edition.")])
    rules = "".join(f'<li><span class="rt"><strong>{H(a)}</strong> {H(c)}</span><span class="tag mono">{H(t)}</span></li>' for a, c, t in RULES)
    b = f'<section><div class="wrap two"><div><h2 class="h2s">Essential rules</h2>' + ess + f'<p class="note">Summary of the essential rules of the 1st Edition published so far. Questions: <a href="mailto:ignacio@musubigara.org">ignacio@musubigara.org</a>.</p><p style="margin-top:var(--s4)"><a class="cta" style="margin-top:0" href="/rules-ultratraillarre-2027.pdf" download>Download rules · PDF</a></p><p style="margin-top:var(--s3)">What running self-supported involves is in the <a href="{L("guia")}">self-supported ultra guide</a>. <a href="{L("preinscripcion")}">Pre-registration</a> opens on 1 December 2026.</p></div>'
    b += '<div><h2 class="h2s">Zero Code · 10 rules</h2><p><strong class="acc">Dropping a single piece of litter on the course means immediate disqualification and a ban from future editions. It is the only rule with no appeal.</strong></p><ol class="rules">' + rules + '</ol></div></div></section>'
    write(L("reglamento"), page("reglamento", "Rules · Ultra Trail Larre® · Essential rules and Zero Code", "Essential rules of the 1st Edition of Ultra Trail Larre® and the 10 rules of the Zero Code: self-sufficiency, zero waste and immediate disqualification.",
        "Rules", "The rules<br>of the game", "The essentials of the 1st Edition rules, on one page.", b, compact=True))

NOT = [("hot aid stations in the mountains", "Self-sufficiency does not include a hot stew halfway round. Either you cook it yourself, or you buy it at a bar open to the public."),
 ("inflatable start arch", "PVC, generator, transport, waste. The start is where the runners are, not where the sponsored inflatable is."),
 ("music or announcer at the start", "This is not a village fair. The mountains do not need loudspeakers. The silence before the first step is part of the rite."),
 ("plastic medals or heat-sealed screen printing", "The finisher medal is solid recycled metal, die-cut by a supplier in the Basque Country. It is heavy, it lasts, it is handed down. It is not a badge."),
 ("cash prize for the winner", "There is no bonus for speed. Every finisher receives the same gift. The privilege of the first is being first, nothing more."),
 ("polyester “free” T-shirt", "Microplastic in the wash, thrown away in two years. The Larre shirt is certified organic cotton, a single design each edition. If you would not buy it, we do not give it to you."),
 ("more places if “people are left out”", "300 is 300. The 2nd Edition will be 300. The 10th Edition will be 300. The number is identity, not a market parameter. If you do not get in, you come back next year."),
 ("barriers, carpet or red carpet in villages", "We pass through villages that live all year round. A runner's passing should be visible but discreet. No ephemeral infrastructure in squares and streets.")]
TERR = [("Pack cut to 4 essentials", "Cap and organic cotton T-shirt (single design per year · collectable), roadbook-brevet merged into FSC card, finisher medal in recycled metal. Technical bib separately as an operational item. No single-use plastics, no decorative merchandise."),
 ("Local production", "Pack made in Álava where possible: local screen printing, sewing in workshops of the territory, and wines and preserves for the finish from producers within 30 km of the route."),
 ("Reusable trackers", "GPS devices rented year after year, not consumables. Cases and straps reused. All the event's electronics are managed through rental, not purchase."),
 ("Clean mobility", "Insistent communication to encourage train over car. Shared and, where possible, electric staff vehicles."),
 ("Carbon footprint", "Annual calculation of the event's emissions (transport, production, staff accommodation) and offsetting through reforestation with Retree the Planet and local planting with HAZI / Provincial Council projects."),
 ("Durability above all", "Every item in the pack is designed to last years, not hours. The cap should still be in use in 2032. The roadbook-brevet should be framed, not thrown away. The organic cotton T-shirt, a single design each edition, becomes a collector's item: whoever returns to Larre builds up a different piece every year. It is the antithesis of the event kit.")]
def p_filosofia():
    b = sec('''<h2 class="h2s" id="etymology">Etymology</h2><p class="mono">larre [ ˈla.re ] · Basque · noun</p>
<p>In its most literal sense, <em>larre</em> names the upland meadow and pasture: open, uncultivated land where livestock graze freely. It also means open mountain and ground without marked paths, by extension any wild and rugged terrain, and, figuratively, what has not been tamed: what still belongs to everyone and to no one.</p>
<p>In a single syllable, the word holds the whole map of Álava: the beech forests of Izki Natural Park and the oak woods of Valderejo Natural Park; the terraced vineyards of the Rioja Alavesa below the Toloño range; the limestone ground and gorges of Okina; the cereal plain of the Llanada Alavesa; the high pastoral paths of the Entzia range; and the vast Ullíbarri-Gamboa reservoir, the territory's inner mirror.</p>
<p>The chosen noun evokes Álava's pastoral culture: transhumant flocks that for centuries stitched the four Álavas together in one seasonal movement, crossing forest, vineyard, mountain and plain. Larre is that same crossing, now <strong>on foot</strong>.</p>''')
    b += sec('''<h2 class="h2s" id="manifesto">Manifesto</h2>
<p>We leave Vitoria-Gasteiz heading south and reach Peñacerrada-Urizaharra and the vineyards of Laguardia, beneath the Toloño range, facing the Ebro valley and the first lands of Rioja.</p>
<p>We cross the villages of the Rioja Alavesa, climb towards Santa Cruz de Campezo and up into the Entzia range, where the flocks of Álava's last transhumant shepherds still graze, before returning through Agurain to Vitoria-Gasteiz.</p>
<p class="big">226.9 km that stitch the four Álavas into a single line.</p>
<p>Forest, vineyard, mountain and plain. Without assistance, without classic aid stations, without compulsory rest. With a GPS track, a brevet card and the certainty that <strong>the mountain is earned step by step</strong>.</p>
<ul class="premisas mono"><li>Total self-sufficiency</li><li>No classic aid stations</li><li>Zero waste in the mountains</li><li>GPS tracker required</li><li>Merged roadbook-brevet</li><li>Mandatory gear checked</li><li>Authored audiovisual production</li><li>Small, demanding community</li><li>Durable materials · no event kit</li><li>Absolute respect for the territory</li></ul>''', "alt")
    b += sec('''<h2 class="h2s" id="is-it-a-race">Is it a race?</h2><p class="big">No.</p>
<p>Although some will treat it as one, Larre is a <strong>personal challenge</strong>. For many, the challenge will simply be to finish.</p>
<p>There will be a final ranking by order of arrival. But, following the traditions of ultra-cycling, bikepacking and long self-supported routes, there will be no prize for the fastest participant except the honour of arriving first.</p>
<p>No trophies are handed out here for speed. What is handed out is the privilege of having been there.</p>
<p>The culture of self-sufficiency understands that victory is not in beating the person next to you, but in holding your pace for 226.9 kilometres of mountain without anyone solving your water, your dinner or your sleep. That is the only competition that matters.</p>''')
    zero = ["No wrappers, no stickers, no gels, no strips of tape. What goes into the mountains with the runner leaves the mountains with the runner.",
        "It is not a slogan. It is a condition of entry. Every brevet card carries a zero-waste protocol signed at the briefing. Dropping a single piece of litter on the course, documented by photo, organiser, volunteer, another runner or scouting camera, means <strong>immediate disqualification and a ban from future editions</strong>. No nuances, no prior warning, no second chance.",
        "That severity is deliberate. It is the only way to build a community that understands the privilege of being able to cross Toloño and Entzia. Most runners who already go self-supported live it that way naturally; we write it down so that nobody arrives without knowing.",
        "The second axis is the durability of things. We produce few objects, make them to last for years, and design each one thinking of how it will be repaired before how it will be thrown away. The 1st Edition cap should still be in use in 2032. The brevet card is not paper: it is FSC card meant to be framed. The bib is technical fabric with reinforced stitching, not a piece of Tyvek that lasts a morning.",
        "The most sustainable thing we produce is what we do not produce. Every year we review the whole pack and remove whatever adds nothing. We do not give things away for the sake of it. If a T-shirt is not the best T-shirt you will own this year, we do not give it to you."]
    b += sec('<h2 class="h2s" id="zero-code">Zero Code</h2><p class="big">The only trace we leave in the mountains is our footprints.</p>' + "".join(f"<p>{x}</p>" for x in zero) + f'<p><a href="{L("reglamento")}">The 10 rules of the Zero Code →</a></p>', "alt")
    nh = "".join(f'<li><span class="num">/ {i+1:02d}</span><div><h3>No {H(a)}</h3><p>{H(c)}</p></div></li>' for i, (a, c) in enumerate(NOT))
    b += sec('<h2 class="h2s" id="what-we-do-not-do">We say NO long before we say YES</h2><p>Almost everything that defines Larre is a list of things we will not do. Each NO on this page is a conscious decision: something the inertia of the trail-running market would push us to do and that we have ruled out as inconsistent with the project.</p><p>Saying NO is the only way to protect what matters. This list is neither exhaustive nor final: it grows every year as we learn what erodes the event and what sustains it.</p><ul class="nolist">' + nh + '</ul><p>This list will grow every year. If a decision we take today turns out to be inconsistent with the project, next year it joins the NO list and stays there. It is the only honest way to improve: documenting what we rule out, not just what we defend.</p>')
    tr = "".join(f'<li><span class="num">{chr(65+i)}</span><div><h3>{H(a)}</h3><p>{H(c)}</p></div></li>' for i, (a, c) in enumerate(TERR))
    b += sec('<h2 class="h2s" id="territory">Territory · zero impact, honestly</h2><p>Larre\'s sustainability is not a badge on a website: it is a series of technical decisions at every stage of the project. No greenwashing and no green marketing: real, measured reduction and symbolic offsetting of the unavoidable through Retree the Planet.</p><ul class="nolist">' + tr + '</ul>', "alt")
    write(L("filosofia"), page("filosofia", "Philosophy · Ultra Trail Larre® · Etymology, manifesto and Zero Code", "What “larre” means, the Ultra Trail Larre® manifesto, why it is not a race, the Zero Code and everything we will not do.",
        "Philosophy", "What is<br>Larre", "Etymology, manifesto and the list of things we will never do.", b))

def p_llegar():
    f = dl([("Place", "Parque de la Florida"), ("City", "Vitoria-Gasteiz, Álava (Basque Country)"), ("Start", "16:00 · autumn 2027 (1st Edition; the exact date will be announced later)"), ("Finish", "The same park, up to 50 hours after the start")])
    b = sec('<h2 class="h2s">Start and finish</h2>' + f + '<p style="margin-top:var(--s4)"><a class="cta" href="https://www.google.com/maps/search/?api=1&amp;query=Parque+de+la+Florida+Vitoria-Gasteiz" target="_blank" rel="noopener">See Parque de la Florida on Google Maps</a></p>')
    b += sec(f'<h2 class="h2s">Getting to Vitoria-Gasteiz</h2><p><strong>By train or bus:</strong> the city has a railway station and a bus station, both a few minutes from the centre.</p><p><strong>By plane:</strong> Vitoria-Gasteiz has its own airport (Foronda). Bilbao airport is a little over an hour away by road.</p><p><strong>By car:</strong> the city is well connected by motorway with Bilbao, Donostia-San Sebastián, Pamplona and Burgos.</p><p>We promote train over car: it is one of the rules of the <a href="{L("reglamento")}">Zero Code</a>.</p>', "alt")
    b += sec('<h2 class="h2s">Logistics questions?</h2><p>Write to <a href="mailto:ignacio@musubigara.org">ignacio@musubigara.org</a> or on <a href="https://wa.me/34620463558?text=Hi%20Ignacio%2C%20I%27d%20like%20to%20talk%20about%20Ultra%20Trail%20Larre" target="_blank" rel="noopener">WhatsApp</a>.</p>')
    write(L("como-llegar"), page("como-llegar", "Getting there · Ultra Trail Larre® · Parque de la Florida, Vitoria-Gasteiz", "How to get to the Ultra Trail Larre® start: Parque de la Florida in Vitoria-Gasteiz, by train, bus, plane or car.",
        "Getting there", "Getting to<br>the start", "Ultra Trail Larre® starts and finishes in the same place: Parque de la Florida, in the centre of Vitoria-Gasteiz, capital of the Basque Country.", b))

GUIDE = '''<h2>What a self-supported ultra-trail is</h2>
<p>A self-supported ultra-trail is a race in which every runner carries everything they will need. There are no aid stations every fifteen kilometres, no drop bag, no crew car waiting at the top of the climb. There are checkpoints, yes, but they are control and stamping points: they confirm that you passed through, they do not feed you.</p>
<p>The difference from a classic ultra is not just logistics. It changes what you decide. In a supported ultra, the key decision is pace. In a self-supported one, the key decision is resource management: how much weight you carry, where you refill water, when you eat, when you sleep. Almost nobody drops out of a race like this for lack of legs; they drop out because they miscalculated the water, the food or the cold.</p>
<div class="tablew"><table>
<thead><tr><th>Aspect</th><th>Supported ultra</th><th>Self-supported</th></tr></thead>
<tbody>
<tr><td>Aid stations</td><td>Every 10–20 km</td><td>None</td></tr>
<tr><td>Drop bag</td><td>Common</td><td>Does not exist</td></tr>
<tr><td>Outside assistance</td><td>Allowed in marked zones</td><td>Forbidden</td></tr>
<tr><td>Pack weight</td><td>1–3 kg</td><td>3–6 kg</td></tr>
<tr><td>Critical decision</td><td>Pace</td><td>Resources</td></tr>
</tbody></table></div>
<h2>Water is the first problem</h2>
<p>Water weighs a kilo per litre and you cannot carry all of it. So planning is done not by kilometres but by stretches between reliable water points: village fountains, bars, cemeteries, sports centres. They are marked on the map before the start, with an alternative in case one is dry or closed at night.</p>
<p>As a working reference, in mid-mountain terrain you drink around 400–500 ml per hour in mild temperatures and 600–800 ml per hour in the heat. Between two points five hours apart, that is more than two litres. A water filter or purification tablets weigh very little and turn any stream into an option; livestock troughs, no.</p>
<p>In autumn, in the Álava ranges, the trap is the opposite of what everyone expects: it is cool, you drink less than you think and you arrive dehydrated without ever having felt hot.</p>
<h2>Food: calculate by hours, not by kilometres</h2>
<p>In long races most runners sustain between 200 and 300 kcal per hour, and almost never more. In an event that can last forty or fifty hours, that is many thousands of calories: more than fit in a reasonable pack. So the question is not “how much food do I carry” but “how much food do I carry on me and where does the rest come from”.</p>
<p>What works: alternating sweet and savoury before your stomach shuts down, combining solids with liquids, carrying something hot or salty for the small hours and having two or three options you know you can eat even when nauseous. What does not work: trying a gel, a bar or a flavour in the race that you have not tested on long training days.</p>
<p>Each race sets out in its rules whether you may buy in shops along the route or refill at public fountains, and that completely changes the food plan. It is the first thing to read. For Ultra Trail Larre the essentials are summarised in the <a href="/en/rules/">rules</a>.</p>
<h2>Sleeping, or not sleeping</h2>
<p>An event with a fifty-hour time limit spans two nights. For most runners, not sleeping at all for forty-odd hours means reaching the second small hours with hallucinations, disorientation and bad decisions on terrain where decisions matter.</p>
<p>The three strategies actually used: not sleeping (only if you have already tried it in training and know how your head responds), micro-naps of ten to twenty minutes when the first serious low arrives, or a planned stop of one to two hours at a point decided in advance. The difference between it working and not working is having decided before the start, not at four in the morning lying in a ditch.</p>
<h2>The gear that really matters</h2>
<p>Beyond what each organiser requires, there is a core that is not up for debate in self-supported racing:</p>
<ul>
<li>Headlamp with good battery life and a spare set of batteries or battery pack. Two nights are a lot of hours of light.</li>
<li>Waterproof jacket with a hood and a dry thermal layer, kept for the night or for a stop.</li>
<li>Charged phone, power bank and cables. It is your map, your emergency phone and your backup torch.</li>
<li>Water capacity of 1.5–2 litres, plus a filter or tablets.</li>
<li>Survival blanket and whistle. They weigh nothing and keep you alive while help arrives.</li>
<li>Minimal foot kit: tape, small scissors, a needle, something for blisters. A badly treated blister retires more people than a climb.</li>
<li>Gloves and a hat or neck gaiter. The cold at dawn on a ridge is nothing like the cold at the start.</li>
</ul>
<p>The mandatory gear list for Ultra Trail Larre will be published with the final rules of the 1st Edition. When it is ready it will have its own page and will be announced on <a href="https://www.instagram.com/ultratraillarre/" target="_blank" rel="noopener">@ultratraillarre</a>.</p>
<h2>Navigating with a GPS track</h2>
<p>In self-supported races the route is not marked with ribbons: you follow an official GPS track. That means navigation is part of the event and is trained like a climb.</p>
<p>In practice: load the track on your watch and on your phone, with the area maps downloaded for use without coverage; mark the checkpoints as points of interest; know what to do when the watch warns you that you are off-track (stop, go back to the last safe point, do not improvise shortcuts at night); and do not depend on a single battery for the one thing that tells you where you are.</p>
<h2>Zero waste: how to run without leaving anything</h2>
<p>At Ultra Trail Larre, dropping a single piece of litter means immediate disqualification, and it is the only rule in the regulations with no appeal. In practice it comes down to three habits: your own rubbish bag in a fixed pocket, always the same one; gels and bars with the tab tied or stowed the moment you open them, never “later”; and decanting what you can into reusable bags before the start, so you carry less wrapping from the beginning.</p>
<h2>How to prepare for a 200 km distance</h2>
<p>With a year ahead, preparation falls into three blocks. This is not a personalised training plan (that depends on your history and, if there are health doubts, on a professional), but it is the structure shared by almost everyone who reaches the finish.</p>
<ul>
<li><strong>Base · months 1 to 4</strong>Accumulated volume and climbing, at a comfortable pace. Lots of time on your feet, little intensity. This builds the capacity to endure hours, not speed.</li>
<li><strong>Specific · months 5 to 8</strong>Long back-to-back outings (Saturday and Sunday in a row), at least two complete night outings, all with the pack loaded to real race weight. You train your stomach by eating on the move what you will eat on race day.</li>
<li><strong>Sharpening · months 9 to 10</strong>One long simulation of 12 to 24 hours with the final gear, the final food and footwear test, and then real rest. Whatever is not tested by now is not debuted in the race.</li>
</ul>
<p>Two sessions are non-negotiable: running at night, for several hours, until not seeing clearly is normal; and chaining two long days in a row, to learn how the body responds when it starts with tired legs. And there are two parts that almost nobody trains and that decide races: the stomach and the feet.</p>
<h2>Ten mistakes that keep repeating</h2>
<ul>
<li>Starting too fast in the first four hours because the pack does not weigh much yet.</li>
<li>Debuting gear, footwear or nutrition on race day.</li>
<li>Calculating water by kilometres rather than by time between reliable points.</li>
<li>Having no sleep plan and deciding it in the small hours, with no judgement left.</li>
<li>Carrying a single headlamp, or half-used spare batteries.</li>
<li>Stopping eating as soon as nausea appears, instead of changing texture or flavour.</li>
<li>Not treating the first discomfort in a foot to avoid losing ten minutes.</li>
<li>Trusting a single battery for the GPS.</li>
<li>Carrying the bare minimum of warm clothing because it was nice at the start.</li>
<li>Not having read the rules until the week before.</li>
</ul>
<h2>What this means at Ultra Trail Larre</h2>
<dl class="ficha"><div><dt>Distance and elevation</dt><dd>226.9 km · 4,644 m D+</dd></div><div><dt>Format</dt><dd>A single non-stop stage, loop, self-supported</dd></div><div><dt>Time limit</dt><dd>50 hours</dd></div><div><dt>Start time</dt><dd>16:00</dd></div><div><dt>Stamping checkpoints</dt><dd>6, with brevet (Agurain, Santa Cruz de Campezo, Laguardia, Peñacerrada and two to be confirmed)</dd></div><div><dt>Official GPS track</dt><dd>Provided 30 days before the start</dd></div><div><dt>Safety</dt><dd>GPS tracker with SOS button and a control centre in Vitoria-Gasteiz</dd></div></dl>
<p>The 16:00 start is not an aesthetic detail: you enter the night early, with fresh legs and almost the whole route ahead. Whoever has trained at night is grateful for it there. The full route is on the <a href="/en/route/">route</a> page.</p>
<h2>Frequently asked questions</h2>
<h3>Can you run a 200 km ultra without having done a 100 first?</h3>
<p>You can, but the chance of finishing drops a lot. What a 100 km or 24-hour event gives you is not the kilometres: it is having spent a night running, having handled a serious low and knowing what your stomach will eat at hour twenty. If there is no long ultra behind you, the reasonable substitute is your own outings of 15 to 24 hours on similar terrain.</p>
<h3>How much should the pack weigh?</h3>
<p>In real self-sufficiency, between three and six kilos with water, depending on the weather and the sleep strategy. Below three usually means something important is missing; above six, that you are carrying fear in the form of weight.</p>
<h3>What happens if I decide to withdraw halfway?</h3>
<p>In a self-supported race a withdrawal is always reported to the organisation; nobody drops out silently: until they know, the control centre assumes you are still in the mountains. The specific Ultra Trail Larre procedure (pick-up points and phone number) will be part of the final rules and of the compulsory briefing the day before.</p>
<h3>Is Ultra Trail Larre a good first self-supported race?</h3>
<p>Honestly, no. It is a good second or third step. To start in the format, a 50 to 100 km event with no assistance, or your own two-day route, makes more sense. What Ultra Trail Larre is, is a place where self-sufficiency is not decoration on the poster: 226.9 km, zero waste and a track with you, the mountain and your brevet.</p>
<h2>The places</h2>
<p>The 1st Edition has 300 bibs, allocated in order of arrival of the pre-registration, which includes a mandatory short personal description. Registrations open in January 2027. If you want us to let you know on day one, leave your details on the <a href="/en/pre-registration/">pre-registration list</a>.</p>
'''
def p_guia():
    b = f'<section><div class="wrap prose">{GUIDE.replace("<table>", chr(60)+"table>")}<p style="margin-top:var(--s4)">{CTA % L("preinscripcion")}</p></div></section>'
    write(L("guia"), page("guia", "Self-supported ultra guide · How to prepare a 200 km ultra-trail", "What running an ultra-trail with no assistance means: water, food, sleep, gear, GPS navigation and how to prepare for a 200 km distance.",
        "Self-supported ultra guide", "Running<br>self-supported", "What it means to run an ultra-trail without assistance, how much water and food you need, when to sleep and how to prepare for a 200 km distance.", b))

def p_galeria():
    li = "".join(f'<li><figure><a href="/fotos/{f}.webp"><img src="/fotos/{f}-400.webp" width="400" height="400" loading="lazy" decoding="async" alt="{H(c)}"></a><figcaption>{H(c)}</figcaption></figure></li>' for f, c in gallery.photos('en'))
    b = f'<section><div class="wrap"><ul class="grid4">{li}</ul><p style="margin-top:var(--s4)">More on <a href="https://www.instagram.com/ultratraillarre/" target="_blank" rel="noopener">@ultratraillarre</a> on Instagram.</p></div></section>'
    write(L("galeria"), page("galeria", "Images · Ultra Trail Larre® · From the ground", "Photographs from reconnaissance trips, stretches of the route and the mountains as they are, published on @ultratraillarre.",
        "Images", "From<br>the ground", "The latest from @ultratraillarre: reconnaissance trips, stretches of the route and the mountains as they are.", b))

if __name__ == "__main__":
    for f in (p_ruta, p_reglamento, p_filosofia, p_llegar, p_guia, p_galeria): f()
    print("páginas EN generadas")
