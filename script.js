var logForm = document.getElementById("logForm");
var logInfo = document.getElementById("logInfo");
var regForm = document.getElementById("regForm");
var regInfo = document.getElementById("regInfo");
var admin = document.getElementById("adminForm");
var tanar = document.getElementById("tanarForm");
var diak = document.getElementById("diakForm");
var kod = document.getElementById("kod");
var gombok = document.querySelector(".background");
var Ktartalom = document.getElementById("Ktartalom");
var Modositastabla = document.getElementById("Modositastabla");
var Hozzaadastabla = document.getElementById("Hozzaadastabla");
var KodHozzaadastabla = document.getElementById("KodHozzaadastabla");
var hozzaadasvissza = document.getElementById("hozzaadasvissza");
var hozzaadas = document.getElementById("hozzaadas");
var kodhozzaadasvissza = document.getElementById("kodhozzaadasvissza");
var kodhozzaadas = document.getElementById("kodhozzaadas");
var kh = document.getElementById("kh");
var khkod = document.getElementById("khkod");
var Ftartalom = document.getElementById("Ftartalom");
var FelhasznaloModositastabla = document.getElementById("FelhasznaloModositastabla");
var gém=document.getElementById("gém");
var Kodtartalom = document.getElementById("Kodtartalom");
var KodModositastabla = document.getElementById("KodModositastabla");
var vissza = document.getElementById("visszagomb");
var vissza2 = document.getElementById("visszagomb2");
var vissza3 = document.getElementById("visszagomb3");
var kijeletkezesgomb = document.getElementById("kijelentkezesgomb");
var valtoztatnivalo = document.getElementById("valtoztatnivalo");
var VisszaAMenubeGomb=document.getElementById("VisszaAMenubeGomb");
document.getElementById("felezes").style.display="none";
document.getElementById("telefon").style.display="none";
document.getElementById("nezo").style.display = "none";
document.getElementById("nyertel").style.display="none";
regForm.style.display = "none";
var pontszam = 0;
//admin
admin.style.display = "none";
var gombertek2;
var gombertek4;
var gombertek6;
kod.style.display = "none";
Ktartalom.style.display = "none";
kh.style.display = "none";
khkod.style.display = "none";
Hozzaadastabla.style.display = "none";
KodHozzaadastabla.style.display = "none";
Modositastabla.style.display = "none";
hozzaadas.style.display = "none";
kodhozzaadasvissza.style.display = "none";
kodhozzaadas.style.display = "none";
Ftartalom.style.display = "none";
FelhasznaloModositastabla.style.display = "none";
Kodtartalom.style.display = "none";
KodModositastabla.style.display = "none";
kijeletkezesgomb.style.display = "none";
vissza.style.display = "none";
vissza2.style.display = "none";
vissza3.style.display = "none";
//tanar
tanar.style.display = "none";
//diak
diak.style.display = "none";
VisszaAMenubeGomb.style.display="none";
gém.style.display="none";
//Init
function Init() {
    var fNev = document.getElementById("fNev");
    var fNev2 = document.getElementById("fNev2");
    var fNev3 = document.getElementById("fNev3");
    var userType = sessionStorage.getItem("userType");

    if (sessionStorage.getItem("login")) {
        gombok.style.display = "none";
        if (userType == "Admin") {
            admin.style.display = "block";
            fNev.innerHTML = `Admin: ${sessionStorage.getItem("fn")}`;

        }
        else if (userType == "Tanar") {
            tanar.style.display = "block";
            fNev2.innerHTML = `Tanar: ${sessionStorage.getItem("fn")}`;

        }
        else if (userType == "Diak") {
            diak.style.display = "block";
            fNev3.innerHTML = `Diak: ${sessionStorage.getItem("fn")}`;

        }
        logForm.style.display = "none";
        regForm.style.display = "none";
        kijeletkezesgomb.style.display = "block";
    }
}
window.onload = Init;
//adatbázis
const AdatbazisEleres = () => {
    fetch("http://127.0.0.1:3000")
        .then(function (response) {
            if (!response.ok) {
                console.log("Nem jó válasz érekezett az adatbázisból");
                return Promise.reject("Nem jó válasz érekezett az adatbázisból");
            }
            return response.json();
        })
        .then(function (response) {
            if (response.Error) {
                console.log(response.Error);
                console.log(response.Error);
            } else {
                console.log("Az adatbázis kapcsolat él, az adatokat eléri.");
                console.log("Táblák: ");
                response.forEach(element => {
                    console.log(element);
                });
            }
        });
}
AdatbazisEleres();
async function hash(string) {
    const utf8 = new TextEncoder().encode(string);
    return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
            .map((bytes) => bytes.toString(16).padStart(2, '0'))
            .join('');
        return hashHex;
    });
}
const LekerdezesEredmenye = (sql) => {
    const data = { lekerdezes: sql };
    return fetch("http://127.0.0.1:3000/lekerdezes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data)
    })
        .then(function (response) {
            if (!response.ok) {
                return Promise.reject("Nem jó válasz érekezett az adatbázisból");
            }
            return response.json();
        })
        .then(function (response) {
            if (response.Error) {
                return response.Error;
            } else {
                return response;
            }
        });
}
// bejelentkezés és regisztráció megjelenítése
function atiranyitas() {
    if (regForm.style.display === "block") {
        regForm.style.display = "none";
        logForm.style.display = "block";
    } else {
        logForm.style.display = "none";
        regForm.style.display = "block";
    }
}
//bejelentkezés
function login() {
    let fn = document.getElementById("fn").value;
    let pw = document.getElementById("pw").value;
    const regExp = /[A-Za-z0-9\.\_]{1,16}$/;
    let nev = document.getElementById("fnl");
    let jelszo = document.getElementById("jelszol");
    if (fn == "") {
        nev.classList.add("csillag");
    }
    else {
        nev.classList.remove("csillag");
    }
    if (pw == "") {
        jelszo.classList.add("csillag");
    }
    else { jelszo.classList.remove("csillag"); }
    if (fn == "" || pw == "") logInfo.innerHTML = "Nem töltötte ki az adatokat!";
    else if (regExp.test(fn) && regExp.test(pw)) {
        hash(pw).then((hash) => {
            let sql = "select * from felhasznalok f where f.nev='" + fn + "' and f.password='" + hash + "'";
            let sql2 = "SELECT f.admin FROM felhasznalok f WHERE f.nev = '" + fn + "';"
            let sql3 = "SELECT f.tanar FROM felhasznalok f WHERE f.nev = '" + fn + "';"
            console.log(sql);
            LekerdezesEredmenye(sql).then((valasz) => {
                console.log(valasz);
                if (valasz.length == 1) {
                    sessionStorage.setItem("fn", valasz[0].nev);
                    sessionStorage.setItem("jog", valasz[0].jog);
                    sessionStorage.setItem("login", true);
                    LekerdezesEredmenye(sql2).then((valasz) => {

                        if (valasz[0].admin === 0) {
                            LekerdezesEredmenye(sql3).then((valasz) => {
                                if (valasz[0].tanar === 0) {
                                    sessionStorage.setItem("userType", "Diak");
                                    Init();
                                    kijeletkezesgomb.style.display = "block";

                                }
                                else {
                                    sessionStorage.setItem("userType", "Tanar");
                                    Init();
                                    kijeletkezesgomb.style.display = "block";

                                }
                            });
                        }
                        else {
                            sessionStorage.setItem("userType", "Admin");
                            Init();
                            kijeletkezesgomb.style.display = "block";

                        }
                    });
                    logForm.style.display = "none";
                    regForm.style.display = "none";
                }
                else if (valasz.length == 0) {
                    logInfo.innerHTML = "Nem jó a felhasználó név vagy a jelszó!";
                }
            });
        })
    }

}
//-- jelszo
let password = document.getElementById("regpw");
let jelszomegjelenes = document.querySelector(".jelszomegjelenes");
let erossegSav = document.querySelector("#strength-bar");
let erossegSzoveg = document.querySelector(".strength-text");

