// mockData.js - Static datasets for stories, learning, and habits

export const avatars = [
  { id: 'avatar_lion', name: 'Guju Lion (ગુજુ સિંહ)', icon: '🦁', color: 'bg-yellow-400 border-yellow-600' },
  { id: 'avatar_monkey', name: 'Chiku Monkey (ચીકુ વાંદરો)', icon: '🐒', color: 'bg-orange-400 border-orange-600' },
  { id: 'avatar_peacock', name: 'Tahu Peacock (ટહુક મોર)', icon: '🦚', color: 'bg-blue-400 border-blue-600' },
  { id: 'avatar_elephant', name: 'Jumbo Elephant (જમ્બો હાથી)', icon: '🐘', color: 'bg-purple-400 border-purple-600' },
  { id: 'avatar_rabbit', name: 'Bani Rabbit (બની સસલું)', icon: '🐇', color: 'bg-pink-400 border-pink-600' },
];

export const storyCategories = [
  { id: 'sanskar', name: 'સંસ્કાર વાર્તાઓ', english: 'Sanskar Stories', desc: 'Values & Ethics', icon: '✨', bg: 'bg-kids-yellow-light border-kids-yellow' },
  { id: 'animal', name: 'પ્રાણીઓની વાર્તાઓ', english: 'Animal Stories', desc: 'Fables & Tales', icon: '🐱', bg: 'bg-kids-orange-light border-kids-orange' },
  { id: 'bedtime', name: 'મીઠી ઊંઘની વાર્તાઓ', english: 'Bedtime Stories', desc: 'Calming bedtime tales', icon: '🌙', bg: 'bg-kids-purple-light border-kids-purple' },
  { id: 'thinking', name: 'બુદ્ધિશાળી વાર્તાઓ', english: 'Thinking Stories', desc: 'Brain & Logic tales', icon: '💡', bg: 'bg-kids-blue-light border-kids-blue' },
  { id: 'emotional', name: 'ભાવનાત્મક વાર્તાઓ', english: 'Emotional Stories', desc: 'Feelings & Empathy', icon: '💖', bg: 'bg-kids-pink-light border-kids-pink' },
  { id: 'funny', name: 'રમુજી વાર્તાઓ', english: 'Funny Stories', desc: 'Laughter & Fun', icon: '🤪', bg: 'bg-kids-green-light border-kids-green' },
  { id: 'brave', name: 'વીર બાળકોની વાર્તાઓ', english: 'Brave Kids Stories', desc: 'Courage & Heroism', icon: '🛡️', bg: 'bg-red-100 border-red-400' },
];

