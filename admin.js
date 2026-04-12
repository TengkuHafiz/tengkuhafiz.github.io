// admin.js
import { auth, db, storage, googleProvider, ADMIN_EMAIL } from './firebase-config.js';
import { signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, serverTimestamp, query, orderBy } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const dashboardScreen = document.getElementById('dashboard-screen');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const loginError = document.getElementById('login-error');
const userControls = document.getElementById('user-controls');
const userEmailSpan = document.getElementById('user-email');

const adminPostsList = document.getElementById('admin-posts-list');
const createNewBtn = document.getElementById('create-new-btn');
const editorSection = document.getElementById('editor-section');
const cancelEditBtn = document.getElementById('cancel-edit-btn');
const postForm = document.getElementById('post-form');
const editorTitle = document.getElementById('editor-title');

let currentEditingId = null;

// Initialize Quill Editor
const quill = new Quill('#quill-editor', {
    theme: 'snow',
    modules: {
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link', 'image'],
                ['clean']
            ],
            handlers: {
                image: imageHandler
            }
        }
    }
});

// Custom Image Handler for Quill -> Firebase Storage
function imageHandler() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
        const file = input.files[0];
        if (file) {
            const storageRef = ref(storage, `post-images/${Date.now()}_${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            // Create a loading placeholder if you want, here we just wait
            uploadTask.on('state_changed', 
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                }, 
                (error) => {
                    console.error("Upload failed", error);
                    alert("Image upload failed");
                }, 
                async () => {
                    // Handle successful uploads on complete
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    const range = quill.getSelection(true);
                    quill.insertEmbed(range.index, 'image', downloadURL);
                }
            );
        }
    };
}

// Authentication Logic
onAuthStateChanged(auth, (user) => {
    if (user && user.email === ADMIN_EMAIL) {
        // Authorized Admin
        loginScreen.style.display = 'none';
        dashboardScreen.style.display = 'block';
        userControls.style.display = 'flex';
        userEmailSpan.textContent = user.email;
        loadPosts();
    } else {
        // Logged out or Unauthorized
        loginScreen.style.display = 'flex';
        dashboardScreen.style.display = 'none';
        userControls.style.display = 'none';
        if (user && user.email !== ADMIN_EMAIL) {
            loginError.style.display = 'block';
            loginError.textContent = `Unauthorized email: ${user.email}`;
            signOut(auth);
        }
    }
});

loginBtn.addEventListener('click', () => {
    loginError.style.display = 'none';
    signInWithPopup(auth, googleProvider)
        .catch((error) => {
            console.error(error);
            loginError.style.display = 'block';
            loginError.textContent = "Authentication failed.";
        });
});

logoutBtn.addEventListener('click', () => {
    signOut(auth);
});

// Load Posts
async function loadPosts() {
    adminPostsList.innerHTML = '<p>Loading posts...</p>';
    try {
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            adminPostsList.innerHTML = '<p>No posts found. Create one!</p>';
            return;
        }

        adminPostsList.innerHTML = '';
        querySnapshot.forEach((docSnap) => {
            const post = docSnap.data();
            const id = docSnap.id;

            const div = document.createElement('div');
            div.className = 'admin-post-item';
            div.innerHTML = `
                <div>
                    <h3>${post.title}</h3>
                    <p>${post.dateString} &bull; ${post.tags}</p>
                </div>
                <div class="admin-post-actions">
                    <button class="btn-edit" data-id="${id}" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="btn-delete" data-id="${id}" title="Delete"><i class="fas fa-trash"></i></button>
                </div>
            `;
            adminPostsList.appendChild(div);
        });

        // Add event listeners to new buttons
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => editPost(e.currentTarget.dataset.id));
        });
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => deletePost(e.currentTarget.dataset.id));
        });

    } catch (error) {
        console.error("Error loading posts:", error);
        adminPostsList.innerHTML = '<p class="error-msg">Error loading posts. Ensure Firebase config and rules are correct.</p>';
    }
}

// Editor UI Logic
createNewBtn.addEventListener('click', () => {
    currentEditingId = null;
    editorTitle.textContent = "Create New Post";
    postForm.reset();
    quill.root.innerHTML = '';
    editorSection.style.display = 'block';
    window.scrollTo({ top: editorSection.offsetTop, behavior: 'smooth' });
});

cancelEditBtn.addEventListener('click', () => {
    editorSection.style.display = 'none';
    currentEditingId = null;
});

// Save Post (Create / Update)
postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = document.getElementById('post-title-input').value;
    const dateString = document.getElementById('post-date-input').value;
    const readTime = document.getElementById('post-readtime-input').value;
    const tags = document.getElementById('post-tags-input').value;
    const contentHtml = quill.root.innerHTML;

    // Create an excerpt by stripping HTML and getting first 150 chars
    const rawText = quill.getText();
    const excerpt = rawText.length > 150 ? rawText.substring(0, 150) + '...' : rawText;

    const postData = {
        title,
        dateString,
        readTime,
        tags,
        contentHtml,
        excerpt,
        createdAt: serverTimestamp()
    };

    const saveBtn = document.getElementById('save-post-btn');
    const originalBtnText = saveBtn.textContent;
    saveBtn.textContent = 'Saving...';
    saveBtn.disabled = true;

    try {
        if (currentEditingId) {
            // Update existing
            const postRef = doc(db, "posts", currentEditingId);
            // Dont overwrite createdAt on update
            delete postData.createdAt; 
            await updateDoc(postRef, postData);
        } else {
            // Create new
            await addDoc(collection(db, "posts"), postData);
        }
        
        editorSection.style.display = 'none';
        postForm.reset();
        quill.root.innerHTML = '';
        currentEditingId = null;
        loadPosts(); // Refresh list

    } catch (error) {
        console.error("Error saving document: ", error);
        alert("Error saving post.");
    } finally {
        saveBtn.textContent = originalBtnText;
        saveBtn.disabled = false;
    }
});

// Edit Post (Fetch and populate form)
async function editPost(id) {
    // In a real app we'd fetch from Firestore or read from memory.
    // For simplicity we will read from memory via the getDocs cache or refetch.
    try {
        const q = query(collection(db, "posts"));
        const querySnapshot = await getDocs(q);
        let postData = null;
        querySnapshot.forEach(docSnap => {
            if (docSnap.id === id) {
                postData = docSnap.data();
            }
        });

        if (postData) {
            currentEditingId = id;
            editorTitle.textContent = "Edit Post";
            document.getElementById('post-title-input').value = postData.title || '';
            document.getElementById('post-date-input').value = postData.dateString || '';
            document.getElementById('post-readtime-input').value = postData.readTime || '';
            document.getElementById('post-tags-input').value = postData.tags || '';
            quill.root.innerHTML = postData.contentHtml || '';
            
            editorSection.style.display = 'block';
            window.scrollTo({ top: editorSection.offsetTop, behavior: 'smooth' });
        }
    } catch (error) {
        console.error("Error fetching post to edit:", error);
    }
}

// Delete Post
async function deletePost(id) {
    if (confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
        try {
            await deleteDoc(doc(db, "posts", id));
            loadPosts();
        } catch (error) {
            console.error("Error deleting document: ", error);
            alert("Error deleting post.");
        }
    }
}