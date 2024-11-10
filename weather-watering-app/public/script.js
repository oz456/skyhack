document.getElementById('cropForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    document.getElementById('errorMessage').innerText = ''; // Clear previous error messages

    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    document.querySelector('.container').appendChild(spinner);

    const cropType = document.getElementById('cropType').value;
    const city = document.getElementById('city').value;
    const landArea = parseFloat(document.getElementById('landArea').value);

    const response = await fetch('/api/watering-info', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cropType, city, landArea })
    });

    const result = await response.json();
    document.querySelector('.container').removeChild(spinner);

    if (response.ok) {
        localStorage.setItem('results', JSON.stringify(result));
        window.location.href = 'results.html';
    } else {
        document.getElementById('errorMessage').innerText = result;
    }
});
