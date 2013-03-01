(function(window,$){
	window.Notifier=Class.extend({
		parentSelector:"body", // a selector whee the notifier will be appended
		autoHideTimeInterval:4000, // the delay after which notifier will be automatically hidden
		closeBtn:true, // controls show/hide of the close button
		autoHide:true, // controls whether autoHide will be enabled or not
		template:"<div class='notifier' style='display:none;'><span class='message'></span></div", // template for notifier
		closeBtnTemplate:"<span class='closeBtn' style='cursor:pointer;'>X</span>", // template for close btn in the notifier
		
		init:function(settings){
			if(settings) _.extend(this,settings);
			this._createNotifier();
			this._bindEvents();
		},
		/*
			@params: message: text to be displayed
			@returns: notifier object for chaining
			@functionality: sets text for notifier, display the notifier and fire callbacks after showing.
		*/
		notify:function(message){
			this.$el.find(".message").html(message);
			if(this.showEffect){
				this.$el[this.showEffect].call(this.$el,(this.showEffectDelay||1000),this._getShowCallback());
				return this;
			}
			this.$el.show();
			this._getShowCallback()();
			
			if(this.autoHide){
				this._autoHideHandler();
			}
			return this;
		},
		/*
			@returns: notifier object for chaining
			@functionality: hides notifier and fires callback after showing.
		*/
		close:function(){
			if(this.closeEffect){
				this.$el[this.closeEffect].call(this.$el,
														(this.closeEffectDelay||1000),
														this._getCloseCallback());
				return this;
			}
			this.closeImmediately();
			this._getCloseCallback()();
			return this;
		},
		/*
			@returns: notifier object for chaining
			@functionality: hides notifier.
		*/
		closeImmediately:function(){
			this.$el.hide();
			return this;
		},
		/*
			@returns: notifier object for chaining
			@functionality: setter for afterCloseCallback.
		*/
		setAfterCloseCallback:function(func){
			if(typeof func === 'function')
				this.afterCloseCallback=func;
			return this;
		},
		/*
			@returns: notifier object for chaining
			@functionality: setter for afterShowCallback.
		*/
		setAfterShowCallback:function(func){
			if(typeof func === 'function')
				this.afterShowCallback = func;
			return this;
		},
		/*
			@returns: notifier object for chaining
			@functionality: setter for autoHide property.
		*/
		setAutoHide:function(autoHide){
			this.autoHide = autoHide;
			return this;
		},
		/*
			@returns: notifier object for chaining
			@functionality: setter for closeBtn property.
		*/
		setCloseBtn:function(closeBtn){
			this.closeBtn = closeBtn;
			return this;
		},
		/*
			@returns: notifier object for chaining
			@functionality: binds dom events.
		*/
		_bindEvents:function(){
			this.$el.find(".closeBtn").bind("click",$.proxy(function(){this.close();},this));
			return this;
		},
		/*
			@returns: notifier object for chaining
			@functionality: Closes the notifier after autoHideTimeInterval.
		*/
		_autoHideHandler:function(){
			clearTimeout(this.hideTimeout);
			this.hideTimeout=setTimeout(function(that){
				return function(){
					that.close();
				}
			}(this),this.autoHideTimeInterval);
			return this;
		},
		/*
			@returns: notifier object for chaining
			@functionality: create a notifier dom from template and append to passed selector.
		*/
		_createNotifier:function(){
			this.$el=$(this.template);
			if(this.closeBtn) this.$el.append(this.closeBtnTemplate);
			$(this.parentSelector).append(this.$el);
			this.$el.find(".message").css({'display':'inline-block','width':this.$el.width() * .99});
			return this;
		},
		/*
			@returns: function which acts as showCallback
		*/
		_getShowCallback:function(){
			return (function(that){
						return function(){
							that.afterShowCallback && that.afterShowCallback();
						}
			})(this);
		},
		/*
			@returns: function which acts as closeCallback
		*/
		_getCloseCallback:function(){
			return (function(that){
						return function(){
							that.afterCloseCallback && that.afterCloseCallback();
						}
			})(this);
		},
		afterCloseCallback:function(){},
		afterShowCallback:function(){}
	});
})(window,jQuery);

// Sample settings obj 
/*
	{
		'closeBtn':true,
		'autoHide':true,
		'showEffect':'fadeIn',
		'showEffectDelay':3000,
		'closeEffect':'fadeOut',
		'closeEffectDelay':3000
	}

	*/
