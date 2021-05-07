var userid = sessionStorage.getItem('userid');
console.log(userid);

const db = firebase.firestore().collection('much');
db.where("usersID", "==", userid).onSnapshot(function (querySnapshot) {
    const dataArray = [];
    querySnapshot.docs.forEach(function (doc) {
        const data = {
            id: doc.id,
            data: doc.data(),
        }
        dataArray.push(data);
    });
    var atmosphere = [];
    var customer = [];
    var taste = [];
    var flavor = [];
    var amount = [];
    dataArray.forEach(function (data) {
        atmosphere.push(`${data.data.atmosphere}`);
        customer.push(`${data.data.customer}`);
        taste.push(`${data.data.taste}`);
        flavor.push(`${data.data.flavor}`);
        amount.push(`${data.data.amount}`);
    });
    $("#atmosphere").html("雰囲気： " + atmosphere[0]);
    $("#customer").html("接客： " + customer[0]);
    $("#flavor").html("味： " + taste[0] + " " + flavor[0]);
    $("#amount").html("量： " + amount[0]);
});