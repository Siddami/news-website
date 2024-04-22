// data.js
export async function fetchData() {
  try {
    const response = await fetch('https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const fetchedData = await response.json();
    return fetchedData;
  } catch (error) {
    console.error('An error occurred:', error);
    return null;
  }
}
