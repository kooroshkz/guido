fetch('timeline.csv')
    .then(response => response.text())
    .then(data => {
        const rows = data.split('\n').slice(1);
        const timeline = document.getElementById('timeline');
        const currentDate = new Date();

        rows.forEach(row => {
            const [date, course, event] = row.split(',');
            const eventDate = new Date(date.trim());
            
            if (eventDate >= currentDate) {
                const listItem = document.createElement('li');
                listItem.textContent = `${date.trim()} - ${course.trim()}: ${event.trim()}`;
                timeline.appendChild(listItem);
            }
        });
    })
    .catch(error => console.error('Error fetching data:', error));
