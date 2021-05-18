import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyCXzCMkW_t5LuzrymZCTLMoxrc0zAW6DB0",
    authDomain: "final-project-4e973.firebaseapp.com",
    databaseURL: "https://final-project-4e973-default-rtdb.firebaseio.com",
    projectId: "final-project-4e973",
    storageBucket: "final-project-4e973.appspot.com",
    messagingSenderId: "983716347684",
    appId: "1:983716347684:web:e38195c91c1762d27a7db1"
}


class Firebase {

    constructor() {
        firebase.initializeApp(config);
        this.auth = firebase.auth();
        this.firestore = firebase.firestore();


    }
    async signup(email, password) {
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password).catch(err => {
            console.log(err);
            return err;
        });
        return user;
    }

    async login(email, password) {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password).catch(err => {
            console.log(err);
            return err;
        });
        return user;
    }
    async logout() {
        await firebase.auth().signOut().catch(err => {
            console.log(err);
        });
    }

    async getUserState() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve);
        });
    }

    async getPosts() {
        return await firebase.firestore().collection("posts").get();

    }

    async getPost(postid) {
        return await firebase.firestore().collection("posts").doc(postid).get();
    }

    async createPost(post) {
        const storageRef = firebase.storage().ref();
        const storageChild = storageRef.child(post.cover.name);
        const postCover = await storageChild.put(post.cover);
        const downloadURL = await storageChild.getDownloadURL();

        //const fileRef = await postCover.ref.location.path;

        let newPost = {
            title: post.title,
            content: post.content,
            cover: downloadURL,
            category: post.category,
          
            //fileref: fileRef,
        };

        await firebase.firestore().collection("posts").add(newPost);


    }

    async updatePost(postId, postData) {
        if (postData["cover"]) {
            const storageRef = firebase.storage().ref();
            const storageChild = storageRef.child(postData.cover.name);
            const postCover = await storageChild.put(postData.cover);
            const downloadURL = await storageChild.getDownloadURL();
            //const fileRef = await postCover.ref.location.path;

            await storageRef.child(postData["oldcover"]).delete().catch(err => {
                console.log(err);
            });
            console.log("image deleted")

            let updatePost = {
                title: postData.title,
                content: postData.content,
                cover: downloadURL,
                category: postData.category,
           
                //fileref: fileRef,
            };
            return await firebase.firestore().collection("posts").doc(postId).set(updatePost, { merge: true });

        } else {
            return await firebase.firestore().collection("posts").doc(postId).set(postData, { merge: true });
        }

    }
    async deletePost(postId, fileRef) {
        const storageRef = firebase.storage().ref();
        await storageRef.child(fileRef).delete().catch(err => {
            console.log(err);
        });
        return await firebase.firestore().collection("posts").doc(postId).delete();
    }

}


export default new Firebase();