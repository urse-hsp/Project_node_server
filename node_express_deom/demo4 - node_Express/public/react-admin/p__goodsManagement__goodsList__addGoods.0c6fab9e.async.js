(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[14],{AymL:function(e,t,a){e.exports={Steps:"Steps___2SAee",toolbar:"toolbar___3ANpq",text:"text___2xwW4"}},IHli:function(e,t,a){"use strict";a.r(t);a("IzEo");var r=a("bx4M"),n=a("0Owb"),s=(a("DZo9"),a("8z0m")),c=(a("/zsF"),a("PArb")),o=(a("+L6B"),a("2/Rp")),u=(a("6UJt"),a("DFOY")),i=(a("giR+"),a("fyUT")),l=(a("fOrg"),a("+KLJ")),m=(a("5NDa"),a("5rEg")),p=a("oBTY"),d=a("WmNS"),g=a.n(d),b=(a("miYZ"),a("tsqr")),f=a("9og8"),_=(a("y8nQ"),a("Vl3Y")),h=a("tJVT"),v=(a("sRBo"),a("kaz8")),w=(a("Znn+"),a("ZTPi")),E=(a("FJo9"),a("L41K")),j=a("q1tI"),O=a.n(j),y=a("z7Xi"),x=a("GguQ"),k=a.n(x),S=a("9kvl"),z=a("RKZ9"),I=a("io9h");function C(){return F.apply(this,arguments)}function F(){return F=Object(f["a"])(g.a.mark((function e(){return g.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",Object(I["a"])("".concat(z["a"],"categories"),{method:"get"}));case 1:case"end":return e.stop()}}),e)}))),F.apply(this,arguments)}function L(e){return q.apply(this,arguments)}function q(){return q=Object(f["a"])(g.a.mark((function e(t){return g.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",Object(I["a"])("".concat(z["a"],"categories/").concat(t.id,"/attributes"),{method:"get",params:{sel:t.sel}}));case 1:case"end":return e.stop()}}),e)}))),q.apply(this,arguments)}function D(e){return N.apply(this,arguments)}function N(){return N=Object(f["a"])(g.a.mark((function e(t){return g.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",Object(I["a"])("".concat(z["a"],"goods"),{method:"post",data:t}));case 1:case"end":return e.stop()}}),e)}))),N.apply(this,arguments)}function G(e){return T.apply(this,arguments)}function T(){return T=Object(f["a"])(g.a.mark((function e(t){return g.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",Object(I["a"])("".concat(z["a"],"goods/").concat(t.id),{method:"put",data:t.data}));case 1:case"end":return e.stop()}}),e)}))),T.apply(this,arguments)}var V=a("AymL"),J=a.n(V),A=E["a"].Step,P=w["a"].TabPane,Z=v["a"].Group,B={labelCol:{span:24},wrapperCol:{span:24}},K={goods_name:[{required:!0,message:"\u8bf7\u8f93\u5165\u540d\u79f0!"}],goods_price:[{required:!0,message:"\u8bf7\u8f93\u5165\u4ef7\u683c!"}],goods_weight:[{required:!0,message:"\u8bf7\u8f93\u5165\u91cd\u91cf"}],goods_number:[{required:!0,message:"\u8bf7\u8f93\u5165\u6570\u91cf"}],goods_cat:[{required:!0,message:"\u8bf7\u9009\u62e9\u5206\u7c7b"}]},R=function(e){var t=e.location.state,a=_["a"].useForm(),d=Object(h["a"])(a,1),v=d[0],x=Object(j["useState"])(0),I=Object(h["a"])(x,2),F=I[0],q=I[1],N=Object(j["useState"])([]),T=Object(h["a"])(N,2),V=T[0],R=T[1],Y=Object(j["useState"])([]),M=Object(h["a"])(Y,2),Q=M[0],U=M[1],W=Object(j["useState"])([]),H=Object(h["a"])(W,2),X=H[0],$=H[1],ee=Object(j["useState"])([]),te=Object(h["a"])(ee,2),ae=te[0],re=te[1],ne=Object(j["useState"])(!1),se=Object(h["a"])(ne,2),ce=se[0],oe=se[1],ue=Object(j["useState"])([]),ie=Object(h["a"])(ue,2),le=ie[0],me=ie[1],pe=Object(j["useState"])(""),de=Object(h["a"])(pe,2),ge=de[0],be=de[1],fe=Object(j["useState"])([]),_e=Object(h["a"])(fe,2),he=_e[0],ve=_e[1],we=function(){var e=new k.a("#div1","#div2");e.customConfig.onchange=function(e){be(e)},e.customConfig.uploadImgShowBase64=!0,e.create(),e.txt.html(ge)},Ee=function(){var e=Object(f["a"])(g.a.mark((function e(t){var a,r,n;return g.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,L({id:t.goods_cat[2],sel:"many"});case 2:if(a=e.sent,r=a.data,n=a.meta,200===n.status){e.next=7;break}return e.abrupt("return",b["a"].error(n.msg));case 7:return r.forEach((function(e){var t=e;t.attrs=t.attr_vals.split(","),t.attr_value=t.attr_vals})),$(r),ce||me(r),e.abrupt("return",!0);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),je=function(){var e=Object(f["a"])(g.a.mark((function e(t){var a,r,n;return g.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(0!==ae.length){e.next=11;break}return e.next=3,L({id:t.goods_cat[2],sel:"only"});case 3:if(a=e.sent,r=a.data,n=a.meta,200===n.status){e.next=8;break}return e.abrupt("return",b["a"].error(n.msg));case 8:r.map((function(e){var t=e;return t.attr_value=t.attr_vals,t})),re(r),ce||le.push.apply(le,Object(p["a"])(r));case 11:return e.abrupt("return",!0);case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();function Oe(e){v.validateFields().then(function(){var t=Object(f["a"])(g.a.mark((function t(a){return g.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return q(e),"1"===e?Ee(a):"2"===e?je(a):"4"===e?we():"5"===e&&(0!==X.length||ce?0!==ae.length||ce||(q(2),b["a"].warning("\u8bf7\u67e5\u770b\u914d\u7f6e\u5c5e\u6027!"),je(a)):(q(1),Ee(a),b["a"].warning("\u8bf7\u67e5\u770b\u914d\u7f6e\u53c2\u6570!"))),t.abrupt("return",!0);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(){b["a"].warning("\u8bf7\u8f93\u5165\u57fa\u672c\u4fe1\u606f!")}))}var ye=function(){var e=Object(f["a"])(g.a.mark((function e(){var t,a,r;return g.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,C();case 2:if(t=e.sent,a=t.data,r=t.meta,200===r.status){e.next=7;break}return e.abrupt("return",b["a"].error(r.msg));case 7:return R(a),e.abrupt("return",!0);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),xe=function(e){e.length<3&&v.setFieldsValue({goods_cat:""})};Object(j["useEffect"])((function(){if(t){oe(!0);var e=t.GoodsData;v.setFieldsValue({goods_name:e.goods_name,goods_price:e.goods_price,goods_weight:e.goods_weight,goods_number:e.goods_number,goods_cat:e.goods_cat}),e.pics.map((function(e){var t=e;return t.uid=e.pics_id,t.url=e.pics_big_url,t})),e.attrs.map((function(e){var t=e;return"many"===t.attr_sel&&(t.parameter=t.attr_value.split(",")),t})),me(e.attrs),ve(t.GoodsData.pics),U(t.GoodsData.goods_cat),be(t.GoodsData.goods_introduce)}ye()}),[]);var ke=function(e){var t=e.file.response;t&&200===t.meta.status&&he.push({pic:t.data.tmp_path})},Se={name:"file",listType:"picture",className:"upload-list-inline",defaultFileList:Object(p["a"])(he),action:"".concat(z["a"],"upload"),headers:{authorization:Object(z["b"])()},onChange:ke},ze=function(e,t,a){var r=le;r.map((function(t){var r=t;return r.attr_name===a&&(r.attrs=e,r.attr_vals=e.join(","),r.attr_value=e.join(",")),r}))},Ie=function(){return X&&X.map((function(e,t){var a=e.attrs;return O.a.createElement(_["a"].Item,{label:e.attr_name,key:e.attr_id},le&&le.forEach((function(t){t.attr_name===e.attr_name&&"many"===t.attr_sel&&(a=ce?t.parameter:t.attrs)})),O.a.createElement(Z,{options:e.attrs,onChange:function(a){return ze(a,t,e.attr_name)},defaultValue:a}))}))},Ce=function(e,t){le.map((function(a){var r=a;return r.attr_id===t&&"only"===r.attr_sel&&(r.attr_value=e.target.value),r}))},Fe=function(){return ae&&ae.map((function(e){var t=e.attr_vals;return O.a.createElement(_["a"].Item,{label:e.attr_name,key:e.attr_id},ce&&le.forEach((function(a){a.attr_name===e.attr_name&&"only"===a.attr_sel&&(t=a.attr_value)})),O.a.createElement(m["a"],{size:"large",defaultValue:t,onChange:function(t){return Ce(t,e.attr_id)}}))}))},Le=function(){v.validateFields().then(function(){var e=Object(f["a"])(g.a.mark((function e(a){var r,n,s;return g.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r={goods_name:a.goods_name,goods_cat:a.goods_cat.join(","),goods_price:a.goods_price,goods_number:a.goods_number,goods_weight:a.goods_weight,goods_introduce:ge,pics:he,attrs:le},ce){e.next=8;break}return e.next=4,D(r);case 4:n=e.sent,s=201,e.next=12;break;case 8:return e.next=10,G({id:t.GoodsData.goods_id,data:r});case 10:n=e.sent,s=200;case 12:if(n.meta.status===s){e.next=14;break}return e.abrupt("return",b["a"].error(n.meta.msg));case 14:return S["c"].replace("/goodsManagement/goodsList/List"),e.abrupt("return",b["a"].success(ce?"\u4fee\u6539\u5546\u54c1\u6210\u529f":"\u6dfb\u52a0\u5546\u54c1\u6210\u529f"));case 16:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())};return O.a.createElement(r["a"],null,O.a.createElement(l["a"],{message:ce?"\u4fee\u6539\u5546\u54c1\u4fe1\u606f":"\u6dfb\u52a0\u5546\u54c1\u4fe1\u606f",type:ce?"warning":"success",showIcon:!0}),O.a.createElement(E["a"],{current:F,size:"small",type:"default",className:J.a.Steps},O.a.createElement(A,{title:"\u57fa\u672c\u4fe1\u606f"}),O.a.createElement(A,{title:"\u5546\u54c1\u53c2\u6570"}),O.a.createElement(A,{title:"\u5546\u54c1\u5c5e\u6027"}),O.a.createElement(A,{title:"\u5546\u54c1\u56fe\u7247"}),O.a.createElement(A,{title:"\u5546\u54c1\u5185\u5bb9"}),O.a.createElement(A,{title:"\u5b8c\u6210"})),O.a.createElement(_["a"],Object(n["a"])({},B,{name:"basic",initialValues:{goods_cat:Q},form:v}),O.a.createElement(w["a"],{onChange:Oe,tabPosition:"left",activeKey:"".concat(F)},O.a.createElement(P,{tab:"\u57fa\u672c\u4fe1\u606f",key:"0"},O.a.createElement(_["a"].Item,{label:"\u5546\u54c1\u540d\u79f0",name:"goods_name",rules:K.goods_name},O.a.createElement(m["a"],{size:"large"})),O.a.createElement(_["a"].Item,{label:"\u5546\u54c1\u4ef7\u683c",name:"goods_price",rules:K.goods_price},O.a.createElement(i["a"],{min:0,max:1e5,size:"large"})),O.a.createElement(_["a"].Item,{label:"\u5546\u54c1\u91cd\u91cf",name:"goods_weight",rules:K.goods_weight},O.a.createElement(m["a"],{size:"large"})),O.a.createElement(_["a"].Item,{label:"\u5546\u54c1\u6570\u91cf",name:"goods_number",rules:K.goods_number},O.a.createElement(m["a"],{size:"large"})),O.a.createElement(_["a"].Item,{label:"\u5546\u54c1\u5206\u7c7b",name:"goods_cat",rules:K.goods_cat},O.a.createElement(u["a"],{options:V,onChange:xe,disabled:ce,size:"large",expandTrigger:"hover",style:{width:"220px"},fieldNames:{label:"cat_name",value:"cat_id",children:"children"},popupPlacement:"topLeft"}))),O.a.createElement(P,{tab:"\u5546\u54c1\u53c2\u6570",key:"1"},Ie()),O.a.createElement(P,{tab:"\u5546\u54c1\u5c5e\u6027",key:"2"},Fe()),O.a.createElement(P,{tab:"\u5546\u54c1\u56fe\u7247",key:"3"},O.a.createElement(s["a"],Se,O.a.createElement(o["a"],null,O.a.createElement(y["a"],null)," \u4e0a\u4f20\u56fe\u7247"),"\xa0\u53ea\u80fd\u4e0a\u4f20jpg/png\u6587\u4ef6\uff0c\u4e14\u4e0d\u8d85\u8fc7500kb",O.a.createElement(c["a"],null))),O.a.createElement(P,{tab:"\u5546\u54c1\u5185\u5bb9",key:"4"},O.a.createElement("div",{id:"div1",className:J.a.toolbar}),O.a.createElement("div",{id:"div2",className:J.a.text})),O.a.createElement(P,{tab:"\u5b8c\u6210",key:"5"},O.a.createElement(o["a"],{type:"primary",size:"large",onClick:Le},ce?"\u4fee\u6539\u5546\u54c1":"\u6dfb\u52a0\u5546\u54c1")))))};t["default"]=R}}]);