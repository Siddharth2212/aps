"use client";

import { useMemo, useState } from "react";

type ApprovalCard = {
	id: number;
	title: string;
	venue: string;
	date: string;
	time: string;
};

const EVENT_APPROVALS: ApprovalCard[] = [
	{ id: 1, title: "Web dev workshop", venue: "PJ Block 605 6th Floor", date: "12 Aug 2024", time: "09:00 AM" },
	{ id: 2, title: "AI Guest Lecture", venue: "Main Seminar Hall", date: "18 Aug 2024", time: "11:30 AM" },
	{ id: 3, title: "Robotics Expo", venue: "Innovation Lab", date: "24 Aug 2024", time: "02:00 PM" },
];

const CATEGORY_APPROVALS: ApprovalCard[] = [
	{ id: 1, title: "Add: Technical Symposium", venue: "Category Update", date: "Requested 06 Aug 2024", time: "Pending" },
	{ id: 2, title: "Edit: Sports Tournament", venue: "Category Update", date: "Requested 07 Aug 2024", time: "Pending" },
];

export function HODApprovalsView() {
	const [activeSubTab, setActiveSubTab] = useState<"events" | "categories">("events");
	const [remarkModal, setRemarkModal] = useState<{ open: boolean; card: ApprovalCard | null; note: string }>({
		open: false,
		card: null,
		note: "",
	});
	const approvals = useMemo(
		() => (activeSubTab === "events" ? EVENT_APPROVALS : CATEGORY_APPROVALS),
		[activeSubTab]
	);
	const closeRemarkModal = () => setRemarkModal({ open: false, card: null, note: "" });

	return (
		<div className="flex flex-col gap-6">
			<div className="rounded-full bg-[#e2ceb1]/30 p-2">
				<div className="grid grid-cols-2 gap-2">
					<button
						type="button"
						onClick={() => setActiveSubTab("events")}
						className={`rounded-full px-6 py-3 text-sm font-semibold transition ${
							activeSubTab === "events"
								? "bg-gradient-to-r from-[#f5e6d4] via-[#d9b482] to-[#b6783f] text-[#2f1f0f]"
								: "bg-transparent text-[#f5e6d4]/70"
						}`}
					>
						Events Approvals
					</button>
					<button
						type="button"
						onClick={() => setActiveSubTab("categories")}
						className={`rounded-full px-6 py-3 text-sm font-semibold transition ${
							activeSubTab === "categories"
								? "bg-gradient-to-r from-[#f5e6d4] via-[#d9b482] to-[#b6783f] text-[#2f1f0f]"
								: "bg-transparent text-[#f5e6d4]/70"
						}`}
					>
						Category Approvals
					</button>
				</div>
			</div>

			<div className="flex flex-col gap-4">
				{approvals.map((item) => (
					<div
						key={item.id}
						className="rounded-[36px] bg-gradient-to-r from-[#f8e8d7] via-[#d7b07b] to-[#b6783f] p-[3px] shadow-lg shadow-black/40"
					>
						<div className="flex flex-col gap-4 rounded-[32px] bg-[#111111] p-1">
							<div className="flex flex-col gap-3 rounded-[28px] bg-gradient-to-r from-[#f8e8d7] via-[#d7b07b] to-[#c88a4f] px-8 py-6 text-[#3d2a15]">
								<div className="flex flex-col text-lg font-semibold">
									<span>{item.title}</span>
									<span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5e4324]">
										Venue : {item.venue}
									</span>
									<span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5e4324]">
										{item.date} • {item.time}
									</span>
								</div>

								<div className="flex flex-wrap justify-end gap-3">
									<button
										type="button"
										className="flex items-center gap-2 rounded-full bg-[#d1b490] px-6 py-2 text-sm font-semibold text-[#2f1f0f] shadow shadow-black/20 transition hover:brightness-110"
									>
										<span>✔</span>
										Approve
									</button>
									<button
										type="button"
										className="flex items-center gap-2 rounded-full bg-[#b47843] px-6 py-2 text-sm font-semibold text-[#2f1f0f] shadow shadow-black/20 transition hover:brightness-110"
									>
										<span>✕</span>
										Reject
									</button>
									<button
										type="button"
										onClick={() => setRemarkModal({ open: true, card: item, note: "" })}
										className="flex items-center gap-2 rounded-full bg-[#f1d5b0] px-6 py-2 text-sm font-semibold text-[#2f1f0f] shadow shadow-black/20 transition hover:brightness-110"
									>
										<span>✎</span>
										Remarks
									</button>
								</div>
							</div>
						</div>
					</div>
				))}

				{approvals.length === 0 && (
					<div className="rounded-3xl border border-dashed border-[#d1b490] bg-[#f8e8d7]/60 px-6 py-10 text-center text-sm font-medium text-[#5e4324]">
						No pending approvals.
					</div>
				)}
			</div>

			{remarkModal.open && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
					<form
						onSubmit={(event) => {
							event.preventDefault();
							closeRemarkModal();
						}}
						className="w-full max-w-lg rounded-[36px] bg-[#d2a975] p-6 text-[#2f1f0f] shadow-2xl shadow-black/50 sm:p-8"
					>
						<div className="flex items-start justify-between">
							<h2 className="text-2xl font-semibold">Add Rejection Remark</h2>
							<button
								type="button"
								onClick={closeRemarkModal}
								className="text-lg font-semibold text-[#2f1f0f]/70 transition hover:text-[#2f1f0f]"
							>
								✕
							</button>
						</div>
						<div className="mt-5 flex flex-col gap-3 text-sm">
							<span className="font-semibold">Rejection Reason:</span>
							<textarea
								rows={5}
								value={remarkModal.note}
								onChange={(event) =>
									setRemarkModal((prev) => ({ ...prev, note: event.target.value }))
								}
								placeholder="Enter the reason for rejection..."
								className="rounded-2xl border border-dashed border-[#bb8f57] bg-white/90 px-4 py-3 text-base text-[#3b2715] focus:outline-none focus:ring-2 focus:ring-[#b6783f]"
							/>
						</div>
						<div className="mt-6 flex justify-end gap-3">
							<button
								type="button"
								onClick={closeRemarkModal}
								className="rounded-full border border-[#856640] px-6 py-2 text-sm font-semibold text-[#3b2715] transition hover:brightness-110"
							>
								Cancel
							</button>
							<button
								type="submit"
								className="rounded-full bg-[#cba064] px-6 py-2 text-sm font-semibold text-white shadow shadow-black/20 transition hover:brightness-110"
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
}
