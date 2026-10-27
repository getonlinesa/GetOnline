// All editable content for the Mooi Laser Estetika demo (Afrikaans and English).
// Source: public Facebook catalogue "Katalogus 2026" (pinned post, 1 April). Verify every price with the client before launch.
// Item format: [Afrikaans name, price, English name (optional, defaults to the Afrikaans name)]
window.SITE = {
  name: "Mooi Laser Estetika",
  slug: "mooi-laser-estetika",
  town: "Robertson",
  address: "13 Paul Kruger Straat, Robertson",
  phone: "064 823 3303",
  phoneTel: "+27648233303",
  whatsapp: "27648233303", // TODO: confirm this is the WhatsApp number linked on their Linktree
  email: "mooilaserenestetika@gmail.com", // TODO: verify spelling against the catalogue
  facebook: "https://www.facebook.com/profile.php?id=61575269173028",
  instagram: "https://www.instagram.com/mooi_laser_en_estetika",
  tiktok: "", // TODO: add TikTok link (handle seems to be mooi.laserenestetika)
  // TODO: real opening hours. These are ASSUMED for the demo only. 0 = Sunday.
  hours: { 1: ["09:00", "17:00"], 2: ["09:00", "17:00"], 3: ["09:00", "17:00"], 4: ["09:00", "17:00"], 5: ["09:00", "17:00"], 6: ["09:00", "13:00"] },
  hoursAssumed: true,
  slotMinutes: 60, // TODO: real treatment durations
  rooms: 1,        // TODO: how many clients can be treated at the same time
  bookingDays: 21,
  groups: [
    { id: "laserhaar", title: "Laser haarverwydering", en: "Laser hair reduction",
      note: "Gewoonlik 8 tot 12 sessies, oor 'n paar maande versprei, afhangend van jou vel- en haarkleur en die area. Kursusse van 10 sessies is ook beskikbaar.",
      noteEn: "Usually 8 to 12 sessions, spread over a few months, depending on your skin and hair colour and the area. Courses of 10 sessions are also available.",
      items: [["Top brow",240],["Lip",240],["Chin",240],["Upper lip & chin",450],["Side burns",350],["Cheeks",400],["Neck front / back",350],["Full face",880],["Half arm incl. elbow",670],["Full arm",1120],["Underarm",560],["Hands / feet",350],["Fingers / toes",300],["Lower / upper back",1120],["Full back",1670],["Areola or cleavage",190],["Stomach",780],["Tummy line",350],["Bum cheeks",400],["Half leg (incl. knee)",1090],["Upper leg",1020],["Full leg",1920],["Bikini sides",620],["Brazilian (strip)",820],["Hollywood (all off)",880],["Elektroliese / Electrolysis",750,"Electrolysis"]] },
    { id: "gesig", title: "Gesigsbehandelings", en: "Facials",
      items: [["Skin sensitivity test (konsultasie)",370,"Skin sensitivity test (consultation)"],["Deep cleanse (Isa Carstens)",690],["Oil control (Isa Carstens)",530],["Hydration restore light (Isa Carstens)",720],["Hydration restore rich (Isa Carstens)",790],["Anti-ox (Isa Carstens)",720],["Active peptide, anti-ageing (Isa Carstens)",620],["pHformula velvernuwing, 30 min",720,"pHformula skin resurfacing, 30 min"],["pHformula velvernuwing, 60 min",940,"pHformula skin resurfacing, 60 min"],["pHformula velvernuwing, 90 min",1120,"pHformula skin resurfacing, 90 min"],["Hydrafacial",750],["Dermaplaning",680],["Dermaplaning add-on",380]] },
    { id: "naald", title: "Mikro-naaldterapie", en: "Microneedling",
      items: [["Microneedling, gesig en nek",1300,"Microneedling, face and neck"],["Microneedling, kursus van 4",3900,"Microneedling, course of 4"],["Microneedling, kursus van 6",5200,"Microneedling, course of 6"],["RF microneedling, gesig en nek",2900,"RF microneedling, face and neck"],["RF microneedling, kursus van 4",8799,"RF microneedling, course of 4"]] },
    { id: "plasma", title: "Plasma behandeling", en: "Plasma treatment",
      items: [["Millia",["100","400"]],["Sebaceous hyperplasia",["350","550"]],["Skin tags",["350","750"]]] },
    { id: "verhelder", title: "Laser verheldering en swam", en: "Laser toning and fungus treatment",
      items: [["Laser toning, gesig en nek",1100,"Laser toning, face and neck"],["Laser toning, kursus van 4",3300,"Laser toning, course of 4"],["Laser toning, kursus van 6",4400,"Laser toning, course of 6"],["Laser swambehandeling, enkele area",150,"Laser fungus treatment, single area"],["Laser swambehandeling, verskeie areas",300,"Laser fungus treatment, multiple areas"]] },
    { id: "pigment", title: "Laser pigmentvermindering", en: "Laser pigment reduction",
      note: "Pryse kan wissel en 3 tot 6 sessies kan nodig wees, afhangend van die diepte, grootte en donkerheid van die pigment.",
      noteEn: "Prices may vary and 3 to 6 sessions may be needed, depending on the depth, size and darkness of the pigment.",
      items: [["Enkele plek",680,"Single spot"],["Klein area (tot 5 plekke)",780,"Small area (up to 5 spots)"],["Medium area (5 tot 10 plekke)",980,"Medium area (5 to 10 spots)"],["Groot area (10+ plekke)",1230,"Large area (10+ spots)"],["Gesig alleen",980,"Face only"],["Hande",780,"Hands"],["Nek en décolleté",980,"Neck and décolleté"]] },
    { id: "are", title: "Laser aarvermindering", en: "Laser vein reduction",
      note: "Pryse kan wissel en 3 tot 6 sessies kan nodig wees.",
      noteEn: "Prices may vary and 3 to 6 sessions may be needed.",
      items: [["Enkele klein aar (2 cm)",480,"Single small vein (2 cm)"],["Gesig (klein area)",680,"Face (small area)"],["Gesig (volle area)",980,"Face (full area)"]] },
    { id: "letsel", title: "Laser letselvermindering", en: "Laser scar reduction",
      note: "Pryse kan wissel en 3 tot 6 sessies kan nodig wees.",
      noteEn: "Prices may vary and 3 to 6 sessions may be needed.",
      items: [["Klein letsel (tot 3 cm)",450,"Small scar (up to 3 cm)"],["Medium letsel (3 tot 8 cm)",650,"Medium scar (3 to 8 cm)"],["Groot letsel (8 tot 15 cm)",950,"Large scar (8 to 15 cm)"],["Volle gesig (aknee-letsels)",1200,"Full face (acne scars)"],["Rekmerke, klein area",1500,"Stretch marks, small area"],["Rekmerke, groot area",2500,"Stretch marks, large area"]] },
    { id: "waks", title: "Waks", en: "Wax",
      items: [["Eyebrow",150],["Lip",120],["Chin",120],["Chest / back",390],["Stomach",150],["Half arm",190],["Full arm",270],["Underarm",170],["Hollywood",310],["Brazilian",270],["Bikini",220],["Half leg",320],["Full leg",410]] },
    { id: "tint", title: "Wenkbrou en wimperkleur", en: "Lash and brow tint",
      items: [["Browtint and shape",190],["Lash tint",120]] }
  ]
  // TODO: replace with real photos and the real logo from the client (assets/).
  // TODO: add testimonials only if the client supplies real ones.
};

