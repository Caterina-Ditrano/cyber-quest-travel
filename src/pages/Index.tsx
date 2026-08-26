import { EscapeRoomGame } from "@/components/EscapeRoomGame";
import { FullscreenButton } from "@/components/FullscreenButton";
import { LanguageToggle } from "@/components/LanguageToggle";

const Index = () => {
  return (
    <>
      <LanguageToggle />
      <FullscreenButton />
      <EscapeRoomGame />
    </>
  );
};

export default Index;
