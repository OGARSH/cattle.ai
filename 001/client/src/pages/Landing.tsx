import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Users } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/Indian_cattle_pastoral_landscape_5aca80ee.png";

export default function Landing() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Camera,
      title: "AI Breed Recognition",
      description: "Instantly identify Indian cattle and buffalo breeds using advanced AI technology"
    },
    {
      icon: Users,
      title: "Field Worker Focused",
      description: "Designed specifically for agricultural field workers with an easy-to-use interface"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${heroImage})`,
          }}
        />
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
            {t("hero.title")}
          </h1>
          
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-200">
            {t("hero.subtitle")}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
              >
                Get Started
              </Button>
            </Link>
            
            <Link href="/#features">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-3"
              >
                {t("hero.learn")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features for Field Workers
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to identify, track, and manage cattle and buffalo breed recognition in the field.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover-elevate">
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

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Identifying Breeds?
          </h2>
          <Link href="/">
            <Button
              size="lg"
              className="px-8 py-3"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
