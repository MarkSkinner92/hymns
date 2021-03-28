var sheetID="1DwFbenVTO-9OE-EdVJc5fJLZmXDzI8GKSgFXSSL6FzY",data=[];function addSheet(e,t){let a=document.getElementById("slot-holder"),l=document.getElementById("slot-template").cloneNode(!0);l.style.display="block",l.id="";let n=getRowNum(e),d=grabDayData(n),o=getValue(n,"organist");l.querySelector(".slot-title").innerText=`${fmtDate(getValue(n,"date"))+" ("+t+")"} - ${o||"TBD (Take a break!)"}`,l.insertAdjacentHTML("beforeend",d),a.appendChild(l)}function getValue(e,t,a=0){let l,n=getCol(t);return n&&data[n]&&data[n][e]&&(l=data[getCol(t)+a][e]),l}function getRowNum(e){var t=new Date;t.setDate(t.getDate()-1);var a=new Date(t.getTime());a.setDate(t.getDate()+(7-t.getDay()%7)+7*e);let l=[a.toLocaleString("en-us",{month:"short"}),a.getDate()],n=getCol("date");for(let e=1;e<data[n].length;e++)if(data[n]&&data[n][e]&&data[n][e].includes(l[0])&&data[n][e].includes(l[1]))return e}function grabDayData(e){let t="",a=getValue(e,"topic");a&&(t+=addKeyValue("",a)),a=getValue(e,"opening");let l=getValue(e,"opening",1);return a&&(t+=addKeyValue("Opening",a+", "+l)),a=getValue(e,"sacrament"),l=getValue(e,"sacrament",1),a&&(t+=addKeyValue("Sacrament",a+", "+l)),(a=getValue(e,"special"))&&(t+=addKeyValue("Special Musical Number",a)),l=getValue(e,"closing",1),(a=getValue(e,"closing"))&&(t+=addKeyValue("Closing",a+", "+l)),(a=getValue(e,"chorister"))&&(t+=addKeyValue("Chorister",a)),(a=getValue(e,"conduct"))&&(t+=addKeyValue("Conductor",a)),t}function getCol(e){for(let t=1;t<data.length;t++){let a;if(data&&data[t]&&data[t][2]&&(a=data[t][2]).toLowerCase().includes(e.toLowerCase()))return t}}function addKeyValue(e,t){return e?`<p class='slotInfo'><b>${e}</b> - ${t}</p>`:`<p class='slotInfo'>${t}</p>`}function fmtDate(e){let t="";var a=["January","February","March","April","May","June","July","August","September","October","November","December"];let l=e.split("-");for(let e=0;e<a.length;e++)if(a[e].includes(l[1])){l[1]=a[e];break}return t=`${l[1]} ${l[0]}`}function doData(e){let t=e.feed.entry;data=[],t.forEach((e,t)=>{let a=e.gs$cell;data[a.col]||(data[a.col]=[]),data[a.col][a.row]=a.$t}),console.log(data)}function createSheets(){addSheet(0,"This Sunday"),addSheet(1,"Next Sunday"),addSheet(2,"The Sunday After That")}function onLoad(){let e=`https://spreadsheets.google.com/feeds/cells/${sheetID}/1/public/values?alt=json-in-script&callback=doData`;$.getScript(e).done(function(e,t){createSheets()})}
