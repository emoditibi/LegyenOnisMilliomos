var logForm = document.getElementById("logForm");
var logInfo = document.getElementById("logInfo");
var regForm = document.getElementById("regForm");
var regInfo = document.getElementById("regInfo");
var kod = document.getElementById("kod");
regForm.style.display="none";
kod.style.display="none";

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
function atiranyitas(){
    if (regForm.style.display === "block") {
        regForm.style.display = "none";
        logForm.style.display = "block";
    } else {
        logForm.style.display = "none";
        regForm.style.display = "block";
    }
}
function login(){
    let fn=document.getElementById("fn").value;
    let pw=document.getElementById("pw").value;
    const regExp=/[A-Za-z0-9\.\_]{1,16}$/;
    if(regExp.test(fn)&&regExp.test(pw)){
        hash(pw).then((hash)=>{ 
            let sql="select * from felhasznalok f where f.nev='"+fn+"' and f.password='"+hash+"'";
            let sql2="SELECT f.admin FROM felhasznalok f WHERE f.nev = '"+fn+"';"
            let sql3="SELECT f.tanar FROM felhasznalok f WHERE f.nev = '"+fn+"';"
            console.log(sql);
            LekerdezesEredmenye(sql).then((valasz)=>{
                console.log(valasz);
                if(valasz.length==1){
                    localStorage.setItem("fn",valasz[0].nev);
                    localStorage.setItem("jog",valasz[0].jog);
                    localStorage.setItem("login",true);
                    LekerdezesEredmenye(sql2).then((valasz)=>{
                        let fNev=document.getElementById("fNev");
                        if(valasz[0].admin===0){
                            LekerdezesEredmenye(sql3).then((valasz)=>{
                                if(valasz[0].tanar===0){

                                    fNev.innerHTML="Diak: "+localStorage.getItem("fn");
                                }
                                else fNev.innerHTML="Tanar: "+localStorage.getItem("fn");
                             });
                        }
                        else {
                            fNev.innerHTML="Admin: "+localStorage.getItem("fn");
                           console.log(valasz[0]);
                        }
                    });
                    logForm.style.display="none";
                    regForm.style.display="none";

                }
            });
        })
    }
}
function regisztracio(){
    let tan=0;
    let regfn=document.getElementById("regfn").value;
    let email=document.getElementById("email").value;
    let regpw=document.getElementById("regpw").value;
    let regpwre=document.getElementById("regpwre").value;
    let diak=document.getElementById("diak").checked;
    let tanar=document.getElementById("tanar").checked;
    let kod=document.getElementById("kod").value;

    if(regfn==""||regpw==""||email=="")regInfo.innerHTML="Nem töltötted ki az adatokat!";
    else{
        const regExp=/[A-Za-z0-9\.\_]{1,16}$/;
        const emailregExp=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if(regExp.test(regfn)&&regExp.test(regpw)&&regExp.test(regpwre)&&emailregExp.test(email)&&regpwre==regpw &&(diak===true || tanar===true)){
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
                                    
                                else LekerdezesEredmenye(sql).then((valasz)=>{
                                    console.log(valasz);})
                                    regInfo.innerHTML="Sikeres regisztáció";
                                    logForm.style.display="none";
                                    regForm.style.display="none";
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
                                            console.log(valasz);})
                                            regInfo.innerHTML="Sikeres regisztáció";
                                            logForm.style.display="none";
                                            regForm.style.display="none";
                                        })
                                   
                                    }
                                })
                            }
                                else {regInfo.innerHTML="Nem jó jelszót adtál meg";}
                            })}
                        if(tan=0)
                        fNev.innerHTML="Diak: "+localStorage.getItem("fn");
                        else if(tan=1)
                        fNev.innerHTML="Tanar: "+localStorage.getItem("fn");
                    })
                    }
                
                else if(!regExp.test(regfn)) regInfo.innerHTML="Nem jó a felhasználó név!";
                else if(!emailregExp.test(email)) regInfo.innerHTML="Nem jó az email cím!";
                else if (diak===false && tanar===false) regInfo.innerHTML="Nem választotta ki hogy diák vagy tanár!"
                else if(regpwre!=regpw) regInfo.innerHTML="Nem egyezik a két jelszó!";
    }
}
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
