/**
 * Local Advanced AI Story Generator Engine
 * Runs 100% offline client-side.
 */

// Title patterns by genre
const titles = {
  love: {
    en: ["The Echo of Our Hearts", "Threads of Destiny", "Whispers in the Rain", "Beyond the Horizon of Love"],
    hi: ["दिलों का संगम", "तकदीर की लकीरें", "बारिश की बूंदें और तुम", "प्यार का अनंत सफर"],
    hinglish: ["Dilon Ka Sangam", "Takdeer Ki Lakeerein", "Baarish Ki Boondein Aur Tum", "Pyar Ka Anant Safar"]
  },
  war: {
    en: ["The Price of Valor", "Echoes of the Battlefield", "Shadows of Honor", "The Last Stand"],
    hi: ["वीरता की कीमत", "युद्धभूमि की गूंज", "सम्मान की परछाइयां", "आखिरी मोर्चा"],
    hinglish: ["Veerta Ki Keemat", "Yudhbhumi Ki Goonj", "Samman Ki Parchhaiyan", "Aakhiri Morcha"]
  },
  motivational: {
    en: ["The Fire Within", "Rising from the Ashes", "The Unstoppable Climb", "Winds of Change"],
    hi: ["अंदर की आग", "राख से उठना", "अथक प्रयास", "परिवर्तन की हवा"],
    hinglish: ["Andar Ki Aag", "Raakh Se Uthna", "Athak Prayas", "Parivartan Ki Hawa"]
  },
  fantasy: {
    en: ["The Chronicles of Eldoria", "The Whispering Star", "Legacy of the Dragon", "The Lost Realm"],
    hi: ["एल्डोरिया की गाथा", "फुसफुसाता तारा", "ड्रैगन की विरासत", "खोया हुआ साम्राज्य"],
    hinglish: ["Eldoria Ki Gatha", "Phusphusata Tara", "Dragon Ki Virasat", "Khoya Hua Samrajya"]
  },
  mystery: {
    en: ["The Stopped Clock", "Shadows in the Fog", "The Midnight Clue", "Silent Witness"],
    hi: ["रुकी हुई घड़ी", "कोहरे में परछाइयां", "आधी रात का सुराग", "खामोश गवाह"],
    hinglish: ["Ruki Hui Ghadi", "Kohre Mein Parchhaiyan", "Aadhi Raat Ka Suraag", "Khamosh Gawah"]
  }
};

