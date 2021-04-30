var userid = sessionStorage.getItem('userid');
var shop_name = sessionStorage.getItem('shop_name');
sessionStorage.setItem('shop_name', "");
console.log(userid);
const db = firebase.firestore().collection('shop');

const img = [];
const nam = [];
const address = [];
const urls = [];
const budget = [];
const comment = [];
const genre = [];
const evaluation = [];
const middle_area = [];

db.where("name", "==", shop_name).where("usersID", "==", userid).onSnapshot(function (querySnapshot) {
    const dataArray = [];
    querySnapshot.docs.forEach(function (doc) {
        const data = {
            id: doc.id,
            data: doc.data(),
        }
        dataArray.push(data);
    });
    dataArray.forEach(function (data) {
        img.push(`${data.data.photo}`);
        nam.push(`${data.data.name}`);
        address.push(`${data.data.address}`);
        urls.push(`${data.data.urls}`);
        budget.push(`${data.data.budget}`);
        comment.push(`${data.data.comment}`);
        genre.push(`${data.data.genre}`);
        evaluation.push(`${data.data.evaluation}`);
        middle_area.push(`${data.data.middle_area}`);
    });
    $("#name").html(nam[0]);
});


$('#submit').on('click', function () {
    db.where("name", "==", shop_name).where("usersID", "==", userid)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let selectbox = document.getElementById('selectbox');
                let message = document.getElementById('message');
                console.log(doc.id);
                console.log(selectbox.value);
                console.log(message.value);
                firebase.firestore().collection("shop").doc(doc.id).set({
                    genre: genre[0],
                    budget: budget[0],
                    urls: urls[0],
                    address: address[0],
                    middle_area: middle_area,
                    name: nam[0],
                    photo: img[0],
                    evaluation: selectbox.value,
                    comment: message.value,
                    usersID: userid,
                })
                    .then(() => {
                        console.log("Document successfully written!");
                        sessionStorage.setItem('photo', img[0]);
                        setTimeout(function () {
                            window.location.href = 'check_shop.html';
                        }, 10);
                    })
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    console.log("aa");
});