function calculatePostTime(post) {
    function getSeconds(time) {
        var digits = time.split(':');

        if (digits.length == 2) {
            return +digits[0] * 60 + +digits[1];
        }
        else if (digits.length == 3) {
            return +digits[0] * 3600 + +digits[1] * 60 + +digits[2];
        }
    }
    function sanitize(time) {
        var x = time.split(':');
        var result = '';
        for (var i = 0, len = x.length; i < len; i++) {
            result += x[i].length == 1 ? 0 + x[i] : x[i];
            result += i != len - 1 ? ':' : '';
        }
        return result;
    }

    var audios = post.getElementsByClassName('audio_duration _audio_duration');

    if (audios && audios.length > 1) {
        var duration = [];
        for (var i = 0, len = audios.length; i < len; i++) {
            duration.push(audios[i].innerText);
        }

        var totalDuration = 0; // seconds
        for (var i = 0, len = duration.length; i < len; i++) {
            totalDuration += getSeconds(duration[i]);
        }
        var result;

        if (totalDuration >= 3600) {
            result = Math.floor(totalDuration / 3600) + ":" + Math.floor(totalDuration / 60 % 60) + ":" + Math.floor(totalDuration % 60);
        }
        else {
            result = Math.floor(totalDuration / 60 % 60) + ":" + Math.floor(totalDuration % 60);
        }
        result = sanitize(result);
        return result;
    }
    else {
        return 0;
    }
}

function calculateTotalDuration() {
    var posts = document.getElementsByClassName('wall_post_cont _wall_post_cont');

    if (posts) {
        for (var i = 0, len = posts.length; i < len; i++) {
            if (posts[i].innerHTML.indexOf('post_date _total_duration') === -1) {
                var e = document.createElement('div');
                var duration = calculatePostTime(posts[i]);

                if (duration && duration != 0) {
                    e.innerHTML = '<div class="post_date _total_duration"><span class="rel_date">Общее время звучания: <b>' + duration + '</b></span></div>';
                    document.getElementById(posts[i].id).appendChild(e);
                }
            }
        }
    }
}

calculateTotalDuration();

window.addEventListener("scroll", calculateTotalDuration);