// Paragraph generators by core category
const db = {
  love: {
    intro: {
      en: "The morning sun filtered through the autumn leaves, casting golden ripples across the quiet library. Maya sat near the window, her hands cradling a cup of warm tea, completely lost in her thoughts. It was on a day just like this, under the same amber sky, that she first encountered the concept of {prompt}. She recalled the old letters piled in her attic—letters filled with promises written in fading ink. Meanwhile, Rohan, a young artist struggling to capture the essence of human connection, watched her from across the room. He adjusted his canvas, feeling that Maya's serene expression held the answer to the painting he had been trying to create for years.",
      hi: "पतझड़ की सुनहरी धूप खिड़की के कांच से छनकर पुरानी लाइब्रेरी की मेज पर बिखर रही थी। माया हाथ में चाय का गर्म प्याला थामे, खिड़की के बाहर उड़ते पत्तों को देख रही थी। ठीक ऐसे ही एक दिन, जब आसमान का रंग सिंदूरी था, उसने पहली बार {prompt} के सच्चे अर्थ को महसूस किया था। उसे अपने दादाजी के लिखे वे पुराने पत्र याद आ रहे थे, जो आज भी अलमारी के कोने में रखे थे। उसी समय, रोहन, एक युवा चित्रकार जो लंबे समय से इंसानी जज्बातों को कैनवास पर उतारने की कोशिश कर रहा था, लाइब्रेरी के दूसरे कोने से माया को देख रहा था। उसे लगा जैसे माया के चेहरे की खामोशी में उसकी अधूरी पेंटिंग का जवाब छुपा हो।",
      hinglish: "Patjhad ki sunhari dhoop khidki ke kaanch se chankar purani library ki mez par bikhar rahi thi. Maya haath mein chai ka garam pyala thaame, khidki ke bahar udte patton ko dekh rahi thi. Theek aise hi ek din, jab aasmaan ka rang sinduri tha, usne pehli baar {prompt} ke sacche arth ko mehsoos kiya tha. Use apne dadaji ke likhe wo purane patra yaad aa rahe the, jo aaj bhi almari ke kone mein rakhe the. Usi samay, Rohan, ek yuva chitrakar jo lambe samay se insani jazbaaton ko canvas par utarne ki koshish kar raha tha, library ke dusre kone se Maya ko dekh raha tha. Use laga jaise Maya ke chehre ki khamoshi mein uski adhoori painting ka jawab chhupa ho."
    },
    conflict: {
      en: "However, life rarely follows a simple path. Maya carried the weight of a broken promise from her past, making it difficult for her to open her heart again. Every time Rohan tried to share his artistic visions and explain how {prompt} guided his strokes, Maya would retreat into her shell of silence. She feared that expressing feelings would only lead to another painful separation. Rohan's canvas remained incomplete, representing the silent barrier between two souls who were desperately searching for the same warmth but were too afraid of getting burned.",
      hi: "लेकिन जिंदगी इतनी आसान नहीं होती। माया के दिल पर अतीत के एक टूटे हुए वादे का भारी बोझ था, जिसने उसके लिए किसी और पर भरोसा करना लगभग असंभव बना दिया था। जब भी रोहन अपनी कलात्मक सोच साझा करने की कोशिश करता और समझाता कि कैसे {prompt} उसके ब्रश के स्ट्रोक्स को रास्ता दिखाता है, माया खुद को पीछे खींच लेती। उसे डर था कि भावनाओं का इजहार सिर्फ दर्द देगा। रोहन का कैनवास अधूरा पड़ा रहा, जो उन दो दिलों के बीच की खामोश दीवार को दर्शाता था जो एक ही रोशनी की तलाश में थे पर जलने से डरते थे।",
      hinglish: "Lekin zindagi itni aasan nahi hoti. Maya ke dil par ateet ke ek toote hue waade ka bhaari bojh tha, jisne uske liye kisi aur par bharosa karna lagbhag asambhav bana diya tha. Jab bhi Rohan apni kalaatmak soch saajha karne ki koshish karta aur samjhata ki kaise {prompt} uske brush ke strokes ko raasta dikhata hai, Maya khud ko peeche kheench leti. Use darr tha ki bhaavnaon ka izhaar sirf dard dega. Rohan ka canvas adhoora pada raha, jo un do dilon ke beech ki khamosh deewar ko darshata tha jo ek hi roshni ki talaash mein the par jalne se darte the."
    },
    climax: {
      en: "The turning point arrived during the great winter storm. The library was closing early, and as the snow accumulated on the cobblestone streets, the heating system suddenly failed. Trapped inside with freezing temperatures, Maya found herself shivering. Without hesitation, Rohan wrapped his heavy woolen coat around her shoulders and shared his flask of warm soup. In that cold, dark room, with only a small candle flickering between them, the walls of fear began to melt. Maya looked into Rohan's eyes and realized that {prompt} was not about finding a flawless destiny, but about having the courage to stand beside someone in the coldest storms.",
      hi: "कहानी में बदलाव सर्दियों के एक भयानक तूफान के दौरान आया। बर्फीली हवाओं के कारण पूरी लाइब्रेरी बंद हो रही थी, और तभी अचानक वहां की हीटिंग मशीन खराब हो गई। कंपकपाती ठंड में माया खुद को संभाल नहीं पा रही थी। बिना एक पल गंवाए, रोहन ने अपना भारी ऊनी कोट माया के कंधों पर डाल दिया। उस सर्द, अंधेरे कमरे में, जहां केवल एक मोमबत्ती जल रही थी, दोनों ने एक-दूसरे के करीब आकर अपनी कहानियां साझा कीं। माया ने रोहन की आंखों में देखा और उसे एहसास हुआ कि {prompt} किसी संपूर्ण जीवन को ढूंढने का नाम नहीं है, बल्कि बर्फीले तूफानों में किसी का हाथ थामने का हौसला है।",
      hinglish: "Kahani mein badlav sardiyon ke ek bhayanak toofan ke dauraan aaya. Barfili hawaon ke kaaran poori library band ho rahi thi, aur tabhi achanak wahan ki heating machine kharab ho gayi. Kampkampati thand mein Maya khud ko sambhal nahi paa rahi thi. Bina ek pal ganwaye, Rohan ne apna bhaari ooni coat Maya ke kandhon par daal diya. Us sard, andhere kamre mein, jahan keval ek mombatti jal rahi thi, dono ne ek-dusre ke kareeb aakar apni kahaniyaan saajha keen. Maya ne Rohan ki aankhon mein dekha aur use ehsaas hua ki {prompt} kisi sampoorna jeevan ko dhoondhne ka naam nahi hai, balki barfile toofano mein kisi ka haath thaamne ka haunsla hai."
    },
    ending: {
      en: "As the spring sun arrived, the library windows opened once again. Rohan's canvas was finally complete—a breathtaking portrait of Maya smiling under an amber sky, holding a warm cup of tea. Maya stood beside him, her hand gently resting in his. They had learned that the journey of {prompt} is filled with uncertainty, but it is the only force that gives human life its true meaning.",
      hi: "जब वसंत की पहली सुबह आई, तो लाइब्रेरी की खिड़कियां फिर से खुल गईं। रोहन का कैनवास अब पूरा हो चुका था—उसमें माया सुनहरे आसमान के नीचे हाथ में चाय का प्याला लिए मुस्कुरा रही थी। माया उसके पास खड़ी थी, और उसका हाथ रोहन के हाथ में था। उन्होंने सीख लिया था कि {prompt} का सफर भले ही अनिश्चितताओं से भरा हो, लेकिन यही वो ताकत है जो जिंदगी को खूबसूरत बनाती है।",
      hinglish: "Jab vasant ki pehli subah aayi, to library ki khidkiyan phir se khul gayeen. Rohan ka canvas ab poora ho chuka tha—usmein Maya sunhare aasmaan ke neeche haath mein chai ka pyala liye muskura rahi thi. Maya uske paas khadi thi, aur uska haath Rohan ke haath mein tha. Unhone seekh liya tha ki {prompt} ka safar bhale hi anishchitataon se bhara ho, lekin yahi wo taakat hai jo zindagi ko khubsoorat banati hai."
    },
    moral: {
      en: "Love requires patience, vulnerability, and the courage to trust again after heartbreak.",
      hi: "सच्चा प्रेम धैर्य, संवेदनशीलता और कठिन समय में एक-दूसरे का साथ निभाने की हिम्मत मांगता है।",
      hinglish: "Saccha prem dhairya, samvedansheelata aur kathin samay mein ek-dusre ka saath nibhane ki himmat maangta hai."
    }
  },
  war: {
    intro: {
      en: "The history of humanity is written in the ink of struggle, and nothing illustrates this more than the brutal reality of {prompt}. In the small border village of Somnathpur, Captain Vikram adjusted his combat gear, staring out at the mist-covered hills. The war had raged for months, claiming lands, homes, and lives. He remembered the soft laughter of his young son and the tearful embrace of his wife before he boarded the military train. On the opposing side, a young soldier named Alexei sat in a muddy trench, holding a faded photograph of his mother. Both men were separated by invisible political borders, yet bound by the same cold fear and longing for home.",
      hi: "मानवता का इतिहास संघर्ष की स्याही से लिखा गया है, और {prompt} की क्रूर हकीकत से बड़ा इसका कोई उदाहरण नहीं है। सोमनाथपुर के छोटे से सीमावर्ती गांव में, कैप्टन विक्रम ने अपनी वर्दी को ठीक किया और धुंध से ढकी पहाड़ियों की ओर देखा। युद्ध महीनों से चल रहा था, जिसने जमीनें, घर और अनगिनत जिंदगियां लील ली थीं। विक्रम को अपने बेटे की खिलखिलाहट और ट्रेन पर चढ़ने से पहले पत्नी की नम आंखें याद आ रही थीं। दूसरी तरफ, दुश्मन की ट्रेंच में बैठा युवा सैनिक अलेक्सी अपनी मां की धुंधली तस्वीर को सीने से लगाए बैठा था। दोनों के बीच राजनीतिक सीमाएं थीं, लेकिन दिल में एक ही डर था।",
      hinglish: "Manavta ka itihas sangharsh ki syahi se likha gaya hai, aur {prompt} ki kroor hakeekat se bada iska koi udaharan nahi hai. Somnathpur ke chhote se seemavarti gaon mein, Captain Vikram ne apni vardee ko theek kiya aur dhundh se dhaki pahadiyon ki aur dekha. Yudh mahino se chal raha tha, jisne zameenein, ghar aur anginat zindagiyaan leel lee theen. Vikram ko apne bete ki khilkhilahat aur train par chadhne se pehle patni ki nam aankhein yaad aa rahi theen. Dusri taraf, dushman ki trench mein baitha yuva sainik Alexei apni maa ki dhundhli tasveer ko seene se lagaye baitha tha. Dono ke beech rajneetik seemayein theen, lekin dil mein ek hi darr tha."
    },
    conflict: {
      en: "As the artillery barrage intensified, the ground shook violently. Vikram's platoon received orders to capture the northern ridge, a strategic point heavily guarded by Alexei's unit. The conflict of {prompt} was no longer an abstract topic discussed in political offices; it was a rain of shrapnel, burning metal, and deafening explosions. The lush green forest had turned into a charred wasteland, and with every passing minute, Vikram saw young men—on both sides—falling in the mud. The sheer devastation questioned the very purpose of their sacrifice.",
      hi: "जैसे ही तोपों की गोलाबारी तेज हुई, जमीन जोर-से हिलने लगी। विक्रम की टुकड़ी को उत्तरी पहाड़ी पर कब्जा करने का आदेश मिला, जहां अलेक्सी की यूनिट तैनात थी। {prompt} की यह जंग अब अखबारों की खबर नहीं थी; यह जलते लोहे, बारूद की गंध और गगनभेदी धमाकों का तांडव था। हरा-भरा जंगल अब राख के ढेर में बदल चुका था। विक्रम ने देखा कि कैसे दोनों तरफ के नौजवान मिट्टी में मिल रहे थे। इस विनाश ने उनके दिल में एक बड़ा सवाल खड़ा कर दिया कि क्या इस बर्बादी से कभी शांति आ सकती है?",
      hinglish: "Jaise hi topon ki golabaari tez hui, zameen zor-se hilne lagi. Vikram ki tukdi ko uttari pahadi par kabza karne ka aadesh mila, jahan Alexei ki unit tainaat thi. {prompt} ki yeh jung ab akhbaron ki khabar nahi thi; yeh jalte lohe, baarood ki gandh aur gaganbhedi dhamakon ka taandav tha. Hara-bhara jungle ab raakh ke dher mein badal chuka tha. Vikram ne dekha ki kaise dono taraf ke naujawan mitti mein mil rahe the. Is vinash ne unke dil mein ek bada sawal khada kar diya ki kya is barbaadi se kabhi shanti aa sakti hai?"
    },
    climax: {
      en: "Under the cover of night, Vikram crawled forward to rescue a wounded comrade. Just as he reached the crater, he came face-to-face with Alexei, who was also looking for his fallen friend. For a terrifying second, both men raised their rifles, their fingers tightening on the triggers. In the silence between the mortar flashes, they looked into each other's eyes. They saw no monsters—only exhausted, terrified human beings who wanted to survive. Slowly, Vikram lowered his barrel. Alexei did the same. Together, they pulled the wounded soldiers into a safe shelter, sharing a brief nod of mutual humanity amidst the madness.",
      hi: "रात के अंधेरे में, घायल साथी को बचाने के लिए विक्रम रेंगते हुए आगे बढ़ा। जैसे ही वह एक गड्ढे के पास पहुंचा, उसका सामना अलेक्सी से हुआ, जो अपने घायल मित्र को ढूंढ रहा था। एक खौफनाक सेकंड के लिए दोनों ने एक-दूसरे पर बंदूकें तान दीं। गोलियों के धमाकों के बीच, उन्होंने एक-दूसरे की आंखों में देखा। वहां कोई शैतान नहीं था—बस दो थके हुए, डरे हुए इंसान थे जो जिंदा रहना चाहते थे। विक्रम ने धीरे से अपनी बंदूक नीचे कर ली। अलेक्सी ने भी वैसा ही किया। उन्होंने मिलकर दोनों घायल सैनिकों को सुरक्षित जगह पहुंचाया और तबाही के बीच इंसानियत की एक नई मिसाल कायम की।",
      hinglish: "Raat ke andhere mein, ghayal saathi ko bachane ke liye Vikram rengte hue aage badha. Jaise hi woh ek gaddhe ke paas pahuncha, uska samna Alexei se hua, jo apne ghayal mitr ko dhoondh raha tha. Ek khaufnak second ke liye dono ne ek-dusre par bandookein taan deen. Goliyon ke dhamakon ke beech, unhone ek-dusre ki aankhon mein dekha. Wahan koi shaitan nahi tha—bas do thake hue, dare hui insaan the jo zinda rehna chahte the. Vikram ne dheere se apni bandook neeche kar li. Alexei ne bhi waisa hi kiya. Unhone milkar dono ghayal sainikon ko surakshit jagah pahunchaya aur tabaahi ke beech insaniyat ki ek nayi misal kayam ki."
    },
    ending: {
      en: "Years later, when the treaties were signed and the guns fell silent, Somnathpur rebuilt its homes. Vikram returned to his family, carrying physical and mental scars. He often looked at the hills, knowing that Alexei too had returned across the border. They had survived, carrying the silent lesson that the true victory in {prompt} is not in defeating the enemy, but in preserving humanity when all else is lost.",
      hi: "वर्षों बाद, जब समझौतों पर हस्ताक्षर हुए और बंदूकें शांत हुईं, सोमनाथपुर के घर फिर से बस गए। विक्रम अपने परिवार के पास वापस लौट आया, शरीर और मन पर गहरे घाव लेकर। वह अक्सर उन पहाड़ियों को देखता और सोचता कि अलेक्सी भी अपने घर लौट गया होगा। वे जिंदा बच गए थे, यह सबक लेकर कि {prompt} में असली जीत किसी दुश्मन को हराने में नहीं, बल्कि खुद के भीतर की इंसानियत को जिंदा रखने में है।",
      hinglish: "Barsho baad, jab samjhauton par hastakshar hue aur bandookein shant hueen, Somnathpur ke ghar phir se bas gaye. Vikram apne parivar ke paas wapas laut aaya, shareer aur mann par gehre ghaav lekar. Wah aksar un pahadiyon ko dekha aur sochta ki Alexei bhi apne ghar laut gaya hoga. We zinda bach gaye the, yeh sabak lekar ki {prompt} mein asli jeet kisi dushman ko harane mein nahi, balki khud ke bhitar ki insaniyat ko zinda rakhne mein hai."
    },
    moral: {
      en: "War only brings destruction; the ultimate strength of humanity lies in empathy and peace.",
      hi: "युद्ध केवल विनाश लाता है; मानवता की असली ताकत सहानुभूति और शांति में निहित है।",
      hinglish: "Yudh keval vinash laata hai; manavta ki asli taakat sahanubhuti aur shanti mein nihit hai."
    }
  },
  motivational: {
    intro: {
      en: "Success is not a destination, but a relentless journey of overcoming limits, defined by the power of {prompt}. In a bustling tech city, Kabir worked late into the night. His small startup was on the verge of bankruptcy, and his desk was covered with rejection letters from venture capitalists. He had put all his savings and dreams into his software project, believing it could help local farmers connect directly to markets. Yet, everyone around him advised him to quit and take a stable corporate desk job, pointing out his failures.",
      hi: "सफलता कोई मंजिल नहीं है, बल्कि बाधाओं को पार करने का एक निरंतर सफर है, जिसे {prompt} की ताकत से हासिल किया जाता है। एक बड़े शहर में, कबीर देर रात तक काम कर रहा था। उसका छोटा सा स्टार्टअप बंद होने की कगार पर था, और उसकी मेज पर निवेशकों के खारिज किए गए पत्रों का ढेर लगा था। उसने अपनी सारी जमा-पूंजी और सपने अपने सॉफ्टवेयर प्रोजेक्ट में लगा दिए थे। फिर भी, उसके आसपास के लोग उसे इसे छोड़ने और एक स्थिर नौकरी करने की सलाह दे रहे थे।",
      hinglish: "Safalta koi manjil nahi hai, balki badhaon ko paar karne ka ek nirantar safar hai, jise {prompt} ki taakat se haasil kiya jata hai. Ek bade shehar mein, Kabir der raat tak kaam kar raha tha. Uska chhota sa startup band hone ki kagaar par tha, aur uski mez par niveshako ke kharij kiye gaye patro ka dher laga tha. Usne apni saari jama-poonji aur sapne apne software project mein laga diye the. Phir bhi, uske aaspass ke log use ise chhodne aur ek sthir naukri karne ki salah de rahe the."
    },
    conflict: {
      en: "The conflict grew harder when his primary server crashed, wiping out weeks of configuration files. Kabir sat in the dark office, holding his head. He questioned his capabilities. Was he chasing a fantasy? The doubts were louder than ever, whispering that his dedication to {prompt} was just foolish stubbornness. He looked at his reflection in the glass window, feeling the heavy burden of responsibility toward his small team who had trusted his vision.",
      hi: "मुश्किलें तब और बढ़ गईं जब उसका सर्वर क्रैश हो गया और हफ्तों का डेटा गायब हो गया। कबीर अंधेरे ऑफिस में सिर झुकाए बैठा था। उसने अपनी क्षमताओं पर सवाल उठाना शुरू कर दिया। क्या वह किसी झूठे सपने के पीछे भाग रहा था? उसके मन के संदेह जोर-जोर से चिल्ला रहे थे कि {prompt} के प्रति उसका समर्पण सिर्फ एक बेवकूफी थी। उसने खिड़की के कांच में अपनी परछाई देखी, और अपने साथ काम करने वाली छोटी सी टीम के प्रति भारी जिम्मेदारी महसूस की।",
      hinglish: "Mushkilein tab aur badh gayeen jab uska server crash ho gaya aur hafton ka data gayab ho gaya. Kabir andhere office mein sir jhukaye baitha tha. Usne apni kshamtaon par sawal uthana shuru kar diya. Kya wah kisi jhoothe sapne ke peeche bhag raha tha? Uske mann ke sandeh zor-zor se chilla rahe the ki {prompt} ke prati uska samarpan sirf ek bewakoofi thi. Usne khidki ke kaanch mein apni parchhai dekhi, aur apne saath kaam karne wali chhoti si team ke prati bhaari zimmedari mehsoos ki."
    },
    climax: {
      en: "Instead of shutting down his laptop, Kabir stood up, washed his face, and opened a blank coding sheet. He decided that failure was merely a data point, not an identity. He stayed awake for forty-eight straight hours, writing the core algorithm from scratch. On the third morning, just as the sun rose over the skyscrapers, the server booted successfully, and the system launched with flawless execution. A local cooperative of farmers tested the application, and within hours, their crop orders flooded the dashboard, proving the utility of his hard work.",
      hi: "लैपटॉप बंद करने के बजाय, कबीर उठा, मुंह धोया और एक खाली कोडिंग शीट खोली। उसने फैसला किया कि असफलता सिर्फ एक पड़ाव है, मंजिल नहीं। वह लगातार अड़तालीस घंटे तक जागता रहा और शुरू से एल्गोरिदम लिखा। तीसरे दिन की सुबह, जैसे ही सूरज निकला, सर्वर सफलतापूर्वक चालू हो गया। किसानों के एक स्थानीय समूह ने ऐप का परीक्षण किया और कुछ ही घंटों में उनके ऑर्डर डैशबोर्ड पर दिखाई देने लगे, जिससे उसकी मेहनत सफल हो गई।",
      hinglish: "Laptop band karne ke bajaye, Kabir utha, muh dhoya aur ek khali coding sheet kholi. Usne faisla kiya ki asafalta sirf ek padav hai, manjil nahi. Wah lagatar adtalis ghante tak jagta raha aur shuru se algorithm likha. Teesre din ki subah, jaise hi suraj nikla, server safaltapoorvak chalu ho gaya. Kisanon ke ek sthaniy samooh ne app ka pareekshan kiya aur kuch hi ghanton mein unke order dashboard par dikhai dene lage, jisse uski mehnat safal ho gayi."
    },
    ending: {
      en: "Kabir's startup eventually secured funding and grew into a major platform, transforming the lives of thousands of farmers. He kept a framed copy of his first server error code on his wall. It served as a constant reminder that {prompt} is built one step at a time, through every trial we refuse to run away from.",
      hi: "कबीर के स्टार्टअप को आखिरकार फंड मिल गया और वह एक बड़े प्लेटफॉर्म में बदल गया, जिससे हजारों किसानों की जिंदगी बदल गई। उसने अपने ऑफिस की दीवार पर पहले सर्वर एरर का फ्रेम किया हुआ कोड लटका रखा था। यह उसे याद दिलाता था कि {prompt} एक-एक कदम बढ़ाकर हासिल होता है, हर उस मुश्किल से लड़कर जिसे हमने स्वीकार किया।",
      hinglish: "Kabir ke startup ko aakhirkar fund mil gaya aur wah ek bade platform mein badal gaya, jisse hazaron kisanon ki zindagi badal gayi. Usne apne office ki deewar par pehle server error ka frame kiya hua code latka rakha tha. Yeh use yaad dilata tha ki {prompt} ek-ek kadam badhakar haasil hota hai, har us mushkil se ladkar jise humne sweekar kiya."
    },
    moral: {
      en: "Failure is not the opposite of success; it is a stepping stone toward it. Keep going.",
      hi: "असफलता सफलता का विपरीत नहीं है; यह उस तक पहुंचने का एक जरिया है। प्रयास जारी रखें।",
      hinglish: "Asafalta safalta ka vipreet nahi hai; yeh us tak pahunchne ka ek zariya hai. Prayas jari rakhein."
    }
  },
  fantasy: {
    intro: {
      en: "Beyond the misty borders of the known maps lies the ancient realm of Eldoria, a land shaped by the mysterious force of {prompt}. Elian, a young archivist who could read the language of ancient runes, lived in a quiet sanctuary built high in the branches of elder trees. For centuries, the realm was protected by a glowing crystal heart that hummed with magical frequencies. But one evening, the crystal began to turn black, and its light started to fade.",
      hi: "नक्शों की धुंधली सीमाओं से परे एल्डोरिया का प्राचीन साम्राज्य बसा था, जो {prompt} की जादुई शक्ति से संचालित होता था। एलियन, एक युवा खोजी जो प्राचीन पत्थरों पर लिखी भाषा पढ़ सकता था, पेड़ों की ऊंची शाखाओं पर बने एक शांत घर में रहता था। सदियों से, इस साम्राज्य की रक्षा एक चमकता हुआ क्रिस्टल करता था। लेकिन एक शाम, वह क्रिस्टल काला पड़ने लगा और उसकी रोशनी धीमी हो गई।",
      hinglish: "Nakshon ki dhundhli seemaon se pare Eldoria ka prachin samrajya basa tha, jo {prompt} ki jaadui shakti se sanchalit hota tha. Elian, ek yuva khoji jo prachin pattharon par likhi bhasha padh sakta tha, pedon ki oonchi shakhaon par bane ek shant ghar mein rehta tha. Sadiyon se, is samrajya ki raksha ek chamakta hua crystal karta tha. Lekin ek shaam, wah crystal kala padne laga aur uski roshni dheemi ho gayi."
    },
    conflict: {
      en: "As the dark shadows spread, devouring the forests and turning creatures into stone, Elian discovered an ancient scroll. It revealed that the crystal could only be restored by finding the Star of Eldoria, hidden deep within the Whispering Caves. The path was guarded by mechanical stone guardians and illusion traps that fed on a traveler's deepest regrets. The journey of {prompt} was perilous, and Elian had never stepped outside the safety of his library before.",
      hi: "जैसे-जैसे काली परछाइयां फैलने लगीं, जंगल सूख गए और जानवर पत्थर के बनने लगे, तब एलियन को एक पुराना दस्तावेज मिला। उसमें लिखा था कि क्रिस्टल को केवल 'स्टार ऑफ एल्डोरिया' से ही बचाया जा सकता है, जो फुसफुसाती गुफाओं में छुपा था। रास्ता बहुत खतरनाक था और वहां जाने वाले की यादों के भ्रम जाल बिछे थे। {prompt} का यह सफर मुश्किल था, और एलियन ने कभी अपनी लाइब्रेरी से बाहर कदम नहीं रखा था।",
      hinglish: "Jaise-jaise kali parchhaiyan phailne lageen, jungle sookh gaye aur jaanwar patthar ke banne lage, tab Elian ko ek purana dastavez mila. Usmein likha tha ki crystal ko keval 'Star of Eldoria' se hi bachaya ja sakta hai, jo Phusphusati Gufaon mein chhupa tha. Raasta bahut khatarnak tha aur wahan jaane wale ki yaadon ke bhram jaal biche the. {prompt} ka yeh safar mushkil tha, aur Elian ne kabhi apni library se bahar kadam nahi rakha tha."
    },
    climax: {
      en: "Deep within the caverns, Elian stood before the pedestal of the star. Suddenly, the cave walls shifted, and a giant shadow guardian materialized. It whispered illusions of his past failures, trying to convince him to surrender. Relying on his knowledge and chanting the runes of {prompt}, Elian realized that the guardian was made of his own doubts. He closed his eyes and stepped forward into the shadow. The monster shattered into glowing particles, and the star descended into his palms.",
      hi: "गुफा की गहराइयों में, एलियन उस जादुई तारे के सामने खड़ा था। अचानक, गुफा की दीवारें हिलने लगीं और एक विशाल छाया रक्षक सामने आ गया। उसने एलियन के कानों में उसके पुराने असफलताओं की यादें फुसफुसायीं ताकि वह हार मान ले। लेकिन एलियन ने अपने ज्ञान और {prompt} के मंत्रों का जाप करते हुए महसूस किया कि यह दानव उसके अपने संदेहों से बना है। उसने आंखें बंद कीं और आगे बढ़ गया। परछाई गायब हो गई और तारा उसके हाथ में आ गया।",
      hinglish: "Gufa ki gehraiyon mein, Elian us jaadui taare ke saamne khada tha. Achanak, gufa ki deewarein hilne lageen aur ek vishal chhaya rakshak saamne aa gaya. Usne Elian ke kaanon mein uske purane asafaltaon ki yaadein phusphusayeen taaki wah haar maan le. Lekin Elian ne apne gyan aur {prompt} ke mantron ka jaap karte hui mehsoos kiya ki yeh danav uske apne sandehon se bana hai. Usne aankhein band keen aur aage badh gaya. Parchhai gayab ho gayi aur tara uske haath mein aa gaya."
    },
    ending: {
      en: "Returning to the sanctuary, Elian placed the star into the crystal heart. A wave of brilliant emerald light washed over Eldoria, restoring the forests and bringing the stone creatures back to life. Elian returned to his scrolls, but he was no longer just a reader of histories—he had become a part of them.",
      hi: "वापस लौटकर, एलियन ने उस तारे को क्रिस्टल के बीच रख दिया। पूरे साम्राज्य में हरी रोशनी फैल गई, जंगल हरे हो गए और जीव फिर से जीवित हो गए। एलियन अपनी किताबों के पास वापस लौट आया, लेकिन अब वह सिर्फ इतिहास पढ़ने वाला नहीं था—वह खुद इतिहास बन चुका था।",
      hinglish: "Wapas lautkar, Elian ne us taare ko crystal ke beech rakh diya. Poore samrajya mein hari roshni phail gayi, jungle hare ho gaye aur jeev phir se jeevit ho gaye. Elian apni kitaabon ke paas wapas laut aaya, lekin ab wah sirf itihas padhne wala nahi tha—wah khud itihas ban chuka tha."
    },
    moral: {
      en: "The greatest magic in the world is the belief in your own potential to overcome shadows.",
      hi: "दुनिया का सबसे बड़ा जादू खुद पर भरोसा रखना और मुश्किलों का सामना करना है।",
      hinglish: "Duniya ka sabse bada jadoo khud par bharosa rakhna aur mushkilon ka saamna karna hai."
    }
  },
  mystery: {
    intro: {
      en: "In the quiet town of Blackwood, the rain never seemed to stop. Detective Miller sat in his office, looking at a file marked {prompt}. A vintage clock sat on the desk, stopped at exactly 3:15 AM. It was the exact time the mayor had disappeared from his locked study room, leaving no signs of struggle, only a single golden key left on the floor.",
      hi: "ब्लैकवुड के छोटे से कस्बे में बारिश थमने का नाम नहीं ले रही थी। डिटेक्टिव मिलर अपने दफ्तर में बैठा {prompt} नाम की फाइल देख रहा था। मेज पर एक पुरानी घड़ी रखी थी, जो ठीक 3:15 बजे रुकी हुई थी। यह वही समय था जब मेयर अपने बंद कमरे से अचानक गायब हो गए थे, बिना किसी निशान के, सिवाय फर्श पर पड़ी एक सुनहरी चाबी के।",
      hinglish: "Blackwood ke chhote se kasbe mein baarish thamne ka naam nahi le rahi thi. Detective Miller apne daftar mein baitha {prompt} naam ki file dekh raha tha. Mez par ek purani ghadi rakhi thi, jo theek 3:15 baje ruki hui thi. Yeh wahi samay tha jab mayor apne band kamre se achanak gayab ho gaye the, bina kisi nishan ke, sivaye farsh par padi ek sunhari chabi ke."
    },
    conflict: {
      en: "As Miller investigated the library room, he found hidden channels behind the bookshelves. The town council members warned him to stop, hinting that researching {prompt} would uncover secrets that were better left buried. Anonymous letters arrived at his door, containing threats. But Miller was a man driven by truth, and the stopped clock became a challenge he could not ignore.",
      hi: "जब मिलर ने लाइब्रेरी की जांच की, तो उसे किताबों की अलमारी के पीछे छिपे हुए रास्ते मिले। कस्बे के लोगों ने उसे रुकने की सलाह दी, यह कहते हुए कि {prompt} की खोज से ऐसे रहस्य सामने आएंगे जो दफन ही अच्छे हैं। उसे धमकियों भरे पत्र भी मिले। लेकिन मिलर सच की तलाश करने वाला इंसान था, और वह पीछे हटने को तैयार नहीं था।",
      hinglish: "Jab Miller ne library ki jaanch ki, to use kitaabon ki almari ke peeche chhipe hue raaste mile. Kasbe ke logon ne use rukne ki salah deen, yeh kehte hui ki {prompt} ki khoj se aise rahasya saamne aayenge jo dafan hi acche hain. Use dhamkiyon bhare patra bhi mile. Lekin Miller sach ki talaash karne wala insaan tha, aur wah peeche hatne ko taiyar nahi tha."
    },
    climax: {
      en: "Following the hidden tunnel, Miller reached an underground cellar beneath the town clock tower. There, he found the mayor held hostage by a secret syndicate. Just as Miller raised his flashlight, the syndicate leader stepped out of the shadows. A tense confrontation ensued. Using the golden key to unlock a hidden safe, Miller revealed documents proving the syndicate's plan, catching them off guard and securing the mayor's release.",
      hi: "सुरंग का पीछा करते हुए, मिलर घड़ी की मीनार के नीचे एक तहखाने में पहुंचा। वहां उसने देखा कि मेयर को बंधक बना कर रखा गया था। जैसे ही मिलर ने अपनी टॉर्च जलाई, उनका सामना विरोधियों से हुआ। उस सुनहरी चाबी का उपयोग करके मिलर ने एक तिजोरी खोली और दस्तावेज हासिल किए, जिससे सच्चाई सबके सामने आ गई।",
      hinglish: "Surang ka peecha karte hui, Miller ghadi ki meenar ke neeche ek tehkhane mein pahuncha. Wahan usne dekha ki mayor ko bandhak bana kar rakha gaya tha. Jaise hi Miller ne apni torch jalayi, unka samna virodhiyon se hua. Us sunhari chabi ka upayog karke Miller ne ek tijori kholi aur dastavez haasil kiya, jisse sacchai sabke samne aa gayi."
    },
    ending: {
      en: "With the syndicate exposed, the town clock tower hummed back to life. Miller returned to his office. He placed the golden key in his drawer, knowing that the case of {prompt} was closed, but the town of Blackwood would always have stories hidden in its rain.",
      hi: "सच्चाई सामने आने के बाद, मीनार की घड़ी फिर से चलने लगी। मिलर अपने दफ्तर लौट आया। उसने उस सुनहरी चाबी को अपनी दराज में रख दिया, यह जानते हुए कि {prompt} का मामला सुलझ गया है, लेकिन ब्लैकवुड में अभी भी कई रहस्य छुपे हैं।",
      hinglish: "Sacchai saamne aane ke baad, meenar ki ghadi phir se chalne lagi. Miller apne daftar laut aaya. Usne us sunhari chabi ko apni daraj mein rakh diya, yeh jaante hui ki {prompt} ka mamla sulajh gaya hai, lekin Blackwood mein abhi bhi kai rahasya chhupe hain."
    },
    moral: {
      en: "Truth cannot remain hidden forever; dedicated patience will eventually pierce the darkest fog.",
      hi: "सच्चाई को लंबे समय तक छुपाया नहीं जा सकता; लगन और धैर्य से हर रहस्य सुलझ जाता है।",
      hinglish: "Sacchai ko lambe samay tak chhupaya nahi ja sakta; lagan aur dhairya se har rahasya sulajh jata hai."
    }
  }
};

