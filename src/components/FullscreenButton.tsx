import { useEffect, useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FullscreenButton() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggle = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (e) {
      console.error("Fullscreen error", e);
    }
  };

  return (
    <Button
      onClick={toggle}
      variant="outline"
      size="icon"
      aria-label={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
      title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
      className="fixed top-4 right-4 z-50 bg-background/70 backdrop-blur border-primary/50 text-primary hover:bg-primary/10 hover:text-primary neon-text"
    >
      {isFullscreen ? <Minimize2 /> : <Maximize2 />}
    </Button>
  );
}
