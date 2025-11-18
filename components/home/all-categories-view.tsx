"use client";

import { useState } from "react";

type CategoryRow = {
	id: number;
	subActivity: string;
	duration: string;
	document: string;
	maxPoints: number;
};

type CategorySection = {
	title: string;
	rows: CategoryRow[];
};

const INITIAL_CATEGORY_SECTIONS: CategorySection[] = [
	{
		title: "Technical Events",
		rows: [
			{ id: 1, subActivity: "Hackathon Participation", duration: "1/2", document: "Letter of Appreciation or Recognition", maxPoints: 20 },
			{ id: 2, subActivity: "Coding Competition", duration: "1/2", document: "Letter of Appreciation or Recognition", maxPoints: 15 },
			{ id: 3, subActivity: "Tech Workshop", duration: "1/2", document: "Letter of Appreciation or Recognition", maxPoints: 10 },
			{ id: 4, subActivity: "Seminar Attendance", duration: "1/2", document: "Letter of Appreciation or Recognition", maxPoints: 5 },
		],
	},
	{
		title: "Sports & Games",
		rows: [],
	},
	{
		title: "Cultural Events",
		rows: [],
	},
];

export function AllCategoriesView() {
	const [sections, setSections] = useState<CategorySection[]>(INITIAL_CATEGORY_SECTIONS);
	const [openSection, setOpenSection] = useState<string>(INITIAL_CATEGORY_SECTIONS[0]?.title ?? "");
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [newCategoryTitle, setNewCategoryTitle] = useState("");
	const [newRows, setNewRows] = useState<Array<{ key: string; subActivity: string; duration: string; document: string; maxPoints: string }>>([
		{ key: Math.random().toString(36).slice(2), subActivity: "", duration: "", document: "", maxPoints: "" },
	]);

	const handleAddRow = () =>
		setNewRows((prev) => [...prev, { key: Math.random().toString(36).slice(2), subActivity: "", duration: "", document: "", maxPoints: "" }]);

	const handleRowChange = (key: string, field: "subActivity" | "duration" | "document" | "maxPoints", value: string) =>
		setNewRows((prev) => prev.map((row) => (row.key === key ? { ...row, [field]: value } : row)));

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const title = newCategoryTitle.trim() || "Untitled Category";
		const rows: CategoryRow[] = newRows.map((row, index) => ({
			id: index + 1,
			subActivity: row.subActivity.trim() || "—",
			duration: row.duration.trim() || "—",
			document: row.document.trim() || "—",
			maxPoints: Number(row.maxPoints) || 0,
		}));

		setSections((prev) => [...prev, { title, rows }]);
		setOpenSection(title);
		setIsFormOpen(false);
		setNewCategoryTitle("");
		setNewRows([{ key: Math.random().toString(36).slice(2), subActivity: "", duration: "", document: "", maxPoints: "" }]);
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between rounded-3xl border border-[#caa277]/40 bg-[#101010] px-8 py-5 text-[#f5e6d4]">
				<h2 className="text-2xl font-semibold">Activity Categories</h2>
				<button
					type="button"
					onClick={() => setIsFormOpen((prev) => !prev)}
					className="flex items-center gap-2 rounded-full bg-[#c59a5e] px-5 py-2 text-sm font-semibold text-[#2f1f0f] shadow-md shadow-black/30 transition hover:brightness-110"
				>
					<span className="text-lg leading-none">＋</span>
					Add Category
				</button>
			</div>

			{isFormOpen && (
				<form
					onSubmit={handleSubmit}
					className="rounded-3xl border border-[#d4b07b]/60 bg-[#fdf4e4] px-8 py-6 text-[#2f1f0f] shadow-md shadow-black/20"
				>
					<div className="flex flex-col gap-4">
						<label className="flex flex-col gap-2">
							<span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a6247]">Category Title</span>
							<input
								type="text"
								value={newCategoryTitle}
								onChange={(event) => setNewCategoryTitle(event.target.value)}
								className="rounded-2xl border border-dashed border-[#d4b07b] bg-white/80 px-4 py-3 text-base font-medium text-[#3b2715] focus:outline-none focus:ring-2 focus:ring-[#b6783f]"
							/>
						</label>

						<div className="flex flex-col gap-3">
							<span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a6247]">Sub Activities</span>
							{newRows.map((row, index) => (
								<div key={row.key} className="rounded-2xl border border-[#e2c298] bg-white px-4 py-4">
									<div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-[#7a6247]">
										<span>Entry {index + 1}</span>
									</div>
									<div className="grid gap-3 md:grid-cols-2">
										<label className="flex flex-col gap-1 text-sm">
											<span>Sub Activity Head</span>
											<input
												type="text"
												value={row.subActivity}
												onChange={(event) => handleRowChange(row.key, "subActivity", event.target.value)}
												className="rounded-xl border border-dashed border-[#c7a684] bg-white/90 px-3 py-2 text-[#3b2715] focus:outline-none focus:ring-2 focus:ring-[#b6783f]"
											/>
										</label>
										<label className="flex flex-col gap-1 text-sm">
											<span>Duration in Weeks</span>
											<input
												type="text"
												value={row.duration}
												onChange={(event) => handleRowChange(row.key, "duration", event.target.value)}
												className="rounded-xl border border-dashed border-[#c7a684] bg-white/90 px-3 py-2 text-[#3b2715] focus:outline-none focus:ring-2 focus:ring-[#b6783f]"
											/>
										</label>
										<label className="flex flex-col gap-1 text-sm md:col-span-2">
											<span>Document as Evidence</span>
											<input
												type="text"
												value={row.document}
												onChange={(event) => handleRowChange(row.key, "document", event.target.value)}
												className="rounded-xl border border-dashed border-[#c7a684] bg-white/90 px-3 py-2 text-[#3b2715] focus:outline-none focus:ring-2 focus:ring-[#b6783f]"
											/>
										</label>
										<label className="flex flex-col gap-1 text-sm">
											<span>Maximum Points</span>
											<input
												type="number"
												min={0}
												value={row.maxPoints}
												onChange={(event) => handleRowChange(row.key, "maxPoints", event.target.value)}
												className="rounded-xl border border-dashed border-[#c7a684] bg-white/90 px-3 py-2 text-[#3b2715] focus:outline-none focus:ring-2 focus:ring-[#b6783f]"
											/>
										</label>
									</div>
								</div>
							))}

							<button
								type="button"
								onClick={handleAddRow}
								className="flex w-fit items-center gap-2 rounded-full bg-[#1fb26d] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow shadow-black/20 transition hover:brightness-110"
							>
								<span className="text-base leading-none">＋</span>
								<span>Add Subcategory</span>
							</button>
						</div>

						<div className="flex justify-end gap-3 pt-2">
							<button
								type="button"
								onClick={() => {
									setIsFormOpen(false);
									setNewCategoryTitle("");
									setNewRows([{ key: Math.random().toString(36).slice(2), subActivity: "", duration: "", document: "", maxPoints: "" }]);
								}}
								className="rounded-full border border-[#b6783f] px-5 py-2 text-sm font-semibold text-[#b6783f] transition hover:brightness-110"
							>
								Cancel
							</button>
							<button
								type="submit"
								className="rounded-full bg-gradient-to-r from-[#e6d3b5] via-[#d1ad7d] to-[#b6783f] px-6 py-2 text-sm font-semibold text-[#3d2a15] shadow shadow-black/20 transition hover:brightness-110"
							>
								Create Category
							</button>
						</div>
					</div>
				</form>
			)}

			<div className="overflow-hidden rounded-3xl border border-[#c29d68]/40">
				{sections.map((section, index) => {
					const isOpen = openSection === section.title;
					return (
						<div key={section.title} className={`${index !== 0 ? "border-t border-[#1c140a]" : ""}`}>
							<button
								type="button"
								onClick={() => setOpenSection(isOpen ? "" : section.title)}
								className="flex w-full items-center justify-between bg-[#c29d68] px-6 py-4 text-left text-lg font-semibold text-[#2f1f0f] transition hover:brightness-105"
							>
								<span>{section.title}</span>
								<span className="text-[#2f1f0f]/70">{isOpen ? "▴" : "▾"}</span>
							</button>

							{isOpen && (
								<div className="bg-[#fdf7ee] px-6 py-5">
									{section.rows.length === 0 ? (
										<div className="rounded-2xl border border-dashed border-[#d4b07b] bg-white/70 px-4 py-6 text-center text-sm font-medium text-[#5b4327]">
											No activities added yet.
										</div>
									) : (
										<div className="overflow-hidden rounded-2xl border border-[#d4b07b] bg-white shadow-sm shadow-black/10">
											<table className="w-full border-collapse text-sm text-[#2f1f0f]">
												<thead className="bg-[#f1dfc5] uppercase tracking-[0.15em] text-xs text-[#4a351e]">
													<tr>
														<th className="px-4 py-3 text-left font-semibold">Sl. No.</th>
														<th className="px-4 py-3 text-left font-semibold">Sub Activity Head</th>
														<th className="px-4 py-3 text-left font-semibold">Duration in Weeks</th>
														<th className="px-4 py-3 text-left font-semibold">Document as Evidence</th>
														<th className="px-4 py-3 text-left font-semibold">Maximum Activity Points</th>
													</tr>
												</thead>
												<tbody>
													{section.rows.map((row) => (
														<tr key={row.id} className="border-t border-[#efd6b3] bg-white/90">
															<td className="px-4 py-3 font-semibold">{row.id}</td>
															<td className="px-4 py-3">{row.subActivity}</td>
															<td className="px-4 py-3">{row.duration}</td>
															<td className="px-4 py-3">{row.document}</td>
															<td className="px-4 py-3 font-semibold text-[#9b6a2c]">{row.maxPoints}</td>
														</tr>
													))}
												</tbody>
											</table>
										</div>
									)}
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
