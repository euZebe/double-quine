(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{146:function(e,t,a){e.exports=a(279)},151:function(e,t,a){},277:function(e,t,a){},279:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(27),o=a.n(i),c=(a(151),a(18)),l=a(19),s=a(21),u=a(20),p=a(22),m=a(288),d=a(287),h=a(41),g=a(39),b=(a(96),a(28)),f=a(284),v=a(286),y=a(23),O=a(49),j={width:"2.5rem",height:"2.5rem",border:"5px solid #33e8",borderRadius:"2rem",margin:"3px",display:"flex",justifyContent:"center",alignItems:"center",fontSize:"large",color:"#55f",fontFamily:"monospace"},w=Object(O.a)({},j,{border:"5px solid lightgrey",color:"grey"}),k=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props,t=e.value,a=e.on;return n.createElement("div",{"data-testid":a?"picked":"available",style:a?j:w},t)}}]),t}(n.PureComponent),E={container:{gridArea:"list"},list:{display:"flex",flexWrap:"wrap",minHeight:"41px"}},S=function(e){var t=e.game;return n.createElement("div",{style:E.container},n.createElement("h2",null," Total tirages: ",t.pickedValues.length),n.createElement("div",{style:E.list},t&&t.pickedValues.map(function(e){return n.createElement(k,{value:e,key:e,on:!0})})))},x=a(126),D=a.n(x),I={display:"flex",justifyContent:"center"},V=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).handleClick=function(){var e=a.props,t=e.value;(0,e.toggleNumber)(t)},a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return n.createElement(v.a,{onClick:this.handleClick,basic:!0,fluid:!0,className:"nomargin"},n.createElement("div",{style:I},n.createElement(k,this.props)))}}]),t}(n.PureComponent),A={display:"flex",justifyContent:"space-between"},N=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).getOnProp=function(e){return e.props.on},a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"shouldComponentUpdate",value:function(e){return!D()(e.children.map(this.getOnProp),this.props.children.map(this.getOnProp))}},{key:"render",value:function(){var e=this.props.children;return n.createElement("div",{style:A},e)}}]),t}(n.Component),P={gridArea:"board"},G=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props,t=e.pickedValues,a=e.onValuePicked,r=this.props.rows,i=void 0===r?9:r;return n.createElement("div",{style:P},Array(i).fill(null).map(function(e,r){return n.createElement(N,{key:r},Array(10).fill(null).map(function(e,i){var o=10*r+i+1;return n.createElement(V,{key:i,value:o,on:t.includes(o),toggleNumber:a})}))}))}}]),t}(n.PureComponent),C=1e3,T={gridArea:"chrono",alignSelf:"start",justifySelf:"end"},z=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={startTime:void 0,currentInterval:void 0,elapsedTime:void 0},a.play=function(){var e=new Date,t=setInterval(function(){var t=(new Date).getTime()-e.getTime();a.setState({elapsedTime:t})},C);a.setState({currentInterval:t})},a.stop=function(){clearInterval(a.state.currentInterval);var e=a.props.timeFromPastSession,t=a.state.elapsedTime;t&&a.props.onStop(t+1e3*e)},a.onTwoDigits=function(e){return e.toString().padStart(2,"0")},a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"componentWillUnmount",value:function(){this.stop()}},{key:"componentDidMount",value:function(){this.props.startNow&&this.play()}},{key:"componentDidUpdate",value:function(e){!e.startNow&&this.props.startNow&&this.play()}},{key:"renderElapsedTime",value:function(){var e=this.props.timeFromPastSession,t=this.state.elapsedTime||0,a=new Date(t+1e3*e),n=[a.getUTCHours(),a.getMinutes(),a.getSeconds()].map(this.onTwoDigits).filter(function(e,t){return 0!==t||"00"!==e}).join(":");return r.a.createElement("h2",{"data-testid":"display"},n)}},{key:"render",value:function(){return r.a.createElement("div",{style:T},this.renderElapsedTime())}}]),t}(r.a.PureComponent);z.defaultProps={timeFromPastSession:0};var F,M,H,W,J=z,R={display:"grid",height:"calc(100vh - 28px)",gridTemplateAreas:"'board board' 'list chrono' 'list button'",gridTemplateColumns:"82vw 1fr"},U={gridArea:"button",alignSelf:"end",justifySelf:"end"},B=Object(y.c)(function(e){var t=e.game,a=e.isStarted,r=e.setDuration,i=e.handleValuePicked;return n.createElement("div",{style:R},n.createElement(G,{pickedValues:t.pickedValues,onValuePicked:i}),n.createElement(S,{game:t}),n.createElement(J,{startNow:a,onStop:r,timeFromPastSession:t.duration}),n.createElement(f.a,{to:"/",style:U},n.createElement(v.a,{color:"violet"},"Fin de partie")))}),$=a(7),q=Object(y.b)("gamesStore")(F=Object(y.c)((M=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={isStarted:!1},Object(h.a)(a,"toggleValue",H,Object(g.a)(Object(g.a)(a))),Object(h.a)(a,"handleDuration",W,Object(g.a)(Object(g.a)(a))),a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.gamesStore;e.currentGameIndex=this.getIDAsNumber(),this.getIDAsNumber()>=e.games.length&&e.initiateNewGame()}},{key:"getID",value:function(){return this.props.match.params.id}},{key:"getIDAsNumber",value:function(){return Number.parseInt(this.getID())}},{key:"render",value:function(){var e=this.props.gamesStore.games;if(this.getIDAsNumber()>=e.length)return"";var t=e[this.getIDAsNumber()],a=this.state.isStarted;return n.createElement(B,{game:t,isStarted:a,handleValuePicked:this.toggleValue,setDuration:this.handleDuration})}}]),t}(n.Component),Object(b.a)(M.prototype,"componentDidMount",[$.d],Object.getOwnPropertyDescriptor(M.prototype,"componentDidMount"),M.prototype),H=Object(b.a)(M.prototype,"toggleValue",[$.d],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(t){e.props.gamesStore.toggleValue(e.getIDAsNumber(),t),e.setState({isStarted:!0})}}}),W=Object(b.a)(M.prototype,"handleDuration",[$.d],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(t){e.props.gamesStore.setDuration(e.getIDAsNumber(),t)}}}),F=M))||F)||F,K=a(65),L=a(285),Q=a(137),X={position:"relative",top:"4px",left:"-5px"},Y=function(e){var t=e.size,a=e.color,n=Object(Q.a)(e,["size","color"]);return r.a.createElement("svg",Object.assign({fillRule:"evenodd",clipRule:"evenodd",width:t||32,height:t||32},n,{fill:a||"white",style:X}),r.a.createElement("path",{d:"M9 3h6V1.25a.25.25 0 0 0-.25-.25h-5.5a.25.25 0 0 0-.25.25V3zm11 1H4v18a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4zM10 7.5a.5.5 0 0 0-1 0v12a.5.5 0 0 0 1 0v-12zm5 0a.5.5 0 0 0-1 0v12a.5.5 0 0 0 1 0v-12zM23 3v1h-2v18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4H1V3h7V1a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2h7z"}))};function Z(e){if(!e)return"";var t=Math.floor(e/60);return"".concat(t," minute").concat(t>1?"s":"")}var _=Object(y.c)(function(e){var t,a=e.game,n=e.index;return r.a.createElement(L.a,{header:"Partie ".concat(n+1),meta:(t=a.pickedValues.length,"".concat(t," tirage").concat(t>1?"s":"")+" - "+Z(a.duration)),description:r.a.createElement("span",{"data-testid":"game-card"},a.pickedValues.join(", ")),extra:r.a.createElement(f.a,{to:"/game/".concat(n)},r.a.createElement(v.a,{basic:!0,color:"violet"},"Continuer"))})}),ee=function(e){var t=e.newIndex;return r.a.createElement(L.a,{description:"D\xe9marrer nouvelle partie",extra:r.a.createElement(f.a,{to:"/game/".concat(t)},r.a.createElement(v.a,{color:"violet"},"Nouvelle partie"))})};var te,ae,ne,re,ie={position:"fixed",bottom:"20px",right:"20px",borderRadius:"2rem",margin:0,maxWidth:"56px",maxHeight:"56px"},oe=Object(y.b)("gamesStore")(Object(y.c)(function(e){var t=e.gamesStore;return r.a.createElement(r.a.Fragment,null,r.a.createElement(v.a,{as:"div",color:"violet",role:"button","aria-label":"clear all games",tabIndex:0,style:ie,onClick:function(){return e=t,void(window.confirm("Voulez-vous supprimer toutes les parties ?")&&e.trashAllGames());var e}},r.a.createElement(Y,null)),r.a.createElement(L.a.Group,null,t.games&&[].concat(Object(K.a)(t.games.map(function(e,t){return r.a.createElement(_,{key:t,game:e,index:t})})),[r.a.createElement(ee,{newIndex:t.games.length,key:t.games.length})]).reverse()))})),ce=Object(y.c)(te=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(y.a,{gamesStore:this.props.store},r.a.createElement(m.a,null,r.a.createElement("div",null,r.a.createElement(d.a,{path:"/",exact:!0,component:oe}),r.a.createElement(d.a,{path:"/game/:id",component:q})))))}}]),t}(r.a.Component))||te;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var le={pickedValues:[],duration:0},se=(ae=function(){function e(){var t=this;Object(c.a)(this,e),Object(h.a)(this,"games",ne,this),Object(h.a)(this,"currentGameIndex",re,this),Object($.e)(function(){t.persistGame(t.currentGameIndex,t.games[t.currentGameIndex])})}return Object(l.a)(e,[{key:"getItemsFromStorage",value:function(){return Object.values(window.localStorage).map(function(e){return Object($.l)(JSON.parse(e))})}},{key:"toggleValue",value:function(e,t){var a=this.games[e],n=a.pickedValues,r=n.indexOf(t);if(n.length&&r===n.length-1){var i=Object(O.a)({},a,{pickedValues:n.slice(0,n.length-1)});this.games.splice(e,1,i)}else if(-1===r){var o=Object(O.a)({},a,{pickedValues:[].concat(Object(K.a)(n),[t])});this.games.splice(e,1,o)}}},{key:"setDuration",value:function(e,t){this.games[e].duration=Math.floor(t/1e3)}},{key:"initiateNewGame",value:function(){this.games.push(le)}},{key:"trashAllGames",value:function(){this.games.splice(0,this.games.length),this.currentGameIndex=-1,localStorage.clear()}},{key:"persistGame",value:function(e,t){this.currentGameIndex>=0&&this.currentGameIndex<this.games.length&&localStorage.setItem(e.toString(),JSON.stringify(Object($.n)(t)))}}]),e}(),ne=Object(b.a)(ae.prototype,"games",[$.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return this.getItemsFromStorage()}}),re=Object(b.a)(ae.prototype,"currentGameIndex",[$.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return-1}}),Object(b.a)(ae.prototype,"toggleValue",[$.d],Object.getOwnPropertyDescriptor(ae.prototype,"toggleValue"),ae.prototype),Object(b.a)(ae.prototype,"setDuration",[$.d],Object.getOwnPropertyDescriptor(ae.prototype,"setDuration"),ae.prototype),Object(b.a)(ae.prototype,"initiateNewGame",[$.d],Object.getOwnPropertyDescriptor(ae.prototype,"initiateNewGame"),ae.prototype),Object(b.a)(ae.prototype,"trashAllGames",[$.d],Object.getOwnPropertyDescriptor(ae.prototype,"trashAllGames"),ae.prototype),ae),ue=(a(274),a(277),new se);o.a.render(r.a.createElement(ce,{store:ue}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[146,2,1]]]);
//# sourceMappingURL=main.9a2bcf99.chunk.js.map