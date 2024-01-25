var Lehetosegek = ["Tortenelem", "Programozas","Foldrajz"];
var Kerdesek=["Mikor volt a honfoglalás?","895","1100","900","1905","Mi kell a weboldalfejleszéshez?","HTML,CSS,JS","HTML,CSS,C#","C++,JS,Java","PHP,Ruby,Pearl","Miyen kontinesen van Magyarország?","Európa","Ázsia","Észak-Amerika","Afrika"];
let betuk = [];
var pont=0;
function GombLe()
{
    keveres();
    var randomSzam = Math.floor(Math.random() * Lehetosegek.length);
    document.getElementById("kerdes").innerText=Kerdesek[(randomSzam*5)];
    document.getElementById("A").innerText=Kerdesek[(randomSzam*5)+(betuk[0]+1)];
    document.getElementById("B").innerText=Kerdesek[(randomSzam*5)+(betuk[1]+1)];
    document.getElementById("C").innerText=Kerdesek[(randomSzam*5)+(betuk[2]+1)];
    document.getElementById("D").innerText=Kerdesek[(randomSzam*5)+(betuk[3]+1)];
    document.getElementById("A").value=Kerdesek[(randomSzam*5)+(betuk[0]+1)];
    document.getElementById("B").value=Kerdesek[(randomSzam*5)+(betuk[1]+1)];
    document.getElementById("C").value=Kerdesek[(randomSzam*5)+(betuk[2]+1)];
    document.getElementById("D").value=Kerdesek[(randomSzam*5)+(betuk[3]+1)];
}
function keveres() {
    feltoltes();
    for (let i=0; i<betuk.length-1; i++) {
        var j = Math.floor(Math.random()*(betuk.length-i))+i;
        var tmp = betuk[i];
        betuk[i] = betuk[j];
        betuk[j] = tmp;
    }
    return betuk;
}
function feltoltes(){
    for(let i=0;i<4;i++){
        betuk[i]=i;
    }
}
function ValaszEll(kattint){
    console.log(kattint);
    if(kattint==Kerdesek[kerdes])
    {
        console.log(Kerdesek[kerdes]);
        console.log("Jó válasz!");
    }
    else console.log("Rossz válasz!");
}
