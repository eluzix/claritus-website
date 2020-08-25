document.addEventListener('DOMContentLoaded', function() {
    let pageTitle = document.querySelector('h1.title');

    if (pageTitle && pageTitle.innerHTML) {
        let word_array = pageTitle.innerHTML.split(/\s+/); // split on spaces
        let last_word = word_array.pop();             // pop the last word
        let first_part = word_array.join(' ');        // rejoin the first words together


        pageTitle.innerHTML = [first_part, ' <span class="text-orange">', last_word, '</span>'].join('')
    }
});
