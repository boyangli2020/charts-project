// 监控区域模块
(function () {
    // jQuery事件委托两种方式
    // $('.monitor .tabs').on('click', 'a', function () {});
    // $('.monitor .tabs').delegate('a', 'click', function () {});
    $('.monitor .tabs').on('click', 'a', function () {
        $(this)
            .addClass('active')
            .siblings()
            .removeClass('active');

        // 选取对应索引号的content进行显示
        $('.monitor .content')
            .eq($(this).index())
            .show()
            .siblings('.content')
            .hide();
    });

    //无缝滚动
    //先克隆一下marquee中所有的行（row）
    //这里注意，因为有两个content，里面都有marquee，所以都要进行克隆
    $('.marquee-view .marquee').each(function () {
        //this是原生dom元素
        var $rows = $(this)
            .children()
            .clone();
        $(this).append($rows);
    })
})();

// 点位分布统计模块
(function () {
    var myChart = echarts.init(document.querySelector('.pie'));

    var option = {
        // 提示框组件
        tooltip: {
            // trigger: 触发方式，有item，axis和none三种取值
            //      item: 非轴图形使用，当鼠标放到对应数据对应图形上触发提示
            //      axis: 坐标轴图形使用，当鼠标放到坐标轴上触发提示
            //      none: 什么都不触发
            trigger: 'item',

            // formatter: 格式化提示内容
            // a代表series系列图标名称
            // b代表series数据名称，data里面的name
            // c代表series数据值，data里面的value
            // d代表当前数据/总数据的比例
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // 颜色
        color: [
            '#006cff',
            '#60cda0',
            '#ed8884',
            '#ff9f7f',
            '#0096ff',
            '#9fe6b8',
            '#32c5e9',
            '#1d9dff'
        ],
        // 系列列表
        series: [
            {
                // 列表名称
                name: '点位统计',
                // 列表类型
                type: 'pie',
                // 饼形图半径，可以是像素，也可以是百分比（基于DOM容器大小）
                // 第一项是内半径，第二项是外半径（通过它可以控制饼形图的大小）
                // 南丁格尔玫瑰图有两个圆，一个内圆，一个外圆
                // 百分比是基于图表所在DOM容器的宽或者高取最小值的一半的百分比
                // 比如10%，如果宽600，高400，则为400/2*10%=20
                radius: ['10%', '70%'],
                // 列表中心位置left 50% top 50% 距离DOM容器
                center: ['50%', '50%'],
                // 显示模式，有两种取值，一个是radius半径模式，一个是area面积模式
                //      radius: 半径模式，数值越大，扇区的半径越大，数值越小，扇区的半径越小
                //      area: 面积模式，数值越大，扇区所占面积越大，数值越小，扇区所占面积越小
                roseType: 'radius',
                // 文本标签控制饼形图文字的相关样式，注意它是一个对象
                label: {
                    fontSize: 10
                },
                // 引导线调整
                labelLine: {
                    // 连接扇形图线长
                    length: 6,
                    // 连接文字线长
                    length2: 8
                },
                itemStyle: {
                    borderRadius: 5
                },
                data: [
                    { value: 20, name: '云南' },
                    { value: 26, name: '北京' },
                    { value: 24, name: '山东' },
                    { value: 25, name: '河北' },
                    { value: 20, name: '江苏' },
                    { value: 25, name: '浙江' },
                    { value: 30, name: '四川' },
                    { value: 42, name: '湖北' }
                ]
            }
        ]
    };

    myChart.setOption(option);

    // 当浏览器缩放时，图标跟着等比例缩放
    window.addEventListener('resize', function () {
        myChart.resize();
    });
})();

// 全国用户总量统计柱形图
(function () {
    var myChart = echarts.init(document.querySelector('.bar'));

    var item = {
        name: "",
        value: 1200,
        // 修改当前柱形的样式
        itemStyle: {
            color: "#254065"
        },
        // 鼠标放到柱子上不想高亮显示
        emphasis: {
            itemStyle: {
                color: "#254065"
            }
        },
        // 鼠标放到柱子上不显示提示框组件
        tooltip: {
            extraCssText: "opacity: 0"
        }
    }

    var option = {
        // color设置柱状图颜色，下面方式可以实现柱状图柱子颜色渐变
        color: new echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [
                { offset: 0, color: '#00fffb' },
                { offset: 1, color: '#0061ce' },
            ]
        ),
        tooltip: {
            // 需求是鼠标放在柱子上时候才出现提示框，而不是鼠标放在坐标轴上就出现提示框
            // 所以trigger不应该用axis而是用item
            trigger: 'item',
            // 当trigger是axis坐标轴的时候，下面axisPointer才会生效
            // 当type为shadow时，当鼠标经过坐标轴，对应柱体会有阴影效果
            // 当type为line时，当鼠标经过坐标轴，对应柱体会有竖线贯穿效果
            // axisPointer: {
            //     type: 'shadow'
            // }
        },
        grid: {
            top: '3%',
            right: '3%',
            bottom: '3%',
            left: '0%',
            // 网格位置紧贴画布边缘时，是否显示刻度以及label，
            // 防止坐标轴标签溢出
            containLabel: true,
            // 是否显示直角坐标系网格（左右两侧有竖线）
            show: true,
            // 边框的颜色（show为true后网格就有了边框，这里设置网格边框颜色）
            // 这个属性时设置网格上下左右四条边的颜色
            borderColor: 'rgba(0, 240, 255, 0.3)'
        },
        // x轴相关设置
        xAxis: [
            {
                // x轴类型，category是类目
                // 类目要和下面data属性结合使用
                type: 'category',
                data: ['上海', '广州', '北京', '深圳', '合肥', '', '……', '', '杭州', '厦门', '济南', '成都', '重庆'],
                axisTick: {
                    // alignWithLabel为true，刻度和刻度标签是对齐的
                    // alignWithLabel为false，刻度标签会在刻度之间显示
                    alignWithLabel: false,
                    // 是否显示刻度
                    show: false
                },
                // 刻度标签相关配置可以通过axisLabel对象设置，颜色是color属性
                axisLabel: {
                    color: "#4c9bfd"
                },
                // x坐标轴线的设置通过axisLine对象设置
                axisLine: {
                    lineStyle: {
                        color: "rgba(0, 240, 255, 0.3)"
                        // width: 3  x轴线粗细
                        // opacity: 0 如果不想显示x轴线则设置为0
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisTick: {
                    // alignWithLabel为true，刻度和刻度标签是对齐的
                    // alignWithLabel为false，刻度标签会在刻度之间显示
                    alignWithLabel: false,
                    // 是否显示刻度
                    show: false
                },
                // 刻度标签相关配置可以通过axisLabel对象设置，颜色是color属性
                axisLabel: {
                    color: "#4c9bfd"
                },
                // y坐标轴线的设置通过axisLine对象设置
                axisLine: {
                    lineStyle: {
                        color: "rgba(0, 240, 255, 0.3)"
                        // width: 3  y轴线粗细
                        // opacity: 0 如果不想显示y轴线则设置为0
                    }
                },
                // y轴分割线样式
                splitLine: {
                    lineStyle: {
                        color: "rgba(0, 240, 255, 0.3)"
                    }
                }
            }
        ],
        series: [
            {
                name: 'Direct',
                type: 'bar',
                barWidth: '60%',
                // 数据数组中可以放具体的数据，如果要进一步定义每一个柱子的样式，
                // 数据数组中也可以放对象
                data: [
                    2100,
                    1900,
                    1700,
                    1560,
                    1400,
                    item,
                    item,
                    item,
                    900,
                    750,
                    600,
                    480,
                    240
                ]
            }
        ]
    };

    myChart.setOption(option);

    // 当浏览器缩放时，图标跟着等比例缩放
    window.addEventListener('resize', function () {
        myChart.resize();
    });
})();

// 销售模块
(function () {
    // 准备数据
    var data = {
        year: [
            [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
            [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
        ],
        quarter: [
            [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
            [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
        ],
        month: [
            [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
            [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
        ],
        week: [
            [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
            [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
        ]
    };

    var myChart = echarts.init(document.querySelector('.line'));

    var option = {
        tooltip: {
            // 通过坐标轴来触发提示框
            trigger: 'axis'
        },
        // 图例组件配置
        legend: {
            // 图例组件距离容器右侧10%的位置
            right: '10%',
            textStyle: {
                color: '#4c9bfd',
            }
            // 如果series里面每个对象设置了name，此时图例组件的data可以省略
            // data: ['预期销售额', '实际销售额']
        },
        grid: {
            top: '20%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            // 是否显示直角坐标系网格（左右两侧有竖线）
            show: true,
            // 设置边框颜色
            borderColor: '#012f4a',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisTick: {
                // 去除x轴刻度线
                show: false
            },
            axisLabel: {
                // 设置x坐标轴文字的颜色
                color: '#4c9bfd'
            },
            axisLine: {
                // 去除x坐标轴轴线，这里去除x轴线之后只剩下grid中设置的borderColor了
                show: false
            },
            // 去除轴内间距
            // true: 类目会落在每个“区间”的中间，两端各留半个类目宽度的空白
            // false: 类目直接对齐到刻度线上，两端没有留白
            boundaryGap: false,
        },
        yAxis: {
            type: 'value',
            axisTick: {
                // 去除y轴刻度线
                show: false
            },
            axisLabel: {
                // 设置y坐标轴文字的颜色
                color: '#4c9bfd'
            },
            // 设置分割线样式
            splitLine: {
                lineStyle: {
                    // 设置分割线颜色
                    color: '#012f4a'
                }
            }
        },
        // 设置折线的颜色
        color: ['#00f2f1', '#ed3f35'],
        series: [
            {
                name: '预期销售额',
                type: 'line',
                data: data.year[0],
                // 折现修饰为圆滑
                smooth: true
            },
            {
                name: '实际销售额',
                type: 'line',
                data: data.year[1],
                // 折现修饰为圆滑
                smooth: true
            }
        ]
    };

    myChart.setOption(option);

    // tab切换效果制作
    // 点击tab栏切换效果
    $('.sales .caption').on('click', 'a', function () {
        // 点击后，要将index变成当前点击的这个a的index
        // 由于几个a最前面有一个兄弟元素h3，所以这里需要index - 1
        index = $(this).index() - 1;

        // 点击当前a，高亮显示，调用active
        $(this)
            .addClass('active')
            .siblings('a')
            .removeClass('active');
        // 拿到当前a的自定义属性值
        // this.dataset.type
        var arr = data[this.dataset.type];
        // 根据拿到的数据重新渲染series里面的data值
        option.series[0].data = arr[0];
        option.series[1].data = arr[1];
        // 把配置好的新数据重新渲染到图表中
        myChart.setOption(option);
    });

    // 开启定时器，每隔3s让a触发点击事件即可
    var as = $('.sales .caption a');
    var index = 0;
    var timer = setInterval(function () {
        index++;
        if (index >= 4) index = 0;
        as.eq(index).click();
    }, 3000);

    // 鼠标经过sales关闭定时器，离开sales开启定时器
    $('.sales').hover(function () {
        clearInterval(timer);
    }, function () {
        // 这里为什么要在鼠标移出的时候先讲原来的定时器清除掉，
        // 好像主要是为了防止段时间内鼠标快速移入移出导致页面上出现多个定时器
        // 这个要复习一下jquery教程中关于轮播图的bug问题
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            if (index >= 4) index = 0;
            as.eq(index).click();
        }, 3000);
    });

    // 当浏览器缩放时，图标跟着等比例缩放
    window.addEventListener('resize', function () {
        myChart.resize();
    });
})();

// 销售渠道模块雷达图
(function () {
    var myChart = echarts.init(document.querySelector('.radar'));

    var option = {
        //设置背景颜色
        //backgroundColor: '#161627',
        tooltip: {
            show: true,
            // 控制提示框组件的显示位置
            position: ['60%', '10%']
        },
        radar: {
            // 设置雷达图指示器
            indicator: [
                { name: '机场', max: 100 },
                { name: '商场', max: 100 },
                { name: '火车站', max: 100 },
                { name: '汽车站', max: 100 },
                { name: '地铁', max: 100 }
            ],
            shape: 'circle',
            // 设置雷达图圆心坐标，数组第一项是横坐标，第二项是纵坐标
            // 支持设置成百分比，设置为百分比时，第一项和第二项都是相对于容器的宽度和高度
            center: ['50%', '50%'],
            // 设置雷达图外半径的值，可以是数值或百分比
            // 设置为百分比，比如20%，表示外半径为可视区尺寸（容器宽高中较小的一项）的20%
            radius: '65%',
            // 设置指示器轴的分割段数
            splitNumber: 4,
            axisName: {
                color: 'rgb(238, 197, 102)'
            },
            // 设置雷达图文字样式
            name: {
                textStyle: {
                    color: '#4c9bfd'
                }
            },
            // 设置雷达图分割线的样式
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.5)'
                }
            },
            splitArea: {
                show: false
            },
            // 设置坐标轴线的样式
            axisLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.5)'
                }
            }
        },
        series: [
            {
                name: 'Beijing',
                type: 'radar',
                // 设置雷达图区域线条样式
                lineStyle: {
                    normal: {
                        color: '#fff',
                        width: 1,
                        opacity: 0.5
                    }
                },
                data: [[90, 19, 56, 11, 35, 76]],
                // 设置拐点（标记）的形状，还可以取rect(方块)，arrow(箭头)等等
                symbol: 'circle',
                // 设置拐点的大小
                symbolSize: 5,
                // 设置拐点样式
                itemStyle: {
                    // 设置拐点颜色
                    color: '#fff'
                },
                // 设置拐点上显示的相关数据label的样式
                label: {
                    show: true,
                    color: '#fff',
                    fontSize: 10
                },
                // 设置雷达图区域样式
                areaStyle: {
                    color: 'rgb(238, 197, 102, 0.6)'
                }
            }
        ]
    };
    myChart.setOption(option);

    // 当浏览器缩放时，图标跟着等比例缩放
    window.addEventListener('resize', function () {
        myChart.resize();
    });
})();


// 销售模块 饼形图 半圆形
(function () {
    var myChart = echarts.init(document.querySelector('.gauge'));

    var option = {
        series: [
            {
                name: '销售进度',
                type: 'pie',
                // 设置饼图圆大小，第一个是内圆半径，第二个是外圆半径
                radius: ['130%', '150%'],
                // 移动下位置，套住50%文字
                center: ['48%', '80%'],
                // 是否启用标签重叠策略
                // avoidLabelOverlap: false,
                labelLine: {
                    show: false
                },
                // 起始角度，支持范围[0, 360]
                startAngle: 180,
                // 鼠标经过饼图item区域不放大
                hoverOffset: 0,
                data: [
                    {
                        value: 100,
                        itemStyle: {
                            // 颜色渐变，#00c9e0 --> #005fc1
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    { offset: 0, color: '#00c9e0' }, //0 起始颜色
                                    { offset: 1, color: '#005fc1' }  //1 结束颜色
                                ]
                            )
                        }
                    },
                    {
                        value: 100,
                        itemStyle: {
                            color: '#12274d'
                        }
                    },
                    {
                        value: 200,
                        itemStyle: {
                            color: 'transparent'
                        }
                    }
                ]
            }
        ]
    };

    myChart.setOption(option);

    // 当浏览器缩放时，图标跟着等比例缩放
    window.addEventListener('resize', function () {
        myChart.resize();
    });
})();

