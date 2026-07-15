1. Concept Summary

Build a moody, editorial travel website called Budarina that showcases Silk-Road-adjacent destinations (China, Japan, Kazakhstan, Vietnam, Russia, etc.). Each destination is shown as a full-screen "slide": a large 3D-rendered piece of iconic vernacular architecture (a roof) floating in the center of the screen, with a dense block of that country's script (Chinese characters, Japanese kana/kanji, Kazakh Cyrillic, etc.) cascading downward from underneath it like a flowing curtain or waterfall made of text. The user pages through destinations using small preview cards fixed to the left and right edges of the screen.

The overall feel is: vintage paper texture, warm sepia/cream palette, large serif display typography, tiny monospace labels, restrained motion, high production value — like a museum exhibit or a luxury travel brand microsite.


2. Tech Stack


React (or Next.js) + TypeScript
Tailwind CSS for layout/spacing
Framer Motion (or GSAP) for the crossfade/slide transitions and the falling-text particle animation
Plain <canvas> (or SVG + JS) for the falling-character curtain effect — canvas is recommended for performance since there are 150–300+ animated glyphs per slide
No CMS needed; store destination content in a simple local array/JSON



3. Design System

Colors


Background: warm linen/cream, #EAE0CC – #EDE3D0 (apply a subtle canvas/paper grain texture over it — a low-opacity noise or fabric-weave PNG tiled full-bleed)
Primary text: near-black warm brown, #2B2118
Secondary/muted text: soft brown-gray, #8C8172
Accent dark (buttons, nav "Configure" pill): espresso brown #3A2A22, white text
Hover/highlight accent: soft red/vermilion #C0524A (used sparingly, e.g. hover state on nav cards)
Divider lines: thin, #C9BCA2, 1px


Typography


Display headline font: a high-contrast serif with old-style figures and calligraphic flourishes (e.g. "Fraunces", "Canela", or "Playfair Display" as a substitute) — used at very large size (56–72px desktop) for headlines like "China — golden courtyards, silk-road myths, roofs that refuse gravity"
UI / label font: monospace (e.g. "JetBrains Mono", "IBM Plex Mono", or "Space Mono") — used for nav links, the small native-language caption ("缘分 (Yuánfèn) A destined meeting"), destination card labels, and the bottom-right descriptive caption
Logo "Budarina" uses the same serif as headlines, medium weight, small size (~18px), top-left


Texture


Entire background has a visible linen/canvas fabric texture (subtle woven pattern), consistent across every screen — apply as a repeating background-image with mix-blend-mode: multiply at low opacity over the cream base color



4. Global Layout (persists across all slides)

Header (fixed, transparent, top of viewport):


