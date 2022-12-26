$(function() {
    const cors = 'https://cors-anywhere.herokuapp.com/';
    $.ajax({
        url: cors + 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-063?Authorization=CWB-A13D4A9A-CCDC-492F-B370-A3E7289AE3C7&locationName=%E4%B8%AD%E6%AD%A3%E5%8D%80&elementName=T',
        type: "GET",
        dataType: "json",
        success: function(res) {
            const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const html1 = `<div class="d-flex flex-column block"><small class="text-muted mb-0">`;
            const html2 = `</small><div class="text-center"><img class="symbol-img" src="`;
            const html3 = `"></div><h6><strong>`;
            const html4 = `&#176;</strong></h6>`;
            let week_html = '';
            let tempture = res.records.locations[0].location[0].weatherElement[0].time[0].elementValue[0].value;
            $('#city_name').html(res.records.locations[0].locationsName);
            $('#district').html(res.records.locations[0].location[0].locationName);
            $('#tempture').html(tempture + "&#176;");
            if (tempture > 18)
                $('.city-symbol').attr('src', 'https://i.imgur.com/Shrg84B.png');
            else
                $('.city-symbol').attr('src', 'https://i.imgur.com/BeWfUuG.png');
            let j = 0;
            for (var i = 1; i < 6; i += 2) {

                let degree = res.records.locations[0].location[0].weatherElement[0].time[i].elementValue[0].value;
                icon = (degree > 18) ? "https://i.imgur.com/Shrg84B.png" : "https://i.imgur.com/BeWfUuG.png";
                week_html = week_html + html1 + week[j] + html2 + icon
                week_html = week_html + html3 + degree + html4;
                console.log(week_html);
                j++;
            }
        },

        error: function() {
            alert("ERROR!!!");
        }
    });
});