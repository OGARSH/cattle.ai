import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import { fileURLToPath } from 'url';

import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

type Data = {
  users: any[];
  history: any[];
  breeds: any[];
};

// Provide default data, including breeds, to prevent crash on empty db.json
const defaultData: Data = { 
  users: [], 
  history: [], 
  breeds: [
    // Gir, Jersey, and other breeds defined here...
    {
      id: "hariana",
      name: "Hariana",
      nameHi: "हरियाणा",
      averageWeight: "400-500",
      averageHeight: "130-140",
      lifespan: "12-15",
      nativeRegion: "Haryana, India",
      nativeRegionHi: "हरियाणा, भारत",
      milkCapacity: "6-10 ",
      milkCapacityHi: "6-10 लीटर/दिन",
      characteristics: [
        "White or light grey color",
        "Medium size, compact body",
        "Good draught and milking ability",
        "Popular in North India"
      ],
      characteristicsHi: [
        "सफेद या हल्का ग्रे रंग",
        "मध्यम आकार, कॉम्पैक्ट शरीर",
        "अच्छी मसौदा और दुग्ध क्षमता",
        "उत्तर भारत में लोकप्रिय"
      ]
    },
    {
      id: "baani",
      name: "Baani",
      nameHi: "बानी",
      averageWeight: "350-400",
      averageHeight: "120-130",
      lifespan: "10-14",
      nativeRegion: "Punjab, India",
      nativeRegionHi: "पंजाब, भारत",
      milkCapacity: "5-8 ",
      milkCapacityHi: "5-8 लीटर/दिन",
      characteristics: [
        "Small, hardy breed",
        "Adapted to local conditions",
        "Good for draught and milk",
        "Resistant to diseases"
      ],
      characteristicsHi: [
        "छोटी, मजबूत नस्ल",
        "स्थानीय परिस्थितियों के लिए अनुकूलित",
        "मसौदा और दूध के लिए अच्छी",
        "रोग प्रतिरोधी"
      ]
    },
    {
      id: "khillari",
      name: "Khillari",
      nameHi: "खिल्लारी",
      averageWeight: "350-500",
      averageHeight: "125-135",
      lifespan: "12-15",
      nativeRegion: "Maharashtra, India",
      nativeRegionHi: "महाराष्ट्र, भारत",
      milkCapacity: "3-6 ",
      milkCapacityHi: "3-6 लीटर/दिन",
      characteristics: [
        "Grey or white color",
        "Long, lyre-shaped horns",
        "Excellent draught power",
        "Adapted to dry regions"
      ],
      characteristicsHi: [
        "ग्रे या सफेद रंग",
        "लंबे, वीणा के आकार के सींग",
        "उत्कृष्ट मसौदा शक्ति",
        "सूखे क्षेत्रों के लिए अनुकूलित"
      ]
    },
    {
      id: "malnadgidda",
      name: "Malnad Gidda",
      nameHi: "मालनाड गिड्डा",
      averageWeight: "150-200",
      averageHeight: "90-100",
      lifespan: "12-15",
      nativeRegion: "Karnataka, India",
      nativeRegionHi: "कर्नाटक, भारत",
      milkCapacity: "2-4 ",
      milkCapacityHi: "2-4 लीटर/दिन",
      characteristics: [
        "Small, dwarf breed",
        "Brown or black color",
        "High disease resistance",
        "Efficient for small farmers"
      ],
      characteristicsHi: [
        "छोटी, बौनी नस्ल",
        "भूरा या काला रंग",
        "उच्च रोग प्रतिरोधक क्षमता",
        "छोटे किसानों के लिए उपयुक्त"
      ]
    },
    {
      id: "jaffrabadi",
      name: "Jaffrabadi",
      nameHi: "जाफराबादी",
      averageWeight: "500-600",
      averageHeight: "135-140",
      lifespan: "12-15",
      nativeRegion: "Gujarat, India",
      nativeRegionHi: "गुजरात, भारत",
      milkCapacity: "8-14 ",
      milkCapacityHi: "8-14 लीटर/दिन",
      characteristics: [
        "Massive body, black color",
        "Heavy, drooping horns",
        "High milk yield",
        "Popular in Saurashtra region"
      ],
      characteristicsHi: [
        "विशाल शरीर, काला रंग",
        "भारी, झुके हुए सींग",
        "उच्च दूध उत्पादन",
        "सौराष्ट्र क्षेत्र में लोकप्रिय"
      ]
    },
    {
      id: "alambadi",
      name: "Alambadi",
      nameHi: "आलमबाड़ी",
      averageWeight: "350-400",
      averageHeight: "120-130",
      lifespan: "10-14",
      nativeRegion: "Tamil Nadu, India",
      nativeRegionHi: "तमिलनाडु, भारत",
      milkCapacity: "3-5 ",
      milkCapacityHi: "3-5 लीटर/दिन",
      characteristics: [
        "Grey or white color",
        "Medium size, compact body",
        "Good draught ability",
        "Adapted to hilly regions"
      ],
      characteristicsHi: [
        "ग्रे या सफेद रंग",
        "मध्यम आकार, कॉम्पैक्ट शरीर",
        "अच्छी मसौदा क्षमता",
        "पहाड़ी क्षेत्रों के लिए अनुकूलित"
      ]
    },
    {
      id: "deoni",
      name: "Deoni",
      nameHi: "देवनी",
      averageWeight: "400-500",
      averageHeight: "120-130",
      lifespan: "12-15",
      nativeRegion: "Maharashtra, India",
      nativeRegionHi: "महाराष्ट्र, भारत",
      milkCapacity: "6-10 ",
      milkCapacityHi: "6-10 लीटर/दिन",
      characteristics: [
        "White with black spots",
        "Dual-purpose (milk and draught)",
        "Medium size, strong body",
        "Popular in Marathwada region"
      ],
      characteristicsHi: [
        "सफेद रंग, काले धब्बों के साथ",
        "दोहरे उद्देश्य (दूध और मसौदा)",
        "मध्यम आकार, मजबूत शरीर",
        "मराठवाड़ा क्षेत्र में लोकप्रिय"
      ]
    },
    {
      id: "bargur",
      name: "Bargur",
      nameHi: "बारगुर",
      averageWeight: "300-350",
      averageHeight: "110-120",
      lifespan: "10-14",
      nativeRegion: "Tamil Nadu, India",
      nativeRegionHi: "तमिलनाडु, भारत",
      milkCapacity: "2-4 ",
      milkCapacityHi: "2-4 लीटर/दिन",
      characteristics: [
        "Reddish brown color",
        "Agile and active",
        "Good for hilly terrain",
        "Moderate milk yield"
      ],
      characteristicsHi: [
        "लाल-भूरा रंग",
        "फुर्तीला और सक्रिय",
        "पहाड़ी इलाकों के लिए उपयुक्त",
        "मध्यम दूध उत्पादन"
      ]
    },
    {
      id: "amritmahal",
      name: "Amritmahal",
      nameHi: "अमृतमहल",
      averageWeight: "400-500",
      averageHeight: "130-140",
      lifespan: "12-15",
      nativeRegion: "Karnataka, India",
      nativeRegionHi: "कर्नाटक, भारत",
      milkCapacity: "3-5 ",
      milkCapacityHi: "3-5 लीटर/दिन",
      characteristics: [
        "Grey or white color",
        "Long, sharp horns",
        "Excellent draught power",
        "Adapted to dry regions"
      ],
      characteristicsHi: [
        "ग्रे या सफेद रंग",
        "लंबे, नुकीले सींग",
        "उत्कृष्ट मसौदा शक्ति",
        "सूखे क्षेत्रों के लिए अनुकूलित"
      ]
    },
    {
      id: "kangayam",
      name: "Kangayam",
      nameHi: "कांगायम",
      averageWeight: "350-450",
      averageHeight: "120-130",
      lifespan: "12-15",
      nativeRegion: "Tamil Nadu, India",
      nativeRegionHi: "तमिलनाडु, भारत",
      milkCapacity: "3-5 ",
      milkCapacityHi: "3-5 लीटर/दिन",
      characteristics: [
        "Grey or white color",
        "Compact, muscular body",
        "Good draught ability",
        "Popular in Kongu region"
      ],
      characteristicsHi: [
        "ग्रे या सफेद रंग",
        "कॉम्पैक्ट, मांसल शरीर",
        "अच्छी मसौदा क्षमता",
        "कोंगु क्षेत्र में लोकप्रिय"
      ]
    },
    {
      id: "kasargod",
      name: "Kasargod",
      nameHi: "कासरगोड",
      averageWeight: "200-250",
      averageHeight: "100-110",
      lifespan: "10-14",
      nativeRegion: "Kerala, India",
      nativeRegionHi: "केरल, भारत",
      milkCapacity: "2-4 ",
      milkCapacityHi: "2-4 लीटर/दिन",
      characteristics: [
        "Small, hardy breed",
        "Brown or black color",
        "Adapted to local conditions",
        "Good for small farmers"
      ],
      characteristicsHi: [
        "छोटी, मजबूत नस्ल",
        "भूरा या काला रंग",
        "स्थानीय परिस्थितियों के लिए अनुकूलित",
        "छोटे किसानों के लिए उपयुक्त"
      ]
    },
    {
      id: "nagori",
      name: "Nagori",
      nameHi: "नागोरी",
      averageWeight: "400-500",
      averageHeight: "130-140",
      lifespan: "12-15",
      nativeRegion: "Rajasthan, India",
      nativeRegionHi: "राजस्थान, भारत",
      milkCapacity: "3-6 ",
      milkCapacityHi: "3-6 लीटर/दिन",
      characteristics: [
        "White or light grey color",
        "Long, upward curving horns",
        "Excellent draught power",
        "Popular in Rajasthan"
      ],
      characteristicsHi: [
        "सफेद या हल्का ग्रे रंग",
        "लंबे, ऊपर की ओर मुड़े हुए सींग",
        "उत्कृष्ट मसौदा शक्ति",
        "राजस्थान में लोकप्रिय"
      ]
    },
    {
      id: "nili-ravi",
      name: "Nili Ravi",
      nameHi: "नीली-रावी",
      averageWeight: "600-700",
      averageHeight: "125-135",
      lifespan: "15-20",
      nativeRegion: "Punjab region of Pakistan and India",
      nativeRegionHi: "पाकिस्तान और भारत का पंजाब क्षेत्र",
      milkCapacity: "12-18 ",
      milkCapacityHi: "12-18 लीटर/दिन",
      characteristics: [
        "Typically black with white markings (Panj Kalyan)",
        "Small, tightly curled horns",
        "Wall eyes (white eyes)",
        "Docile and gentle temperament"
      ],
      characteristicsHi: [
        "आमतौर पर सफेद निशानों के साथ काले रंग की (पंज कल्याण)",
        "छोटे, कसकर मुड़े हुए सींग",
        "सफेद आंखें",
        "शांत और विनम्र स्वभाव"
      ]
    },
    {
      id: "bhadawari",
      name: "Bhadawari",
      nameHi: "भदावरी",
      averageWeight: "400-500",
      averageHeight: "125-135",
      lifespan: "12-15",
      nativeRegion: "Uttar Pradesh/Madhya Pradesh, India",
      nativeRegionHi: "उत्तर प्रदेश/मध्य प्रदेश, भारत",
      milkCapacity: "6-12 ",
      milkCapacityHi: "6-12 लीटर/दिन",
      characteristics: [
        "Copper colored body",
        "Medium size, compact body",
        "High butterfat content in milk",
        "Popular in central India"
      ],
      characteristicsHi: [
        "तांबे रंग का शरीर",
        "मध्यम आकार, कॉम्पैक्ट शरीर",
        "दूध में उच्च मक्खन वसा",
        "मध्य भारत में लोकप्रिय"
      ]
    },
    {
      id: "dani",
      name: "Dani",
      nameHi: "दानी",
      averageWeight: "300-350",
      averageHeight: "110-120",
      lifespan: "10-14",
      nativeRegion: "Assam, India",
      nativeRegionHi: "असम, भारत",
      milkCapacity: "2-4 ",
      milkCapacityHi: "2-4 लीटर/दिन",
      characteristics: [
        "Small, hardy breed",
        "Brown or black color",
        "Adapted to local conditions",
        "Good for small farmers"
      ],
      characteristicsHi: [
        "छोटी, मजबूत नस्ल",
        "भूरा या काला रंग",
        "स्थानीय परिस्थितियों के लिए अनुकूलित",
        "छोटे किसानों के लिए उपयुक्त"
      ]
    },
    {
      id: "mehsana",
      name: "Mehsana",
      nameHi: "मेहसाणा",
      averageWeight: "450-550",
      averageHeight: "125-135",
      lifespan: "12-15",
      nativeRegion: "Gujarat, India",
      nativeRegionHi: "गुजरात, भारत",
      milkCapacity: "8-14 ",
      milkCapacityHi: "8-14 लीटर/दिन",
      characteristics: [
        "Black or grey color",
        "Medium size, strong body",
        "High milk yield",
        "Popular in Gujarat"
      ],
      characteristicsHi: [
        "काला या ग्रे रंग",
        "मध्यम आकार, मजबूत शरीर",
        "उच्च दूध उत्पादन",
        "गुजरात में लोकप्रिय"
      ]
    },
    {
      id: "kenkatha",
      name: "Kenkatha",
      nameHi: "केनकथा",
      averageWeight: "300-350",
      averageHeight: "110-120",
      lifespan: "10-14",
      nativeRegion: "Uttar Pradesh, India",
      nativeRegionHi: "उत्तर प्रदेश, भारत",
      milkCapacity: "2-4 ",
      milkCapacityHi: "2-4 लीटर/दिन",
      characteristics: [
        "Small, hardy breed",
        "Brown or black color",
        "Adapted to local conditions",
        "Good for small farmers"
      ],
      characteristicsHi: [
        "छोटी, मजबूत नस्ल",
        "भूरा या काला रंग",
        "स्थानीय परिस्थितियों के लिए अनुकूलित",
        "छोटे किसानों के लिए उपयुक्त"
      ]
    },
    {
      id: "kherigarh",
      name: "Kherigarh",
      nameHi: "खेरिगढ़",
      averageWeight: "350-400",
      averageHeight: "120-130",
      lifespan: "10-14",
      nativeRegion: "Uttar Pradesh, India",
      nativeRegionHi: "उत्तर प्रदेश, भारत",
      milkCapacity: "2-4 ",
      milkCapacityHi: "2-4 लीटर/दिन",
      characteristics: [
        "Small, hardy breed",
        "Brown or black color",
        "Adapted to local conditions",
        "Good for small farmers"
      ],
      characteristicsHi: [
        "छोटी, मजबूत नस्ल",
        "भूरा या काला रंग",
        "स्थानीय परिस्थितियों के लिए अनुकूलित",
        "छोटे किसानों के लिए उपयुक्त"
      ]
    },
    {
      id: "gir",
      name: "Gir",
      nameHi: "गिर",
      averageWeight: "400-475",
      averageHeight: "130-140",
      lifespan: "12-15",
      nativeRegion: "Gujarat, India",
      nativeRegionHi: "गुजरात, भारत",
      milkCapacity: "10-15 ",
      milkCapacityHi: "10-15 लीटर/दिन",
      characteristics: [
        "Distinctive curved horns",
        "Prominent forehead",
        "White with red/brown patches",
        "Heat tolerant",
        "Good maternal instincts"
      ],
      characteristicsHi: [
        "विशिष्ट घुमावदार सींग",
        "प्रमुख माथा",
        "लाल/भूरे धब्बों के साथ सफेद",
        "गर्मी सहनशील",
        "अच्छी मातृ प्रवृत्ति"
      ]
    },
      {
        id: "jersey",
        name: "Jersey",
        nameHi: "जर्सी",
        averageWeight: "400-500",
        averageHeight: "115-120",
        lifespan: "12-15",
        nativeRegion: "Jersey, Channel Islands",
        nativeRegionHi: "जर्सी, चैनल द्वीप समूह",
        milkCapacity: "15-25 ",
        milkCapacityHi: "15-25 लीटर/दिन",
        characteristics: [
          "Light brown coat with white patches",
          "Small size and fine-boned",
          "High butterfat content in milk",
          "Efficient grazers",
          "Docile temperament"
        ],
        characteristicsHi: [
          "हल्के भूरे रंग का कोट और सफेद धब्बे",
          "छोटा आकार और पतली हड्डियाँ",
          "दूध में उच्च मक्खन वसा",
          "कुशल चराई करने वाली",
          "शांत स्वभाव"
        ]
      },
    {
      id: "holstein-friesian",
      name: "Holstein Friesian",
      nameHi: "होल्स्टीन फ्रिसियन",
      averageWeight: "680-770",
      averageHeight: "145-165",
      lifespan: "4-6",
      nativeRegion: "Netherlands",
      nativeRegionHi: "नीदरलैंड्स",
      milkCapacity: "25-35 ",
      milkCapacityHi: "25-35 लीटर/दिन",
      characteristics: [
        "Large size, black and white markings",
        "Highest milk yield among dairy breeds",
        "Docile temperament",
        "Efficient feed converters"
      ],
      characteristicsHi: [
        "बड़ा आकार, काले और सफेद निशान",
        "दुग्ध नस्लों में सबसे अधिक दूध उत्पादन",
        "शांत स्वभाव",
        "कुशल चारा परिवर्तक"
      ]
    },
    {
      id: "ayrshire",
      name: "Ayrshire",
      nameHi: "आयरशायर",
      averageWeight: "540-600",
      averageHeight: "125-135",
      lifespan: "10-12",
      nativeRegion: "Scotland",
      nativeRegionHi: "स्कॉटलैंड",
      milkCapacity: "20-30 ",
      milkCapacityHi: "20-30 लीटर/दिन",
      characteristics: [
        "Red and white markings",
        "Efficient grazers",
        "Good udder conformation",
        "Hardy and adaptable"
      ],
      characteristicsHi: [
        "लाल और सफेद निशान",
        "कुशल चराई करने वाले",
        "अच्छी थन रचना",
        "सहनशील और अनुकूलनीय"
      ]
    },
    {
      id: "brown-swiss",
      name: "Brown Swiss",
      nameHi: "ब्राउन स्विस",
      averageWeight: "590-640",
      averageHeight: "135-145",
      lifespan: "12-15",
      nativeRegion: "Switzerland",
      nativeRegionHi: "स्विट्ज़रलैंड",
      milkCapacity: "22-28 ",
      milkCapacityHi: "22-28 लीटर/दिन",
      characteristics: [
        "Light brown to gray-brown coat",
        "Docile and quiet temperament",
        "Strong, well-formed feet and legs",
        "High protein-to-fat ratio in milk"
      ],
      characteristicsHi: [
        "हल्के भूरे से ग्रे-भूरे रंग का कोट",
        "शांत और विनम्र स्वभाव",
        "मजबूत, अच्छी तरह से गठित पैर",
        "दूध में उच्च प्रोटीन-से-वसा अनुपात"
      ]
    },
    {
      id: "hallikar",
      name: "Hallikar",
      nameHi: "हल्लीकर",
      averageWeight: "350-400",
      averageHeight: "115-125",
      lifespan: "15-20",
      nativeRegion: "Karnataka, India",
      nativeRegionHi: "कर्नाटक, भारत",
      milkCapacity: "2-4 ",
      milkCapacityHi: "2-4 लीटर/दिन",
      characteristics: [
        "Primarily a draught breed",
        "Grey or grayish-black color",
        "Long, slender, curved horns",
        "Known for strength and endurance"
      ],
      characteristicsHi: [
        "मुख्य रूप से एक मसौदा नस्ल",
        "ग्रे या ग्रे-काला रंग",
        "लंबे, पतले, घुमावदार सींग",
        "ताकत और सहनशक्ति के लिए जाना जाता है"
      ]
    },
    {
      id: "murrah",
      name: "Murrah",
      nameHi: "मुर्रा",
      averageWeight: "500-700",
      averageHeight: "130-140",
      lifespan: "12-15",
      nativeRegion: "Haryana/Punjab, India",
      nativeRegionHi: "हरियाणा/पंजाब, भारत",
      milkCapacity: "8-16 ",
      milkCapacityHi: "8-16 लीटर/दिन",
      characteristics: [
        "Jet black color",
        "Short, tightly curved horns",
        "High milk production with high fat content",
        "Docile and gentle temperament"
      ],
      characteristicsHi: [
        "जेट काला रंग",
        "छोटे, कसकर मुड़े हुए सींग",
        "उच्च वसा सामग्री के साथ उच्च दूध उत्पादन",
        "शांत और विनम्र स्वभाव"
      ]
    },
    {
      id: "krishna-valley",
      name: "Krishna Valley",
      nameHi: "कृष्णा घाटी",
      averageWeight: "350-450",
      averageHeight: "115-130",
      lifespan: "12-15",
      nativeRegion: "Karnataka, India",
      nativeRegionHi: "कर्नाटक, भारत",
      milkCapacity: "3-6 ",
      milkCapacityHi: "3-6 लीटर/दिन",
      characteristics: [
        "Heavy draft breed",
        "Grey-white color with bulging forehead",
        "Short, curved horns",
        "Fair milkers"
      ],
      characteristicsHi: [
        "भारी मसौदा नस्ल",
        "उभरे हुए माथे के साथ ग्रे-सफेद रंग",
        "छोटे, घुमावदार सींग",
        "ठीक-ठाक दूध देने वाली"
      ]
    },
    {
      id: "nagpuri",
      name: "Nagpuri",
      nameHi: "नागपुरी",
      averageWeight: "375-525",
      averageHeight: "125-135",
      lifespan: "15-20",
      nativeRegion: "Maharashtra, India",
      nativeRegionHi: "महाराष्ट्र, भारत",
      milkCapacity: "4-8 ",
      milkCapacityHi: "4-8 लीटर/दिन",
      characteristics: [
        "Dual-purpose (milk and draught)",
        "Long, flat, curved horns",
        "Well-adapted to harsh, semi-arid conditions",
        "Black color, often with white patches"
      ],
      characteristicsHi: [
        "दोहरे उद्देश्य (दूध और मसौदा)",
        "लंबे, सपाट, घुमावदार सींग",
        "कठोर, अर्ध-शुष्क परिस्थितियों के लिए अच्छी तरह से अनुकूलित",
        "काला रंग, अक्सर सफेद धब्बों के साथ"
      ]
    },
    {
      id: "guernsey",
      name: "Guernsey",
      nameHi: "गर्नजी",
      averageWeight: "450-500",
      averageHeight: "125-135",
      lifespan: "10-12",
      nativeRegion: "Isle of Guernsey",
      nativeRegionHi: "गर्नजी द्वीप",
      milkCapacity: "16-22 ",
      milkCapacityHi: "16-22 लीटर/दिन",
      characteristics: [
        "Golden-yellow milk (high beta-carotene)",
        "Fawn or red-and-white coat",
        "Docile and placid temperament",
        "Efficient converters of feed to milk"
      ],
      characteristicsHi: [
        "सुनहरा-पीला दूध (उच्च बीटा-कैरोटीन)",
        "हिरन या लाल-और-सफेद कोट",
        "शांत और विनम्र स्वभाव",
        "चारे को दूध में बदलने में कुशल"
      ]
    },
  ]
};

const adapter = new JSONFile<Data>(path.join(__dirname, '..', 'db.json'));
const db = new Low(adapter, defaultData);

// In-memory cache for breeds
let breedsCache: any[] | null = null;

export const setupDb = async () => {
  await db.read();
  breedsCache = db.data.breeds;
};

// Get breeds from cache (fast) or from db (fallback)
export const getBreeds = async () => {
  if (!breedsCache) {
    await db.read();
    breedsCache = db.data.breeds;
  }
  return breedsCache;
};

// Optionally, a function to reload breeds (e.g., after a write)
export const reloadBreeds = async () => {
  await db.read();
  breedsCache = db.data.breeds;
};

export default db;
