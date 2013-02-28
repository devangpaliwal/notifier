var Notifier=Class.extend({
	parentSelector:"body",
	autoHideTimeInterval:5000,
	closeBtn:true,
	autoHide:true,
	template:"<div class='notifier' style='display:none;'><span class='message'></span></div",
	closeBtnTemplate:"<span class='closeBtn' style='cursor:pointer;'>X</span>",
	init:function(settings){
		if(settings) _.extend(this,settings);
		this._createNotifier();
		this._bindEvents();
	},
	_bindEvents:function(){
		this.$el.find(".closeBtn").bind("click",$.proxy(function(){this.close();},this))
	},
	_autoHideHandler:function(){
			clearTimeout(this.hideTimeout);
			this.hideTimeout=setTimeout(function(that){
				return function(){
					that.close();
				}
			}(this),this.autoHideTimeInterval);
			return this;
	},
	_afterNotify:function(){
		if(this.animation && this.animation.showEffect){
			this.$el[this.animation.showEffect].call(this.$el,(this.animation.showEffectDelay||1000));
			return this;
		}
		this.$el.show();
		return this;
	},
	_createNotifier:function(){
		this.$el=$(this.template);
		if(this.closeBtn) this.$el.append(this.closeBtnTemplate);
		$(this.parentSelector).append(this.$el);
		this.$el.find(".message").css({'display':'inline-block','width':this.$el.width() * .99});
		return this;
	},
	notify:function(message){
		this.$el.find(".message").html(message);
		this._afterNotify();
		if(this.autoHide){
			this._autoHideHandler();
		}
		return this;
	},
	close:function(){
		if(this.animation && this.animation.closeEffect){
			this.$el[this.animation.closeEffect].call(this.$el,(this.animation.closeEffectDelay||100));
			return this;
		}
		this.closeImmediately();
		return this;
	},
	closeImmediately:function(){
		this.$el.hide();
	}
});

// Sample settings obj 
/*
	{
		'closeBtn':true,
		'autoHide':true,
		'animation':{
						'showEffect':'fadeIn',
						'showEffectDelay':3000,
						'closeEffect':'fadeOut',
						'closeEffectDelay':3000
					}
	}

	*/