export const stories = [
  {
    id: 's1',
    category: 'sanskar',
    title: 'સાચું બોલનાર ગોપાલ',
    englishTitle: 'Honest Gopal',
    thumbnail: '📖',
    shortDesc: 'ગોપાલની સત્યનિષ્ઠાની એક સુંદર વાર્તા જે સચ્ચાઈનું મૂલ્ય સમજાવે છે.',
    englishDesc: 'A beautiful story of Gopal\'s honesty that explains the value of truth.',
    moral: 'સત્ય હંમેશાં વિજયી બને છે. ગમે તેવી પરિસ્થિતિમાં પણ સાચું બોલવું જોઈએ.',
    englishMoral: 'Truth always wins. We must speak the truth in all circumstances.',
    paragraphs: [
      {
        gujarati: 'એક દિવસ ક્લાસમાં ગણિતના શિક્ષકે એક અઘરો દાખલો હોમવર્કમાં આપ્યો. કોઈ પણ બાળકથી તે દાખલો થતો નહોતો.',
        phonetic: 'Ek divas class ma ganit na shikshake ek agharo dakhlo homework ma aapyo. Koi pan balak thi te dakhlo thato nahoto.',
        english: 'One day in the classroom, the math teacher gave a difficult sum for homework. None of the children could solve it.'
      },
      {
        gujarati: 'પરંતુ બીજે દિવસે ગોપાલે તે દાખલો સાચો ગણીને બતાવ્યો. શિક્ષક ખૂબ જ ખુશ થયા અને બધાં બાળકો સામે તેના વખાણ કર્યા.',
        phonetic: 'Parantu bije divase Gopale te dakhlo sacho ganine batavyo. Shikshak khub ja khush thaya ane badha balako same tena vakhan karya.',
        english: 'But the next day, Gopal showed the sum solved correctly. The teacher was very happy and praised him in front of all the children.'
      },
      {
        gujarati: 'આ સાંભળી ગોપાલ રડવા લાગ્યો. શિક્ષકે પૂછ્યું, "બેટા, તું રડે છે કેમ? તારો દાખલો તો સાચો છે!"',
        phonetic: 'Aa sambhali Gopal radva lagyo. Shikshake puchhyu, "Beta, tu rade chhe kem? Taro dakhlo to sacho chhe!"',
        english: 'Hearing this, Gopal started crying. The teacher asked, "Son, why are you crying? Your sum is correct!"'
      },
      {
        gujarati: 'ગોપાલે રડતાં રડતાં કહ્યું, "સાહેબ, આ દાખલો મેં જાતે નથી ગણ્યો. તે મારા મોટા ભાઈએ મને ગણી આપ્યો હતો. હું તમારા વખાણને લાયક નથી."',
        phonetic: 'Gopale radta radta kahyu, "Saheb, aa dakhlo me jate nathi ganyo. Te mara mota bhaie mane gani aapyo hato. Hu tamara vakhan ne layak nathi."',
        english: 'Gopal said while crying, "Sir, I did not solve this sum myself. My elder brother solved it for me. I do not deserve your praise."'
      },
      {
        gujarati: 'શિક્ષક તેની આ સચ્ચાઈ અને પ્રામાણિકતા જોઈને ગદગદ થઈ ગયા. તેમણે કહ્યું, "બેટા! ભલે દાખલો તારો નહોતો, પણ તારી આ સચ્ચાઈ સૌથી મોટી છે. તું જીવનમાં ઘણો આગળ વધીશ!"',
        phonetic: 'Shikshak teni aa sachchai ane pramanikata joine gadgad thai gaya. Temne kahyu, "Beta! Bhale dakhlo taro nahoto, pan tari aa sachchai sauthi moti chhe. Tu jeevan ma ghano aagal vadhash!"',
        english: 'The teacher was deeply touched by his honesty. He said, "Son! Even if the sum was not yours, your honesty is the biggest. You will go very far in life!"'
      }
    ],
    quiz: [
      {
        question: 'ગણિતના શિક્ષકે કયો વિષય હોમવર્કમાં આપ્યો હતો?',
        options: ['ગણિતનો અઘરો દાખલો', 'ચિત્રકામ', 'કવિતા ગાન', 'ગુજરાતી લેખન'],
        answer: 0
      },
      {
        question: 'વખાણ સાંભળીને ગોપાલ શું કરવા લાગ્યો?',
        options: ['હસવા લાગ્યો', 'નાચવા લાગ્યો', 'રડવા લાગ્યો', 'સૂઈ ગયો'],
        answer: 2
      },
      {
        question: 'દાખલો ગોપાલને કોણે ગણી આપ્યો હતો?',
        options: ['તેની માતાએ', 'તેના પિતાએ', 'તેના મિત્રએ', 'તેના મોટા ભાઈએ'],
        answer: 3
      }
    ],
    activity: 'પ્રામાણિકતાનો સંકલ્પ: આજે ઘરમાં અથવા શાળામાં બનેલી કોઈ પણ નાની ભૂલ હોય તો તે માતા-પિતા કે શિક્ષકને સાચેસાચી કહી દો. જૂઠું ન બોલવાની પ્રતિજ્ઞા લો.'
  },
  {
    id: 's2',
    category: 'animal',
    title: 'ચતુર સસલું અને સિંહ',
    englishTitle: 'The Clever Rabbit and the Lion',
    thumbnail: '🐰',
    shortDesc: 'જંગલના ક્રૂર સિંહ ભાસુરક અને એક નાનકડા ચતુર સસલાની જાણીતી પંચતંત્રની વાર્તા.',
    englishDesc: 'The famous Panchatantra story of the cruel forest lion Bhasurak and a tiny clever rabbit.',
    moral: 'બુદ્ધિ આગળ બળ નકામું છે. મુશ્કેલ સમયમાં ધીરજ અને ચતુરાઈથી કામ લેવું જોઈએ.',
    englishMoral: 'Wisdom is stronger than physical strength. In difficult times, act with patience and cleverness.',
    paragraphs: [
      {
        gujarati: 'એક મોટું જંગલ હતું. તેમાં ભાસુરક નામનો એક બળવાન સિંહ રહેતો હતો. તે દરરોજ ઘણા બધા જંગલી પ્રાણીઓનો શિકાર કરતો હતો.',
        phonetic: 'Ek motu jangal hatu. Te ma Bhasurak namno ek balvan sinh raheto hato. Te darroj ghana badha jangali pranio no shikar karto hato.',
        english: 'There was a big forest. A powerful lion named Bhasurak lived in it. He hunted many forest animals daily.'
      },
      {
        gujarati: 'પ્રાણીઓએ ભેગા મળીને નક્કી કર્યું કે તેઓ દરરોજ એક પ્રાણી સિંહના ભોજન માટે મોકલશે જેથી બાકીના પ્રાણીઓ શાંતિથી જીવી શકે.',
        phonetic: 'Pranioe bhega maline nakki karyu ke teo darroj ek prani sinh na bhojan mate mokalshe jethi bakina pranio shanti thi jeevi shake.',
        english: 'The animals met and decided they would send one animal daily for the lion\'s meal so the rest could live in peace.'
      },
      {
        gujarati: 'એક દિવસ એક નાનકડા સસલાનો વારો આવ્યો. સસલું બુદ્ધિશાળી હતું. તે જંગલમાં જાણીજોઈને મોડું કરીને સિંહ પાસે પહોંચ્યું.',
        phonetic: 'Ek divas ek nankada sasla no varo aavyo. Saslu buddhi-shali hatu. Te jangal ma janijoi ne modu karine sinh pase pahonchyu.',
        english: 'One day, it was a tiny rabbit\'s turn. The rabbit was clever. He intentionally delayed in the forest and reached the lion late.'
      },
      {
        gujarati: 'ભૂખ્યો સિંહ ખૂબ ગુસ્સે થયો. સસલાએ નમ્રતાથી કહ્યું, "મહારાજ! રસ્તામાં મને બીજો એક મોટો સિંહ મળ્યો હતો. તે પણ પોતાને જંગલનો રાજા કહેતો હતો અને મને રોકી રાખ્યો હતો."',
        phonetic: 'Bhukhyo sinh khub gusse thayo. Saslae namrata thi kahyu, "Maharaj! Rasta ma mane bijo ek moto sinh malyo hato. Te pan potane jangal no raja kaheto hato ane mane roki rakhyo hato."',
        english: 'The hungry lion was extremely angry. The rabbit said humbly, "Your Majesty! On the way, I met another big lion. He was also calling himself the king of the forest and stopped me."'
      },
      {
        gujarati: 'સિંહ ગર્જના કરી બોલ્યો, "મને તે ક્યાં છે બતાવ!" સસલું તેને એક ઊંડા કૂવા પાસે લઈ ગયું અને બોલ્યું, "મહારાજ, તે આ કિલ્લાની અંદર સંતાયેલો છે."',
        phonetic: 'Sinh garjana kari bolyo, "Mane te kya chhe batav!" Saslu tene ek unda kuva pase lai gayu ane bolyu, "Maharaj, te aa killa ni andar santayelo chhe."',
        english: 'The lion roared, "Show me where he is!" The rabbit led him to a deep well and said, "Your Majesty, he is hiding inside this fortress."'
      },
      {
        gujarati: 'સિંહે કૂવામાં જોયું તો પાણીમાં તેનો પોતાનો જ પડછાયો દેખાયો. તેને જ બીજો સિંહ સમજીને તેણે તરાપ મારી અને કૂવામાં પડીને ડૂબી મર્યો.',
        phonetic: 'Sinhe kuva ma joyu to pani ma teno potano ja padchhaiyo dekhayo. Tene ja bijo sinh samajine tene tarap mari ane kuva ma padine dubi maryo.',
        english: 'The lion looked into the well and saw his own reflection in the water. Thinking it was another lion, he lunged at it, fell into the well, and drowned.'
      }
    ],
    quiz: [
      {
        question: 'સિંહનું નામ શું હતું?',
        options: ['ભાસુરક', 'શેરખાન', 'ચિન્ટુ', 'ગજુ'],
        answer: 0
      },
      {
        question: 'સિંહ પાસે જવામાં કોણે મોડું કર્યું?',
        options: ['હાથીએ', 'વાંદરાએ', 'સસલાએ', 'હરણે'],
        answer: 2
      },
      {
        question: 'સિંહે કૂવામાં શું જોયું?',
        options: ['એક મોટો માછલો', 'તેનો પોતાનો પડછાયો', 'નવા રમકડાં', 'ખજાનો'],
        answer: 1
      }
    ],
    activity: 'ચિત્ર દોરો: કૂવામાં જોતા સિંહ અને બહાર ઉભેલા સસલાનું સુંદર ચિત્ર દોરો અથવા કલર પૂરો.'
  },
  {
    id: 's3',
    category: 'sanskar',
    title: 'વહેંચીને ખાવામાં મજા છે',
    englishTitle: 'Sharing is Joyful',
    thumbnail: '🍎',
    shortDesc: 'મીરા અને ટીકુ નામના બે મિત્રોની વાર્તા, જે વહેંચવાની ખુશી શીખવે છે.',
    englishDesc: 'The story of two friends, Mira and Tiku, which teaches the joy of sharing.',
    moral: 'તમારી પાસે જે છે તે વહેંચીને વાપરવાથી ખુશી અને પ્રેમ બમણો થાય છે.',
    englishMoral: 'Sharing what you have multiplies your happiness and love.',
    paragraphs: [
      {
        gujarati: 'એક સુંદર બગીચો હતો. ત્યાં મીરા એક ઝાડ નીચે લંચ બોક્સ ખોલીને બેઠી હતી. તેની મમ્મીએ તેને મીઠું લાલ સફરજન આપ્યું હતું.',
        phonetic: 'Ek sundar bagicho hato. Tya Mira ek zaad niche lunch box kholine bethi hati. Teni mammie tene mithu lal safarjan aapyu hatu.',
        english: 'There was a beautiful garden. Mira was sitting under a tree opening her lunch box. Her mom had given her a sweet red apple.'
      },
      {
        gujarati: 'ત્યાં તેનો પાડોશી મિત્ર ટીકુ આવ્યો. ટીકુ ખૂબ ઉદાસ હતો કારણ કે તે ઉતાવળમાં પોતાનું ખાવાનું ઘરે ભૂલી ગયો હતો.',
        phonetic: 'Tya teno padoshi mitra Tiku aavyo. Tiku khub udas hato karan ke te utaval ma potanu khavanu ghare bhuli gayo hato.',
        english: 'Her neighbor friend Tiku came there. Tiku was very sad because he had forgotten his food at home in a hurry.'
      },
      {
        gujarati: 'મીરાએ ટીકુને જોયો અને પૂછ્યું, "ટીકુ, શું થયું? તું કેમ ઉદાસ બેઠો છે?" ટીકુએ કહ્યું, "હું મારું ટિફિન ભૂલી ગયો છું, મને ભૂખ લાગી છે."',
        phonetic: 'Mirae Tiku ne joyo ane puchhyu, "Tiku, shu thayu? Tu kem udas betho chhe?" Tikue kahyu, "Hu maru tiffin bhuli gayo chhu, mane bhukh lagi chhe."',
        english: 'Mira saw Tiku and asked, "Tiku, what happened? Why are you sitting sad?" Tiku said, "I have forgotten my tiffin, I am hungry."'
      },
      {
        gujarati: 'મીરાએ ક્ષણ પણ વિચાર્યા વિના પોતાનું લાલ સફરજન છરીથી કાપીને બરાબર બે અડધા ભાગ કર્યા. એક ભાગ તેણે હસતા હસતા ટીકુને આપ્યો.',
        phonetic: 'Mirae kshan pan vicharya vina potanu lal safarjan chhri thi kapine barabar be addha bhag karya. Ek bhag tene hasta hasta Tiku ne aapyo.',
        english: 'Without thinking for a second, Mira cut her red apple in two equal halves with a knife. She gave one half to Tiku with a smile.'
      },
      {
        gujarati: 'ટીકુએ ખુશ થઈને સફરજન ખાધું. બંને સાથે મળીને રમ્યા. મીરાને આજે સફરજન એકલા ખાવા કરતાં વહેંચીને ખાવામાં વધુ સ્વાદિષ્ટ લાગ્યું.',
        phonetic: 'Tikue khush thine safarjan khadhyu. Banne sathe maline ramya. Mira ne aaje safarjan ekla khava karta vahechine khava ma vadhu svadist lagyu.',
        english: 'Tiku happily ate the apple. Both played together. Mira felt that sharing the apple made it taste much sweeter than eating it alone.'
      }
    ],
    quiz: [
      {
        question: 'મીરાની મમ્મીએ ટિફિનમાં શું આપ્યું હતું?',
        options: ['કેળું', 'લાલ સફરજન', 'લાડુ', 'બિસ્કિટ'],
        answer: 1
      },
      {
        question: 'ટીકુ કેમ ઉદાસ હતો?',
        options: ['રમકડું તૂટી ગયું હતું', 'મમ્મીએ ખીજવ્યું હતું', 'ટિફિન ઘરે ભૂલી ગયો હતો', 'વાંચવું ગમતું નહોતું'],
        answer: 2
      },
      {
        question: 'મીરાએ સફરજનના કેટલા ભાગ કર્યા?',
        options: ['ચાર ભાગ', 'ત્રણ ભાગ', 'બે સમાન અડધા ભાગ', 'ભાગ ન કર્યા'],
        answer: 2
      }
    ],
    activity: 'વહેંચણી પ્રવૃત્તિ: આજે ઘરમાં તમારા ભાઈ, બહેન કે મિત્ર સાથે તમારા મનગમતા રમકડાં કે ખાવાનું શેર કરો અને તમને કેવું લાગ્યું તે મમ્મીને કહો.'
  },
  {
    id: 's4',
    category: 'bedtime',
    title: 'ચંદામામાની સફર',
    englishTitle: 'The Journey of Chandamama',
    thumbnail: '🌙',
    shortDesc: 'એક નાની છોકરી કાવ્યા અને રાત્રે ચમકતા ચંદામામા વચ્ચેની મીઠી વાતચીત.',
    englishDesc: 'A sweet conversation between a little girl Kavya and the shining moon at night.',
    moral: 'પ્રકૃતિ સાથેનો પ્રેમ અને શાંત મન આપણને સુંદર સપના આપે છે.',
    englishMoral: 'Love for nature and a peaceful mind bring us beautiful dreams.',
    paragraphs: [
      {
        gujarati: 'રાત્રિનો સમય હતો. આકાશમાં સોનેરી ચંદામામા ગોળ થાળી જેવા ચમકી રહ્યા હતા. નાની કાવ્યા બારી પાસે બેસીને તેમને જોઈ રહી હતી.',
        phonetic: 'Ratri no samay hato. Aakash ma soneri Chandamama gol thali jeva chamki rahya hata. Nani Kavya bari pase besine temne joi rahi hati.',
        english: 'It was night time. In the sky, the golden moon was shining like a round plate. Little Kavya was sitting by the window, watching him.'
      },
      {
        gujarati: 'કાવ્યાએ હાથ જોડીને પૂછ્યું, "ચંદામામા, તમે આખો દિવસ ક્યાં સંતાઈ જાવ છો? અને તમારી પાસે આટલો પ્રકાશ ક્યાંથી આવે છે?"',
        phonetic: 'Kavyae hath jodine puchhyu, "Chandamama, tame aakho divas kya santai jav chho? Ane tari pase aatlo prakash kyathi aave chhe?"',
        english: 'Kavya folded her hands and asked, "Chandamama, where do you hide all day? And where does all this light come from?"'
      },
      {
        gujarati: 'ચંદામામા જાણે હસીને બોલ્યા, "કાવ્યા બેટા! હું જ્યારે અહીંથી જાવ છું ત્યારે દુનિયાની બીજી તરફ બાળકોને અજવાળું આપવા પહોંચું છું. અને મને મારો પ્રકાશ સુરજદાદા આપે છે."',
        phonetic: 'Chandamama jane hasine bolya, "Kavya beta! Hu jyare ahinthi jav chhu jyare duniya ni biji taraf balako ne ajavalu aapva pahonchu chhu. Ane mane maro prakash Surajdada aape chhe."',
        english: 'The moon smiled and said, "Kavya child! When I leave from here, I go to light up the other side of the world for kids there. And Sun uncle gives me my light."'
      },
      {
        gujarati: 'ત્યાં આકાશમાં એક તારો તૂટ્યો. ચંદામામાએ કહ્યું, "જો બેટા, હવે સૂવાનો સમય થઈ ગયો છે. તારલાઓ પણ લોરી ગાઈ રહ્યા છે. આંખો બંધ કરો અને સુઈ જાવ."',
        phonetic: 'Tya aakash ma ek taro tutyo. Chandamamae kahyu, "Jo beta, have suvano samay thai gayo chhe. Tarlav pan lori gai rahya chhe. Aankho bandh karo ane sui jav."',
        english: 'Then a star fell in the sky. The moon said, "Look child, now it\'s time to sleep. Even the little stars are singing a lullaby. Close your eyes and sleep."'
      },
      {
        gujarati: 'કાવ્યા નરમ પથારીમાં સૂઈ ગઈ. તેને સપનામાં ચંદામામા વાદળોના રથમાં બેસાડીને આકાશની મુસાફરી કરાવવા લઈ ગયા.',
        phonetic: 'Kavya naram pathari ma sui gai. Tene sapna ma Chandamama vadalo na rath ma besadine aakash ni musafari karavva lai gaya.',
        english: 'Kavya slept in her soft bed. In her dreams, the moon sat her in a chariot of clouds and took her on a sky tour.'
      }
    ],
    quiz: [
      {
        question: 'ચંદામામા આકાશમાં કેવા દેખાતા હતા?',
        options: ['ચોરસ પેટી જેવા', 'ગોળ થાળી જેવા', 'લાંબી લાકડી જેવા', 'ત્રિકોણ જેવા'],
        answer: 1
      },
      {
        question: 'ચંદામામાને પ્રકાશ કોણ આપે છે?',
        options: ['તારા', 'વીજળી', 'સુરજદાદા', 'પવન'],
        answer: 2
      },
      {
        question: 'કાવ્યા સપનામાં શેના રથમાં બેઠી?',
        options: ['ફૂલોના રથમાં', 'સોનાના રથમાં', 'વાદળોના રથમાં', 'લાકડાના રથમાં'],
        answer: 2
      }
    ],
    activity: 'તારા અને ચંદ્ર દોરો: નોટબુકમાં એક સુંદર અર્ધચંદ્રાકાર અને તેની આસપાસ નાના ચમકતા તારા દોરીને સોનેરી કલર કરો.'
  }
];

