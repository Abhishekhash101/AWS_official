import awsIcon from '../assets/aws_icon.jpeg';

export default function Callout() {
  return (
    <div className="w-full bg-primary-container text-background py-16 px-container-padding">
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-background/20">
            <img src={awsIcon} alt="AWS Club Logo" className="w-full h-full object-cover" />
          </div>
          <h2 className="font-headline-lg text-[32px] uppercase tracking-widest font-bold">
            AWS Student Builder Group
            <br />
            at VIT VELLORE
          </h2>
        </div>
        <a
          className="bg-background text-primary-container font-headline-md text-label-md px-8 py-4 hover:bg-white transition-all uppercase tracking-widest cursor-pointer"
          href="#join"
          onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-login-modal')); }}
        >
          Join the Network
        </a>
      </div>
    </div>
  );
}
