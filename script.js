var logForm = document.getElementById("logForm");
var logInfo = document.getElementById("logInfo");
var regForm = document.getElementById("regForm");
var regInfo = document.getElementById("regInfo");
var admin = document.getElementById("adminForm");
var tanar = document.getElementById("tanarForm");
var diak = document.getElementById("diakForm");
var kod = document.getElementById("kod");
var gombok=document.querySelector(".background");
var Ktartalom=document.getElementById("Ktartalom");
var Ftartalom=document.getElementById("Ftartalom");
var vissza = document.getElementById("visszagomb");
var vissza2 = document.getElementById("visszagomb2");
var kijeletkezesgomb = document.getElementById("kijelentkezesgomb");
admin.style.display="none";
tanar.style.display="none";
diak.style.display="none";
regForm.style.display="none";
kod.style.display="none";
Ktartalom.style.display="none";
Ftartalom.style.display="none";
kijeletkezesgomb.style.display="none";
vissza.style.display="none";
vissza2.style.display="none";
function Init() {
    var fNev = document.getElementById("fNev");
    var fNev2 = document.getElementById("fNev2");
    var fNev3 = document.getElementById("fNev3");
    var userType = sessionStorage.getItem("userType");
    
    if (sessionStorage.getItem("login")) {
        gombok.style.display="none";
        if(userType=="Admin"){
            admin.style.display="block";
            fNev.innerHTML = `Admin: ${sessionStorage.getItem("fn")}`;

        }
        else if(userType=="Tanar"){
            tanar.style.display="block";
            fNev2.innerHTML = `Tanar: ${sessionStorage.getItem("fn")}`;

        }
        else if(userType=="Diak"){
            diak.style.display="block";
            fNev3.innerHTML = `Diak: ${sessionStorage.getItem("fn")}`;

        }
        logForm.style.display="none";
        regForm.style.display="none";
        kijeletkezesgomb.style.display="block";
    }
}
window.onload = Init;
//adatbázis
const AdatbazisEleres = ()=>{
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
function atiranyitas(){
    if (regForm.style.display === "block") {
        regForm.style.display = "none";
        logForm.style.display = "block";
    } else {
        logForm.style.display = "none";
        regForm.style.display = "block";
    }
}
//bejelentkezés
function login(){
    let fn=document.getElementById("fn").value;
    let pw=document.getElementById("pw").value;
    const regExp=/[A-Za-z0-9\.\_]{1,16}$/;
    let nev = document.getElementById("fnl");
    let jelszo = document.getElementById("jelszol");
    if(fn==""){
        nev.classList.add("csillag");
    }
    else { 
        nev.classList.remove("csillag");
    } 
    if(pw==""){
        jelszo.classList.add("csillag");   
    } 
    else{ jelszo.classList.remove("csillag");}
    if(fn=="" || pw=="")logInfo.innerHTML="Nem töltötte ki az adatokat!";
    else if(regExp.test(fn)&&regExp.test(pw)){
        hash(pw).then((hash)=>{ 
            let sql="select * from felhasznalok f where f.nev='"+fn+"' and f.password='"+hash+"'";
            let sql2="SELECT f.admin FROM felhasznalok f WHERE f.nev = '"+fn+"';"
            let sql3="SELECT f.tanar FROM felhasznalok f WHERE f.nev = '"+fn+"';"
            console.log(sql);
            LekerdezesEredmenye(sql).then((valasz)=>{
                console.log(valasz);
                 if(valasz.length==1){
                sessionStorage.setItem("fn",valasz[0].nev);
                    sessionStorage.setItem("jog",valasz[0].jog);
                    sessionStorage.setItem("login",true);
                    LekerdezesEredmenye(sql2).then((valasz)=>{

                      if(valasz[0].admin===0){
                            LekerdezesEredmenye(sql3).then((valasz)=>{
                                if(valasz[0].tanar===0){
                                   sessionStorage.setItem("userType", "Diak");
                                   Init();
                                   kijeletkezesgomb.style.display="block";
                               
                                }
                                else{ 
                                    sessionStorage.setItem("userType", "Tanar");
                                    Init();
                                    kijeletkezesgomb.style.display="block";
                           
                                }
                             });
                        }
                        else {
                            sessionStorage.setItem("userType", "Admin");
                            Init();
                            kijeletkezesgomb.style.display="block";
                         
                        }
                    });
                    logForm.style.display="none";
                    regForm.style.display="none";
                }
                else if(valasz.length==0){
                logInfo.innerHTML="Nem jó a felhasználó név vagy a jelszó!";}
            });
        })
    }

}
//-- jelszo
let password = document.getElementById("regpw");
let jelszomegjelenes = document.querySelector(".jelszomegjelenes");
let erossegSav = document.querySelector("#strength-bar");
let erossegSzoveg = document.querySelector(".strength-text");


password.addEventListener("focus", function(){
    jelszomegjelenes.style.display = "block";
});

password.addEventListener("blur", function(){
    jelszomegjelenes.style.display = "none";
});

function SzinezzesEsSzoveg(color, szoveg){
        erossegSav.style.backgroundColor = color;
        erossegSzoveg.innerHTML = szoveg;
        erossegSzoveg.style.color = color;
}
function ErosssegTorles(){
    erossegSav.style.width = 0;
    erossegSav.style.backgroundColor = "";
    erossegSzoveg.innerHTML = "";
}

password.addEventListener("keyup", ellenorizJelszoErossseget);

function ellenorizJelszoErossseget(){
    let erosseg = 0;

    if(password.value == ""){
        ErosssegTorles();
        return false;
    }

    if(password.value.match(/\s/)){
        SzinezzesEsSzoveg("red", "Szóköz nem lehet benne!");
        return false;
    }

    if(password.value.match(/\<\>\#\,\*\+\=\!\'\(\)\%\/\&\@\$\ß\{\}\[\]\@/)){
        SzinezzesEsSzoveg("red", "Csak kötőjel, alulvonás és pont lehet benne");
        return false;
    }

    if(password.value.length > 14){
        SzinezzesEsSzoveg("red", "A jelszó több mint 14 karakter!");
        return false;
    }

    if(password.value.length < 4){
        erosseg = 20;
        SzinezzesEsSzoveg("red", "Túl rövid a jelszó!");
        
    }
    else{
        
        let kisbetu = password.value.match(/[a-z]/);
        let nagybetu = password.value.match(/[A-Z]/);
        let szamok = password.value.match(/[0-9]/);
        let specialisKarakterek = password.value.match(/\-\.\_]/);

        if(kisbetu || nagybetu || szamok || specialisKarakterek){
            erosseg = 40;
            SzinezzesEsSzoveg("red", "Gyenge"); 
            if( 
                (kisbetu && nagybetu) || (kisbetu && szamok) || (kisbetu && specialisKarakterek) ||
                (nagybetu && szamok) || (nagybetu && specialisKarakterek) || (szamok && specialisKarakterek))
                {
                    
                    if( (kisbetu && nagybetu && szamok) || (kisbetu && nagybetu && specialisKarakterek) ||
                    (kisbetu && szamok && specialisKarakterek) ||  (nagybetu && szamok && specialisKarakterek))
                    {
                        
                        if( kisbetu && nagybetu && szamok && specialisKarakterek ) 
                        {
                            erosseg = 100;
                            SzinezzesEsSzoveg("green", "Nagyon erős");	
                            
                        }
                        else{ erosseg = 80;
                            SzinezzesEsSzoveg("#088f08", "Erős");}
                    }
                    else{erosseg = 60; 
                    SzinezzesEsSzoveg("orange", "Közepes");	}
                    erossegSav.style.width = erosseg + "%";
                    return true;
                } 
                
                else {erossegSav.style.width = erosseg + "%";
                return false;}
        }
        
    }
    
}
//regisztráció
function regisztracio(){
    let tan=0;
    let regfn=document.getElementById("regfn").value;
    let email=document.getElementById("email").value;
    let regpw=document.getElementById("regpw").value;
    let regpwre=document.getElementById("regpwre").value;
    let diak=document.getElementById("diak").checked;
    let tanar=document.getElementById("tanar").checked;
    let kod=document.getElementById("kod").value;
    let nev = document.getElementById("nevlabel");
    let jelszo = document.getElementById("jelszolabel");
    let emaill = document.getElementById("emaillabel");
    if(regfn==""){
        nev.classList.add("csillag");
        }
        else { 
            nev.classList.remove("csillag");
        } 
        if(email==""){
            emaill.classList.add("csillag");
        }
        else{ emaill.classList.remove("csillag");}
        if(regpw=="" ||regpwre==""){
            jelszo.classList.add("csillag");   
        } 
        else{ jelszo.classList.remove("csillag");}
        
        const regExp=/^[A-Za-z0-9._]{1,16}$/;
        const emailregExp=/^[\w.\-]+@([\w-]+\.)+[\w-]{2,4}$/;
        sessionStorage.setItem("fn", regfn);
        if(regExp.test(regfn)&&regExp.test(regpw)&&regExp.test(regpwre)&&emailregExp.test(email)&& ellenorizJelszoErossseget()&&regpwre==regpw &&(diak===true || tanar===true)){
            hash(regpw).then((hash)=>{ 
                let sql4="SELECT * FROM codok c WHERE c.nev='"+kod+"'";
                let sql2="SELECT * FROM felhasznalok f WHERE f.nev='"+regfn+"'";
                let sql3="SELECT * FROM felhasznalok f WHERE f.email='"+email+"'";
                
                if(tanar===false){
                    tan=0;
                    let sql="insert into felhasznalok(id,nev,password,email,tanar)values(null,'"+regfn+"','"+hash+"','"+email+"','"+tan+"')";
                    LekerdezesEredmenye(sql2).then((valasz)=>{
                        if(valasz.length==1){
                            regInfo.innerHTML="A felhasználó név már foglalt!";}
                            else{
                                LekerdezesEredmenye(sql3).then((valasz)=>{
                                    if(valasz.length==1){
                                        regInfo.innerHTML="Van már ilyen email cím!";}
                                        
                                        else{ LekerdezesEredmenye(sql).then((valasz)=>{
                                            console.log(valasz);
                                            logForm.style.display="none";
                                            regForm.style.display="none";
                                            sessionStorage.setItem("userType", "Diak");
                                            sessionStorage.setItem("login", true);
                                            Init();
                                        })
                                    }
                                })
                            }
                        })
                    }
                    else if(tanar===true){
                        LekerdezesEredmenye(sql4).then((valasz)=>{
                            if(valasz.length==1)
                            {
                                tan=1;
                                let sql="insert into felhasznalok(id,nev,password,email,tanar)values(null,'"+regfn+"','"+hash+"','"+email+"','"+tan+"')";
                                LekerdezesEredmenye(sql2).then((valasz)=>{
                                    if(valasz.length==1){
                                        regInfo.innerHTML="A felhasználó név már foglalt!";}
                                        else{
                                            LekerdezesEredmenye(sql3).then((valasz)=>{
                                                if(valasz.length==1){
                                                    regInfo.innerHTML="Van már ilyen email cím!";}
                                                    else  LekerdezesEredmenye(sql).then((valasz)=>{
                                                        console.log("alma");
                                                        console.log(valasz);})
                                                        logForm.style.display="none";
                                                        regForm.style.display="none";
                                                        sessionStorage.setItem("userType", "Tanar");
                                                        sessionStorage.setItem("login", true);
                                                        Init();
                                                        
                                                        
                                                    });
                                                    
                                                }
                                            })
                                        }
                                        else {regInfo.innerHTML="Nem jó jelszót adtál meg";}
                                    })}
                                    
                                })
                            }
                            if(regfn==""||email==""||regpw==""||regpwre==""){
                                regInfo.innerHTML="Nem töltött ki minden adatot!";
                            }
                            else if(!regExp.test(regfn)) regInfo.innerHTML="Nem jó a felhasználó név!";
                            else if(!emailregExp.test(email)) regInfo.innerHTML="Nem jó az email cím!";
                            else if(!ellenorizJelszoErossseget()) regInfo.innerHTML="Nem elég erős a jelszó!";
                            else if(regpwre!=regpw) regInfo.innerHTML="Nem egyezik a két jelszó!";
                            else if (diak===false && tanar===false) regInfo.innerHTML="Nem választotta ki hogy diák vagy tanár!"
                        }
                        
//Diak gomb vagy Tanar gomb van kiválasztva
function tanarikod(){
    let tanar=document.getElementById("tanar").checked;
    if(tanar===false)
    {
        kod.style.display="none";
    }
    else if(tanar===true)
    {
        kod.style.display="block";
    }
}
//felhasznalok
function Kijelentkezes(){
    sessionStorage.clear();
    location.reload();
}
//admin
//kérdések
async function KTartalom() {
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

            LekerdezesEredmenye(sql2).then((valasz)=>{
               if(valasz[0].helyesvalasz=="1"){
                valasz1.style.backgroundColor="green";
               }
               else if(valasz[0].helyesvalasz=="2"){
                valasz2.style.backgroundColor="Green";
            
               }
               else if(valasz[0].helyesvalasz=="3"){
                valasz3.style.backgroundColor="Green";
               }
               else if(valasz[0].helyesvalasz=="4"){
                valasz4.style.backgroundColor="Green";
               }
            })
        }
    }

    let betoltes = document.getElementById("betoltesgomb");
    betoltes.style.display = "none";
    Ktartalom.style.display="block";
    vissza.style.display = "block";
}
//kérdések vissza gomb
function KVissza(){
    let betoltes = document.getElementById("betoltesgomb");
    betoltes.style.display = "block";
    vissza.style.display = "none";
    document.getElementById("id").innerHTML = "ID:";
    document.getElementById("tema").innerHTML = "Téma:";
    document.getElementById("kerdes").innerHTML = "Kérdés:";
    document.getElementById("valasz1").innerHTML = "Válasz1:";
    document.getElementById("valasz2").innerHTML = "Válasz2:";
    document.getElementById("valasz3").innerHTML = "Válasz3:";
    document.getElementById("valasz4").innerHTML = "Válasz4:";
    Ktartalom.style.display="none";
}
//felhasznalok -- meg nem mukodik
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

        }
    }
    
     let betoltes = document.getElementById("felhasznalokgomb");
     betoltes.style.display = "none";
     Ftartalom.style.display="block";
     vissza2.style.display="block";
}
function FVissza(){
    let betoltes = document.getElementById("felhasznalokgomb");
    betoltes.style.display = "block";
    vissza2.style.display = "none";
    document.getElementById("Fid").innerHTML = "ID:";
    document.getElementById("Fnev").innerHTML = "Név:";
    document.getElementById("Fpassword").innerHTML = "Jelszó:";
    document.getElementById("Femail").innerHTML = "Email:";
    document.getElementById("Ftanare").innerHTML = "Tanár jog:";
    document.getElementById("Fadmine").innerHTML = "Admin jog:";

    Ftartalom.style.display="none";
}
