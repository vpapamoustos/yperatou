const CARS = [
  { name: "Ferrari F40", country: "Italy", rarity: "Legendary", speed: 324, hp: 478, accel: 4.1, value: 2500000, image: "assets/cars/car_01.jpg" },
  { name: "Porsche 911 GT3 RS", country: "Germany", rarity: "Epic", speed: 296, hp: 525, accel: 3.2, value: 350000, image: "assets/cars/car_02.jpg" },
  { name: "McLaren 720S", country: "UK", rarity: "Epic", speed: 341, hp: 710, accel: 2.9, value: 220000, image: "assets/cars/car_03.jpg" },
  { name: "Audi R8", country: "Germany", rarity: "Rare", speed: 331, hp: 620, accel: 3.1, value: 140000, image: "assets/cars/car_04.jpg" },
  { name: "BMW M4 CSL", country: "Germany", rarity: "Rare", speed: 307, hp: 550, accel: 3.7, value: 150000, image: "assets/cars/car_05.jpg" },
  { name: "Porsche Cayman GT4", country: "Germany", rarity: "Rare", speed: 304, hp: 420, accel: 4.2, value: 110000, image: "assets/cars/car_06.jpg" },
  { name: "Toyota Supra MK4 (A80)", country: "Japan", rarity: "Rare", speed: 250, hp: 320, accel: 4.9, value: 110000, image: "assets/cars/car_07.jpg" },
  { name: "Lamborghini Gallardo", country: "Italy", rarity: "Rare", speed: 325, hp: 560, accel: 3.7, value: 130000, image: "assets/cars/car_08.jpg" },
  { name: "Nissan GT-R R35", country: "Japan", rarity: "Uncommon", speed: 315, hp: 565, accel: 2.9, value: 95000, image: "assets/cars/car_09.jpg" },
  { name: "Subaru WRX STI", country: "Japan", rarity: "Uncommon", speed: 255, hp: 310, accel: 5.2, value: 35000, image: "assets/cars/car_10.jpg" },
  { name: "BMW M3", country: "Germany", rarity: "Uncommon", speed: 290, hp: 510, accel: 3.9, value: 80000, image: "assets/cars/car_11.jpg" },
  { name: "BMW M2", country: "Germany", rarity: "Uncommon", speed: 285, hp: 460, accel: 4.1, value: 65000, image: "assets/cars/car_12.jpg" },
  { name: "Audi RS3", country: "Germany", rarity: "Uncommon", speed: 290, hp: 400, accel: 3.8, value: 70000, image: "assets/cars/car_13.jpg" },
  { name: "Mercedes-AMG A45", country: "Germany", rarity: "Uncommon", speed: 270, hp: 421, accel: 3.9, value: 65000, image: "assets/cars/car_14.jpg" },
  { name: "Ford Mustang GT", country: "USA", rarity: "Uncommon", speed: 250, hp: 450, accel: 4.5, value: 55000, image: "assets/cars/car_15.jpg" },
  { name: "Chevrolet Camaro SS", country: "USA", rarity: "Uncommon", speed: 290, hp: 455, accel: 4.2, value: 50000, image: "assets/cars/car_16.jpg" },
  { name: "Aston Martin Vantage", country: "UK", rarity: "Uncommon", speed: 314, hp: 510, accel: 3.6, value: 120000, image: "assets/cars/car_17.jpg" },
  { name: "Nissan 370Z", country: "Japan", rarity: "Uncommon", speed: 250, hp: 332, accel: 5.0, value: 35000, image: "assets/cars/car_18.jpg" },
  { name: "Mazda MX-5 ND", country: "Japan", rarity: "Common", speed: 220, hp: 184, accel: 6.5, value: 28000, image: "assets/cars/car_19.jpg" },
  { name: "Toyota GR86", country: "Japan", rarity: "Common", speed: 226, hp: 234, accel: 6.3, value: 35000, image: "assets/cars/car_20.jpg" },
  { name: "Subaru BRZ", country: "Japan", rarity: "Common", speed: 226, hp: 234, accel: 6.5, value: 34000, image: "assets/cars/car_21.jpg" },
  { name: "Hyundai i30 N", country: "Korea", rarity: "Common", speed: 250, hp: 280, accel: 5.9, value: 32000, image: "assets/cars/car_22.jpg" },
  { name: "Volkswagen Golf GTI", country: "Germany", rarity: "Common", speed: 250, hp: 265, accel: 5.9, value: 38000, image: "assets/cars/car_23.jpg" },
  { name: "Honda Civic Type R", country: "Japan", rarity: "Common", speed: 275, hp: 329, accel: 5.4, value: 50000, image: "assets/cars/car_24.jpg" },
  { name: "Ford Focus ST", country: "USA", rarity: "Common", speed: 250, hp: 280, accel: 5.7, value: 29000, image: "assets/cars/car_25.jpg" },
  { name: "Ford Fiesta ST", country: "USA", rarity: "Common", speed: 230, hp: 200, accel: 6.5, value: 22000, image: "assets/cars/car_26.jpg" },
  { name: "Mini Cooper S", country: "UK", rarity: "Common", speed: 235, hp: 204, accel: 6.7, value: 26000, image: "assets/cars/car_27.jpg" },
  { name: "Toyota GR Yaris", country: "Japan", rarity: "Common", speed: 230, hp: 280, accel: 5.5, value: 45000, image: "assets/cars/car_28.jpg" },
  { name: "Renault Megane RS", country: "France", rarity: "Common", speed: 255, hp: 300, accel: 5.8, value: 28000, image: "assets/cars/car_29.jpg" },
  { name: "Audi S3", country: "Germany", rarity: "Common", speed: 250, hp: 310, accel: 4.8, value: 38000, image: "assets/cars/car_30.jpg" }
];

