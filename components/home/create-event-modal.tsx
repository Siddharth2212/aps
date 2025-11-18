"use client";

import { useState } from "react";

type CreateEventModalProps = {
	open: boolean;
	onClose: () => void;
};

const fields = [
	{ label: "Name :", type: "text", placeholder: "Enter event name" },
	{ label: "Description:", type: "textarea", placeholder: "Describe the event" },
	{ label: "Venue:", type: "text", placeholder: "Event venue" },
	{ label: "Date:", type: "date", placeholder: "" },
	{ label: "Time:", type: "time", placeholder: "" },
	{ label: "Department:", type: "text", placeholder: "Department name" },
	{ label: "Activity Points:", type: "number", placeholder: "Points" },
	{ label: "Category", type: "select", placeholder: "" },
];

type RoleExtensionRow = {
	id: string;
	name: string;
	usn: string;
	email: string;
	semester: string;
	department: string;
	fromDate: string;
	fromTime: string;
	toDate: string;
	toTime: string;
};

export function CreateEventModal({ open, onClose }: CreateEventModalProps) {
	const [roleRows, setRoleRows] = useState<RoleExtensionRow[]>([]);

	const createEmptyRow = (): RoleExtensionRow => ({
		id: Math.random().toString(36).slice(2),
		name: "",
		usn: "",
		email: "",
		semester: "",
		department: "",
		fromDate: "",
		fromTime: "",
		toDate: "",
		toTime: "",
	});

	const addRoleRow = () => setRoleRows((rows) => [...rows, createEmptyRow()]);
	const ensureRoleRows = () => {
		if (roleRows.length === 0) addRoleRow();
	};

	const updateRoleRow = <K extends keyof RoleExtensionRow>(id: string, key: K, value: RoleExtensionRow[K]) =>
		setRoleRows((rows) => rows.map((row) => (row.id === id ? { ...row, [key]: value } : row)));

	const deleteRoleRow = (id: string) =>
		setRoleRows((rows) => rows.filter((row) => row.id !== id));

	if (!open) return null;

	return (
		<div style={{maxHeight: '90vh', overflowY: 'scroll', paddingTop: 200}} className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 px-4 py-8">
			<div className="relative w-full max-w-5xl rounded-3xl border border-[#1d1d1d]/20 bg-[#efe4d4] p-8 text-[#1f1409] shadow-2xl">
				<button
					type="button"
					onClick={onClose}
					className="absolute right-6 top-6 text-2xl font-semibold text-[#b6783f] transition hover:scale-110"
					aria-label="Close"
				>
					×
				</button>

				<h2 className="text-center text-2xl font-semibold tracking-wide text-[#1f1409]">CREATE EVENT</h2>

				<form
					onSubmit={(event) => {
						event.preventDefault();
						onClose();
					}}
					className="mt-6 rounded-[26px] border-2 border-[#1a9eff] bg-[#d0ac85] p-8"
				>
					<div className="grid gap-4">
						{fields.map((field) => (
							<label key={field.label} className="flex flex-col gap-2 text-sm font-semibold text-[#1f1409] sm:flex-row sm:items-center">
								<span className="w-36">{field.label}</span>
								{field.type === "textarea" ? (
									<textarea
										required
										placeholder={field.placeholder}
										className="h-24 w-full rounded-lg border border-[#c28b51] bg-[#f1e3d3] px-3 py-2 text-sm text-[#3d2a15] outline-none focus:border-[#1a9eff]"
									/>
								) : field.type === "select" ? (
									<select
										required
										className="w-full rounded-lg border border-[#c28b51] bg-[#f1e3d3] px-3 py-2 text-sm text-[#3d2a15] outline-none focus:border-[#1a9eff]"
									>
										<option value="">Select</option>
										<option value="external">External</option>
										<option value="internal">Internal</option>
									</select>
								) : (
									<input
										required
										type={field.type}
										placeholder={field.placeholder}
										className="w-full rounded-lg border border-[#c28b51] bg-[#f1e3d3] px-3 py-2 text-sm text-[#3d2a15] outline-none focus:border-[#1a9eff]"
									/>
								)}
							</label>
						))}
					</div>

					<div className="mt-12 flex items-center justify-between">
						<button
							type="button"
							onClick={ensureRoleRows}
							className="cursor-pointer rounded-lg bg-[#f6ead9] px-6 py-2 text-xs font-semibold uppercase tracking-wide text-[#c47828] shadow-md shadow-[#000000]/10"
						>
							Role Extension
						</button>
						<button
							type="submit"
							className="cursor-pointer rounded-lg bg-[#f6ead9] px-6 py-2 text-xs font-semibold uppercase tracking-wide text-[#c47828] shadow-md shadow-[#000000]/10"
						>
							Create
						</button>
					</div>
				</form>

				{roleRows.length > 0 && (
					<section className="mt-8 space-y-4">
						<div className="flex justify-end">
							<button
								type="button"
								onClick={addRoleRow}
								className="rounded-full bg-[#b6783f] px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-md shadow-[#000000]/20 transition hover:brightness-110"
							>
								+ Add Row
							</button>
						</div>
						<div className="max-h-[360px] overflow-y-auto overflow-x-auto rounded-2xl border border-[#c28b51] bg-[#cfa168]">
							<table className="min-w-full table-fixed text-sm text-[#3d2a15]">
								<thead className="text-left text-xs font-semibold uppercase tracking-wide text-white">
									<tr className="bg-[#b88a4e]">
										<th className="rounded-tl-2xl px-4 py-3">Student Name</th>
										<th className="px-4 py-3">USN</th>
										<th className="px-4 py-3">Email</th>
										<th className="px-4 py-3">Semester</th>
										<th className="px-4 py-3">Department</th>
										<th className="px-4 py-3">From Date &amp; Time</th>
										<th className="px-4 py-3">To Date &amp; Time</th>
										<th className="rounded-tr-2xl px-4 py-3 text-center">Action</th>
									</tr>
								</thead>
								<tbody className="bg-[#f7f1e8]">
									{roleRows.map((row) => (
										<tr key={row.id} className="border-b border-[#e4d2be]">
											<td className="px-4 py-3">
												<input
													value={row.name}
													onChange={(event) => updateRoleRow(row.id, "name", event.target.value)}
													placeholder="Student Name"
													className="w-full rounded-md border border-[#d9c4a8] bg-white px-3 py-2 text-xs text-[#3d2a15] outline-none focus:border-[#1a9eff]"
												/>
											</td>
											<td className="px-4 py-3">
												<input
													value={row.usn}
													onChange={(event) => updateRoleRow(row.id, "usn", event.target.value)}
													placeholder="USN"
													className="w-full rounded-md border border-[#d9c4a8] bg-white px-3 py-2 text-xs text-[#3d2a15] outline-none focus:border-[#1a9eff]"
												/>
											</td>
											<td className="px-4 py-3">
												<input
													value={row.email}
													onChange={(event) => updateRoleRow(row.id, "email", event.target.value)}
													type="email"
													placeholder="Email"
													className="w-full rounded-md border border-[#d9c4a8] bg-white px-3 py-2 text-xs text-[#3d2a15] outline-none focus:border-[#1a9eff]"
												/>
											</td>
											<td className="px-4 py-3">
												<input
													value={row.semester}
													onChange={(event) => updateRoleRow(row.id, "semester", event.target.value)}
													placeholder="Semester"
													className="w-full rounded-md border border-[#d9c4a8] bg-white px-3 py-2 text-xs text-[#3d2a15] outline-none focus:border-[#1a9eff]"
												/>
											</td>
											<td className="px-4 py-3">
												<input
													value={row.department}
													onChange={(event) => updateRoleRow(row.id, "department", event.target.value)}
													placeholder="Department"
													className="w-full rounded-md border border-[#d9c4a8] bg-white px-3 py-2 text-xs text-[#3d2a15] outline-none focus:border-[#1a9eff]"
												/>
											</td>
											<td className="px-4 py-3">
												<div className="grid grid-cols-2 gap-2">
													<input
														value={row.fromDate}
														onChange={(event) => updateRoleRow(row.id, "fromDate", event.target.value)}
														type="date"
														className="w-full rounded-md border border-[#d9c4a8] bg-white px-3 py-2 text-xs text-[#3d2a15] outline-none focus:border-[#1a9eff]"
													/>
													<input
														value={row.fromTime}
														onChange={(event) => updateRoleRow(row.id, "fromTime", event.target.value)}
														type="time"
														className="w-full rounded-md border border-[#d9c4a8] bg-white px-3 py-2 text-xs text-[#3d2a15] outline-none focus:border-[#1a9eff]"
													/>
												</div>
											</td>
											<td className="px-4 py-3">
												<div className="grid grid-cols-2 gap-2">
													<input
														value={row.toDate}
														onChange={(event) => updateRoleRow(row.id, "toDate", event.target.value)}
														type="date"
														className="w-full rounded-md border border-[#d9c4a8] bg-white px-3 py-2 text-xs text-[#3d2a15] outline-none focus:border-[#1a9eff]"
													/>
													<input
														value={row.toTime}
														onChange={(event) => updateRoleRow(row.id, "toTime", event.target.value)}
														type="time"
														className="w-full rounded-md border border-[#d9c4a8] bg-white px-3 py-2 text-xs text-[#3d2a15] outline-none focus:border-[#1a9eff]"
													/>
												</div>
											</td>
											<td className="px-4 py-3 text-center">
												<button
													type="button"
													onClick={() => deleteRoleRow(row.id)}
													className="rounded-md bg-[#e34d4f] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-sm transition hover:brightness-110"
												>
													Delete
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</section>
				)}
			</div>
		</div>
	);
}
