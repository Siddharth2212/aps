export type EventCard = {
	id: string;
	semester: string;
	title: string;
	venue: string;
	status: "active" | "registered";
	category: "external" | "internal";
};

export type SemesterMetadata = {
	label: string;
	counts: { all: number; mine: number };
};

export type ActivityDistributionItem = {
	label: string;
	value: number;
	color: string;
};

export type CategoryOption = {
	label: string;
	value: "external" | "internal";
};

const baseEvent = {
	title: "Web dev workshop",
	venue: "PJ BLOCK 605 6th FLOOR",
};

export const semesterMetadata: SemesterMetadata[] = [
	{ label: "Sem 1", counts: { all: 10, mine: 2 } },
	{ label: "Sem 2", counts: { all: 5, mine: 1 } },
	{ label: "Sem 3", counts: { all: 35, mine: 0 } },
	{ label: "Sem 4", counts: { all: 20, mine: 4 } },
	{ label: "Sem 5", counts: { all: 0, mine: 0 } },
	{ label: "Sem 6", counts: { all: 0, mine: 0 } },
	{ label: "Sem 7", counts: { all: 0, mine: 0 } },
	{ label: "Sem 8", counts: { all: 0, mine: 0 } },
];

export const allEvents: EventCard[] = Array.from({ length: 6 }, (_, index) => ({
	id: `all-sem4-${index}`,
	semester: "Sem 4",
	title: baseEvent.title,
	venue: baseEvent.venue,
	status: "active",
	category: index % 2 === 0 ? "external" : "internal",
}));

export const myEvents: EventCard[] = Array.from({ length: 4 }, (_, index) => ({
	id: `my-sem4-${index}`,
	semester: "Sem 4",
	title: baseEvent.title,
	venue: baseEvent.venue,
	status: "registered",
	category: index < 2 ? "external" : "internal",
}));

export const activityDistribution: ActivityDistributionItem[] = [
	{ label: "Societal needs and development", value: 5, color: "#b68c5a" },
	{ label: "Environment and sustainability", value: 3, color: "#63c37d" },
	{ label: "IT & Coding", value: 12, color: "#3b82f6" },
	{ label: "Creativity & Innovation", value: 6, color: "#f97316" },
	{ label: "Sports & Fitness", value: 4, color: "#f43f5e" },
	{ label: "Leadership", value: 5, color: "#a855f7" },
];

export const totalPoints = activityDistribution.reduce((sum, item) => sum + item.value, 0);

export const CATEGORY_OPTIONS: CategoryOption[] = [
	{ label: "External", value: "external" },
	{ label: "Internal", value: "internal" },
];

export const publishedEvents: EventCard[] = Array.from({ length: 3 }, (_, index) => ({
	id: `published-sem4-${index}`,
	semester: "Sem 4",
	title: baseEvent.title,
	venue: baseEvent.venue,
	status: "active",
	category: "internal",
}));
