(this.webpackJsonppapasmaths2=this.webpackJsonppapasmaths2||[]).push([[0],[,,,,,,,,,,,function(e,t,a){e.exports=a(26)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(10),c=a.n(i),s=(a(16),a(6)),o=a(1),u=a(2),l=a(4),h=a(3),m=(a(17),function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"test"},r.a.createElement("div",{className:"questions"},r.a.createElement("h1",null,this.props.title),this.props.blocks.map((function(e){return e.getQuestionsBlock()}))),r.a.createElement("div",{className:"answers"},r.a.createElement("h1",null,this.props.title," - Answer Sheet"),this.props.blocks.map((function(e){return e.getAnswersBlock()}))))}}]),a}(r.a.Component)),d=a(5),v=a(7);a(18),a(19);var f=function(e){return r.a.createElement("div",{className:"question-oneliner"},e.question,r.a.createElement("div",{className:"answer"},"Answer"))};a(20);var b=function(e){return r.a.createElement("div",{className:"answer-default"},e.answer)},w=(a(21),function(){function e(t){Object(o.a)(this,e),this.questionsPerRow=t.questionsPerRow||1,this.answersPerRow=t.answersPerRow||4,this.questionTag=t.questionTag||f,this.answerTag=t.answerTag||b,this.start=t.start||1,this.count=t.count,this.title=t.title,this.description=t.description||"",this.tasks=[],this.generateTasks()}return Object(u.a)(e,[{key:"getTask",value:function(e){return{question:"QuestionOneLiner "+e,answer:"Answer "+e}}},{key:"getCount",value:function(){return this.count}},{key:"generateTasks",value:function(){for(var e=0;e<this.count;e++){var t=this.getTask(e);this.tasks.push({number:this.start+e,question:t.question,answer:t.answer})}}},{key:"getEditorBlock",value:function(){var e=this;return r.a.createElement("div",{className:"editor-block"},r.a.createElement("div",{className:"title"},this.title),r.a.createElement("div",{className:"input"},r.a.createElement("input",{type:"text",onChange:function(t){return e.count=t.target.value}})))}},{key:"getQuestionsBlock",value:function(){for(var e=this,t=[],a=0;a<this.tasks.length;a+=this.questionsPerRow)t.push(this.tasks.slice(a,a+this.questionsPerRow));var n=this.questionTag;return r.a.createElement("div",{className:"questions-block"},r.a.createElement("h2",null,this.title),r.a.createElement("div",{className:"table-container"},r.a.createElement("table",null,r.a.createElement("tbody",null,t.map((function(t){return r.a.createElement("tr",null,t.map((function(t){return r.a.createElement("td",{style:{width:100/e.questionsPerRow+"%"}},r.a.createElement("div",{className:"question-number"},t.number),r.a.createElement(n,{question:t.question}))})))}))))))}},{key:"getAnswersBlock",value:function(){for(var e=this,t=[],a=0;a<this.tasks.length;a+=this.answersPerRow)t.push(this.tasks.slice(a,a+this.answersPerRow));var n=this.answerTag;return r.a.createElement("div",{className:"answers-block"},r.a.createElement("h2",null,this.title),r.a.createElement("table",null,r.a.createElement("tbody",null,t.map((function(t){return r.a.createElement("tr",null,t.map((function(t){return r.a.createElement("td",{style:{width:100/e.answersPerRow+"%"}},r.a.createElement("div",{className:"answer-number"},t.number),r.a.createElement(n,{answer:t.answer}))})))})))))}},{key:"getAnswersBlockTransposed",value:function(){for(var e=this,t=[],a=Math.ceil(this.tasks.length/this.answersPerRow),n=0;n<a;n++){t[n]=[];for(var i=0;i<this.answersPerRow;i++){var c=n+i*a;t[n].push(c<this.tasks.length&&this.tasks[c])}}var s=this.answerTag;return r.a.createElement("div",{className:"answers-block"},r.a.createElement("h2",null,this.title),r.a.createElement("table",null,r.a.createElement("tbody",null,t.map((function(t){return r.a.createElement("tr",null,t.map((function(t){return t?r.a.createElement("td",{style:{width:100/e.answersPerRow+"%"}},r.a.createElement("div",{className:"answer-number"},t.number),r.a.createElement(s,{answer:t.answer})):r.a.createElement("td",null)})))})))))}}]),e}()),p={dice:function(e){return Math.random()<(e||.5)},wdice:function(e,t,a){return Math.random()<e+a*(t-e)},natural:function(e){return Math.ceil(Math.random()*e)},arr:function(e){return!!e.length&&e[Math.floor(Math.random()*e.length)]},shuffle:function(e){for(var t=e.length-1;t>0;t--){var a=Math.floor(Math.random()*t),n=e[t];e[t]=e[a],e[a]=n}},vars:function(){return[["a","b","c"],["x","y","z"],["p","q","r"]][Math.floor(3*Math.random())]}},k=function(e){var t=e.vars||p.vars(),a=e.vMust,n=e.vRemove,r=p.natural(9),i=(a||1===r||p.dice())&&p.arr(t)||"",c=i&&p.dice(.2)&&p.arr(t)||"";return c&&c===i&&(c=""),n&&i&&t.splice(t.indexOf(i),1),n&&c&&t.splice(t.indexOf(c),1),[r,i,c]};function g(e){var t=1,a="";e.forEach((function(e){Number.isInteger(e)&&e?t*=e:e&&(a+=e)}));var n=1===t&&a?"":"".concat(t);a=a.split("").sort().join("");for(var r=0;r<a.length;r++)n+=a[r],a[r]===a[r+1]&&(n+="\xb2",r++);return n}function E(e,t,a){return"".concat(t&&1===e?"":e).concat(t).concat(a)}function O(e){var t=p.vars(),a=k({vars:t}),n=Object(d.a)(a,3),r=n[0],i=n[1],c=n[2],s=k({vars:t,vRemove:!0}),o=Object(d.a)(s,3),u=o[0],l=o[1],h=o[2],m=k({vars:t,vRemove:!0,vMust:!l}),v=Object(d.a)(m,3),f=v[0],b=v[1],w=v[2],O=k({vars:t,vMust:!l||!b}),j=Object(d.a)(O,3),y=j[0],M=j[1],T=j[2];if(p.dice(.8)&&(y=0),e)for(var q=2;q<=u&&q<=f&&(!y||q<=y);q++)u%q||f%q||y&&y%q||(u/=q,f/=q,y/=q,r*=q);var N=p.dice()?"+":"\u2013",R=p.dice()?"+":"\u2013",P=E(r,i,c),C=E(u,l,h),A=E(f,b,w),D=E(y,M,T),S="".concat(P,"(").concat(C," ").concat(N," ").concat(A).concat(y?" ".concat(R," ").concat(D):"",")"),B=g([r,i,c,u,l,h]),U=g([r,i,c,f,b,w]),W=g([r,i,c,y,M,T]);return{wrapped:S,unwrapped:"".concat(B," ").concat(N," ").concat(U).concat(y?" ".concat(R," ").concat(W):"")}}var j=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(e,n){return Object(o.a)(this,a),t.call(this,{start:e,count:n,title:"Remove Brackets",description:"Rewrite the statement, so that it does not contain brackets"})}return Object(u.a)(a,[{key:"getTask",value:function(){var e=O(!1);return{question:e.wrapped,answer:e.unwrapped}}}]),a}(w),y=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(e,n){return Object(o.a)(this,a),t.call(this,{start:e,count:n,title:"Add Brackets",description:"Rewrite the statement, so that it contains brackets and as much as possible is removed out of the brackets"})}return Object(u.a)(a,[{key:"getTask",value:function(){var e=O(!0),t=e.wrapped;return{question:e.unwrapped,answer:t}}}]),a}(w);a(22);var M=function(e){return r.a.createElement("div",{className:"question-with-workings"},r.a.createElement("div",{className:"question"},e.question),r.a.createElement("div",{className:"answer"},"Answer"),r.a.createElement("div",{className:"workings"},"Workings"))};a(23);var T=function(e){return r.a.createElement("div",{className:"question-twoliner"},r.a.createElement("div",{className:"question"},e.question),r.a.createElement("div",{className:"workings"},"Workings"),r.a.createElement("div",{className:"answer"},"Answer"))};function q(e,t){return t?q(t,e%t):e}var N=["s","r","a"],R=[1,2,3,5,10,12,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,98,99],P=["more","less"],C=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(e,n){return Object(o.a)(this,a),t.call(this,{start:e,count:n,questionTag:T,questionsPerRow:2,title:"Percentages"})}return Object(u.a)(a,[{key:"getTask",value:function(e){var t,a,n=p.arr(R),r=100/q(100,n),i=Math.ceil(100*Math.random())*r,c=i*n/100;switch(p.arr(N)){case"s":t="What is ".concat(n,"% of ").concat(i,"?"),a=c;break;case"r":t="".concat(c," is ").concat(n,"% of what number?"),a=i;break;case"a":var s=p.arr(P);t="What number is ".concat(n,"% ").concat(s," than ").concat(i),a=i+("more"==s?1:-1)*c}return{question:t,answer:a}}}]),a}(w),A=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(e,n){return Object(o.a)(this,a),t.call(this,{start:e,count:n,questionTag:M,questionsPerRow:4,title:"Multiplication",description:""})}return Object(u.a)(a,[{key:"getTask",value:function(e){var t=10+Math.ceil(89*Math.random()),a=10+Math.ceil(89*Math.random());return p.dice(.2)&&(t+=100*Math.ceil(9*Math.random())),p.dice(.2)&&(a+=100*Math.ceil(9*Math.random())),{question:"".concat(t," \xd7 ").concat(a),answer:t*a}}}]),a}(w),D=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(e,n){return Object(o.a)(this,a),t.call(this,{start:e,count:n,questionTag:T,questionsPerRow:2,title:"Division",description:""})}return Object(u.a)(a,[{key:"getTask",value:function(e){var t=1+Math.ceil(9*Math.random());p.dice()&&(t+=Math.ceil(89*Math.random()));var a=1+Math.ceil(9*Math.random());(t<11||p.dice())&&(a+=Math.ceil(89*Math.random()));var n=p.dice()?0:Math.ceil(Math.random()*(t-1));return{question:"".concat(t*a+n," \xf7 ").concat(t),answer:a+(n?"r".concat(n):"")}}}]),a}(w);function S(){var e=10+Math.ceil(89*Math.random());return p.dice(.5)&&(e+=100*Math.ceil(9*Math.random())),p.dice(.2)&&(e+=1e3*Math.ceil(9*Math.random())),e}var B=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(e,n,r){return Object(o.a)(this,a),t.call(this,{start:e,count:n,questionTag:M,questionsPerRow:4,title:"Addition and Subtraction",description:""})}return Object(u.a)(a,[{key:"getTask",value:function(e){var t,a,n=S(),r=S();if(p.dice(.5)?(t="".concat(n," + ").concat(r),a=n+r):n>r?(t="".concat(n," \u2013 ").concat(r),a=n-r):(t="".concat(r," \u2013 ").concat(n),a=r-n),p.dice(.33)){var i=S();p.dice(.5)||a<i?(t+=" + ".concat(i),a+=i):(t+=" \u2013 ".concat(i),a-=i)}return{question:t,answer:a}}}]),a}(w);a(24);function U(e){return r.a.createElement("table",{className:"fraction"},r.a.createElement("tbody",null,r.a.createElement("tr",null,!!e.whole&&r.a.createElement("td",{className:"whole",rowSpan:"2"},e.whole),!!e.numerator&&r.a.createElement("td",{className:"numerator"},e.numerator)),r.a.createElement("tr",null,!!e.numerator&&r.a.createElement("td",{className:"denominator"},e.denominator))))}function W(e){var t=[],a=[];return e.members.forEach((function(e){"string"===typeof e?t.push(r.a.createElement("td",{className:"operation",rowSpan:"2"},e)):(!e[0]&&e[1]||t.push(r.a.createElement("td",{className:"whole",rowSpan:"2"},e[0])),e[1]&&(t.push(r.a.createElement("td",{className:"numerator"},e[1])),a.push(r.a.createElement("td",{className:"denominator"},e[2]))))})),r.a.createElement("table",{className:"fraction"},r.a.createElement("tbody",null,r.a.createElement("tr",null,t),r.a.createElement("tr",null,a)))}function L(e,t,a){e+=Math.trunc(t/a);var n=q(t%=a,a);return[e,t/=n,a/=n]}function F(){var e=1+Math.ceil(11*Math.random()),t=Math.ceil(Math.random()*(e-1));return L(p.dice()?Math.ceil(50*Math.random()):0,t,e)}var x=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(e,n){return Object(o.a)(this,a),t.call(this,{start:e,count:n,questionsPerRow:2,title:"Fractions Addition and Subtraction",description:"Perform an operation and write the result in the most simplified way"})}return Object(u.a)(a,[{key:"getTask",value:function(){var e=F(),t=Object(d.a)(e,3),a=t[0],n=t[1],i=t[2],c=F(),s=Object(d.a)(c,3),o=s[0],u=s[1],l=s[2],h=a+n/i<o+u/l||p.dice()?"+":"\u2013",m=function(e,t,a){var n=Object(d.a)(e,3),r=n[0],i=n[1],c=n[2],s=Object(d.a)(t,3),o=s[0],u=s[1],l=s[2],h=c*l;return i=i*l+r*h,u=u*c+o*h,L(0,"+"===a?i+u:i-u,h)}([a,n,i],[o,u,l],h),v=Object(d.a)(m,3),f=v[0],b=v[1],w=v[2];return{question:r.a.createElement(W,{members:[[a,n,i],h,[o,u,l]]}),answer:r.a.createElement(U,{whole:f,numerator:b,denominator:w})}}}]),a}(w),J=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(e,n){return Object(o.a)(this,a),t.call(this,{start:e,count:n,questionsPerRow:2,title:"Fractions Multiplication and Division",description:"Perform an operation and write the result in the most simplified way"})}return Object(u.a)(a,[{key:"getTask",value:function(){var e=F(),t=Object(d.a)(e,3),a=t[0],n=t[1],i=t[2],c=F(),s=Object(d.a)(c,3),o=s[0],u=s[1],l=s[2];a>9&&(a=0),(a||o>9)&&(o=0);var h=p.dice()?"\xd7":"\xf7",m=function(e,t,a){var n=Object(d.a)(e,3),r=n[0],i=n[1],c=n[2],s=Object(d.a)(t,3),o=s[0],u=s[1],l=s[2];return i+=r*c,u+=o*l,L(0,"\xd7"===a?i*u:i*l,"\xd7"===a?c*l:c*u)}([a,n,i],[o,u,l],h),v=Object(d.a)(m,3),f=v[0],b=v[1],w=v[2];return{question:r.a.createElement(W,{members:[[a,n,i],h,[o,u,l]]}),answer:r.a.createElement(U,{whole:f,numerator:b,denominator:w})}}}]),a}(w);a(25);var I=function(e){return r.a.createElement("div",{className:"question-long-twoliner"},r.a.createElement("div",{className:"question"},e.question),r.a.createElement("div",{className:"workings"},"Workings"),r.a.createElement("div",{className:"answer"},"Answer"))},Q=["r","ri","w"],Z=["January","February","March","April","May","June","July","August","September","October","November","December"],z=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function G(e){return e.getUTCDate()+" "+Z[e.getUTCMonth()]}var Y=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(e,n){return Object(o.a)(this,a),t.call(this,{start:e,count:n,questionTag:I,questionsPerRow:2,title:"Date manipulations"})}return Object(u.a)(a,[{key:"getTask",value:function(){var e,t,a=function(){var e=new Date("2001-01-01T00:00:00Z").getTime(),t=new Date("2001-12-31T23:59:59Z").getTime();return new Date(e+Math.random()*(t-e))}(),n=function(e){var t=e.getUTCFullYear(),a=e.getUTCMonth()+1;return new Date(t,a,0).getUTCDate()}(a)-a.getUTCDate(),r=n+Math.ceil(Math.random()*(50-n)),i=new Date(a);switch(i.setUTCDate(a.getUTCDate()+r),p.arr(Q)){case"r":e="Calculate number of days from ".concat(G(a)," to ").concat(G(i),"?"),t=r;break;case"ri":e="Calculate number of days between ".concat(G(a)," and ").concat(G(i)," inclusive?"),t=r+1;break;case"w":e="If ".concat(G(a)," was ").concat(z[a.getUTCDay()]," what day would be ").concat(G(i),"?"),t=z[i.getUTCDay()]}return{question:e,answer:t}}}]),a}(w);var $=function(){function e(t,a){Object(o.a)(this,e),this.positive=t>0,this.value=(1===Math.abs(t)&&a?"":Math.abs(t))+(a||"")}return Object(u.a)(e,[{key:"reverse",value:function(){this.positive=!this.positive}},{key:"print",value:function(e){var t="";return e?this.positive||(t+="\u2013 "):t+=" "+(this.positive?"+":"\u2013")+" ",t+this.value}}]),e}(),_=function(){function e(){Object(o.a)(this,e),this.left=[],this.right=[]}return Object(u.a)(e,[{key:"addLeft",value:function(e,t){e&&this.left.push(new $(e,t))}},{key:"addRight",value:function(e,t){e&&this.right.push(new $(e,t))}},{key:"beautify",value:function(){if(e.isAllNegatives(this.left)||e.isAllNegatives(this.right)){var t,a=Object(s.a)(this.left);try{for(a.s();!(t=a.n()).done;){t.value.reverse()}}catch(i){a.e(i)}finally{a.f()}var n,r=Object(s.a)(this.right);try{for(r.s();!(n=r.n()).done;){n.value.reverse()}}catch(i){r.e(i)}finally{r.f()}}e.shuffle(this.left),e.shuffle(this.right)}},{key:"print",value:function(){this.beautify();var e="",t="";return this.left.forEach((function(t){return e+=t.print(!e)})),this.right.forEach((function(e){return t+=e.print(!t)})),e+" = "+t}}],[{key:"isAllNegatives",value:function(e){var t,a=Object(s.a)(e);try{for(a.s();!(t=a.n()).done;){if(t.value.positive)return!1}}catch(n){a.e(n)}finally{a.f()}return!0}},{key:"shuffle",value:function(e){var t=0;do{p.shuffle(e),t++}while(!e[0].positive&&t<10)}}]),e}(),H={RemoveBrackets:j,AddBrackets:y,Percentages:C,Multiplication:A,Division:D,AddSub:B,AddSubFractions:x,MulDivFractions:J,Dates:Y,LinearEquations:function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(e,n){return Object(o.a)(this,a),t.call(this,{start:e,count:n,questionTag:T,questionsPerRow:1,title:"Linear Equations",description:"Find the value of the variable"})}return Object(u.a)(a,[{key:"getTask",value:function(){var e=p.arr(p.vars()),t=p.natural(12),a=p.natural(12),n=t*a,r=p.natural(12)*(p.dice()?1:-1),i=r-a,c=p.natural(144)*(p.dice()?1:-1),s=c-n,o=0,u=0,l=0,h=0;p.dice(.2)&&(r-=o=p.natural(12)*(p.dice()?1:-1)),p.dice(.2)&&(s-=u=p.natural(144)*(p.dice()?1:-1)),p.dice(.2)&&(i-=l=p.natural(12)*(p.dice()?1:-1)),p.dice(.2)&&(c-=h=p.natural(144)*(p.dice()?1:-1));var m=new _;return m.addLeft(r,e),m.addLeft(o,e),m.addLeft(s),m.addLeft(u),m.addRight(i,e),m.addRight(l,e),m.addRight(c),m.addRight(h),{question:m.print(),answer:t}}}]),a}(w)},K=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(e){var n;for(var r in Object(o.a)(this,a),(n=t.call(this,e)).state={taskTypes:{},title:""},H)n.state.taskTypes[r]=new H[r];return n.handleTitleChange=n.handleTitleChange.bind(Object(v.a)(n)),n.openWorksheet=n.openWorksheet.bind(Object(v.a)(n)),n}return Object(u.a)(a,[{key:"handleTitleChange",value:function(e){this.setState({title:e.target.value})}},{key:"openWorksheet",value:function(){var e={title:this.state.title};for(var t in this.state.taskTypes){var a=this.state.taskTypes[t].getCount();a&&(e[t]=a)}var n=new URLSearchParams(e);window.open("./?"+n.toString(),"_blank")}},{key:"render",value:function(){return r.a.createElement("div",{className:"editor"},r.a.createElement("div",{className:"editor-block"},r.a.createElement("div",{className:"title"},r.a.createElement("b",null,"Test Title")),r.a.createElement("div",{className:"input"},r.a.createElement("input",{type:"text",value:this.state.title,onChange:this.handleTitleChange}))),Object.entries(this.state.taskTypes).map((function(e){var t=Object(d.a)(e,2);t[0];return t[1].getEditorBlock()})),r.a.createElement("div",{className:"footer"},r.a.createElement("button",{onClick:this.openWorksheet},"Generate")))}}]),a}(r.a.Component),V=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(e){var n;Object(o.a)(this,a),n=t.call(this,e);var r=new URLSearchParams(window.location.search);n.state={title:r.get("title")||"Test",blocks:[]};var i,c=1,u=Object(s.a)(r.keys());try{for(u.s();!(i=u.n()).done;){var l=i.value;if(H[l]){var h=parseInt(r.get(l));h>=1&&(n.state.blocks.push(new H[l](c,h)),c+=h)}}}catch(m){u.e(m)}finally{u.f()}return n.state.mode=c>1?2:1,n}return Object(u.a)(a,[{key:"render",value:function(){return 2==this.state.mode?r.a.createElement(m,{title:this.state.title,blocks:this.state.blocks}):r.a.createElement(K,null)}}]),a}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(V,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[11,1,2]]]);
//# sourceMappingURL=main.3a2cd30e.chunk.js.map