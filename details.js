import { fetchData } from "./data";

const commentsList = document.getElementById('comments-list');
const addCommentForm = document.getElementById('add-comment-form');
const editCommentForm = document.getElementById('edit-comment-form');
const deleteCommentButton = document.getElementById('delete-comment');
const newCommentInput = document.getElementById('new-comment');

// Assuming you have a function to fetch and display news details (replace with your actual logic)
function displayNewsDetails() {
  // ... logic to display title, image, and content
  commentsList.innerHTML = '';  // Clear existing comments before adding new ones
  
  // If comments data is available in the news object:
  if (news.comments) {
    news.comments.forEach(comment => {
      const commentItem = document.createElement('li');
      commentItem.textContent = comment.text;

      // Add data attribute to store comment ID (replace with actual ID property)
      commentItem.dataset.commentId = comment.id;

      // Add event listener for edit button (replace with your button implementation if needed)
      commentItem.addEventListener('click', () => {
        // Pre-fill edit form with comment text
        editCommentForm.commentId.value = comment.id;
        editCommentForm.edit-comment.value = comment.text;
        switchToEditForm();
      });

      commentsList.appendChild(commentItem);
    });
  }
}

// Handle form submission for adding a comment
addCommentForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const newCommentText = newCommentInput.value;

  // Assuming you have a function to send the comment data to the server (replace with your actual logic)
  const response = await submitComment(newsId, newCommentText);  // Replace newsId with the actual news identifier

  if (response.ok) {
    // Clear comment input and fetch updated comments
    newCommentInput.value = '';
    displayNewsDetails(news);  // Replace with your logic to fetch updated news
  } else {
    // Handle errors (display error message, etc.)
    console.error('Failed to add comment:', response.statusText);
  }
});

// Handle form submission for editing a comment
editCommentForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const commentId = editCommentForm.commentId.value;
  const editedCommentText = editCommentForm.edit-comment.value;

  // Assuming you have a function to send the edited comment data to the server (replace with your actual logic)
  const response = await editComment(commentId, editedCommentText);  // Replace with your actual editComment function

  if (response.ok) {
    // Clear comment input and fetch updated comments
    editCommentForm.commentId.value = '';
    editCommentForm.edit-comment.value = '';
    switchToAddForm();
    displayNewsDetails(news);  // Replace with your logic to fetch updated news
  } else {
    // Handle errors (display error message, etc.)
    console.error('Failed to edit comment:', response.statusText);
  }
});

// Handle delete comment button click (replace with your button implementation if needed)
deleteCommentButton.addEventListener('click', async () => {
  const commentId = editCommentForm.commentId.value;

  // Assuming you have a function to send the delete request to the server (replace with your actual logic)
  const response = await deleteComment(commentId);  // Replace with your actual deleteComment function

  if (response.ok) {
    // Clear comment input and fetch updated comments
    editCommentForm.commentId.value = '';
    editCommentForm.edit-comment.value = '';
    switchToAddForm();
    displayNewsDetails(news);  // Replace with your logic to fetch updated news
  } else {
    // Handle errors (display error message, etc.)
    console.error('Failed to delete comment:', response.statusText);
  }
});

function switchToAddForm() {
  addCommentForm.classList.remove('hidden');
  editCommentForm.classList.add('hidden');
}

function switchToEditForm() {
  addCommentForm.classList.add('hidden');
  editCommentForm.classList.remove('hidden');
}
