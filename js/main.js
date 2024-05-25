const API_URL = "https://bioapi.ocamurca.com";

async function fetchData(endpoint) {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        showLoader();
        const headerData = await fetchData('/header');
        const socialData = await fetchData('/social');
        const eventData = await fetchData('/event');
        const minibioData = await fetchData('/minibio');
        hideLoader();
        displayHeaderData(headerData);
        displaySocialLinks(socialData);
        displayEventData(eventData);
        displayMinibioData(minibioData);
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
});

async function displayHeaderData(data) {
    document.querySelector('#profile-photo').src = `data:image/jpeg;base64,${data.photo}`;
    document.querySelector('#profile-title').textContent = data.title;
    document.querySelector('#profile-subtitle').textContent = data.subtitle;
}

async function displayEventData(data) {
    document.querySelector('#event-image').src = `data:image/jpeg;base64,${data.image}`;
    document.querySelector('#event-button').href = data.url;
    document.querySelector('#event-button').className = 'button';
}


async function displaySocialLinks(data) {
    const container = document.getElementById('social-links');
    data.forEach(item => {
        const link = document.createElement('a');
        link.className = 'button';
        link.href = item.url;
        link.textContent = item.name;
        container.appendChild(link);
        container.appendChild(document.createElement('br'));
    });
}

async function displayMinibioData(data) {
    const container = document.getElementById('minibio-content');
    data.forEach(item => {
        const p = document.createElement('p');
        p.textContent = item.text;
        container.appendChild(p);
        container.appendChild(document.createElement('br'));
    });
}

function showLoader() {
    document.getElementById('loader').style.display = 'block';
}

function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}
