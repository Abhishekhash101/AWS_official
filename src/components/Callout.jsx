export default function Callout() {
  return (
    <div className="w-full bg-primary-container text-background py-16 px-container-padding">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-background flex items-center justify-center">
            <span className="material-symbols-outlined text-primary-container text-3xl">
              developer_board
            </span>
          </div>
          <h2 className="font-headline-lg text-[32px] uppercase tracking-widest font-bold">
            AWS Student Builder Group
            <br />
            at VIT VELLORE
          </h2>
        </div>
        <a
          className="bg-background text-primary-container font-headline-md text-label-md px-8 py-4 hover:bg-white transition-all uppercase tracking-widest"
          href="#join"
        >
          Join the Network
        </a>
      </div>
    </div>
  );
}