export const alphabets = [
  { id: 'a1', letter: 'ક', name: 'Ka', word: 'કમળ', wordEnglish: 'Lotus', emoji: '🪷', soundText: 'ક કમળ નો ક' },
  { id: 'a2', letter: 'ખ', name: 'Kha', word: 'ખલ', wordEnglish: 'Mortar', emoji: '🥣', soundText: 'ખ ખલ નો ખ' },
  { id: 'a3', letter: 'ગ', name: 'Ga', word: 'ગણપતિ', wordEnglish: 'Lord Ganesha', emoji: '🐘', soundText: 'ગ ગણપતિ નો ગ' },
  { id: 'a4', letter: 'ઘ', name: 'Gha', word: 'ઘર', wordEnglish: 'House', emoji: '🏠', soundText: 'ઘ ઘર નો ઘ' },
  { id: 'a5', letter: 'ચ', name: 'Cha', word: 'ચકલી', wordEnglish: 'Sparrow', emoji: '🐦', soundText: 'ચ ચકલી નો ચ' },
  { id: 'a6', letter: 'છ', name: 'Chha', word: 'છત્રી', wordEnglish: 'Umbrella', emoji: '🌂', soundText: 'છ છત્રી નો છ' },
  { id: 'a7', letter: 'જ', name: 'Ja', word: 'જમરૂખ', wordEnglish: 'Guava', emoji: '🍏', soundText: 'જ જમરૂખ નો જ' },
  { id: 'a8', letter: 'ઝ', name: 'Zha', word: 'ઝભલું', wordEnglish: 'Frock', emoji: '👗', soundText: 'ઝ ઝભલા નો ઝ' },
  { id: 'a9', letter: 'ટ', name: 'Ta', word: 'ટમેટું', wordEnglish: 'Tomato', emoji: '🍅', soundText: 'ટ ટમેટા નો ટ' },
  { id: 'a10', letter: 'ઠ', name: 'Tha', word: 'ઠગ', wordEnglish: 'Cheat', emoji: '👤', soundText: 'ઠ ઠગ નો ઠ' },
  { id: 'a11', letter: 'ડ', name: 'Da', word: 'ડમરુ', wordEnglish: 'Small Drum', emoji: '🥁', soundText: 'ડ ડમરુ નો ડ' },
  { id: 'a12', letter: 'ઢ', name: 'Dha', word: 'ઢગલો', wordEnglish: 'Pile', emoji: '⛰️', soundText: 'ઢ ઢગલા નો ઢ' },
  { id: 'a13', letter: 'ત', name: 'Ta', word: 'તપેલી', wordEnglish: 'Pot', emoji: '🍯', soundText: 'ત તપેલી નો ત' },
  { id: 'a14', letter: 'થ', name: 'Tha', word: 'થર્મોસ', wordEnglish: 'Thermos', emoji: '🍼', soundText: 'થ થર્મોસ નો થ' },
  { id: 'a15', letter: 'દ', name: 'Da', word: 'દડો', wordEnglish: 'Ball', emoji: '⚽', soundText: 'દ દડા નો દ' },
  { id: 'a16', letter: 'ધ', name: 'Dha', word: 'ધનુષ', wordEnglish: 'Bow', emoji: '🏹', soundText: 'ધ ધનુષ નો ધ' },
  { id: 'a17', letter: 'ન', name: 'Na', word: 'નળ', wordEnglish: 'Tap', emoji: '🚰', soundText: 'ન નળ નો ન' },
  { id: 'a18', letter: 'પ', name: 'Pa', word: 'પતંગ', wordEnglish: 'Kite', emoji: '🪁', soundText: 'પ પતંગ નો પ' },
  { id: 'a19', letter: 'ફ', name: 'Pha', word: 'ફળ', wordEnglish: 'Fruits', emoji: '🍎', soundText: 'ફ ફળ નો ફ' },
  { id: 'a20', letter: 'બ', name: 'Ba', word: 'બતક', wordEnglish: 'Duck', emoji: '🦆', soundText: 'બ બતક નો બ' },
  { id: 'a21', letter: 'ભ', name: 'Bha', word: 'ભમરડો', wordEnglish: 'Spinning Top', emoji: '🪀', soundText: 'ભ ભમરડા નો ભ' },
  { id: 'a22', letter: 'મ', name: 'Ma', word: 'મગર', wordEnglish: 'Crocodile', emoji: '🐊', soundText: 'મ મગર નો મ' },
  { id: 'a23', letter: 'ય', name: 'Ya', word: 'યજ્ઞ', wordEnglish: 'Sacred Fire', emoji: '🔥', soundText: 'ય યજ્ઞ નો ય' },
  { id: 'a24', letter: 'ર', name: 'Ra', word: 'રમકડું', wordEnglish: 'Toy', emoji: '🧸', soundText: 'ર રમકડા નો ર' },
  { id: 'a25', letter: 'લ', name: 'La', word: 'લસણ', wordEnglish: 'Garlic', emoji: '🧄', soundText: 'લ લસણ નો લ' },
  { id: 'a26', letter: 'વ', name: 'Va', word: 'વહાણ', wordEnglish: 'Ship', emoji: '🚢', soundText: 'વ વહાણ નો વ' },
  { id: 'a27', letter: 'શ', name: 'Sha', word: 'શરણાઈ', wordEnglish: 'Clarinet', emoji: '🎺', soundText: 'શ શરણાઈ નો શ' },
  { id: 'a28', letter: 'ષ', name: 'Sha', word: 'ષટ્કોણ', wordEnglish: 'Hexagon', emoji: '🔷', soundText: 'ષ ષટ્કોણ નો ષ' },
  { id: 'a29', letter: 'સ', name: 'Sa', word: 'સસલું', wordEnglish: 'Rabbit', emoji: '🐰', soundText: 'સ સસલા નો સ' },
  { id: 'a30', letter: 'હ', name: 'Ha', word: 'હરણ', wordEnglish: 'Deer', emoji: '🦌', soundText: 'હ હરણ નો હ' },
];

