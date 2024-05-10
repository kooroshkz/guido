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
                const tableRow = document.createElement('tr');
                const dateCell = document.createElement('td');
                const courseCell = document.createElement('td');
                const eventCell = document.createElement('td');
                
                dateCell.textContent = date.trim();
                courseCell.textContent = course.trim();
                eventCell.textContent = event.trim();
                
                tableRow.appendChild(dateCell);
                tableRow.appendChild(courseCell);
                tableRow.appendChild(eventCell);
                
                timeline.appendChild(tableRow);
            }
        });
    })
    .catch(error => console.error('Error fetching data:', error));
