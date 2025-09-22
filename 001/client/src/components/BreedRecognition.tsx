import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Camera, Loader2, Languages } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import ImageUpload from "./ImageUpload";

interface BreedResult {
  name: string;
  nameHi: string;
  confidence: number;
  lifespan: string;
  weight: string;
  height: string;
  milkCapacity: string;
  origin: string;
  originHi: string;
  characteristics: string[];
  characteristicsHi: string[];
}

// ...existing code...
const mockBreedData: BreedResult = {
  name: "Gir",
  nameHi: "गिर",
  confidence: 94.5,
  lifespan: "12-15",
  weight: "385-400",
  height: "130-135",
  milkCapacity: "10-12",
  origin: "Gujarat, India",
  originHi: "गुजरात, भारत",
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
};

export default function BreedRecognition() {
  const { language, setLanguage, t } = useLanguage();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<BreedResult | null>(null);
  const [earTagId, setEarTagId] = useState("");
  const [showLanguageToggle, setShowLanguageToggle] = useState(false);

  const handleFileSelect = useCallback((file: File | null) => {
    if (file) {
      setSelectedFile(file);
      setResult(null);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
      setResult(null);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const analyzeImage = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setResult(null);
  // ...existing code...

    try {
      // Step 1: Get prediction from Roboflow via our backend
      const formData = new FormData();
      formData.append('image', selectedFile);

      const predictResponse = await fetch('/api/predict', {
        method: 'POST',
        body: formData,
      });

      if (!predictResponse.ok) {
        const errorData = await predictResponse.json();
        throw new Error(errorData.message || 'Failed to analyze image');
      }

      const prediction = await predictResponse.json();
      const { breed: breedName, confidence } = prediction;

      if (!breedName) {
        throw new Error('Breed could not be identified.');
      }

      // Step 2: Get detailed breed information from our backend
      const breedInfoResponse = await fetch(`/api/breed/${breedName}`);
      if (!breedInfoResponse.ok) {
        throw new Error(`Could not fetch details for breed: ${breedName}`);
      }
      const breedInfo = await breedInfoResponse.json();

      // Step 3: Combine prediction and breed info
      const finalResult: BreedResult = {
        name: breedInfo.name,
        nameHi: breedInfo.nameHi,
        confidence: parseFloat((confidence * 100).toFixed(2)),
        lifespan: breedInfo.lifespan,
        weight: breedInfo.averageWeight, // Note: field name correction from db.json
        height: breedInfo.averageHeight, // Note: field name correction from db.json
        milkCapacity: breedInfo.milkCapacity,
        origin: breedInfo.nativeRegion,
        originHi: breedInfo.nativeRegionHi,
        characteristics: breedInfo.characteristics,
        characteristicsHi: breedInfo.characteristicsHi,
      };

      setResult(finalResult);
      setShowLanguageToggle(true);

      // Store breed ID for saving record
      (finalResult as any).breedId = breedInfo.id; // Assuming the breed object has an id

    } catch (error) {
      console.error("Error analyzing image:", error);
  // ...existing code...
    } finally {
      setIsAnalyzing(false);
    }
  };

  const saveRecord = async () => {
    if (!result) return;
    
    try {
      const recordData = {
        breedId: (result as any).breedId,
        confidence: result.confidence,
        earTagId: earTagId || null,
        // For now, no user authentication, so userId is null
        userId: null,
  imageUrl: null
      };
      
      const response = await fetch('/api/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recordData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save record');
      }
      
  // ...existing code...
      
    } catch (error) {
      console.error("Error saving record:", error);
  // ...existing code...
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              {t("recognition.title")}
            </CardTitle>
            <CardDescription>
              {t("recognition.formats")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ImageUpload
              onImageSelect={handleFileSelect}
              currentImage={previewUrl || undefined}
              className="mb-6"
            />
            
            {selectedFile && (
              <Button
                onClick={analyzeImage}
                disabled={isAnalyzing}
                data-testid="button-analyze"
                className="w-full sm:w-auto"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("recognition.analyzing")}
                  </>
                ) : (
                  <>
                    <Camera className="mr-2 h-4 w-4" />
                    {t("hero.cta")}
                  </>
                )}
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Ear Tag Input */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <label htmlFor="ear-tag" className="text-sm font-medium">
                {t("recognition.eartag")}
              </label>
              <Input
                id="ear-tag"
                value={earTagId}
                onChange={(e) => setEarTagId(e.target.value)}
                placeholder={t("recognition.eartag.placeholder")}
                data-testid="input-ear-tag"
              />
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {result && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-sm">
                    {t("recognition.confidence")}: {result.confidence}%
                  </Badge>
                  {t("recognition.results")}
                </CardTitle>
                
                {showLanguageToggle && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setLanguage(language === "en" ? "hi" : "en")}
                    data-testid="button-breed-language-toggle"
                  >
                    <Languages className="h-4 w-4 mr-2" />
                    {language === "en" ? "हिंदी" : "English"}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      {language === "en" ? result.name : result.nameHi}
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">{t("breed.lifespan")}:</span>
                      <p>{result.lifespan} {t("breed.years")}</p>
                    </div>
                    <div>
                      <span className="font-medium">{t("breed.weight")}:</span>
                      <p>{result.weight} {t("breed.kg")}</p>
                    </div>
                    <div>
                      <span className="font-medium">{t("breed.height")}:</span>
                      <p>{result.height} {t("breed.cm")}</p>
                    </div>
                    <div>
                      <span className="font-medium">{t("breed.milk")}:</span>
                      <p>{result.milkCapacity} {t("breed.liters")}</p>
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">{t("breed.origin")}:</span>
                    <p>{language === "en" ? result.origin : result.originHi}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">{t("breed.characteristics")}:</h4>
                  <ul className="space-y-1 text-sm">
                    {((language === "en" ? result.characteristics : result.characteristicsHi) || []).map((char, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        {char}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 flex gap-4">
                <Button
                  onClick={saveRecord}
                  data-testid="button-save-record"
                  className="transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
                >
                  {t("common.save")}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}