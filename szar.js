//bejelentkezés
let logForm = document.getElementById("logForm");
let logInfo = document.getElementById("logInfo");

//regisztráció
let regForm = document.getElementById("regForm");
let regInfo = document.getElementById("regInfo");
regForm.style.display = "none";

//egyéb
let gombocok = document.querySelector(".background");
let kijeletkezesgomb = document.getElementById("kijelentkezesgomb");
kijeletkezesgomb.style.display = "none";


//admin
let admin = document.getElementById("adminForm");
let kod = document.getElementById("kod");
let Ktartalom = document.getElementById("Ktartalom");
let Modositastabla = document.getElementById("Modositastabla");
let Hozzaadastabla = document.getElementById("Hozzaadastabla");
let KodHozzaadastabla = document.getElementById("KodHozzaadastabla");
let hozzaadasvissza = document.getElementById("hozzaadasvissza");
let hozzaadas = document.getElementById("hozzaadas");
let kodhozzaadasvissza = document.getElementById("kodhozzaadasvissza");
let kodhozzaadas = document.getElementById("kodhozzaadas");
let kh = document.getElementById("kh");
let khkod = document.getElementById("khkod");
let Ftartalom = document.getElementById("Ftartalom");
let FelhasznaloModositastabla = document.getElementById("FelhasznaloModositastabla");
let Kodtartalom = document.getElementById("Kodtartalom");
let KodModositastabla = document.getElementById("KodModositastabla");
let vissza = document.getElementById("visszagomb");
let vissza3 = document.getElementById("visszagomb3");
admin.style.display = "none";
Ktartalom.style.display = "none";
kh.style.display = "none";
Hozzaadastabla.style.display = "none";
Modositastabla.style.display = "none";
kod.style.display = "none";
khkod.style.display = "none";
KodHozzaadastabla.style.display = "none";
hozzaadas.style.display = "none";
kodhozzaadasvissza.style.display = "none";
kodhozzaadas.style.display = "none";
Ftartalom.style.display = "none";
FelhasznaloModositastabla.style.display = "none";
Kodtartalom.style.display = "none";
KodModositastabla.style.display = "none";
vissza.style.display = "none";
vissza3.style.display = "none";
let gombertek2;
let gombertek4;
let gombertek6;

//tanar
let tanar = document.getElementById("tanarForm");
let Ttartalom = document.getElementById("Ttartalom");
let Modositastabla2 = document.getElementById("Modositastabla2");
let Hozzaadastabla2 = document.getElementById("Hozzaadastabla2");
let hozzaadas2 = document.getElementById("hozzaadas2");
let kh2 = document.getElementById("kh2");
let visszatanar = document.getElementById("visszatanar");
let vissza2 = document.getElementById("visszagomb2");
visszatanar.style.display = "none";
tanar.style.display = "none";
vissza2.style.display = "none";
kh2.style.display = "none";
Hozzaadastabla2.style.display = "none";
Modositastabla2.style.display = "none";
Ttartalom.style.display = "none";
var tanarnev;
//diak
document.getElementById("ido").style.display="none";
document.getElementById("felezes").style.display="none";
document.getElementById("telefon").style.display="none";
document.getElementById("nezo").style.display = "none";
document.getElementById("nyertel").style.display="none";
let diak = document.getElementById("diakForm");
let gém=document.getElementById("gém");
let VisszaAMenubeGomb=document.getElementById("VisszaAMenubeGomb");
let pontok=document.getElementById("pontozasiRendszer");
let milliomosMenu=document.getElementById("Milliomosmenu");
let pontszam = 0;
let countdown;
diak.style.display = "none";
pontok.style.display="none";
VisszaAMenubeGomb.style.display="none";
gém.style.display="none";

