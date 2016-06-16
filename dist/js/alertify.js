!function(){"use strict";function t(){var t={parent:document.body,version:"1.0.11",defaultOkLabel:"Ok",okLabel:"Ok",defaultCancelLabel:"Cancel",cancelLabel:"Cancel",defaultMaxToastItems:2,maxToastItems:2,title:"",promptValue:"",promptPlaceholder:"",closeToastOnClick:!1,closeToastOnClickDefault:!1,delay:5e3,defaultDelay:5e3,toastContainerClass:"alertify-toast",toastContainerDefaultClass:"alertify-toast",dialogs:{buttons:{holder:"<div class='alertify-footer'>{{buttons}}</div>",ok:"<button class='btn btn-primary btn-ok' tabindex='1'>{{ok}}</button>",cancel:"<button class='btn btn-default btn-cancel' tabindex='2'>{{cancel}}</button>"},input:"<div class='form-group'><input type='text' class='form-control' /></div>",message:"<p>{{message}}</p>",toast:"<div class='{{class}}'>{{message}}</div>"},defaultDialogs:{buttons:{holder:"<div class='alertify-footer'>{{buttons}}</div>",ok:"<button class='btn btn-primary btn-ok' tabindex='1'>{{ok}}</button>",cancel:"<button class='btn btn-default btn-cancel' tabindex='2'>{{cancel}}</button>"},input:"<div class='form-group'><input type='text' class='form-control' /></div>",message:"<p>{{message}}</p>",toast:"<div class='{{class}}'>{{message}}</div>"},build:function(t){var e=this.dialogs.buttons.ok,n=""!=this.title?"<h3 class='alertify-title'>"+this.title+"</h3>":"",s="<div class='alertify-main'><div class='alertify-content'>"+n+this.dialogs.message.replace("{{message}}",t.message);return"confirm"!==t.type&&"prompt"!==t.type||(e=this.dialogs.buttons.cancel+this.dialogs.buttons.ok),"prompt"===t.type&&(s+=this.dialogs.input),s=(s+"</div>"+this.dialogs.buttons.holder+"</div>").replace("{{buttons}}",e).replace("{{ok}}",this.okLabel).replace("{{cancel}}",this.cancelLabel)},setCloseToastOnClick:function(t){this.closeToastOnClick=!!t},close:function(t,e){this.closeToastOnClick&&t.addEventListener("click",function(){n(t)}),e=e&&!isNaN(+e)?+e:this.delay,0>e?n(t):e>0&&setTimeout(function(){n(t)},e)},dialog:function(t,e,n,s){return this.setup({type:e,message:t,onOkay:n,onCancel:s})},toast:function(t,e,n){var s=document.querySelectorAll(".alertify-toast > div");if(s){var o=s.length-this.maxToastItems;if(o>=0)for(var a=0,i=o+1;i>a;a++)this.close(s[a],-1)}this.notify(t,e,n)},setToastPosition:function(t){this.toastContainerClass="alertify-toast "+t},setupToastContainer:function(){var t=document.querySelector(".alertify-toast"),e=this.toastContainerClass;return t||(t=document.createElement("div"),t.className=e,this.parent.appendChild(t)),t.className!==e&&(t.className=e),t},notify:function(e,n,s){var o=this.setupToastContainer(),a=document.createElement("div");a.className=n||"default",t.toastTemplateMethod?a.innerHTML=t.toastTemplateMethod(e):a.innerHTML=e,"function"==typeof s&&a.addEventListener("click",s),o.appendChild(a),setTimeout(function(){a.className+=" alertify-show"},10),this.close(a,this.delay)},setup:function(t){function e(e){"function"!=typeof e&&(e=function(){}),o&&o.addEventListener("click",function(o){t.onOkay&&"function"==typeof t.onOkay&&(i?t.onOkay(i.value,o):t.onOkay(o)),e(i?{buttonClicked:"ok",inputValue:i.value,event:o}:{buttonClicked:"ok",event:o}),n(s)}),a&&a.addEventListener("click",function(o){t.onCancel&&"function"==typeof t.onCancel&&t.onCancel(o),e({buttonClicked:"cancel",event:o}),n(s)}),i&&i.addEventListener("keyup",function(t){13===t.which&&o.click()})}var s=document.createElement("div");s.className="alertify alertify-hide",s.innerHTML=this.build(t);var o=s.querySelector(".btn-ok"),a=s.querySelector(".btn-cancel"),i=s.querySelector("input"),l=s.querySelector("label");i&&("string"==typeof this.promptPlaceholder&&(l?l.textContent=this.promptPlaceholder:i.placeholder=this.promptPlaceholder),"string"==typeof this.promptValue&&(i.value=this.promptValue));var r;return"function"==typeof Promise?r=new Promise(e):e(),this.parent.appendChild(s),setTimeout(function(){s.classList.remove("alertify-hide"),i&&t.type&&"prompt"===t.type?(i.select(),i.focus()):o&&o.focus()},100),r},okBtn:function(t){return this.okLabel=t,this},setDelay:function(t){return t=t||0,this.delay=isNaN(t)?this.defaultDelay:parseInt(t,10),this},cancelBtn:function(t){return this.cancelLabel=t,this},setMaxToastItems:function(t){this.maxToastItems=parseInt(t||this.defaultMaxToastItems)},reset:function(){this.parent=document.body,this.okBtn(this.defaultOkLabel),this.cancelBtn(this.defaultCancelLabel),this.title(""),this.setMaxToastItems(),this.promptValue="",this.promptPlaceholder="",this.delay=this.defaultDelay,this.setCloseToastOnClick(this.closeToastOnClickDefault),this.setToastPosition("bottom left"),this.toastTemplateMethod=null}};return{_$$alertify:t,parent:function(e){t.parent=e},reset:function(){return t.reset(),this},alert:function(e,n,s){return t.dialog(e,"alert",n,s)||this},confirm:function(e,n,s){return t.dialog(e,"confirm",n,s)||this},prompt:function(e,n,s){return t.dialog(e,"prompt",n,s)||this},toast:function(e,n){return t.toast(e,"default",n),this},success:function(e,n){return t.toast(e,"success",n),this},error:function(e,n){return t.toast(e,"error",n),this},cancelBtn:function(e){return t.cancelBtn(e),this},okBtn:function(e){return t.okBtn(e),this},title:function(e){return t.title=e,this},delay:function(e){return t.setDelay(e),this},placeholder:function(e){return t.promptPlaceholder=e,this},defaultValue:function(e){return t.promptValue=e,this},maxToastItems:function(e){return t.setMaxToastItems(e),this},closeToastOnClick:function(e){return t.setCloseToastOnClick(!!e),this},toastPosition:function(e){return t.setToastPosition(e||""),this},setToastTemplate:function(e){return t.toastTemplateMethod=e,this},clearToast:function(){return t.setupToastContainer().innerHTML="",this},version:t.version}}var e=1e3,n=function(t){if(t){var n=function(){t&&t.parentNode&&t.parentNode.removeChild(t)};t.classList.remove("alertify-show"),t.classList.add("alertify-hide"),t.addEventListener("transitionend",n),setTimeout(n,e)}};if("undefined"!=typeof module&&module&&module.exports){module.exports=function(){return new t};var s=new t;for(var o in s)module.exports[o]=s[o]}else"function"==typeof define&&define.amd?define(function(){return new t}):window.alertify=new t}();