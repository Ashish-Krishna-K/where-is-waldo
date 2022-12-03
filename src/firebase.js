import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWWFT6N07E_oO20gElk5tpS1rZCE0BiAk",
  authDomain: "odin-where-is-waldo-8a6f9.firebaseapp.com",
  projectId: "odin-where-is-waldo-8a6f9",
  storageBucket: "odin-where-is-waldo-8a6f9.appspot.com",
  messagingSenderId: "426031063061",
  appId: "1:426031063061:web:ed44542e9ce02022ba6e1c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getTargetCoordinates(name) {
  const data = await getDoc(doc(db, "target", name));
  return data.data();
}

export async function getCurrentLeaderBoard() {
  const imports = await getDoc(doc(db, "highScores", "highScores"));
  return imports.data();
}

export async function submitScoresToLeaderBoard(highScore, leaderboard) {
  const scores = []
  if(leaderboard.scores === null) {
    scores.push(highScore)
    await setDoc(doc(db, "highScores", "highScores"), {
      title: 'LeaderBoard',
      scores: [...scores],
    })
    return;  
  }
  leaderboard.scores.forEach(item => scores.push(item));
  scores.push(highScore)

  await setDoc(doc(db, "highScores", "highScores"), {
    title: 'LeaderBoard',
    scores: [...scores],
  })
}
