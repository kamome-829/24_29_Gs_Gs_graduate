var userid = sessionStorage.getItem('userid');
console.log(userid);
console.log("fdxc");
const db = firebase.firestore().collection('shop');
const udb = firebase.firestore().collection('much');
const evaluation = [];
const budget = [];
const genre = [];
let budget_overall = 0;
let genre_overall = 0;
let gain = [0.6, 0.4];
let gain_user = [0.5, 0.4, 0.3];

db.where("usersID", "==", userid).onSnapshot(function (querySnapshot) {

    const dataArray = [];

    querySnapshot.docs.forEach(function (doc) {
        const data = {
            id: doc.id,
            data: doc.data(),
        }
        dataArray.push(data);
    });
    dataArray.forEach(function (data) {
        switch (data.data.evaluation) {
            case "1":
                evaluation.push(`0.2`);
                break;
            case "2":
                evaluation.push(`0.4`);
                break;
            case "3":
                evaluation.push(`0.6`);
                break;
            case "4":
                evaluation.push(`0.8`);
                break;
            case "5":
                evaluation.push(`1.0`);
                break;
        }
        budget.push(`${data.data.budget}`);
        genre.push(`${data.data.genre}`);
    });

    var budget_obj = {};
    var genre_obj = {};
    var budget_evaluation = {};
    var genre_evaluation = {};
    var budget_set = {};
    var genre_set = {};

    for (var i = 0; i < genre.length; i++) {
        var elm = genre[i];
        genre_obj[elm] = (genre_obj[elm] || 0) + 1;
        genre_evaluation[elm] = (genre_evaluation[elm] || 0) + parseFloat(evaluation[i]);
    }
    for (var i = 0; i < budget.length; i++) {
        var elm = budget[i];
        budget_obj[elm] = (budget_obj[elm] || 0) + 1;
        budget_evaluation[elm] = (budget_evaluation[elm] || 0) + parseFloat(evaluation[i]);
    }

    for (var key in budget_obj) {
        if (budget_obj.hasOwnProperty(key)) {
            var val = budget_obj[key];
            var val2 = budget_evaluation[key];
            var total = val2 / val;
            budget_set[key] = (Math.round(total * gain_user[1] * 100)) / 100;
        }
    }

    for (var key in genre_obj) {
        if (genre_obj.hasOwnProperty(key)) {
            var val = genre_obj[key];
            var val2 = genre_evaluation[key];
            var total = val2 / val;
            genre_set[key] = (Math.round(total * gain_user[0] * 100)) / 100;
        }
    }

    console.log(budget_set);
    console.log(genre_set);

    localStorage.setItem('budget_much', JSON.stringify(budget_set));
    localStorage.setItem('genre_much', JSON.stringify(genre_set));
});

let m_atmosphere;
let m_customer;
let m_taste;
let m_flavor;
let m_amount;

udb.where("usersID", "==", userid).onSnapshot(function (querySnapshot) {
    const dataArray = [];
    querySnapshot.docs.forEach(function (doc) {
        const data = {
            id: doc.id,
            data: doc.data(),
        }
        dataArray.push(data);
    });
    dataArray.forEach(function (data) {
        const datas = {
            atmosphere: data.data.atmosphere,
            customer: data.data.customer,
            taste: data.data.taste,
            flavor: data.data.flavor,
            amount: data.data.amount,
            usersID: userid,
            gein: gain_user[2],
        }
        m_atmosphere = datas.atmosphere;
        m_customer = datas.customer;
        m_taste = datas.taste;
        m_flavor = datas.flavor;
        m_amount = datas.amount;
        localStorage.setItem('user_much', JSON.stringify(datas));
        console.log(datas);
    });
});

db.onSnapshot(function (querySnapshot) {
    const dataArray = []; // 必要なデータだけが入った新しい配列を作成
    pushdata = [];
    var count = 0;
    querySnapshot.docs.forEach(function (doc) {
        const data = {
            id: doc.id,
            data: doc.data(),
        }
        dataArray.push(data);
    });
    dataArray.forEach(function (data) {
        udb.where("usersID", "==", data.data.usersID).onSnapshot(function (querySnapshot) {
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
            var count = 1;
            if (atmosphere[0] == m_atmosphere) {
                count++;
            }
            if (customer[0] == m_customer) {
                count++;
            }
            if (taste[0] == m_taste) {
                count++;
            }
            if (flavor[0] == m_flavor) {
                count++;
            }
            if (amount[0] == m_amount) {
                count++;
            }
            var total = (count / 6) * parseFloat(gain_user[2]) * 100;
            total = Math.floor(total);
            pushdata.push(total);
            sessionStorage.setItem('user_array' + count, pushdata);
        });
        count++;
    });
    //localStorage.setItem('user_array', JSON.stringify(pushdata));
    sessionStorage.setItem('arraycount', count);
    console.log(pushdata);
});