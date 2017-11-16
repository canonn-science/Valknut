/**
 * Elite: Dangerous Star Map (http://www.edsm.net/)
 *
 * @link        http://git.edsm.net:9090/EDSM/FrontEnd
 * @copyright   Copyright (c) 2015-2016 EDSM. (http://www.edsm.net)
 */

/**
 * TYPEAHEAD
 */
 
var edsmTypeaheadTemplate   = {
    empty: [
        '<div class="empty-message">',
        'Unable to find any systems...',
        '</div>'
    ].join('\n'),
    suggestion: function(datum){
        var communityName = '';
        
        if(datum.communityName != null)
            communityName = ' (' + datum.communityName + ')';
        
        var value = '<strong>' + datum.value + '</strong>' + communityName + '<br /><em class="small"><ins>Coordinates:</ins> ';
        
        if(datum.x != null)
        {
            if(datum.coordinatesLocked == true)
                value = value + '<span class="text-success">' +  datum.x + '/' + datum.y + '/' + datum.z + '</span>';
            else
                value = value + '<span class="text-warning">' +  datum.x + '/' + datum.y + '/' + datum.z + '</span>';
        }
        else
            value = value + '<span class="text-danger">Unknown</span>';
        
        return value + '</em>';
    }
}; 
 
// Instantiate the Bloodhound suggestion engine
var edsmSystems = new Bloodhound({
    datumTokenizer: function (datum) {
        return Bloodhound.tokenizers.whitespace(datum.value);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
	url: 'https://www.edsm.net/typeahead/systems/query/%QUERY',
	
    remote: {
        url: 'https://www.edsm.net/typeahead/systems/query/%QUERY',
			prepare: function(query, settings) {
			settings.url = settings.url.replace('%QUERY',query)
			console.log("in Prep: "+settings.url)
			return settings;
		},
        filter: function (edsmSystems) {
            // Map the remote source JSON array to a JavaScript object array
            return $.map(edsmSystems, function (edsmSystem) {
				console.log("in Filter")
                return {
                    value: edsmSystem.value
                };
            });
        }
    }
});


