function Uploader(t){if(!(this instanceof Uploader))return new Uploader(t);isString(t)&&(t={trigger:t});var e={trigger:null,name:null,action:null,data:null,accept:null,change:null,error:null,multiple:!0,success:null};t&&$.extend(e,t);var s=$(e.trigger);e.action=e.action||s.data("action")||"/upload",e.name=e.name||s.attr("name")||s.data("name")||"file",e.data=e.data||parse(s.data("data")),e.accept=e.accept||s.data("accept"),e.success=e.success||s.data("success"),this.settings=e,this.setup(),this.bind()}function isString(t){return"[object String]"===Object.prototype.toString.call(t)}function createInputs(t){if(!t)return[];var e,s=[];for(var n in t)e=document.createElement("input"),e.type="hidden",e.name=n,e.value=t[n],s.push(e);return s}function parse(t){if(!t)return{};for(var e={},s=t.split("&"),n=function(t){return decodeURIComponent(t.replace(/\+/g," "))},i=0;i<s.length;i++){var o=s[i].split("="),a=n(o[0]),r=n(o[1]);e[a]=r}return e}function findzIndex(t){for(var e=t.parentsUntil("body"),s=0,n=0;n<e.length;n++){var i=e.eq(n);"static"!==i.css("position")&&(s=parseInt(i.css("zIndex"),10)||s)}return s}function newIframe(){var t="iframe-uploader-"+iframeCount,e=$('<iframe name="'+t+'" />').hide();return iframeCount+=1,e}function MultipleUploader(t){if(!(this instanceof MultipleUploader))return new MultipleUploader(t);isString(t)&&(t={trigger:t});var e=$(t.trigger),s=[];e.each(function(e,n){t.trigger=n,s.push(new Uploader(t))}),this._uploaders=s}!function(t){if(window.Piplin={},Piplin.project_id=Piplin.project_id||null,Piplin.statuses={FINISHED:0,PENDING:1,RUNNING:2,FAILED:3,INITIAL:4,TASK_DRAFT:-1,TASK_COMPLETED:0,TASK_PENDING:1,TASK_RUNNING:2,TASK_FAILED:3,TASK_ERRORS:4,TASK_CANCELLED:5,TASK_ABORTED:6,SVRLOG_COMPLETED:0,SVRLOG_PENDING:1,SVRLOG_RUNNING:2,SVRLOG_FAILED:3,SVRLOG_CANCELLED:4},Piplin.events={MODEL_CREATED:"Piplin\\Bus\\Events\\ModelCreatedEvent",MODEL_CHANGED:"Piplin\\Bus\\Events\\ModelChangedEvent",MODEL_TRASHED:"Piplin\\Bus\\Events\\ModelTrashedEvent",SVRLOG_CHANGED:"Piplin\\Bus\\Events\\ServerLogChangedEvent",OUTPUT_CHANGED:"Piplin\\Bus\\Events\\ServerOutputChangedEvent"},t.ajaxPrefilter(function(e,s,n){n.setRequestHeader("X-CSRF-Token",t('meta[name="token"]').attr("content"))}),t("form").submit(function(){t(this).find(":submit").prop("disabled",!0)}),null==window.location.href.match(/login|password/)){var e=t('meta[name="locale"]').attr("content");Lang.setLocale(e),moment.locale(e),t('[data-toggle="tooltip"]').tooltip(),Piplin.select2_options={width:"100%",minimumResultsForSearch:1/0},t(".select2").select2(Piplin.select2_options),new Clipboard(".clipboard").on("success",function(t){Piplin.toast(trans("app.copied"))}),Piplin.listener=io.connect(t('meta[name="socket_url"]').attr("content"),{query:"jwt="+t('meta[name="jwt"]').attr("content")}),Piplin.connection_error=!1,Piplin.listener.on("connect_error",function(e){Piplin.connection_error||t("#socket_offline").show(),Piplin.connection_error=!0}),Piplin.listener.on("connect",function(){t("#socket_offline").hide(),Piplin.connection_error=!1}),Piplin.listener.on("reconnect",function(){t("#socket_offline").hide(),Piplin.connection_error=!1}),Piplin.sidebarToggle=function(){var e=t(".wrapper");window.localStorage&&"true"==window.localStorage["piplin.stickySidebar"]?(e.removeClass("wrapper-collapsed"),e.find(".main-sidebar").show()):(e.addClass("wrapper-collapsed"),e.find(".main-sidebar").hide()),t(".sidebar-toggle").on("click",function(t){t.preventDefault(),e.hasClass("wrapper-collapsed")?(e.find(".main-sidebar").show("slow"),e.removeClass("wrapper-collapsed"),window.localStorage.setItem("piplin.stickySidebar",!0)):(e.find(".main-sidebar").hide("slow"),e.addClass("wrapper-collapsed"),window.localStorage.setItem("piplin.stickySidebar",!1))})},Piplin.loadLivestamp=function(){t("abbr.timeago").each(function(){var e=t(this);e.livestamp(e.data("timeago")).tooltip()})},Piplin.formatProjectStatus=function(t){var e={};return e.icon_class="help",e.label_class="default",e.label=trans("projects.initial"),t===Piplin.statuses.FINISHED?(e.icon_class="check",e.label_class="success",e.label=trans("projects.finished")):t===Piplin.statuses.RUNNING?(e.icon_class="load piplin-spin",e.label_class="warning",e.label=trans("projects.running")):t===Piplin.statuses.FAILED?(e.icon_class="close",e.label_class="danger",e.label=trans("projects.failed")):t===Piplin.statuses.PENDING&&(e.icon_class="clock",e.label_class="info",e.label=trans("projects.pending")),e},Piplin.formatTaskStatus=function(t){var e={};return e.icon_class="clock",e.label_class="info",e.label=trans("tasks.pending"),e.done=!1,e.success=!1,t===Piplin.statuses.TASK_COMPLETED?(e.icon_class="check",e.label_class="success",e.label=trans("tasks.completed"),e.done=!0,e.success=!0):t===Piplin.statuses.TASK_RUNNING?(e.icon_class="load piplin-spin",e.label_class="warning",e.label=trans("tasks.running")):t===Piplin.statuses.TASK_FAILED?(e.icon_class="close",e.label_class="danger",e.label=trans("tasks.failed"),e.done=!0):t===Piplin.statuses.TASK_ERRORS?(e.icon_class="close",e.label_class="success",e.label=trans("tasks.completed_with_errors"),e.done=!0,e.success=!0):t===Piplin.statuses.TASK_CANCELLED?(e.icon_class="warning",e.label_class="danger",e.label=trans("tasks.cancelled"),e.done=!0):t===Piplin.statuses.TASK_DRAFT&&(e.icon_class="edit",e.label_class="danger",e.label=trans("tasks.draft")),e},Piplin.toast=function(t,e,s){if(e=e||"",s=s||"not_in_progress",Config.get("piplin.toastr")||"not_in_progress"!=s)return"not_in_progress"==s?(toastr.options.positionClass="toast-top-center",toastr.options.progressBar=!1,toastr.options.preventDuplicates=!0,toastr.options.closeDuration=1e3,toastr.options.timeOut=3e3,toastr.options.extendedTimeOut=1e3):(toastr.options.closeButton=!0,toastr.options.progressBar=!0,toastr.options.preventDuplicates=!0,toastr.options.closeMethod="fadeOut",toastr.options.closeDuration=3e3,toastr.options.closeEasing="swing",toastr.options.positionClass="toast-bottom-right",toastr.options.timeOut=5e3,toastr.options.extendedTimeOut=7e3),"error"==s?toastr.error(t,e):"warning"==s?toastr.warning(t,e):"info"==s?(toastr.options.closeButton=!1,toastr.options.progressBar=!1,toastr.info(t,e)):toastr.success(t,e)}}}(jQuery),function(t){function e(){t.ajax({type:"GET",url:"/timeline"}).done(function(e){t("#timeline").html(e),Piplin.loadLivestamp()})}function s(e){e.model.time=moment(e.model.started_at).fromNow(),e.model.url="/task/"+e.model.id,t("#task_info_"+e.model.id).remove();var s=_.template(t("#task-list-template").html()),n=s(e.model);e.model.status===Piplin.statuses.TASK_RUNNING&&t(".running_menu").append(n);var i=t(".running_menu tr.item").length,o=i;o>0?(t(".todo_count").removeClass("hide").show(),t(".item_empty").hide()):(t(".todo_count").hide(),t(".item_empty").show()),t(".todo_count span").text(o)}Piplin.loadLivestamp(),Piplin.sidebarToggle(),Piplin.listener.on("task:"+Piplin.events.MODEL_CHANGED,function(n){s(n),t("#timeline").length>0&&e();var i=t("#task_"+n.model.id);if(i.length>0){t("td.committer",i).text(n.model.committer),n.model.commit_url&&t("td.commit",i).html('<a href="'+n.model.commit_url+'" target="_blank">'+n.model.short_commit+"</a>("+n.model.branch+")");var o=t("td.status span",i),a=Piplin.formatTaskStatus(parseInt(n.model.status));a.done&&(t("button#deploy_project:disabled").removeAttr("disabled"),t("td a.btn-cancel",i).remove(),a.success&&t("button.btn-rollback").removeClass("hide")),o.attr("class","text-"+a.label_class),t("i",o).attr("class","piplin piplin-"+a.icon_class),t("span",o).text(a.label)}else{var r="tasks.deploy_title";"Piplin\\Models\\BuildPlan"==n.model.targetable_type&&(r="tasks.build_title");var l=trans(r,{id:n.model.id});n.model.status===Piplin.statuses.TASK_COMPLETED?Piplin.toast(l+" - "+trans("tasks.completed"),n.model.project_name,"success"):n.model.status===Piplin.statuses.TASK_FAILED?Piplin.toast(l+" - "+trans("tasks.failed"),n.model.project_name,"error"):n.model.status===Piplin.statuses.TASK_ERRORS&&Piplin.toast(l+" - "+trans("tasks.completed_with_errors"),n.model.project_name,"warning")}}),Piplin.listener.on("project:"+Piplin.events.MODEL_CHANGED,function(e){var s=t("#project_"+e.model.id);if(s.length>0){var n=t("td.status span",s),i=Piplin.formatProjectStatus(parseInt(e.model.status));t("td.name",s).text(e.model.name),t("td.time",s).text(moment(e.model.last_run).fromNow()),n.attr("class","text-"+i.label_class),t("i",n).attr("class","piplin piplin-"+i.icon_class),t("span",n).text(i.label)}}),Piplin.listener.on("project:"+Piplin.events.MODEL_TRASHED,function(t){parseInt(t.model.id)===parseInt(Piplin.project_id)&&(window.location.href="/")}),Piplin.listener.on("task:"+Piplin.events.MODEL_CREATED,function(e){var s=parseInt(t('meta[name="user_id"]').attr("content"));e.model.user_id==s&&Piplin.toast(trans("tasks.create_success"),"","info").on("click",function(){window.location.href="/task/"+e.model.id})})}(jQuery);var iframeCount=0;Uploader.prototype.setup=function(){this.form=$('<form method="post" enctype="multipart/form-data"target="" action="'+this.settings.action+'" />'),this.iframe=newIframe(),this.form.attr("target",this.iframe.attr("name"));var t=this.settings.data;this.form.append(createInputs(t)),window.FormData?this.form.append(createInputs({_uploader_:"formdata"})):this.form.append(createInputs({_uploader_:"iframe"}));var e=document.createElement("input");e.type="file",e.name=this.settings.name,this.settings.accept&&(e.accept=this.settings.accept),this.settings.multiple&&(e.multiple=!0,e.setAttribute("multiple","multiple")),this.input=$(e);var s=$(this.settings.trigger);return this.input.attr("hidefocus",!0).css({position:"absolute",top:0,right:0,opacity:0,outline:0,cursor:"pointer",height:s.outerHeight(),fontSize:Math.max(64,5*s.outerHeight())}),this.form.append(this.input),this.form.css({position:"absolute",top:s.offset().top,left:s.offset().left,overflow:"hidden",width:s.outerWidth(),height:s.outerHeight(),zIndex:findzIndex(s)+10}).appendTo("body"),this},Uploader.prototype.bind=function(){var t=this,e=$(t.settings.trigger);e.mouseenter(function(){t.form.css({top:e.offset().top,left:e.offset().left,width:e.outerWidth(),height:e.outerHeight()})}),t.bindInput()},Uploader.prototype.bindInput=function(){var t=this;t.input.change(function(e){t._files=this.files||[{name:e.target.value}];var s=t.input.val();if(t.settings.change)t.settings.change.call(t,t._files);else if(s)return t.submit()})},Uploader.prototype.submit=function(){var t=this;if(window.FormData&&t._files){var e=new FormData(t.form.get(0));e.append(t.settings.name,t._files);var s;if(t.settings.progress){var n=t._files;s=function(){var e=$.ajaxSettings.xhr();return e.upload&&e.upload.addEventListener("progress",function(e){var s=0,i=e.loaded||e.position,o=e.total;e.lengthComputable&&(s=Math.ceil(i/o*100)),t.settings.progress(e,i,o,s,n)},!1),e}}return $.ajax({url:t.settings.action,type:"post",processData:!1,contentType:!1,data:e,xhr:s,context:this,success:t.settings.success,error:t.settings.error}),this}return t.iframe=newIframe(),t.form.attr("target",t.iframe.attr("name")),$("body").append(t.iframe),t.iframe.one("load",function(){$('<iframe src="javascript:false;"></iframe>').appendTo(t.form).remove();var e;try{e=$(this).contents().find("body").html()}catch(t){e="cross-domain"}$(this).remove(),e?t.settings.success&&t.settings.success(e):t.settings.error&&t.settings.error(t.input.val())}),t.form.submit(),this},Uploader.prototype.refreshInput=function(){var t=this.input.clone();this.input.before(t),this.input.off("change"),this.input.remove(),this.input=t,this.bindInput()},Uploader.prototype.change=function(t){return t?(this.settings.change=t,this):this},Uploader.prototype.success=function(t){var e=this;return this.settings.success=function(s){e.refreshInput(),t&&t(s)},this},Uploader.prototype.error=function(t){var e=this;return this.settings.error=function(s){t&&(e.refreshInput(),t(s))},this},Uploader.prototype.enable=function(){this.input.prop("disabled",!1),this.input.css("cursor","pointer")},Uploader.prototype.disable=function(){this.input.prop("disabled",!0),this.input.css("cursor","not-allowed")},MultipleUploader.prototype.submit=function(){return $.each(this._uploaders,function(t,e){e.submit()}),this},MultipleUploader.prototype.change=function(t){return $.each(this._uploaders,function(e,s){s.change(t)}),this},MultipleUploader.prototype.success=function(t){return $.each(this._uploaders,function(e,s){s.success(t)}),this},MultipleUploader.prototype.error=function(t){return $.each(this._uploaders,function(e,s){s.error(t)}),this},MultipleUploader.prototype.enable=function(){return $.each(this._uploaders,function(t,e){e.enable()}),this},MultipleUploader.prototype.disable=function(){return $.each(this._uploaders,function(t,e){e.disable()}),this},MultipleUploader.Uploader=Uploader;