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


    function updateCharacterCount() {
        const input = document.getElementById('chatInput');
        const charCount = document.getElementById('charCount');
        charCount.textContent = `${input.value.length}/50`;
    }
    
    async function askQuestion() {
        const input = document.getElementById('chatInput').value;
        const responseDiv = document.getElementById('response');
    
        if (input.length > 50) {
            responseDiv.textContent = 'Input exceeds 50 characters.';
            return;
        }
    
        responseDiv.textContent = 'Thinking...';
    
        const events = await fetch('timeline.csv')
            .then(response => response.text())
            .then(data => data.split('\n').slice(1).map(row => row.split(',')))
            .catch(error => {
                console.error('Error fetching data:', error);
                return [];
            });
    
        const query = `Here is the timeline data:\n${events.map(event => event.join(', ')).join('\n')}\n\nQuestion: ${input}`;
    
        fetch('/api/guido/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question: input,
                events: events
            })
        })
        .then(response => response.json())
        .then(data => {
            responseDiv.textContent = data.answer || data.error;
        })
        .catch(error => {
            console.error('Error:', error);
            responseDiv.textContent = 'Sorry, something went wrong.';
        });
    }

    