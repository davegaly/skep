// navigates to a new page
function skepUIGoToPage(pageKey) {
    window.location.href = window.location.origin + '/pages/' + pageKey;
}

// read query string parameters, values after "?" in the url
function skepUIGetQueryStringParameter(parameterKey) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(parameterKey);
}

// richiama una api e aspetta il risultato
async function skepUICallAPI(url, bodyToPost) {
    try {
        let response = null;
        if (bodyToPost == null) {
            // get
            response = await fetch(url); 
        }
        else
        {
            // post
            response = await fetch(url, {method:'POST', headers: {'Content-Type': 'application/json'}, body:JSON.stringify(bodyToPost)}); 
        }
        // Check if the response is ok (status code in the range 200-299)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json(); // Parse the JSON from the response
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
}
function skepUICallAPIAndWait(url, bodyToPost) {
    return skepUICallAPI(url, bodyToPost); // Always return a promise that can be awaited
}