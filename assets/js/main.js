// Professional Blog JavaScript - Navigation and Interactions

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSearch();
    initializeCopyButtons();
    initializeTableFilters();
    initializeProgressBars();
    initializeSyntaxHighlighting();
});

// Navigation functionality
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    const navToggle = document.getElementById('navToggle');
    const navDropdown = document.getElementById('navDropdown');
    const navProgress = document.getElementById('navProgress');
    const currentSection = document.getElementById('currentSection');

    // Section mapping for better names
    const sectionNames = {
        'overview': 'Overview',
        'fundamentals': 'OpenShift Fundamentals',
        'development': 'Development Environment',
        'ollama': 'Ollama Setup',
        'webui': 'Web Interface',
        'lifecycle': 'Container Lifecycle',
        'gpu': 'GPU Management',
        'networking': 'Networking',
        'storage': 'Storage',
        'security': 'Security',
        'monitoring': 'Monitoring',
        'cicd': 'CI/CD Pipeline',
        'troubleshooting': 'Troubleshooting'
    };

    // Handle navigation item clicks
    navItems.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav items and sections
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked nav item
            document.querySelectorAll(`[data-section="${this.dataset.section}"]`).forEach(navItem => {
                navItem.classList.add('active');
            });
            
            // Show corresponding section
            const targetSection = document.getElementById(this.dataset.section);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Update breadcrumb
                if (currentSection) {
                    currentSection.textContent = sectionNames[this.dataset.section] || this.dataset.section;
                }
                
                // Update progress bar
                if (navProgress && navItems.length > 0) {
                    const progress = ((index + 1) / (navItems.length / 2)) * 100; // Divide by 2 because we have duplicate nav items
                    navProgress.style.width = `${Math.min(progress, 100)}%`;
                }
                
                // Close dropdown on mobile
                if (navDropdown) {
                    navDropdown.classList.remove('active');
                }
                if (navToggle) {
                    navToggle.classList.remove('active');
                }
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    // Handle mobile menu toggle
    if (navToggle && navDropdown) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navDropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navDropdown.contains(e.target)) {
                navDropdown.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navDropdown.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                navDropdown.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });

        // Auto-hide navigation on scroll
        window.addEventListener('scroll', function() {
            // Close dropdown when scrolling
            if (navDropdown.classList.contains('active')) {
                navDropdown.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Initialize progress bar
    if (navProgress) {
        navProgress.style.width = '7.7%'; // First section (1/13)
    }
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput || !searchResults) return;

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        if (searchTerm.length < 3) {
            searchResults.style.display = 'none';
            return;
        }

        // Simple search implementation
        const sections = document.querySelectorAll('.section');
        const results = [];

        sections.forEach(section => {
            const content = section.textContent.toLowerCase();
            if (content.includes(searchTerm)) {
                const titleElement = section.querySelector('.section-title, h1, h2');
                const title = titleElement ? titleElement.textContent : section.id;
                results.push({
                    title: title,
                    section: section.id,
                    context: content.substring(content.indexOf(searchTerm) - 50, content.indexOf(searchTerm) + 100)
                });
            }
        });

        if (results.length > 0) {
            searchResults.innerHTML = results.map(result => 
                `<div class="search-result" onclick="navigateToSection('${result.section}')">
                    <strong>${result.title}</strong>
                    <p>${result.context.replace(new RegExp(searchTerm, 'gi'), '<mark>$&</mark>')}</p>
                </div>`
            ).join('');
            searchResults.style.display = 'block';
        } else {
            searchResults.innerHTML = '<div class="search-result">No results found</div>';
            searchResults.style.display = 'block';
        }
    });
}

// Navigate to section
function navigateToSection(sectionId) {
    const navItem = document.querySelector(`[data-section="${sectionId}"]`);
    if (navItem) {
        navItem.click();
        const searchResults = document.getElementById('searchResults');
        const searchInput = document.getElementById('searchInput');
        if (searchResults) searchResults.style.display = 'none';
        if (searchInput) searchInput.value = '';
    }
}

// Copy code functionality
function initializeCopyButtons() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('copy-btn') || e.target.closest('.copy-btn')) {
            const button = e.target.classList.contains('copy-btn') ? e.target : e.target.closest('.copy-btn');
            const codeBlock = button.closest('.code-container').querySelector('pre code');
            
            if (codeBlock) {
                const textArea = document.createElement('textarea');
                textArea.value = codeBlock.textContent;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = 'Copy';
                }, 2000);
            }
        }
    });
}

// Table filtering
function initializeTableFilters() {
    document.addEventListener('keyup', function(e) {
        if (e.target.matches('.table-search input')) {
            filterTable(e.target, e.target.dataset.table || findTableId(e.target));
        }
    });
}

function filterTable(input, tableId) {
    const filter = input.value.toLowerCase();
    const table = document.getElementById(tableId) || input.closest('.table-container').querySelector('.table');
    
    if (!table) return;
    
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.getElementsByTagName('td');
        let found = false;

        for (let j = 0; j < cells.length; j++) {
            if (cells[j].textContent.toLowerCase().includes(filter)) {
                found = true;
                break;
            }
        }

        row.style.display = found ? '' : 'none';
    }
}

function findTableId(input) {
    const container = input.closest('.table-container');
    const table = container ? container.querySelector('.table') : null;
    return table ? table.id : null;
}

// Progress bar animation
function initializeProgressBars() {
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        });
    }

    // Animate progress bars when section becomes visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
            }
        });
    });

    document.querySelectorAll('.progress-bar').forEach(bar => {
        observer.observe(bar);
    });
}

// Syntax highlighting initialization
function initializeSyntaxHighlighting() {
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }
}

// Smooth scroll for better UX
document.addEventListener('click', function(e) {
    if (e.target.matches('[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Blog-specific functionality
function initializeBlog() {
    // Tag filtering for blog posts
    const tagLinks = document.querySelectorAll('.blog-tag');
    const blogPosts = document.querySelectorAll('.blog-post-card');

    tagLinks.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            const selectedTag = this.textContent.toLowerCase();
            
            blogPosts.forEach(post => {
                const postTags = Array.from(post.querySelectorAll('.blog-tag')).map(t => t.textContent.toLowerCase());
                if (selectedTag === 'all' || postTags.includes(selectedTag)) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });

    // Search blog posts
    const blogSearchInput = document.getElementById('blogSearch');
    if (blogSearchInput) {
        blogSearchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            
            blogPosts.forEach(post => {
                const title = post.querySelector('.blog-post-title').textContent.toLowerCase();
                const excerpt = post.querySelector('.blog-post-excerpt').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm) || searchTerm === '') {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    }
}

// Initialize blog functionality if on blog page
if (document.querySelector('.blog-grid')) {
    initializeBlog();
}

// Loading states for dynamic content
function showLoading(element) {
    element.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for global use
window.navigateToSection = navigateToSection;
window.filterTable = filterTable;
window.showLoading = showLoading;