// posts.js
import { db } from './firebase-config.js';
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', async () => {
    const postsListContainer = document.querySelector('.posts-list');
    
    try {
        if(db.app.options.apiKey === "YOUR_API_KEY") {
            throw new Error("Firebase not configured.");
        }

        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        
        postsListContainer.innerHTML = ''; // Clear loading spinner
        
        if (!querySnapshot.empty) {
            querySnapshot.forEach((docSnap) => {
                const post = docSnap.data();
                const id = docSnap.id;
                
                // Construct tags HTML and data attribute string
                let tagsHtml = '';
                let tagsArray = [];
                if (post.tags) {
                    const tagList = post.tags.split(',').map(t => t.trim());
                    tagsArray = tagList;
                    
                    // Show max 3 tags, then + X more
                    for(let i=0; i<Math.min(tagList.length, 3); i++) {
                        tagsHtml += `<span class="post-tag">${tagList[i]}</span>\n`;
                    }
                    if(tagList.length > 3) {
                        tagsHtml += `<span class="post-tag">+ ${tagList.length - 3} more</span>\n`;
                    }
                }

                const dataTagsAttr = tagsArray.join(',');

                const cardHtml = `
                    <div class="post-card" data-tags="${dataTagsAttr}" data-url="post.html?id=${id}">
                        <div class="post-meta">${post.dateString} &bull; ${post.readTime}</div>
                        <h2 class="post-title">${post.title}</h2>
                        <div class="post-tags">
                            ${tagsHtml}
                        </div>
                    </div>
                `;
                postsListContainer.insertAdjacentHTML('beforeend', cardHtml);
            });
        } else {
            postsListContainer.innerHTML = '<p>No posts found. Create one in the admin dashboard!</p>';
        }
    } catch (error) {
        console.log(error.message);
        postsListContainer.innerHTML = '<p>Error loading posts. Please check Firebase connection.</p>';
    }

    // Now initialize the interactive logic on whatever posts exist
    initializePostsInteractions();
});

function initializePostsInteractions() {
    const sidebarTags = document.querySelectorAll('.sidebar-tag');
    const postCards = document.querySelectorAll('.post-card');
    const postsHeader = document.querySelector('.posts-header');
    
    // Store the original header HTML to restore later
    const originalHeaderHTML = `
      <h1>All Posts</h1>
      <p>Explore all <strong>${postCards.length}</strong> posts</p>
    `;

    // Initialize original header properly with dynamic count
    postsHeader.innerHTML = originalHeaderHTML;

    // Make post cards clickable
    postCards.forEach(card => {
        card.addEventListener('click', () => {
            const url = card.getAttribute('data-url');
            if (url && url !== '#') {
                window.location.href = url;
            }
        });
    });

    // Tag filtering logic
    sidebarTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const isAlreadyActive = tag.classList.contains('active');
            
            // Remove active class from all tags
            sidebarTags.forEach(t => t.classList.remove('active'));

            if (isAlreadyActive) {
                // If it was already active, we are un-toggling it. Show all posts.
                postCards.forEach(card => card.style.display = 'block');
                postsHeader.innerHTML = originalHeaderHTML;
            } else {
                // Set the clicked tag as active
                tag.classList.add('active');
                const selectedTag = tag.textContent.trim().toLowerCase();

                let visibleCount = 0;

                // Filter the posts based on the data-tags attribute
                postCards.forEach(card => {
                    const cardTags = card.getAttribute('data-tags');
                    if (cardTags) {
                        const tagsArray = cardTags.split(',').map(t => t.trim().toLowerCase());
                        if (tagsArray.includes(selectedTag)) {
                            card.style.display = 'block';
                            visibleCount++;
                        } else {
                            card.style.display = 'none';
                        }
                    } else {
                        card.style.display = 'none';
                    }
                });

                // Update the header to reflect the filter
                postsHeader.innerHTML = `
                  <h2>Posts tagged "${selectedTag}"</h2>
                  <div style="display: flex; flex-direction: column; gap: 15px;">
                      <p>Showing <strong>${visibleCount}</strong> posts tagged with <span class="sidebar-tag active" style="display: inline-block; cursor: default;">#${selectedTag}</span></p>
                      <a href="#" id="clear-filter" style="text-decoration: none; color: #121212; display: inline-flex; align-items: center; gap: 5px;"><i class="fas fa-arrow-left"></i> Show all posts</a>
                  </div>
                `;

                // Add event listener to the "Show all posts" back button
                document.getElementById('clear-filter').addEventListener('click', (e) => {
                    e.preventDefault();
                    // Simulate clicking the active tag to un-toggle it
                    tag.click();
                });
            }
        });
    });
}