const SPACE = [
  { name: "Γη", country: "Πλανήτης", rarity: "Common", diameter: 12742, gravity: 9.8, temperature: 15, moons: 1, image: "assets/space/space_01.jpg" },
  { name: "Σελήνη", country: "Φεγγάρι Γης", rarity: "Common", diameter: 3475, gravity: 1.62, temperature: -20, moons: 0, image: "assets/space/space_02.jpg" },
  { name: "Άρης", country: "Πλανήτης", rarity: "Common", diameter: 6779, gravity: 3.72, temperature: -63, moons: 2, image: "assets/space/space_03.jpg" },
  { name: "Αφροδίτη", country: "Πλανήτης", rarity: "Common", diameter: 12104, gravity: 8.87, temperature: 464, moons: 0, image: "assets/space/space_04.jpg" },
  { name: "Ερμής", country: "Πλανήτης", rarity: "Common", diameter: 4879, gravity: 3.7, temperature: 167, moons: 0, image: "assets/space/space_05.jpg" },
  { name: "Ευρώπη", country: "Φεγγάρι Δία", rarity: "Common", diameter: 3122, gravity: 1.31, temperature: -160, moons: 0, image: "assets/space/space_06.jpg" },
  { name: "Ιώ", country: "Φεγγάρι Δία", rarity: "Common", diameter: 3643, gravity: 1.8, temperature: -130, moons: 0, image: "assets/space/space_07.jpg" },
  { name: "Καλλιστώ", country: "Φεγγάρι Δία", rarity: "Common", diameter: 4821, gravity: 1.24, temperature: -139, moons: 0, image: "assets/space/space_08.jpg" },
  { name: "Γανυμήδης", country: "Φεγγάρι Δία", rarity: "Common", diameter: 5268, gravity: 1.43, temperature: -163, moons: 0, image: "assets/space/space_09.jpg" },
  { name: "Τιτάνας", country: "Φεγγάρι Κρόνου", rarity: "Common", diameter: 5150, gravity: 1.35, temperature: -179, moons: 0, image: "assets/space/space_10.jpg" },
  { name: "Τρίτωνας", country: "Φεγγάρι Ποσειδώνα", rarity: "Common", diameter: 2707, gravity: 0.78, temperature: -235, moons: 0, image: "assets/space/space_11.jpg" },
  { name: "Εγκέλαδος", country: "Φεγγάρι Κρόνου", rarity: "Common", diameter: 504, gravity: 0.11, temperature: -201, moons: 0, image: "assets/space/space_12.jpg" },
  { name: "Δίας", country: "Πλανήτης", rarity: "Uncommon", diameter: 139820, gravity: 24.79, temperature: -110, moons: 95, image: "assets/space/space_13.jpg" },
  { name: "Κρόνος", country: "Πλανήτης", rarity: "Uncommon", diameter: 116460, gravity: 10.44, temperature: -140, moons: 146, image: "assets/space/space_14.jpg" },
  { name: "Ουρανός", country: "Πλανήτης", rarity: "Uncommon", diameter: 50724, gravity: 8.69, temperature: -195, moons: 28, image: "assets/space/space_15.jpg" },
  { name: "Ποσειδώνας", country: "Πλανήτης", rarity: "Uncommon", diameter: 49244, gravity: 11.15, temperature: -200, moons: 16, image: "assets/space/space_16.jpg" },
  { name: "Χάροντας", country: "Φεγγάρι Πλούτωνα", rarity: "Uncommon", diameter: 1212, gravity: 0.29, temperature: -220, moons: 0, image: "assets/space/space_17.jpg" },
  { name: "Ομπερόν", country: "Φεγγάρι Ουρανού", rarity: "Uncommon", diameter: 1523, gravity: 0.35, temperature: -198, moons: 0, image: "assets/space/space_18.jpg" },
  { name: "Τιτάνια", country: "Φεγγάρι Ουρανού", rarity: "Uncommon", diameter: 1578, gravity: 0.38, temperature: -203, moons: 0, image: "assets/space/space_19.jpg" },
  { name: "Ρέα", country: "Φεγγάρι Κρόνου", rarity: "Uncommon", diameter: 1528, gravity: 0.26, temperature: -174, moons: 0, image: "assets/space/space_20.jpg" },
  { name: "Ήλιος", country: "Αστέρας", rarity: "Rare", diameter: 1392700, gravity: 274, temperature: 5500, moons: 8, image: "assets/space/space_21.jpg" },
  { name: "Εγγύτατος Κενταύρου", country: "Αστέρας", rarity: "Rare", diameter: 214550, gravity: 1100, temperature: 3042, moons: 0, image: "assets/space/space_22.jpg" },
  { name: "Άστρο Barnard", country: "Αστέρας", rarity: "Rare", diameter: 274000, gravity: 950, temperature: 3134, moons: 0, image: "assets/space/space_23.jpg" },
  { name: "Σείριος Α", country: "Αστέρας", rarity: "Rare", diameter: 2380000, gravity: 196, temperature: 9940, moons: 0, image: "assets/space/space_24.jpg" },
  { name: "Βέγκα", country: "Αστέρας", rarity: "Rare", diameter: 3300000, gravity: 170, temperature: 9600, moons: 0, image: "assets/space/space_25.jpg" },
  { name: "Αλτάιρ", country: "Αστέρας", rarity: "Rare", diameter: 2500000, gravity: 130, temperature: 7550, moons: 0, image: "assets/space/space_26.jpg" },
  { name: "Πολικός Αστέρας", country: "Αστέρας", rarity: "Epic", diameter: 65000000, gravity: 5.5, temperature: 6015, moons: 0, image: "assets/space/space_27.jpg" },
  { name: "Ρίγκελ", country: "Αστέρας", rarity: "Epic", diameter: 109000000, gravity: 7.5, temperature: 12100, moons: 0, image: "assets/space/space_28.jpg" },
  { name: "Μπετελγκέζ", country: "Ερυθρός Υπεργίγαντας", rarity: "Epic", diameter: 1234000000, gravity: 0.002, temperature: 3500, moons: 0, image: "assets/space/space_29.jpg" },
  { name: "UY Scuti", country: "Ερυθρός Υπεργίγαντας", rarity: "Legendary", diameter: 2376000000, gravity: 0.001, temperature: 3365, moons: 0, image: "assets/space/space_30.jpg" }
];

