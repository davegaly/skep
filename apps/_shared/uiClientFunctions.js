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