Left: logo wordmark "Budarina" (serif)
Center-left: nav links in monospace, small caps/lowercase — Home · Destinations · Community, separated by a small middle-dot ·. Active link is bold/dark; inactive links are lighter gray.
Right: a dark pill button labeled "Configure" (espresso-brown background #3A2A22, white serif text, generous horizontal padding, fully rounded or slightly rounded corners, subtle rough/inked edge — see "Texture on UI elements" below)


Footer / bottom of viewport:


A thin horizontal progress bar centered at the very bottom (like a slide-position indicator / scrubber), light gray, ~120px wide, 3px tall, rounded


Texture on UI elements: Buttons and the small destination-preview card borders have a slightly irregular, "hand-stamped ink" edge rather than a perfectly clean rectangle — replicate with a subtle SVG filter (feTurbulence + displacement) or a rough-edge border-image if time allows; a clean rounded-rect is an acceptable fallback.


5. The Destination Slide (main hero, repeats per country)

Each destination is a full-viewport "slide" with this exact layout:

[Prev-country card, left edge, vertically centered]     [Next-country card, right edge, vertically centered]

                        [ 3D Roof Render ]
                    [ Falling text curtain beneath it ]

[Native-script label + translation]
[Large serif headline, 5–7 lines, left-aligned, ~30% from left]
                                                    [Small monospace caption, bottom-right]

5.1 Center — Architecture Render + Text Curtain


A large (roughly 480px wide) transparent-background 3D render of a single iconic roof/structure representative of the country:

China: ornate double-tier imperial temple roof, gold tiles, red trim, upturned eaves with finials
Japan: single red/vermilion temple roof, simple dark ridge cap, gentle curve
Kazakhstan: a yurt (ger) dome, cream felt panels with radial wood ribs, red/patterned trim band
(Other countries follow the same "isolated roof/dome, floating, drop shadow" treatment — a boat roof for Vietnam, an onion-dome-adjacent roof for Russia, a chalet-style pitched roof for Kazakhstan-neighboring, etc.)



The render floats with a soft drop shadow cast diagonally down-right onto the background, as if lit from upper-left.
Signature effect — the falling text curtain: Directly beneath the roof, hundreds of small glyphs in that country's native script (real Chinese characters for China, real hiragana/kanji for Japan, real Cyrillic Kazakh text for Kazakhstan) stream downward from the roof's underside like dripping liquid or a waterfall of type. Behavior:

At rest, the glyphs are loosely arranged in a rectangular block directly under the roof (as if the roof is "printed" with a solid block of dense text).
Continuously, glyphs peel off the bottom of that block and fall/curve downward in ~8–12 flowing strands, like tentacles or hair being blown — each strand undulates left-right in a slow sine-wave path as it descends, fading in opacity and shrinking slightly as it reaches the bottom of the screen before recycling back to the top of the block.
Glyphs are monospaced, dark brown at ~40–70% opacity, small (10–13px).
The whole effect should loop seamlessly and continuously (idle ambient animation), independent of user interaction.
Implementation approach: canvas-based particle system. Each particle = one character + a position along a bezier/sine path + speed + opacity. Cycle ~150–250 particles continuously.





5.2 Left column — Text content


Small line: native script word + pinyin/transliteration in parentheses + short English gloss, monospace, muted color.
Example: 缘分 (Yuánfèn) A destined meeting
Large serif headline, ~5 lines, left aligned, tight leading, dark brown. Format: "[Country] — [3–5 evocative comma-separated phrases about the culture/architecture]."
Example: "China — golden courtyards, silk-road myths, roofs that refuse gravity"
A short horizontal rule sits inline after the country name (China ──── golden courtyards...).


5.3 Bottom-right — Caption


2–3 line descriptive/poetic sentence in small monospace text, right-aligned block, muted brown.
Example: "Wander forbidden gardens, painted eaves, and stories older than the maps that tried to hold them."


5.4 Left/Right edge — Destination nav cards


Small square cards (~120×120px), pinned to the vertical center of the left and right screen edges, showing the previous and next destination in the sequence.
Each card: thin rough-edged border, tiny roof icon illustration (flat/line-art version of that country's roof, colored appropriately — e.g. brown boat silhouette for Vietnam, red roof icon for Japan), and the country name below in monospace caps/small text.
Hover state: icon/border tints toward the vermilion accent color, cursor becomes a pointer.
Click behavior: clicking the right card advances to the next destination (crossfade/slide transition: current roof + text curtain fade/slide out, next one fades/slides in, headline and caption text also crossfade). Clicking the left card goes to the previous destination. This is the primary navigation method — an infinite carousel through the destination list (Vietnam → China → Japan → Kazakhstan → Russia → ... loops around).


5.5 Transition animation


Duration ~600–900ms, ease-in-out.
Outgoing roof render + its text curtain fade out and shift slightly toward the direction of travel; incoming roof fades/scales in from the opposite side.
Headline and caption text cross-fade with a slight vertical offset (8–12px) for a soft parallax feel.
The left/right nav cards update their icon+label instantly to always show whichever destinations are now adjacent.



6. Destinations Grid Page ("Destinations" nav link)

Clicking Destinations in the header navigates to a gallery view:


Same header/background.
All destination roofs are displayed simultaneously in a single horizontal row, each noticeably smaller than the hero size, evenly spaced, each still emitting its own falling-text curtain beneath it (all animating independently and continuously).
No headline text on this view — it's a visual index. (Optional: clicking a roof in this grid returns you to that destination's full slide.)



7. Content Data — sample destinations to implement

Provide at least these five, in this order, cycling as an infinite loop:


Vietnam — icon: dark boat-roof silhouette. (Use as an adjacent-preview-only entry, or build out a full slide with matching content in the same pattern as below.)
China

Native label: 缘分 (Yuánfèn) A destined meeting
Headline: China — golden courtyards, silk-road myths, roofs that refuse gravity
Caption: Wander forbidden gardens, painted eaves, and stories older than the maps that tried to hold them.
Curtain script: Chinese characters
Roof: double-eave gold/red imperial temple roof



Japan

Native label: 一期一会 (Ichigo ichie) One time, one meeting
Headline: Japan — red eaves in the mist, stone paths, and patience as architecture
Caption: Pass under vermilion gates, cedar shade, and rooms where silence is part of the design.
Curtain script: Japanese (kanji/hiragana mix)
Roof: single-tier red temple roof, dark ridge



Kazakhstan

Native label: Жол (Jol) The open road
Headline: Kazakhstan — steppe wind, shanyrak light, and a home that moves with you
Caption: Cross grass without edge, warm felt interiors, and patterns that outrun every border.
Curtain script: Kazakh Cyrillic
Roof: yurt dome, cream felt with red/patterned trim band



Russia — icon: ornate patterned pitched roof (used as adjacent-preview entry; extend with matching content following the same pattern if a full slide is desired)


Each destination object should have this shape:

tstype Destination = {
  id: string;
  country: string;
  nativeLabel: string;      // e.g. "缘分 (Yuánfèn) A destined meeting"
  headline: string;         // e.g. "China — golden courtyards, silk-road myths, roofs that refuse gravity"
  caption: string;
  curtainAlphabet: string[]; // pool of characters/glyphs to randomly sample for the falling text
  roofImage: string;         // path to transparent PNG/WebP render
  iconImage: string;         // small flat icon for the nav card
};


8. Interaction Summary Checklist


 Idle ambient animation: falling text curtain runs continuously on every visible roof, on every page
 Click right-edge card → advance to next destination (crossfade transition)
 Click left-edge card → go to previous destination
 Hover on nav cards → vermilion tint + pointer cursor
 Header nav: "Home" returns to the hero destination carousel; "Destinations" opens the multi-roof grid overview; "Community" is a stub route/page
 "Configure" button in header is a stub CTA (no destination specified in source material — link it to a placeholder route/modal)
 Bottom scrubber bar reflects current slide position (optional: make it draggable/clickable to jump slides)
 Fully responsive: on narrower viewports, stack the left-column text below the roof render, and dock the nav cards as a horizontal prev/next pair instead of fixed to screen edges



9. Assets Needed (not included — source or generate separately)


Transparent-background 3D renders of: Chinese imperial roof, Japanese temple roof, Kazakh yurt dome, Vietnamese boat/roof form, Russian patterned roof (and any additional countries you add)
Matching small flat/line-art icon versions of each roof for the nav cards
A subtle linen/canvas paper texture image tiled across the background
Web fonts: a display serif (Fraunces/Canela/Playfair Display) and a monospace (JetBrains Mono/IBM Plex Mono)



10. Notes for the Agent


This is a portfolio/editorial-style site — prioritize typography rhythm, generous whitespace, and the smoothness of the text-curtain and transition animations over feature count.
The falling-text curtain is the single most distinctive element of this site; if time is constrained, implement it first and get its physics (gentle wave, continuous loop, natural-looking density falloff) right before polishing anything else.
Keep all copy per-destination short, poetic, and lowercase-em-dash style ("Country — three or four comma-separated evocative fragments").