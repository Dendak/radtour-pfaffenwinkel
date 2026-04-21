export type KnowledgeCategory = 'kultur' | 'natur' | 'geschichte' | 'kurios' | 'personen';

export interface KnowledgeFact {
  id: string;
  category: KnowledgeCategory;
  title: string;
  text: string;
  source?: { label: string; url: string };
}

export const categoryLabels: Record<KnowledgeCategory, { label: string; icon: string }> = {
  kultur: { label: 'Kultur', icon: '🎨' },
  natur: { label: 'Natur', icon: '🏔️' },
  geschichte: { label: 'Geschichte', icon: '🏛️' },
  personen: { label: 'Persönlichkeiten', icon: '👤' },
  kurios: { label: 'Kurios', icon: '💡' },
};

export const knowledge: KnowledgeFact[] = [
  // ─── Kultur ─────────────────────────────────────────────
  {
    id: 'wies',
    category: 'kultur',
    title: 'Wieskirche — UNESCO-Welterbe seit 1983',
    text:
      'Die Wallfahrtskirche „Zum Gegeißelten Heiland auf der Wies" wurde 1745–1754 von Dominikus Zimmermann im Rokokostil errichtet, nachdem die Bäuerin Maria Lory 1738 Tränen an einer Christusfigur beobachtet haben soll. Das Deckenfresko schuf sein Bruder Johann Baptist Zimmermann. 1983 nahm die UNESCO die Kirche als eines der ersten deutschen Objekte in die Welterbeliste auf.',
    source: { label: 'Wikipedia: Wieskirche', url: 'https://de.wikipedia.org/wiki/Wieskirche' },
  },
  {
    id: 'blauer-reiter',
    category: 'kultur',
    title: 'Blauer Reiter im „Russenhaus" Murnau',
    text:
      'Wassily Kandinsky und Gabriele Münter kauften 1909 ein Haus in der Kottmüllerallee in Murnau, das wegen der häufigen Gäste Jawlensky und Werefkin bald „Russenhaus" hieß. Zwischen 1908 und 1914 entstanden hier Schlüsselwerke der abstrakten Malerei. Münter versteckte ab 1940 über 80 Kandinsky-Gemälde im Keller und schenkte sie 1957 dem Lenbachhaus München.',
    source: { label: 'Wikipedia: Münter-Haus', url: 'https://de.wikipedia.org/wiki/M%C3%BCnter-Haus' },
  },
  {
    id: 'andechs',
    category: 'kultur',
    title: 'Kloster Andechs — Brauerei seit 1455',
    text:
      'Die Benediktiner auf dem Heiligen Berg brauen urkundlich belegt seit 1455 Bier; heute werden rund 100.000 Hektoliter pro Jahr produziert. Die Wallfahrtskirche birgt den „Andechser Heiltumsschatz" mit Reliquien, die laut Legende Kaiser Ludwig der Bayer 1388 wiederentdeckte. Komponist Carl Orff ist auf dem Friedhof des Klosters begraben.',
    source: { label: 'Wikipedia: Kloster Andechs', url: 'https://de.wikipedia.org/wiki/Kloster_Andechs' },
  },
  {
    id: 'pfaffenwinkel',
    category: 'kultur',
    title: 'Pfaffenwinkel — über 160 Kirchen auf 1.500 km²',
    text:
      'Der Name „Pfaffenwinkel" taucht erstmals 1740 im satirischen Gedicht „Der Reisende Herr auf dem Land" von Lorenz von Westenrieder auf. Zwischen Lech, Ammer und Loisach stehen mehr als 160 Kirchen, Klöster und Kapellen auf rund 1.500 km². Zu den wichtigsten zählen Rottenbuch, Steingaden, Wessobrunn und die Wies.',
    source: { label: 'Wikipedia: Pfaffenwinkel', url: 'https://de.wikipedia.org/wiki/Pfaffenwinkel' },
  },
  {
    id: 'rottenbuch',
    category: 'kultur',
    title: 'Rottenbuch — Chorgestühl mit versteckten Porträts',
    text:
      'Das Augustiner-Chorherrenstift Rottenbuch wurde 1073 von Welf IV. gegründet und 1085 erstmals geweiht; die barocke Umgestaltung 1737–1742 stammt von Joseph Schmuzer. Im Rokoko-Chorgestühl versteckte der Schnitzer Franz Xaver Schmädl karikierende Porträts seiner Zeitgenossen. Nach der Säkularisation 1803 wurde das Stift aufgelöst.',
    source: { label: 'Wikipedia: Kloster Rottenbuch', url: 'https://de.wikipedia.org/wiki/Kloster_Rottenbuch' },
  },

  // ─── Natur ──────────────────────────────────────────────
  {
    id: 'hoher-peissenberg',
    category: 'natur',
    title: 'Hoher Peißenberg — älteste Bergwetterwarte der Welt',
    text:
      'Die meteorologische Station auf dem 988 m hohen Gipfel misst seit dem 1. Januar 1781 ununterbrochen im Auftrag der Societas Meteorologica Palatina und besitzt damit die längste zusammenhängende Gebirgsmessreihe weltweit. Heute betreibt der Deutsche Wetterdienst das Observatorium mit Schwerpunkt Spurengas- und Ozonmessung. Bei Föhn reicht die Sicht bis zum Großglockner (190 km).',
    source: { label: 'Wikipedia: Hoher Peißenberg', url: 'https://de.wikipedia.org/wiki/Hoher_Pei%C3%9Fenberg' },
  },
  {
    id: 'osterseen',
    category: 'natur',
    title: 'Osterseen — 19 Moorseen der Würm-Eiszeit',
    text:
      'Die Osterseen-Gruppe bei Iffeldorf umfasst 19 durch Schmelzwasserkanäle verbundene Seen, die nach dem Rückzug des Isar-Loisach-Gletschers vor rund 18.000 Jahren entstanden. Das 198 ha große Naturschutzgebiet beherbergt über 500 Pflanzenarten, darunter die seltene Seerose Nymphaea candida. Der Große Ostersee ist bis zu 32 m tief.',
    source: { label: 'Wikipedia: Osterseen', url: 'https://de.wikipedia.org/wiki/Osterseen' },
  },
  {
    id: 'ammersee',
    category: 'natur',
    title: 'Ammersee — 46,6 km² und der Fallwind „Seehaserl"',
    text:
      'Der Ammersee ist 46,6 km² groß und am Ostufer bis zu 81,1 m tief — damit drittgrößter See Bayerns. Der lokale Fallwind „Seehaserl" entsteht an warmen Sommernachmittagen durch kalte Luft aus den Ammerbergen und überrascht Segler regelmäßig mit Windstärken bis 8 Beaufort. Der Wasserspiegel liegt auf 533 m ü. NHN.',
    source: { label: 'Wikipedia: Ammersee', url: 'https://de.wikipedia.org/wiki/Ammersee' },
  },
  {
    id: 'staffelsee',
    category: 'natur',
    title: 'Staffelsee — einziger See mit sieben Inseln',
    text:
      'Der 7,66 km² große Staffelsee bei Murnau besitzt sieben Inseln — bundesweit einmalig. Auf der größten, dem Wörth, stand bereits im 8. Jahrhundert eine karolingische Kirche; das „Staffelseer Urbar" von ca. 810 ist eines der ältesten Wirtschaftsverzeichnisse Europas. Der See erreicht 39 m Tiefe.',
    source: { label: 'Wikipedia: Staffelsee', url: 'https://de.wikipedia.org/wiki/Staffelsee' },
  },
  {
    id: 'murnauer-moos',
    category: 'natur',
    title: 'Murnauer Moos — größtes Alpenrand-Moor Mitteleuropas',
    text:
      'Das Murnauer Moos erstreckt sich über rund 32 km² und ist damit das größte naturnahe Moor im Alpenvorland. Es beherbergt über 900 Pflanzenarten und 111 Rote-Liste-Vogelarten, darunter den Wachtelkönig. Seit 1980 ist es EU-Vogelschutzgebiet und FFH-Gebiet.',
    source: { label: 'Wikipedia: Murnauer Moos', url: 'https://de.wikipedia.org/wiki/Murnauer_Moos' },
  },
  {
    id: 'ammerschlucht',
    category: 'natur',
    title: 'Ammerschlucht — bis 76 m tiefer Wildfluss-Canyon',
    text:
      'Zwischen Saulgrub und Peiting hat sich die Ammer bis zu 76 m tief in die Flinz- und Nagelfluhschichten eingegraben — die tiefste Schlucht des bayerischen Alpenvorlands. Der Scheibum-Durchbruch entstand vor etwa 11.000 Jahren nach dem Rückzug des Ammer-Loisach-Gletschers. Die Ammer ist einer der letzten weitgehend unverbauten Wildflüsse Deutschlands.',
    source: { label: 'Wikipedia: Ammerschlucht', url: 'https://de.wikipedia.org/wiki/Ammerschlucht' },
  },

  // ─── Geschichte ─────────────────────────────────────────
  {
    id: 'via-claudia',
    category: 'geschichte',
    title: 'Via Claudia Augusta — Römerstraße seit 46 n. Chr.',
    text:
      'Die Via Claudia Augusta wurde unter Kaiser Claudius 46/47 n. Chr. als erste durchgehende Alpenstraße von Altinum (Adria) über den Reschenpass nach Augusta Vindelicum (Augsburg) fertiggestellt; Baubeginn ging auf Drusus 15 v. Chr. zurück. Sie führte durch Epfach (Abodiacum) und querte den Lech bei Schongau. Meilensteine von Rablat und Cesiomaggiore belegen die Fertigstellung.',
    source: { label: 'Wikipedia: Via Claudia Augusta', url: 'https://de.wikipedia.org/wiki/Via_Claudia_Augusta' },
  },
  {
    id: 'schongau',
    category: 'geschichte',
    title: 'Schongau — Stadtrecht 1332, Salzstraße',
    text:
      'Schongau erhielt das bestätigte Stadtrecht 1332 von Kaiser Ludwig dem Bayern; die heutige Altstadt entstand nach Verlegung vom alten Standort (heute Altenstadt) um 1250. Die vollständig erhaltene Stadtmauer mit ursprünglich acht Türmen schützte den wichtigen Salz- und Handelsumschlag am Lech. Zwischen 1589 und 1665 wurden in 20 Hexenprozessen rund 63 Frauen hingerichtet.',
    source: { label: 'Wikipedia: Schongau', url: 'https://de.wikipedia.org/wiki/Schongau' },
  },
  {
    id: 'landsberg',
    category: 'geschichte',
    title: 'Landsberg — Bayertor 1425, Bürgermeister Zimmermann',
    text:
      'Landsberg am Lech wurde um 1160 von Heinrich dem Löwen als Zollstation gegründet und verdankt den Aufstieg der Salzstraße München–Memmingen. Das 36 m hohe Bayertor von 1425 gilt als eines der schönsten spätgotischen Stadttore Deutschlands. Rokoko-Baumeister Dominikus Zimmermann war 1749–1753 Bürgermeister der Stadt.',
    source: { label: 'Wikipedia: Landsberg am Lech', url: 'https://de.wikipedia.org/wiki/Landsberg_am_Lech' },
  },
  {
    id: 'flosserei',
    category: 'geschichte',
    title: 'Lech-Flößerei — UNESCO-Kulturerbe, Ende 1968',
    text:
      'Über Jahrhunderte wurden Holz, Salz und Waren auf Flößen von Füssen über Landsberg bis Augsburg und Wien transportiert; die Flößerei gilt seit 2014 als UNESCO-immaterielles Kulturerbe. Die letzte kommerzielle Fahrt fand 1968 statt, nachdem der Bau der Staustufen (u. a. Forggensee 1954) die Strecke unterbrach. In Lechbruck erinnert das Flößermuseum an die Tradition.',
    source: { label: 'UNESCO Deutschland', url: 'https://www.unesco.de/kultur-und-natur/immaterielles-kulturerbe/immaterielles-kulturerbe-deutschland/floesserei' },
  },
  {
    id: 'raisting',
    category: 'geschichte',
    title: 'Erdfunkstelle Raisting — erstes Satelliten-TV 1964',
    text:
      'Am 29. Juni 1964 nahm die Antenne 1 in Raisting als erste deutsche Bodenstation Signale vom Satelliten Relay 2 auf; 1969 wurden Bilder der Mondlandung über die Station nach Deutschland übertragen. Das markante 49-m-Radom der „Antenne 1" von 1964 ist seit 1999 Industriedenkmal. Heute werden am Standort 14 Antennen betrieben.',
    source: { label: 'Erdfunkstelle Raisting', url: 'https://www.erdfunkstelle-raisting.de/geschichte/' },
  },
  {
    id: 'steingaden',
    category: 'geschichte',
    title: 'Steingaden — Welfen-Grablege von 1147',
    text:
      'Das Prämonstratenserkloster Steingaden wurde 1147 von Welf VI. gegründet, der dort auch begraben liegen soll — allerdings ist sein Grab bis heute nicht lokalisiert. Die romanische Basilika St. Johannes Baptist von 1176 besitzt einen der ältesten erhaltenen Kreuzgänge Süddeutschlands. Das Kloster betreute ab 1745 auch die Wieskirche.',
    source: { label: 'Wikipedia: Kloster Steingaden', url: 'https://de.wikipedia.org/wiki/Kloster_Steingaden' },
  },

  // ─── Persönlichkeiten ───────────────────────────────────
  {
    id: 'ludwig-ii',
    category: 'personen',
    title: 'König Ludwig II. (1845–1886) — Märchenkönig',
    text:
      'Ludwig II. ließ ab 1869 Schloss Neuschwanstein oberhalb von Hohenschwangau errichten; bei seinem Tod 1886 waren nur rund 15 Räume fertiggestellt, der Bergfried wurde nie gebaut. Der König selbst verbrachte insgesamt nur 172 Nächte in der Burg. Am 13. Juni 1886 ertrank er unter bis heute ungeklärten Umständen im Starnberger See bei Berg, nur wenige Tage nach seiner Entmündigung. Bereits sieben Wochen nach seinem Tod öffnete Neuschwanstein für zahlende Besucher.',
    source: { label: 'Wikipedia: Ludwig II.', url: 'https://de.wikipedia.org/wiki/Ludwig_II._(Bayern)' },
  },
  {
    id: 'kandinsky',
    category: 'personen',
    title: 'Wassily Kandinsky (1866–1944) — Wegbereiter der Abstraktion',
    text:
      'Kandinsky entdeckte im Sommer 1908 mit Gabriele Münter Murnau am Staffelsee und malte dort seine ersten weitgehend abstrakten Landschaften. 1909 kaufte Münter das Haus in der Kottmüllerallee 6, im Volksmund bis heute „Russenhaus" genannt, wo Kandinsky bis 1914 lebte und arbeitete. Hier entstand 1911 gemeinsam mit Franz Marc die Idee zum Almanach „Der Blaue Reiter". Wenig bekannt: Kandinsky war vor seiner Malerlaufbahn promovierter Jurist und wurde erst mit 30 Jahren Kunststudent.',
    source: { label: 'Wikipedia: Wassily Kandinsky', url: 'https://de.wikipedia.org/wiki/Wassily_Kandinsky' },
  },
  {
    id: 'muenter',
    category: 'personen',
    title: 'Gabriele Münter (1877–1962) — Retterin des Blauen Reiter',
    text:
      'Münter erwarb 1909 das Haus in Murnau, das zum Zentrum des Blauen Reiter wurde. Während der NS-Zeit versteckte sie über 80 Ölbilder Kandinskys sowie hunderte Aquarelle und Zeichnungen im Keller des Murnauer Hauses und bewahrte sie so vor der Beschlagnahmung als „entartete Kunst". Zu ihrem 80. Geburtstag schenkte sie 1957 diesen Konvolut — rund 1.000 Werke — dem Lenbachhaus in München und begründete damit dessen Weltruhm. Sie selbst blieb bis zu ihrem Tod 1962 in Murnau.',
    source: { label: 'Wikipedia: Gabriele Münter', url: 'https://de.wikipedia.org/wiki/Gabriele_M%C3%BCnter' },
  },
  {
    id: 'franz-marc',
    category: 'personen',
    title: 'Franz Marc (1880–1916) — Die blauen Pferde',
    text:
      'Marc zog 1908 aufs Land und lebte ab 1910 in Sindelsdorf, ab 1914 in Ried bei Kochel, beides im weiteren Pfaffenwinkel südlich von Murnau. Gemeinsam mit Kandinsky gab er 1912 den Almanach „Der Blaue Reiter" heraus; die Initialzündung dazu kam bei einem Treffen in Murnau zustande. Im Ersten Weltkrieg fiel er am 4. März 1916 bei Verdun — ironischerweise war sein Name wenige Tage zuvor auf eine Liste zu schützender Künstler gesetzt worden, die Nachricht erreichte ihn nicht mehr. Das Franz Marc Museum in Kochel zeigt heute seinen Nachlass.',
    source: { label: 'Wikipedia: Franz Marc', url: 'https://de.wikipedia.org/wiki/Franz_Marc' },
  },
  {
    id: 'zimmermann',
    category: 'personen',
    title: 'Dominikus Zimmermann (1685–1766) — Baumeister der Wies',
    text:
      'Zimmermann errichtete zwischen 1745 und 1754 die Wallfahrtskirche „zum Gegeißelten Heiland auf der Wies" bei Steingaden, die seit 1983 UNESCO-Welterbe ist. Parallel amtierte er von 1749 bis 1753 als Bürgermeister von Landsberg am Lech, wo er seit 1716 lebte und zahlreiche Bauten schuf. Nach Vollendung der Wies zog er 1754 als alter Mann in ein kleines Haus direkt neben „seiner" Kirche und starb dort 1766. Sein Bruder Johann Baptist Zimmermann schuf die berühmten Deckenfresken der Wies.',
    source: { label: 'Wikipedia: Dominikus Zimmermann', url: 'https://de.wikipedia.org/wiki/Dominikus_Zimmermann' },
  },
  {
    id: 'carl-orff',
    category: 'personen',
    title: 'Carl Orff (1895–1982) — Carmina Burana, Grab in Andechs',
    text:
      'Orff, 1895 in München geboren, hatte eine lebenslange Verbindung zum Kloster Andechs am Ammersee, das er als „meinen heiligen Berg" bezeichnete. Dort wurden mehrere seiner Werke uraufgeführt, darunter 1973 „De temporum fine comoedia". Nach seinem Tod 1982 wurde er in der Schmerzhaften Kapelle der Klosterkirche Andechs beigesetzt. Wenig bekannt: Orff wirkte 1946 als Berater bei der Entnazifizierung mit und erfand dabei eine fiktive Widerstandsrolle für sich, was erst Jahrzehnte später aufgedeckt wurde.',
    source: { label: 'Wikipedia: Carl Orff', url: 'https://de.wikipedia.org/wiki/Carl_Orff' },
  },
  {
    id: 'welf-vi',
    category: 'personen',
    title: 'Welf VI. (1115–1191) — Stifter von Kloster Steingaden',
    text:
      'Welf VI., Onkel Kaiser Friedrich Barbarossas, stiftete 1147 das Prämonstratenserkloster Steingaden, das zur geistlichen Keimzelle des Pfaffenwinkels wurde — aus ihm ging Jahrhunderte später die Wieskirche als Klosterkirche hervor. Er residierte zeitweise auf dem nahen Peitinger Schlossberg („Welfenburg"), der heute nur noch als Bodendenkmal erhalten ist. Tragischerweise verlor Welf 1167 seinen einzigen Sohn Welf VII. auf dem Italienzug und verkaufte daraufhin einen Großteil seiner Güter an die Staufer — damit endete die süddeutsche Welfenherrschaft. Er wurde in Steingaden bestattet.',
    source: { label: 'Wikipedia: Welf VI.', url: 'https://de.wikipedia.org/wiki/Welf_VI.' },
  },

  // ─── Kurios ─────────────────────────────────────────────
  {
    id: 'forggensee',
    category: 'kurios',
    title: 'Forggensee — Bayerns größter Stausee verschwindet jeden Winter',
    text:
      'Der 15,2 km² große Forggensee wurde 1952–1954 als Speichersee der Lech-Staustufe angestaut und ist mit 16,5 km² (Vollstau) größter Stausee Deutschlands. Zwischen Oktober und Juni wird er um bis zu 17 m abgesenkt, wodurch Reste der Via Claudia Augusta und die Kapelle von Forggen sichtbar werden. Das versunkene Dorf Forggen wurde vor dem Anstau abgerissen.',
    source: { label: 'Wikipedia: Forggensee', url: 'https://de.wikipedia.org/wiki/Forggensee' },
  },
  {
    id: 'neuschwanstein',
    category: 'kurios',
    title: 'Neuschwanstein — Disneys Schloss-Vorlage von 1935',
    text:
      'Walt Disney besuchte Neuschwanstein 1935 auf seiner Europareise; das 1869–1886 errichtete Schloss diente als direkte Inspiration für das „Sleeping Beauty Castle" in Disneyland Anaheim (1955). König Ludwig II. wohnte nur 172 Tage in seinem Prunkbau, da er am 13. Juni 1886 im Starnberger See starb. Heute besuchen rund 1,4 Millionen Touristen pro Jahr das Schloss.',
    source: { label: 'Wikipedia: Schloss Neuschwanstein', url: 'https://de.wikipedia.org/wiki/Schloss_Neuschwanstein' },
  },
  {
    id: 'ms-diessen',
    category: 'kurios',
    title: 'Ammersee-Dampfer — seit 10. Juli 1879',
    text:
      'Die Ammersee-Dampferflotte verkehrt seit dem 10. Juli 1879; das aktuelle Flaggschiff MS Dießen wurde 2013 in Dienst gestellt und erreicht 18,5 km/h. Bis 1957 fuhr der echte Salondampfer „Bayern" mit Kohlefeuerung über den See. Bayerische Seenschifffahrt befördert rund 500.000 Fahrgäste pro Jahr auf dem Ammersee.',
    source: { label: 'Wikipedia: Bayerische Seenschifffahrt', url: 'https://de.wikipedia.org/wiki/Bayerische_Seenschifffahrt' },
  },
];
