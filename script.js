const filters = document.querySelectorAll('.filter');
const activities = document.querySelectorAll('.activity-item');
const toast = document.querySelector('#toast');
const recordButton = document.querySelector('#record-button');

filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    const selected = filter.dataset.filter;
    filters.forEach((item) => {
      const isActive = item === filter;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-selected', String(isActive));
    });
    activities.forEach((activity) => {
      const visible = selected === 'all' || activity.dataset.kind === selected;
      activity.hidden = !visible;
    });
  });
});

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

recordButton.addEventListener('click', () => {
  window.location.assign('/demo.html');
});

document.querySelector('.round-button').addEventListener('click', () => {
  showToast('A small menu would open here — no account or data is needed for this prototype.');
});
