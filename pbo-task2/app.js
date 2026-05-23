$(function () {
    var state = {
        rows: [],
        query: "",
        sort: "time-asc",
        showAll: false,
        limit: 10,
        selectedId: null
    };

    var $loadButton = $("#loadWeatherBtn");
    var $searchInput = $("#searchWeather");
    var $sortSelect = $("#sortWeather");
    var $toggleButton = $("#toggleLimitBtn");
    var $weatherRows = $("#weatherRows");
    var $resultLabel = $("#resultLabel");
    var $minTemp = $("#minTemp");
    var $avgTemp = $("#avgTemp");
    var $maxTemp = $("#maxTemp");
    var $selectedTime = $("#selectedTime");
    var $selectedTemp = $("#selectedTemp");
    var $selectedNote = $("#selectedNote");

    function temperatureText(value) {
        return Number(value).toLocaleString("id-ID", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        }) + " \u00B0C";
    }

    function displayTime(value) {
        var parts = String(value).split("T");
        var dateParts = parts[0] ? parts[0].split("-") : [];
        var time = parts[1] ? parts[1].slice(0, 5) : "";

        if (dateParts.length !== 3 || !time) {
            return String(value);
        }

        return dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0] + " " + time;
    }

    function normalizeForecast(response) {
        var hourly = response && response.hourly ? response.hourly : {};
        var times = Array.isArray(hourly.time) ? hourly.time : [];
        var temperatures = Array.isArray(hourly.temperature_2m) ? hourly.temperature_2m : [];

        return $.map(times, function (time, index) {
            var temperature = Number(temperatures[index]);

            if (!time || !Number.isFinite(temperature)) {
                return null;
            }
            console.log({
                    id: index,
                    time: time,
                    temperature: temperature
                }
            );
            
            return {
                id: index,
                time: time,
                temperature: temperature
            };
        });
    }

    function sortedRows(rows) {
        var orderedRows = rows.slice();

        orderedRows.sort(function (left, right) {
            if (state.sort === "time-desc") {
                return right.time.localeCompare(left.time);
            }

            if (state.sort === "temp-desc") {
                return right.temperature - left.temperature;
            }

            if (state.sort === "temp-asc") {
                return left.temperature - right.temperature;
            }

            return left.time.localeCompare(right.time);
        });

        return orderedRows;
    }

    function filteredRows() {
        var query = state.query.trim().toLowerCase();

        if (!query) {
            return sortedRows(state.rows);
        }

        return sortedRows($.grep(state.rows, function (row) {
            return row.time.toLowerCase().indexOf(query) !== -1
                || displayTime(row.time).toLowerCase().indexOf(query) !== -1
                || String(row.temperature).indexOf(query) !== -1;
        }));
    }

    function updateSummary(rows) {
        if (!rows.length) {
            $minTemp.text("--");
            $avgTemp.text("--");
            $maxTemp.text("--");
            return;
        }

        var temperatures = $.map(rows, function (row) {
            return row.temperature;
        });
        var minimum = Math.min.apply(null, temperatures);
        var maximum = Math.max.apply(null, temperatures);
        var average = temperatures.reduce(function (total, value) {
            return total + value;
        }, 0) / temperatures.length;

        $minTemp.text(temperatureText(minimum));
        $avgTemp.text(temperatureText(average));
        $maxTemp.text(temperatureText(maximum));
    }

    function updateDetail(row) {
        if (!row) {
            $selectedTime.text("Pilih satu baris");
            $selectedTemp.text("--");
            $selectedNote.text("Klik baris tabel untuk melihat pembacaan cuaca.");
            return;
        }

        $selectedTime.text(displayTime(row.time));
        $selectedTemp.text(temperatureText(row.temperature));
        $selectedNote.text("Data ini berasal dari satu pembacaan suhu per jam.");
    }

    function emptyRow(message) {
        return $("<tr>", { "class": "empty-row" }).append(
            $("<td>", {
                colspan: 2,
                text: message
            })
        );
    }

    function buildRow(row) {
        var $row = $("<tr>", {
            tabindex: 0,
            "data-row-id": row.id
        });

        if (row.id === state.selectedId) {
            $row.addClass("is-selected");
        }

        $row.append($("<td>").text(displayTime(row.time)));
        $row.append($("<td>").text(temperatureText(row.temperature)));

        return $row;
    }

    function syncControls(totalRows, filteredCount) {
        var hasRows = totalRows > 0;
        var hasOverflow = filteredCount > state.limit;

        $searchInput.prop("disabled", !hasRows);
        $sortSelect.prop("disabled", !hasRows);
        $toggleButton.prop("disabled", !hasRows || !hasOverflow);
        $toggleButton.text(state.showAll ? "Batasi 10 data" : "Tampilkan semua");
    }

    function renderRows() {
        var rows = filteredRows();
        var visibleRows = state.showAll ? rows : rows.slice(0, state.limit);
        var selectedRow = state.rows.find(function (row) {
            return row.id === state.selectedId;
        });

        $weatherRows.empty();
        updateSummary(rows);
        syncControls(state.rows.length, rows.length);
        updateDetail(selectedRow);

        if (!state.rows.length) {
            $weatherRows.append(emptyRow("Data akan muncul setelah prakiraan dimuat."));
            $resultLabel.text("Belum ada data cuaca yang ditampilkan.");
            return;
        }

        if (!rows.length) {
            $weatherRows.append(emptyRow("Tidak ada data yang cocok dengan pencarian."));
            $resultLabel.text("Pencarian tidak menemukan data cuaca.");
            return;
        }

        $.each(visibleRows, function (_, row) {
            $weatherRows.append(buildRow(row));
        });

        $resultLabel.text(
            "Menampilkan " + visibleRows.length + " dari " + rows.length + " data cuaca."
        );
    }

    function selectRow(rowId) {
        var selectedRow = state.rows.find(function (row) {
            return row.id === rowId;
        });

        if (!selectedRow) {
            return;
        }

        state.selectedId = selectedRow.id;
        updateDetail(selectedRow);
        $weatherRows.find("tr").removeClass("is-selected");
        $weatherRows.find('[data-row-id="' + selectedRow.id + '"]').addClass("is-selected");
    }

    function renderWeatherForecast(response) {
        state.rows = normalizeForecast(response);
        state.query = "";
        state.sort = "time-asc";
        state.showAll = false;
        state.selectedId = state.rows.length ? state.rows[0].id : null;

        $searchInput.val("");
        $sortSelect.val(state.sort);
        $loadButton.addClass("is-waiting");
        renderRows();
    }

    // Call this function inside AJAX success handler.
    window.renderWeatherForecast = renderWeatherForecast;


    $searchInput.on("input", function () {
        state.query = $(this).val();
        renderRows();
    });

    $sortSelect.on("change", function () {
        state.sort = $(this).val();
        renderRows();
    });

    $toggleButton.on("click", function () {
        state.showAll = !state.showAll;
        renderRows();
    });

    $weatherRows.on("click", "tr[data-row-id]", function () {
        selectRow(Number($(this).attr("data-row-id")));
    });

    $weatherRows.on("keydown", "tr[data-row-id]", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            selectRow(Number($(this).attr("data-row-id")));
        }
    });

    renderRows();
});
