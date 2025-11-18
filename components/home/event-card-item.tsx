import { FaDochub, FaDownload } from "react-icons/fa";
import { EventCard } from "./home-data";
import { useRouter } from "next/navigation";

export function EventCardItem({ event, role , activeTab}: { event: EventCard; role: string, activeTab: string }) {
	const isRegistered = event.status === "registered";
	const isExternal = event.category === "external";
    const router = useRouter();

	return (
		<article className="rounded-3xl bg-gradient-to-b from-[#dac6ab] via-[#cfb191] to-[#9d6730] p-6 shadow-lg shadow-[#000000]/40">
			<span className="inline-flex items-center rounded-full bg-[#2d2d2d] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
				{isRegistered ? "Registered" : "Active"}
			</span>
			<div className="mt-6 space-y-2 text-[#3d2a15]">
				<h3 className="text-lg font-semibold">{event.title}</h3>
				<p className="text-xs uppercase tracking-wide">Venue : {event.venue}</p>
			</div>
			<div className="mt-10 flex items-end justify-between">
				{role === "Faculty" && activeTab == "published" && (
					<span onClick={()=>{
                        router.push(`/event-students/${event.id}`);
                    }} className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-[#3d2a15] shadow-sm">
						33/50
					</span>
				)}
               {role =="Student" && activeTab == "all" && <button
					type="button"
					className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
						isRegistered ? "bg-white/90 text-[#b6783f] hover:bg-white" : "bg-[#fef6ec]/90 text-[#b6783f] hover:bg-white"
					}`}
				>
					Register now
				</button>}
				{role=="Student" && isRegistered && <button
					type="button"
					className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
						isRegistered ? "bg-white/90 text-[#b6783f] hover:bg-white" : "bg-[#fef6ec]/90 text-[#b6783f] hover:bg-white"
					}`}
				>
					{isRegistered && isExternal && (
						<>
							<FaDochub size={18} />
							Document
						</>
					)}
					{isRegistered && !isExternal && (
						<>
							<FaDownload size={18} />
							Download
						</>
					)}
				</button>}
			</div>
		</article>
	);
}