/**
 * Main engine generator
 */
export function generateLocalStory({ prompt, genre, length, language }) {
  // Normalize prompt fallback
  const cleanPrompt = prompt.trim() || "Destination";
  
  // Categorize genre to core template
  let category = "fantasy";
  const g = genre.toLowerCase();
  if (g.includes("love") || g.includes("romance") || g.includes("romantic") || g.includes("friendship") || g.includes("family")) {
    category = "love";
  } else if (g.includes("war") || g.includes("history") || g.includes("historical") || g.includes("political")) {
    category = "war";
  } else if (g.includes("motivation") || g.includes("inspiration") || g.includes("inspirational") || g.includes("biography") || g.includes("business") || g.includes("education")) {
    category = "motivational";
  } else if (g.includes("mystery") || g.includes("thriller") || g.includes("horror")) {
    category = "mystery";
  }

  // Fetch templates
  const template = db[category] || db.fantasy;
  const lang = language.toLowerCase() === "hindi" ? "hi" : language.toLowerCase() === "hinglish" ? "hinglish" : "en";

  // Build Title
  const titleList = titles[category] ? titles[category][lang] : titles.fantasy[lang];
  const selectedTitle = titleList[Math.floor(Math.random() * titleList.length)];
  
  // Paragraph builders
  let introPara = template.intro[lang].replace(/{prompt}/g, cleanPrompt);
  let conflictPara = template.conflict[lang].replace(/{prompt}/g, cleanPrompt);
  let climaxPara = template.climax[lang].replace(/{prompt}/g, cleanPrompt);
  let endingPara = template.ending[lang].replace(/{prompt}/g, cleanPrompt);
  let moralText = template.moral[lang];

  // Modify length parameters by cloning or injecting extra content blocks
  if (length === "medium") {
    // Add extra exposition paragraphs
    if (lang === "hi") {
      introPara += "\n\nवक्त बीतता गया, और रास्ते कठिन होते गए। लेकिन दोनों ही हार मानने को तैयार नहीं थे। कदम-कदम पर नई परीक्षाएं आ रही थीं, लेकिन दिल में जलती उम्मीद की मशाल उन्हें आगे बढ़ने का साहस दे रही थी।";
      conflictPara += "\n\nउनके मार्ग में आने वाली दुविधाओं ने उनकी मानसिक शक्ति को पूरी तरह झकझोर दिया था। लेकिन उन्होंने एक-दूसरे पर और अपनी खुद की क्षमताओं पर अटूट विश्वास बनाए रखा।";
    } else if (lang === "hinglish") {
      introPara += "\n\nWaqt beet ta gaya, aur raaste kathin hote gaye. Lekin dono hi haar manne ko taiyar nahi the. Kadam-kadam par nayi parikshayen aa rahi theen, lekin dil mein jalti umeed ki mashaal unhe aage badhne ka sahas de rahi thi.";
      conflictPara += "\n\nUnke maarg mein aane wali duvidhaon ne unki mansik shakti ko poori tarah jhakjhor diya tha. Lekin unhone ek-dusre par aur apni khud ki kshamtaon par atoot vishwas banaye rakkha.";
    } else {
      introPara += "\n\nAs time flowed like river water, the challenges grew more apparent. Yet, the deep connection built through the shared vision kept them moving forward through the misty pathways.";
      conflictPara += "\n\nThe internal doubts and external forces aligned against them, creating a perfect storm of resistance. Every decision held consequences that could reshape their future forever.";
    }
  } else if (length === "long") {
    // Add multiple detailed chapters/paragraphs to exceed 2000 words conceptually
    if (lang === "hi") {
      introPara += "\n\nइस विशाल दुनिया में, हर एक व्यक्ति अपने हिस्से का संघर्ष जी रहा है। हमारे चरित्र भी इससे अलग नहीं थे। उनकी यात्रा सिर्फ भौगोलिक नहीं थी, बल्कि यह मन के गहरे कोनों में दबी आकांक्षाओं और पुराने डर को हराने की एक कोशिश थी। वे घंटों बैठकर पुरानी कहानियों पर चर्चा करते थे, यह समझने के लिए कि कैसे वे इस दलदल से बाहर निकल सकते हैं।";
      introPara += "\n\nसमय के चक्र ने कई बदलाव किए। मौसम बदलते गए, और उनके साथ ही लोगों के विचार भी। लेकिन उस शांत लाइब्रेरी के कोने में बना वो संकल्प कभी नहीं बदला। वे जानते थे कि जो बदलाव वे दुनिया में देखना चाहते हैं, उसकी शुरुआत खुद से ही करनी होगी।";
      conflictPara += "\n\nसंकट की इस घड़ी में, जब चारों तरफ केवल निराशा का अंधेरा था, तब भी उन्होंने आशा की किरण को बुझने नहीं दिया। विरोधियों की ताकत बढ़ रही थी, और परिस्थितियां उनके नियंत्रण से बाहर हो रही थीं। लेकिन ऐसे ही समय में असली चरित्र की पहचान होती है।";
      conflictPara += "\n\nहर एक असफलता के साथ, वे टूट रहे थे, लेकिन फिर से खड़े होने का उनका जज्बा पहले से कहीं अधिक मजबूत हो जाता था। वे जानते थे कि संघर्ष का यह दौर उनके सब्र का इम्तिहान ले रहा है, और उन्हें इसमें उत्तीर्ण होना ही होगा।";
      climaxPara += "\n\nचरमोत्कर्ष का वह क्षण आ गया जब सभी रास्ते बंद हो चुके थे। आमने-सामने की उस परिस्थिति में, सांसें थमी हुई थीं और हर एक सेकंड सदियों के बराबर लग रहा था। केवल एक सही निर्णय ही उन्हें इस संकट से उबार सकता था।";
    } else if (lang === "hinglish") {
      introPara += "\n\nIs vishal duniya mein, har ek vyakti apne hisse ka sangharsh jee raha hai. Hamare character bhi isse alag nahi the. Unki yatra sirf geographical nahi thi, balki yeh mann ke gehre konon mein dabi aakankshaon aur purane darr ko harane ki ek koshish thi. We ghanton baithkar purani kahaniyon par charcha karte the, yeh samajhne ke liye ki kaise we is daldal se bahar nikal sakte hain.";
      introPara += "\n\nSamay ke chakra ne kai badlav kiye. Mausam badalte gaye, aur unke saath hi logon ke vichar bhi. Lekin us shant library ke kone mein bana woh sankalp kabhi nahi badla. We jaante the ki jo badlav we duniya mein dekhna chahte hain, uski shuruaat khud se hi karni hogi.";
      conflictPara += "\n\nSankat ki is ghadi mein, jab charon taraf keval nirasha ka andhera tha, tab bhi unhone aasha ki kiran ko bujhne nahi diya. Virodhiyon ki taakat badh rahi thi, aur paristhitiyan unke niyantran se bahar ho rahi theen. Lekin aise hi samay mein asli character ki pehchan hoti hai.";
      conflictPara += "\n\nHar ek asafalta ke saath, we toot rahe the, lekin phir se khade hone ka unka jazba pehle se kahin adhik mazboot ho jata tha. We jaante the ki sangharsh ka yeh daur unke sabr ka imtihan le raha hai, aur unhe ismein utteerna hona hi hoga.";
      climaxPara += "\n\nClimax ka woh kshan aa gaya jab sabhi raaste band ho chuke the. Aamne-saamne ki us paristhiti mein, saansein thami hui theen aur har ek second sadiyon ke barabar lag raha tha. Keval ek sahi nirnay hi unhe is sankat se ubaar sakta tha.";
    } else {
      introPara += "\n\nIn the grand tapestry of human existence, every thread represents a unique struggle, and our protagonists were no exception. Their path was not merely a physical journey across borders; it was an internal quest to conquer ancient regrets and unlock the hidden potential dormant inside their souls. They spent countless nights discussing historical logs and scrolls, searching for any clue that could guide their next steps.";
      introPara += "\n\nAs weeks turned into months, the seasons shifted from the warm touch of summer to the freezing winds of winter. Yet, the promise made in the quiet library remained unshakeable. They came to understand that the true changes we seek in the world must first begin as quiet revolutions within ourselves, built step-by-step.";
      conflictPara += "\n\nAt this critical juncture, when despair threatened to consume every remaining hope, they discovered an reserves of resilience. The opposition was scaling up its forces, and the variables of their mission were sliding out of control. It is precisely during such dark times that true character is forged and tested under fire.";
      conflictPara += "\n\nWith every minor setback, they felt the weight of exhaustion, but their refusal to yield was absolute. They recognized that the heavy trials were not meant to break them, but to temper their resolve like steel, preparing them for the ultimate confrontation that lay ahead.";
      climaxPara += "\n\nThe final confrontation arrived under a thundering sky, with all exit routes blocked by the relentless forces. The tension in the air was palpable, and every passing second felt like an eternity. A single, high-stakes decision would determine the fate of everything they had built.";
    }
  }

  // Format Output
  return `Title:\n${selectedTitle}\n\nGenre:\n${genre}\n\nStory:\n${introPara}\n\n${conflictPara}\n\n${climaxPara}\n\n${endingPara}\n\nMoral:\n${moralText}`;
}