export const numbers = [
  { id: 'n1', num: '૧', englishNum: '1', gujaratiName: 'એક', englishName: 'One', emoji: '🍎', count: 1 },
  { id: 'n2', num: '૨', englishNum: '2', gujaratiName: 'બે', englishName: 'Two', emoji: '🎈🎈', count: 2 },
  { id: 'n3', num: '૩', englishNum: '3', gujaratiName: 'ત્રણ', englishName: 'Three', emoji: '🧸🧸🧸', count: 3 },
  { id: 'n4', num: '૪', englishNum: '4', gujaratiName: 'ચાર', englishName: 'Four', emoji: '🚗🚗🚗🚗', count: 4 },
  { id: 'n5', num: '૫', englishNum: '5', gujaratiName: 'પાંચ', englishName: 'Five', emoji: '⭐⭐⭐⭐⭐', count: 5 },
  { id: 'n6', num: '૬', englishNum: '6', gujaratiName: 'છ', englishName: 'Six', emoji: '🌸🌸🌸🌸🌸🌸', count: 6 },
  { id: 'n7', num: '૭', englishNum: '7', gujaratiName: 'સાત', englishName: 'Seven', emoji: '🍬🍬🍬🍬🍬🍬🍬', count: 7 },
  { id: 'n8', num: '૮', englishNum: '8', gujaratiName: 'આઠ', englishName: 'Eight', emoji: '🐝🐝🐝🐝🐝🐝🐝🐝', count: 8 },
  { id: 'n9', num: '૯', englishNum: '9', gujaratiName: 'નવ', englishName: 'Nine', emoji: '🍪🍪🍪🍪🍪🍪🍪🍪🍪', count: 9 },
  { id: 'n10', num: '૧૦', englishNum: '10', gujaratiName: 'દસ', englishName: 'Ten', emoji: '⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽', count: 10 },
];

