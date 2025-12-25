/*
    loads the firebase data for each piano 
*/

// Import the functions you need from the SDKs you need
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
  import {
  getFirestore,
  collection,
  getDocs
    } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBlvp69Ff9aB7059N-QMK29NiVsxaQVjkA",
    authDomain: "vancouver-pianos.firebaseapp.com",
    projectId: "vancouver-pianos",
    storageBucket: "vancouver-pianos.firebasestorage.app",
    messagingSenderId: "432228394956",
    appId: "1:432228394956:web:4f770339bf891ecbccdf69",
    measurementId: "G-7PTWZ5RX8W"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  
// 4) Load piano markers
export async function addPianoMarkers(map) {
  const snapshot = await getDocs(collection(db, "pianos"));

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    console.log(docSnap.id, data);

    const lat = Number(data.Latitude);
    const lng = Number(data.Longitude);
    const lnk = String(data.Link);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;


        // Get link safely
    let link = String(data.Link ?? "");
    // If you accidentally stored quotes in Firestore, strip them:
    link = link.replace(/^"+|"+$/g, "").trim();

    const titleHtml = link
      ? `<a href="${link}" target="_blank" rel="noopener noreferrer"><strong>${docSnap.id}</strong></a>`
      : `<strong>${docSnap.id}</strong>`;


    L.marker([lat, lng])
      .addTo(map)
      .bindPopup(`
        <div style="text-align: center;">
            ${titleHtml}
            <br>
                ${data.City}
            <br>
                ${data.Notes ?? ""}
        </div>
      `);
  });
}