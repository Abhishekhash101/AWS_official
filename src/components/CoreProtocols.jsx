import SectionHeading from './SectionHeading';

const protocols = [
  {
    icon: 'school',
    title: 'Cloud Workshops',
    description:
      'Hands-on sessions diving deep into AWS services. From EC2 basics to complex serverless architectures, we build practical skills.',
    status: 'STATUS: ACTIVE',
  },
  {
    icon: 'code_blocks',
    title: 'Build Projects',
    description:
      'Collaborative engineering. We tackle real-world problems by designing and deploying robust cloud-native applications.',
    status: 'STATUS: DEPLOYING',
  },
  {
    icon: 'campaign',
    title: 'Speaker Sessions',
    description:
      'Insights from industry veterans. Connect with certified professionals and AWS community builders to expand your network.',
    status: 'STATUS: SCHEDULED',
  },
];

export default function CoreProtocols() {
  return (
    <section
      className="py-24 px-container-padding bg-background relative border-b border-white/10"
      id="features"
    >
      <div className="w-full">
        <SectionHeading icon="developer_board" title="Events" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {protocols.map((protocol) => (
            <div
              key={protocol.title}
              className="bg-surface-container-lowest border border-white/10 p-8 relative group hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full"
            >
              {/* Corner Icon */}
              <div className="absolute top-0 right-0 p-4 text-primary-container opacity-50">
                <span
                  className="material-symbols-outlined text-4xl"
                  style={{ fontVariationSettings: "'wght' 200" }}
                >
                  {protocol.icon}
                </span>
              </div>

              {/* Card Title */}
              <h3 className="font-headline-md text-headline-md text-white mb-6 uppercase tracking-wider">
                {protocol.title}
              </h3>

              {/* Card Body */}
              <p className="font-body-md text-body-md text-on-surface-variant flex-grow">
                {protocol.description}
              </p>

              {/* Status Footer */}
              <div className="mt-8 pt-6 border-t border-white/10 text-primary-container font-headline-md text-label-sm flex items-center gap-3 tracking-widest uppercase">
                <span>{protocol.status}</span>
                <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
