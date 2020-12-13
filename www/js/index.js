let packages = [];

function init() {
    // read data from cookie
    pkgsv = document.cookie.split("=")[1];
    packages = JSON.parse(pkgsv);
    showPackages();
}

function newdialog() {
    // clear inputs
    document.getElementById("name").value = null;
    document.getElementById("fromDate").value = null;
    document.getElementById("toDate").value = null;
}

function showPackages() {
    let today = new Date();
    // sort packages
    packages.sort((a, b) => {
        let afd = Math.ceil((new Date(a.f).getTime() - new Date(today).getTime()) / 86400000) + Math.ceil((new Date(a.t).getTime() - new Date(today).getTime()) / 86400000);
        let bfd = Math.ceil((new Date(b.f).getTime() - new Date(today).getTime()) / 86400000) + Math.ceil((new Date(b.t).getTime() - new Date(today).getTime()) / 86400000);
        return afd - bfd;
    });
    let root = document.getElementById("packages");
    root.innerHTML = "";
    for (let i in packages) {
        let package = packages[i];
        let insert = '<div class="row mt-2"><div class="col"><p class="font-weight-bold my-0">aaa</p><p class="text-secondary my-0">bbb</p></div><div class="col-auto"><button type="button" class="btn btn-success btn-sm mr-1" onclick="remove(ccc)"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg></button><button type="button" class="btn btn-outline-danger btn-sm" onclick="remove(ccc)"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/></svg></button></div></div>';
        insert = insert.replace("aaa", package.n);
        // calculate days
        let min = Math.ceil((new Date(package.f).getTime() - today.getTime()) / 86400000);
        let max = Math.ceil((new Date(package.t).getTime() - today.getTime()) / 86400000);
        let when = min + " do " + max + " dni";
        insert = insert.replace("bbb", when);
        insert = insert.replace("ccc", i);
        insert = insert.replace("ccc", i);
        root.innerHTML += insert;
    }
}

function selectedFrom() {
    // copy value to other date field
    let to = document.getElementById("toDate");
    if (to.value == "") {
        to.value = document.getElementById("fromDate").value;
    }
}

function remove(i) {
    packages.splice(i, 1);
    savePackagesToCookie();
    showPackages();
}

function addPackage() {
    // validate input

    // close window and save data
    $('#new').modal('hide');
    let package = {
        n: document.getElementById("name").value,
        f: document.getElementById("fromDate").value,
        t: document.getElementById("toDate").value
    }
    packages.push(package);
    savePackagesToCookie();
    showPackages();
}

function savePackagesToCookie() {
    let exp = new Date().getTime() + 365 * 24 * 60 * 60 * 1000;
    let c = "pkgs=" + JSON.stringify(packages) + ";expires=" + new Date(exp).toGMTString();
    document.cookie = c;
}

init();