const EUROPE = [
  { name:"Ελλάδα", population:10.3, area:131957, lifeExpectancy:81.5, distanceFromGreece:0, info:"Πρωτεύουσα: Αθήνα.<br>Ορόσημο: Παρθενώνας.<br>Η Ελλάδα θεωρείται γενέτειρα της δημοκρατίας και των Ολυμπιακών Αγώνων.", image:"assets/europe/greece.jpg" },
  { name:"Ιταλία", population:58.9, area:301340, lifeExpectancy:83.4, distanceFromGreece:1051, info:"Πρωτεύουσα: Ρώμη.<br>Ορόσημο: Κολοσσαίο.<br>Η Ιταλία υπήρξε το κέντρο της Ρωμαϊκής Αυτοκρατορίας και της Αναγέννησης.", image:"assets/europe/italy.jpg" },
  { name:"Γαλλία", population:68.6, area:551695, lifeExpectancy:82.8, distanceFromGreece:2096, info:"Πρωτεύουσα: Παρίσι.<br>Ορόσημο: Πύργος Άιφελ.<br> Η Γαλλία έχει ασκήσει μεγάλη επιρροή στην τέχνη, τη μόδα και τη γαστρονομία.", image:"assets/europe/france.jpg" },
  { name:"Γερμανία", population:83.5, area:357022, lifeExpectancy:81.0, distanceFromGreece:1803, info:"Πρωτεύουσα: Βερολίνο.<br>Ορόσημο: Πύλη Βρανδεμβούργου.<br>Η Γερμανία διαθέτει τη μεγαλύτερη οικονομία της Ευρώπης.", image:"assets/europe/germany.jpg" },
  { name:"Ισπανία", population:48.6, area:505990, lifeExpectancy:83.2, distanceFromGreece:2370, info:"Πρωτεύουσα: Μαδρίτη.<br>Ορόσημο: Sagrada Familia.<br>Η Ισπανία είναι γνωστή για τον πολιτισμό της και την ποδοσφαιρική της παράδοση.", image:"assets/europe/spain.jpg" },
  { name:"Πορτογαλία", population:10.5, area:92212, lifeExpectancy:81.5, distanceFromGreece:2852, info:"Πρωτεύουσα: Λισαβόνα.<br>Ορόσημο: Πύργος Belém.<br>Οι Πορτογάλοι εξερευνητές πρωταγωνίστησαν στην Εποχή των Ανακαλύψεων.", image:"assets/europe/portugal.jpg" },
  { name:"Ολλανδία", population:17.9, area:41543, lifeExpectancy:81.8, distanceFromGreece:2163, info:"Πρωτεύουσα: Άμστερνταμ.<br>Ορόσημο: Ανεμόμυλοι Kinderdijk.<br>Η χώρα έχει ανακτήσει σημαντικές εκτάσεις γης από τη θάλασσα.", image:"assets/europe/netherlands.jpg" },
  { name:"Βέλγιο", population:11.7, area:30528, lifeExpectancy:81.9, distanceFromGreece:2090, info:"Πρωτεύουσα: Βρυξέλλες.<br>Ορόσημο: Atomium.<br>Το Βέλγιο φιλοξενεί σημαντικούς θεσμούς της Ευρωπαϊκής Ένωσης.", image:"assets/europe/belgium.jpg" },
  { name:"Αυστρία", population:9.1, area:83879, lifeExpectancy:82.0, distanceFromGreece:1283, info:"Πρωτεύουσα: Βιέννη.<br>Ορόσημο: Ανάκτορο Schönbrunn.<br>Η Αυστρία είναι γνωστή για την κλασική μουσική και τους μεγάλους συνθέτες της.", image:"assets/europe/austria.jpg" },
  { name:"Ελβετία", population:8.9, area:41285, lifeExpectancy:83.8, distanceFromGreece:1620, info:"Πρωτεύουσα: Βέρνη.<br>Ορόσημο: Matterhorn.<br>Η Ελβετία είναι γνωστή για τις Άλπεις, την ουδετερότητα και την υψηλή ποιότητα ζωής.", image:"assets/europe/switzerland.jpg" },
  { name:"Σουηδία", population:10.6, area:450295, lifeExpectancy:82.4, distanceFromGreece:2408, info:"Πρωτεύουσα: Στοκχόλμη.<br>Ορόσημο: Δημαρχείο Στοκχόλμης.<br>Στη Σουηδία απονέμονται κάθε χρόνο τα Βραβεία Νόμπελ.", image:"assets/europe/sweden.jpg" },
  { name:"Νορβηγία", population:5.5, area:385207, lifeExpectancy:83.0, distanceFromGreece:2605, info:"Πρωτεύουσα: Όσλο.<br>Ορόσημο: Geirangerfjord.<br>Η Νορβηγία είναι γνωστή για τα φιόρδ, τη ναυτική της παράδοση και το βόρειο σέλας.", image:"assets/europe/norway.jpg" },
  { name:"Δανία", population:5.9, area:42933, lifeExpectancy:81.6, distanceFromGreece:2135, info:"Πρωτεύουσα: Κοπεγχάγη.<br>Ορόσημο: Μικρή Γοργόνα.<br>Η Δανία είναι γνωστή για το design, την ποδηλασία και την έννοια hygge.", image:"assets/europe/denmark.jpg" },
  { name:"Φινλανδία", population:5.6, area:338455, lifeExpectancy:82.0, distanceFromGreece:2500, info:"Πρωτεύουσα: Ελσίνκι.<br>Ορόσημο: Καθεδρικός Ελσίνκι.<br>Η Φινλανδία είναι γνωστή για την εκπαίδευση, τις λίμνες και τη σάουνα.", image:"assets/europe/finland.jpg" },
  { name:"Ιρλανδία", population:5.3, area:70273, lifeExpectancy:82.3, distanceFromGreece:2860, info:"Πρωτεύουσα: Δουβλίνο.<br>Ορόσημο: Cliffs of Moher.<br>Η Ιρλανδία είναι γνωστή για τη λογοτεχνία, τη μουσική και την κελτική παράδοση.", image:"assets/europe/ireland.jpg" },
  { name:"Ηνωμένο Βασίλειο", population:67.7, area:243610, lifeExpectancy:81.0, distanceFromGreece:2400, info:"Πρωτεύουσα: Λονδίνο.<br>Ορόσημο: Big Ben.<br>Το Ηνωμένο Βασίλειο επηρέασε σημαντικά την παγκόσμια ιστορία, τη γλώσσα και τη βιομηχανική επανάσταση.", image:"assets/europe/uk.jpg" },
  { name:"Πολωνία", population:36.8, area:312696, lifeExpectancy:78.6, distanceFromGreece:1598, info:"Πρωτεύουσα: Βαρσοβία.<br>Ορόσημο: Κάστρο Wawel.<br>Η Πολωνία είναι η πατρίδα της βραβευμένης με Νόμπελ Μαρίας Κιουρί.", image:"assets/europe/poland.jpg" },
  { name:"Τσεχία", population:10.9, area:78865, lifeExpectancy:79.5, distanceFromGreece:1535, info:"Πρωτεύουσα: Πράγα.<br>Ορόσημο: Γέφυρα Καρόλου.<br>Η Τσεχία είναι γνωστή για τη μεσαιωνική Πράγα και την πλούσια μουσική της παράδοση.", image:"assets/europe/czechia.jpg" },
  { name:"Ουγγαρία", population:9.6, area:93030, lifeExpectancy:76.7, distanceFromGreece:1125, info:"Πρωτεύουσα: Βουδαπέστη.<br>Ορόσημο: Κοινοβούλιο Βουδαπέστης.<br>Η Ουγγαρία είναι γνωστή για τον Δούναβη και τα θερμά λουτρά της.", image:"assets/europe/hungary.jpg" },
  { name:"Ρουμανία", population:19.0, area:238397, lifeExpectancy:76.6, distanceFromGreece:743, info:"Πρωτεύουσα: Βουκουρέστι.<br>Ορόσημο: Κάστρο Bran.<br>Η Ρουμανία είναι γνωστή για τα Καρπάθια Όρη και την περιοχή της Τρανσυλβανίας.", image:"assets/europe/romania.jpg" },
  { name:"Βουλγαρία", population:6.4, area:110879, lifeExpectancy:75.8, distanceFromGreece:525, info:"Πρωτεύουσα: Σόφια.<br>Ορόσημο: Καθεδρικός Αλεξάντερ Νέφσκι.<br>Η Βουλγαρία έχει πλούσια βαλκανική ιστορία και αρχαία θρακική κληρονομιά.", image:"assets/europe/bulgaria.jpg" },
  { name:"Σερβία", population:6.6, area:88361, lifeExpectancy:75.5, distanceFromGreece:805, info:"Πρωτεύουσα: Βελιγράδι.<br>Ορόσημο: Φρούριο Βελιγραδίου.<br>Η Σερβία βρίσκεται στο σταυροδρόμι Κεντρικής και Νοτιοανατολικής Ευρώπης.", image:"assets/europe/serbia.jpg" },
  { name:"Κροατία", population:3.9, area:56594, lifeExpectancy:78.3, distanceFromGreece:1080, info:"Πρωτεύουσα: Ζάγκρεμπ.<br>Ορόσημο: Τείχη Ντουμπρόβνικ.<br>Η Κροατία είναι γνωστή για τις δαλματικές ακτές και τις ιστορικές της πόλεις.", image:"assets/europe/croatia.jpg" },
  { name:"Σλοβενία", population:2.1, area:20273, lifeExpectancy:81.3, distanceFromGreece:1205, info:"Πρωτεύουσα: Λιουμπλιάνα.<br>Ορόσημο: Λίμνη Bled.<br>Η Σλοβενία συνδυάζει Άλπεις, δάση και ακτές σε μικρή γεωγραφική έκταση.", image:"assets/europe/slovenia.jpg" },
  { name:"Σλοβακία", population:5.4, area:49035, lifeExpectancy:77.8, distanceFromGreece:1250, info:"Πρωτεύουσα: Μπρατισλάβα.<br>Ορόσημο: Κάστρο Μπρατισλάβας.<br>Η Σλοβακία είναι γνωστή για τα Καρπάθια και τα μεσαιωνικά της κάστρα.", image:"assets/europe/slovakia.jpg" },
  { name:"Λιθουανία", population:2.9, area:65300, lifeExpectancy:76.0, distanceFromGreece:1860, info:"Πρωτεύουσα: Βίλνιους.<br>Ορόσημο: Παλιά Πόλη Βίλνιους.<br>Η Λιθουανία υπήρξε μέρος ενός από τα μεγαλύτερα μεσαιωνικά κράτη της Ευρώπης.", image:"assets/europe/lithuania.jpg" },
  { name:"Λετονία", population:1.9, area:64589, lifeExpectancy:75.5, distanceFromGreece:2000, info:"Πρωτεύουσα: Ρίγα.<br>Ορόσημο: Παλιά Πόλη Ρίγας.<br>Η Λετονία είναι γνωστή για την αρχιτεκτονική Art Nouveau και τη βαλτική της ταυτότητα.", image:"assets/europe/latvia.jpg" },
  { name:"Εσθονία", population:1.4, area:45227, lifeExpectancy:78.8, distanceFromGreece:2200, info:"Πρωτεύουσα: Ταλίν.<br>Ορόσημο: Παλιά Πόλη Ταλίν.<br>Η Εσθονία είναι γνωστή για την ψηφιακή διακυβέρνηση και τη μεσαιωνική πρωτεύουσά της.", image:"assets/europe/estonia.jpg" },
  { name:"Ισλανδία", population:0.4, area:103000, lifeExpectancy:83.1, distanceFromGreece:4020, info:"Πρωτεύουσα: Ρέικιαβικ.<br>Ορόσημο: Blue Lagoon.<br>Η Ισλανδία είναι γνωστή για ηφαίστεια, παγετώνες, θερμές πηγές και εντυπωσιακά φυσικά τοπία.", image:"assets/europe/iceland.jpg" },
  { name:"Μάλτα", population:0.5, area:316, lifeExpectancy:83.0, distanceFromGreece:870, info:"Πρωτεύουσα: Βαλέτα.<br>Ορόσημο: Καθεδρικός Αγίου Ιωάννη.<br>Η Μάλτα έχει στρατηγική θέση στη Μεσόγειο και πλούσια ιπποτική ιστορία.", image:"assets/europe/malta.jpg" }
];

