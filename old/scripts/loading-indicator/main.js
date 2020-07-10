/**
 * Use the loading indicator when the user navigates between pages. This is needed, because the git commands
 * can take time and users should not click multiple times.
 */
(function() {
    let links = document.querySelectorAll('a[href]');
    for(let idx = 0; idx < links.length; idx++) {
        if (!links[idx].getAttribute('data-no-loading-indicator')) {
            links[idx].addEventListener('click', function() {
                document.querySelector('#loading').classList.add('is-visible');
            });
        }
    }
})();
