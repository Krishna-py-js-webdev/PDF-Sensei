"use client";

import { useState, useEffect, useRef } from "react";
import { Book, ExternalLink, FileText, Home, LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);

  // Load stored PDFs from localStorage on mount
  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem("uploadedFiles") || "[]");
    setUploadedFiles(storedFiles);
  }, []);

  // Save to localStorage whenever uploadedFiles updates
  useEffect(() => {
    localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));
  }, [uploadedFiles]);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const confirmUpload = () => {
    if (selectedFile) {
      const fileURL = URL.createObjectURL(selectedFile); // Generate a URL for the file
      setUploadedFiles((prev) => [...prev, { name: selectedFile.name, url: fileURL }]);
      setSelectedFile(null);
    }
  };

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="border-b border-border p-4 flex flex-row-reverse">
        <img src="logo.png" alt="Logo" className="h-15 w-40 relative right-5" />
        <svg xmlns="http://www.w3.org/2000/svg" className="relative top-3 right-5" width="20" height="20" viewBox="0 0 39 20" fill="none">
          <path d="M1 1H37.6604" stroke="#CDC5C5" strokeWidth="1.30909" strokeLinecap="round"/>
          <path d="M1.00269 9.83636H37.6631" stroke="#CDC5C5" strokeWidth="1.30909" strokeLinecap="round"/>
          <path d="M1.00269 19H37.6631" stroke="#CDC5C5" strokeWidth="1.30909" strokeLinecap="round"/>
        </svg>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full gap-2 flex items-center overflow-hidden relative left-3 top-3 max-w-[200px] rounded-md transition-all duration-200 hover:bg-gray-700 hover:text-white">
              <Home className="h-4 w-4 br-white" />
              <span className="inline">Home</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full gap-2 flex items-center overflow-hidden relative left-3 top-3 max-w-[200px] rounded-md transition-all duration-200 hover:bg-gray-700 hover:text-white">
              <User className="h-4 w-4" />
              <span>Personalization</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full gap-2 flex items-center overflow-hidden relative left-3 top-3 max-w-[200px] rounded-md transition-all duration-200 hover:bg-gray-700 hover:text-white">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="mt-6 px-4">
          <h2 className="mb-2 text-lg font-semibold">Uploaded PDFs</h2>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border border-border p-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm">{file.name}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-emerald-500" onClick={() => window.open(file.url, "_blank")}>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </SidebarContent>
      <SidebarFooter className="border-t border-border p-4">
        <div className="space-y-2">
          <input ref={fileInputRef} type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" />
          <Button onClick={handleUpload} variant="outline" className="w-full justify-start gap-2">
            <FileText className="h-4 w-4" />
            Add PDF
          </Button>
          {selectedFile && <p className="text-sm text-gray-400">Selected: {selectedFile.name}</p>}
          {selectedFile && (
            <Button onClick={confirmUpload} variant="outline" className="w-full justify-start gap-2">
              <FileText className="h-4 w-4" />
              Confirm Upload
            </Button>
          )}
          <Button variant="ghost" className="w-full justify-start gap-2 text-red-500 hover:text-red-600">
            <LogOut className="h-4 w-4" />
            Log out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}