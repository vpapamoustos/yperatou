function createEuropeDescriptionHtml(metadata) {
  return `Πρωτεύουσα: ${metadata.capital}.<br>Ορόσημο: ${metadata.landmark}.<br>${metadata.fact}`;
}

export const rawEuropeCards = [
  {
    id: "eu001",
    name: "Ελλάδα",
    image: "assets/europe/greece.jpg",
    isActive: true,
    metadata: {
      capital: "Αθήνα",
      landmark: "Παρθενώνας",
      fact: "Ο Παρθενώνας χτίστηκε πριν από περίπου 2.500 χρόνια και είναι αφιερωμένος στη θεά Αθηνά, προστάτιδα της αρχαίας Αθήνας."
    },
    attributes: {
      population: 10.3,
      area: 131957,
      lifeExpectancy: 81.5,
      distanceFromGreece: 0
    },
    descriptionHtml: null
  },
  {
    id: "eu002",
    name: "Ιταλία",
    image: "assets/europe/italy.jpg",
    isActive: true,
    metadata: {
      capital: "Ρώμη",
      landmark: "Κολοσσαίο",
      fact: "Το Κολοσσαίο μπορούσε να χωρέσει δεκάδες χιλιάδες θεατές, που παρακολουθούσαν θεάματα στην καρδιά της αρχαίας Ρώμης."
    },
    attributes: {
      population: 58.9,
      area: 301340,
      lifeExpectancy: 83.4,
      distanceFromGreece: 1051
    },
    descriptionHtml: null
  },
  {
    id: "eu003",
    name: "Γαλλία",
    image: "assets/europe/france.jpg",
    isActive: true,
    metadata: {
      capital: "Παρίσι",
      landmark: "Πύργος Άιφελ",
      fact: "Ο Πύργος Άιφελ κατασκευάστηκε για την Παγκόσμια Έκθεση του 1889 και σήμερα είναι ένα από τα πιο αναγνωρίσιμα μνημεία στον κόσμο."
    },
    attributes: {
      population: 68.6,
      area: 551695,
      lifeExpectancy: 82.8,
      distanceFromGreece: 2096
    },
    descriptionHtml: null
  },
  {
    id: "eu004",
    name: "Γερμανία",
    image: "assets/europe/germany.jpg",
    isActive: true,
    metadata: {
      capital: "Βερολίνο",
      landmark: "Πύλη Βρανδεμβούργου",
      fact: "Η Πύλη Βρανδεμβούργου έγινε σύμβολο της ενότητας της Γερμανίας μετά την πτώση του Τείχους του Βερολίνου."
    },
    attributes: {
      population: 83.5,
      area: 357022,
      lifeExpectancy: 81.0,
      distanceFromGreece: 1803
    },
    descriptionHtml: null
  },
  {
    id: "eu005",
    name: "Ισπανία",
    image: "assets/europe/spain.jpg",
    isActive: true,
    metadata: {
      capital: "Μαδρίτη",
      landmark: "Sagrada Familia",
      fact: "Η Sagrada Familia χτίζεται εδώ και πάνω από 140 χρόνια και παραμένει ένα από τα πιο ξεχωριστά αρχιτεκτονικά έργα της Ευρώπης."
    },
    attributes: {
      population: 48.6,
      area: 505990,
      lifeExpectancy: 83.2,
      distanceFromGreece: 2370
    },
    descriptionHtml: null
  },
  {
    id: "eu006",
    name: "Πορτογαλία",
    image: "assets/europe/portugal.jpg",
    isActive: true,
    metadata: {
      capital: "Λισαβόνα",
      landmark: "Πύργος Belém",
      fact: "Ο Πύργος Belém χτίστηκε κοντά στο σημείο απ’ όπου ξεκινούσαν μεγάλα θαλάσσια ταξίδια Πορτογάλων εξερευνητών."
    },
    attributes: {
      population: 10.5,
      area: 92212,
      lifeExpectancy: 81.5,
      distanceFromGreece: 2852
    },
    descriptionHtml: null
  },
  {
    id: "eu007",
    name: "Ολλανδία",
    image: "assets/europe/netherlands.jpg",
    isActive: true,
    metadata: {
      capital: "Άμστερνταμ",
      landmark: "Ανεμόμυλοι Kinderdijk",
      fact: "Οι ανεμόμυλοι του Kinderdijk βοήθησαν τους ανθρώπους να ελέγχουν τα νερά σε μια χώρα όπου μεγάλο μέρος της γης βρίσκεται πολύ χαμηλά."
    },
    attributes: {
      population: 17.9,
      area: 41543,
      lifeExpectancy: 81.8,
      distanceFromGreece: 2163
    },
    descriptionHtml: null
  },
  {
    id: "eu008",
    name: "Βέλγιο",
    image: "assets/europe/belgium.jpg",
    isActive: true,
    metadata: {
      capital: "Βρυξέλλες",
      landmark: "Atomium",
      fact: "Το Atomium μοιάζει με τεράστιο άτομο μεγεθυμένο δισεκατομμύρια φορές και δημιουργήθηκε για την Παγκόσμια Έκθεση του 1958."
    },
    attributes: {
      population: 11.7,
      area: 30528,
      lifeExpectancy: 81.9,
      distanceFromGreece: 2090
    },
    descriptionHtml: null
  },
  {
    id: "eu009",
    name: "Αυστρία",
    image: "assets/europe/austria.jpg",
    isActive: true,
    metadata: {
      capital: "Βιέννη",
      landmark: "Ανάκτορο Schönbrunn",
      fact: "Το Schönbrunn ήταν θερινό παλάτι των Αψβούργων και έχει εκατοντάδες δωμάτια, κήπους και αίθουσες γεμάτες αυτοκρατορική ιστορία."
    },
    attributes: {
      population: 9.1,
      area: 83879,
      lifeExpectancy: 82.0,
      distanceFromGreece: 1283
    },
    descriptionHtml: null
  },
  {
    id: "eu010",
    name: "Ελβετία",
    image: "assets/europe/switzerland.jpg",
    isActive: true,
    metadata: {
      capital: "Βέρνη",
      landmark: "Matterhorn",
      fact: "Το Matterhorn είναι ένα από τα πιο διάσημα βουνά των Άλπεων, με χαρακτηριστική πυραμιδοειδή κορυφή που ξεχωρίζει αμέσως."
    },
    attributes: {
      population: 8.9,
      area: 41285,
      lifeExpectancy: 83.8,
      distanceFromGreece: 1620
    },
    descriptionHtml: null
  },
  {
    id: "eu011",
    name: "Σουηδία",
    image: "assets/europe/sweden.jpg",
    isActive: true,
    metadata: {
      capital: "Στοκχόλμη",
      landmark: "Δημαρχείο Στοκχόλμης",
      fact: "Στο Δημαρχείο της Στοκχόλμης γίνεται κάθε χρόνο το επίσημο δείπνο των Βραβείων Νόμπελ."
    },
    attributes: {
      population: 10.6,
      area: 450295,
      lifeExpectancy: 82.4,
      distanceFromGreece: 2408
    },
    descriptionHtml: null
  },
  {
    id: "eu012",
    name: "Νορβηγία",
    image: "assets/europe/norway.jpg",
    isActive: true,
    metadata: {
      capital: "Όσλο",
      landmark: "Geirangerfjord",
      fact: "Το Geirangerfjord είναι ένα βαθύ φιόρδ με απότομους βράχους και καταρράκτες, σαν φυσικός δρόμος που άνοιξε η θάλασσα μέσα στα βουνά."
    },
    attributes: {
      population: 5.5,
      area: 385207,
      lifeExpectancy: 83.0,
      distanceFromGreece: 2605
    },
    descriptionHtml: null
  },
  {
    id: "eu013",
    name: "Δανία",
    image: "assets/europe/denmark.jpg",
    isActive: true,
    metadata: {
      capital: "Κοπεγχάγη",
      landmark: "Μικρή Γοργόνα",
      fact: "Το άγαλμα της Μικρής Γοργόνας είναι εμπνευσμένο από το παραμύθι του Χανς Κρίστιαν Άντερσεν, ενός από τους πιο γνωστούς παραμυθάδες."
    },
    attributes: {
      population: 5.9,
      area: 42933,
      lifeExpectancy: 81.6,
      distanceFromGreece: 2135
    },
    descriptionHtml: null
  },
  {
    id: "eu014",
    name: "Φινλανδία",
    image: "assets/europe/finland.jpg",
    isActive: true,
    metadata: {
      capital: "Ελσίνκι",
      landmark: "Καθεδρικός Ελσίνκι",
      fact: "Ο λευκός Καθεδρικός του Ελσίνκι δεσπόζει πάνω από την πλατεία της πόλης και είναι ένα από τα πιο φωτογραφημένα σημεία της Φινλανδίας."
    },
    attributes: {
      population: 5.6,
      area: 338455,
      lifeExpectancy: 82.0,
      distanceFromGreece: 2500
    },
    descriptionHtml: null
  },
  {
    id: "eu015",
    name: "Ιρλανδία",
    image: "assets/europe/ireland.jpg",
    isActive: true,
    metadata: {
      capital: "Δουβλίνο",
      landmark: "Cliffs of Moher",
      fact: "Τα Cliffs of Moher υψώνονται εντυπωσιακά πάνω από τον Ατλαντικό Ωκεανό, δημιουργώντας ένα από τα πιο δυνατά φυσικά τοπία της Ιρλανδίας."
    },
    attributes: {
      population: 5.3,
      area: 70273,
      lifeExpectancy: 82.3,
      distanceFromGreece: 2860
    },
    descriptionHtml: null
  },
  {
    id: "eu016",
    name: "Ηνωμένο Βασίλειο",
    image: "assets/europe/uk.jpg",
    isActive: true,
    metadata: {
      capital: "Λονδίνο",
      landmark: "Big Ben",
      fact: "Το Big Ben είναι το διάσημο ρολόι του Λονδίνου και οι καμπάνες του έχουν συνδεθεί με σημαντικές στιγμές της βρετανικής ιστορίας."
    },
    attributes: {
      population: 67.7,
      area: 243610,
      lifeExpectancy: 81.0,
      distanceFromGreece: 2400
    },
    descriptionHtml: null
  },
  {
    id: "eu017",
    name: "Πολωνία",
    image: "assets/europe/poland.jpg",
    isActive: true,
    metadata: {
      capital: "Βαρσοβία",
      landmark: "Κάστρο Wawel",
      fact: "Το Κάστρο Wawel στην Κρακοβία ήταν για αιώνες κατοικία Πολωνών βασιλιάδων και μοιάζει με σκηνικό από μεσαιωνικό παραμύθι."
    },
    attributes: {
      population: 36.8,
      area: 312696,
      lifeExpectancy: 78.6,
      distanceFromGreece: 1598
    },
    descriptionHtml: null
  },
  {
    id: "eu018",
    name: "Τσεχία",
    image: "assets/europe/czechia.jpg",
    isActive: true,
    metadata: {
      capital: "Πράγα",
      landmark: "Γέφυρα Καρόλου",
      fact: "Η Γέφυρα Καρόλου ενώνει τις δύο πλευρές της Πράγας και είναι γεμάτη αγάλματα, μουσικούς και ιστορίες από τον Μεσαίωνα."
    },
    attributes: {
      population: 10.9,
      area: 78865,
      lifeExpectancy: 79.5,
      distanceFromGreece: 1535
    },
    descriptionHtml: null
  },
  {
    id: "eu019",
    name: "Ουγγαρία",
    image: "assets/europe/hungary.jpg",
    isActive: true,
    metadata: {
      capital: "Βουδαπέστη",
      landmark: "Κοινοβούλιο Βουδαπέστης",
      fact: "Το Κοινοβούλιο της Βουδαπέστης στέκεται δίπλα στον Δούναβη και είναι ένα από τα μεγαλύτερα και πιο εντυπωσιακά κτίρια κοινοβουλίου στην Ευρώπη."
    },
    attributes: {
      population: 9.6,
      area: 93030,
      lifeExpectancy: 76.7,
      distanceFromGreece: 1125
    },
    descriptionHtml: null
  },
  {
    id: "eu020",
    name: "Ρουμανία",
    image: "assets/europe/romania.jpg",
    isActive: true,
    metadata: {
      capital: "Βουκουρέστι",
      landmark: "Κάστρο Bran",
      fact: "Το Κάστρο Bran έγινε διάσημο χάρη στους θρύλους γύρω από τον Δράκουλα, αν και η πραγματική του ιστορία είναι ακόμα πιο παλιά."
    },
    attributes: {
      population: 19.0,
      area: 238397,
      lifeExpectancy: 76.6,
      distanceFromGreece: 743
    },
    descriptionHtml: null
  },
  {
    id: "eu021",
    name: "Βουλγαρία",
    image: "assets/europe/bulgaria.jpg",
    isActive: true,
    metadata: {
      capital: "Σόφια",
      landmark: "Καθεδρικός Αλεξάντερ Νέφσκι",
      fact: "Ο Καθεδρικός Αλεξάντερ Νέφσκι με τους χρυσούς θόλους του είναι ένα από τα πιο χαρακτηριστικά σύμβολα της Σόφιας."
    },
    attributes: {
      population: 6.4,
      area: 110879,
      lifeExpectancy: 75.8,
      distanceFromGreece: 525
    },
    descriptionHtml: null
  },
  {
    id: "eu022",
    name: "Σερβία",
    image: "assets/europe/serbia.jpg",
    isActive: true,
    metadata: {
      capital: "Βελιγράδι",
      landmark: "Φρούριο Βελιγραδίου",
      fact: "Το Φρούριο Βελιγραδίου βρίσκεται εκεί όπου συναντιούνται ο Δούναβης και ο Σάβος, σημείο στρατηγικής σημασίας για πολλούς αιώνες."
    },
    attributes: {
      population: 6.6,
      area: 88361,
      lifeExpectancy: 75.5,
      distanceFromGreece: 805
    },
    descriptionHtml: null
  },
  {
    id: "eu023",
    name: "Κροατία",
    image: "assets/europe/croatia.jpg",
    isActive: true,
    metadata: {
      capital: "Ζάγκρεμπ",
      landmark: "Τείχη Ντουμπρόβνικ",
      fact: "Τα Τείχη του Ντουμπρόβνικ αγκαλιάζουν την παλιά πόλη και την προστάτευαν από επιθέσεις, ενώ σήμερα προσφέρουν μοναδική θέα στην Αδριατική."
    },
    attributes: {
      population: 3.9,
      area: 56594,
      lifeExpectancy: 78.3,
      distanceFromGreece: 1080
    },
    descriptionHtml: null
  },
  {
    id: "eu024",
    name: "Σλοβενία",
    image: "assets/europe/slovenia.jpg",
    isActive: true,
    metadata: {
      capital: "Λιουμπλιάνα",
      landmark: "Λίμνη Bled",
      fact: "Στη Λίμνη Bled υπάρχει ένα μικρό νησί με εκκλησία, ενώ γύρω του υψώνονται βουνά που κάνουν το τοπίο να μοιάζει παραμυθένιο."
    },
    attributes: {
      population: 2.1,
      area: 20273,
      lifeExpectancy: 81.3,
      distanceFromGreece: 1205
    },
    descriptionHtml: null
  },
  {
    id: "eu025",
    name: "Σλοβακία",
    image: "assets/europe/slovakia.jpg",
    isActive: false,
    metadata: {
      capital: "Μπρατισλάβα",
      landmark: "Κάστρο Μπρατισλάβας",
      fact: "Το Κάστρο της Μπρατισλάβας στέκεται πάνω από τον Δούναβη και φαίνεται από πολλά σημεία της πόλης σαν λευκός φύλακας στον λόφο."
    },
    attributes: {
      population: 5.4,
      area: 49035,
      lifeExpectancy: 77.8,
      distanceFromGreece: 1250
    },
    descriptionHtml: null
  },
  {
    id: "eu026",
    name: "Λιθουανία",
    image: "assets/europe/lithuania.jpg",
    isActive: true,
    metadata: {
      capital: "Βίλνιους",
      landmark: "Παλιά Πόλη Βίλνιους",
      fact: "Η Παλιά Πόλη του Βίλνιους είναι γεμάτη εκκλησίες, στενά δρομάκια και στέγες από κεραμίδια, θυμίζοντας ζωντανό χάρτη ιστορίας."
    },
    attributes: {
      population: 2.9,
      area: 65300,
      lifeExpectancy: 76.0,
      distanceFromGreece: 1860
    },
    descriptionHtml: null
  },
  {
    id: "eu027",
    name: "Λετονία",
    image: "assets/europe/latvia.jpg",
    isActive: true,
    metadata: {
      capital: "Ρίγα",
      landmark: "Παλιά Πόλη Ρίγας",
      fact: "Η Παλιά Πόλη της Ρίγας ξεχωρίζει για τους πύργους, τις πολύχρωμες προσόψεις και τα κτίρια που δείχνουν την ιστορία της Βαλτικής."
    },
    attributes: {
      population: 1.9,
      area: 64589,
      lifeExpectancy: 75.5,
      distanceFromGreece: 2000
    },
    descriptionHtml: null
  },
  {
    id: "eu028",
    name: "Εσθονία",
    image: "assets/europe/estonia.jpg",
    isActive: true,
    metadata: {
      capital: "Ταλίν",
      landmark: "Παλιά Πόλη Ταλίν",
      fact: "Η Παλιά Πόλη του Ταλίν έχει μεσαιωνικά τείχη, πύργους και κόκκινες στέγες, σαν σκηνικό από ιστορία ιπποτών."
    },
    attributes: {
      population: 1.4,
      area: 45227,
      lifeExpectancy: 78.8,
      distanceFromGreece: 2200
    },
    descriptionHtml: null
  },
  {
    id: "eu029",
    name: "Ισλανδία",
    image: "assets/europe/iceland.jpg",
    isActive: true,
    metadata: {
      capital: "Ρέικιαβικ",
      landmark: "Blue Lagoon",
      fact: "Το Blue Lagoon έχει γαλάζια γεωθερμικά νερά που ζεσταίνονται φυσικά από τη γη, ανάμεσα σε μαύρα ηφαιστειακά πετρώματα."
    },
    attributes: {
      population: 0.4,
      area: 103000,
      lifeExpectancy: 83.1,
      distanceFromGreece: 4020
    },
    descriptionHtml: null
  },
  {
    id: "eu030",
    name: "Μάλτα",
    image: "assets/europe/malta.jpg",
    isActive: true,
    metadata: {
      capital: "Βαλέτα",
      landmark: "Καθεδρικός Αγίου Ιωάννη",
      fact: "Ο Καθεδρικός Αγίου Ιωάννη στη Βαλέτα χτίστηκε από τους Ιππότες της Μάλτας και κρύβει εντυπωσιακή μπαρόκ τέχνη στο εσωτερικό του."
    },
    attributes: {
      population: 0.5,
      area: 316,
      lifeExpectancy: 83.0,
      distanceFromGreece: 870
    },
    descriptionHtml: null
  },
  {
    id: "eu031",
    name: "Κύπρος",
    image: "assets/europe/cyprus.jpg",
    isActive: true,
    metadata: {
      capital: "Λευκωσία",
      landmark: "Ενετικές Οχυρώσεις Λευκωσίας",
      fact: "Οι Ενετικές Οχυρώσεις της Λευκωσίας χτίστηκαν τον 16ο αιώνα και σχηματίζουν έναν μεγάλο αμυντικό κύκλο γύρω από την παλιά πόλη."
    },
    attributes: {
      population: 1.3,
      area: 9251,
      lifeExpectancy: 82.2,
      distanceFromGreece: 930
    },
    descriptionHtml: null
  }
];

export const europeDeck = {
  id: "europe",
  name: "Europe",
  title: "Χώρες της Ευρώπης",
  version: 1,
  isActive: true,
  description: "Deck με χώρες της Ευρώπης.",
  attributeLabels: {
    population: "Πληθυσμός",
    area: "Έκταση",
    lifeExpectancy: "Προσδόκιμο ζωής",
    distanceFromGreece: "Απόσταση από Ελλάδα"
  },
  cards: rawEuropeCards.map(card => ({
    ...card,
    descriptionHtml: createEuropeDescriptionHtml(card.metadata)
  }))
};