

body{
  background-color: darkgreen;
  color:aliceblue;
  font-family: Arial;
}
/*scroll bar design*/
::-webkit-scrollbar {
  width: 15px;
}
::-webkit-scrollbar-thumb {
  background: rgb(137, 218, 121); 
  border-radius: 10px;
}
/*scroll bar design vége*/
h1,p,table{
  text-align: center;
}
.gomb {
background-color: orange;
margin-top: 10px;
height: 50px;
width: 100%;
border-radius: 100px;
box-shadow: rgba(255, 157, 1, 0.2) 0 -25px 18px -14px inset,rgba(250, 184, 2, 0.2) 0 1px 2px,rgba(250, 184, 2, 0.2) 0 2px 4px,rgba(250, 184, 2, 0.2) 0 4px 8px,rgba(250, 184, 2, 0.2) 0 8px 16px,rgba(250, 184, 2, 0.2) 0 16px 32px;
color: rgb(255, 255, 255);
cursor: pointer;
display: inline-block;
font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;
padding: 7px 20px;
transition: all 250ms;
font-size: 14px;
font-weight: 300;
font-size: 16px;
user-select: none;
-webkit-user-select: none;
touch-action: manipulation;
text-align: center;
position: relative; 
}
.admingomb {
  background-color: orange;
  margin-top: 10px;
  height: 50px;
  width: 100%;
  border-radius: 100px;
  box-shadow: rgba(255, 157, 1, 0.2) 0 -25px 18px -14px inset,rgba(250, 184, 2, 0.2) 0 1px 2px,rgba(250, 184, 2, 0.2) 0 2px 4px,rgba(250, 184, 2, 0.2) 0 4px 8px,rgba(250, 184, 2, 0.2) 0 8px 16px,rgba(250, 184, 2, 0.2) 0 16px 32px;
  color: rgb(255, 255, 255);
  cursor: pointer;
  display: inline-block;
  font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;
  padding: 7px 20px;
  transition: all 250ms;
  font-size: 14px;
  font-weight: 300;
  font-size: 16px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  text-align: center;
  position:relative;
  table-layout: fixed;
  }

.kijelentkezesgomb{
  background-color: orange;
  height: 50px;
  width: 100%;
  border-radius: 100px;
  box-shadow: rgba(255, 157, 1, 0.2) 0 -25px 18px -14px inset,rgba(250, 184, 2, 0.2) 0 1px 2px,rgba(250, 184, 2, 0.2) 0 2px 4px,rgba(250, 184, 2, 0.2) 0 4px 8px,rgba(250, 184, 2, 0.2) 0 8px 16px,rgba(250, 184, 2, 0.2) 0 16px 32px;
  color: rgb(255, 255, 255);
  cursor: pointer;
  display: inline-block;
  font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;
  padding: 7px 20px;
  transition: all 250ms;
  font-size: 14px;
  font-weight: 300;
  font-size: 16px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  text-align: center;
  position: relative; 
}


.gomb:hover {
box-shadow: rgba(250, 184, 2, 0.2) 0 -25px 18px -14px inset,rgba(250, 184, 2, 0.2) 0 1px 2px,rgba(250, 184, 2, 0.2) 0 2px 4px,rgba(250, 184, 2, 0.2) 0 4px 8px,rgba(250, 184, 2, 0.2) 0 8px 16px,rgba(250, 184, 2, 0.2) 0 16px 32px;
transform: scale(1.05) rotate(-1deg);
}
.background {
  width: 100%;
  height: 100%; 
  position: fixed; 
  top: 0;
  left: 0;
  z-index: -1; 
}

.background .shape {
  position: absolute; 
  border-radius: 50%; 
}

