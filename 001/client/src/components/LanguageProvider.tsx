// ...existing code...
// ...existing code...
// ...existing code...
import { createContext, useContext, useState } from "react";

type Language = "en" | "hi";

type LanguageProviderProps = {
  children: React.ReactNode;
  defaultLanguage?: Language;
};

type LanguageProviderState = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const translations = {
  en: {
  // Header
  // Features Section Title & Subtitle
  "features.section.title": "Powerful Features for Field Workers",
  "features.section.subtitle": "Everything you need to identify, track, and manage cattle and buffalo breed recognition in the field.",
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.contact": "Contact",
    "nav.history": "History",
    "nav.login": "Login",
    "nav.logout": "Logout",
    
  // Image Upload
  "imageupload.dragdrop": "Drop an image here or click to browse",
  "imageupload.supports": "Supports: JPG, PNG, GIF (max 10MB)",
  "imageupload.changeimage": "Change Image",
  // Hero
    "hero.title": "AI-Powered Cattle & Buffalo Breed Recognition",
    "hero.subtitle": "Instantly identify Indian cattle and buffalo breeds with comprehensive breed information for field workers",
    "hero.cta": "Start Recognition",
    "hero.learn": "Learn More",
    
    // Recognition
    "recognition.title": "Upload Cattle/Buffalo Image",
    "recognition.dragdrop": "Drag and drop an image here, or click to select",
    "recognition.formats": "Supports JPG, PNG, WebP formats",
    "recognition.analyzing": "Analyzing image...",
    "recognition.results": "Recognition Results",
    "recognition.confidence": "Confidence",
    "recognition.eartag": "Ear Tag ID",
    "recognition.eartag.placeholder": "Enter ear tag ID (optional)",
    
    // Breed Info
    "breed.name": "Breed Name",
    "breed.lifespan": "Life Span",
    "breed.weight": "Average Weight",
    "breed.height": "Average Height",
    "breed.milk": "Milk Capacity",
    "breed.origin": "Origin",
    "breed.characteristics": "Characteristics",
    "breed.years": "years",
    "breed.kg": "kg",
    "breed.cm": "cm",
    "breed.liters": "liters/day",
    
  // Features
  "features.ai.title": "AI Breed Recognition",
  "features.ai.desc": "Instantly identify Indian cattle and buffalo breeds using advanced AI technology",
  "features.worker.title": "Field Worker Focused",
  "features.worker.desc": "Designed specifically for agricultural field workers with an easy-to-use interface",
  "features.history.title": "Track Recognition History",
  "features.history.desc": "Keep detailed records of all breed identifications.",
  "features.secure.title": "Secure & Reliable",
  "features.secure.desc": "Built with robust and reliable architecture for dependable operations.",
  "features.login.title": "Login/Sign up Feature",
  "features.login.desc": "Access your account from multiple devices and sync your data seamlessly.",
  "features.more.title": "Many More Features",
  "features.more.desc": "Live camera capture, more language options, and other exciting features are planned.",
  "features.beta": "Note: Currently under beta testing.",
    "about.title": "About Our Team",
    "about.description": "Our dedicated team of computer science students collaborated to create this innovative AI-powered breed recognition system for Indian field workers.",
    "about.collaboration": "Through intensive research and development, we combined expertise in artificial intelligence, web development, and agricultural technology to build a solution that bridges the gap between modern technology and traditional farming practices.",
    
  // Contact
  // Contact Form Section
  "contact.sendmessage": "Send us a Message",
  "contact.formdesc": "Fill out the form below and we'll get back to you as soon as possible.",
  "contact.title": "Contact Us",
  "contact.description": "Get in touch with our team for support or inquiries about the cattle breed recognition system.",
  "contact.name": "Full Name",
  "contact.email": "Email Address",
  "contact.subject": "Subject",
  "contact.message": "Message",
  "contact.send": "Send Message",
  // Contact Info Section
  "contact.getintouch": "Get in Touch",
  "contact.projectsupport": "Project Support",
  "contact.projectsupportdesc": "For technical support and questions about the cattle breed recognition system.",
  "contact.collaboration": "Collaboration",
  "contact.collaborationdesc": "Interested in contributing to agricultural technology? We'd love to hear from you.",
  "contact.research": "Research Inquiries",
  "contact.researchdesc": "For academic research and data partnership opportunities.",
  "contact.responsetime": "Response Time",
  "contact.responsetimedesc": "We typically respond to inquiries within 24-48 hours during business days.",
  "contact.bestpractices": "Best Practices",
  "contact.bestpractices1": "Include detailed descriptions for technical issues",
  "contact.bestpractices2": "Attach relevant images when reporting problems",
  "contact.bestpractices3": "Specify your device and browser information",
    
    // History
    "history.title": "Recognition History",
    "history.date": "Date",
    "history.breed": "Breed",
    "history.confidence": "Confidence",
    "history.eartag": "Ear Tag",
    "history.actions": "Actions",
    "history.view": "View",
    "history.delete": "Delete",
    "history.empty": "No recognition history found",
    
    // Footer
    "footer.copyright": "© 2025 Meowiger. Built with code and vision.",
    
    // Common
    "common.loading": "Loading...",
    "common.error": "An error occurred",
    "common.success": "Success",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.edit": "Edit",
    "common.delete": "Delete",
  },
  hi: {
  // Header
  // Features Section Title & Subtitle
  "features.section.title": "फील्ड वर्कर्स के लिए शक्तिशाली सुविधाएँ",
  "features.section.subtitle": "क्षेत्र में मवेशी और भैंस नस्ल पहचान के लिए आवश्यक सभी सुविधाएँ—पहचान, ट्रैकिंग और प्रबंधन—एक ही स्थान पर।",
    "nav.home": "होम",
    "nav.about": "हमारे बारे में",
    "nav.contact": "संपर्क",
    "nav.history": "इतिहास",
    "nav.login": "लॉगिन",
    "nav.logout": "लॉगआउट",
    
  // Image Upload
  "imageupload.dragdrop": "यहाँ छवि छोड़ें या ब्राउज़ करने के लिए क्लिक करें",
  "imageupload.supports": "समर्थित: JPG, PNG, GIF (अधिकतम 10MB)",
  "imageupload.changeimage": "छवि बदलें",
  // Hero
    "hero.title": "AI-संचालित मवेशी और भैंस नस्ल पहचान",
    "hero.subtitle": "क्षेत्रीय कर्मचारियों के लिए व्यापक नस्ल जानकारी के साथ भारतीय मवेशी और भैंस नस्लों की तुरंत पहचान करें",
    "hero.cta": "पहचान शुरू करें",
    "hero.learn": "और जानें",
    
    // Recognition
    "recognition.title": "मवेशी/भैंस की छवि अपलोड करें",
    "recognition.dragdrop": "यहाँ एक छवि खींचें और छोड़ें, या चुनने के लिए क्लिक करें",
    "recognition.formats": "JPG, PNG, WebP प्रारूपों का समर्थन करता है",
    "recognition.analyzing": "छवि का विश्लेषण कर रहे हैं...",
    "recognition.results": "पहचान परिणाम",
    "recognition.confidence": "विश्वास",
    "recognition.eartag": "कान टैग ID",
    "recognition.eartag.placeholder": "कान टैग ID दर्ज करें (वैकल्पिक)",
    
    // Breed Info
    "breed.name": "नस्ल का नाम",
    "breed.lifespan": "जीवन काल",
    "breed.weight": "औसत वजन",
    "breed.height": "औसत ऊंचाई",
    "breed.milk": "दूध की क्षमता",
    "breed.origin": "मूल",
    "breed.characteristics": "विशेषताएं",
    "breed.years": "वर्ष",
    "breed.kg": "किग्रा",
    "breed.cm": "सेमी",
    "breed.liters": "लीटर/दिन",
    
  // Features
  "features.ai.title": "एआई नस्ल पहचान",
  "features.ai.desc": "एडवांस्ड एआई तकनीक का उपयोग करके भारतीय मवेशी और भैंस नस्लों की तुरंत पहचान करें",
  "features.worker.title": "फील्ड वर्कर केंद्रित",
  "features.worker.desc": "कृषि क्षेत्र के कर्मचारियों के लिए विशेष रूप से डिज़ाइन किया गया आसान इंटरफ़ेस",
  "features.history.title": "पहचान इतिहास ट्रैक करें",
  "features.history.desc": "सभी नस्ल पहचान का विस्तृत रिकॉर्ड रखें।",
  "features.secure.title": "सुरक्षित और विश्वसनीय",
  "features.secure.desc": "विश्वसनीय संचालन के लिए मजबूत और सुरक्षित आर्किटेक्चर के साथ निर्मित।",
  "features.login.title": "लॉगिन/साइन अप सुविधा",
  "features.login.desc": "अपने खाते को कई डिवाइस से एक्सेस करें और अपने डेटा को आसानी से सिंक करें।",
  "features.more.title": "और भी कई सुविधाएँ",
  "features.more.desc": "लाइव कैमरा स्कैन, अधिक भाषा विकल्प, और अन्य रोमांचक सुविधाएँ जल्द आ रही हैं।",
  "features.beta": "नोट: वर्तमान में केवल बीटा मॉडल में उपलब्ध है",
    "about.title": "हमारी टीम के बारे में",
    "about.description": "कंप्यूटर साइंस के छात्रों की हमारी समर्पित टीम ने भारतीय क्षेत्रीय कर्मचारियों के लिए इस नवाचार AI-संचालित नस्ल पहचान प्रणाली को बनाने के लिए सहयोग किया।",
    "about.collaboration": "गहन अनुसंधान और विकास के माध्यम से, हमने आर्टिफिशियल इंटेलिजेंस, वेब डेवलपमेंट, और कृषि प्रौद्योगिकी में विशेषज्ञता को मिलाकर एक समाधान बनाया है जो आधुनिक तकनीक और पारंपरिक खेती प्रथाओं के बीच की खाई को पाटता है।",
    
  // Contact
  // Contact Form Section
  "contact.sendmessage": "हमें संदेश भेजें",
  "contact.formdesc": "नीचे दिया गया फॉर्म भरें और हम जल्द से जल्द आपसे संपर्क करेंगे।",
  "contact.title": "हमसे संपर्क करें",
  "contact.description": "मवेशी नस्ल पहचान प्रणाली के लिए समर्थन या पूछताछ के लिए हमारी टीम से संपर्क करें।",
  "contact.name": "पूरा नाम",
  "contact.email": "ईमेल पता",
  "contact.subject": "विषय",
  "contact.message": "संदेश",
  "contact.send": "संदेश भेजें",
  // Contact Info Section
  "contact.getintouch": "संपर्क करें",
  "contact.projectsupport": "परियोजना सहायता",
  "contact.projectsupportdesc": "मवेशी नस्ल पहचान प्रणाली के लिए तकनीकी सहायता और प्रश्नों के लिए।",
  "contact.collaboration": "सहयोग",
  "contact.collaborationdesc": "क्या आप कृषि तकनीक में योगदान देने के इच्छुक हैं? हम आपसे सुनना चाहेंगे।",
  "contact.research": "अनुसंधान पूछताछ",
  "contact.researchdesc": "शैक्षणिक अनुसंधान और डेटा साझेदारी के अवसरों के लिए।",
  "contact.responsetime": "प्रतिक्रिया समय",
  "contact.responsetimedesc": "हम आमतौर पर कार्यदिवसों के दौरान 24-48 घंटों के भीतर उत्तर देते हैं।",
  "contact.bestpractices": "सर्वोत्तम अभ्यास",
  "contact.bestpractices1": "तकनीकी समस्याओं के लिए विस्तृत विवरण शामिल करें",
  "contact.bestpractices2": "समस्या रिपोर्ट करते समय संबंधित छवियाँ संलग्न करें",
  "contact.bestpractices3": "अपने डिवाइस और ब्राउज़र की जानकारी निर्दिष्ट करें",
    
    // History
    "history.title": "पहचान इतिहास",
    "history.date": "दिनांक",
    "history.breed": "नस्ल",
    "history.confidence": "विश्वास",
    "history.eartag": "कान टैग",
    "history.actions": "क्रियाएं",
    "history.view": "देखें",
    "history.delete": "हटाएं",
    "history.empty": "कोई पहचान इतिहास नहीं मिला",
    
    // Footer
    "footer.copyright": "© 2025 मेओविगर। कोड और दृष्टि के साथ निर्मित।",
    
    // Common
    "common.loading": "लोड हो रहा है...",
    "common.error": "एक त्रुटि हुई",
    "common.success": "सफलता",
    "common.cancel": "रद्द करें",
    "common.save": "सहेजें",
    "common.edit": "संपादित करें",
    "common.delete": "हटाएं",
  },
};

const initialState: LanguageProviderState = {
  language: "en",
  setLanguage: () => null,
  t: () => "",
};

const LanguageProviderContext = createContext<LanguageProviderState>(initialState);

export function LanguageProvider({
  children,
  defaultLanguage = "en",
}: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations["en"]] || key;
  };

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageProviderContext.Provider value={value}>
      {children}
    </LanguageProviderContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext);

  if (context === undefined)
    throw new Error("useLanguage must be used within a LanguageProvider");

  return context;
};