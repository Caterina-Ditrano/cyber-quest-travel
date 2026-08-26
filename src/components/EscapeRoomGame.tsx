import { useMemo, useState } from "react";
import { decisions } from "@/data/gameData";
import { characters, personalize, type Character, type TravelDetails } from "@/data/characters";
import { CharacterSelect } from "./CharacterSelect";
import { PlayerNameInput } from "./PlayerNameInput";
import { TravelDetailsInput } from "./TravelDetailsInput";
import { CharacterIntro } from "./CharacterIntro";
import { DecisionCard, type AnswerResult } from "./DecisionCard";
import { GameResult } from "./GameResult";
import { ProgressBar } from "./ProgressBar";
import { ScoreHUD } from "./ScoreHUD";
import { useEffect } from "react";

const MAX_LIVES = 3;

type GameState = "select" | "name" | "details" | "intro" | "playing" | "result";

export function EscapeRoomGame() {
  const [gameState, setGameState] = useState<GameState>("select");
  const [character, setCharacter] = useState<Character>(characters[0]);
  const [playerName, setPlayerName] = useState<string>("Agente");
  const [travelDetails, setTravelDetails] = useState<TravelDetails>({
    company: "TechCorp Internacional",
    destination: "Madrid",
    role: "Ejecutivo/a de ventas",
  });
  const [currentDecision, setCurrentDecision] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [timeouts, setTimeouts] = useState(0);
  const [feedbackLog, setFeedbackLog] = useState<Array<{ question: string; isCorrect: boolean; timedOut: boolean; tip: string; points: number }>>([]);
  const [floatingPoints, setFloatingPoints] = useState<{ id: number; value: number } | null>(null);

  const handleSelectCharacter = (c: Character) => {
    setCharacter(c);
    setGameState("name");
  };

  const handleSubmitName = (name: string) => {
    setPlayerName(name);
    setGameState("details");
  };

  const handleSubmitDetails = (details: TravelDetails) => {
    setTravelDetails(details);
    setGameState("intro");
  };

  const handleStart = () => setGameState("playing");

  const handleAnswer = (result: AnswerResult) => {
    let nextLives = lives;
    if (result.isCorrect) {
      setCorrectAnswers((p) => p + 1);
      setScore((p) => p + result.points);
      setCombo((c) => {
        const next = c + 1;
        setBestCombo((b) => Math.max(b, next));
        return next;
      });
      setFloatingPoints({ id: Date.now(), value: result.points });
    } else {
      setCombo(0);
      nextLives = Math.max(0, lives - 1);
      setLives(nextLives);
      if (result.timedOut) setTimeouts((t) => t + 1);
    }

    setFeedbackLog((log) => [
      ...log,
      {
        question: result.question,
        isCorrect: result.isCorrect,
        timedOut: result.timedOut,
        tip: result.tip,
        points: result.points,
      },
    ]);

    if (nextLives <= 0 || currentDecision + 1 >= decisions.length) {
      setGameState("result");
    } else {
      setCurrentDecision((p) => p + 1);
    }
  };

  const handleRestart = () => {
    setGameState("select");
    setCurrentDecision(0);
    setCorrectAnswers(0);
    setScore(0);
    setCombo(0);
    setBestCombo(0);
    setLives(MAX_LIVES);
    setTimeouts(0);
    setFeedbackLog([]);
    setFloatingPoints(null);
  };

  useEffect(() => {
    if (!floatingPoints) return;
    const t = window.setTimeout(() => setFloatingPoints(null), 1200);
    return () => window.clearTimeout(t);
  }, [floatingPoints]);

  const handleBackToSelect = () => setGameState("select");
  const handleBackToName = () => setGameState("name");
  const handleBackToDetails = () => setGameState("details");

  const shuffledOptions = useMemo(() => {
    const arr = [...decisions[currentDecision].options];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [currentDecision]);

  if (gameState === "select") {
    return <CharacterSelect onSelect={handleSelectCharacter} />;
  }

  if (gameState === "name") {
    return <PlayerNameInput onSubmit={handleSubmitName} onBack={handleBackToSelect} />;
  }

  if (gameState === "details") {
    return (
      <TravelDetailsInput
        defaultValues={travelDetails}
        onSubmit={handleSubmitDetails}
        onBack={handleBackToName}
      />
    );
  }

  if (gameState === "intro") {
    return (
      <CharacterIntro
        character={character}
        playerName={playerName}
        travelDetails={travelDetails}
        onStart={handleStart}
        onBack={handleBackToDetails}
      />
    );
  }

  if (gameState === "result") {
    return (
      <GameResult
        character={character}
        playerName={playerName}
        travelDetails={travelDetails}
        correctAnswers={correctAnswers}
        totalQuestions={decisions.length}
        score={score}
        bestCombo={bestCombo}
        livesLeft={lives}
        timeouts={timeouts}
        feedbackLog={feedbackLog}
        gameOver={lives <= 0 && currentDecision + 1 < decisions.length}
        onRestart={handleRestart}
      />
    );
  }

  const baseDecision = decisions[currentDecision];

  const personalizedDecision = {
    ...baseDecision,
    scenario: personalize(baseDecision.scenario, character, playerName, travelDetails),
    location: personalize(baseDecision.location, character, playerName, travelDetails),
    question: personalize(baseDecision.question, character, playerName, travelDetails),
    tip: personalize(baseDecision.tip, character, playerName, travelDetails),
    options: shuffledOptions.map((o) => ({
      ...o,
      text: personalize(o.text, character, playerName, travelDetails),
      consequence: personalize(o.consequence, character, playerName, travelDetails),
    })),
  };

  return (
    <div className="relative min-h-screen cyber-grid scanline">
      {/* Stage background */}
      <div
        key={`bg-${currentDecision}`}
        className="fixed inset-0 -z-10 bg-cover bg-center transition-opacity duration-700 animate-fade-in"
        style={{ backgroundImage: `url(${baseDecision.background})` }}
        aria-hidden="true"
      />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background/85 via-background/75 to-background/90" aria-hidden="true" />

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-mono font-bold text-primary neon-text animate-flicker">
            CYBER ESCAPE
          </h1>
          <p className="text-sm text-muted-foreground font-mono">
            // Misión activa de {playerName} · {travelDetails.destination}
          </p>
        </div>

        {/* Character chip */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-3 px-3 py-1.5 bg-muted rounded-full border border-border">
            <img
              src={character.avatar}
              alt={`Avatar de ${playerName}`}
              width={32}
              height={32}
              loading="lazy"
              className="w-8 h-8 rounded-full object-cover border border-primary/40"
            />
            <span className="font-mono text-xs text-foreground">
              {playerName} · {travelDetails.role} · {travelDetails.company}
            </span>
          </div>
        </div>

        {/* Score HUD */}
        <div className="max-w-2xl mx-auto">
          <ScoreHUD score={score} combo={combo} bestCombo={bestCombo} lives={lives} maxLives={MAX_LIVES} />
        </div>

        {/* Progress */}
        <div className="max-w-2xl mx-auto">
          <ProgressBar
            current={currentDecision + 1}
            total={decisions.length}
            correctAnswers={correctAnswers}
          />
        </div>

        {/* Decision */}
        <DecisionCard
          key={currentDecision}
          decision={personalizedDecision}
          characterAvatar={character.avatar}
          characterName={playerName}
          combo={combo}
          onAnswer={handleAnswer}
        />
      </div>

      {/* Floating points animation */}
      {floatingPoints && (
        <div
          key={floatingPoints.id}
          className="pointer-events-none fixed top-1/3 left-1/2 -translate-x-1/2 z-50 font-mono font-bold text-4xl md:text-5xl text-primary neon-text animate-float-up"
          aria-hidden="true"
        >
          +{floatingPoints.value}
        </div>
      )}
    </div>
  );
}
