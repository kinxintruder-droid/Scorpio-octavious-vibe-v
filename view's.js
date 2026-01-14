export async function viewPost(postId, ownerUid) {
  const user = auth.currentUser;
  if (!user || user.uid === ownerUid) return;

  const viewRef = doc(db, "views", postId, user.uid);
  const seen = await getDoc(viewRef);
  if (seen.exists()) return;

  await setDoc(viewRef, { at: Date.now() });
  await updateDoc(doc(db, "posts", postId), {
    views: increment(1)
  });

  await updateDoc(doc(db, "wallets", ownerUid), {
    balance: increment(0.01) // 1 cent per view
  });
}