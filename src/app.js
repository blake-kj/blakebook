const loginForm = document.querySelector('.login-form');
const logoutBtn = document.querySelector('.fa-sign-out-alt');
const newPostInput = document.querySelector('.new-post');
const usernameInput = document.querySelector('.input-username');
const blakebookFeed = document.querySelector('.blakebook-feed');

ui = new UI();
let username;
if(localStorage.username !== '' && localStorage.username !== null){
  username = localStorage.username;
  ui.login();
  feed = new Feed(username);
  feed.getPosts();
} else {
  ui.logout();
}



loginForm.addEventListener('submit', e => {
  e.preventDefault();
  if(usernameInput.value !== ''){
    localStorage.setItem('username', usernameInput.value);
    feed = new Feed(usernameInput.value);
    feed.getPosts();
    usernameInput.value = '';
    ui.login();
  }

});

logoutBtn.addEventListener('click', () => {
  ui.logout();
  localStorage.setItem('username', '');
  feed.unsub();
});

newPostInput.addEventListener('keypress', e => {
  if(e.key === 'Enter'){
    feed.addPost(newPostInput.value);
    newPostInput.value = '';
  }
});

blakebookFeed.addEventListener('click', e => {
  console.log(`this is e:`);
  console.log(e);
  if(e.target.classList.contains('fa-times')) {
    db.collection('posts').doc(e.target.id).delete();  
  }
});



