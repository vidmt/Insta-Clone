import {firebase, FieldValue} from '../lib/firebase';

export async function doesUserNameExist(username){
    const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username.toLowerCase())
    .get();

    return result.docs.map((user) => user.data().length > 0);
}

export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username.toLowerCase())
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
}

export async function getUserByUserId(userId) {
    const result = await firebase.firestore().collection('users').where('userId', '==', userId).get();
    const user = result.docs.map((item) => ({
      ...item.data(),
      docId: item.id
    }));
  

    return user;
}

export async function getSuggestedProfiles(userId,following){
  let query = firebase.firestore().collection('users');

  // Check if the 'following' array has any user IDs
  if (following.length > 0) {
    // Exclude users that are in the 'following' array and the current user
    query = query.where('userId', 'not-in', [...following, userId]);
  } else {
    // Exclude just the current user if 'following' is empty
    query = query.where('userId', '!=', userId);
  }
  // Limit the results to 10 users
  const result = await query.limit(10).get();

  // Map the results to include the document ID in the profile data
  const profiles = result.docs.map((user) => ({
    ...user.data(),
    docId: user.id
  }));

  return profiles;
}

export async function updateLoggedInUserFollowing(loggedInUserDocId, profileId,isFollowingProfile){
  return firebase.firestore().collection('users').doc(loggedInUserDocId).update({
    following : isFollowingProfile ? FieldValue.arrayRemove(profileId) : FieldValue.arrayUnion(profileId) 
  });
}

export async function updateFollowedUserFollowers(profileDocId, loggedInUserDocId, isFollowingProfile){
  return firebase.firestore().collection('users').doc(profileDocId).update({
    followers : isFollowingProfile ? FieldValue.arrayRemove(loggedInUserDocId) : FieldValue.arrayUnion(loggedInUserDocId) 
  });
}

export async function getPhotos(userId, following){
  const result = await firebase.firestore().collection('photos').where('userId', 'in', following).get();

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(), docId: photo.id
  }));

  const photosWithUserDetails = await Promise.all(userFollowedPhotos.map(async (photo) => {
    
    let userLikedPhoto = false;
    if(photo.likes.includes(userId)){
      userLikedPhoto = true;  
    }

    const user = await getUserByUserId(photo.userId);
    const {username} = user[0];
    return {username, ...photo, userLikedPhoto};
  }));

  return photosWithUserDetails;
}

export async function getUserPhotosByUsername(username){
  const [user] = await getUserByUsername(username);
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', '==', user.userId)
    .get();

    return result.docs.map((item) => ({
      ...item.data(),
      docId: item.id
    }));
}

export async function isUserFollowingProfile(loggedInUserUsername, profileUserId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', loggedInUserUsername) // karl (active logged in user)
    .where('following', 'array-contains', profileUserId)
    .get();

  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  return response.userId;
}

export async function toggleFollow(isFollowingProfile, activeUserDocId, profileDocId, profileUserId, followingUserID){
  await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);
  await updateFollowedUserFollowers(profileDocId,followingUserID,isFollowingProfile);
}

  