"use client";

import { useMemo, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import {
	ActivityDistributionItem,
	CategoryOption,
	EventCard,
	SemesterMetadata,
} from "./home-data";
import { EventsGrid } from "./events-grid";

ChartJS.register(ArcElement, Tooltip, Legend);

type MyEventsViewProps = {
	events: EventCard[];
	metadata: SemesterMetadata[];
	activityDistribution: ActivityDistributionItem[];
	totalPoints: number;
	categories: CategoryOption[];
	role: string;
    activeTab: string;
};

export function MyEventsView({
	events,
	metadata,
	activityDistribution,
	totalPoints,
	categories,
	role,
    activeTab
}: MyEventsViewProps) {
	const [selectedSemester, setSelectedSemester] = useState(
		() => events[0]?.semester ?? metadata[0]?.label ?? ""
	);
	const [category, setCategory] = useState<CategoryOption["value"]>("external");

	const filteredEvents = events.filter(
		(event) =>
			(!selectedSemester || event.semester === selectedSemester) && event.category === category
	);

	const chartData = useMemo(
		() => ({
			labels: activityDistribution.map((item) => item.label),
			datasets: [
				{
					data: activityDistribution.map((item) => item.value),
					backgroundColor: activityDistribution.map((item) => item.color),
					borderWidth: 0,
				},
			],
		}),
		[activityDistribution]
	);

	const chartOptions = useMemo(
		() => ({
			cutout: "65%",
			plugins: {
				legend: { display: false },
				tooltip: {
					callbacks: {
						label: (context: any) => {
							const label = context.label ?? "";
							const value = context.parsed ?? 0;
							const percentage = totalPoints ? ((value / totalPoints) * 100).toFixed(1) : "0.0";
							return `${label}: ${value} points (${percentage}%)`;
						},
					},
				},
			},
		}),
		[totalPoints]
	);

	const categoryLabel =
		categories.find((option) => option.value === category)?.label ?? "External";

	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-wrap items-center justify-between gap-4">
				<div className="flex flex-wrap items-center gap-3">
					<div className="relative">
						<select
							value={category}
							onChange={(event) => setCategory(event.target.value as typeof category)}
							className="appearance-none rounded-full border border-[#d0b894]/40 bg-gradient-to-r from-[#dcc8ab] via-[#c69d6b] to-[#9f622b] px-5 py-2 pr-10 text-sm font-semibold text-[#3d2a15] shadow-md shadow-[#000000]/20 focus:outline-none"
						>
							{categories.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
						<span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#3d2a15]">
							⌄
						</span>
					</div>
					{category === "external" && (
						<button
							type="button"
							className="rounded-full bg-gradient-to-r from-[#e6d3b5] via-[#d1ad7d] to-[#b6783f] px-5 py-2 text-sm font-semibold text-[#3d2a15] shadow-md shadow-[#000000]/30 transition hover:brightness-110"
						>
							Upload
						</button>
					)}
				</div>
			</div>

			<div className="flex flex-wrap justify-center gap-3 lg:justify-start">
				{metadata.map((semester) => {
					const count = semester.counts.mine;
					const formattedCount = count > 0 ? String(count).padStart(2, "0") : "--";
					const isSelected = selectedSemester === semester.label;
					return (
						<button
							key={semester.label}
							type="button"
							onClick={() => setSelectedSemester(semester.label)}
							className={`flex min-w-[86px] flex-col items-center rounded-3xl border border-[#d0b894]/30 px-4 py-3 text-xs font-semibold uppercase tracking-wide transition ${
								isSelected
									? "bg-gradient-to-b from-[#dcc8ab] via-[#c69d6b] to-[#9f622b] text-[#3d2a15]"
									: "bg-[#1a1a1a] text-[#f5e6d4]/80"
							}`}
						>
							<span className="text-sm">{semester.label}</span>
							<span className="text-lg">{formattedCount}</span>
						</button>
					);
				})}
			</div>

			<div className="flex flex-col gap-6 lg:flex-row">
				<div className="grid flex-1 gap-6 grid-cols-1 sm:grid-cols-2">
					<EventsGrid
                        activeTab={activeTab}
                        role={role}
						events={filteredEvents}
						emptyMessage={`No ${categoryLabel.toLowerCase()} events for ${selectedSemester || "this semester"}.`}
					/>
				</div>

				<aside className="flex w-full flex-col gap-4 rounded-3xl bg-gradient-to-b from-[#f5e6d4] via-[#e4c598] to-[#b6783f] p-6 text-[#3d2a15] lg:w-[320px]">
					<h2 className="text-xl font-semibold">Activity Points Distribution</h2>
					<div className="relative mx-auto h-48 w-48">
						<Doughnut data={chartData} options={chartOptions} />
						<div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">{totalPoints}</div>
					</div>
					<ul className="space-y-3 text-sm">
						{activityDistribution.map((item) => (
							<li key={item.label} className="flex items-start gap-3">
								<span className="mt-1 h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
								<div className="flex-1">
									<p className="font-semibold">{item.label}</p>
									<p className="text-xs text-[#3d2a15]/80">
										{item.value} points ({totalPoints ? ((item.value / totalPoints) * 100).toFixed(1) : "0.0"}%)
									</p>
								</div>
							</li>
						))}
					</ul>
				</aside>
			</div>
		</div>
	);
}
