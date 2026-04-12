// post.js
import { db } from './firebase-config.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    const loadingDiv = document.getElementById('post-loading');
    const errorDiv = document.getElementById('post-error');
    const article = document.getElementById('post-article');

    if (!postId) {
        loadingDiv.style.display = 'none';
        errorDiv.style.display = 'block';
        return;
    }

    try {
        const docRef = doc(db, "posts", postId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const post = docSnap.data();
            
            // Populate DOM
            document.title = `${post.title} - Tengku`;
            document.getElementById('sp-title').textContent = post.title;
            document.getElementById('sp-meta').innerHTML = `${post.dateString} &bull; ${post.readTime}`;
            
            // Build tags
            const tagsContainer = document.getElementById('sp-tags');
            if (post.tags) {
                const tagList = post.tags.split(',').map(t => t.trim());
                tagList.forEach(tag => {
                    const span = document.createElement('span');
                    span.className = 'post-tag';
                    span.textContent = tag;
                    tagsContainer.appendChild(span);
                });
            }

            // Insert HTML
            document.getElementById('sp-content').innerHTML = post.contentHtml;

            // Swap visibility
            loadingDiv.style.display = 'none';
            article.style.display = 'block';

        } else {
            // Document doesn't exist
            loadingDiv.style.display = 'none';
            errorDiv.style.display = 'block';
        }
    } catch (error) {
        console.error("Error fetching post:", error);
        loadingDiv.style.display = 'none';
        errorDiv.style.display = 'block';
        errorDiv.innerHTML = '<h2>Error</h2><p>Could not fetch the post. Please check your connection.</p>';
    }
});