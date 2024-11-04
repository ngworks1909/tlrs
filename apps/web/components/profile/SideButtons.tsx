"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";

const settingsSections = [
  { id: "account", name: "Account" },
  { id: "appearance", name: "Appearance" },
  { id: "password", name: "Password" },
];

export default function SideButtons() {
  const [activeSection, setActiveSection] = useState("account");
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(sectionId);
  };
  return (
      <div className="md:w-1/4 shrink-0">
        <div className="sticky top-60">
        <nav className="space-y-2">
          {settingsSections.map((section) => (
            <Button
              key={section.id}
              variant={section.id === activeSection ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => scrollToSection(section.id)}
            >
              {section.name}
            </Button>
          ))}
          </nav>
        </div>
      </div>
  );
}
