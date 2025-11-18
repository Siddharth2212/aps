"use client";

import { useEffect, useState } from "react";
import {
	activityDistribution,
	allEvents,
	CATEGORY_OPTIONS,
	myEvents,
	semesterMetadata,
	totalPoints,
	publishedEvents,
} from "./home/home-data";
import { AllEventsView } from "./home/all-events-view";
import { MyEventsView } from "./home/my-events-view";
import Header from "./header";
import { CreateEventModal } from "./home/create-event-modal";
import { StudentListView } from "./home/student-list-view";
import { AllCategoriesView } from "./home/all-categories-view";
import { ProctorStudentView } from "./home/proctor-student-view";
import { HODApprovalsView } from "./home/hod-approvals-view";

export default function Home() {
	const [activeTab, setActiveTab] = useState<"all" | "mine" | "published" | "students" | "categories" | "proctorStudent" | "approvals">("all");
	const [role] = useState<"Student" | "Faculty" | "Proctor" | "HOD">("Student");
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

	useEffect(() => {
		if (role === "Faculty" && activeTab === "mine") {
			setActiveTab("all");
		}
		if (role === "Proctor" && activeTab === "published") {
			setActiveTab("all");
		}
		if (role === "Student" && activeTab === "students") {
			setActiveTab("all");
		}
		if (role === "HOD" && (activeTab === "mine" || activeTab === "published" || activeTab === "students" || activeTab === "categories")) {
			setActiveTab("all");
		}
	}, [role, activeTab]);

	const tabs =
		role === "Proctor"
			? [
					{ key: "all" as const, label: "All events", icon: "📅" },
					{ key: "students" as const, label: "Students List", icon: "👥" },
					{ key: "categories" as const, label: "Categories", icon: "📂" },
			  ]
			: role === "HOD"
			? [
					{ key: "all" as const, label: "All events", icon: "📅" },
					{ key: "proctorStudent" as const, label: "Proctor-Student", icon: "👥" },
					{ key: "approvals" as const, label: "Approvals", icon: "✔️" },
			  ]
			: [
					{ key: "all" as const, label: "All events", icon: "📅" },
					...(role !== "Faculty"
						? [{ key: "mine" as const, label: "My Events", icon: "✓" }]
						: []),
					...(role === "Faculty"
						? [{ key: "published" as const, label: "Published", icon: "✓" }]
						: []),
			  ];

	return (
		<>
        <Header role={role} />
        <div className="min-h-screen bg-[#111111] px-6 py-8 text-white">
			<div className="mx-auto flex max-w-6xl flex-col gap-8">
				<div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
					<div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
						<div className="flex w-full max-w-xl rounded-full bg-[#e2ceb1]/20 p-2">
							{tabs.map((tab) => {
								const isActive = activeTab === tab.key;
								return (
									<button
										key={tab.key}
										type="button"
										onClick={() => setActiveTab(tab.key)}
										className={`flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${
											isActive
												? "bg-gradient-to-r from-[#d7c3a7] via-[#caa277] to-[#b6783f] text-[#3d2a15]"
												: "text-[#f5e6d4]/70"
										}`}
									>
										<span>{tab.icon}</span>
										{tab.label}
									</button>
								);
							})}
						</div>
						{role === "Faculty" && (
							<button
								type="button"
								onClick={() => setIsCreateModalOpen(true)}
								className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e6d3b5] via-[#d1ad7d] to-[#b6783f] px-6 py-3 text-sm font-semibold text-[#3d2a15] shadow-md shadow-[#000000]/30 transition hover:brightness-110"
							>
								<span className="text-lg leading-none">＋</span>
								Create Event
							</button>
						)}
					</div>
				</div>

				{activeTab === "all" ? (
					<AllEventsView events={allEvents} role={role} activeTab={activeTab} />
				) : activeTab === "published" ? (
					<AllEventsView events={publishedEvents} role={role} activeTab={activeTab} />
				) : activeTab === "students" ? (
					<StudentListView />
				) : activeTab === "categories" ? (
					<AllCategoriesView />
				) : activeTab === "proctorStudent" ? (
					<ProctorStudentView />
				) : activeTab === "approvals" ? (
					<HODApprovalsView/>
				) : (
					<MyEventsView
						events={myEvents}
                        activeTab={activeTab}
                        role={role}
						metadata={semesterMetadata}
						activityDistribution={activityDistribution}
						totalPoints={totalPoints}
						categories={CATEGORY_OPTIONS}
					/>
				)}
			</div>
		</div>
        <CreateEventModal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
        </>
	);
}