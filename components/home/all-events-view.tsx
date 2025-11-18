import { EventCard } from "./home-data";
import { EventsGrid } from "./events-grid";

export function AllEventsView({ events, role , activeTab}: { events: EventCard[], role: string, activeTab: string}) {
	return (
		<div className="flex flex-col gap-6">
			<div className="grid flex-1 gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
				<EventsGrid activeTab={activeTab} role={role} events={events} emptyMessage="No events available." />
			</div>
		</div>
	);
}
