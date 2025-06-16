async function fetchUpdates() {
    try {
        const response = await fetch('https://api.sundered.net/api/updates');
        const updates = await response.json();

        const list = document.getElementById('updates-list');
        list.innerHTML = ''; //Clears old list

        updates.forEach(update => {
            const item = document.createElement('li');
            item.innerHTML = `<strong>${update.title}</strong> (${update.date}): ${update.description}`;
            list.appendChild(item);
        });
    } catch (error) {
        console.error('Failed to fetch updates:', error);
    }
}
//Runs when page loads
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