.shape:first-child {
  height: 200px; /* Fixed height */
  width: 200px; /* Fixed width */
  background: linear-gradient(#1845ad, #23a2f6); 
  left: 30%; /* You can keep this if you want a fixed left position */
  top: 5%; /* Adjust as needed, this will place it 5% down from the top of the viewport */
  position: absolute; /* Ensure proper positioning */
}


.shape:last-child {
  height: 200px; /* Fixed height */
  width: 200px; /* Fixed width */
  background: linear-gradient(to right, #ff512f, #f09819); 
  right: 30%; /* You can keep this if you want a fixed left position */
  bottom: 5%; /* Adjust as needed, this will place it 5% down from the top of the viewport */
  position: absolute; /* Ensure proper positioning */
}
form:not(#adminForm,#tanarForm,#diakForm){
height: 680px;
width: 400px;
position: absolute;
background-color: rgba(255,255,255,0.13);
transform: translate(-50%,-50%);
top: 50%;
left: 50%;
border-radius: 10px;
backdrop-filter: blur(10px);
border: 2px solid rgba(255,255,255,0.1);
box-shadow: 0 0 40px rgba(8,7,16,0.6);
padding: 20px 35px;
}
form *{
font-family: 'Poppins',sans-serif;
color: #ffffff;
letter-spacing: 0.5px;
outline: none;
border: none;
}
label{
display: block;
margin-top: 30px;
font-size: 16px;
font-weight: 500;
}
.des{
display: block;
height: 50px;
width: 100%;
background-color: rgba(255,255,255,0.07);
border-radius: 3px;
padding: 0 10px;
margin-top: 8px;
font-size: 14px;
font-weight: 300;
}
::placeholder{
color: #e5e5e5;
}
#fNev,#fNev2,#fNev3{
text-align: right;
font-family: Arial, Helvetica, sans-serif;
font-weight: bold;
}
#version{
position:absolute;
top:0;
right:0;

}
#kod{
text-align: center;
}
/*jelszo*/

.password-container{
position: relative;
width:  100%;
}
.jelszomegjelenes{
width:  250px;
padding: 15px 15px;
position: absolute;
left: 450px;
top: 24px;
box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
display: none;
background-color: rgba(42, 2, 218, 0.112);
}
.jelszomegjelenes .title{
font-size: 14px;
font-weight: bold;
color: #777;
line-height: 20px;
}
.strength-bar-wrapper{
width: 100%;
height: 3px;
background-color: #e9e9e9;
border-radius: 3px;
}
#strength-bar{
width:  0;
height:  3px;
margin-top: 10px;
transition: width 0.2s;
border-radius: 3px;
}
.strength-description{
font-size: 14px;
color: #777;
margin-top: 20px;
line-height: 18px;
}
.strength-text{
font-size: 13px;
display: inline-block;
}
i{
font-style: normal;
color:black;
font-weight: bold;
}
.csillag::after {
  content: "*";
  color:red;
  margin-left:2px
}
p{
  position: relative; 
}
th{
  background-color: gray;
  height:10px;
  text-align: center;
  vertical-align: middle;
}
.valaszok{
  text-align: left;
  border-bottom: 2px solid black;
  background-color: #f9f9f9;
  color:black;
  padding: 10px;
  height: 50px; 
}
div{
  text-overflow: ellipsis;
  overflow: hidden;
}
.gombvalaszok{
  text-align: left;
  background-color: #f9f9f9;
  color:black;
  padding: 5px;
  height: 30px; 
  cursor: pointer;
  margin-bottom: 91.5%;
  border-radius: 8px;
}
.gombvalaszok2{
  text-align: left;
  background-color: #f9f9f9;
  color:black;
  padding:4px;
  height: 30px; 
  cursor: pointer;
  margin-bottom: 57%;
  border-radius: 8px;
}
#Hozzaadastabla{
  padding:1%;
}
option{
  color:black;
}
.modositastabla{
  display:block;
  height: 50px;
  background-color: rgba(255,255,255,0.07);
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
  box-sizing:border-box;

}

