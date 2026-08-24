export function formatHistoryDateTime(dateString: string): string {
    const d = new Date(dateString);
    const day = d.getDate();
    const month = d.toLocaleString('en-US', { month: 'short' });
    const year = d.getFullYear();
    const time = d.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    return `${day} ${month} ${year}, ${time}`;
}