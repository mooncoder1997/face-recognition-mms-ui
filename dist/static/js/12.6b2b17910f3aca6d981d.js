webpackJsonp([12],{KeXV:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("//Fk"),s=n.n(a),o=n("D/cR");var r={name:"RoleManage",data:function(){return{loading:!0,columns:[{title:"角色名称",key:"roleName",align:"center"}],data:[]}},methods:{queryAllRole:function(){var e=this;return new s.a(function(t,n){Object(o.a)({url:"/mms-provider-user/api/v1/roles",method:"get"}).then(function(t){200===t.status?(e.$Message.success("获取所有角色成功!"),console.log(t.data),t.data.forEach(function(t){console.log(t);var n={roleName:t};e.data.push(n),e.loading=!1})):e.$Message.success(t.message)})}).catch(function(e){reject(e)})}},mounted:function(){this.queryAllRole()}},c={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("Table",{attrs:{border:"",stripe:"",columns:this.columns,data:this.data,loading:this.loading}})],1)},staticRenderFns:[]};var l=n("VU/8")(r,c,!1,function(e){n("lCzd")},"data-v-77cbeff4",null);t.default=l.exports},lCzd:function(e,t){}});
//# sourceMappingURL=12.6b2b17910f3aca6d981d.js.map