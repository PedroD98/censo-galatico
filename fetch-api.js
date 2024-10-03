async function fetchApiData(url) {

    let res = await fetch(`${url}`);
    let data = await res.json();

    planetsArray = data.results;
    previousPageUrl = data.previous;
    nextPageUrl = data.next;   
}