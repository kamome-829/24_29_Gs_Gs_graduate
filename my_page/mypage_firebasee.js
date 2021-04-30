var userid = sessionStorage.getItem('userid');
console.log(userid);
const db = firebase.firestore().collection('shop')
db.where("usersID", "==", userid).onSnapshot(function (querySnapshot) {
    const dataArray = []; // 必要なデータだけが入った新しい配列を作成 
    querySnapshot.docs.forEach(function (doc) {
        const data = {
            id: doc.id,
            data: doc.data(),
        }
        dataArray.push(data);
    });
    let count = 0;
    dataArray.forEach(function (data) {
        let element = document.getElementById('photo-list');
        //element.insertAdjacentHTML('beforeend', '<li><img src ="' + data.data.photo + '" class="photo-list-img"></li>')
        var block = document.getElementById("photo" + count);
        block.style.display = "block";
        document.getElementById("photo" + count).src = data.data.photo;
        console.log(count + data.data.photo);
        count++;
    })
});

const users = firebase.firestore().collection('users')
users.where("usersID", "==", userid).onSnapshot(function (querySnapshot) {
    const dataArray = []; // 必要なデータだけが入った新しい配列を作成 
    querySnapshot.docs.forEach(function (doc) {
        const data = {
            id: doc.id,
            data: doc.data(),
        }
        dataArray.push(data);
    });
    const usersID = [];
    dataArray.forEach(function (data) {
        usersID.push(`${data.data.name}さんの基本データ`);
    })
    $("#usersID").html(usersID[0]);
});

function getId(ele) {
    var getid = document.getElementById(ele);
    console.log(getid.src);
    sessionStorage.setItem('photo', getid.src);
    setTimeout(function () {
        window.location.href = '../mainpage/check_shop.html';
    }, 1000);
}