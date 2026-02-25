firebase.auth().onAuthStateChanged(user => {
  if (!user && !window.location.pathname.endsWith('index.html')) {
    window.location.href = 'index.html';
  }
});
