"use client";

import { useMemo, useState } from "react";

type Student = {
	name: string;
	semester: number;
	currentPoints: number;
	lastEvent: string;
	lastPoints: number;
};

const STUDENTS: Student[] = [
	{ name: "Rakshitha", semester: 6, currentPoints: 42, lastEvent: "Tech Symposium", lastPoints: 10 },
	{ name: "Drithi", semester: 4, currentPoints: 20, lastEvent: "Hackathon", lastPoints: 8 },
	{ name: "Avani", semester: 2, currentPoints: 15, lastEvent: "Cultural Fest", lastPoints: 5 },
	{ name: "Nisha", semester: 8, currentPoints: 55, lastEvent: "Research Workshop", lastPoints: 12 },
];

const SEMESTERS = ["All", "Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6", "Semester 7", "Semester 8"];

export function StudentListView() {
	const [selectedSemester, setSelectedSemester] = useState<string>("All");
	const [openSemesterMenu, setOpenSemesterMenu] = useState(false);
	const [expanded, setExpanded] = useState<string | null>(null);
	const [formValues, setFormValues] = useState(() =>
		STUDENTS.reduce<Record<string, { eventName: string; activityPoints: string }>>((acc, student) => {
			acc[student.name] = {
				eventName: student.lastEvent,
				activityPoints: student.lastPoints.toString(),
			};
			return acc;
		}, {})
	);

	const filteredStudents = useMemo(() => {
		if (selectedSemester === "All") return STUDENTS;
		const semesterNumber = Number(selectedSemester.replace("Semester ", ""));
		return STUDENTS.filter((student) => student.semester === semesterNumber);
	}, [selectedSemester]);

	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center justify-end">
				<div className="relative">
					<button
						type="button"
						onClick={() => setOpenSemesterMenu((prev) => !prev)}
						className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e6d3b5] via-[#d1ad7d] to-[#b6783f] px-5 py-2 text-sm font-semibold text-[#3d2a15] shadow-md shadow-[#000000]/30 transition hover:brightness-110"
					>
						<span className="text-xs font-semibold uppercase tracking-[0.2em]">semesters</span>
						<span className="text-[#3d2a15]/70">▾</span>
					</button>
					{openSemesterMenu && (
						<ul className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl bg-[#f4e1c4] text-sm text-[#3d2a15] shadow-lg shadow-black/30">
							{SEMESTERS.map((option) => (
								<li key={option}>
									<button
										type="button"
										onClick={() => {
											setSelectedSemester(option);
											setOpenSemesterMenu(false);
											setExpanded(null);
										}}
										className={`flex w-full px-4 py-2 text-left transition hover:bg-[#e7cfa7] ${
											selectedSemester === option ? "bg-[#dec092] font-semibold" : ""
										}`}
									>
										{option}
									</button>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>

			<div className="flex flex-col gap-4">
				{filteredStudents.map((student) => {
					const isActive = expanded === student.name;
					return (
						<div key={student.name} className="rounded-3xl bg-gradient-to-b from-[#f3dec2] via-[#e2c69c] to-[#b6783f]/80 p-[2px] shadow-md shadow-black/30">
							<div className="rounded-[26px] bg-[#111111] p-1">
								<button
									type="button"
									onClick={() => setExpanded(isActive ? null : student.name)}
									className="flex w-full items-center justify-between rounded-[24px] bg-gradient-to-r from-[#f3dec2] via-[#e2c69c] to-[#c59057] px-6 py-4 text-left text-lg font-semibold text-[#3d2a15] transition hover:brightness-105"
								>
									<span>{student.name}</span>
									<span className="text-[#3d2a15]/70">{isActive ? "▴" : "▾"}</span>
								</button>

								{isActive && (
									<form
										onSubmit={(event) => {
											event.preventDefault();
										}}
										className="mx-4 mb-4 mt-3 rounded-2xl bg-[#f6f1e7] px-6 py-5 text-[#2f1f0f] shadow-inner shadow-black/10"
									>
										<div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#373027]">
											<span>➜</span>
											<span>current activity points : {student.currentPoints}</span>
										</div>
										<div className="mt-4 flex flex-col gap-3 text-sm">
											<button
												type="button"
												className="flex w-fit items-center gap-2 rounded-full bg-[#1fb26d] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow shadow-black/20 transition hover:brightness-110"
											>
												<span className="text-base leading-none">⇩</span>
												<span>ext docs</span>
											</button>
											<label className="flex flex-col gap-2">
												<span className="text-xs uppercase text-[#7a6247]">Event name</span>
												<input
													type="text"
													value={formValues[student.name]?.eventName ?? ""}
													onChange={(event) =>
														setFormValues((prev) => ({
															...prev,
															[student.name]: {
																...prev[student.name],
																eventName: event.target.value,
															},
														}))
													}
													className="rounded-lg border border-dashed border-[#c7a684] bg-white/90 px-3 py-2 text-base font-medium text-[#3b2715] focus:outline-none focus:ring-2 focus:ring-[#b6783f]"
												/>
											</label>
											<label className="flex flex-col gap-2">
												<span className="text-xs uppercase text-[#7a6247]">Activity points</span>
												<input
													type="number"
													min={0}
													value={formValues[student.name]?.activityPoints ?? ""}
													onChange={(event) =>
														setFormValues((prev) => ({
															...prev,
															[student.name]: {
																...prev[student.name],
																activityPoints: event.target.value,
															},
														}))
													}
													className="rounded-lg border border-dashed border-[#c7a684] bg-white/90 px-3 py-2 text-base font-medium text-[#3b2715] focus:outline-none focus:ring-2 focus:ring-[#b6783f]"
												/>
											</label>
										</div>
										<div className="mt-5 flex justify-end">
											<button
												type="submit"
												className="rounded-full bg-gradient-to-r from-[#e6d3b5] via-[#d1ad7d] to-[#b6783f] px-6 py-2 text-sm font-semibold text-[#3d2a15] shadow shadow-black/20 transition hover:brightness-110"
											>
												Submit
											</button>
										</div>
									</form>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
