const { ipcRenderer } = require('electron');

let settings = { username: '', token: '', theme: 'Light' };

let isDragging = false;

document.addEventListener('mousedown', (e) => {
  if (e.target.closest('.settings') || e.target.closest('button') || e.target.closest('input') || e.target.closest('select')) return;
  isDragging = true;
  ipcRenderer.send('start-drag', { x: e.screenX, y: e.screenY });
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    ipcRenderer.send('drag', { x: e.screenX, y: e.screenY });
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  ipcRenderer.send('save-bounds');
});

window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  ipcRenderer.send('show-context-menu');
});

ipcRenderer.on('toggle-settings', () => {
  const panel = document.getElementById('settings-panel');
  const yearLabel = document.getElementById('year-label');
  const graph = document.getElementById('graph');
  if (panel.style.display === 'none') {
    panel.style.display = 'block';
    yearLabel.style.display = 'none';
    graph.style.display = 'none';
    ipcRenderer.send('resize-window', 300);
  } else {
    panel.style.display = 'none';
    yearLabel.style.display = 'block';
    graph.style.display = 'grid';
    ipcRenderer.send('resize-window', 150);
  }
});

document.getElementById('save').addEventListener('click', () => {
    settings.username = document.getElementById('username').value;
    settings.token = document.getElementById('token').value;
    settings.theme = document.getElementById('theme').value;
    localStorage.setItem('settings', JSON.stringify(settings));
    applyTheme();
    fetchContributions();
    document.getElementById('settings-panel').style.display = 'none';
    document.getElementById('year-label').style.display = 'block';
    document.getElementById('graph').style.display = 'grid';
    ipcRenderer.send('resize-window', 150);
});

function applyTheme() {
    document.body.classList.toggle('dark', settings.theme === 'Dark');
    document.body.style.backgroundColor = settings.theme === 'Dark' ? 'rgba(43, 43, 43, 0)' : 'rgba(255, 255, 255, 0)';
}

function fetchContributions() {
    if (!settings.username) return;
    const query = `
    query($userName:String!) {
      user(login: $userName) {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
    `;
    const headers = { 'Content-Type': 'application/json', 'User-Agent': 'GitHub-Contributions-App' };
    if (settings.token) headers['Authorization'] = `Bearer ${settings.token}`;
    fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers,
        body: JSON.stringify({ query, variables: { userName: settings.username } })
    })
    .then(res => res.json())
    .then(data => {
        console.log('API Response:', data);
        const calendar = data.data?.user?.contributionsCollection?.contributionCalendar;
        if (calendar) {
            console.log('Calendar:', calendar);
            renderGraph(parseCalendar(calendar));
        } else {
            console.log('No calendar data');
            alert('No contribution data found. Check username and token.');
        }
    })
    .catch(err => console.error('Fetch error:', err));
}

function parseCalendar(calendar) {
    const contributions = {};
    calendar.weeks.forEach(week => {
        week.contributionDays.forEach(day => {
            contributions[day.date] = day.contributionCount;
        });
    });
    return contributions;
}

function renderGraph(contributions) {
    const graph = document.getElementById('graph');
    graph.innerHTML = '';
    const today = new Date();
    const startDate = new Date(today);
    startDate.setFullYear(today.getFullYear() - 1);
    // Find the Sunday of the week containing startDate
    const dayOfWeek = startDate.getDay(); // 0 = Sunday
    startDate.setDate(startDate.getDate() - dayOfWeek);
    let currentDate = new Date(startDate);
    const year = today.getFullYear();
    document.getElementById('year-label').textContent = `Contributions in ${year}`;
    for (let week = 0; week < 53; week++) {
        for (let day = 0; day < 7; day++) {
            const dateStr = currentDate.toISOString().split('T')[0];
            const count = contributions[dateStr] || 0;
            const level = getLevel(count);
            const div = document.createElement('div');
            div.className = `day level-${level}`;
            div.title = `Date: ${dateStr}, Contributions: ${count}`;
            graph.appendChild(div);
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }
}

function getLevel(count) {
    if (count === 0) return 0;
    if (count <= 3) return 1;
    if (count <= 6) return 2;
    if (count <= 9) return 3;
    return 4;
}

// Load settings on start
const saved = localStorage.getItem('settings');
const panel = document.getElementById('settings-panel');
const yearLabel = document.getElementById('year-label');
const graph = document.getElementById('graph');
if (saved) {
    settings = JSON.parse(saved);
    document.getElementById('username').value = settings.username;
    document.getElementById('token').value = settings.token;
    document.getElementById('theme').value = settings.theme;
    applyTheme();
    fetchContributions();
    panel.style.display = 'none';
    yearLabel.style.display = 'block';
    graph.style.display = 'grid';
    ipcRenderer.send('resize-window', 150);
} else {
    // Show settings if no saved
    panel.style.display = 'block';
    yearLabel.style.display = 'none';
    graph.style.display = 'none';
    ipcRenderer.send('resize-window', 300);
}