// Interface text used by the scripts. Page text lives in the HTML.
window.TXT = {
  af: {
    days: ["Sondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrydag","Saterdag"],
    months: ["Januarie","Februarie","Maart","April","Mei","Junie","Julie","Augustus","September","Oktober","November","Desember"],
    lvl: { quiet: "Rustig", busy: "Besig", full: "Vol", closed: "Gesluit" },
    at: "om", to: "tot",
    stNext: function (nd) { return "volgende oop plek " + nd; },
    stLater: "kom later weer kyk",
    stFull: "geen plekke meer vandag nie, kies 'n ander dag",
    stOpen: function (n, next) { return n + " " + (n === 1 ? "plek" : "plekke") + " oop vandag" + (next ? ", volgende om " + next : ""); },
    book: "Bespreek", bookAria: function (n) { return "Bespreek " + n; },
    pickDay: "Kies eers 'n dag.", past: "verby", fullChip: "vol",
    errService: "Kies asseblief 'n behandeling.", errTime: "Kies 'n dag en 'n tyd.", errName: "Vul asseblief jou naam in.",
    errPhone: "Vul 'n geldige Suid-Afrikaanse selnommer in, bv. 082 123 4567.",
    errEmail: "Hierdie e-posadres lyk nie reg nie.", errConsent: "Ons het jou toestemming nodig om jou bespreking te hanteer.",
    slotTaken: "Daardie tyd is pas geneem. Kies 'n ander tyd.", saveFail: "Die bespreking is nie gestoor nie. Probeer weer.",
    waMsg: function (s, d, t, n) { return "Hallo, ek het 'n bespreking gemaak vir " + s + " op " + d + " om " + t + ". Naam: " + n + "."; },
    okTitle: function (n) { return "Dankie, " + n + ". Jou plek is gereserveer."; },
    okDemo: "Dit is 'n demo: die bespreking is net op hierdie toestel gestoor en niks is aan die salon gestuur nie. Op die regte webwerf kry die salon dit dadelik.",
    okWa: "Bevestig op WhatsApp",
    manual: "handmatig", auto: "Outomaties",
    noBookings: '<p class="note">Nog geen demo-besprekings nie. Maak een op die <a href="bespreek.html">bespreekbladsy</a>.</p>'
  },
  en: {
    days: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
    lvl: { quiet: "Quiet", busy: "Busy", full: "Full", closed: "Closed" },
    at: "at", to: "to",
    stNext: function (nd) { return "next available " + nd; },
    stLater: "please check back later",
    stFull: "fully booked today, pick another day",
    stOpen: function (n, next) { return n + " " + (n === 1 ? "spot" : "spots") + " open today" + (next ? ", next at " + next : ""); },
    book: "Book", bookAria: function (n) { return "Book " + n; },
    pickDay: "Pick a day first.", past: "past", fullChip: "full",
    errService: "Choose a treatment.", errTime: "Choose a day and a time.", errName: "Enter your name.",
    errPhone: "Enter a valid South African cell number, e.g. 082 123 4567.",
    errEmail: "This email address doesn't look right.", errConsent: "We need your consent to handle your booking.",
    slotTaken: "That time was just taken. Choose another time.", saveFail: "The booking wasn't saved. Try again.",
    waMsg: function (s, d, t, n) { return "Hello, I booked " + s + " on " + d + " at " + t + ". Name: " + n + "."; },
    okTitle: function (n) { return "Thank you, " + n + ". Your spot is reserved."; },
    okDemo: "This is a demo: the booking is stored on this device only and nothing was sent to the salon. On the real website the salon receives it straight away.",
    okWa: "Confirm on WhatsApp",
    manual: "manual", auto: "Automatic",
    noBookings: '<p class="note">No demo bookings yet. Make one on the <a href="bespreek.html">booking page</a>.</p>'
  }
};
window.LANG = document.documentElement.lang === "en" ? "en" : "af";
window.T = window.TXT[window.LANG];
