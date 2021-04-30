// ログインしたユーザー
var userid = sessionStorage.getItem('userid');
console.log(userid);
// 投稿者のお店の名前とid
var shopname = sessionStorage.getItem('name');
var usersID = sessionStorage.getItem('usersID');
var photos = sessionStorage.getItem('photo');
sessionStorage.setItem('name', "");
sessionStorage.setItem('photo', "");
console.log("phot");

const db = firebase.firestore().collection('shop');
const dbuser = firebase.firestore().collection('users');

let flag = false;
const friends = firebase.firestore().collection("friend");
friends.onSnapshot(function (querySnapshot) {
    const dataArray = [];
    querySnapshot.docs.forEach(function (doc) {
        const data = {
            id: doc.id,
            data: doc.data(),
        }
        dataArray.push(data);
    });
    dataArray.forEach(function (data) {
        if ((userid == data.data.usersID) && (usersID == data.data.friendID)) {
            $("#btn").html("フォロー済み");
            document.getElementById("btn").class = "id";
            flag = true;
        } else if (photos != "") {
            $("#btn").html("投稿削除");
            document.getElementById("btn").class = "id";
            flag = true;
        }
    });
});
console.log(flag);
$("#btn").on('click', function () {
    if (flag == true) {
        if (photos != "") {
            db.where("photo", "==", photos).where("usersID", "==", userid)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        console.log(doc.id);
                        firebase.firestore().collection("shop").doc(doc.id).delete().then(() => {
                            setTimeout(function () {
                                window.location.href = '../my_page/index.html';
                            }, 10);
                        }).catch((error) => {
                            console.error("Error removing document: ", error);
                        });
                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        }
        console.log("ok");
    } else {
        const friend = firebase.firestore().collection("friend");
        friend.add({
            friendID: usersID,
            usersID: userid,
        });
    }
});


$("#btn_2").on('click', function () {
    db.where("photo", "==", photos).where("usersID", "==", userid).onSnapshot(function (querySnapshot) {
        const dataArray = [];
        querySnapshot.docs.forEach(function (doc) {
            const data = {
                id: doc.id,
                data: doc.data(),
            }
            dataArray.push(data);
        });
        const name = [];
        dataArray.forEach(function (data) {
            name.push(`${data.data.name}`);
        });
        sessionStorage.setItem('shop_name', name[0]);
        setTimeout(function () {
            window.location.href = '../mainpage/change.html';
        }, 100);
    });
});


if (photos != "") {
    db.where("photo", "==", photos).where("usersID", "==", userid).onSnapshot(function (querySnapshot) {
        const dataArray = [];
        querySnapshot.docs.forEach(function (doc) {
            const data = {
                id: doc.id,
                data: doc.data(),
            }
            dataArray.push(data);
        });
        const img = [];
        const name = [];
        const address = [];
        const urls = [];
        const budget = [];
        const comment = [];
        const genre = [];
        const evaluation = [];
        dataArray.forEach(function (data) {
            img.push(`${data.data.photo}`);
            name.push(`${data.data.name}`);
            address.push(`${data.data.address}`);
            urls.push(`${data.data.urls}`);
            budget.push(`${data.data.budget}`);
            comment.push(`${data.data.comment}`);
            genre.push(`${data.data.genre}`);
            evaluation.push(`${data.data.evaluation}`);
        });
        document.getElementById("img").src = img[0];
        $("#name").html(name[0]);
        $("#address").html(address[0]);
        $("#urls").html(urls[0]);
        $("#budget").html(budget[0]);
        $("#comment").html(comment[0]);
        $("#genre").html(genre[0]);
        $("#evaluation").html(evaluation[0]);
        console.log(evaluation[0]);
    });
} else {
    db.where("name", "==", shopname).where("usersID", "==", usersID).onSnapshot(function (querySnapshot) {
        const dataArray = [];
        querySnapshot.docs.forEach(function (doc) {
            const data = {
                id: doc.id,
                data: doc.data(),
            }
            dataArray.push(data);
        });
        const img = [];
        const name = [];
        const address = [];
        const urls = [];
        const budget = [];
        const comment = [];
        const genre = [];
        const evaluation = [];
        dataArray.forEach(function (data) {
            img.push(`${data.data.photo}`);
            name.push(`${data.data.name}`);
            address.push(`${data.data.address}`);
            urls.push(`${data.data.urls}`);
            budget.push(`${data.data.budget}`);
            comment.push(`${data.data.comment}`);
            genre.push(`${data.data.genre}`);
            evaluation.push(`${data.data.evaluation}`);
        });
        document.getElementById("img").src = img[0];
        $("#name").html(name[0]);
        $("#address").html(address[0]);
        $("#urls").html(urls[0]);
        $("#budget").html(budget[0]);
        $("#comment").html(comment[0]);
        $("#genre").html(genre[0]);
        $("#evaluation").html(evaluation[0]);
        const block = document.getElementById("btn_2");
        block.style.display = "none";
    });
}

if (photos == "") {
    dbuser.onSnapshot(function (querySnapshot) {
        const dataArray = [];
        querySnapshot.docs.forEach(function (doc) {
            const data = {
                id: doc.id,
                data: doc.data(),
            }
            dataArray.push(data);
        });
        const usernames = [];
        dataArray.forEach(function (data) {
            if (userid == data.data.usersID) {
                usernames.push(`${data.data.name}`);
            }
        });
        console.log(usernames[0]);
        $("#usersID").html(usernames[0] + "さんの投稿");
    });
} else {
    $("#usersID").html("投稿情報");
}
// db.collection("cities").doc("DC").delete().then(() => {
//     console.log("Document successfully deleted!");
// }).catch((error) => {
//     console.error("Error removing document: ", error);
// });

// // Add a new document in collection "cities"
// db.collection("cities").doc("LA").set({
//     name: "Los Angeles",
//     state: "CA",
//     country: "USA"
// })
//     .then(() => {
//         console.log("Document successfully written!");
//     })
//     .catch((error) => {
//         console.error("Error writing document: ", error);
//     });


