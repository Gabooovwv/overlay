var Overlay =
{
	/** @var overlayBoxName   Overlay box name. */
	overlayBoxName:      'overlayBox',

	/** @var overlayLightBoxName   Overlay light box name. */
	overlayLightBoxName: 'overlayLightBox',

	/**
	 * Constructor.
	 *
	 * @return void
	 */
	init: function() {
		'use strict';

	},

	/**
	 * Create popup.
	 *
	 * @param string id        HTML tag id.
	 * @param string message   HTML content.
	 *
	 * @return object
	 */
	popup: function(id, message, type) {
		'use strict';

		var pageHeight = $(document).height();
		//box-shadow: 5px 5px 30px #000;
		$("body").append('<div id="' + Overlay.overlayLightBoxName + '"></div>');
		$("body").append('<div id="' + Overlay.overlayBoxName + '" class="overlayBoxSkin"><div class="overlayBoxSkinHeader">' + type + '</div>' + message + '</div>');

		$('#' + Overlay.overlayLightBoxName).live('click', function(){
			Overlay.close();
		})

		$('#' + Overlay.overlayLightBoxName).css({'display': 'none', 'height': pageHeight});

		$('#' + Overlay.overlayBoxName).css({
			'position': 'absolute',
			'top': Math.max(0, (($(window).height() - $($('#' + Overlay.overlayBoxName)).outerHeight()) / 2) + $(window).scrollTop()) + "px",
			'left': Math.max(0, (($(window).width() - $($('#' + Overlay.overlayBoxName)).outerWidth()) / 2) + $(window).scrollLeft()) + "px",
			'display': 'none'
		});

		$('#' + Overlay.overlayBoxName).fadeIn(800);
		$('#' + Overlay.overlayLightBoxName).fadeIn(500);
	},

	/**
	 * Alert popup.
	 *
	 * @param string id           HTML tag id.
	 * @param string message      HTML content.
	 * @param string buttonText   Button text.
	 *
	 * @return object
	 */
	alert: function(id, message, buttonText) {
		'use strict';

		$('#' + id).click(function(){
			var inner = message + '<br /><br /><a href="#">' + buttonText + '</a>';

			Overlay.popup(id, inner, 'alert');

			$('#' + Overlay.overlayBoxName + ' a').live('click', function(){
				Overlay.close();
				return false;
			});

			$(document).keyup(function(e) {
				//if (e.which == 13) { $('#' + Overlay.overlayBoxName + ' a').click(); }    // enter (works as expected)
				// esc   (does not work)
				if (e.which == 27) {
					$('#' + Overlay.overlayBoxName + ' a').click();
				}
			});

			return false;
		});
	},

	/**
	 * Confirm popup.
	 *
	 * @param string id                HTML tag id.
	 * @param string message           HTML content.
	 * @param string buttonTextTrue    Button text true.
	 * @param string buttonTextFalse   Button text false.
	 *
	 * @return object
	 */
	confirm: function(id, message, buttonTextTrue, buttonTextFalse) {
		'use strict';

		$('#' + id).click(function(e){
			var inner = message +
				'<br /><br />' +
				'<a href="' + e.target.href +'" class="overlayButtonTrue">' + buttonTextTrue + '</a>' +
				' / ' +
				'<a href="#" class="overlayButtonFalse">' + buttonTextFalse + '</a>';

//			inner = message +
//				'<form>' +
//					'<input type="button" value="Close" class="overlayButtonFalse" />' +
//					'<input type="button" value="Save" class="overlayButtonTrue" />' +
//				'</form>';

			Overlay.popup(id, inner, 'confirm');

			$('#' + Overlay.overlayBoxName + ' .overlayButtonFalse').live('click', function(){
				Overlay.close();
				return false;
			});

			$('#' + Overlay.overlayBoxName + ' .overlayButtonTrue').live('click', e);

			$(document).keyup(function(e) {
				if (e.which == 13) {
					$('#' + Overlay.overlayBoxName + ' .overlayButtonTrue').click();
				}

				if (e.which == 27) {
					$('#' + Overlay.overlayBoxName + ' .overlayButtonFalse').click();
				}
			});

			return false;
		})
	},

	/**
	 * Destruct.
	 *
	 * @return void
	 */
	close: function() {
		'use strict';

		$('#' + Overlay.overlayBoxName).fadeOut(800);
		$('#' + Overlay.overlayLightBoxName).fadeOut(500);

		var myVar = setInterval(function(){
			$('#' + Overlay.overlayBoxName).remove();
			$('#' + Overlay.overlayLightBoxName).remove();

			clearInterval(myVar);
		}, 800);
	},
};