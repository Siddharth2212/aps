"use client";

import { useMemo, useState } from "react";

type Student = {
	name: string;
	usn: string;
	points: number;
	semester: number;
};

type ProctorGroup = {
	proctor: string;
	students: Student[];
};

const PROCTOR_GROUPS: ProctorGroup[] = [
	{
		proctor: "Tejashwini",
		students: [
			{ name: "Rakshitha M.K", usn: "1BM23CB042", points: 25, semester: 1 },
			{ name: "Drithi G", usn: "1BM23CB019", points: 29, semester: 1 },
			{ name: "Avani Manoria", usn: "1BM23CB006", points: 35, semester: 1 },
		],
	},
	{ proctor: "Gururaja H.S", students: [] },
	{ proctor: "Roopa S", students: [] },
	{ proctor: "Roopa S", students: [] },
];

const SEMESTERS = ["All", "Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6", "Semester 7", "Semester 8"];

export function ProctorStudentView() {
	const [selectedSemester, setSelectedSemester] = useState("All");
	const [openGroup, setOpenGroup] = useState<string | null>(PROCTOR_GROUPS[0]?.proctor ?? null);
	const [isSemesterMenuOpen, setIsSemesterMenuOpen] = useState(false);

	const filteredGroups = useMemo(
		() =>
			PROCTOR_GROUPS.map((group) => {
				const students =
					selectedSemester === "All"
						? group.students
						: group.students.filter((student) => `Semester ${student.semester}` === selectedSemester);
				return { ...group, students };
			}),
		[selectedSemester]
	);

	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<button
					type="button"
					className="w-full rounded-full bg-[#caa277] px-5 py-2 text-sm font-semibold text-[#2f1f0f] shadow-md shadow-black/30 transition hover:brightness-110 sm:w-auto"
				>
					upload excel sheet
				</button>
				<div className="relative w-full sm:w-auto">
					<button
						type="button"
						onClick={() => setIsSemesterMenuOpen((prev) => !prev)}
						className="flex w-full items-center justify-between gap-3 rounded-full bg-[#b6783f] px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#fdf7ee] shadow-md shadow-black/30 transition hover:brightness-110"
					>
						<span>semesters</span>
						<span className="text-lg leading-none">▾</span>
					</button>
					{isSemesterMenuOpen && (
						<ul className="absolute right-0 z-10 mt-2 w-44 overflow-hidden rounded-xl bg-white text-sm text-[#2f1f0f] shadow-lg shadow-black/40">
							{SEMESTERS.map((option) => (
								<li key={option}>
									<button
										type="button"
										onClick={() => {
											setSelectedSemester(option);
											setIsSemesterMenuOpen(false);
										}}
										className={`flex w-full px-4 py-2 text-left transition hover:bg-[#f6e2c6] ${
											selectedSemester === option ? "bg-[#f1d2a8] font-semibold" : ""
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
				{filteredGroups.map((group, index) => {
					const isOpen = openGroup === group.proctor;
					return (
						<div
							key={`${group.proctor}-${index}`}
							className="rounded-3xl bg-gradient-to-r from-[#f8d9b8] via-[#d9ab79] to-[#b6783f] p-[2px] shadow-md shadow-black/40"
						>
							<div className="rounded-[26px] bg-[#111111] p-1">
								<button
									type="button"
									onClick={() => setOpenGroup(isOpen ? null : group.proctor)}
									className="flex w-full items-center justify-between rounded-[24px] bg-gradient-to-r from-[#f8d9b8] via-[#d9ab79] to-[#c68a4f] px-6 py-4 text-left text-lg font-semibold text-[#3d2a15] transition hover:brightness-105"
								>
									<span>Proctor - {group.proctor}</span>
									<span className="text-[#3d2a15]/70">{isOpen ? "▴" : "▾"}</span>
								</button>

								{isOpen && (
									<div className="mx-4 mb-4 mt-3 rounded-2xl bg-gradient-to-r from-[#f3d5ae] via-[#e2bf90] to-[#c98a53] px-6 py-5 text-[#2f1f0f] shadow-inner shadow-black/20">
										{group.students.length === 0 ? (
											<div className="rounded-xl border border-dashed border-[#b6783f] bg-white/70 px-4 py-6 text-center text-sm font-medium text-[#5b4327]">
												No students for the selected semester.
											</div>
										) : (
											<ul className="flex flex-col gap-3 text-sm font-medium">
												{group.students.map((student) => (
													<li
														key={student.usn}
														className="flex flex-wrap items-center gap-3 rounded-xl bg-white/70 px-4 py-3 text-[#3b2715] shadow shadow-black/10"
													>
														<span>{student.name}</span>
														<span className="text-[#9c6e36]">-&gt;</span>
														<span>{student.usn}</span>
														<span className="text-[#9c6e36]">-&gt;</span>
														<span className="font-semibold">Points : {student.points}</span>
													</li>
												))}
											</ul>
										)}
									</div>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
