/**
 * Elite: Dangerous Star Map (http://www.edsm.net/)
 *
 * @link        http://git.edsm.net:9090/EDSM/FrontEnd
 * @copyright   Copyright (c) 2015-2016 EDSM. (http://www.edsm.net)
 */

/**
 * TYPEAHEAD
 */
var edsmBloodHound          = null;
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

var makeTypeahead = function(element){
    if(edsmBloodHound == null)
    {
        edsmBloodHound = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
			url: 'https://www.edsm.net/typeahead/systems/query/%QUERY',
			remote: {
            url: 'https://www.edsm.net/typeahead/systems/query/%QUERY',
			prepare: function(query, settings) {
                    settings.dataType = "jsonp"
                    settings.url = settings.url.replace('%QUERY', query)
					console.log("in prepare: "+settings.url)
                    return settings;
            }
			}
        }); 
        edsmBloodHound.initialize();   
    }
    
    return element.typeahead(
        {
            minLength: 2
        },
        {
            name: 'systems',
            displayKey: 'value',
            source: edsmBloodHound.ttAdapter(),
            //templates: edsmTypeaheadTemplate
        } 
    );
};

