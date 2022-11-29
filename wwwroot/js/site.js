function countKaryawan(tahunMasuk) {
    let count = 0;
    a.forEach(x => {
        if (x.tahunMasuk == tahunMasuk) {
            count++;
            console.log(count);
        }
    });
    return count;
}

function countGender(Gender) {
    let countGen = 0;
    a.forEach(x => {
        if (x.Gender == Gender) {
            countGen++;
            console.log(countGen);
        }
    });
    return countGen;
}

$(document).ready(function () {
    $.ajax({
        url: "https://localhost:7159/api/Employee/",
        method: "GET",
        success: function (data) {
            a = data.Data;
            console.log(data);
            Highcharts.chart("jml_Karyawan", {
                chart: {
                    type: "column",
                    zoomType: "y"
                },
                title: {
                    text: "Jumlah Karyawan Berdasarkan Tahun Masuk (2018 - 2022)"
                },
                xAxis: {
                    categories: [
                        "2018",
                        "2019",
                        "2020",
                        "2021",
                        "2022"
                    ],
                    title: {
                        text: null
                    },
                    accessibility: {
                        description: "Tahun"
                    }
                },
                yAxis: {
                    min: 0,
                    tickInterval: 2,
                    title: {
                        text: "Orang"
                    },
                    labels: {
                        overflow: "justify",
                        format: "{value}"
                    }
                },
                plotOptions: {
                    column: {
                        dataLabels: {
                            enabled: false,
                            format: " Orang"
                        }
                    }
                },
                tooltip: {
                    valueSuffix: " Orang",
                    stickOnContact: true,
                    backgroundColor: "rgba(255, 255, 255, 0.93)"
                },
                legend: {
                    enabled: false
                },
                series: [
                    {
                        name: "Jumlah Karyawan : ",
                        data: [countKaryawan("2018"), countKaryawan("2019"), countKaryawan("2020"), countKaryawan("2021"), countKaryawan("2022")],
                        borderColor: "#5997DE"
                    }
                ]
            });

            Highcharts.chart('jml_gender', {
                colors: ['#f201ba','#01BAF2'],
                chart: {
                    type: 'pie'
                },
                title: {
                    text: 'Komposisi Gender PT. MCC71'
                },
                tooltip: {
                    valueSuffix: ' Orang'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}: {point.percentage:.1f}%'
                        },
                        showInLegend: true
                    }
                },
                series: [
                    {
                        name: 'Jumlah',
                        colorByPoint: true,
                        data: [
                            {
                                name: 'Perempuan',
                                y: countGender("P")
                            },
                            {
                                name: 'Laki - Laki',
                                sliced: true,
                                selected: true,
                                y: countGender("L")
                            }
                           
                        ]
                    }
                ]
            });
        }
    });
});