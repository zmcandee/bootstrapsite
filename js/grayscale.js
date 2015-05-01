/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

Number.prototype.toWords = function() {
    function tw(s,n){var ns=s.slice(0,3),nw=[["","one","two","three","four","five","six","seven","eight","nine"],["ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"],["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"],["","thousand","million","billion","trillion"]];
        return (ns.length<1)?"":tw(s.slice(3),n+1)+((ns.length>1)?(((ns.length==3&&ns[2]!="0")?nw[0][ns[2]]+" hundred ":"")+((ns[1]=="1")?nw[1][ns[0]]+" ":((ns[1]!="0")?nw[2][ns[1]]+" ":"")+(ns[0]!="0"?nw[0][ns[0]]+" ":""))):(ns[0]!="0"?nw[0][ns[0]]+" ":""))+(parseInt(ns,10)!=0?nw[3][n]+(n>0?" ":""):"");}
    return tw(this.toString().split("").reverse().join(""),0);
}

// Song request form handlers 
$("#songName,#songSong").on('input propertychange',function(){$("#songSubmit").prop("disabled",($('#songName').val()==''||$('#songSong').val()=='')?true:false);});
$("#songForm").submit(function(event){
    event.preventDefault();
    $("#songSubmit").prop('disabled',true);
    $.post($(this).prop('action'),$(this).serialize(),function(data){
            var res = $.parseJSON(data);
            if(res.status=="SUCCESS")
                $("#songResult").text("SUCCESS - Thanks for requesting the song: '"+res.row[2]+"'").addClass("text-success").removeClass("text-danger");
            else
                $("#songResult").text(res.status+" - "+res.message).addClass("text-danger").removeClass("text-success");
        },'text').fail(function(){$("#songResult").text("Safari doesn't allow us to verify requests but hopefully we got it.").addClass("text-warning").removeClass("text-success");});
    $("#songSong").val('');
});

// RSVP request form handlers 
$("#searchName").on('input propertychange',function(){$("#searchSubmit").prop("disabled",($('#searchName').val()=='')?true:false);});
$("#searchForm").submit(function(event){
    event.preventDefault();
    $("#searchSubmit").prop('disabled',true);
    $.post($(this).prop('action'),$(this).serialize(),function(data){
			var res = $.parseJSON(data);
			if(res.status=="SUCCESS") {
				$("#searchStatus").text("SUCCESS - Found "+res.results.length+" matches").addClass("text-success").removeClass("text-danger");
				console.log(res.results);
				$("#rsvpName").empty();
				for(x in res.results) {
					$("#rsvpName").append($("<option>").text(res.results[x].name).val(res.results[x].name));
				}
				$("#rsvpForm").removeClass("hidden");
			} else
				$("#searchStatus").text(res.status+" - "+res.message).addClass("text-danger").removeClass("text-success");
		},'text').fail(function(){
			$("#searchStatus").text("The RSVP feature isn't working right now, please call or email.").addClass("text-danger").removeClass("text-success");
		});
});

$("#rsvpForm").submit(function(event){
    event.preventDefault();
    $("#rsvpSubmit").prop('disabled',true);
	var formData = $(this).serialize();
    $.post($(this).prop('action'),formData,function(data){
			var res = $.parseJSON(data);
			if(res.status=="SUCCESS") {
				console.log(res.result);
				$("#rsvpStatus").text("SUCCESS - Thanks for RSVP'ing").addClass("text-success").removeClass("text-danger");
				
			} else
				$("#rsvpStatus").text(res.status+" - "+res.message).addClass("text-danger").removeClass("text-success");
		},'text').fail(function(){
			$("#rsvpStatus").text("The RSVP feature isn't working right now, please call or email.").addClass("text-danger").removeClass("text-success");
		});
	$("#rsvpSubmit").prop('disabled',false);
});


/*
// Google Maps Scripts
// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 15,

        // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(40.6700, -73.9400), // New York

        // Disables the default Google Maps UI components
        disableDefaultUI: true,
        scrollwheel: false,
        draggable: false,

        // How you would like to style the map. 
        // This is where you would paste any style found on Snazzy Maps.
        styles: [{
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 17
            }]
        }, {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 20
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 17
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 29
            }, {
                "weight": 0.2
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 18
            }]
        }, {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 16
            }]
        }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 21
            }]
        }, {
            "elementType": "labels.text.stroke",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#000000"
            }, {
                "lightness": 16
            }]
        }, {
            "elementType": "labels.text.fill",
            "stylers": [{
                "saturation": 36
            }, {
                "color": "#000000"
            }, {
                "lightness": 40
            }]
        }, {
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 19
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 20
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 17
            }, {
                "weight": 1.2
            }]
        }]
    };

    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using out element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);

    // Custom Map Marker Icon - Customize the map-marker.png file to customize your icon
    var image = 'img/map-marker.png';
    var myLatLng = new google.maps.LatLng(40.6700, -73.9400);
    var beachMarker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: image
    });
} */