export const colors = [
  { id: 'c1', name: 'લાલ', english: 'Red', hex: '#EF4444', emoji: '🔴' },
  { id: 'c2', name: 'લીલો', english: 'Green', hex: '#22C55E', emoji: '🟢' },
  { id: 'c3', name: 'વાદળી', english: 'Blue', hex: '#3B82F6', emoji: '🔵' },
  { id: 'c4', name: 'પીળો', english: 'Yellow', hex: '#EAB308', emoji: '🟡' },
  { id: 'c5', name: 'કેસરી', english: 'Orange', hex: '#F97316', emoji: '🟠' },
  { id: 'c6', name: 'ગુલાબી', english: 'Pink', hex: '#EC4899', emoji: '🌸' },
  { id: 'c7', name: 'જાંબલી', english: 'Purple', hex: '#A855F7', emoji: '🟣' },
  { id: 'c8', name: 'કાળો', english: 'Black', hex: '#1E293B', emoji: '⚫' },
  { id: 'c9', name: 'સફેદ', english: 'White', hex: '#F1F5F9', emoji: '⚪' },
];

export const fruits = [
  { id: 'f1', name: 'કેરી', english: 'Mango', emoji: '🥭', phonetic: 'Keri' },
  { id: 'f2', name: 'સફરજન', english: 'Apple', emoji: '🍎', phonetic: 'Safarjan' },
  { id: 'f3', name: 'કેળું', english: 'Banana', emoji: '🍌', phonetic: 'Kelu' },
  { id: 'f4', name: 'દ્રાક્ષ', english: 'Grapes', emoji: '🍇', phonetic: 'Draksh' },
  { id: 'f5', name: 'પપૈયું', english: 'Papaya', emoji: '🥭', phonetic: 'Papayu' },
  { id: 'f6', name: 'ચીકુ', english: 'Chiku', emoji: '🥔', phonetic: 'Chiku' },
  { id: 'f7', name: 'તરબૂચ', english: 'Watermelon', emoji: '🍉', phonetic: 'Tarbuch' },
  { id: 'f8', name: 'દાડમ', english: 'Pomegranate', emoji: '🍎', phonetic: 'Dadam' },
];

