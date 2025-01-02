const CountdownTimer=(()=>{function e(){const e=new Date;function t(t){let n=new Date(e);for(let e=0;e<60;e++)if(n.setDate(n.getDate()+1),"solar"===t){const e=Solar.fromDate(n),a=e.getFestivals();if(a.length>0)return a.slice(0,1).map((a=>({name:a,type:t,date:e.toYmd(),timestamp:n.getTime()})))[0]}else if("lunar"===t){const e=Lunar.fromDate(n).getFestivals();if(e.length>0){let a=n.getFullYear(),i=(n.getMonth()+1).toString().padStart(2,"0"),o=n.getDate().toString().padStart(2,"0");return e.slice(0,1).map((e=>({name:e,type:t,date:`${a}-${i}-${o}`,timestamp:n.getTime()})))[0]}}}const n=Solar.fromDate(e),a=Lunar.fromDate(e);let i=n.getFestivals().slice(0,1).map((e=>({name:e,type:"solar",date:n.toYmd(),timestamp:new Date(n.getYear(),n.getMonth()-1,n.getDay()).getTime()}))),o=a.getFestivals().slice(0,1).map((e=>({name:e,type:"lunar",date:n.toYmd(),timestamp:864e5*n.getJulianDay()})));0===i.length&&(i=[t("solar")]),0===o.length&&(o=[t("lunar")]);const r=a.getNextJieQi(),s={name:r.getName(),type:"jieqi",date:r.getSolar().toYmd(),timestamp:new Date(r.getSolar().getYear(),r.getSolar().getMonth()-1,r.getSolar().getDay()).getTime()},c=[...i,...o,s],d=new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime(),l=d+864e5-1,m=c.find((e=>e.timestamp>=d&&e.timestamp<=l));return m||c.filter((t=>t.timestamp>e.getTime())).sort(((e,t)=>e.timestamp-t.timestamp))[0]}const t={units:{day:{text:"今日",divider:1,unit:"小时"},week:{text:"本周",divider:24,unit:"天"},month:{text:"本月",divider:24,unit:"天"},year:{text:"本年",divider:24,unit:"天"}},countdownText:{future:"距离",today:""}};function n(e){const n=new Date;if("day"===e){const a=n.getHours();return{name:t.units[e].text,remaining:24-a,percentage:(a/24*100).toFixed(2),unit:t.units[e].unit}}let a=new Date(n),i=new Date(n);const o=new Date(n.getFullYear(),n.getMonth(),n.getDate());switch(e){case"week":const e=a.getDay()||7;a=new Date(a.setDate(a.getDate()-(e-1))),i=new Date(a),i.setDate(a.getDate()+6);break;case"month":a=o,a.setDate(a.getDate()+1),i=new Date(a.getFullYear(),a.getMonth()+1,0);break;case"year":a=o,a.setDate(a.getDate()+1),i=new Date(a.getFullYear(),11,31)}a.setHours(0,0,0,0),i.setHours(23,59,59,999);const r=Math.floor((i-a)/864e5)+1;let s,c;if("month"===e)s=new Date(n.getFullYear(),n.getMonth()+1,0).getDate(),c=n.getDate();else if("year"===e)s=(new Date(n.getFullYear(),11,31)-new Date(n.getFullYear(),0,1))/864e5+1,c=(o-new Date(n.getFullYear(),0,1))/864e5+1;else{s=7;c=n.getDay()||7}const d=c/s*100;return{name:t.units[e].text,remaining:r,percentage:d.toFixed(2),unit:t.units[e].unit}}function a(){const a=["eventName","eventDate","daysUntil","countRight","countdownText"].map((e=>document.getElementById(e)));if(a.some((e=>!e)))return;const[i,o,r,s,c]=a,d=e(),l=Object.keys(t.units).reduce(((e,t)=>({...e,[t]:n(t)})),{});if(d){const e=Math.ceil((d.timestamp-Date.now())/864e5),n=0===e;c.textContent=n?t.countdownText.today:t.countdownText.future,i.textContent=d.name,o.textContent=d.date,r.textContent=n?"今天":e}s.innerHTML=Object.entries(l).map((([e,t])=>`\n        <div class="cd-count-item">\n          <div class="cd-item-name">${t.name}</div>\n          <div class="cd-item-progress">\n            <div class="cd-progress-bar" style="width: ${t.percentage}%; opacity: ${t.percentage/100}"></div>\n            <span class="cd-percentage ${t.percentage>=46?"cd-many":""}">${t.percentage}%</span>\n            <span class="cd-remaining ${t.percentage>=60?"cd-many":""}">\n              <span class="cd-tip">还剩</span>${t.remaining}<span class="cd-tip">${t.unit}</span>\n            </span>\n          </div>\n        </div>\n      `)).join("")}let i;const o=()=>{!function(){const e=document.createElement("style");e.textContent='\n            .card-countdown .item-content {\n                display: flex;\n            }\n            .cd-count-left {\n                position: relative;\n                display: flex;\n                flex-direction: column;\n                margin-right: 0.8rem;\n                line-height: 1.5;\n                align-items: center;\n                justify-content: center;\n            }\n            .cd-count-left .cd-text {\n                font-size: 14px;\n            }\n            .cd-count-left .cd-name {\n                font-weight: bold;\n                font-size: 18px;\n            }\n            .cd-count-left .cd-time {\n                font-size: 30px;\n                font-weight: bold;\n                color: var(--anzhiyu-main);\n            }\n            .cd-count-left .cd-date {\n                font-size: 12px;\n                opacity: 0.6;\n            }\n            .cd-count-left::after {\n                content: "";\n                position: absolute;\n                right: -0.8rem;\n                width: 2px;\n                height: 80%;\n                background-color: var(--anzhiyu-main);\n                opacity: 0.5;\n            }\n            .cd-count-right {\n                flex: 1;\n                margin-left: .8rem;\n                display: flex;\n                flex-direction: column;\n                justify-content: space-between;\n            }\n            .cd-count-item {\n                display: flex;\n                flex-direction: row;\n                align-items: center;\n                height: 24px;\n            }\n            .cd-item-name {\n                font-size: 14px;\n                margin-right: 0.8rem;\n                white-space: nowrap;\n            }\n            .cd-item-progress {\n                position: relative;\n                display: flex;\n                flex-direction: row;\n                align-items: center;\n                justify-content: space-between;\n                height: 100%;\n                width: 100%;\n                border-radius: 8px;\n                background-color: var(--anzhiyu-background);\n                overflow: hidden;\n            }\n            .cd-progress-bar {\n                height: 100%;\n                border-radius: 8px;\n                background-color: var(--anzhiyu-main);\n            }\n            .cd-percentage,\n            .cd-remaining {\n                position: absolute;\n                font-size: 12px;\n                margin: 0 6px;\n                transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;\n            }\n            .cd-many {\n                color: #fff;\n            }\n            .cd-remaining {\n                opacity: 0;\n                transform: translateX(10px);\n            }\n            .card-countdown .item-content:hover .cd-remaining {\n                transform: translateX(0);\n                opacity: 1;\n            }\n            .card-countdown .item-content:hover .cd-percentage {\n                transform: translateX(-10px);\n                opacity: 0;\n            }\n        ',document.head.appendChild(e)}(),a(),i=setInterval(a,6e5)};return["pjax:complete","DOMContentLoaded"].forEach((e=>document.addEventListener(e,o))),document.addEventListener("pjax:send",(()=>i&&clearInterval(i))),{start:o,stop:()=>i&&clearInterval(i),getNextFestival:e}})();
//# sourceMappingURL=../maps/js/countdown.js.map
