import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShieldAlert, ShieldCheck, RotateCcw, Award, Trophy, Flame, Heart, Skull, FileDown } from "lucide-react";
import type { Character, TravelDetails } from "@/data/characters";
import jsPDF from "jspdf";
import pdfBgCyber from "@/assets/pdf-bg-cyber.jpg";

export interface FeedbackEntry {
  question: string;
  isCorrect: boolean;
  timedOut: boolean;
  tip: string;
  points: number;
}

interface GameResultProps {
  correctAnswers: number;
  totalQuestions: number;
  onRestart: () => void;
  character: Character;
  playerName: string;
  travelDetails: TravelDetails;
  score: number;
  bestCombo: number;
  livesLeft: number;
  timeouts: number;
  feedbackLog: FeedbackEntry[];
  gameOver: boolean;
}

export function GameResult({ correctAnswers, totalQuestions, onRestart, character, playerName, travelDetails, score, bestCombo, livesLeft, timeouts, feedbackLog, gameOver }: GameResultProps) {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const name = playerName;

  const getRank = () => {
    if (score >= 1500) return { label: "ÉLITE CYBER", color: "text-primary" };
    if (score >= 900) return { label: "EXPERTO", color: "text-secondary" };
    if (score >= 400) return { label: "AGENTE", color: "text-yellow-500" };
    return { label: "NOVATO", color: "text-destructive" };
  };

  const getResult = () => {
    if (gameOver) {
      return {
        title: "SISTEMA COMPROMETIDO",
        icon: Skull,
        message: `${name} (${travelDetails.role} en ${travelDetails.company}) perdió todos sus escudos durante el viaje a ${travelDetails.destination}. La misión fue interrumpida por exponer información sensible.`,
        color: "text-destructive",
        bgColor: "bg-destructive/10",
        borderColor: "border-destructive/50",
      };
    }
    if (percentage >= 70) {
      return {
        title: "MISIÓN COMPLETADA",
        icon: ShieldCheck,
        message: `${name} (${travelDetails.role} en ${travelDetails.company}) completó el viaje a ${travelDetails.destination} manteniendo protegidos sus datos y dispositivos.`,
        color: "text-primary",
        bgColor: "bg-primary/10",
        borderColor: "border-primary/50",
      };
    } else if (percentage >= 50) {
      return {
        title: "MISIÓN EN RIESGO",
        icon: ShieldAlert,
        message: `${name} (${travelDetails.role} en ${travelDetails.company}) logró completar el viaje a ${travelDetails.destination}, pero algunas decisiones aumentaron el nivel de riesgo.`,
        color: "text-yellow-500",
        bgColor: "bg-yellow-500/10",
        borderColor: "border-yellow-500/50",
      };
    } else {
      return {
        title: "SISTEMA COMPROMETIDO",
        icon: ShieldAlert,
        message: `${name} (${travelDetails.role} en ${travelDetails.company}) expuso información sensible durante el viaje a ${travelDetails.destination}.`,
        color: "text-destructive",
        bgColor: "bg-destructive/10",
        borderColor: "border-destructive/50",
      };
    }
  };

  const rank = getRank();

  const result = getResult();
  const ResultIcon = result.icon;
  const incorrectAnswers = Math.max(0, feedbackLog.filter((f) => !f.isCorrect && !f.timedOut).length);
  const riskLevel = gameOver || percentage < 50 ? "ALTO" : percentage < 70 ? "MEDIO" : "BAJO";

  const loadImageAsDataUrl = async (url: string): Promise<{ data: string; format: string } | null> => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
      const format = blob.type.includes("png") ? "PNG" : "JPEG";
      return { data: dataUrl, format };
    } catch {
      return null;
    }
  };

  const handleDownloadPdf = async () => {
    const avatarImg = await loadImageAsDataUrl(character.avatar);
    const bgImg = await loadImageAsDataUrl(pdfBgCyber);
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 40;
    let y = margin;

    // Palette (cyber/neon)
    const bg: [number, number, number] = [10, 12, 24];
    const bgAlt: [number, number, number] = [16, 20, 38];
    const cardBg: [number, number, number] = [20, 24, 44];
    const cardBorder: [number, number, number] = [40, 55, 90];
    const neon: [number, number, number] = [0, 255, 170];
    const danger: [number, number, number] = [255, 60, 90];
    const warn: [number, number, number] = [255, 200, 60];
    const text: [number, number, number] = [230, 235, 245];
    const dim: [number, number, number] = [140, 150, 170];

    const setFill = (c: [number, number, number]) => doc.setFillColor(c[0], c[1], c[2]);
    const setDraw = (c: [number, number, number]) => doc.setDrawColor(c[0], c[1], c[2]);
    const setText = (c: [number, number, number]) => doc.setTextColor(c[0], c[1], c[2]);

    const drawBackground = () => {
      setFill(bg);
      doc.rect(0, 0, pageW, pageH, "F");
      // Cyber ambient background image (low opacity)
      if (bgImg) {
        try {
          const gState = new (doc as unknown as { GState: new (o: { opacity: number }) => unknown }).GState({ opacity: 0.18 });
          (doc as unknown as { setGState: (g: unknown) => void }).setGState(gState);
          doc.addImage(bgImg.data, bgImg.format, 0, 0, pageW, pageH, undefined, "FAST");
          const gReset = new (doc as unknown as { GState: new (o: { opacity: number }) => unknown }).GState({ opacity: 1 });
          (doc as unknown as { setGState: (g: unknown) => void }).setGState(gReset);
        } catch {
          /* ignore */
        }
      }
      // Subtle grid lines
      setDraw([28, 36, 60]);
      doc.setLineWidth(0.2);
      for (let gx = 0; gx <= pageW; gx += 24) doc.line(gx, 0, gx, pageH);
      for (let gy = 0; gy <= pageH; gy += 24) doc.line(0, gy, pageW, gy);
      // Top + bottom neon strip
      setFill(neon);
      doc.rect(0, 0, pageW, 3, "F");
      setFill(neon);
      doc.rect(0, pageH - 3, pageW, 3, "F");
    };

    drawBackground();

    const ensureSpace = (h: number) => {
      if (y + h > pageH - margin - 10) {
        doc.addPage();
        drawBackground();
        y = margin;
      }
    };

    const writeText = (
      text: string,
      x: number,
      maxW: number,
      opts: { size?: number; color?: [number, number, number]; bold?: boolean; gap?: number } = {}
    ) => {
      const { size = 10, color = [230, 235, 245] as [number, number, number], bold = false, gap = 3 } = opts;
      doc.setFont("helvetica", bold ? "bold" : "normal");
      doc.setFontSize(size);
      setText(color);
      const lines = doc.splitTextToSize(text, maxW) as string[];
      lines.forEach((line) => {
        ensureSpace(size + gap);
        doc.text(line, x, y);
        y += size + gap;
      });
    };

    // Card helper (draws an outlined neon card and runs body inside)
    const card = (
      title: string,
      accent: [number, number, number],
      body: (innerX: number, innerW: number) => void,
      opts: { icon?: string } = {}
    ) => {
      const padX = 14;
      const padY = 14;
      const innerX = margin + padX;
      const innerW = pageW - margin * 2 - padX * 2;
      const startY = y;
      // Measure: temporarily render then re-render. Simpler: reserve space dynamically.
      // We draw frame after body by capturing yStart and yEnd.
      // Approach: draw a placeholder, run body, then back-fill rectangle.
      ensureSpace(60);
      const topY = y;
      // header strip
      setFill(accent);
      doc.rect(margin, topY, 4, 0.0001, "F"); // placeholder
      y = topY + padY + 4;
      // Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      setText(accent);
      const titleText = (opts.icon ? `${opts.icon}  ` : "") + title;
      doc.text(titleText, innerX, y);
      y += 8;
      // Title underline
      setDraw(accent);
      doc.setLineWidth(0.6);
      doc.line(innerX, y, innerX + 60, y);
      y += 12;
      // Body
      body(innerX, innerW);
      y += padY;
      const endY = y;
      // Draw card background + border behind already-rendered content? jsPDF doesn't layer.
      // Instead: draw frame as outline only (transparent fill) so existing text remains visible.
      setDraw(cardBorder);
      doc.setLineWidth(0.8);
      doc.roundedRect(margin, topY, pageW - margin * 2, endY - topY, 6, 6, "S");
      // Left accent bar
      setFill(accent);
      doc.rect(margin, topY, 3, endY - topY, "F");
      y = endY + 12;
    };

    // ============ HEADER ============
    const headerH = 100;
    ensureSpace(headerH + 10);
    setFill(bgAlt);
    doc.roundedRect(margin, y, pageW - margin * 2, headerH, 8, 8, "F");
    setDraw(neon);
    doc.setLineWidth(1);
    doc.roundedRect(margin, y, pageW - margin * 2, headerH, 8, 8, "S");
    setFill(neon);
    doc.rect(margin, y, 60, 3, "F");
    setFill(neon);
    doc.rect(pageW - margin - 60, y + headerH - 3, 60, 3, "F");

    // Avatar with neon ring
    const avSize = 72;
    const avX = margin + 16;
    const avY = y + (headerH - avSize) / 2;
    if (avatarImg) {
      setFill(neon);
      doc.roundedRect(avX - 4, avY - 4, avSize + 8, avSize + 8, 10, 10, "F");
      setFill(bgAlt);
      doc.roundedRect(avX - 2, avY - 2, avSize + 4, avSize + 4, 8, 8, "F");
      try {
        doc.addImage(avatarImg.data, avatarImg.format, avX, avY, avSize, avSize, undefined, "FAST");
      } catch {
        /* ignore */
      }
      setDraw(neon);
      doc.setLineWidth(0.8);
      doc.roundedRect(avX, avY, avSize, avSize, 6, 6, "S");
    }

    const textX = avX + avSize + 18;

    setText(dim);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("// CYBER ESCAPE", textX, y + 22);

    setText(neon);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("REPORTE DE MISIÓN", textX, y + 46);

    setText(text);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Agente ${playerName}`, textX, y + 66);


    setText(dim);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    const dateStr = new Date().toLocaleString();
    const dateW = doc.getTextWidth(dateStr);
    doc.text(dateStr, pageW - margin - 16 - dateW, y + headerH - 12);

    y += headerH + 16;

    // ============ HERO: SCORE + RANK ============
    ensureSpace(110);
    const heroY = y;
    const heroH = 100;
    setFill(bgAlt);
    doc.roundedRect(margin, heroY, pageW - margin * 2, heroH, 8, 8, "F");
    setDraw(neon);
    doc.setLineWidth(1);
    doc.roundedRect(margin, heroY, pageW - margin * 2, heroH, 8, 8, "S");

    // Left: score
    setText(dim);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("PUNTAJE FINAL", margin + 20, heroY + 22);

    setText(neon);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(40);
    doc.text(score.toLocaleString(), margin + 20, heroY + 64);

    setText(text);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`Trofeo · Mejor combo x${bestCombo}`, margin + 20, heroY + 84);

    // Right: rank pill + risk
    const rankColor: [number, number, number] =
      rank.label === "ÉLITE CYBER" ? neon : rank.label === "EXPERTO" ? neon : rank.label === "AGENTE" ? warn : warn;
    const riskColor: [number, number, number] = riskLevel === "ALTO" ? danger : riskLevel === "MEDIO" ? warn : neon;

    const rightX = pageW - margin - 20;
    setText(dim);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    const rankLabel = "RANGO";
    doc.text(rankLabel, rightX - doc.getTextWidth(rankLabel), heroY + 22);

    setText(rankColor);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    const rankW = doc.getTextWidth(rank.label);
    doc.text(rank.label, rightX - rankW, heroY + 44);

    setText(dim);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    const riskLabel = "NIVEL DE RIESGO";
    doc.text(riskLabel, rightX - doc.getTextWidth(riskLabel), heroY + 66);

    setText(riskColor);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    const riskW = doc.getTextWidth(riskLevel);
    doc.text(riskLevel, rightX - riskW, heroY + 88);

    y = heroY + heroH + 16;

    // ============ PERFIL CARD ============
    card("PERFIL DEL AGENTE", neon, (ix, iw) => {
      const colW = iw / 2;
      const rows: Array<[string, string]> = [
        ["JUGADOR", playerName],
        ["EMPRESA", travelDetails.company],
        ["PUESTO", travelDetails.role],
        ["DESTINO", travelDetails.destination],
      ];
      const startY = y;
      let col = 0;
      let rowY = startY;
      rows.forEach((row, i) => {
        const x = ix + (col === 0 ? 0 : colW);
        setText(dim);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7);
        doc.text(row[0], x, rowY);
        setText(text);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        const val = doc.splitTextToSize(row[1], colW - 10) as string[];
        doc.text(val[0] ?? "", x, rowY + 14);
        if (col === 1 || i === rows.length - 1) {
          rowY += 32;
          col = 0;
        } else {
          col = 1;
        }
      });
      y = rowY + 4;
    });

    // ============ ESTADÍSTICAS CARD ============
    card("ESTADÍSTICAS DE COMBATE", neon, (ix, iw) => {
      const stats: Array<{ label: string; value: string; color: [number, number, number] }> = [
        { label: "CORRECTAS", value: `${correctAnswers}/${totalQuestions}`, color: neon },
        { label: "INCORRECTAS", value: `${incorrectAnswers}`, color: danger },
        { label: "TIMEOUTS", value: `${timeouts}`, color: warn },
        { label: "PRECISIÓN", value: `${percentage}%`, color: percentage >= 70 ? neon : danger },
        { label: "MEJOR COMBO", value: `x${bestCombo}`, color: neon },
        { label: "ESCUDOS", value: `${livesLeft}`, color: livesLeft <= 1 ? danger : neon },
      ];
      const cols = 3;
      const gap = 10;
      const cellW = (iw - gap * (cols - 1)) / cols;
      const cellH = 50;
      const startY = y;
      stats.forEach((s, i) => {
        const cx = ix + (i % cols) * (cellW + gap);
        const cy = startY + Math.floor(i / cols) * (cellH + gap);
        setFill(cardBg);
        doc.roundedRect(cx, cy, cellW, cellH, 4, 4, "F");
        setDraw(s.color);
        doc.setLineWidth(0.6);
        doc.roundedRect(cx, cy, cellW, cellH, 4, 4, "S");
        setText(dim);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7);
        doc.text(s.label, cx + 10, cy + 16);
        setText(s.color);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(20);
        doc.text(s.value, cx + 10, cy + 38);
      });
      const rows = Math.ceil(stats.length / cols);
      y = startY + rows * cellH + (rows - 1) * gap + 4;
    });

    // ============ RESULTADO CARD ============
    card("RESULTADO DE LA MISIÓN", riskColor, (ix, iw) => {
      setText(riskColor);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      ensureSpace(20);
      doc.text(result.title, ix, y);
      y += 18;
      writeText(result.message, ix, iw, { size: 10, color: text, gap: 4 });
      y += 4;
      // Badge row
      ensureSpace(22);
      const badgeText = `RANGO OBTENIDO · ${rank.label}`;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      const bw = doc.getTextWidth(badgeText) + 20;
      setFill(cardBg);
      doc.roundedRect(ix, y, bw, 18, 9, 9, "F");
      setDraw(rankColor);
      doc.setLineWidth(0.6);
      doc.roundedRect(ix, y, bw, 18, 9, 9, "S");
      setText(rankColor);
      doc.text(badgeText, ix + 10, y + 12);
      y += 22;
    });

    // ============ FEEDBACK CARD (forzar página 2) ============
    doc.addPage();
    drawBackground();
    y = margin;
    card("BITÁCORA DE DECISIONES", neon, (ix, iw) => {
      if (feedbackLog.length === 0) {
        writeText("Sin registros de feedback.", ix, iw, { color: dim });
        return;
      }
      feedbackLog.forEach((entry, idx) => {
        const statusLabel = entry.timedOut ? "TIMEOUT" : entry.isCorrect ? "CORRECTA" : "INCORRECTA";
        const statusColor: [number, number, number] = entry.timedOut ? warn : entry.isCorrect ? neon : danger;
        ensureSpace(54);
        const blockTop = y;
        // Mini card per entry
        const tipLines = entry.tip ? (doc.splitTextToSize(`Tip: ${entry.tip}`, iw - 20) as string[]) : [];
        const blockH = 36 + tipLines.length * 11;
        setFill(cardBg);
        doc.roundedRect(ix, blockTop, iw, blockH, 4, 4, "F");
        setDraw(cardBorder);
        doc.setLineWidth(0.5);
        doc.roundedRect(ix, blockTop, iw, blockH, 4, 4, "S");
        // Left index strip
        setFill(statusColor);
        doc.rect(ix, blockTop, 3, blockH, "F");

        // Title
        setText(text);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text(`DECISIÓN ${idx + 1}`, ix + 12, blockTop + 16);

        // Status pill
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        const pillW = doc.getTextWidth(statusLabel) + 14;
        const pillX = ix + iw - pillW - 10;
        setFill(statusColor);
        doc.roundedRect(pillX, blockTop + 6, pillW, 14, 7, 7, "F");
        setText(bg);
        doc.text(statusLabel, pillX + 7, blockTop + 16);

        // Points
        setText(dim);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.text(`PUNTOS: `, ix + 12, blockTop + 30);
        setText(entry.points >= 0 ? neon : danger);
        doc.setFontSize(9);
        doc.text(`${entry.points >= 0 ? "+" : ""}${entry.points}`, ix + 50, blockTop + 30);

        // Tip
        if (tipLines.length) {
          setText(dim);
          doc.setFont("helvetica", "italic");
          doc.setFontSize(8);
          tipLines.forEach((line, li) => {
            doc.text(line, ix + 12, blockTop + 44 + li * 11);
          });
        }
        y = blockTop + blockH + 8;
      });
    });

    // ============ FOOTER on each page ============
    const pageCount = doc.getNumberOfPages();
    for (let p = 1; p <= pageCount; p++) {
      doc.setPage(p);
      setText(dim);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.text("TELEDATA · Concientización en Ciberseguridad", margin, pageH - 14);
      const pageStr = `${p} / ${pageCount}`;
      doc.text(pageStr, pageW - margin - doc.getTextWidth(pageStr), pageH - 14);
    }

    doc.save(`reporte-cyber-escape-${playerName.replace(/\s+/g, "_")}.pdf`);
  };

  return (
    <div className="min-h-screen cyber-grid flex items-center justify-center p-4">
      <div className="max-w-lg w-full space-y-8 animate-fade-in-up">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-muted-foreground tracking-widest">
            MISIÓN COMPLETADA
          </span>
          <h1 className="text-3xl md:text-4xl font-mono font-bold text-primary neon-text">
            RESULTADOS
          </h1>
          <p className="text-sm font-mono text-muted-foreground">
            // Agente <span className="text-primary">{playerName}</span>
          </p>
        </div>

        {/* Personalized message card */}
        <div className={cn("cyber-card p-6 space-y-4 relative overflow-hidden animate-fade-in-up", result.borderColor)}>
          <div className={cn("absolute inset-0 opacity-20 pointer-events-none", result.bgColor)} aria-hidden="true" />
          <div className="relative flex items-center gap-4">
            <div className={cn("relative rounded-full p-1 border-2", result.borderColor)}>
              <img
                src={character.avatar}
                alt={`Avatar de ${playerName}`}
                width={72}
                height={72}
                className="w-16 h-16 rounded-full object-cover"
              />
              <span className={cn("absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background animate-pulse", result.bgColor)} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-mono text-muted-foreground tracking-widest">AGENTE</div>
              <div className="text-lg font-mono font-bold text-foreground truncate">{playerName}</div>
            </div>
            <ResultIcon className={cn("w-10 h-10 shrink-0", result.color)} />
          </div>
          <div className="relative space-y-2">
            <h2 className={cn("text-xl md:text-2xl font-mono font-bold neon-text", result.color)}>
              {result.title}
            </h2>
            <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
              {result.message}
            </p>
          </div>
        </div>

        {/* Score Hero */}
        <div className={cn("cyber-card p-6 text-center space-y-2 relative overflow-hidden", result.borderColor)}>
          <div className="text-xs font-mono text-muted-foreground tracking-widest">PUNTAJE FINAL</div>
          <div className="flex items-center justify-center gap-3">
            <Trophy className="w-8 h-8 text-primary" />
            <div className="text-5xl md:text-6xl font-mono font-bold text-primary neon-text tabular-nums">
              {score.toLocaleString()}
            </div>
          </div>
          <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full border font-mono text-xs tracking-widest", result.borderColor, rank.color)}>
            <Award className="w-3 h-3" />
            RANGO: {rank.label}
          </div>
        </div>

        {/* Stats */}
        <div className={cn("cyber-card p-6", result.borderColor)}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-mono font-bold text-primary neon-text tabular-nums">
                {correctAnswers}/{totalQuestions}
              </div>
              <div className="text-[10px] text-muted-foreground font-mono tracking-widest">CORRECTAS</div>
            </div>
            <div className="text-center">
              <div className={cn(
                "text-2xl font-mono font-bold tabular-nums",
                percentage >= 70 ? "text-primary neon-text" : "text-destructive neon-text-red"
              )}>
                {percentage}%
              </div>
              <div className="text-[10px] text-muted-foreground font-mono tracking-widest">PRECISIÓN</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-mono font-bold text-secondary neon-text-blue tabular-nums inline-flex items-center gap-1">
                <Flame className="w-5 h-5" /> x{bestCombo}
              </div>
              <div className="text-[10px] text-muted-foreground font-mono tracking-widest">MEJOR COMBO</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-mono font-bold text-destructive tabular-nums inline-flex items-center gap-1">
                <Heart className="w-5 h-5 fill-destructive" /> {livesLeft}
              </div>
              <div className="text-[10px] text-muted-foreground font-mono tracking-widest">ESCUDOS</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={handleDownloadPdf}
            size="lg"
            variant="outline"
            className="cyber-button font-mono border-primary/60 text-primary hover:bg-primary/10 hover:text-primary neon-text"
          >
            <FileDown className="w-4 h-4 mr-2" />
            DESCARGAR MI REPORTE
          </Button>
          <Button
            onClick={onRestart}
            size="lg"
            className="cyber-button font-mono bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            REINICIAR MISIÓN
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground font-mono">
          Desarrollado por TELEDATA • Concientización en Ciberseguridad
        </p>
      </div>
    </div>
  );
}
