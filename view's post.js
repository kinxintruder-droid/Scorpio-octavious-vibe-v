// after counting normal view
const boosts = await getDocs(collection(db, "boosts"));

boosts.forEach(b => {
  const data = b.data();
  if (data.postId === postId && data.active && data.viewsUsed < data.viewsBought) {
    updateDoc(b.ref, { viewsUsed: increment(1) });
  }
});