.gombkodvalaszok{

  background-color: #f9f9f9;
  color:black;
  padding: 5px;
  height: 30px; 
  cursor: pointer;
  margin-top: 49%;
  margin-bottom: 43%;
  border-radius: 8px;
  border-collapse: collapse; 
}
.gombkodvalaszok2{
  padding-top: 0px;
  background-color: #f9f9f9;
  color:black;
  padding: 5px;
  height: 30px; 
  cursor: pointer;
  margin-top: 30%;
  margin-bottom: 25%;
  border-radius: 8px;
  border-collapse: collapse; 
}
#Hozzaadastabla{
  padding:1%;
}
option{
  color:black;
}
.diakgomb {
  background-color: orange;
  margin-top: 10px;
  height: 50px;
  width: 100%;
  border-radius: 100px;
  box-shadow: rgba(255, 157, 1, 0.2) 0 -25px 18px -14px inset,rgba(250, 184, 2, 0.2) 0 1px 2px,rgba(250, 184, 2, 0.2) 0 2px 4px,rgba(250, 184, 2, 0.2) 0 4px 8px,rgba(250, 184, 2, 0.2) 0 8px 16px,rgba(250, 184, 2, 0.2) 0 16px 32px;
  color: rgb(255, 255, 255);
  cursor: pointer;
  display: inline-block;
  font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;
  padding: 7px 20px;
  transition: all 250ms;
  font-size: 14px;
  font-weight: 300;
  font-size: 16px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  text-align: center;
  }
#gém {
  height: 600px;
  width: 1000px;
  position: absolute;
  top: 15%;
  left: 20%;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 3px solid white;
  padding: 20px 35px;

}
.DiakgombVisszaGomb{
  background-color: orange;
  margin-top: 10px;
  height: 50px;
  width: fit-content;
  border-radius: 100px;
  box-shadow: rgba(255, 157, 1, 0.2) 0 -25px 18px -14px inset,rgba(250, 184, 2, 0.2) 0 1px 2px,rgba(250, 184, 2, 0.2) 0 2px 4px,rgba(250, 184, 2, 0.2) 0 4px 8px,rgba(250, 184, 2, 0.2) 0 8px 16px,rgba(250, 184, 2, 0.2) 0 16px 32px;
  color: black(255, 255, 255);
  cursor: pointer;
  display: inline-block;
  font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;
  padding: 7px 20px;
  transition: all 250ms;
  font-size: 14px;
  font-weight: 300;
  font-size: 16px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  text-align: center;
  position: relative; 
  }
.segitsegGomb{
  background-color: orange;
  margin-top: 10px;
  height: 50px;
  width: fit-content;
  border-radius: 100px;
  box-shadow: rgba(255, 157, 1, 0.2) 0 -25px 18px -14px inset,rgba(250, 184, 2, 0.2) 0 1px 2px,rgba(250, 184, 2, 0.2) 0 2px 4px,rgba(250, 184, 2, 0.2) 0 4px 8px,rgba(250, 184, 2, 0.2) 0 8px 16px,rgba(250, 184, 2, 0.2) 0 16px 32px;
  color: black(255, 255, 255);
  cursor: pointer;
  display: inline-block;
  font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;
  padding: 7px 20px;
  transition: all 250ms;
  font-size: 14px;
  font-weight: 300;
  font-size: 16px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  text-align: center;
  position: relative; 
}
.DiakGomb{
  background-color: orange;
  margin-top: 10px;
  height: 50px;
  width: 400px;
  border-radius: 100px;
  box-shadow: rgba(255, 157, 1, 0.2) 0 -25px 18px -14px inset,rgba(250, 184, 2, 0.2) 0 1px 2px,rgba(250, 184, 2, 0.2) 0 2px 4px,rgba(250, 184, 2, 0.2) 0 4px 8px,rgba(250, 184, 2, 0.2) 0 8px 16px,rgba(250, 184, 2, 0.2) 0 16px 32px;
  color: black(255, 255, 255);
  cursor: pointer;
  display: inline-block;
  font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;
  padding: 7px 20px;
  transition: all 250ms;
  font-size: 14px;
  font-weight: 300;
  font-size: 16px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  text-align: center;
  position: relative; 
  }
  .float-container {
    border: 3px solid #fff;
    display: flex;
    text-align: center;
}

.float-child {
    flex: 1;
    width: 47%;
    float: left;
    padding: 20px;
}
#jatekkerdes{
  text-align: center;
width: 140%;}
#ido {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  background-color: orange;
  padding: 10px 20px;
  width: fit-content;
}
.button-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.admingomb {
  flex-grow: 1;
  margin: 0 5px; 
  
}
#diakInfo,#diakInfo2{
    
    display:inline;
    float:left;
    padding: 10px;
    border-collapse: collapse;
    border: 1px solid white; 
}
#diakInfo{
  margin-left: 18%;
}