export const animals = [
  { id: 'an1', name: 'સિંહ', english: 'Lion', emoji: '🦁', phonetic: 'Sinh' },
  { id: 'an2', name: 'વાઘ', english: 'Tiger', emoji: '🐯', phonetic: 'Vagh' },
  { id: 'an3', name: 'હાથી', english: 'Elephant', emoji: '🐘', phonetic: 'Hathi' },
  { id: 'an4', name: 'વાંદરો', english: 'Monkey', emoji: '🐒', phonetic: 'Vandaro' },
  { id: 'an5', name: 'સસલું', english: 'Rabbit', emoji: '🐰', phonetic: 'Saslu' },
  { id: 'an6', name: 'ગાય', english: 'Cow', emoji: '🐮', phonetic: 'Gay' },
  { id: 'an7', name: 'મોર', english: 'Peacock', emoji: '🦚', phonetic: 'Mor' },
  { id: 'an8', name: 'ઊંટ', english: 'Camel', emoji: '🐫', phonetic: 'Unt' },
];

export const habits = [
  {
    id: 'h1',
    topic: 'Respect elders',
    title: 'વડીલોને પ્રણામ કરવા',
    englishTitle: 'Greet Elders respectfully',
    desc: 'દરરોજ સવારે મમ્મી, પપ્પા, દાદા અને દાદીના પગે લાગીને "પ્રણામ" કરો અથવા "જય શ્રી કૃષ્ણ" કહો.',
    englishDesc: 'Touch the feet of mother, father, grandfather, and grandmother every morning and say Pranam or Jai Shree Krishna.',
    icon: '🙏',
    coinsReward: 10
  },
  {
    id: 'h2',
    topic: 'Honesty',
    title: 'સાચું બોલવું',
    englishTitle: 'Always Speak the Truth',
    desc: 'ક્યારેય જૂઠું ન બોલવું. કોઈ પણ ભૂલ થાય તો તે સ્વીકારી લો. સત્ય બોલનારથી ભગવાન ખુશ થાય છે.',
    englishDesc: 'Never lie. If you make a mistake, accept it. God loves children who speak the truth.',
    icon: '✨',
    coinsReward: 10
  },
  {
    id: 'h3',
    topic: 'Sharing',
    title: 'વહેંચીને રમવું',
    englishTitle: 'Share Toys & Treats',
    desc: 'તમારા મિત્રો અથવા ભાઈ-બહેન સાથે રમકડાં અને ખાવાની વસ્તુઓ વહેંચીને સાથે હળીમળીને રહો.',
    englishDesc: 'Share your toys and food items with your friends or siblings and stay together with harmony.',
    icon: '🤝',
    coinsReward: 10
  },
  {
    id: 'h4',
    topic: 'Gratitude',
    title: 'આભાર માનવો',
    englishTitle: 'Express Gratitude',
    desc: 'જ્યારે કોઈ પણ તમારી મદદ કરે, ત્યારે હસીને તેને "આભાર" (Thank You) કહો.',
    englishDesc: 'Whenever someone helps you, smile and say "Aabhar" (Thank You).',
    icon: '💖',
    coinsReward: 10
  },
  {
    id: 'h5',
    topic: 'Discipline',
    title: 'સમયસર બ્રશ અને સ્નાન',
    englishTitle: 'Brushing and Bathing on Time',
    desc: 'રોજ સવારે અને રાત્રે સૂતા પહેલા બ્રશ કરો, તેમજ સવારે વહેલા નાહીને સ્વચ્છ કપડાં પહેરો.',
    englishDesc: 'Brush every morning and before sleeping. Bathe early in the morning and wear clean clothes.',
    icon: '🪥',
    coinsReward: 10
  },
  {
    id: 'h6',
    topic: 'Helping others',
    title: 'નાની નાની મદદ કરવી',
    englishTitle: 'Helping Around the House',
    desc: 'ઘરમાં કચરો ડસ્ટબિનમાં ફેંકવો, રમકડાં રમીને પાછા જગ્યાએ ગોઠવવા અને મમ્મીને મદદ કરવી.',
    englishDesc: 'Throw trash in the dustbin, keep toys back in their place after playing, and help mother in small chores.',
    icon: '🧹',
    coinsReward: 10
  }
];

export const parentTips = [
  "તમારા બાળક સાથે રોજ ઓછામાં ઓછી ૧ વાર્તા વાંચો અને તેની પાસેથી મોરલ સાંભળો.",
  "બાળકને સ્ક્રીન પર ફ્લેશકાર્ડ્સ જોઈને અવાજ ઊંચો કરીને સાથે બોલવા પ્રોત્સાહિત કરો.",
  "યાદશક્તિ (Memory Match) ગેમ રોજ રમવાથી બાળકની એકાગ્રતા વધે છે.",
  "જ્યારે બાળક કોઈ સંસ્કાર પ્રવૃત્તિ પૂર્ણ કરે ત્યારે સ્ટાર્સ આપી પીઠ થાબડો.",
  "એપ્લિકેશનની 'સ્ક્રીન લિમિટ' સમય સેટ કરો જેથી બાળક વધારે સમય આંખો ન બગાડે."
];
