(function(e){function t(t){for(var r,s,o=t[0],c=t[1],l=t[2],u=0,d=[];u<o.length;u++)s=o[u],i[s]&&d.push(i[s][0]),i[s]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);h&&h(t);while(d.length)d.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,o=1;o<n.length;o++){var c=n[o];0!==i[c]&&(r=!1)}r&&(a.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},i={app:0},a=[];function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=t,o=o.slice();for(var l=0;l<o.length;l++)t(o[l]);var h=c;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("64a9"),i=n.n(r);i.a},"0e1c":function(e,t,n){"use strict";var r=n("f04f"),i=n.n(r);i.a},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),i=n("5c96"),a=n.n(i),s=(n("0fae"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("Main")],1)}),o=[],c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"homePage"},[n("el-card",{staticClass:"card"},[n("div",{attrs:{slot:"header"},slot:"header"},[n("div",{staticClass:"card-title"},[n("span",[e._v("简易版全景图")]),n("div",{staticClass:"card-property"},[n("span",{ref:"property"})])])]),n("div",{staticClass:"card-content"},[n("div",{ref:"threeDom",staticClass:"model"}),n("div",{staticClass:"control"},[n("span",{staticClass:"control-title"},[e._v("控制台")]),n("div",{staticClass:"control-block"},[n("span",{staticClass:"control-block-title"},[e._v("是否自动旋转")]),n("el-radio-group",{on:{change:e.isSpin},model:{value:e.isRotate,callback:function(t){e.isRotate=t},expression:"isRotate"}},[n("el-radio",{attrs:{label:1}},[e._v("开启")]),n("el-radio",{attrs:{label:0}},[e._v("关闭")])],1)],1)])])])],1)},l=[],h=(n("7f7f"),n("ac4d"),n("8a81"),n("ac6a"),n("bc3a"),n("5a89")),u=(n("a5d4"),n("61d9")),d=(n("53f9"),n("ae37")(h)),f={props:{msg:String},data:function(){return{renderer:"",scene:"",light:"",camera:"",controls:"",stats:"",mygroup:"",action:"",clock:"",mixer:"",rotateAnimate:"",isRotate:1}},mounted:function(){this.init()},methods:{init:function(){this.$refs.threeDom.addEventListener("dblclick",this.onMouseDblclick),this.rendererInit(),this.sceneInit(),this.cameraInit(),this.controlInit(),this.propertyInit(),this.modelling()},modelling:function(){this.mygroup=new h["Group"];var e=new h["TextureLoader"],t=e.load(n("ab0c")),r=new h["SphereGeometry"](130,256,256),i=new h["MeshLambertMaterial"]({map:t,side:h["DoubleSide"]}),a=new h["Mesh"](r,i);a.name="球体容器",this.mygroup.add(a);var s=this.getcanvers("进门"),o=new h["CanvasTexture"](s),c=new h["PlaneGeometry"](16,10,60,60),l=new h["MeshPhongMaterial"]({map:o,side:h["DoubleSide"]}),u=new h["Mesh"](c,l);u.name="进门",u.position.set(40,20,-90),this.mygroup.add(u),this.scene.add(this.mygroup),this.addAnimation(),this.refresh()},isSpin:function(e){this.action.paused=0==e},addAnimation:function(){this.clock=new h["Clock"];var e=[0,3600],t=[0,360],n=new h["KeyframeTrack"]("meshSphere.rotation[y]",e,t),r=100,i=new h["AnimationClip"]("sphereRotate",r,[n]);this.mixer=new h["AnimationMixer"](this.mygroup),this.action=this.mixer.clipAction(i),this.action.timeScale=1,this.action.setLoop(h["LoopPingPong"]).play(),this.animate()},animate:function(){this.rotateAnimate=requestAnimationFrame(this.animate),this.renderer.render(this.scene,this.camera),this.update()},update:function(){this.stats.update(),this.mixer.update(this.clock.getDelta())},rendererInit:function(){var e=1e3,t=800;this.renderer=new h["WebGLRenderer"],this.renderer.setClearColor(16777215),this.renderer.setSize(e,t),this.$refs.threeDom.appendChild(this.renderer.domElement)},sceneInit:function(){this.scene=new h["Scene"];var e=new h["AmbientLight"](4473924,3),t=new h["AxesHelper"](600);this.scene.add(e,t)},cameraInit:function(){var e=800,t=800;this.camera=new h["PerspectiveCamera"](90,e/t,1,1e3),this.camera.position.set(0,0,10),this.camera.lookAt(new h["Vector3"](0,0,0))},controlInit:function(){this.controls=new d(this.camera,this.$refs.threeDom),this.controls.target.set(0,0,0),this.controls.minDistance=10,this.controls.maxPolarAngle=Math.PI,this.controls.maxDistance=30,this.controls.enablePan=!1,this.controls.addEventListener("change",this.refresh)},propertyInit:function(){this.stats=new u["Stats"],this.stats.dom.style.position="absolute",this.stats.dom.style.top="-4px",this.$refs.property.appendChild(this.stats.dom),this.stats.update()},getcanvers:function(e){var t=document.createElement("canvas"),n=t.getContext("2d");n.fillStyle="#FFFFFF",n.fillRect(0,0,300,200),n.translate(160,80),n.fillStyle="#000000",n.font="bold 100px 宋体",n.textBaseline="middle",n.textAlign="center",n.fillText(e,0,0);var r=new h["CanvasTexture"](t),i=new h["PlaneGeometry"](16,10,60,60),a=new h["MeshPhongMaterial"]({map:r,side:h["DoubleSide"]}),s=new h["Mesh"](i,a);return s.name=e,s.position.set(40,20,-90),t},refresh:function(){this.renderer.render(this.scene,this.camera),this.stats.update()},onMouseDblclick:function(e){var t=this,n=this.getIntersects(e);if(0!=n.length){var r=!0,i=!1,a=void 0;try{for(var s,o=n[Symbol.iterator]();!(r=(s=o.next()).done);r=!0){var c=s.value;if(""!=c.object.name){this.action.paused=!0,this.$confirm("是否切换场景?","提示",{confirmButtonText:"切换",cancelButtonText:"取消",type:"warning"}).then(function(){t.action.paused=!1,"进门"==c.object.name?t.changeScene("enter"):"返回"==c.object.name&&t.changeScene("backtrack")}).catch(function(){t.action.paused=!1});break}}}catch(l){i=!0,a=l}finally{try{r||null==o.return||o.return()}finally{if(i)throw a}}}},changeScene:function(e){var t=this,r="",i="",a="",s=new h["TextureLoader"];"enter"==e?(r=s.load(n("bac6")),a=this.getcanvers("返回"),i="返回"):"backtrack"==e&&(r=s.load(n("ab0c")),a=this.getcanvers("进门"),i="进门");var o=!0,c=!1,l=void 0;try{for(var u,d=this.scene.children[2].children[Symbol.iterator]();!(o=(u=d.next()).done);o=!0){var f=u.value;if("球体容器"==f.name){var p=new h["MeshLambertMaterial"]({map:r,side:h["DoubleSide"]});f.material=p}else if("进门"==f.name||"返回"==f.name){var m=new h["CanvasTexture"](a),v=new h["MeshPhongMaterial"]({map:m,side:h["DoubleSide"]});f.name=i,f.material=v}}}catch(b){c=!0,l=b}finally{try{o||null==d.return||d.return()}finally{if(c)throw l}}setTimeout(function(){t.refresh()},100)},getIntersects:function(e){e.preventDefault();var t=new h["Raycaster"],n=new h["Vector2"],r=this.$refs.threeDom,i=r.getBoundingClientRect();n.x=(e.clientX-i.left)/r.offsetWidth*2-1,n.y=-(e.clientY-i.top)/r.offsetHeight*2+1,t.setFromCamera(n,this.camera);var a=t.intersectObjects(this.scene.children[2].children);return a}}},p=f,m=(n("0e1c"),n("2877")),v=Object(m["a"])(p,c,l,!1,null,null,null),b=v.exports,g={name:"app",components:{Main:b}},y=g,w=(n("034f"),Object(m["a"])(y,s,o,!1,null,null,null)),x=w.exports;r["default"].use(a.a),r["default"].config.productionTip=!1,new r["default"]({render:function(e){return e(x)}}).$mount("#app")},"64a9":function(e,t,n){},ab0c:function(e,t,n){e.exports=n.p+"img/home3.9a0725fd.jpeg"},bac6:function(e,t,n){e.exports=n.p+"img/home1.68c9b8a2.jpg"},f04f:function(e,t,n){}});