export default function SectionHeading({ icon, title }) {
  return (
    <div className="text-left mb-16 flex items-center gap-6">
      <div className="w-16 h-16 orange-block flex items-center justify-center">
        <span className="material-symbols-outlined text-background text-3xl">{icon}</span>
      </div>
      <h2 className="font-headline-lg text-[40px] text-white uppercase tracking-widest">
        {title}
      </h2>
    </div>
  );
}
