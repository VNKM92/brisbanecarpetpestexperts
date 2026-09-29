"use client";

import React, { useState, useEffect } from "react";
import { X, Upload, Link as LinkIcon, Image as ImageIcon, Check } from "lucide-react";

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  currentValue?: string;
  title?: string;
}

export default function MediaPickerModal({
  isOpen,
  onClose,
  onSelect,
  currentValue = "",
  title = "Select or Upload Image",
}: MediaPickerModalProps) {
  const [activeTab, setActiveTab] = useState<"upload" | "url" | "library">("upload");
  const [customUrl, setCustomUrl] = useState(currentValue);
  const [libraryImages, setLibraryImages] = useState<any[]>([]);
  const [loadingLib, setLoadingLib] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    setCustomUrl(currentValue);
  }, [currentValue]);

  useEffect(() => {
    if (isOpen && activeTab === "library") {
      fetchLibrary();
    }
  }, [isOpen, activeTab]);

  const fetchLibrary = async () => {
    setLoadingLib(true);
    try {
      const res = await fetch("/api/admin/media");
      const data = await res.json();
      if (data.success) {
        setLibraryImages(data.data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingLib(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "branding");

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.data?.url) {
        onSelect(data.data.url);
        onClose();
      } else {
        setUploadError(data.message || "Upload failed");
      }
    } catch (err) {
      setUploadError("Network error during file upload.");
    } finally {
      setUploading(false);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrl.trim()) {
      onSelect(customUrl.trim());
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <ImageIcon className="text-emerald-400" size={18} />
            <span>{title}</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            className={`px-4 py-2 font-semibold border-b-2 transition flex items-center gap-1.5 ${
              activeTab === "upload"
                ? "border-emerald-500 text-emerald-400"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Upload size={14} />
            <span>Upload File</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("url")}
            className={`px-4 py-2 font-semibold border-b-2 transition flex items-center gap-1.5 ${
              activeTab === "url"
                ? "border-emerald-500 text-emerald-400"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <LinkIcon size={14} />
            <span>Image URL</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("library")}
            className={`px-4 py-2 font-semibold border-b-2 transition flex items-center gap-1.5 ${
              activeTab === "library"
                ? "border-emerald-500 text-emerald-400"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <ImageIcon size={14} />
            <span>Media Library</span>
          </button>
        </div>

        {/* Tab 1: Upload */}
        {activeTab === "upload" && (
          <div className="space-y-4 py-4 text-center">
            {uploadError && (
              <div className="p-2.5 bg-red-950/60 border border-red-800 text-red-300 text-xs rounded-lg">
                {uploadError}
              </div>
            )}
            <label className="border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer bg-slate-950/50 hover:bg-slate-950 transition group">
              <Upload className="text-slate-500 group-hover:text-emerald-400 mb-2 transition" size={32} />
              <span className="text-xs font-semibold text-slate-200">
                {uploading ? "Uploading Image..." : "Click to browse and upload image"}
              </span>
              <span className="text-[10px] text-slate-500 mt-1">PNG, JPG, WEBP, SVG (Max 5MB)</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>
        )}

        {/* Tab 2: URL Input */}
        {activeTab === "url" && (
          <form onSubmit={handleUrlSubmit} className="space-y-4 py-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Paste Image URL</label>
              <input
                type="text"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="https://example.com/images/logo.png"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            {customUrl && (
              <div className="p-2 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center h-28 overflow-hidden">
                <img src={customUrl} alt="Preview" className="max-h-full max-w-full object-contain" />
              </div>
            )}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg"
              >
                Use This URL
              </button>
            </div>
          </form>
        )}

        {/* Tab 3: Media Library */}
        {activeTab === "library" && (
          <div className="space-y-4 py-2 max-h-72 overflow-y-auto custom-scrollbar">
            {loadingLib ? (
              <p className="text-xs text-slate-500 text-center py-8">Loading media library...</p>
            ) : libraryImages.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-8">No images found in library.</p>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {libraryImages.map((img) => (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => {
                      onSelect(img.url);
                      onClose();
                    }}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition group bg-slate-950 ${
                      currentValue === img.url ? "border-emerald-500 ring-2 ring-emerald-500/50" : "border-slate-800 hover:border-slate-600"
                    }`}
                  >
                    <img src={img.url} alt={img.filename} className="w-full h-full object-cover" />
                    {currentValue === img.url && (
                      <div className="absolute inset-0 bg-emerald-950/60 flex items-center justify-center text-white">
                        <Check size={20} className="text-emerald-400" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
