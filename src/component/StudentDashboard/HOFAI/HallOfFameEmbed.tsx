const HOF_APP_URL = "https://hof-ochre.vercel.app";

export default function HallOfFameEmbed() {
  return (
    <iframe
      src={HOF_APP_URL}
      title="Hall of Fame"
      className="h-[calc(100dvh-97px)] min-h-[500px] w-full border-0"
      allow="clipboard-write"
    />
  );
}
