
import { Link } from "wouter";
import { useLanguage } from "./LanguageProvider";


export default function Footer() {
  const { t } = useLanguage();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact Us" },
  ];

  return (
    <footer className="border-t-4 border-gradient-to-r from-primary to-green-600 bg-background/90 backdrop-blur-md py-8 shadow-inner">
      <div className="container mx-auto px-4 text-muted-foreground">
        <div className="flex items-center mb-4 flex-wrap gap-4 justify-center">
          {/* Meowiger Logo and Text - Left Aligned */}
          <Link href="/" className="flex items-center space-x-2 w-fit group">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="text-primary-foreground font-bold text-xl">M</span>
            </div>
            <span className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">Meowiger</span>
          </Link>

          {/* Navigation Links - Centered */}
          <div className="flex space-x-4 mx-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="text-sm font-semibold tracking-wide uppercase hover:text-primary hover:underline underline-offset-4 transition-colors duration-150 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-sm text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        {/* Copyright text - Right-aligned below the logo/nav line */}
        <div className="text-right mt-2">
          <p className="text-xs text-muted-foreground/80">
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
