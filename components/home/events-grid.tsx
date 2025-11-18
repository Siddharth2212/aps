import { EventCardItem } from "./event-card-item";
import { EventCard } from "./home-data";

export function EventsGrid({ events, emptyMessage, role, activeTab }: { events: EventCard[]; emptyMessage: string; role: string, activeTab: string }) {
	if (events.length === 0) {
		return (
			<div className="col-span-full flex min-h-[240px] items-center justify-center rounded-3xl border border-dashed border-[#d0b894]/40 bg-[#1d1b18] text-sm text-[#f5e6d4]/70">
				{emptyMessage}
			</div>
		);
	}

	return (
		<>
			{events.map((event) => (
				<EventCardItem activeTab={activeTab} role={role} key={event.id} event={event} />
			))}
		</>
	);
}
