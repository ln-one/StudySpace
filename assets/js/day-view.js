const dateLabel = document.querySelector('[data-date-label]');
const today = new Date();
const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

if (dateLabel) {
  dateLabel.textContent = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日  ${weekdays[today.getDay()]}`;
}

const currentLine = document.querySelector('.current-time');
if (currentLine) {
  const startHour = 8; // timetable starts at 8
  const nowMinutes = today.getHours() * 60 + today.getMinutes();
  const offsetMinutes = nowMinutes - startHour * 60;
  const pxPerMinute = 48 / 60;
  const y = offsetMinutes * pxPerMinute;
  currentLine.style.top = `${y}px`;
}
