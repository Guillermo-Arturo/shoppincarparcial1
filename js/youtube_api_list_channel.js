$(document).ready(function() {
    var ytkey = 'AIzaSyA1UNll6QrPswkVmXSj3CTdteEpTLfNrzw';
    youtubeApiCall();
    $("#pageTokenNext").on( "click", function( event ) {
        $("#pageToken").val($("#pageTokenNext").val());
        youtubeApiCall();
    });
    $("#pageTokenPrev").on( "click", function( event ) {
        $("#pageToken").val($("#pageTokenPrev").val());
        youtubeApiCall();
    });
    
    function getVideoDetails(ids){
        $.ajax({
            cache: false,
            data: $.extend({
                key: ytkey,
                part: 'snippet,contentDetails,statistics'
            }, {id: ids}),
            dataType: 'json',
            type: 'GET',
            timeout: 5000,
            fields: "items(id,contentDetails,statistics,snippet(publishedAt,channelTitle,channelId,title,description,thumbnails(medium)))",
            url: 'https://www.googleapis.com/youtube/v3/videos'
        })
        .done(function(data) {
            var items = data.items, videoList = "";
            $.each(items, function(index,e) {
                videoList = videoList + '<li class="hyv-video-list-item"><div class="hyv-content-wrapper"><a href="" class="hyv-content-link" title="'+e.snippet.title+'"><span class="title">'+e.snippet.title+'</span><span class="stat attribution">by <span>'+e.snippet.channelTitle+'</span></span></a></div><div class="hyv-thumb-wrapper"><a href="" class="hyv-thumb-link"><span class="hyv-simple-thumb-wrap"><img alt="'+e.snippet.title+'" src="'+e.snippet.thumbnails.default.url+'" width="120" height="90"></span></a><span class="video-time">'+YTDurationToSeconds(e.contentDetails.duration)+'</span></div></li>';
            });
            $("#hyv-watch-related").html(videoList);
            // JSON Responce to display for user
            new PrettyJSON.view.Node({ 
                el:$(".hyv-watch-sidebar-body"), 
                data:data
            });
        });
    }

    function YTDurationToSeconds(duration) {
        var match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)

        var hours = ((parseInt(match[1]) || 0) !== 0)?parseInt(match[1])+":":"";
        var minutes = ((parseInt(match[2]) || 0) !== 0)?parseInt(match[2])+":":"";
        var seconds = ((parseInt(match[3]) || 0) !== 0)?parseInt(match[3]):"00";
        var total = hours + minutes + seconds;
        return total;
    }

    function youtubeApiCall(){
        $.ajax({
            cache: false,
            data: $.extend({
                key: ytkey,
                q: "nike",
                part: 'snippet'
            }, {maxResults:20,pageToken:$("#pageToken").val()}),
            dataType: 'json',
            type: 'GET',
            timeout: 5000,
            fields: "pageInfo,items(id(videoId)),nextPageToken,prevPageToken",
            url: 'https://www.googleapis.com/youtube/v3/search'
        })
        .done(function(data) {
            $('.btn-group').show();
            if (typeof data.prevPageToken === "undefined") {$("#pageTokenPrev").hide();}else{$("#pageTokenPrev").show();}
            if (typeof data.nextPageToken === "undefined") {$("#pageTokenNext").hide();}else{$("#pageTokenNext").show();}
            var items = data.items, videoids = [];
            $("#pageTokenNext").val(data.nextPageToken);
            $("#pageTokenPrev").val(data.prevPageToken);
            $.each(items, function(index,e) {
                videoids.push(e.id.videoId);
            });
            getVideoDetails(videoids.join());
        });
    }  
});