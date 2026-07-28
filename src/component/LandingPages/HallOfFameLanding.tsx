const HOF_LANDING_URL = "https://hof-ochre.vercel.app";

export default function HallOfFameLanding() {
  return (
    <iframe
      src={HOF_LANDING_URL}
      title="Hall of Fame"
      className="h-[calc(100dvh-65px)] w-full border-0"
      allow="clipboard-write"
    />
  );
}
