async function fetchUpdates() {
    try {
        const response = await fetch('https://api.sundered.net/api/updates');
        const updates = await response.json();

        const list = document.getElementById('updates-list');
        list.innerHTML = ''; // Clears old list

        if (updates.length === 0) {
            list.innerHTML = '<li>No updates available.</li>';
            return;
        }

        updates.forEach(update => {
            const item = document.createElement('li');
            item.className = 'update-card'; // Add a class for styling
            item.innerHTML = `
                <small class="update-date">${update.date}</small>
                <h3 class="update-title">${update.title}</h3>
                <p class="update-description">${update.description}</p>
            `;
            list.appendChild(item);
        });
    } catch (error) {
        console.error('Failed to fetch updates:', error);
        const list = document.getElementById('updates-list');
        list.innerHTML = '<li>Error loading updates. Please try again later.</li>';
    }
}
// Runs when page loads
fetchUpdates();


async function getLatestUpdate() {
    const response = await fetch('https://api.sundered.net/api/updates');
    const updates = await response.json();
    return updates[updates.length - 1]; // gets the last update
}


getLatestUpdate().then(update => {
    if (update) {
        const title = document.getElementById('latest-title');
        const span = document.getElementById('latest-update');
        const small = document.getElementById('latest-date');
        
        title.textContent = `${update.title}`
        span.textContent = `${update.description}`
        small.textContent = `(${update.date})`; 
    }
});

async function getLastThreeUpdates() {
    const response = await fetch('https://api.sundered.net/api/updates');
    const updates = await response.json();
    return updates.slice(-3); //returns last 3 updates
}

getLastThreeUpdates().then(updates => {
    const container = document.getElementById('last-three-updates');
    container.innerHTML = '';

    updates.forEach(update => {
        const div = document.createElement('div');
        div.innerHTML = `<h3>${update.title} <small>(${update.date})</small></h3>
                         <p>${update.description}</p>`;
        container.appendChild(div);
    });
});
