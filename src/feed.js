class Feed {
  constructor(username) {
    this.username = username;
    this.posts = db.collection('posts');
    this.unsub;
  }

  async addPost(message) {
    const now = new Date();
    const post = {
      message,
      username: this.username,
      created_at: firebase.firestore.Timestamp.fromDate(now)
    };
    const response = await this.posts.add(post);
    return response;
  }

  getPosts(){
    this.unsub = this.posts
    .orderBy('created_at')
    .onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        let id;
        if (change._delegate.doc._key.path.segments[1] !== 'blake-crud-app') {
          id = change._delegate.doc._key.path.segments[1];
        } else if (change.doc._delegate._key.path.segments[6] !== undefined) {
          id = change.doc._delegate._key.path.segments[6];
        }
        if(change.type === 'added') {
          ui.render(change.doc.data(), id);
        } else if (change.type === 'removed') {
          document.getElementById(id).parentElement.parentElement.parentElement.remove();
        }
      })
    })
  }
}