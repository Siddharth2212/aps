const STUDENTS = [
	{ name: "Shruti Agarwal", usn: "1RV20CS101", email: "shruti.agarwal@rvu.edu", semester: "Sem 4", department: "CSE" },
	{ name: "Mohammed Imran", usn: "1RV20CS045", email: "m.imran@rvu.edu", semester: "Sem 4", department: "CSE" },
	{ name: "Megha N", usn: "1RV20ECE033", email: "megha.n@rvu.edu", semester: "Sem 6", department: "ECE" },
	{ name: "Rachit Raj", usn: "1RV20ME021", email: "rachit.raj@rvu.edu", semester: "Sem 2", department: "Mechanical" },
	{ name: "Ananya Sharma", usn: "1RV19BBA014", email: "ananya.sharma@rvu.edu", semester: "Sem 8", department: "BBA" },
];

export default function EventStudents() {
	return (
		<section className="rounded-3xl border border-[#b87333] bg-[#f5f2ed] p-6 shadow-lg shadow-black/20">
			<h2 className="text-xl font-semibold text-[#321d09]">Event Students</h2>
			<div className="mt-6 overflow-x-auto">
				<table className="min-w-full table-fixed border-collapse text-sm text-[#321d09]">
					<thead>
						<tr className="bg-[#c59357] text-left font-semibold uppercase tracking-wide text-[#2a1406]">
							<th className="border border-[#b87333] px-4 py-3">Students</th>
							<th className="border border-[#b87333] px-4 py-3">USN</th>
							<th className="border border-[#b87333] px-4 py-3">Email</th>
							<th className="border border-[#b87333] px-4 py-3">Semester</th>
							<th className="border border-[#b87333] px-4 py-3">Department</th>
						</tr>
					</thead>
					<tbody>
						{STUDENTS.map((student, index) => (
							<tr key={student.usn} className={index === 2 ? "bg-[#d3f0ff]" : "bg-[#f1f1f1]"}>
								<td className="border border-[#b87333] px-4 py-3 font-medium">{student.name}</td>
								<td className="border border-[#b87333] px-4 py-3">{student.usn}</td>
								<td className="border border-[#b87333] px-4 py-3">{student.email}</td>
								<td className="border border-[#b87333] px-4 py-3">{student.semester}</td>
								<td className="border border-[#b87333] px-4 py-3">{student.department}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
}
