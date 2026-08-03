import { Offer } from "@/types/offer";

export function buildWeeklyOfferData(offers: Offer[], range: "week" | "month") {
    const now = new Date();

    if (range === "week") {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);

        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return days.map((label, i) => {
            const dayStart = new Date(startOfWeek);
            dayStart.setDate(startOfWeek.getDate() + i);
            const dayEnd = new Date(dayStart);
            dayEnd.setDate(dayStart.getDate() + 1);

            const count = offers.filter((o) => {
                const d = new Date(o.createdAt);
                return d >= dayStart && d < dayEnd;
            }).length;

            return { label, offers: count };
        });
    }

    const weeks: { label: string; offers: number }[] = [];
    for (let i = 4; i >= 0; i--) {
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay() - i * 7);
        weekStart.setHours(0, 0, 0, 0);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 7);

        const count = offers.filter((o) => {
            const d = new Date(o.createdAt);
            return d >= weekStart && d < weekEnd;
        }).length;

        weeks.push({ label: `Week ${5 - i}`, offers: count });
    }

    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthTotal = offers.filter((o) => new Date(o.createdAt) >= monthStart).length;
    weeks.push({ label: "This month", offers: monthTotal });

    return weeks;
}