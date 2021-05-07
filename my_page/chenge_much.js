var userid = sessionStorage.getItem('userid');
console.log("userid");
let flag = true;

db.onSnapshot(function (querySnapshot) {
    const dataArray = [];
    querySnapshot.docs.forEach(function (doc) {
        const data = {
            id: doc.id,
            data: doc.data(),
        }
        dataArray.push(data);
    });
    dataArray.forEach(function (data) {
        if (userid == data.data.usersID) {
            flag = false;
        }
    });
});

console.log(flag);

document.getElementById("submit").onclick = function () {
    if (flag == true) {
        const db = firebase.firestore().collection('much');
        var atmosphere = document.getElementById('select_atmosphere');
        var customer = document.getElementById('select_customer');
        var taste = document.getElementById('select_taste');
        var flavor = document.getElementById('select_flavor');
        var amount = document.getElementById('select_amount');
        const data = {
            atmosphere: atmosphere.value,
            customer: customer.value,
            taste: taste.value,
            flavor: flavor.value,
            amount: amount.value,
            usersID: userid,
        }
        db.add(data);
        console.log(data);
        setTimeout(function () {
            location.href = "my_much.html";
        }, 1000);
    } else {
        console.log("a");
    }
};
