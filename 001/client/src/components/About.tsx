import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Linkedin } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

interface TeamMember {
  name: string;
  course: string;
  age: number;
  role?: string;
  contribution: string;
  contributionHi: string;
  image?: string;
  linkedin?: string;
}


const teamMembers: TeamMember[] = [
  {
    name: "Ayush Singh",
    course: "BCA",
    age: 19,
    role: "Team Leader",
    contribution: "Led project architecture and AI integration",
    contributionHi: "प्रोजेक्ट आर्किटेक्चर और AI एकीकरण का नेतृत्व किया",
    image: "/team/silver002.jpg",
  linkedin: "https://www.linkedin.com/in/ayushopbolte001/"
  },
  {
    name: "Vidhi kasliwal",
    course: "BCA",
    age: 18,
    role: "Frontend Developer",
    contribution: "Frontend development and user interface design",
    contributionHi: "फ्रंटएंड डेवलपमेंट और यूजर इंटरफेस डिज़ाइन",
    image: "/team/vidhi.jpg",
    linkedin: "https://www.linkedin.com/in/vidhi-kasliwal-479942381/" // Placeholder
  },
  {
    name: "Vedratan Sharma",
    course: "BCA",
    age: 20,
    role: "Technical Support",
    contribution: "Provided technical assistance and support throughout the development process, helping to resolve issues and ensure the project stayed on track.",
    contributionHi: "विकास प्रक्रिया के दौरान तकनीकी सहायता और समर्थन प्रदान किया, मुद्दों को हल करने और यह सुनिश्चित करने में मदद की कि परियोजना पटरी पर बनी रहे।",
    image: "/team/vedratan.jpg",
    linkedin: "https://www.linkedin.com/in/vedratan-sharma/" // Placeholder
  },
  {
    name: "Saniya Rawat",
    course: "BCA",
    age: 18,
    role: "UI/UX Designer",
    contribution: "Responsible for the frontend structure and styling using HTML and CSS.",
    contributionHi: "एचटीएमएल और सीएसएस का उपयोग करके फ्रंटएंड संरचना और स्टाइलिंग के लिए जिम्मेदार।",
    image: "/team/saniya.jpg",
    linkedin: "https://www.linkedin.com/in/saniya-rawat-54bb38352/" // Placeholder
  },
  {
    name: "Arshpreet Sharma",
    course: "BCA",
    age: 18,
    role: "Backend Dev & Database Management",
    contribution: "Backend development and database management",
    contributionHi: "बैकएंड डेवलपमेंट और डेटाबेस प्रबंधन",
    image: "/team/arshpreet.jpg",
    linkedin: "https://www.linkedin.com/in/arshpreet-sharma/" // Placeholder
  },
  {
    name: "Jiya Singh",
    course: "BCA",
    age: 18,
    role: "Beta Tester",
    contribution: "Testing, quality assurance and deployment",
    contributionHi: "टेस्टिंग, गुणवत्ता आश्वासन और डिप्लॉयमेंट",
    image: "/team/jiya.jpg",
    linkedin: "https://www.linkedin.com/in/jiya-singh-465200374/" // Placeholder
  }
];

export default function About() {
  const { language, t } = useLanguage();

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-primary underline underline-offset-8 decoration-4">
            {t("about.title")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t("about.description")}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:border-primary/40"
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  {/* Profile Image Placeholder */}
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback className="text-lg font-semibold">
                      {getInitials(member.name)}
                    </AvatarFallback>
                  </Avatar>

                  {/* Member Info */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">
                      {member.name}
                      {member.role && (
                        <span className="text-sm text-primary font-normal block">
                          [{member.role}]
                        </span>
                      )}
                    </h3>
                    
                    <div className="text-sm text-muted-foreground">
                      <p>{member.course} • Age {member.age}</p>
                      {member.linkedin && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-blue-600 hover:text-blue-800 mt-1"
                              >
                                <Linkedin className="h-4 w-4" />
                              </a>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>LinkedIn Profile</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </div>

                  {/* Contribution */}
                  <div className="text-sm text-center">
                    <p className="text-muted-foreground">
                      {language === "en" ? member.contribution : member.contributionHi}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Collaboration Description */}
  <Card className="border border-card-border bg-card shadow-sm transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:border-primary/40">
          <CardContent className="p-8 flex flex-col items-center text-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-accent text-accent-foreground mb-2 shadow">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 7v9m-7-7h14" /></svg>
            </div>
            <h2 className="text-2xl font-bold text-card-foreground">Our Collaboration</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-base">
              <span className="font-semibold text-card-foreground">Through intensive research and development</span>, we combined expertise in <span className="text-primary font-medium">artificial intelligence</span>, <span className="text-primary font-medium">web development</span>, and <span className="text-primary font-medium">agricultural technology</span> to build a solution that bridges the gap between modern technology and traditional farming practices.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}