import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash2, Calendar, Loader2 } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

interface HistoryRecord {
  id: string;
  createdAt: string;
  breedId: string;
  breed?: {
    name: string;
    nameHi: string;
  };
  confidence: number;
  earTagId: string | null;
  imageUrl: string | null;
}

export default function History() {
  const { language, t } = useLanguage();
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [breeds, setBreeds] = useState<Map<string, any>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load breeds first
      const breedsResponse = await fetch('/api/breeds');
      if (breedsResponse.ok) {
        const breedsData = await breedsResponse.json();
        const breedsMap = new Map();
        breedsData.forEach((breed: any) => {
          breedsMap.set(breed.id, breed);
        });
        setBreeds(breedsMap);
      }
      
      // Load history
      const historyResponse = await fetch('/api/history');
      if (historyResponse.ok) {
        const historyData = await historyResponse.json();
        setHistory(historyData);
      }
      
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === "en" ? "en-IN" : "hi-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getBreedName = (record: HistoryRecord) => {
    const breed = breeds.get(record.breedId);
    if (!breed) return "Unknown";
    return language === "en" ? breed.name : breed.nameHi;
  };

  const handleView = (record: HistoryRecord) => {
  // ...existing code...
  };

  const handleDelete = async (recordId: string) => {
    try {
      const response = await fetch(`/api/history/${recordId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setHistory(prev => prev.filter(record => record.id !== recordId));
  // ...existing code...
      } else {
        throw new Error('Failed to delete record');
      }
      
    } catch (error) {
      console.error("Error deleting record:", error);
  // ...existing code...
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {t("history.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12">
                <Loader2 className="h-8 w-8 mx-auto mb-4 animate-spin" />
                <p className="text-muted-foreground">{t("common.loading")}</p>
              </div>
            ) : history.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>{t("history.empty")}</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium text-sm">
                        {t("history.date")}
                      </th>
                      <th className="text-left py-3 px-2 font-medium text-sm">
                        {t("history.breed")}
                      </th>
                      <th className="text-left py-3 px-2 font-medium text-sm">
                        {t("history.confidence")}
                      </th>
                      <th className="text-left py-3 px-2 font-medium text-sm">
                        {t("history.eartag")}
                      </th>
                      <th className="text-left py-3 px-2 font-medium text-sm">
                        {t("history.actions")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((record) => (
                      <tr
                        key={record.id}
                        className="border-b hover:bg-muted/50 transition-colors"
                      >
                        <td className="py-4 px-2 text-sm">
                          {formatDate(record.createdAt)}
                        </td>
                        <td className="py-4 px-2">
                          <div className="font-medium">
                            {getBreedName(record)}
                          </div>
                        </td>
                        <td className="py-4 px-2">
                          <Badge variant="secondary" className="text-xs">
                            {record.confidence}%
                          </Badge>
                        </td>
                        <td className="py-4 px-2 text-sm">
                          {record.earTagId || "-"}
                        </td>
                        <td className="py-4 px-2">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleView(record)}
                              data-testid={`button-view-${record.id}`}
                            >
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">{t("history.view")}</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(record.id)}
                              data-testid={`button-delete-${record.id}`}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">{t("history.delete")}</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}