//Init
function Init() {
    var fNev = document.getElementById("fNev");
    var fNev2 = document.getElementById("fNev2");
    var fNev3 = document.getElementById("fNev3");
    var userType = sessionStorage.getItem("userType");
    
    if (sessionStorage.getItem("login")) {
        gombocok.style.display = "none";
        if (userType == "Admin") {
            admin.style.display = "block";
            fNev.innerHTML = `Admin: ${sessionStorage.getItem("fn")}`;

        }
        else if (userType == "Tanar") {
            tanar.style.display = "block";
            fNev2.innerHTML = `Tanar: ${sessionStorage.getItem("fn")}`;
            tanarnev=sessionStorage.getItem("fn");
           
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
function KerdesHozzadasMenu2() {
    Hozzaadastabla2.style.display = "block";
    hozzaadas2.style.display = "none";
    hozzaadasvissza2.style.display = "block";


}
function KerdesHozzadasMenuVissza2() {
    Hozzaadastabla2.style.display = "none";
    hozzaadas2.style.display = "block";
    

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
//TANAR
async function TTartalom() {
    kh2.style.display = "block";
    let sqladat = await LekerdezesEredmenye("SELECT COUNT(*) as count FROM kerdesek INNER JOIN felhasznalok ON kerdesek.hozaado = felhasznalok.id WHERE felhasznalok.nev = 'szarvas';");
    console.log(sqladat[0].count)
    for (let i = 0; i <= sqladat[0].count-1; i++) {
        
       
        let sql = "SELECT f.id FROM felhasznalok f WHERE f.nev='" + tanarnev + "'";
        let valasz2 = await LekerdezesEredmenye(sql);
        let sql3 ="SELECT * FROM kerdesek k WHERE k.hozaado ='" +valasz2[0].id + "'"
     
        let valasz = await LekerdezesEredmenye(sql3);
        let sql2 = "SELECT k.helyesvalasz FROM kerdesek k WHERE k.id='" + valasz[i].helyesvalasz + "'";
        console.log(valasz[i].helyesvalasz);
        console.log(LekerdezesEredmenye(sql2));
        if (valasz.length == sqladat[0].count) {
            let id = document.createElement("div");
            id.innerText = valasz[i].id;
            id.classList.add("valaszok");
            document.getElementById("id2").appendChild(id);
            console.log(id)

            let tema = document.createElement("div");
            tema.innerText = valasz[i].tema;
            tema.classList.add("valaszok");
            document.getElementById("tema2").appendChild(tema);

            let kerdes = document.createElement("div");
            kerdes.innerText = valasz[i].kerdes;
            kerdes.classList.add("valaszok");
            document.getElementById("kerdes2").appendChild(kerdes);

            let valasz1 = document.createElement("div");
            valasz1.innerText = valasz[i].elsovalasz;
            valasz1.classList.add("valaszok");
            document.getElementById("valasz12").appendChild(valasz1);

            let valasz2 = document.createElement("div");
            valasz2.innerText = valasz[i].masodikvalasz;
            valasz2.classList.add("valaszok");
            document.getElementById("valasz22").appendChild(valasz2);

            let valasz3 = document.createElement("div");
            valasz3.innerText = valasz[i].harmadikvalasz;
            valasz3.classList.add("valaszok");
            document.getElementById("valasz32").appendChild(valasz3);

            let valasz4 = document.createElement("div");
            valasz4.innerText = valasz[i].negyedikvalasz;
            valasz4.classList.add("valaszok");
            document.getElementById("valasz42").appendChild(valasz4);

            let br = document.createElement("br");
            let br2 = document.createElement("br");

            let torlesgomb = document.createElement("button");
            let modositasgomb2 = document.createElement("button");
            torlesgomb.innerText = "törlés";
            torlesgomb.value = valasz[i].id;
            modositasgomb2.innerText ="modositas" ;
            modositasgomb2.value = valasz[i].id;
            modositasgomb2.type = "button";
            torlesgomb.classList.add("gombvalaszok");
            document.getElementById("torlesgomb2").appendChild(torlesgomb);
            document.getElementById("torlesgomb2").appendChild(br);
            modositasgomb2.classList.add("gombvalaszok2");
            document.getElementById("modositasgomb2").appendChild(modositasgomb2);
            document.getElementById("modositasgomb2").appendChild(br2);
            torlesgomb.onclick = function () {
                var gombertek = this.value;
                let sqldelete = "DELETE FROM kerdesek WHERE kerdesek.id=" + gombertek + "";
                let sqlAutoIncrement = "ALTER TABLE kerdesek AUTO_INCREMENT = " + sqladat[i].count + "";
                let sqlujraindexeles = "UPDATE kerdesek k SET k.id = id-1 WHERE id > " + gombertek + "";
                LekerdezesEredmenye(sqldelete);
                LekerdezesEredmenye(sqlujraindexeles);
                LekerdezesEredmenye(sqlAutoIncrement);
            };

            modositasgomb2.onclick = async function () {
                gombertek2 = this.value;
                Modositastabla2.style.display = "block";
                let ID = document.getElementById("HValaszAdminID");
                ID.innerText = "Id:" + this.value;
                let sql = "SELECT k.tema FROM kerdesek k WHERE k.id='" + this.value + "'";
                let eredmenyObjektum = await LekerdezesEredmenye(sql);
                let tema = eredmenyObjektum[0].tema;
                document.getElementById("TemaModosit").innerText = tema;
                document.getElementById("TemaModosit").value = tema;
            };
            LekerdezesEredmenye(sql2).then((valasz) => {
              console.log(valasz[0].helyesvalasz);
                if (valasz[0].helyesvalasz == "1") {
                    valasz1.style.backgroundColor = "green";
                }
                else if (valasz[0].helyesvalasz == "2") {
                    valasz2.style.backgroundColor = "Green";

                }
                else if (valasz[0].helyesvalasz== "3") {
                    valasz3.style.backgroundColor = "Green";
                }
                else if (valasz[0].helyesvalasz== "4") {
                    valasz4.style.backgroundColor = "Green";
                }
             
            })
        }
    }
    let betoltes = document.getElementById("betoltesgomb2");
    betoltes.style.display = "none";
    Ttartalom.style.display = "block";
    visszatanar.style.display = "block";
    hozzaadas.style.display = "block";
    

}

function KerdesHozzaadasTanar() {

    let tanarInfo = document.getElementById("tanarInfo");
    let helyesvalasz = document.getElementById("HValaszTanarKerdesInput").value;
    let tema = document.getElementById("TemaTanarKerdesInputMod").value;
    let kerdes = document.getElementById("KerdesTanarKerdesInput").value;
    let valasz1 = document.getElementById("Valasz1TanarKerdesInput").value;
    let valasz2 = document.getElementById("Valasz2TanarKerdesInput").value;
    let valasz3 = document.getElementById("Valasz3TanarKerdesInput").value;
    let valasz4 = document.getElementById("Valasz4TanarKerdesInput").value;
    var regex = /[A-Za-z0-9\W_]{1,}/;
    if (helyesvalasz == "" || tema == "" || kerdes == "" || valasz1 == "" || valasz2 == "" || valasz3 == "" || valasz4 == "") {
        tanarInfo.innerHTML = "Nem töltöttél ki minden adatot!";
    }
    else if (regex.test(helyesvalasz) && regex.test(tema) && regex.test(kerdes) && regex.test(valasz1) && regex.test(valasz2) && regex.test(valasz3) && regex.test(valasz4)) {
        let sql = "insert into kerdesek(id,helyesvalasz,tema,kerdes,elsovalasz,masodikvalasz,harmadikvalasz,negyedikvalasz)values(null,'" + helyesvalasz + "','" + tema + "','" + kerdes + "','" + valasz1 + "','" + valasz2 + "','" + valasz3 + "','" + valasz4 + "')";
        LekerdezesEredmenye(sql);
        tanarInfo.innerHTML = "";
        location.reload();
    }
}
function TVissza() {
    let betoltes = document.getElementById("betoltesgomb2");
    visszatanar.style.display = "none";
    betoltes.style.display = "block";
    Ttartalom.style.display = "none";
    Modositastabla2.style.display = "none";
    Hozzaadastabla2.style.display = "none";
    kh2.style.display = "none";
    document.getElementById("id2").innerHTML = "";
    document.getElementById("tema2").innerHTML = "";
    document.getElementById("kerdes2").innerHTML = "";
    document.getElementById("valasz12").innerHTML = "";
    document.getElementById("valasz22").innerHTML = "";
    document.getElementById("valasz32").innerHTML = "";
    document.getElementById("valasz42").innerHTML = "";
    document.getElementById("torlesgomb2").innerHTML = "";
    document.getElementById("modositasgomb2").innerHTML = "";

}
function KerdesekModositasa2() {

    let kerdes = document.getElementById("KerdesTanarKerdesInputMod").value;
    let tema = document.getElementById("TemaTanarKerdesInput").value;
    let helyesvalasz = document.getElementById("HValaszTanarKerdesInputMod").value;
    let valasz1 = document.getElementById("Valasz1TanarKerdesInputMod").value;
    let valasz2 = document.getElementById("Valasz2TanarKerdesInputMod").value;
    let valasz3 = document.getElementById("Valasz3TanarKerdesInputMod").value;
    let valasz4 = document.getElementById("Valasz4TanarKerdesInputMod").value;

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
function KerdesekModositasaVissza2() {
    Modositastabla2.style.display = "none";
}
//Tanarvege
var pelem=document.getElementById("Pelem");
var nezok=document.getElementById("Nezok");
function startMilliomos() {
    pontszam=0;
     updatePontozasiRendszer();
     document.getElementById("felezes").style.display="block";
     document.getElementById("telefon").style.display="block";
     document.getElementById("nezo").style.display = "block";
    Game();
    szamol();
    document.getElementById("nyertel").style.display = "none";
    milliomosMenu.style.display="none";
    gém.style.display="block";
    VisszaAMenubeGomb.style.display="block";
}
function Jatekszabalyok() {
    var diakInfo = document.getElementById("diakInfo");
    if (diakInfo.innerHTML === "") {
        diakInfo.innerHTML = '<div style="padding: 20px; border: 2px solid #ccc;; border-radius: 10px;"> \
            <h3>Játékszabályok</h3> \
            <ul style="list-style-type: none; padding-left: 0;"> \
                <li><strong>Cél:</strong> A játék célja az, hogy a játékos minél több pénzt nyerjen megválaszolva különböző nehézségű kérdéseket.</li> \
                <li><strong>Játékmenet:</strong> A játék 15 kérdésből áll. Minden kérdéshez négy válaszlehetőség tartozik, közülük csak egy helyes. A játékosnak választ kell adnia minden kérdésre, mielőtt továbblépne a következő kérdésre. A játék végén a játékos megtartja a legutolsó sikeresen megválaszolt kérdés nyereményét. Ha egy kérdésre helytelenül válaszol, elveszíti az addig elért nyereményt. A játékosnak van lehetősége feladni a játékot bármely ponton, és megtartani az addig elért nyereményt.</li> \
                <li><strong>Nehézség:</strong> A kérdések nehézsége fokozatosan növekszik a játék során. A későbbi kérdések több pénzt érnek, de nehezebbek is.</li> \
                <li><strong>Segítség:</strong> A játékosnak lehetősége van segítséget kérni a közönségtől, egy baráttól vagy két válaszlehetőség közül elhagyni egy helytelen választ.</li> \
                <li><strong>Főnyeremény:</strong> A játék főnyereménye 1 milliárd forint.</li> \
            </ul> \
        </div>';
    } else {
        diakInfo.innerHTML = "";
    }
}

function VisszaAMenube(){
    VisszaAMenubeGomb.style.display="none";
    gém.style.display="none";
    pontok.style.display="none";
    document.getElementById("nyertel").style.display = "none";
    document.getElementById("Nezok").style.display = "none";
    document.getElementById("Pelem").style.display = "none";
    document.getElementById("nezo").style.display = "none";
    document.getElementById("felezes").style.display = "none";
    document.getElementById("telefon").style.display = "none";
    milliomosMenu.style.display="block";
    clearTimeout(countdown); 
    document.getElementById("ido").style.display="none";
}
let currentRandomId; 

async function Randomkerdes() {
    let sqlmax = await LekerdezesEredmenye("SELECT COUNT(*) as count FROM kerdesek");
    let maxId = sqlmax[0].count;
    currentRandomId = Math.floor(Math.random() * maxId) + 1; 
    
}

var kellkerdes = true;

var eddigMegjelenitettKerdesek = [];

let secondsLeft;
function szamol(){
    secondsLeft = 60; 
    document.getElementById("ido").style.display="block";
    countdown = setInterval(() => {
    secondsLeft--; 
        
        document.getElementById('ido').textContent = secondsLeft;

    
       
        
        if (secondsLeft <= 0) {
            clearTimeout(countdown); 
            
            Ellenorzes();
        }
    }, 1000);
    
}
    async function Game() {
        secondsLeft = 61; 
    
    
    await Randomkerdes();
   pontok.style.display="block";
   if (eddigMegjelenitettKerdesek.includes(currentRandomId)){
    await Randomkerdes();
       console.log("nem jó")
    }
    eddigMegjelenitettKerdesek.push(currentRandomId);

   
   
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
                 gém.style.display="none";
                document.getElementById("nyertel").innerHTML = "Megnyerted a 40000000FT-ot gratulálok!";
                document.getElementById("nyertel").style.display = "block";
                document.getElementById("nezo").style.display = "none";
                document.getElementById("felezes").style.display = "none";
                document.getElementById("telefon").style.display = "none";
                document.getElementById("Nezok").style.display = "none";
                document.getElementById("Pelem").style.display = "none";
                VisszaAMenubeGomb.style.display="block";
                milliomosMenu.style.display="none";
                pontok.style.display="block";
                clearInterval(countdown);
                document.getElementById("ido").style.display="none";
            }
        }
         else {
            VisszaAMenubeGomb.style.display="block";
            gém.style.display="none";
            milliomosMenu.style.display="none";
             updatePontozasiRendszer(); 
             if(pontszam<5){
                document.getElementById("nyertel").innerHTML = "A nyereményed 0 forint!";
              
            }
             
             
             else if(pontszam=5||5<pontszam<10){
                document.getElementById("nyertel").innerHTML = "A nyereményed 1000000 forint!";

               
            }
             else if(pontszam=10||10<pontszam<15){
                document.getElementById("nyertel").innerHTML = "A nyereményed 10000000 forint!";
                
            }
             document.getElementById("nyertel").style.display = "block";
             document.getElementById("nezo").style.display = "none";
             document.getElementById("felezes").style.display = "none";
             document.getElementById("telefon").style.display = "none";
             document.getElementById("Nezok").style.display = "none";
             document.getElementById("Pelem").style.display = "none";
             
             pontok.style.display="block";
             clearInterval(countdown);
             document.getElementById("ido").style.display="none";
        }

        
    })
}


function updatePontozasiRendszer() {
   
    let tableBody = document.querySelector("#pontozasiRendszer tbody");

 
    let content = "";
    let pontszamok = [0,5000, 10000, 20000, 50000, 100000, 200000, 300000, 500000, 800000, 1000000, 2000000, 5000000, 10000000, 20000000, 40000000];
    for (let i = 1; i <= 15; i++) {
        content += "<tr>";
        content += "<td>" + i + "</td>"; 
            if (i <= pontszam) {
                content += "<td style='background-color: orange; color: black;'>"+pontszamok[i]+"FT</td>";


             
            }
            else if (i === 5 || i === 10) {
            content += "<td style='background-color: white; color: black;'>"+pontszamok[i]+"FT</td>";
            } 
            else {
                content += "<td style='color: orange;'>"+pontszamok[i]+"FT"+"</td>";
               

            }
            content += "</tr>";
        
    }
    pelem.innerHTML="";
    nezok.innerHTML="";
    document.getElementById("1").style.display = "block";
    document.getElementById("2").style.display = "block";
    document.getElementById("3").style.display = "block";
    document.getElementById("4").style.display = "block";
   
    
    tableBody.innerHTML = content;
}
async function Segitseg1() {
    let helyesValasz = "SELECT k.helyesvalasz FROM kerdesek k WHERE k.id='" + currentRandomId + "'";
    await LekerdezesEredmenye(helyesValasz).then((valasz) => {
        let rosszValaszok = document.querySelectorAll('.DiakGomb:not([id="' + valasz[0].helyesvalasz + '"])');
        let rosszValaszList = Array.from(rosszValaszok);
        let randomIndex1 = Math.floor(Math.random() * rosszValaszList.length);
        let randomIndex2;
        do {
            randomIndex2 = Math.floor(Math.random() * rosszValaszList.length);
        } while (randomIndex2 === randomIndex1);
        rosszValaszList[randomIndex1].style.display = "none";
        rosszValaszList[randomIndex2].style.display = "none";
    });
    document.getElementById("felezes").style.display = "none";
}

async function Segitseg2() {
    let helyesValasz = "SELECT k.helyesvalasz FROM kerdesek k WHERE k.id='" + currentRandomId + "'";
    await LekerdezesEredmenye(helyesValasz).then((valasz) => {
        if (Math.random() < 0.9) {
            pelem.innerHTML = "A telefonos szerint a helyes válasz: "+document.querySelector('.DiakGomb[id="' + valasz[0].helyesvalasz + '"]').innerHTML;

        }
        else {
            let rosszValaszok = document.querySelectorAll('.DiakGomb:not([id="' + valasz[0].helyesvalasz + '"])');
            let randomIndex = Math.floor(Math.random() * rosszValaszok.length);
            pelem.innerHTML= "A telefonos szerint a helyes válasz: " + rosszValaszok[randomIndex].innerHTML;
        }
    })
    pelem.style.display="block";
    document.getElementById("telefon").style.display = "none";
}
async function Segitseg3() {
    let helyesValasz = "SELECT k.helyesvalasz FROM kerdesek k WHERE k.id='" + currentRandomId + "'";
    await LekerdezesEredmenye(helyesValasz).then((valasz) => {
        if (Math.random() < 0.8) {
     
            nezok.innerHTML = "A nézők szerint a helyes válasz: "+document.querySelector('.DiakGomb[id="' + valasz[0].helyesvalasz + '"]').innerHTML;
        }
        else {
            let rosszValaszok = document.querySelectorAll('.DiakGomb:not([id="' + valasz[0].helyesvalasz + '"])');
            let randomIndex = Math.floor(Math.random() * rosszValaszok.length);
            nezok.innerHTML= "A nézők szerint a helyes válasz: " + rosszValaszok[randomIndex].innerHTML;
        }
    })
    nezok.style.display="block";
    document.getElementById("nezo").style.display = "none";
}
