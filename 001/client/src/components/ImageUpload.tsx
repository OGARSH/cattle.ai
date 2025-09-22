import React, { useState, useRef } from 'react';
import { useLanguage } from "./LanguageProvider";
import { Upload, Camera, X } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (file: File | null) => void;
  currentImage?: string;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelect,
  currentImage,
  className = ''
}) => {
  const { t } = useLanguage();
  const [dragOver, setDragOver] = useState(false);
  const [showChangeOption, setShowChangeOption] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
    // Blur the file input to ensure the file picker dialog closes if open
    if (fileInputRef.current) {
      fileInputRef.current.blur();
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const clearImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setShowChangeOption(false);
    onImageSelect(null);
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
      />

      {currentImage ? (
        // Image preview with hover options
        <div 
          className="relative group cursor-pointer"
          onMouseEnter={() => setShowChangeOption(true)}
          onMouseLeave={() => setShowChangeOption(false)}
        >
          <div className="relative overflow-hidden rounded-lg border-2 border-gray-200 hover:border-primary transition-colors">
            <img
              src={currentImage}
              alt="Uploaded preview"
              className="w-full max-h-96 object-contain bg-black transition-transform group-hover:scale-105"
            />
            
            {/* Hover overlay */}
            {showChangeOption && (
              <>
                {/* Remove button as a red cross in the top right */}
                <button
                  onClick={clearImage}
                  className="absolute top-2 right-2 z-10 bg-white bg-opacity-80 hover:bg-red-100 rounded-full p-1 transition-colors border border-red-200 shadow group"
                  title="Remove image"
                >
                  <X className="w-5 h-5 text-red-500" />
                </button>
                {/* Change image button centered as before */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity">
                  <button
                    onClick={triggerFileInput}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <Camera className="w-5 h-5" />
                    <span>{t("imageupload.changeimage")}</span>
                  </button>
                </div>
              </>
            )}
          </div>
          
          {/* Removed 'hover to change' text */}
        </div>
      ) : (
        // Upload area
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            dragOver 
              ? 'border-primary bg-primary/10' 
              : 'border-border hover:border-primary/50'
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onClick={triggerFileInput}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-muted rounded-full">
              <Upload className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <p className="text-lg font-medium text-foreground">
                {t("imageupload.dragdrop")}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("imageupload.supports")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;