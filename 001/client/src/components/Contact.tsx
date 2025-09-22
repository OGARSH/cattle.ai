import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageSquare, Send } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(form.subject);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.location.href = `mailto:ayushsingh2262@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-primary drop-shadow-sm underline underline-offset-8 decoration-4">
            {t("contact.title")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("contact.description")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                {t("contact.sendmessage")}
              </CardTitle>
              <CardDescription>
                {t("contact.formdesc")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      {t("contact.name")}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      required
                      data-testid="input-contact-name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      {t("contact.email")}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleInputChange}
                      required
                      data-testid="input-contact-email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    {t("contact.subject")}
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleInputChange}
                    required
                    data-testid="input-contact-subject"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    {t("contact.message")}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleInputChange}
                    rows={6}
                    required
                    data-testid="textarea-contact-message"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  data-testid="button-send-message"
                >
                  <Send className="mr-2 h-4 w-4" />
                  {t("contact.send")}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  {t("contact.getintouch")}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-accent transition">
                  <Mail className="h-7 w-7 mb-2 text-primary" />
                  <h3 className="font-semibold mb-1 text-card-foreground">{t("contact.projectsupport")}</h3>
                  <p className="text-sm text-muted-foreground">{t("contact.projectsupportdesc")}</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-accent transition">
                  <Send className="h-7 w-7 mb-2 text-primary" />
                  <h3 className="font-semibold mb-1 text-card-foreground">{t("contact.collaboration")}</h3>
                  <p className="text-sm text-muted-foreground">{t("contact.collaborationdesc")}</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-accent transition">
                  <MessageSquare className="h-7 w-7 mb-2 text-primary" />
                  <h3 className="font-semibold mb-1 text-card-foreground">{t("contact.research")}</h3>
                  <p className="text-sm text-muted-foreground">{t("contact.researchdesc")}</p>
                </div>
              </CardContent>
              <div className="border-t my-2 mx-6" />
              <CardContent className="flex flex-col md:flex-row gap-8 pt-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-block bg-accent text-accent-foreground rounded-full px-2 py-0.5 text-xs font-semibold">{t("contact.responsetime")}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{t("contact.responsetimedesc")}</p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-block bg-accent text-accent-foreground rounded-full px-2 py-0.5 text-xs font-semibold">{t("contact.bestpractices")}</span>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-2 list-none pl-0">
                    <li className="flex items-start gap-2"><span className="mt-1 text-primary">✔</span> {t("contact.bestpractices1")}</li>
                    <li className="flex items-start gap-2"><span className="mt-1 text-primary">✔</span> {t("contact.bestpractices2")}</li>
                    <li className="flex items-start gap-2"><span className="mt-1 text-primary">✔</span> {t("contact.bestpractices3")}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}