
**Firebase Rules Below**

rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
   match /{document=**} {
      allow read, write: if request.auth != null;
    }
    match /goals/{goal} {
      allow create: if reguest.auth != null;
   allow read, update, delete: if request.auth != null && request.auth.uid == resource.data.owner;
    }
	}
}