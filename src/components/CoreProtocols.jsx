import SectionHeading from './SectionHeading';
import EventTimeline from './EventTimeline';

export default function CoreProtocols() {
  return (
    <section
      className="py-24 px-container-padding bg-background relative border-b border-white/10"
      id="features"
    >
      <div className="w-full">
        <SectionHeading icon="developer_board" title="Events" />

        {/* AWS Week Event Timeline */}
        <EventTimeline />
      </div>
    </section>
  );
}
