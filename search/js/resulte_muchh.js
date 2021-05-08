var userid = sessionStorage.getItem('userid');
var select = sessionStorage.getItem('select');
var user_array = [];
var arraycount = sessionStorage.getItem('arraycount');

// for (let i = 0; i < arraycount; i++) {
//     user_array.push(sessionStorage.getItem('user_array' + i));
// }

var select_age = sessionStorage.getItem('select_age');

var budget_much = localStorage.getItem('budget_much');
budget_much = JSON.parse(budget_much);

var genre_much = localStorage.getItem('genre_much');
genre_much = JSON.parse(genre_much);

var user_much = localStorage.getItem('user_much');
user_much = JSON.parse(user_much);

var user_array = localStorage.getItem('user_array');
user_array = JSON.parse(user_array);

// console.log("budget_much");
// console.log(genre_much);
// console.log(user_much);
console.log(user_array);
console.log(arraycount);
//sessionStorage.setItem('select', "");
//sessionStorage.setItem('select_age', "");

let push_count = 0;
const setname = [];
const friend = [];

const db = firebase.firestore().collection('shop');
const udb = firebase.firestore().collection('much');
var data3 = [];

db.onSnapshot(function (querySnapshot) {
    const dataArray = []; // 必要なデータだけが入った新しい配列を作成
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
            if (atmosphere[0] == user_much.atmosphere) {
                count++;
            }
            if (customer[0] == user_much.customer) {
                count++;
            }
            if (taste[0] == user_much.taste) {
                count++;
            }
            if (flavor[0] == user_much.flavor) {
                count++;
            }
            if (amount[0] == user_much.amount) {
                count++;
            }
            var total = (count / 6) * parseFloat(user_much.gein) * 100;
            total = Math.floor(total);
            data3.push(total);
        });
    })
});

//console.log(data3);

db.onSnapshot(function (querySnapshot) {
    const dataArray = []; // 必要なデータだけが入った新しい配列を作成
    querySnapshot.docs.forEach(function (doc) {
        const data = {
            id: doc.id,
            data: doc.data(),
        }
        dataArray.push(data);
    });
    const img = [];
    const name = [];
    const middle_area = [];
    const usersID = [];
    const tir_array = [];
    const much_array = [];
    const genre = [];
    const budget = [];
    let count = 0;
    let usercount = 0;
    dataArray.forEach(function (data) {
        var data1 = 20;
        var data2 = 10;
        var user_data = user_array[usercount];
        for (var key in budget_much) {
            if (budget_much.hasOwnProperty(key)) {
                if (key == data.data.budget) {
                    //budget_much[key] = (Math.round(budget_much[key])) / 100;
                    data1 = (parseFloat(budget_much[key])) * 100
                    data1 = Math.floor(data1);
                }
            }
        }
        for (var key in genre_much) {
            if (genre_much.hasOwnProperty(key)) {
                if (key == data.data.genre) {
                    //genre_much[key] = (Math.round(genre_much[key])) / 100;
                    data2 = (parseFloat(genre_much[key])) * 100
                    data2 = Math.floor(data2);
                }
            }
        }
        console.log(user_data);
        var much = data1 + data2 + user_data;
        tir_array.push(`${data.data.evaluation}`);
        much_array.push(much);
        img.push(`${data.data.photo}`);
        name.push(`${data.data.name}`);
        middle_area.push(`${data.data.middle_area}`);
        usersID.push(`${data.data.usersID}`);
        genre.push(`${data.data.genre}`);
        budget.push(`${data.data.budget}`);
        //let table = document.getElementById('targetTable');
        //let newRow = table.insertRow();
        usercount++;
    })
    for (let i = 0; i < much_array.length - 1; i++) {
        for (let j = much_array.length - 1; j >= i + 1; j--) {   //右から左に操作
            if (much_array[j] > much_array[j - 1]) {
                let keep_much = much_array[j];
                much_array[j] = much_array[j - 1];
                much_array[j - 1] = keep_much;
                let keep_tir = tir_array[j];
                tir_array[j] = tir_array[j - 1];
                tir_array[j - 1] = keep_tir;
                let keep_img = img[j];
                img[j] = img[j - 1];
                img[j - 1] = keep_img;
                let keep_name = name[j];
                name[j] = name[j - 1];
                name[j - 1] = keep_name;
                let keep_middle_area = middle_area[j];
                middle_area[j] = middle_area[j - 1];
                middle_area[j - 1] = keep_middle_area;
                let keep_usersID = usersID[j];
                usersID[j] = usersID[j - 1];
                usersID[j - 1] = keep_usersID;
                let keep_genre = genre[j];
                genre[j] = genre[j - 1];
                genre[j - 1] = keep_genre;
                let keep_budget = budget[j];
                budget[j] = budget[j - 1];
                budget[j - 1] = keep_budget;
            }
        }
    }
    console.log(much_array);
    for (let push_count = 0; push_count < much_array.length; push_count++) {
        if (usersID[push_count] != userid && (select == genre[push_count] || select == "なし") && (select_age == budget[push_count] || select_age == "なし")) {
            let element = document.getElementById(count);
            element.insertAdjacentHTML('beforeend', '<td width="40%"><img id="img" src="' + img[push_count] + '" alt="Listing pic"></td>');
            element.insertAdjacentHTML('beforeend', '<td id="name"' + count + ' width="12%">' + name[push_count] + '</td>');
            element.insertAdjacentHTML('beforeend', '<td width="12%">' + much_array[push_count] + '</td>');
            element.insertAdjacentHTML('beforeend', '<td width="12%">' + tir_array[push_count] + '</td>');
            element.insertAdjacentHTML('beforeend', '<td id="middle_area" width="12%">' + middle_area[push_count] + '</td>');
            //element.insertAdjacentHTML('beforeend', '<td width="12%">' + data.data.usersID + '</td>');
            setname.push(`${name[push_count]}`);
            friend.push(`${usersID[push_count]}`);
            const users = firebase.firestore().collection('users');
            let flag = true;

            users.where("usersID", "==", friend[count]).onSnapshot(function (querySnapshot) {
                const dataArray = []; // 必要なデータだけが入った新しい配列を作成 
                querySnapshot.docs.forEach(function (doc) {
                    const data = {
                        id: doc.id,
                        data: doc.data(),
                    }
                    dataArray.push(data);
                });
                const usersname = [];
                dataArray.forEach(function (data) {
                    usersname.push(`${data.data.name}`);
                    if (flag == true) {
                        element.insertAdjacentHTML('beforeend', '<td width="12%">' + data.data.name + '</td>');
                        flag = false;
                    }
                })
            });
            count++;
        }
    }
});


function getId(ele) {
    console.log(ele);
    sessionStorage.setItem('name', setname[ele]);
    sessionStorage.setItem('usersID', friend[ele]);
    location.href = "../mainpage/check_shop.html"
}

function usermuch(partnerid) {

}