/*!
 * jQuery VinSolutions VinScore Plugin 1.0.0
 *
 */
(function($) {
    $.fn.vinscore = function(globalcustomerid, options) {
        var thisControl = this;
        var settings = {};
        $.extend(settings, this.vinscore.defaults, options);
        $(thisControl).html(settings.defaultText); //sets default text -- if we don't get a score back from the api call the control has our default loaded already
        var color = settings.fontColor;
        var fontsize = settings.fontSize;
        var fontweight = settings.fontWeight;
        var fontface = settings.fontFace;

        if (globalcustomerid === undefined || globalcustomerid === null) {
            $(thisControl).html(settings.defaultText).css('color', color).css('font-size', fontsize).css('font-weight', fontweight);
            return this;
        }

        $.when(
            $.ajax({
                url: settings.baseUri + '?globalcustomerid=' + encodeURIComponent(globalcustomerid),
                data: null,
                type: 'GET',
                processData: true,
                contentType: 'application/json',
                async: true,
                timeout: 10000,
                dataType: 'json'
            })).done(function(data) { //async call is done...process the data
            if (data !== null && data !== undefined) { //if we have data, manipulate it
                var score = $.parseJSON(JSON.stringify(data));
                if (score.Score !== undefined && score.Score !== null) { //if we have a Score property try to parse it
                    try {
                        var parsedScore = parseInt(score.Score, 10);
                        if (!isNaN(parsedScore)) { //if our parsed score is a number, show it
                            $(thisControl).html(parsedScore); //we got a score back from the api call so update the control's text to that value (replace the default text)
                        }
                    } catch (e) {
                        //do nothing...the default text will show
                    }
                }
            }
        });
        $(thisControl).css('color', color).css('font-size', fontsize).css('font-weight', fontweight).css('font-family', fontface);
        return this;
    };

	$.fn.vinscore.defaults = {
	    baseUri: '/api/vinscore', //uri of the WebAPI service call -- /CarDashboard/API/CRMServiceBase/V1/XXX/YYY
		fontColor: '#0080DF', //blue
		fontSize: '2em', //approx 24 pt (32px)
		fontWeight: 'bold', 
        fontFace: 'Arial',
        defaultText: '' //shows if the score is null or undefined or for some reason nothing useful comes back from the api service call
	};
})(jQuery);