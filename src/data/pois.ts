import type { Poi } from './types';

export const pois: Poi[] = [
  // =============================================
  // DONNERSTAG: Ammersee-Umrundung
  // =============================================
  {
    id: 'diessen-markt',
    routeId: 'donnerstag',
    lat: 47.9522, lng: 11.0991,
    name: 'Dießen am Ammersee',
    type: 'town',
    description: 'Malerische Künstler- und Töpferstadt am Südufer des Ammersees.',
    photo: 'photos/diessen.jpg',
  },
  {
    id: 'herrsching',
    routeId: 'donnerstag',
    lat: 47.9991, lng: 11.1763,
    name: 'Herrsching — Seepromenade',
    type: 'lake',
    description: 'Die längste Seepromenade Bayerns mit Blick auf die Alpen.',
    photo: 'photos/herrsching.jpg',
  },
  {
    id: 'kloster-andechs',
    routeId: 'donnerstag',
    lat: 47.9747, lng: 11.1821,
    name: 'Kloster Andechs',
    type: 'church',
    description: 'Berühmtes Benediktinerkloster auf dem Heiligen Berg mit legendärer Brauerei.',
    photo: 'photos/andechs.jpg',
  },
  {
    id: 'schondorf',
    routeId: 'donnerstag',
    lat: 48.0565, lng: 11.0969,
    name: 'Schondorf am Ammersee',
    type: 'town',
    description: 'Ruhiger Ort am Westufer mit schönem Seezugang.',
    photo: 'photos/schondorf.jpg',
  },
  // Mittagessen
  {
    id: 'unterbraeu-diessen',
    routeId: 'donnerstag',
    lat: 47.949167, lng: 11.107500,
    name: 'Gasthof Unterbräu Dießen',
    type: 'gasthaus',
    description: 'Traditionshaus im Herzen von Dießen. Frischer Ammersee-Fisch, deftige Brotzeiten. Mi Ruhetag.',
    mealType: 'lunch',
    website: 'https://www.unterbraeu-diessen.de/',
  },
  {
    id: 'seehof-herrsching',
    routeId: 'donnerstag',
    lat: 47.995220, lng: 11.169218,
    name: 'Seehof Herrsching',
    type: 'restaurant',
    description: 'Großer Biergarten (600+ Plätze) direkt am Ammersee mit Alpenpanorama.',
    mealType: 'lunch',
    website: 'https://seehof-ammersee.de/',
  },
  // Café
  {
    id: 'cafe-forster',
    routeId: 'donnerstag',
    lat: 48.054867, lng: 11.100509,
    name: 'Café Forster Schondorf',
    type: 'cafe',
    description: 'Historisches Seecafé im Bootshausstil. Ausgezeichnete Konditorei, Terrasse mit Blick auf Kloster Andechs.',
    mealType: 'cafe',
    website: 'https://www.cafeforster.de/',
  },

  // =============================================
  // FREITAG: Wieskirche & Schongau
  // =============================================
  {
    id: 'wieskirche',
    routeId: 'freitag',
    lat: 47.6809, lng: 10.9001,
    name: 'Wieskirche (UNESCO)',
    type: 'church',
    description: 'UNESCO-Welterbe! Meisterwerk des bayerischen Rokoko.',
    photo: 'photos/wieskirche.jpg',
  },
  {
    id: 'steingaden',
    routeId: 'freitag',
    lat: 47.7013, lng: 10.8644,
    name: 'Steingaden — Welfenmünster',
    type: 'church',
    description: 'Romanisches Welfenmünster — eines der ältesten Klöster Oberbayerns.',
    photo: 'photos/steingaden.jpg',
  },
  {
    id: 'schongau-altstadt',
    routeId: 'freitag',
    lat: 47.810982, lng: 10.897528,
    name: 'Schongau Altstadt',
    type: 'town',
    description: 'Mittelalterliche Altstadt mit vollständig erhaltener Stadtmauer und Alpenpanorama.',
    photo: 'photos/schongau.jpg',
  },
  // Mittagessen
  {
    id: 'schweiger-wieskirche',
    routeId: 'freitag',
    lat: 47.680735, lng: 10.899822,
    name: 'Gasthof Schweiger an der Wieskirche',
    type: 'gasthaus',
    description: 'Direkt neben der Wieskirche. Bayerische Hausmannskost. Geöffnet Sa–Do 9–18 Uhr, Fr Ruhetag.',
    mealType: 'lunch',
    website: 'https://gasthofschweiger.de/',
  },
  {
    id: 'brauhaus-schongau',
    routeId: 'freitag',
    lat: 47.816545, lng: 10.891931,
    name: 'Schongauer Brauhaus',
    type: 'gasthaus',
    description: 'Jugendstil-Brauerei mit hausgebrautem Bier. Biergarten mit Brotzeit-Mitbringrecht.',
    mealType: 'lunch',
    website: 'https://brauhaus-schongau.de/',
  },
  // Café
  {
    id: 'ballenhaus-schongau',
    routeId: 'freitag',
    lat: 47.810982, lng: 10.897528,
    name: 'Ballenhaus Café Schongau',
    type: 'cafe',
    description: 'Bistro-Café am Marienplatz der mittelalterlichen Altstadt. Kuchen, Kaffee und kleine Snacks.',
    mealType: 'cafe',
  },

  // =============================================
  // SAMSTAG: Murnau & Staffelsee
  // =============================================
  {
    id: 'staffelsee-blick',
    routeId: 'samstag',
    lat: 47.7050, lng: 11.1850,
    name: 'Staffelsee',
    type: 'lake',
    description: 'Einer der wärmsten Voralpenseen mit sieben Inseln.',
    photo: 'photos/staffelsee.jpg',
  },
  {
    id: 'murnau-markt',
    routeId: 'samstag',
    lat: 47.6810, lng: 11.2010,
    name: 'Murnau am Staffelsee',
    type: 'town',
    description: 'Künstlerstadt des Blauen Reiters. Kandinsky und Münter lebten hier.',
    photo: 'photos/murnau.jpg',
  },
  {
    id: 'muenter-haus',
    routeId: 'samstag',
    lat: 47.6780, lng: 11.1990,
    name: 'Münter-Haus',
    type: 'museum',
    description: 'Das „Russenhaus" — Geburtsstätte des Blauen Reiters.',
    photo: 'photos/muenter-haus.jpg',
    website: 'https://muenter-stiftung.de',
  },
  {
    id: 'murnauer-moos',
    routeId: 'samstag',
    lat: 47.6500, lng: 11.1700,
    name: 'Murnauer Moos',
    type: 'viewpoint',
    description: 'Größtes Moorgebiet Mitteleuropas mit Zugspitz-Panorama.',
    photo: 'photos/murnauer-moos.jpg',
  },
  // Mittagessen
  {
    id: 'griesbraeu',
    routeId: 'samstag',
    lat: 47.679900, lng: 11.200940,
    name: 'Griesbräu zu Murnau',
    type: 'gasthaus',
    description: 'Historische Brauerei (100+ Jahre) mit hauseigenem Bier und Innenhof. Mi Ruhetag.',
    mealType: 'lunch',
    website: 'https://griesbraeu.de/',
  },
  // Café
  {
    id: 'kronner-murnau',
    routeId: 'samstag',
    lat: 47.678610, lng: 11.201221,
    name: 'Konditorei Krönner Murnau',
    type: 'cafe',
    description: 'Seit 1759. Berühmt für die Agnes-Bernauer-Torte und hauseigene Pralinen. Tägl. 9–18:30.',
    mealType: 'cafe',
    website: 'https://www.barbara-kroenner.de/',
  },

  // =============================================
  // SONNTAG: Osterseen & Seeshaupt
  // =============================================
  {
    id: 'polling-kloster',
    routeId: 'sonntag',
    lat: 47.8120, lng: 11.1490,
    name: 'Kloster Polling',
    type: 'church',
    description: 'Ehemaliges Augustinerchorherrenstift mit romanischer Basilika.',
    photo: 'photos/polling.jpg',
  },
  {
    id: 'osterseen',
    routeId: 'sonntag',
    lat: 47.7700, lng: 11.3100,
    name: 'Osterseenlandschaft',
    type: 'lake',
    description: 'Naturschutzgebiet mit über 20 kleinen Seen — eines der schönsten Moorgebiete Bayerns.',
    photo: 'photos/osterseen.jpg',
  },
  {
    id: 'seeshaupt',
    routeId: 'sonntag',
    lat: 47.8240, lng: 11.3160,
    name: 'Seeshaupt',
    type: 'town',
    description: 'Charmanter Ort am Südufer des Starnberger Sees.',
    photo: 'photos/seeshaupt.jpg',
  },
  // Mittagessen
  {
    id: 'landgasthof-osterseen',
    routeId: 'sonntag',
    lat: 47.771290, lng: 11.319460,
    name: 'Landgasthof Osterseen',
    type: 'gasthaus',
    description: 'Direkt am Naturschutzgebiet. Sonnenterrasse mit 140 Plätzen, regionale Küche.',
    mealType: 'lunch',
    website: 'https://www.landgasthof-osterseen.de/',
  },
  {
    id: 'hohenberg-seeshaupt',
    routeId: 'sonntag',
    lat: 47.804146, lng: 11.263726,
    name: 'Schlossgaststätte Hohenberg',
    type: 'gasthaus',
    description: 'Idyllischer Landgasthof (seit 1873) bei Seeshaupt mit Biergarten. Tägl. 11:30–22:30.',
    mealType: 'lunch',
    website: 'https://www.schlossgaststaette-hohenberg.com/',
  },
  // Café
  {
    id: 'cafe-hofmark',
    routeId: 'sonntag',
    lat: 47.771500, lng: 11.319700,
    name: 'Café Hofmark Iffeldorf',
    type: 'cafe',
    description: 'Gemütliche Konditorei im Dorfzentrum. Hausgemachte Kuchen und Kaffee. Mo Ruhetag.',
    mealType: 'cafe',
    website: 'https://www.cafe-hofmark.de/',
  },

  // =============================================
  // ALTERNATIVE: Lechtal & Landsberg
  // =============================================
  {
    id: 'alt-landsberg',
    routeId: 'alternative',
    lat: 48.049477, lng: 10.876514,
    name: 'Landsberg am Lech',
    type: 'town',
    description: 'Historische Altstadt mit mittelalterlichem Bayertor und malerischen Gassen am Lech.',
    photo: 'photos/landsberg.jpg',
  },
  {
    id: 'alt-schongau',
    routeId: 'alternative',
    lat: 47.810982, lng: 10.897528,
    name: 'Schongau',
    type: 'town',
    description: 'Mittelalterliche Altstadt mit vollständig erhaltener Stadtmauer.',
    photo: 'photos/schongau.jpg',
  },
  // Mittagessen
  {
    id: 'suesbraeu-landsberg',
    routeId: 'alternative',
    lat: 48.048493, lng: 10.881485,
    name: 'Süßbräu Landsberg',
    type: 'gasthaus',
    description: 'Historischer Gasthof (17. Jhd.) am Bayertor. Bayerische Küche in 4. Generation.',
    mealType: 'lunch',
  },
  {
    id: 'alt-brauhaus-schongau',
    routeId: 'alternative',
    lat: 47.816545, lng: 10.891931,
    name: 'Schongauer Brauhaus',
    type: 'gasthaus',
    description: 'Jugendstil-Brauereirestaurant mit hausgebrautem Bier und Biergarten.',
    mealType: 'lunch',
    website: 'https://brauhaus-schongau.de/',
  },
  // Café
  {
    id: 'hellmairs-landsberg',
    routeId: 'alternative',
    lat: 48.050754, lng: 10.877641,
    name: 'Hellmairs Landsberg',
    type: 'cafe',
    description: 'Café-Bar-Restaurant in der Altstadt. Hausgemachte Torten, saisonale Karte. Tägl. ab 9 Uhr.',
    mealType: 'cafe',
    website: 'https://www.hellmairs.de/',
  },
];
