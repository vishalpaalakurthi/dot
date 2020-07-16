import app from "firebase/app";
import { firebaseConfig } from "./../constants";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

class Firebase {
    constructor() {
        if (app.apps.length === 0) {
            app.initializeApp(firebaseConfig);
            this.auth = app.auth();
            this.db = app.database()
            this.store = app.firestore()
            this.user = {};
        }
    }

    login() {
        return new Promise((resolve, reject) => {
            var provider = new app.auth.GithubAuthProvider();
            this.auth.signInWithPopup(provider).then((result) => {
                let { user } = result
                this.db.ref('/users/' + user.uid).once('value').then(snap => {
                    if (snap.val()) {
                        return this.getUserInfo(user.uid).then(u => {
                            localStorage.setItem('authedUser', u.uid)
                            return resolve(u)
                        })
                    }
                  return this.createuser(user.uid,result).then(u => {
                        localStorage.setItem('authedUser', u.uid)                        
                        return resolve(u);
                    })
                })
            }).catch(function (error) {
                var errorCode = error.code;
                reject(errorCode)
            });
        });
    }
    createuser(uid,result ) {
        return new Promise((resolve, reject) => { 
            const user = this.auth.currentUser
            this.user = {
                uid: user.uid,
                name: user.displayName || 'untitled',
                email: user.email,
                verified: user.emailVerified,
                photoURL: user.photoURL,
                createdOn: user.metadata.creationTime,
                lastLogin: user.metadata.lastSignInTime,
                onboard: true,
                theme: 'blaze',
                accessToken: result.credential.accessToken,
                lastPath: '/',
                selectedWorkspaces: uid,
                workspaces: {
                   [uid] : { 
                        title: `${user.displayName}-workspace` || `untitled-workspace'`,
                        members: [{ uid: user.uid, access: 'OWNER' }],
                        private: true
                    }
                }
            }
            this.db.ref('users/' + uid).set(this.user);
            this.store.collection('/workspaces/').doc(uid).set({
                title: 'Personal space',
                createdOn: user.metadata.creationTime,
                lastUpdatedOn: user.metadata.creationTime,
                members: [{
                    id: user.displayName + '-workspace',
                    role: 'OWNER',
                    private: true
                }]
            })
            resolve(this.user)
        })
    }
    getUserInfo(uid) {
        return new Promise(async (resolve, reject) => {
            app.database().ref('users/' + uid).once('value').then(snapshot => {
                this.user = snapshot.val();
                return resolve(snapshot.val())
            })
        })
    }
    updateUserInfo(user) {
        return new Promise((resolve, reject) => { 
            this.db.ref('/users/' + user.uid).update(user).then(() => {
                this.user = user
                resolve(user);
            }).catch(e => {
                reject(e)
            })
        })
    }
    signOut() {
        localStorage.clear();
        return this.auth.signOut();
    }

    getWorkspaces(){
        return new Promise((resolve,reject)=>{ 
            resolve(this.user.workspaces)
        })
    }

    createWorkspace(wsDef, user) {
        return new Promise((resolve, reject) => {
            this.store.collection("/workspaces/").add({
                title: wsDef.title,
                createdOn: new Date(),
                lastUpdatedOn: new Date(),
                members: wsDef.members,
                private: true
            }).then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
                wsDef.id = docRef.id;
                user.workspaces.push(wsDef);
                resolve(wsDef);
            }).catch(function (error) {
                console.error("Error adding document: ", error);
                resolve(wsDef);
            });
        })
    }

}

export default new Firebase();