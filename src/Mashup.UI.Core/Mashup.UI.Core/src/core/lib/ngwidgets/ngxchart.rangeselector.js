/*
ngWidgets v1.0.0 (2015-Jan)
Copyright (c) 2011-2015 jQWidgets.
License: http://ngwidgets.com/license/
*/

(function(a){a.extend(a.ngx._ngxChart.prototype,{_renderCategoryAxisRangeSelector:function(o,m){var q=this;q._isTouchDevice=a.ngx.mobile.isTouchDevice();var h=q.seriesGroups[o];var d=q._getCategoryAxis(o);var k=d?d.rangeSelector:undefined;if(!q._isSelectorRefresh){var p=(k&&k.renderTo)?k.renderTo:q.host;p.find(".rangeSelector").remove()}if(!d||d.visible==false||h.type=="spider"){return false}if(!q._isGroupVisible(o)){return false}if(!k){return false}var f=h.orientation=="horizontal";if(k.renderTo){f=false}if(q.rtl){d.flip=true}var c=f?this.host.height():this.host.width();c-=4;var n=this._getCategoryAxisStats(o,d,c);var j=d.position;if(k.renderTo&&k.position){j=k.position}if(!this._isSelectorRefresh){var l=k.renderTo;var b="<div class='rangeSelector ngx-disableselect' style='position: absolute; background-color: transparent;' onselectstart='return false;'></div>";var e=a(b).appendTo(l?l:this.host.find(".chartContainer"));if(!l){var i=this.host.coord();selectorSize=this._selectorGetSize(d);if(!f){e.css("left",i.left+1);e.css("top",i.top+m.y+(j!="top"?m.height:-selectorSize));e.css("height",selectorSize);e.css("width",c)}else{e.css("left",i.left+1+m.x+(j!="right"?-selectorSize:m.width));e.css("top",i.top);e.css("height",c);e.css("width",selectorSize);m.height=selectorSize}}else{e.css({width:l.width(),height:l.height()});m.width=l.width();m.height=l.height()}this._refreshSelector(o,d,n,e,m,f)}this._isSelectorRefresh=false;return true},_refreshSelector:function(f,e,d,z,c,b){var B={};var t=e.rangeSelector;var k=this.seriesGroups[f];for(var v in t){B[v]=t[v]}var q=B.minValue;var u=B.maxValue;if(undefined==q){q=Math.min(d.min.valueOf(),d.dsRange.min.valueOf())}if(undefined==u){u=Math.max(d.max.valueOf(),d.dsRange.max.valueOf())}if(this._isDate(d.min)){q=new Date(q)}if(this._isDate(d.max)){u=new Date(u)}var l=e.position;if(t.renderTo&&t.position){l=t.position}B.dataField=e.dataField;B.rangeSelector=undefined;B.type=e.type;B.baseUnit=t.baseUnit||e.baseUnit;B.minValue=q;B.maxValue=u;B.flip=e.flip;B.position=l;var h=5;var p=2,y=2,x=2,C=2;if(!t.renderTo){p=b?0:c.x;y=b?0:this._rect.width-c.x-c.width;x=b?c.y:h;C=b?this._paddedRect.height-this._plotRect.height:h}var n=t.padding;if(n==undefined&&!t.renderTo){n={left:p,top:x,right:y,bottom:C}}else{n={left:((n&&n.left)?n.left:p),top:((n&&n.top)?n.top:x),right:((n&&n.right)?n.right:y),bottom:((n&&n.bottom)?n.bottom:C)}}var s=e.rangeSelector.dataField;for(var v=0;undefined==s&&v<this.seriesGroups.length;v++){for(var r=0;undefined==s&&r<this.seriesGroups[v].series.length;r++){s=this.seriesGroups[v].series[r].dataField}}var m={padding:n,title:t.title||"",description:t.description||"",titlePadding:t.titlePadding,colorScheme:t.colorScheme||this.colorScheme,backgroundColor:t.backgroundColor||this.backgroundColor||"transparent",backgroundImage:t.backgroundImage||"",showBorderLine:t.showBorderLine||(t.renderTo?true:false),borderLineWidth:t.borderLineWidth||this.borderLineWidth,borderLineColor:t.borderLineColor||this.borderLineColor,rtl:t.rtl||this.rtl,greyScale:t.greyScale||this.greyScale,showLegend:false,enableAnimations:false,enableEvents:false,showToolTips:false,source:this.source,xAxis:B,seriesGroups:[{orientation:b?"horizontal":"vertical",valueAxis:{visible:false},type:e.rangeSelector.serieType||"area",series:[{dataField:s,opacity:0.8,lineWidth:1}]}]};z.empty();z.ngxChart(m);var o=this;z.on(o._getEvent("mousemove"),function(){o._unselect();o._hideToolTip()});var w=z.ngxChart("getInstance");if(!w._plotRect){return}var A=w._paddedRect;A.height=w._plotRect.height;if(!b&&l=="top"){A.y+=w._renderData[0].xAxis.rect.height}else{if(b){var g=w._renderData[0].xAxis.rect.width;A.width-=g;if(l!="right"){A.x+=g}}}o._createSliderElements(f,z,A,t);o.addHandler(a(document),o._getEvent("mousemove"),o._onSliderMouseMove,{self:this,groupIndex:f,renderTo:z,swapXY:b});o.addHandler(a(document),o._getEvent("mousedown"),o._onSliderMouseDown,{self:this,groupIndex:f,renderTo:z,swapXY:b});o.addHandler(a(document),o._getEvent("mouseup"),o._onSliderMouseUp,{self:this,groupIndex:f,renderTo:z,swapXY:b})},_createSliderElements:function(r,l,m,n){l.find(".slider").remove();var q=n.colorSelectedRange||"blue";var g=n.colorUnselectedRange||"white";var b=a("<div class='slider' style='position: absolute;'></div>");b.css({background:q,opacity:0.1,left:m.x,top:m.y,width:m.width,height:m.height});b.appendTo(l);if(!this._sliders){this._sliders=[]}while(this._sliders.length<r+1){this._sliders.push({})}var j="<div class='slider' style='position: absolute;  background: "+g+"; opacity: 0.5;'></div>";var c="<div class='slider' style='position: absolute; background: grey; opacity: 0.5;'></div>";var h="<div class='slider ngx-rc-all' style='position: absolute; background: white; border-style: solid; border-width: 1px; border-color: grey;'></div>";this._sliders[r]={element:b,host:l,fullRect:{x:b.coord().left,y:b.coord().top,width:m.width,height:m.height},rect:m,left:a(j),right:a(j),leftTop:a(c),rightTop:a(c),leftBorder:a(c),leftBar:a(h),rightBorder:a(c),rightBar:a(h)};this._sliders[r].left.appendTo(l);this._sliders[r].right.appendTo(l);this._sliders[r].leftTop.appendTo(l);this._sliders[r].rightTop.appendTo(l);this._sliders[r].leftBorder.appendTo(l);this._sliders[r].rightBorder.appendTo(l);this._sliders[r].leftBar.appendTo(l);this._sliders[r].rightBar.appendTo(l);var p=this._renderData[r].xAxis;var e=p.data.axisStats;var o=e.min.valueOf();var f=e.max.valueOf();var i=this._valueToOffset(r,o);var k=this._valueToOffset(r,f);if(i>k){var d=k;k=i;i=d}if(this.seriesGroups[r].orientation!="horizontal"){b.css({left:Math.round(m.x+i),top:m.y,width:Math.round(k-i),height:m.height})}else{b.css({top:Math.round(m.y+i),left:m.x,height:Math.round(k-i),width:m.width})}this._setSliderPositions(r,i,k)},_setSliderPositions:function(e,r,h){var t=this.seriesGroups[e];var d=this._getCategoryAxis(e);var o=d.rangeSelector;var b=t.orientation=="horizontal";if(d.rangeSelector.renderTo){b=false}var j=d.position;if(o.renderTo&&o.position){j=o.position}var l=(b&&j=="right")||(!b&&j=="top");var n=this._sliders[e];var q=b?"top":"left";var f=b?"left":"top";var i=b?"height":"width";var p=b?"width":"height";var k=b?"y":"x";var m=b?"x":"y";var c=n.rect;n.left.css(q,c[k]);n.left.css(f,c[m]);n.left.css(i,r);n.left.css(p,c[p]);n.right.css(q,c[k]+h);n.right.css(f,c[m]);n.right.css(i,c[i]-h+1);n.right.css(p,c[p]);n.leftTop.css(q,c[k]);n.leftTop.css(f,c[m]+(((b&&j=="right")||(!b&&j!="top"))?0:c[p]));n.leftTop.css(i,r);n.leftTop.css(p,1);n.rightTop.css(q,c[k]+h);n.rightTop.css(f,c[m]+(((b&&j=="right")||(!b&&j!="top"))?0:c[p]));n.rightTop.css(i,c[i]-h+1);n.rightTop.css(p,1);n.leftBorder.css(q,c[k]+r);n.leftBorder.css(f,c[m]);n.leftBorder.css(i,1);n.leftBorder.css(p,c[p]);var s=c[p]/4;if(s>20){s=20}if(s<3){s=3}n.leftBar.css(q,c[k]+r-3);n.leftBar.css(f,c[m]+c[p]/2-s/2);n.leftBar.css(i,5);n.leftBar.css(p,s);n.rightBorder.css(q,c[k]+h);n.rightBorder.css(f,c[m]);n.rightBorder.css(i,1);n.rightBorder.css(p,c[p]);n.rightBar.css(q,c[k]+h-3);n.rightBar.css(f,c[m]+c[p]/2-s/2);n.rightBar.css(i,5);n.rightBar.css(p,s)},_resizeState:{},_onSliderMouseDown:function(d){var b=d.data.self;var c=b._sliders[d.data.groupIndex];if(!c){return}if(b._resizeState.state==undefined){b._testAndSetReadyResize(d)}if(b._resizeState.state!="ready"){return}b._resizeState.state="resizing"},_valueToOffset:function(m,k){var l=this.seriesGroups[m];var d=this._sliders[m];var c=d.host.ngxChart("getInstance");var n=c._renderData[0].xAxis;var g=n.data.axisStats;var j=g.min.valueOf();var b=g.max.valueOf();var h=b-j;if(h==0){h=1}var e=this._getCategoryAxis(m);var f=l.orientation=="horizontal"?"height":"width";var i=(k.valueOf()-j)/h;return d.fullRect[f]*(e.flip?(1-i):i)},_offsetToValue:function(o,f){var d=this._sliders[o];var n=this.seriesGroups[o];var e=this._getCategoryAxis(o);var g=n.orientation=="horizontal"?"height":"width";var i=d.fullRect[g];if(i==0){i=1}var j=f/i;var c=d.host.ngxChart("getInstance");var m=c._renderData[0].xAxis;var h=m.data.axisStats;var k=h.min.valueOf();var b=h.max.valueOf();var l=f/i*(b-k)+k;if(e.flip==true){l=b-f/i*(b-k)}if(this._isDate(h.min)||this._isDate(h.max)){l=new Date(l)}else{if(e.dataField==undefined){l=Math.round(l)}if(l<h.min){l=h.min}if(l>h.max){l=h.max}}return l},_onSliderMouseUp:function(o){var j=o.data.self;var f=o.data.groupIndex;var b=o.data.swapXY;var l=j._sliders[f];if(!l){return}if(j._resizeState.state!="resizing"){return}j._resizeState={};j.host.css("cursor","default");var g=!b?"left":"top";var c=!b?"width":"height";var n=!b?"x":"y";var m=l.element.coord()[g];var d=m+(!b?l.element.width():l.element.height());var h=j._offsetToValue(f,m-l.fullRect[n]);var p=j._offsetToValue(f,d-l.fullRect[n]);var i=l.host.ngxChart("getInstance");var k=i._renderData[0].xAxis;var r=k.data.axisStats;if(!r.isTimeUnit&&(p.valueOf()-h.valueOf())>86400000){h.setHours(0,0,0,0);p.setDate(p.getDate()+1);p.setHours(0,0,0,0)}var e=j._getCategoryAxis(f);if(e.flip){var q=h;h=p;p=q}e.minValue=h;e.maxValue=p;j._isSelectorRefresh=true;var s=j.enableAnimations;j.enableAnimations=false;j.update();j.enableAnimations=s},_onSliderMouseMove:function(t){var o=t.data.self;var v=t.data.renderTo;var i=t.data.groupIndex;var q=o._sliders[i];var d=t.data.swapXY;if(!q){return}var f=q.fullRect;var h=q.element;var w=a.ngx.position(t);var r=h.coord();var p=d?"left":"top";var m=!d?"left":"top";var g=d?"width":"height";var e=!d?"width":"height";var s=!d?"x":"y";if(o._resizeState.state=="resizing"){if(o._resizeState.side=="left"){var n=Math.round(w[m]-r[m]);var l=f[s];if(r[m]+n>=l&&r[m]+n<=l+f[e]){var j=parseInt(h.css(m));var c=Math.max(2,(d?h.height():h.width())-n);h.css(e,c);h.css(m,j+n)}}else{if(o._resizeState.side=="right"){var b=d?h.height():h.width();var n=Math.round(w[m]-r[m]-b);var l=f[s];if(r[m]+b+n>=l&&r[m]+n+b<=l+f[e]){var c=Math.max(2,b+n);h.css(e,c)}}else{if(o._resizeState.side=="move"){var b=d?h.height():h.width();var j=parseInt(h.css(m));var n=Math.round(w[m]-o._resizeState.startPos);if(r[m]+n>=f[s]&&r[m]+n+b<=f[s]+f[e]){o._resizeState.startPos=w[m];h.css(m,j+n)}}}}var u=parseInt(h.css(m))-q.rect[s];var k=u+(d?h.height():h.width());o._setSliderPositions(i,u,k)}else{o._testAndSetReadyResize(t)}},_testAndSetReadyResize:function(b){var q=b.data.self;var k=b.data.renderTo;var o=b.data.groupIndex;var c=q._sliders[o];var g=b.data.swapXY;var m=c.fullRect;var e=c.element;var f=a.ngx.position(b);var h=e.coord();var j=g?"left":"top";var p=!g?"left":"top";var i=g?"width":"height";var l=!g?"width":"height";var d=!g?"x":"y";var n=q._isTouchDevice?30:5;if(f[j]>=h[j]&&f[j]<=h[j]+m[i]){if(Math.abs(f[p]-h[p])<=n){k.css("cursor",g?"row-resize":"col-resize");q._resizeState={state:"ready",side:"left"}}else{if(Math.abs(f[p]-h[p]-(!g?e.width():e.height()))<=n){k.css("cursor",g?"row-resize":"col-resize");q._resizeState={state:"ready",side:"right"}}else{if(f[p]+n>h[p]&&f[p]-n<h[p]+(!g?e.width():e.height())){k.css("cursor","hand");q._resizeState={state:"ready",side:"move",startPos:f[p]}}else{k.css("cursor","default");q._resizeState={}}}}}else{k.css("cursor","default");q._resizeState={}}},_selectorGetSize:function(b){if(b.rangeSelector.renderTo){return 0}return b.rangeSelector.size||this._paddedRect.height/3}})})(ngxBaseFramework);