password.addEventListener("focus", function () {
    jelszomegjelenes.style.display = "block";
});
password.addEventListener("blur", function () {
    jelszomegjelenes.style.display = "none";
});
function SzinezzesEsSzoveg(color, szoveg) {
    erossegSav.style.backgroundColor = color;
    erossegSzoveg.innerHTML = szoveg;
    erossegSzoveg.style.color = color;
}
function ErosssegTorles() {
    erossegSav.style.width = 0;
    erossegSav.style.backgroundColor = "";
    erossegSzoveg.innerHTML = "";
}
password.addEventListener("keyup", ellenorizJelszoErossseget);
// jelszo erossege
function ellenorizJelszoErossseget() {
    let erosseg = 0;

    if (password.value == "") {
        ErosssegTorles();
        return false;
    }

    if (password.value.match(/\s/)) {
        SzinezzesEsSzoveg("red", "Szóköz nem lehet benne!");
        return false;
    }

    if (password.value.match(/\<\>\#\,\*\+\=\!\'\(\)\%\/\&\@\$\ß\{\}\[\]\@/)) {
        SzinezzesEsSzoveg("red", "Csak kötőjel, alulvonás és pont lehet benne");
        return false;
    }

    if (password.value.length > 14) {
        SzinezzesEsSzoveg("red", "A jelszó több mint 14 karakter!");
        return false;
    }

    if (password.value.length < 4) {
        erosseg = 20;
        SzinezzesEsSzoveg("red", "Túl rövid a jelszó!");

    }
    else {

        let kisbetu = password.value.match(/[a-z]/);
        let nagybetu = password.value.match(/[A-Z]/);
        let szamok = password.value.match(/[0-9]/);
        let specialisKarakterek = password.value.match(/\-\.\_]/);

        if (kisbetu || nagybetu || szamok || specialisKarakterek) {
            erosseg = 40;
            SzinezzesEsSzoveg("red", "Gyenge");
            if (
                (kisbetu && nagybetu) || (kisbetu && szamok) || (kisbetu && specialisKarakterek) ||
                (nagybetu && szamok) || (nagybetu && specialisKarakterek) || (szamok && specialisKarakterek)) {

                if ((kisbetu && nagybetu && szamok) || (kisbetu && nagybetu && specialisKarakterek) ||
                    (kisbetu && szamok && specialisKarakterek) || (nagybetu && szamok && specialisKarakterek)) {

                    if (kisbetu && nagybetu && szamok && specialisKarakterek) {
                        erosseg = 100;
                        SzinezzesEsSzoveg("green", "Nagyon erős");

                    }
                    else {
                        erosseg = 80;
                        SzinezzesEsSzoveg("#088f08", "Erős");
                    }
                }
                else {
                    erosseg = 60;
                    SzinezzesEsSzoveg("orange", "Közepes");
                }
                erossegSav.style.width = erosseg + "%";
                return true;
            }

            else {
                erossegSav.style.width = erosseg + "%";
                return false;
            }
        }

    }

}
//regisztráció
function regisztracio() {
    let tan = 0;
    let regfn = document.getElementById("regfn").value;
    let email = document.getElementById("email").value;
    let regpw = document.getElementById("regpw").value;
    let regpwre = document.getElementById("regpwre").value;
    let diak = document.getElementById("diak").checked;
    let tanar = document.getElementById("tanar").checked;
    let kod = document.getElementById("kod").value;
    let nev = document.getElementById("nevlabel");
    let jelszo = document.getElementById("jelszolabel");
    let emaill = document.getElementById("emaillabel");
    if (regfn == "") {
        nev.classList.add("csillag");
    }
    else {
        nev.classList.remove("csillag");
    }
    if (email == "") {
        emaill.classList.add("csillag");
    }
    else { emaill.classList.remove("csillag"); }
    if (regpw == "" || regpwre == "") {
        jelszo.classList.add("csillag");
    }
    else { jelszo.classList.remove("csillag"); }

    const regExp = /^[A-Za-z0-9._]{1,16}$/;
    const emailregExp = /^[\w.\-]+@([\w-]+\.)+[\w-]{2,4}$/;
    sessionStorage.setItem("fn", regfn);
    if (regExp.test(regfn) && regExp.test(regpw) && regExp.test(regpwre) && emailregExp.test(email) && ellenorizJelszoErossseget() && regpwre == regpw && (diak === true || tanar === true)) {
        hash(regpw).then((hash) => {
            let sql4 = "SELECT * FROM kodok k WHERE k.nev='" + kod + "'";
            let sql2 = "SELECT * FROM felhasznalok f WHERE f.nev='" + regfn + "'";
            let sql3 = "SELECT * FROM felhasznalok f WHERE f.email='" + email + "'";

            if (tanar === false) {
                tan = 0;
                let sql = "insert into felhasznalok(id,nev,password,email,tanar)values(null,'" + regfn + "','" + hash + "','" + email + "','" + tan + "')";
                LekerdezesEredmenye(sql2).then((valasz) => {
                    if (valasz.length == 1) {
                        regInfo.innerHTML = "A felhasználó név már foglalt!";
                    }
                    else {
                        LekerdezesEredmenye(sql3).then((valasz) => {
                            if (valasz.length == 1) {
                                regInfo.innerHTML = "Van már ilyen email cím!";
                            }

                            else {
                                LekerdezesEredmenye(sql).then((valasz) => {
                                    console.log(valasz);
                                    logForm.style.display = "none";
                                    regForm.style.display = "none";
                                    sessionStorage.setItem("userType", "Diak");
                                    sessionStorage.setItem("login", true);
                                    Init();
                                })
                            }
                        })
                    }
                })
            }
            else if (tanar === true) {
                LekerdezesEredmenye(sql4).then((valasz) => {
                    if (valasz.length == 1) {
                        tan = 1;
                        let sql = "insert into felhasznalok(id,nev,password,email,tanar)values(null,'" + regfn + "','" + hash + "','" + email + "','" + tan + "')";
                        LekerdezesEredmenye(sql2).then((valasz) => {
                            if (valasz.length == 1) {
                                regInfo.innerHTML = "A felhasználó név már foglalt!";
                            }
                            else {
                                LekerdezesEredmenye(sql3).then((valasz) => {
                                    if (valasz.length == 1) {
                                        regInfo.innerHTML = "Van már ilyen email cím!";
                                    }
                                    else LekerdezesEredmenye(sql).then((valasz) => {
                                        console.log("alma");
                                        console.log(valasz);
                                    })
                                    logForm.style.display = "none";
                                    regForm.style.display = "none";
                                    sessionStorage.setItem("userType", "Tanar");
                                    sessionStorage.setItem("login", true);
                                    Init();


                                });

                            }
                        })
                    }
                    else { regInfo.innerHTML = "Nem jó jelszót adtál meg"; }
                })
            }

        })
    }
    if (regfn == "" || email == "" || regpw == "" || regpwre == "") {
        regInfo.innerHTML = "Nem töltöttél ki minden adatot!";
    }
    else if (!regExp.test(regfn)) regInfo.innerHTML = "Nem jó a felhasználó név!";
    else if (!emailregExp.test(email)) regInfo.innerHTML = "Nem jó az email cím!";
    else if (!ellenorizJelszoErossseget()) regInfo.innerHTML = "Nem elég erős a jelszó!";
    else if (regpwre != regpw) regInfo.innerHTML = "Nem egyezik a két jelszó!";
    else if (diak === false && tanar === false) regInfo.innerHTML = "Nem választotta ki hogy diák vagy tanár!"
}
//Diak gomb vagy Tanar gomb van kiválasztva
function tanarikod() {
    let tanar = document.getElementById("tanar").checked;
    if (tanar === false) {
        kod.style.display = "none";
    }
    else if (tanar === true) {
        kod.style.display = "block";
    }
}
//felhasznalok
function Kijelentkezes() {
    sessionStorage.clear();
    location.reload();
}
//ADMIN
//Kérdések
async function KTartalom() {
    kh.style.display = "block";
    let sqladat = await LekerdezesEredmenye("SELECT COUNT(*) as count FROM kerdesek");
    for (let i = 1; i <= sqladat[0].count; i++) {
        let sql = "SELECT * FROM kerdesek k WHERE k.id='" + i + "'";
        let sql2 = "SELECT k.helyesvalasz FROM kerdesek k WHERE k.id='" + i + "'";
        let valasz = await LekerdezesEredmenye(sql);
        if (valasz.length == 1) {
            let id = document.createElement("div");
            id.innerText = valasz[0].id;
            id.classList.add("valaszok");
            document.getElementById("id").appendChild(id);

            let tema = document.createElement("div");
            tema.innerText = valasz[0].tema;
            tema.classList.add("valaszok");
            document.getElementById("tema").appendChild(tema);

            let kerdes = document.createElement("div");
            kerdes.innerText = valasz[0].kerdes;
            kerdes.classList.add("valaszok");
            document.getElementById("kerdes").appendChild(kerdes);

            let valasz1 = document.createElement("div");
            valasz1.innerText = valasz[0].elsovalasz;
            valasz1.classList.add("valaszok");
            document.getElementById("valasz1").appendChild(valasz1);

            let valasz2 = document.createElement("div");
            valasz2.innerText = valasz[0].masodikvalasz;
            valasz2.classList.add("valaszok");
            document.getElementById("valasz2").appendChild(valasz2);

            let valasz3 = document.createElement("div");
            valasz3.innerText = valasz[0].harmadikvalasz;
            valasz3.classList.add("valaszok");
            document.getElementById("valasz3").appendChild(valasz3);

            let valasz4 = document.createElement("div");
            valasz4.innerText = valasz[0].negyedikvalasz;
            valasz4.classList.add("valaszok");
            document.getElementById("valasz4").appendChild(valasz4);

            let br = document.createElement("br");
            let br2 = document.createElement("br");

            let torlesgomb = document.createElement("button");
            let modositasgomb = document.createElement("button");
            torlesgomb.innerText = "törlés";
            torlesgomb.value = valasz[0].id;
            modositasgomb.innerText = "módosítás";
            modositasgomb.value = valasz[0].id;
            modositasgomb.type = "button";
            torlesgomb.classList.add("gombvalaszok");
            document.getElementById("torlesgomb").appendChild(torlesgomb);
            document.getElementById("torlesgomb").appendChild(br);
            modositasgomb.classList.add("gombvalaszok2");
            document.getElementById("modositasgomb").appendChild(modositasgomb);
            document.getElementById("modositasgomb").appendChild(br2);
            torlesgomb.onclick = function () {
                var gombertek = this.value;
                let sqldelete = "DELETE FROM kerdesek WHERE kerdesek.id=" + gombertek + "";
                let sqlAutoIncrement = "ALTER TABLE kerdesek AUTO_INCREMENT = " + sqladat[0].count + "";
                let sqlujraindexeles = "UPDATE kerdesek k SET k.id = id-1 WHERE id > " + gombertek + "";
                LekerdezesEredmenye(sqldelete);
                LekerdezesEredmenye(sqlujraindexeles);
                LekerdezesEredmenye(sqlAutoIncrement);
            };

            modositasgomb.onclick = async function () {
                gombertek2 = this.value;
                Modositastabla.style.display = "block";
                let ID = document.getElementById("HValaszAdminID");
                ID.innerText = "Id:" + this.value;
                let sql = "SELECT k.tema FROM kerdesek k WHERE k.id='" + this.value + "'";
                let eredmenyObjektum = await LekerdezesEredmenye(sql);
                let tema = eredmenyObjektum[0].tema;
                document.getElementById("TemaModosit").innerText = tema;
                document.getElementById("TemaModosit").value = tema;
            };
            
            LekerdezesEredmenye(sql2).then((valasz) => {
                if (valasz[0].helyesvalasz == "1") {
                    valasz1.style.backgroundColor = "green";
                }
                else if (valasz[0].helyesvalasz == "2") {
                    valasz2.style.backgroundColor = "Green";

                }
                else if (valasz[0].helyesvalasz == "3") {
                    valasz3.style.backgroundColor = "Green";
                }
                else if (valasz[0].helyesvalasz == "4") {
                    valasz4.style.backgroundColor = "Green";
                }
            })
        }
    }
    let betoltes = document.getElementById("betoltesgomb");
    betoltes.style.display = "none";
    Ktartalom.style.display = "block";
    vissza.style.display = "block";
    hozzaadas.style.display = "block";

}
function KerdesHozzadasMenu() {
    Hozzaadastabla.style.display = "block";
    hozzaadas.style.display = "none";
    hozzaadasvissza.style.display = "block";


}
function KerdesHozzadasMenuVissza() {
    Hozzaadastabla.style.display = "none";
    hozzaadas.style.display = "block";
    

}
//kerdes hozzadas
function KerdesHozzaadas() {

    let adminInfo = document.getElementById("adminInfo");
    let helyesvalasz = document.getElementById("HValaszAdminKerdesInput").value;
    let tema = document.getElementById("TemaAdminKerdesInputMod").value;
    let kerdes = document.getElementById("KerdesAdminKerdesInput").value;
    let valasz1 = document.getElementById("Valasz1AdminKerdesInput").value;
    let valasz2 = document.getElementById("Valasz2AdminKerdesInput").value;
    let valasz3 = document.getElementById("Valasz3AdminKerdesInput").value;
    let valasz4 = document.getElementById("Valasz4AdminKerdesInput").value;
    var regex = /[A-Za-z0-9\W_]{1,}/;
    if (helyesvalasz == "" || tema == "" || kerdes == "" || valasz1 == "" || valasz2 == "" || valasz3 == "" || valasz4 == "") {
        adminInfo.innerHTML = "Nem töltöttél ki minden adatot!";
    }
    else if (regex.test(helyesvalasz) && regex.test(tema) && regex.test(kerdes) && regex.test(valasz1) && regex.test(valasz2) && regex.test(valasz3) && regex.test(valasz4)) {
        let sql = "insert into kerdesek(id,helyesvalasz,tema,kerdes,elsovalasz,masodikvalasz,harmadikvalasz,negyedikvalasz)values(null,'" + helyesvalasz + "','" + tema + "','" + kerdes + "','" + valasz1 + "','" + valasz2 + "','" + valasz3 + "','" + valasz4 + "')";
        LekerdezesEredmenye(sql);
        adminInfo.innerHTML = "";
        location.reload();
    }
}
function KerdesekModositasa() {

    let kerdes = document.getElementById("FnevadminMod").value;
    let tema = document.getElementById("TemaAdminKerdesInput").value;
    let helyesvalasz = document.getElementById("HValaszAdminKerdesInputMod").value;
    let valasz1 = document.getElementById("Valasz1AdminKerdesInputMod").value;
    let valasz2 = document.getElementById("Valasz2AdminKerdesInputMod").value;
    let valasz3 = document.getElementById("Valasz3AdminKerdesInputMod").value;
    let valasz4 = document.getElementById("Valasz4AdminKerdesInputMod").value;

    console.log(gombertek2);
    if (!kerdes == "") {
        let sqlmod = "UPDATE kerdesek k SET k.kerdes='" + kerdes + "' WHERE id = " + gombertek2 + "";
        LekerdezesEredmenye(sqlmod);
    }
    if (!tema == "") {
        let sqlmod = "UPDATE kerdesek k SET k.tema='" + tema + "' WHERE id = " + gombertek2 + "";
        LekerdezesEredmenye(sqlmod);
    }
    if (!helyesvalasz == "") {
        let sqlmod = "UPDATE kerdesek k SET k.helyesvalasz='" + helyesvalasz + "' WHERE id = " + gombertek2 + "";
        LekerdezesEredmenye(sqlmod);
    }
    if (!valasz1 == "") {
        let sqlmod = "UPDATE kerdesek k SET k.elsovalasz='" + valasz1 + "' WHERE id = " + gombertek2 + "";
        LekerdezesEredmenye(sqlmod);
    }
    if (!valasz2 == "") {
        let sqlmod = "UPDATE kerdesek k SET k.masodikvalasz='" + valasz2 + "' WHERE id = " + gombertek2 + "";
        LekerdezesEredmenye(sqlmod);
    }
    if (!valasz3 == "") {
        let sqlmod = "UPDATE kerdesek k SET k.harmadikvalasz='" + valasz3 + "' WHERE id = " + gombertek2 + "";
        LekerdezesEredmenye(sqlmod);
    }
    if (!valasz4 == "") {
        let sqlmod = "UPDATE kerdesek k SET k.negyedikvalasz='" + valasz4 + "' WHERE id = " + gombertek2 + "";
        LekerdezesEredmenye(sqlmod);
    }
    location.reload();
}
function KerdesekModositasaVissza() {
    Modositastabla.style.display = "none";
}
//kérdések vissza gomb
function KVissza() {
    let betoltes = document.getElementById("betoltesgomb");
    betoltes.style.display = "block";
    Ktartalom.style.display = "none";
    Modositastabla.style.display = "none";
    Hozzaadastabla.style.display = "none";
    vissza.style.display = "none";
    kh.style.display = "none";
    document.getElementById("id").innerHTML = "";
    document.getElementById("tema").innerHTML = "";
    document.getElementById("kerdes").innerHTML = "";
    document.getElementById("valasz1").innerHTML = "";
    document.getElementById("valasz2").innerHTML = "";
    document.getElementById("valasz3").innerHTML = "";
    document.getElementById("valasz4").innerHTML = "";
    document.getElementById("torlesgomb").innerHTML = "";
    document.getElementById("modositasgomb").innerHTML = "";

}

