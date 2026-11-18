
(function () {
    // 1. 初始化地图
    var myChart = echarts.init(document.querySelector('.geo'));

    // 2. 请求中国地图 JSON 数据
    $.get('js/china.json', function (geoJson) {

        // 3. 注册中国地图
        echarts.registerMap('china', geoJson);

        // 4. 配置地图
        var option = {
            // 背景颜色
            backgroundColor: '#031525',

            // 提示框
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    return params.name;
                }
            },

            // 地理坐标系
            geo: {
                map: 'china',
                roam: true, // 支持鼠标缩放和拖动
                zoom: 1.2,

                // 显示省份名称
                label: {
                    show: true,
                    color: '#ffffff',
                    fontSize: 10
                },

                // 地图区域样式
                itemStyle: {
                    areaColor: '#0b3a5b',
                    borderColor: '#00cfff',
                    borderWidth: 1
                },

                // 鼠标悬停样式
                emphasis: {
                    label: {
                        show: true,
                        color: '#ffffff'
                    },
                    itemStyle: {
                        areaColor: '#165b85'
                    }
                }
            }
        };

        // 5. 显示地图
        myChart.setOption(option);

    }).fail(function () {
        console.error('中国地图数据加载失败！');
    });

    // 6. 浏览器窗口变化时，重新调整地图大小
    window.addEventListener('resize', function () {
        myChart.resize();
    });

})();
