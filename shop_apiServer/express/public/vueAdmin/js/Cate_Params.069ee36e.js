(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Cate_Params"],{"1cfd":function(t,e,a){},"5cf6":function(t,e,a){"use strict";var s=a("1cfd"),i=a.n(s);i.a},"5f94":function(t,e,a){"use strict";var s=a("82c9"),i=a.n(s);i.a},7139:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Crumbs"),a("el-card",[a("el-alert",{attrs:{title:"警告提示的文案",type:"warning",closable:!1,"show-icon":""}}),a("el-row",{staticClass:"cat_opt"},[a("el-col",[a("span",[t._v("选择商品分类：")]),a("el-cascader",{attrs:{options:t.catelist,props:t.cateProps},on:{change:t.handleChange},model:{value:t.selectCateKeys,callback:function(e){t.selectCateKeys=e},expression:"selectCateKeys"}})],1)],1),a("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"动态参数",name:"many"}},[a("el-button",{attrs:{type:"primary",disabled:t.isBtnDisabled},on:{click:function(e){t.addDialogVisible=!0}}},[t._v("添加参数")]),a("el-table",{attrs:{data:t.manyTableData,border:"",stripe:""}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._l(e.row.attr_vals,(function(s,i){return a("el-tag",{key:i,attrs:{closable:""},on:{close:function(a){return t.handleClose(i,e.row)}}},[t._v(" "+t._s(s)+" ")])})),e.row.inputVisible?a("el-input",{ref:"saveTagInput",staticClass:"input-new-tag",attrs:{size:"small"},on:{blur:function(a){return t.handleInputConfirm(e.row)}},nativeOn:{keyup:function(a){return!a.type.indexOf("key")&&t._k(a.keyCode,"enter",13,a.key,"Enter")?null:t.handleInputConfirm(e.row)}},model:{value:e.row.inputValue,callback:function(a){t.$set(e.row,"inputValue",a)},expression:"scope.row.inputValue"}}):a("el-button",{staticClass:"button-new-tag",attrs:{size:"small"},on:{click:function(a){return t.showInput(e.row)}}},[t._v("+ New Tag")])]}}])}),a("el-table-column",{attrs:{type:"index"}}),a("el-table-column",{attrs:{label:"参数名称",prop:"attr_name"}}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"mini"},on:{click:function(a){return t.showEaitDialog(e.row.attr_id,e.row)}}},[t._v("编辑")]),a("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"mini"},on:{click:function(a){return t.removeParams(e.row.attr_id)}}},[t._v("删除")])]}}])})],1)],1),a("el-tab-pane",{attrs:{label:"静态属性",name:"only"}},[a("el-button",{attrs:{type:"primary",disabled:t.isBtnDisabled},on:{click:function(e){t.addDialogVisible=!0}}},[t._v("添加属性")]),a("el-table",{attrs:{data:t.onTyTableData,border:"",stripe:""}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._l(e.row.attr_vals,(function(s,i){return a("el-tag",{key:i,attrs:{closable:""},on:{close:function(a){return t.handleClose(i,e.row)}}},[t._v(" "+t._s(s)+" ")])})),e.row.inputVisible?a("el-input",{ref:"saveTagInput",staticClass:"input-new-tag",attrs:{size:"small"},on:{blur:function(a){return t.handleInputConfirm(e.row)}},nativeOn:{keyup:function(a){return!a.type.indexOf("key")&&t._k(a.keyCode,"enter",13,a.key,"Enter")?null:t.handleInputConfirm(e.row)}},model:{value:e.row.inputValue,callback:function(a){t.$set(e.row,"inputValue",a)},expression:"scope.row.inputValue"}}):a("el-button",{staticClass:"button-new-tag",attrs:{size:"small"},on:{click:function(a){return t.showInput(e.row)}}},[t._v("+ New Tag")])]}}])}),a("el-table-column",{attrs:{type:"index"}}),a("el-table-column",{attrs:{label:"参数名称",prop:"attr_name"}}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"mini"},on:{click:function(a){return t.showEaitDialog(e.row.attr_id,e.row)}}},[t._v("编辑")]),a("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"mini"},on:{click:function(a){return t.removeParams(e.row.attr_id)}}},[t._v("删除")])]}}])})],1)],1)],1)],1),a("el-dialog",{attrs:{title:"添加"+t.titleText,visible:t.addDialogVisible,width:"50%"},on:{"update:visible":function(e){t.addDialogVisible=e},close:t.addDialogClosed}},[a("el-form",{ref:"addFromRef",attrs:{model:t.addFrom,rules:t.addFromRules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:t.titleText,prop:"attr_name"}},[a("el-input",{model:{value:t.addFrom.attr_name,callback:function(e){t.$set(t.addFrom,"attr_name",e)},expression:"addFrom.attr_name"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.addDialogVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.addParams}},[t._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"修改"+t.titleText,visible:t.editDialogVisible,width:"50%"},on:{"update:visible":function(e){t.editDialogVisible=e},close:t.editDialogClosed}},[a("el-form",{ref:"editFromRef",attrs:{model:t.editFrom,rules:t.editFromRules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:t.titleText,prop:"name"}},[a("el-input",{model:{value:t.editFrom.name,callback:function(e){t.$set(t.editFrom,"name",e)},expression:"editFrom.name"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.editDialogVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.editParams}},[t._v("确 定")])],1)],1)],1)},i=[],l=a("c780"),r={data(){return{catelist:[],cateProps:{expandTrigger:"hover",value:"cat_id",label:"cat_name",children:"children"},selectCateKeys:[],activeName:"many",manyTableData:[],onTyTableData:[],addDialogVisible:!1,addFrom:{},addFromRules:{attr_name:[{required:!0,message:"请输入参数的名称",trigger:"blur"}]},editDialogVisible:!1,editFrom:{name:""},editFromData:[],editFromRules:{name:[{required:!0,message:"请输入参数的名称",trigger:"blur"}]}}},created(){this.getCateList()},methods:{async getCateList(){const{data:t}=await this.$http.get("categories");if(200!==t.meta.status)return this.$message.error(t.meta.msg);this.catelist=t.data},handleChange(){this.getParamsData()},handleClick(){this.getParamsData()},async getParamsData(){if(3!==this.selectCateKeys.length)return this.selectCateKeys=[],this.manyTableData=[],this.onTyTableData=[],null;const{data:t}=await this.$http.get(`categories/${this.cateId}/attributes`,{params:{sel:this.activeName}});if(200!==t.meta.status)return this.$message.error(t.meta.msg);t.data.forEach(t=>{t.attr_vals=t.attr_vals?t.attr_vals.split(","):[],t.inputVisible=!1,t.inputValue=""}),"many"===this.activeName?this.manyTableData=t.data:this.onTyTableData=t.data},addDialogClosed(){this.$refs.addFromRef.resetFields()},addParams(){this.$refs.addFromRef.validate(async t=>{if(!t)return null;const{data:e}=await this.$http.post(`categories/${this.cateId}/attributes`,{attr_name:this.addFrom.attr_name,attr_sel:this.activeName});if(201!==e.meta.status)return this.$message.error(e.meta.msg);this.$message.success("添加成功"),this.getParamsData(),this.addDialogVisible=!1})},async showEaitDialog(t,e){const{data:a}=await this.$http.get(`categories/${this.cateId}/attributes/${t}`,{params:{attr_sel:this.activeName}});if(200!==a.meta.status)return this.$message.err(a.meta.msg);this.addFromData=a.data,this.editFrom.name=a.data.attr_name,this.editDialogVisible=!0},editDialogClosed(){this.$refs.editFromRef.resetFields()},editParams(){this.$refs.editFromRef.validate(async t=>{if(!t)return null;const{data:e}=await this.$http.put(`categories/${this.cateId}/attributes/${this.addFromData.attr_id}`,{attr_name:this.editFrom.name,attr_sel:this.activeName});if(200!==e.meta.status)return this.$message.error(e.meta.msg);this.$message.success("修改成功"),this.getParamsData(),this.editDialogVisible=!1})},async removeParams(t){const e=await this.$confirm("此操作将永久删除该参数, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).catch(t=>t);if("confirm"!==e)return this.$message.info("已取消删除");const{data:a}=await this.$http.delete(`categories/${this.cateId}/attributes/${t}`);if(200!==a.meta.status)return this.$message.error(a.meta.msg);this.$message.success(a.meta.msg),this.getParamsData()},handleInputConfirm(t){if(0===t.inputValue.trim().length)return t.inputValue="",t.inputVisible=!1,null;t.attr_vals.push(t.inputValue.trim()),t.inputValue="",t.inputVisible=!1,this.saveAttrVals(t)},async saveAttrVals(t){const{data:e}=await this.$http.put(`categories/${this.cateId}/attributes/${t.attr_id}`,{attr_name:t.attr_name,attr_sel:t.attr_sel,attr_vals:t.attr_vals.join(",")});if(200!==e.meta.status)return this.$message.error(e.meta.msg);this.$message.success("修改成功")},showInput(t){t.inputVisible=!0,this.$nextTick(t=>{this.$refs.saveTagInput.$refs.input.focus()})},handleClose(t,e){e.attr_vals.splice(t,1),this.saveAttrVals(e)}},computed:{isBtnDisabled(){return 3!==this.selectCateKeys.length},cateId(){return 3===this.selectCateKeys.length?this.selectCateKeys[2]:null},titleText(){return"many"===this.activeName?"动态参数":"静态属性"}},components:{Crumbs:l["a"]}},o=r,n=(a("5f94"),a("2877")),c=Object(n["a"])(o,s,i,!1,null,"04b5f026",null);e["default"]=c.exports},"82c9":function(t,e,a){},c780:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[t._v("首页")]),a("el-breadcrumb-item",[t._v(t._s(t.crumbsContent.content1))]),a("el-breadcrumb-item",[t._v(t._s(t.crumbsContent.content2))])],1)},i=[],l={data(){return{crumbsContent:{}}},created(){const t=window.sessionStorage.getItem("breadcrumb");t&&(this.crumbsContent=JSON.parse(t))}},r=l,o=a("2877"),n=Object(o["a"])(r,s,i,!1,null,null,null);e["a"]=n.exports},c8ca:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Crumbs"),a("el-card",[a("el-row",[a("el-col",[a("el-button",{attrs:{type:"primary"},on:{click:t.showAddCateDialog}},[t._v("添加分类")])],1)],1),a("tree-table",{staticClass:"treeTable",attrs:{data:t.cateList,columns:t.columns,"selection-type":!1,"expand-type":!1,"show-index":!0,"index-text":"#",border:"","show-row-hover":!1},scopedSlots:t._u([{key:"isok",fn:function(t){return[!1===t.row.cat_deleted?a("i",{staticClass:"el-icon-success",staticStyle:{color:"lightgreen"}}):a("i",{staticClass:"el-icon-error"})]}},{key:"order",fn:function(e){return[0===e.row.cat_level?a("el-tag",[t._v("一级")]):1===e.row.cat_level?a("el-tag",{attrs:{type:"success"}},[t._v("二级")]):2===e.row.cat_level?a("el-tag",{attrs:{type:"warning"}},[t._v("三级")]):t._e()]}},{key:"opt",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-edit"},on:{click:function(a){return t.showCompileDidlog(e.row)}}},[t._v("编辑")]),a("el-popconfirm",{attrs:{title:"这是一段内容确定删除吗？"},on:{onConfirm:function(a){return t.deleteCompileDidlog(e.row)}}},[a("el-button",{staticClass:"marginButton",attrs:{slot:"reference",type:"danger",size:"mini",icon:"el-icon-delete"},slot:"reference"},[t._v("删除")])],1)]}}])}),a("el-pagination",{attrs:{"current-page":t.querInfo.pagenum,"page-sizes":[3,5,10,15],"page-size":t.querInfo.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:t.tabal},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}}),a("el-dialog",{attrs:{title:"添加分类",visible:t.addCaleDidlogVisible,width:"50%"},on:{"update:visible":function(e){t.addCaleDidlogVisible=e},close:t.addCateDialoClose}},[a("el-form",{ref:"addCateFromRef",attrs:{model:t.addCateFrom,rules:t.addCateFromRules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"分类名称：",prop:"name"}},[a("el-input",{model:{value:t.addCateFrom.name,callback:function(e){t.$set(t.addCateFrom,"name",e)},expression:"addCateFrom.name"}})],1),a("el-form-item",{attrs:{label:"父级分类："}},[a("el-cascader",{attrs:{options:t.parentCateList,props:t.cascderProps,clearable:!0,"show-all-levels":""},on:{change:t.parentCateChanged},model:{value:t.selectedKeys,callback:function(e){t.selectedKeys=e},expression:"selectedKeys"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.addCaleDidlogVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.addCale}},[t._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"编辑分类",visible:t.compileDidlogVisible,width:"50%"},on:{"update:visible":function(e){t.compileDidlogVisible=e}}},[a("el-form",{ref:"compileDidlogRef",attrs:{model:t.compileDidlogForm,rules:t.compileDidlogRules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"编辑名称",prop:"name"}},[a("el-input",{model:{value:t.compileDidlogForm.name,callback:function(e){t.$set(t.compileDidlogForm,"name",e)},expression:"compileDidlogForm.name"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.compileDidlogVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.confirmCompileDidlog}},[t._v("确 定")])],1)],1)],1)],1)},i=[],l=a("c780"),r={data(){return{querInfo:{type:3,pagenum:1,pagesize:5},cateList:[],tabal:0,columns:[{label:"分类名称",prop:"cat_name"},{label:"是否有效",type:"template",template:"isok"},{label:"排序",type:"template",template:"order"},{label:"操作",type:"template",template:"opt"}],addCaleDidlogVisible:!1,addCateFrom:{name:"",cat_pid:0,cat_level:0},addCateFromRules:{name:[{required:!0,message:"请输入添加分类名",trigger:"blur"}]},parentCateList:[],cascderProps:{checkStrictly:!0,expandTrigger:"hover",value:"cat_id",label:"cat_name",children:"children"},selectedKeys:[],compileDidlogVisible:!1,compileDidlogForm:{name:""},compileDidlogFormData:{},compileDidlogRules:{name:[{required:!0,message:"请输入更改名",trigger:"blur"}]}}},created(){this.getCateList()},methods:{async getCateList(){const{data:t}=await this.$http.get("categories",{params:this.querInfo});if(200!==t.meta.status)return this.$message.error(t.meta.msg);this.cateList=t.data.result,this.tabal=t.data.total},handleSizeChange(t){this.querInfo.pagesize=t,this.getCateList()},handleCurrentChange(t){this.querInfo.pagenum=t,this.getCateList()},showAddCateDialog(){this.getParentCateList(),this.addCaleDidlogVisible=!0},async getParentCateList(){const{data:t}=await this.$http.get("categories",{params:{type:2}});if(200!==t.meta.status)return this.$message.error(t.meta.msg);this.parentCateList=t.data},parentCateChanged(){if(this.selectedKeys.length>0)return this.addCateFrom.cat_pid=this.selectedKeys[this.selectedKeys.length-1],this.addCateFrom.cat_level=this.selectedKeys.length,null;this.addCateFrom.cat_pid=0,this.addCateFrom.cat_level=0},addCale(){var t={cat_name:this.addCateFrom.name,cat_pid:this.addCateFrom.cat_pid,cat_level:this.addCateFrom.cat_level};this.$refs.addCateFromRef.validate(async e=>{if(!e)return null;const{data:a}=await this.$http.post("categories",t);if(201!==a.meta.status)return this.$message.error(a.meta.msg);this.$message.success(a.meta.msg),this.getCateList(),this.addCaleDidlogVisible=!1})},addCateDialoClose(){this.$refs.addCateFromRef.resetFields(),this.selectedKeys=[],this.addCateFrom.cat_level=0,this.addCateFrom.cat_pid=0},showCompileDidlog(t){this.compileDidlogForm.name=t.cat_name,this.compileDidlogFormData=t,this.compileDidlogVisible=!0},confirmCompileDidlog(){this.$refs.compileDidlogRef.validate(async t=>{if(!t)return null;this.compileDidlogForm.name===this.compileDidlogFormData.cat_name&&(this.compileDidlogVisible=!1);const{data:e}=await this.$http.put("categories/"+this.compileDidlogFormData.cat_id,{cat_name:this.compileDidlogForm.name});if(200!==e.meta.status)return this.$message.error(e.meta.msg);this.$message.success("更改成功"),this.getCateList(),this.compileDidlogVisible=!1})},async deleteCompileDidlog(t){const{data:e}=await this.$http.delete("categories/"+t.cat_id);if(200!==e.meta.status)return this.$message.error(e.meta.msg);this.$message.success("删除分类成功"),this.getCateList()}},components:{Crumbs:l["a"]}},o=r,n=(a("5cf6"),a("2877")),c=Object(n["a"])(o,s,i,!1,null,"30ef76a2",null);e["default"]=c.exports}}]);
//# sourceMappingURL=Cate_Params.069ee36e.js.map