import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Twitter, Linkedin, MessageCircle, Link2, Check } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageContext";

interface ShareResultsProps {
  playerName: string;
  rankLabel: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
}

/**
 * Social share actions for the Cyber Escape results screen.
 * Builds a localized summary and offers X, LinkedIn, WhatsApp,
 * and copy-link targets using the native share intent / share URLs.
 */
export function ShareResults({
  playerName,
  rankLabel,
  score,
  correctAnswers,
  totalQuestions,
}: ShareResultsProps) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "https://lovable.app";
  const shareText = t("share.text", {
    name: playerName,
    rank: rankLabel,
    score: String(score),
    correct: String(correctAnswers),
    total: String(totalQuestions),
  });
  const fullText = `${shareText} ${shareUrl}`;

  const platforms: Array<{
    id: string;
    label: string;
    icon: typeof Twitter;
    href: string;
  }> = [
    {
      id: "x",
      label: "X",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodeURIComponent(fullText)}`,
    },
  ];

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "Cyber Escape", text: shareText, url: shareUrl });
        return;
      } catch {
        /* user dismissed — fall through to panel */
      }
    }
    setOpen((v) => !v);
  };

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(fullText);
      } else {
        const ta = document.createElement("textarea");
        ta.value = fullText;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      toast.success(t("share.copiedToast"));
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(t("share.copyError"));
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <Button
        onClick={handleNativeShare}
        size="lg"
        variant="outline"
        className="cyber-button font-mono border-primary/60 text-primary hover:bg-primary/10 hover:text-primary neon-text"
      >
        <Share2 className="w-4 h-4 mr-2" />
        {t("share.button")}
      </Button>

      {open && (
        <div className="flex flex-wrap items-center justify-center gap-2 animate-fade-in-up">
          {platforms.map((p) => {
            const Icon = p.icon;
            return (
              <a
                key={p.id}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("share.ariaShareOn", { platform: p.label })}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-primary/40 bg-background/60 font-mono text-xs text-foreground hover:border-primary hover:bg-primary/10 hover:text-primary transition-all duration-300 neon-border"
              >
                <Icon className="w-4 h-4" />
                {p.label}
              </a>
            );
          })}
          <button
            type="button"
            onClick={handleCopy}
            aria-label={t("share.ariaCopy")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-primary/40 bg-background/60 font-mono text-xs text-foreground hover:border-primary hover:bg-primary/10 hover:text-primary transition-all duration-300 neon-border"
          >
            {copied ? <Check className="w-4 h-4 text-primary" /> : <Link2 className="w-4 h-4" />}
            {copied ? t("share.copied") : t("share.copy")}
          </button>
        </div>
      )}
    </div>
  );
}
