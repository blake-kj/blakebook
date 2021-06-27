class UI {
  constructor(){
    this.loginForm = document.querySelector('.login-form');
    this.blakebookFeed = document.querySelector('.blakebook');
    this.feed = document.querySelector('.blakebook-feed');
  }
  login(){
    this.loginForm.style.display = 'none';
    this.feed.style.display = 'block';
    this.blakebookFeed.style.display = 'block';
  }
  logout(){
    this.loginForm.style.display = 'flex';
    this.feed.style.display = 'none';
    this.blakebookFeed.style.display = 'none';
    this.feed.innerHTML = '';
  }
  render(data, id){
    const when = dateFns.distanceInWordsToNow(data.created_at.toDate(),{ addSuffix: true });
    const html = `
      <div class="card mt-2" id=${id}>
        <div class="card-body">
          <h5 class="card-title">${data.username}<i class="fas fa-times" id="${id}"></i></h5>
          <p class="card-text">${data.message}</p>
        </div>
      <div class="card-footer text-muted">${when}<i class="fas fa-pencil-alt" id="${id}"></i></div>
    </div>
    `;
    this.feed.insertAdjacentHTML('afterbegin', html);
  }
  removePost(id){
    db.collection('posts').doc(id).delete();
  }
  showEditPost(e){
    e.target.className = 'fas fa-chevron-right';
    const editCard = e.target.parentElement.parentElement.firstElementChild;
    const cardBody = editCard.querySelector('.card-text');
    cardBody.classList.add('hide');
    const html = `<input
      type="text"
      class="form-control update-post"
      value="${cardBody.innerText}"
    />`
    editCard.querySelector('h5').insertAdjacentHTML('afterend',html)
  }
  hideEditPost(e){
    const editCard = e.target.parentElement.parentElement.firstElementChild;
    e.target.className = 'fas fa-pencil-alt';
    editCard.querySelector('.card-text').classList.remove('hide');
    editCard.querySelector('.update-post').remove();    
  }
  removeEditPost(e){
    const editCard = e.target.parentElement.parentElement;
    editCard.querySelector('.fa-chevron-right').className = 'fas fa-pencil-alt';
    editCard.querySelector('.card-text').classList.remove('hide');
    editCard.querySelector('.update-post').remove();
  }
  updatePost(data, id){
    const updateCard = document.getElementById(id);
    updateCard.querySelector('.card-text').innerText = data.message;
  }
}