export const DECKS = {
  performance: {
    id: "performance",
    title: "Performance Legends",
    cards: CARS,
    attrs: [
      { key: "speed", label: "Μέγιστη ταχύτητα", unit: "km/h", higherWins: true },
      { key: "hp", label: "Ιπποδύναμη", unit: "hp", higherWins: true },
      { key: "accel", label: "0-100", unit: "sec", higherWins: false },
      { key: "value", label: "Αξία αγοράς", unit: "€", higherWins: true }
    ]
  },
  space: {
    id: "space",
    title: "Cosmic Legends",
    cards: SPACE,
    attrs: [
      { key: "diameter", label: "Διάμετρος", unit: "km", higherWins: true },
      { key: "gravity", label: "Βαρύτητα", unit: "m/s²", higherWins: true },
      { key: "temperature", label: "Θερμοκρασία", unit: "°C", higherWins: true },
      { key: "moons", label: "Δορυφόροι", unit: "", higherWins: true }
    ]
  },
  europe: {
   id: "europe",
   title: "Χώρες της Ευρώπης",
   cards: EUROPE,
   attrs: [
     { key: "population", label: "Πληθυσμός", unit: "εκ.", higherWins: true },
     { key: "area", label: "Έκταση", unit: "km²", higherWins: true },
     { key: "lifeExpectancy", label: "Προσδόκιμο ζωής", unit: "έτη", higherWins: true },
     { key: "distanceFromGreece", label: "Απόσταση από Αθήνα", unit: "km", higherWins: true }
   ]
 }
};
