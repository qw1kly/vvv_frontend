import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import axios from "axios";
import {init, openTelegramLink,swipeBehavior, backButton  } from '@telegram-apps/sdk';
import { hapticFeedback, shareMessage} from '@telegram-apps/sdk';
init()

setTimeout(() => {
		hapticFeedback.impactOccurred('soft');
		setTimeout(() => {
		hapticFeedback.impactOccurred('soft');
			setTimeout(() => {
		hapticFeedback.impactOccurred('soft');
				setTimeout(() => {
		hapticFeedback.impactOccurred('soft');
					setTimeout(() => {
		hapticFeedback.impactOccurred('soft');
	}, 100)
	}, 100)
	}, 100)
	}, 100)
	}, 100)

let hash_data = document.getElementById("hashid").innerText;
axios.get('https://qw1kly-vvv-backend-9867.twc1.net/auth', {headers: {
    'x-telegram-init-data': hash_data
  } })
  .then(response => {
    let balance = response.data['balance'];
    let keys = response.data['keys'];
    document.getElementById("summofball").innerText = balance+"₽";
    let imgg = document.createElement("img");
    imgg.src = "Plus.png";
    imgg.id = "addfundsimg"
    document.getElementById("summofball").appendChild(imgg);
    if (keys != null) {
    document.getElementById("amountofkeys").innerText = "Кол-во ключей: " +keys.length;
    
    document.getElementById("keys").style.height = 72 + (60 * keys.length) + "px";
    document.getElementById("keyslist").style.height = -4 + (60 * keys.length) + "px";
    for (let i=0; i<keys.length; i++) {
      let bigdiv = document.createElement("div");
      let biga = document.createElement("a");
      let bigimg = document.createElement("img");

      bigdiv.id = "currentkey";
      document.getElementById("keyslist").appendChild(bigdiv);
      
      biga.id = "keytext";
      biga.innerText = keys[i];
      bigdiv.appendChild(biga);


      bigimg.src = "Copy (1).png";
      bigimg.id = "keycopy";
      bigimg.className = "keyycopyy";
      bigdiv.appendChild(bigimg);
      bigimg.setAttribute("value", keys[i]);
    }}
    
  })
  .catch(error => {
    console.error('Ошибка:', error);
  });










const link = document.getElementById('summofball');
const textWidth = link.scrollWidth; // получаем ширину текста
console.log(textWidth);
link.style.setProperty('--text-width', `${textWidth}px`); // передаём в CSS


const keyCreation = document.getElementById("createkey");
keyCreation.addEventListener("click", async function crkey (e) {
  if (Number(document.getElementById("summofball").innerText.slice(0, -1) >= 250)) {
    const response = await fetch('https://qw1kly-vvv-backend-9867.twc1.net/create-key', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Telegram-Init-Data': hash_data
            },
            
        });

        if (!response.ok) {
            throw new Error('Server error');
        }

      const data = await response.json();
      if (data['message'] != "insufficient funds") {
        document.getElementById("summofball").innerText = Number(document.getElementById("summofball").innerText.slice(0, -1))-250+"₽";
        let imgg = document.createElement("img");
        imgg.src = "Plus.png";
        imgg.id = "addfundsimg"
        document.getElementById("summofball").appendChild(imgg);

        document.getElementById("amountofkeys").innerText = "Кол-во ключей: " +data['count'];
    
        document.getElementById("keys").style.height = 72 + (60 * data['count']) + "px";
        document.getElementById("keyslist").style.height = -4 + (60 * data['count']) + "px";
          let bigdiv = document.createElement("div");
          let biga = document.createElement("a");
          let bigimg = document.createElement("img");

          bigdiv.id = "currentkey";
          document.getElementById("keyslist").appendChild(bigdiv);
          
          biga.id = "keytext";
          biga.innerText = data['message'];
          bigdiv.appendChild(biga);


          bigimg.src = "Copy (1).png";
          bigimg.id = "keycopy";
          bigimg.className = "keyycopyy";
          bigdiv.appendChild(bigimg);
          bigimg.setAttribute("value", data['message']);


      }
      hapticFeedback.notificationOccurred('success');

    } else {
      document.getElementById("createkey").classList.add("shake");
      
      setTimeout(() => {
      hapticFeedback.notificationOccurred('error');
        setTimeout(() => {
      hapticFeedback.notificationOccurred('error');
          setTimeout(() => {
      hapticFeedback.notificationOccurred('error');
      }, 100)
      }, 100)
      }, 100)

      setTimeout(() => {
        document.getElementById("createkey").classList.remove("shake");

      }, 500);
    }
})


const addfunds = document.getElementById("summofball");
addfunds.addEventListener("click", (e) => {
    alert(1);
})

const copy = document.getElementById("keyslist");
    copy.addEventListener("click", async function dele (e) {
      if (e.target.id == "keycopy"){
        if (e.target.getAttribute("src") == "Copy (1).png"){
        hapticFeedback.impactOccurred('light');
        navigator.clipboard.writeText(e.target.getAttribute("value"))
      } else {
        hapticFeedback.impactOccurred('medium');

        let val = null;
        let keytodelete = e.target.getAttribute("value");
        console.log(keytodelete);
        for (let i = 0; i<document.getElementById("keyslist").childNodes.length; i++) {
          let current_node = document.getElementById("keyslist").childNodes[i]
          val = current_node.childNodes[1].getAttribute("value");
          if (val == keytodelete) {
            document.getElementById("keyslist").removeChild(current_node);
            break;
          }
        }
        const response = await fetch('https://qw1kly-vvv-backend-9867.twc1.net/remove-key', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Telegram-Init-Data': hash_data
            },
            body: JSON.stringify({
              key: val
            })
            
        });
      }}
      })
let flag = false;
const deletee = document.getElementById("setupkeys");
    deletee.addEventListener("click", (e) => {
      hapticFeedback.impactOccurred('soft');
      let gingo = document.getElementsByClassName("keyycopyy");
      for (let i = 0; i<gingo.length; i++) {
        if (flag == false) {
          gingo[i].src = "Cross Mark (2).png";
        } else {
          gingo[i].src = "Copy (1).png";
        }
      }
      if (flag == false) {
        flag = true;
      } else {
        flag = false;
      }
      })

const root = ReactDOM.createRoot(document.getElementById('root'));
const elem = (<div></div>);
root.render(elem);

