notifier
========

Notification bar for your webpages

Usage: 

Step 1] 
Put the following style tag in head of html page.
<style>
.notifier{
  position:fixed;
	background-color: yellow;
	top:60px;
	left:15%;
	z-index:50;
	width:65%;
	padding:5px 10px;
}
</style>

Step 2] 
Include inheritance and notifier js files into the html document. 

Step 3] Sample usage: 

Create asettings object.
var settings={
    'closeBtn':true,
		'autoHide':true,
		'animation':{
						'showEffect':'fadeIn',
						'showEffectDelay':3000,
						'closeEffect':'fadeOut',
						'closeEffectDelay':3000
					}
	};
var notifier = new Notifier(settings);
notifier.notify("This is my forst notification");