//Felhasznalok
async function FTartalom() {
    let sqladat = await LekerdezesEredmenye("SELECT COUNT(*) as count FROM felhasznalok");
    for (let i = 1; i <= sqladat[0].count; i++) {
        let sql = "SELECT * FROM felhasznalok f WHERE f.id='" + i + "'";
        let valasz = await LekerdezesEredmenye(sql);
        if (valasz.length == 1) {

            let Fid = document.createElement("div");
            Fid.innerText = valasz[0].id;
            Fid.classList.add("valaszok");
            document.getElementById("Fid").appendChild(Fid);

            let Fnev = document.createElement("div");
            Fnev.innerText = valasz[0].nev;
            Fnev.classList.add("valaszok");
            document.getElementById("Fnev").appendChild(Fnev);

            let Fpassword = document.createElement("div");
            Fpassword.innerText = valasz[0].password;
            Fpassword.classList.add("valaszok");
            document.getElementById("Fpassword").appendChild(Fpassword);

            let Femail = document.createElement("div");
            Femail.innerText = valasz[0].email;
            Femail.classList.add("valaszok");
            document.getElementById("Femail").appendChild(Femail);

            let Ftanare = document.createElement("div");
            Ftanare.innerText = valasz[0].tanar;
            Ftanare.classList.add("valaszok");
            document.getElementById("Ftanare").appendChild(Ftanare);


            let Fadmine = document.createElement("div");
            Fadmine.innerText = valasz[0].admin;
            Fadmine.classList.add("valaszok");
            document.getElementById("Fadmine").appendChild(Fadmine);

            let br = document.createElement("br");
            let br2 = document.createElement("br");

            let torlesgomb = document.createElement("button");
            let modositasgomb = document.createElement("button");
            torlesgomb.innerText = "törlés";
            torlesgomb.value = valasz[0].id;
            modositasgomb.innerText = "módosítás";
            modositasgomb.value = valasz[0].id;
            modositasgomb.type = "button";
            torlesgomb.classList.add("gombvalaszok");
            document.getElementById("Ftorlesgomb").appendChild(torlesgomb);
            document.getElementById("Ftorlesgomb").appendChild(br);
            modositasgomb.classList.add("gombvalaszok2");
            document.getElementById("Fmodositasgomb").appendChild(modositasgomb);
            document.getElementById("Fmodositasgomb").appendChild(br2);
            torlesgomb.onclick = function () {
                var gombertek3 = this.value;
                let sqldelete = "DELETE FROM felhasznalok WHERE felhasznalok.id=" + gombertek3 + "";
                let sqlAutoIncrement = "ALTER TABLE felhasznalok AUTO_INCREMENT = " + sqladat[0].count + "";
                let sqlujraindexeles = "UPDATE felhasznalok f SET f.id = id-1 WHERE id > " + gombertek3 + "";
                LekerdezesEredmenye(sqldelete);
                LekerdezesEredmenye(sqlujraindexeles);
                LekerdezesEredmenye(sqlAutoIncrement);
            };

            modositasgomb.onclick = async function () {
                gombertek4 = this.value;
                FelhasznaloModositastabla.style.display = "block";
                let ID = document.getElementById("FValaszAdminID");
                ID.innerText = "Id:" + this.value;
                let sql = "SELECT f.tanar FROM felhasznalok f WHERE f.id='" + this.value + "'";
                let eredmenyObjektum = await LekerdezesEredmenye(sql);
                let tanar = eredmenyObjektum[0].tanar;
                document.getElementById("tanarModosit").innerText = tanar;
                document.getElementById("tanarModosit").value = tanar;
            };
            
        }
    }
    let betoltes = document.getElementById("felhasznalokgomb");
    betoltes.style.display = "none";
    Ftartalom.style.display = "block";
    vissza2.style.display = "block";
}
//felhasznalok módosítása
function FelhasznalokModositasa() { 

    let felhasznalonev = document.getElementById("FnevMod").value;
    let email = document.getElementById("FemailMod").value;
    let tanare = document.getElementById("FtanareMod").value;

    console.log(gombertek4);
    if (!felhasznalonev == "") {
        let sqlmod = "UPDATE felhasznalok f SET f.nev='" + felhasznalonev + "' WHERE id = " + gombertek4 + "";
        LekerdezesEredmenye(sqlmod);
    }
    if (!email == "") {
        let sqlmod = "UPDATE felhasznalok f SET f.email='" + email + "' WHERE id = " + gombertek4 + "";
        LekerdezesEredmenye(sqlmod);
    }
    if (!tanare == "") {
        let sqlmod = "UPDATE felhasznalok f SET f.tanar='" + tanare + "' WHERE id = " + gombertek4 + "";
        LekerdezesEredmenye(sqlmod);
    }
    location.reload();
}
function FelhasznalokModositasVissza() {
    FelhasznaloModositastabla.style.display = "none";

}
//felhasznalok vissza gomb
function FVissza() {
    let betoltes = document.getElementById("felhasznalokgomb");
    betoltes.style.display = "block";
    Ftartalom.style.display = "none";
    FelhasznaloModositastabla.style.display = "none";
    vissza2.style.display = "none";
    document.getElementById("Fid").innerHTML = "";
    document.getElementById("Fnev").innerHTML = "";
    document.getElementById("Fpassword").innerHTML = "";
    document.getElementById("Femail").innerHTML = "";
    document.getElementById("Ftanare").innerHTML = "";
    document.getElementById("Fadmine").innerHTML = "";
    document.getElementById("Ftorlesgomb").innerHTML = "";
    document.getElementById("Fmodositasgomb").innerHTML = "";
}
async function KodTartalom() {
    khkod.style.display = "block";
    let sqladat = await LekerdezesEredmenye("SELECT COUNT(*) as count FROM kodok");
    for (let i = 1; i <= sqladat[0].count; i++) {
        let sql = "SELECT * FROM kodok f WHERE f.id='" + i + "'";
        let valasz = await LekerdezesEredmenye(sql);
        if (valasz.length == 1) {

            let Kodid = document.createElement("div");
            Kodid.innerText = valasz[0].id;
            Kodid.classList.add("valaszok");
            document.getElementById("idadminKod").appendChild(Kodid);

            let Kodnev = document.createElement("div");
            Kodnev.innerText = valasz[0].nev;
            Kodnev.classList.add("valaszok");
            document.getElementById("nevadminKod").appendChild(Kodnev);

            let Kodido = document.createElement("div");
            if (valasz[0].idokorlat == null) {
                Kodido.innerText = "Univerzális";
            }
            else { Kodido.innerText = valasz[0].idokorlat; }
            Kodido.classList.add("valaszok");
            document.getElementById("idoadminKod").appendChild(Kodido);

            let br = document.createElement("br");
            let br2 = document.createElement("br");

            let torlesgomb = document.createElement("button");
            let modositasgomb = document.createElement("button");
            torlesgomb.innerText = "törlés";
            torlesgomb.value = valasz[0].id;
            modositasgomb.innerText = "módosítás";
            modositasgomb.value = valasz[0].id;
            modositasgomb.type = "button";
            document.getElementById("torlesgombkod").appendChild(torlesgomb);
            document.getElementById("torlesgombkod").appendChild(br);
            torlesgomb.classList.add("gombkodvalaszok");
            document.getElementById("modositasgombkod").appendChild(modositasgomb);
            document.getElementById("modositasgombkod").appendChild(br2);
            modositasgomb.classList.add("gombkodvalaszok2");
            torlesgomb.onclick = function () {
                var gombertek5 = this.value;
                let sqldelete = "DELETE FROM kodok WHERE kodok.id=" + gombertek5 + "";
                let sqlAutoIncrement = "ALTER TABLE kodok AUTO_INCREMENT = " + sqladat[0].count + "";
                let sqlujraindexeles = "UPDATE kodok k SET k.id = id-1 WHERE id > " + gombertek5 + "";
                LekerdezesEredmenye(sqldelete);
                LekerdezesEredmenye(sqlujraindexeles);
                LekerdezesEredmenye(sqlAutoIncrement);
            };

            modositasgomb.onclick = async function () {
                gombertek6 = this.value;
                KodModositastabla.style.display = "block";
                let ID = document.getElementById("KodValaszAdminID");
                ID.innerText = "Id:" + this.value;
               
            };


        }
    }
    let betoltes = document.getElementById("kodgomb");
    betoltes.style.display = "none";
    Kodtartalom.style.display = "block";
    vissza3.style.display = "block";
    kodhozzaadas.style.display = "block";

    //  let ev=new Date().getFullYear();
    //  let honap=new Date().getMonth();
    //  let nap=new Date().getDate();
    //  let ora = new Date().getHours();
    //  let perc = new Date().getMinutes();
    // console.log("ev: "+ev+" honap: "+(honap+1)+" nap: "+nap+" ora: "+ora+" perc: "+perc);
}
function KodHozzadasMenu() {
    KodHozzaadastabla.style.display = "block";
    kodhozzaadas.style.display = "none";
    
    kodhozzaadasvissza.style.display = "block";
}
function KodHozzadasMenuVissza() {
    KodHozzaadastabla.style.display = "none";
    kodhozzaadas.style.display = "block";
    kodhozzaadasvissza.style.display = "none";
}
function KodModositasa() {

    let nev = document.getElementById("nevkodMod").value;
    let ido = document.getElementById("idokodMod").value;

    console.log(gombertek2);
    if (!nev == "") {
        let sqlmod = "UPDATE kodok k SET k.nev='" + nev + "' WHERE id = " + gombertek6 + "";
        LekerdezesEredmenye(sqlmod);
    }
    if (!ido == "") {
        let sqlmod = "UPDATE kodok k SET k.idokorlat='" + ido + "' WHERE id = " + gombertek6 + "";
        LekerdezesEredmenye(sqlmod);
    }
    location.reload();
}
function KodModositasaVissza() {
    KodModositastabla.style.display = "none";

}
function KodVissza() {
    khkod.style.display = "none";
    let betoltes = document.getElementById("kodgomb");
    betoltes.style.display = "block";
    Kodtartalom.style.display = "none";
    vissza3.style.display = "none";
    KodModositastabla.style.display = "none";
    document.getElementById("idadminKod").innerHTML = "ID:";
    document.getElementById("nevadminKod").innerHTML = "Kód:";
    document.getElementById("idoadminKod").innerHTML = "Idő korlát:";
    document.getElementById("torlesgombkod").innerHTML = "";
    document.getElementById("modositasgombkod").innerHTML = "";
}
function KodHozzaadas() {

    let adminInfo = document.getElementById("adminInfo2");
    let nev = document.getElementById("NevAdminKerdesInput").value;
    let ido = document.getElementById("IdoAdminKerdesInput").value;

    var regex = /[A-Za-z0-9\W_]{1,}/;
    if (nev == "" || ido == "") {
        adminInfo.innerHTML = "Nem töltöttél ki minden adatot!";
    }
    else if (regex.test(nev) && regex.test(ido)) {
        let sql = "insert into kodok(id,nev,idokorlat)values(null,'" + nev + "','" + ido + "')";
        LekerdezesEredmenye(sql).then((valasz) => {
            console.log(valasz);
            adminInfo.innerHTML = "";
        })
    }
}
function startMilliomos() {
    pontszam=0;
     updatePontozasiRendszer();
     document.getElementById("felezes").style.display="block";
     document.getElementById("telefon").style.display="block";
     document.getElementById("nezo").style.display = "block";
    Game();
    var milliomosMenu=document.getElementById("milliomosMenu");
    document.getElementById("nyertel").style.display = "none";
    milliomosMenu.style.display="none";
    gém.style.display="block";
    VisszaAMenubeGomb.style.display="block";
}
function Jatekszabalyok() {
    diakInfo=document.getElementById("diakInfo");
    if(diakInfo.innerHTML==""){
        diakInfo.innerHTML=' \nCél:\n  A játék célja az, hogy a játékos minél több pénzt nyerjen megválaszolva különböző nehézségű kérdéseket.\nJátékmenet: \n A játék 15 kérdésből áll. Minden kérdéshez négy válaszlehetőség tartozik, közülük csak egy helyes. A játékosnak választ kell adnia minden kérdésre, mielőtt továbblépne a következő kérdésre. A játék végén a játékos megtartja a legutolsó sikeresen megválaszolt kérdés nyereményét. Ha egy kérdésre helytelenül válaszol, elveszíti az addig elért nyereményt. A játékosnak van lehetősége feladni a játékot bármely ponton, és megtartani az addig elért nyereményt.Nehézség:A kérdések nehézsége fokozatosan növekszik a játék során.A későbbi kérdések több pénzt érnek, de nehezebbek is.\nSegítség:\n A játékosnak lehetősége van segítséget kérni a közönségtől, egy baráttól vagy két válaszlehetőség közül elhagyni egy helytelen választ.\nFőnyeremény:\n  A játék főnyereménye 1 milliárd forint.';}
    else diakInfo.innerHTML="";
}
function VisszaAMenube(){
VisszaAMenubeGomb.style.display="none";
gém.style.display="none";
milliomosMenu.style.display="block";
}
let currentRandomId; // Globális változó a jelenlegi randomId tárolására

