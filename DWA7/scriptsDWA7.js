import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'

class BookList {
    constructor(books, authors) {
        this.page = 1;
        this.matches = books;
        this.authors = authors;
    }

    createBookElement({ author, id, image, title }) {
        const element = document.createElement('button');
        element.classList = 'preview';
        element.setAttribute('data-preview', id);

        element.innerHTML = `
            <img class="preview__image" src="${image}" />
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${this.authors[author]}</div>
            </div>
        `;

        return element;
    }

    appendBooksToDOM(startIndex, endIndex) {
        const fragment = document.createDocumentFragment();

        for (const book of this.matches.slice(startIndex, endIndex)) {
            const element = this.createBookElement(book);
            fragment.appendChild(element);
        }

        document.querySelector('[data-list-items]').appendChild(fragment);
    }

    updateButton() {
        const remainingBooks = this.matches.length - (this.page * BOOKS_PER_PAGE);
        document.querySelector('[data-list-button]').innerHTML = `
            <span>Show more</span>
            <span class="list__remaining"> (${remainingBooks > 0 ? remainingBooks : 0})</span>
        `;
    }

    loadMoreBooks() {
        this.appendBooksToDOM(this.page * BOOKS_PER_PAGE, (this.page + 1) * BOOKS_PER_PAGE);
        this.page += 1;
        this.updateButton();
    }

    init() {
        this.appendBooksToDOM(0, BOOKS_PER_PAGE);
        document.querySelector('[data-list-button]').addEventListener('click', () => this.loadMoreBooks());
    }
}

// THEME

class ThemeSettings {
    constructor() {
        this.theme = this.getInitialTheme();
        this.applyTheme(this.theme);
    }

    getInitialTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'night';
        } else {
            return 'day';
        }
    }

    applyTheme(theme) {
        document.querySelector('[data-settings-theme]').value = theme;

        if (theme === 'night') {
            document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
            document.documentElement.style.setProperty('--color-light', '10, 10, 20');
        } else {
            document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
            document.documentElement.style.setProperty('--color-light', '255, 255, 255');
        }
    }

    init() {
        document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
            document.querySelector('[data-settings-overlay]').open = false;
        });

        document.querySelector('[data-header-settings]').addEventListener('click', () => {
            document.querySelector('[data-settings-overlay]').open = true;
        });

        document.querySelector('[data-settings-form]').addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const { theme } = Object.fromEntries(formData);
            
            this.applyTheme(theme);
            
            document.querySelector('[data-settings-overlay]').open = false;
        });
    }
}

// SEARCH

class SearchForm {
    constructor(books, genres, authors) {
        this.books = books;
        this.genres = genres;
        this.authors = authors;
    }

    createOptionElement(id, name) {
        const element = document.createElement('option');
        element.value = id;
        element.innerText = name;
        return element;
    }

    populateSelectElement(data, selector) {
        const fragment = document.createDocumentFragment();
        fragment.appendChild(this.createOptionElement('any', `All ${selector}`));

        for (const [id, name] of Object.entries(data)) {
            fragment.appendChild(this.createOptionElement(id, name));
        }

        document.querySelector(`[data-search-${selector}]`).appendChild(fragment);
    }

    filterBooks(filters) {
        return this.books.filter(book => 
            book.title.toLowerCase().includes(filters.title.toLowerCase()) || 
            book.author === filters.author || 
            (filters.genre === 'any' || book.genres.includes(filters.genre))
        );
    }

    handleFormSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const filters = Object.fromEntries(formData);

        const result = this.filterBooks(filters);

        // Update the book list with the search results
        const bookList = new BookList(result, this.authors);
        
        bookList.init();
        
        window.scrollTo({top: 0, behavior: 'smooth'});
        
        document.querySelector('[data-search-overlay]').open = false;
    }

    init() {
        this.populateSelectElement(this.genres, 'genres');
        this.populateSelectElement(this.authors, 'authors');
        
        document.querySelector('[data-search-cancel]').addEventListener('click', () => {
            document.querySelector('[data-search-overlay]').open = false;
            
            // Initialize the book list with all books when the search is cancelled
            const bookList = new BookList(this.books, this.authors);
            
            bookList.init();
            
            window.scrollTo({top: 0, behavior: 'smooth'});
            
            document.querySelector('[data-search-overlay]').open = false;
            
            window.scrollTo({top: 0, behavior: 'smooth'});
            
            document.querySelector('[data-search-overlay]').open = false;
            
            window.scrollTo({top: 0, behavior: 'smooth'});
            
            document.querySelector('[data-search-overlay]').open = false;
            
            window.scrollTo({top: 0, behavior: 'smooth'});
            
            document.querySelector('[data-search-overlay]').open = false;
            
            window.scrollTo({top: 0, behavior: 'smooth'});
            
            document.querySelector('[data-search-overlay]').open = false;
            
            window.scrollTo({top: 0, behavior: 'smooth'});
            
            document.querySelector('[data-search-overlay]').open = false;
            
            window.scrollTo({top: 0, behavior: 'smooth'});
            
            document.querySelector('[data-search-overlay]').open = false;
            
            window.scrollTo({top: 0, behavior: 'smooth'});
            
            document.querySelector('[data-search-overlay]').open = false;
            
            window.scrollTo({top: 0, behavior: 'smooth'});
            
            document.querySelector('[data-search-overlay]').open = false;
            
            window.scrollTo({top: 0, behavior: 'smooth'});
            
            document.querySelector('[data-search-overlay]').open = false;
            
            window.scrollTo({top: 0, behavior: 'smooth'});
            
            document.querySelector('[data-search-overlay]').open = false;
            
            window.scrollTo({top: 0, behavior: 'smooth'});
            
            document.querySelector('[data-search-overlay]').open = false;
            
            window.scrollTo({top: 0, behavior: 'smooth'});
            
            document.querySelector('[data-search-overlay]').open = false;
            
            window.scrollTo({top: 0, behavior: 'smooth'});
            
            document.querySelector('[data-search-overlay]').open = false;
        });

        document.querySelector('[data-header-search]').addEventListener('click', () => {
            document.querySelector('[data-search-overlay]').open = true;
            document.querySelector('[data-search-title]').focus();
        });

        document.querySelector('[data-search-form]').addEventListener('submit', (event) => this.handleFormSubmit(event));
        
    }
}

// Initialize the search form, book list, and theme settings
const searchForm = new SearchForm(books, genres, authors);
searchForm.init();

const bookList = new BookList(books, authors);
bookList.init();

const themeSettings = new ThemeSettings();
themeSettings.init();