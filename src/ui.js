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
      <div class="card mt-2">
        <div class="card-body">
          <h5 class="card-title">${data.username}<i class="fas fa-times" id="${id}"></i></h5>
          <p class="card-text">${data.message}</p>
        </div>
      <div class="card-footer text-muted">${when}</div>
    </div>
    `;
    //this.feed.innerHTML += html;
    this.feed.insertAdjacentHTML('afterbegin', html);
  }
}