async function Randomkerdes() {
    let sqlmax = await LekerdezesEredmenye("SELECT COUNT(*) as count FROM kerdesek");
    let maxId = sqlmax[0].count;
    currentRandomId = Math.floor(Math.random() * maxId) + 1; 
}

var kellkerdes = true;

async function Game() {

        await Randomkerdes();
   
   
    let  sql = "SELECT k.kerdes FROM kerdesek k WHERE k.id='" + currentRandomId + "'";
    let sqlvalasz1 = "SELECT k.elsovalasz FROM kerdesek k where k.id='" + currentRandomId + "'";
    let sqlvalasz2 = "SELECT k.masodikvalasz FROM kerdesek k where k.id='" + currentRandomId + "'";
    let sqlvalasz3 = "SELECT k.harmadikvalasz FROM kerdesek k where k.id='" + currentRandomId + "'";
    let sqlvalasz4 = "SELECT k.negyedikvalasz FROM kerdesek k where k.id='" + currentRandomId + "'";

    await LekerdezesEredmenye(sql).then((valasz) => {
        document.getElementById("jatekkerdes").innerHTML = valasz[0].kerdes;
        
    })
    await LekerdezesEredmenye(sqlvalasz1).then((valasz) => {
        document.getElementById("1").innerHTML = valasz[0].elsovalasz;
    })
    await LekerdezesEredmenye(sqlvalasz2).then((valasz) => {
        document.getElementById("2").innerHTML = valasz[0].masodikvalasz;
    })
    await LekerdezesEredmenye(sqlvalasz3).then((valasz) => {
        document.getElementById("3").innerHTML = valasz[0].harmadikvalasz;
    })
    await LekerdezesEredmenye(sqlvalasz4).then((valasz) => {
        document.getElementById("4").innerHTML = valasz[0].negyedikvalasz;
       
    })
    
}
var pelem=document.getElementById("Pelem");
var nezok=document.getElementById("Nezok");
async function Ellenorzes(valasztottId) {
    pelem.style.display="none";
    let sqlhelyesvalasz = "SELECT k.helyesvalasz FROM kerdesek k where k.id='" + currentRandomId + "'";
    await LekerdezesEredmenye(sqlhelyesvalasz).then((valasz) => {
        console.log(valasz[0].helyesvalasz);
        console.log(valasztottId);
        if (valasztottId === valasz[0].helyesvalasz) {
            pontszam += 1;
            kellkerdes = true;
             updatePontozasiRendszer();
             Game();
             if (pontszam === 15) {
                document.getElementById("nyertel").innerHTML = "Megnyerted a 1228800000FT-ot gratulálok!";
                document.getElementById("nyertel").style.display = "block";
                VisszaAMenubeGomb.style.display="none";
                gém.style.display="none";
                milliomosMenu.style.display="block";
            }
        }
         else {
            VisszaAMenubeGomb.style.display="none";
            gém.style.display="none";
            milliomosMenu.style.display="block";
             updatePontozasiRendszer(); // Frissítsük a pontszámot
             document.getElementById("nyertel").innerHTML = "Majd leközelebb meg lessz a fődíj!";
             document.getElementById("nyertel").style.display = "block";
        }

     
    })
}


