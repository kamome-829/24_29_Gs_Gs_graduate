var userid = sessionStorage.getItem('userid');
console.log(userid);
var flag = true;

const db = firebase.firestore().collection('much');
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
            console.log("a");
        }
    });
});



document.getElementById("submit").onclick = function () {
    if (flag == true) {
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
        db.where("usersID", "==", userid)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var atmosphere = document.getElementById('select_atmosphere');
                    var customer = document.getElementById('select_customer');
                    var taste = document.getElementById('select_taste');
                    var flavor = document.getElementById('select_flavor');
                    var amount = document.getElementById('select_amount');
                    firebase.firestore().collection("much").doc(doc.id).set({
                        atmosphere: atmosphere.value,
                        customer: customer.value,
                        taste: taste.value,
                        flavor: flavor.value,
                        amount: amount.value,
                        usersID: userid,
                    })
                        .then(() => {
                            console.log("Document successfully written!");
                            setTimeout(function () {
                                location.href = "my_much.html";
                            }, 1000);
                        })
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }
};
