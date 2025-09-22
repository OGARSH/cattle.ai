import { Button } from "@/components/ui/button";
import { useLanguage } from "./LanguageProvider";
import heroImage from "@assets/generated_images/Indian_cattle_pastoral_landscape_5aca80ee.png";

export default function Hero() {
  const { t } = useLanguage();

  const handleStartRecognition = () => {
  // ...existing code...
    // Scroll to the end of the page
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  };

  const handleLearnMore = () => {
  // ...existing code...
    // Scroll to the Powerful Features section
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with animated gradient overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(120deg, rgba(20, 20, 20, 0.55) 0%, rgba(34, 70, 45, 0.35) 50%, rgba(30, 30, 30, 0.65) 100%), url(${heroImage})`,
          animation: 'gradientMove 10s ease-in-out infinite',
        }}
      />
      {/* Vignette overlay for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      {/* Content with animated headline */}
      <div className="relative z-10 container mx-auto px-4 text-center flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 mx-auto leading-tight drop-shadow-2xl text-white animate-slide-in-down">
          {t("hero.title")}
        </h1>
        <p className="text-lg md:text-xl mb-8 mx-auto text-gray-100/90 font-medium animate-fade-in">
          {t("hero.subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="sm"
            onClick={handleStartRecognition}
            data-testid="button-start-recognition"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-2 text-base transition-all duration-200 focus:ring-4 focus:ring-primary/30 focus:outline-none scale-100 hover:scale-105 shadow-md border border-primary"
          >
            <span className="inline-flex items-center gap-2">
              <span role="img" aria-label="cow" className="text-xl animate-bounce-cow">🐄</span>
      <style>{`
        @keyframes bounce-cow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-cow {
          animation: bounce-cow 1s infinite;
          display: inline-block;
        }
      `}</style>
              {t("hero.cta")}
            </span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleLearnMore}
            data-testid="button-learn-more"
            className="border-white/30 text-white bg-white/20 hover:bg-white/30 hover:text-primary-foreground/90 px-5 py-2 text-base transition-all duration-200 focus:ring-4 focus:ring-white/30 focus:outline-none scale-100 hover:scale-105 backdrop-blur-sm"
          >
            <span className="inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              {t("hero.learn")}
            </span>
          </Button>
        </div>
      </div>
      {/* Keyframes for animation */}
      <style>{`
        @keyframes gradientMove {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-slide-in-down {
          animation: slideInDown 1s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        @keyframes slideInDown {
          0% { opacity: 0; transform: translateY(-40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}