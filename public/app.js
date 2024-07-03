document.addEventListener('DOMContentLoaded', () => {
  const apiKey = window.__env.API_KEY;
  const endpoint = `https://api.example.com/data?api_key=${apiKey}`;
  
  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      const dataDiv = document.getElementById('data');
      dataDiv.innerText = JSON.stringify(data, null, 2);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});
