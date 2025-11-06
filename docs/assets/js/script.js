// Simple mobile menu toggle
document.querySelector('.hamburger')?.addEventListener('click', () => {
  const nav = document.querySelector('.main-nav');
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});

// Load mock data or connect to backend API
async function loadSectionData() {
  try {
    // Replace with your real API endpoints later, e.g. /api/news
    const newsRes = await fetch('mock/news.json'); 
    const announceRes = await fetch('mock/announce.json');
    const feedbackRes = await fetch('mock/feedback.json');

    const news = await newsRes.json();
    const announce = await announceRes.json();
    const feedback = await feedbackRes.json();

    fillList('news-list', news);
    fillList('announce-list', announce);
    fillList('feedback-list', feedback);
  } catch (err) {
    console.error('Failed to load data:', err);
  }
}

// Insert JSON data into list elements
function fillList(id, data) {
  const list = document.getElementById(id);
  list.innerHTML = data.map(item =>
    `<li><span>${item.title}</span><span class="news-date">${item.date}</span></li>`
  ).join('');
}

// Run after page loaded
window.addEventListener('DOMContentLoaded', loadSectionData);