// 全国热榜模块
(function () {
    // 1.准备相关数据
    var hotData = [
        {
            city: "北京", // 城市
            sales: "25, 179", // 销售额
            flag: true, //  上升还是下降
            brands: [
                //  品牌种类数据
                { name: "可爱多", num: "9,086", flag: true },
                { name: "娃哈哈", num: "8,341", flag: true },
                { name: "喜之郎", num: "7,407", flag: false },
                { name: "八喜", num: "6,080", flag: false },
                { name: "小洋人", num: "6,724", flag: false },
                { name: "好多鱼", num: "2,170", flag: true }
            ]
        },
        {
            city: "河北",
            sales: "23,252",
            flag: false,
            brands: [
                { name: "可爱多", num: "3,457", flag: false },
                { name: "娃哈哈", num: "2,124", flag: true },
                { name: "喜之郎", num: "8,907", flag: false },
                { name: "八喜", num: "6,080", flag: true },
                { name: "小洋人", num: "1,724", flag: false },
                { name: "好多鱼", num: "1,170", flag: false }
            ]
        },
        {
            city: "上海",
            sales: "20,760",
            flag: true,
            brands: [
                { name: "可爱多", num: "2,345", flag: true },
                { name: "娃哈哈", num: "7,109", flag: true },
                { name: "喜之郎", num: "3,701", flag: false },
                { name: "八喜", num: "6,080", flag: false },
                { name: "小洋人", num: "2,724", flag: false },
                { name: "好多鱼", num: "2,998", flag: true }
            ]
        },
        {
            city: "江苏",
            sales: "23,252",
            flag: false,
            brands: [
                { name: "可爱多", num: "2,156", flag: false },
                { name: "娃哈哈", num: "2,456", flag: true },
                { name: "喜之郎", num: "9,737", flag: true },
                { name: "八喜", num: "2,080", flag: true },
                { name: "小洋人", num: "8,724", flag: true },
                { name: "好多鱼", num: "1,770", flag: false }
            ]
        },
        {
            city: "山东",
            sales: "20,760",
            flag: true,
            brands: [
                { name: "可爱多", num: "9,567", flag: true },
                { name: "娃哈哈", num: "2,345", flag: false },
                { name: "喜之郎", num: "9,037", flag: false },
                { name: "八喜", num: "1,080", flag: true },
                { name: "小洋人", num: "4,724", flag: false },
                { name: "好多鱼", num: "9,999", flag: true }
            ]
        }
    ];

    //  2. 根据数据渲染各省热销 sup 模块内容
    // (1) 遍历hotData对象
    var supHTML = "";

    $.each(hotData, function (index, item) {
        supHTML += `<li><span>${item.city}</span><span>${item.sales} <s class=${item.flag ? "icon-up" : "icon-down"}></s></span></li>`;
    })
    $('.sup').html(supHTML);

    // 3. 当鼠标进入 tab 的时候
    // 鼠标经过当前的小li要高亮显示
    // 注意，sup中li是通过每次获取数据插入到sup的div中的，所以这里要用事件委托

    // that为鼠标经过sup中的哪个li的jQuery对象
    function render(that) {
        that
            .addClass('active')
            .siblings()
            .removeClass('active');

        // 拿到当前城市的品牌对象
        var current = that.index();
        var currentBrands = hotData[current].brands;
        var subHTML = "";

        $.each(currentBrands, function (index, brand) {
            subHTML += `<li><span>${brand.name}</span><span>${brand.num} <s class=${brand.flag ? "icon-up" : "icon-down"}></s></span></li>`;
        })

        $('.sub').html(subHTML);
    }

    $('.province .sup').on('mouseenter', 'li', function () {
        index = $(this).index();
        render($(this));
    });

    // 4. 默认把sup中第一个li处于鼠标经过状态
    var lis = $('.province .sup li');
    lis.eq(0).mouseenter();

    // 5. 开启定时器
    var index = 0;
    var timer = setInterval(function () {
        index++;
        if (index >= 5) index = 0;

        render(lis.eq(index));
    }, 2000)

    $('.province .sup').hover(
        function () {
            clearInterval(timer);
        },
        function () {
            clearInterval(timer);
            timer = setInterval(function () {
                index++;
                if (index >= 5) index = 0;

                render(lis.eq(index));
            }, 2000)
        }
    );
})();
