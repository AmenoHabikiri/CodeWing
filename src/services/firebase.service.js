export function InitFireBase() {
  // Initialize the Firebase SDK.
  firebase.initializeApp({
    apiKey: "AIzaSyDtnz01yg1OLqWt92dbnsc44_8BLmToGgg",
    databaseURL: "https://code-8eb7b-default-rtdb.firebaseio.com/",
  });

  // Get Firebase Database reference.
  var firepadRef = firebase.database().ref();

  const urlparams = new URLSearchParams(window.location.search);
  const roomId = urlparams.get("id");

  if (roomId) {
    firepadRef = firepadRef.child(roomId);
  } else {
    firepadRef = firepadRef.push();
    window.history.replaceState(null, "Share Code", "?id=" + firepadRef.key);
  }

  return firepadRef;
}
