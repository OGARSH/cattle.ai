import Hero from "@/components/Hero";
import BreedRecognition from "@/components/BreedRecognition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Users, History, Shield, LogIn, PlusCircle } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function Home() {
  const { t } = useLanguage();
  const [location] = useLocation();

  useEffect(() => {
    if (location.hash === "#features") {
      // Add a small delay to ensure the element is rendered
      setTimeout(() => {
        document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  const features = [
    {
      icon: Camera,
      title: t("features.ai.title"),
      description: t("features.ai.desc")
    },
    {
      icon: Users,
      title: t("features.worker.title"),
      description: t("features.worker.desc")
    },
    {
      icon: History,
      title: t("features.history.title"),
      description: <>{t("features.history.desc")} <span className="font-semibold text-yellow-500">({t("features.beta")})</span></>
    },
    {
      icon: Shield,
      title: t("features.secure.title"),
      description: t("features.secure.desc")
    },
    {
      icon: LogIn,
      title: t("features.login.title"),
      description: <>{t("features.login.desc")} <span className="font-semibold text-yellow-500">({t("features.beta")})</span></>
    },
    {
      icon: PlusCircle,
      title: t("features.more.title"),
      description: t("features.more.desc")
    }
  ];

  return (
    <div className="min-h-screen">
      <Hero />

      {/* Features Section - New Section */}
      <section id="features" className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary drop-shadow-sm">
              {t("features.section.title")}
            </h2>
            <p className="text-lg text-muted-foreground max_w_2xl mx-auto">
              {t("features.section.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:border-primary/40"
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <BreedRecognition />
    </div>
  );
}