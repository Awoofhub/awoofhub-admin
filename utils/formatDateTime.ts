export function formatDateTime(date: string) {
  const d = new Date(date);

  const datePart = d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }); // "12/09/2026"

  const timePart = d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }); // "10:53 AM"

  return `${datePart} - ${timePart}`;
}