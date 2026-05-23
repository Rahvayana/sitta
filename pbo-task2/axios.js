$(function(){
    $loadWeatherBtn = $("#loadWeatherBtn");
    $resultLabel = $("#resultLabel");
    //onclick loadWeatherBtn
    $loadWeatherBtn.on("click", function () {
        $.get("https://api.open-meteo.com/v1/forecast?latitude=-6.2&longitude=106.8&hourly=temperature_2m",
            function(data, status) {
            console.log({
                data, status
            });
            $resultLabel.text("Menampilkan hasil");
            renderWeatherForecast(data);
        });
        
    });
});