function updatePontozasiRendszer() {
    // Hozzáférünk a táblázathoz
    let tableBody = document.querySelector("#pontozasiRendszer tbody");

    // Hozzuk létre a pontozási rendszer tartalmát
    let content = "";
   
    for (let i = 1; i <= 15; i++) {
        content += "<tr>";
        content += "<td>" + i + "</td>"; // Kérdés száma
            if (i <= pontszam) {
                content += "<td style='color: green;'>"+i*5000 * Math.pow(2, i - 1)+"FT</td>"; // Ha a kérdés helyes, zöld a szín
             
            } else {
                content += "<td>"+i*5000 * Math.pow(2, i - 1)+"FT";+"</td>"; // Ha a kérdés helytelen, alapértelmezett a szín
            }
            content += "</tr>";
            
        
    }
    
    
    // Frissítsük a táblázat tartalmát
    tableBody.innerHTML = content;
}
function Segitseg1() {
    let rosszValaszok = document.querySelectorAll('.DiakGomb:not([id="' + currentRandomId + '"])');
    let rosszValaszList = Array.from(rosszValaszok);
    let randomIndex1 = Math.floor(Math.random() * rosszValaszList.length);
    let randomIndex2;
    do {
        randomIndex2 = Math.floor(Math.random() * rosszValaszList.length);
    } while (randomIndex2 === randomIndex1);
    rosszValaszList[randomIndex1].style.display = "none";
    rosszValaszList[randomIndex2].style.display = "none";
    document.querySelector('.DiakGomb').addEventListener('click', function() {
    rosszValaszList[randomIndex1].style.display = "block";
    rosszValaszList[randomIndex2].style.display = "block";
    });
    
    document.getElementById("felezes").style.display = "none";
}
function Segitseg2() {
    // Előre definiált válaszok
    let telefonosSegitsegVálaszok = [
        "Szerintem az A válasz lehet a helyes.",
        "Úgy gondolom, hogy a B válasz a helyes.",
        "Lehet, hogy a C válasz a megfelelő.",
        "Az D válasz tűnik a legvalószínűbbnek nekem."
    ];

    // Véletlenszerű válasz kiválasztása
    let randomIndex = Math.floor(Math.random() * telefonosSegitsegVálaszok.length);
    let segitsegUzenet = telefonosSegitsegVálaszok[randomIndex];
    pelem.innerHTML=segitsegUzenet;
    pelem.style.display="block";
    document.getElementById("telefon").style.display = "none";
}
function Segitseg3() {
    // Helyes válasz kiválasztása
    let helyesValasz = document.getElementById(currentRandomId);
    let valasz;

    // 90% eséllyel a helyes választ mondja, 10% eséllyel véletlenszerűen választ egy rosszat
    if (Math.random() < 0.9) {
        valasz = helyesValasz.innerHTML;
    } else {
        let rosszValaszok = document.querySelectorAll('.DiakGomb:not([id="' + helyesValasz.id + '"])');
        let randomIndex = Math.floor(Math.random() * rosszValaszok.length);
        valasz = rosszValaszok[randomIndex].innerHTML;
    }
    let uzenet = "A nézők szerint a helyes válasz: " + valasz;
    nezok.innerHTML=uzenet;
    nezok.style.display="block";
    document.getElementById("nezo").style.display = "none";
}
