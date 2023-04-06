import h337 from './heatmap';
  
var root;

class GetGrafs
{

    constructor(){

        this.url = '/statistic';
        this.selectSites =  $( "#sitesSelect" );

        this.Init();
    }

    Init(){

    if(this.selectSites.length){

        this.getClickMapParams(this.selectSites.val());
        this.selectSites.change(e =>{ this.getClickMapParams(this.selectSites.val()); });

    }
    
    }

    getClickMapParams(site){

        this.site = site;

        this.dataParams ={
            "_token": token,
            "site": this.site,
            "action":"getClickMap",

        }

        this.AjaxSend();
        this.getHeatMapParams();

    }

    AjaxSend(){

        $.ajax({
            url: this.url,
            type:"POST",
            data:this.dataParams,
            success:(data)=>{this.getGraf(data)},
        });

    }

    getHeatMapParams(){

        this.dataParams ={
            "_token": token,
            "site": this.site,
            "action":"getHeatMap",
        }

        this.AjaxSend();
    
    }

    showClickMap(arData){

        if(root){
            root.dispose();
        }
        
        am5.ready(function() {

            root = am5.Root.new("chartdiv");

            root.setThemes([
                am5themes_Animated.new(root)
            ]);

            var chart = root.container.children.push(am5xy.XYChart.new(root, {
                panX: false,
                panY: false,
                wheelX: "none",
                wheelY: "none",
                layout: root.verticalLayout
            }));

            var yRenderer = am5xy.AxisRendererY.new(root, {
                visible: false,
                minGridDistance: 20,
                inversed: true
            });

            yRenderer.grid.template.set("visible", false);

            var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
                maxDeviation: 0,
                renderer: yRenderer,
                categoryField: "weekday"
            }));

            var xRenderer = am5xy.AxisRendererX.new(root, {
                visible: false,
                minGridDistance: 30,
                opposite:true
            });

            xRenderer.grid.template.set("visible", false);

            var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
                renderer: xRenderer,
                categoryField: "hour"
            }));

            var series = chart.series.push(am5xy.ColumnSeries.new(root, {
                calculateAggregates: true,
                stroke: am5.color(0xffffff),
                clustered: false,
                xAxis: xAxis,
                yAxis: yAxis,
                categoryXField: "hour",
                categoryYField: "weekday",
                valueField: "value"
            }));

            series.columns.template.setAll({
                tooltipText: "{value}",
                strokeOpacity: 1,
                strokeWidth: 2,
                width: am5.percent(100),
                height: am5.percent(100)
            });

            series.columns.template.events.on("pointerover", function(event) {
                var di = event.target.dataItem;
                if (di) {
                    heatLegend.showValue(di.get("value", 0));
                }
            });

            series.events.on("datavalidated", function() {
            heatLegend.set("startValue", series.getPrivate("valueHigh"));
            heatLegend.set("endValue", series.getPrivate("valueLow"));
            });


            series.set("heatRules", [{
                target: series.columns.template,
                min: am5.color(0xfffb77),
                max: am5.color(0xfe131a),
                dataField: "value",
                key: "fill"
            }]);


            var heatLegend = chart.bottomAxesContainer.children.push(am5.HeatLegend.new(root, {
                orientation: "horizontal",
                endColor: am5.color(0xfffb77),
                startColor: am5.color(0xfe131a)
            }));

            var data=[];
            var dateList=[];
            var hoursList=[];

            arData.forEach(element => {

                data.push({
                    hour:element.hour,
                    weekday: element.date,
                    value: Number(element.count)
                });

                dateList.push(element.date);

                hoursList.push(element.hour);

            });

            let unicHour= Array.from(new Set(hoursList));
            var unicHourObj=[];

            unicHour.forEach(element => {
                unicHourObj.push({
                    hour: element,
                } );
            });

            let unicDate= Array.from(new Set(dateList));
            var unicDateObj=[];

            unicDate.forEach(element => {
                unicDateObj.push({
                    weekday: element,
                } );
            });

            series.data.setAll(data);
            yAxis.data.setAll(unicDateObj);
            xAxis.data.setAll(unicHourObj);

            chart.appear(1000, 100);
        }); 
    }

    showHeatkMap(arData){

        $('#heatmapContainer').html('');
        var heatmap = h337.create({
        container: document.getElementById('heatmapContainer')
        });

        let dataPoints = [];
        arData.forEach(element => {

            dataPoints.push({
                x:element.posX,
                y: element.posY,
                value: 1
            });

        });

        heatmap.setData({
        max: 5,
        data: dataPoints
        });

    }   

    getGraf(arData){

          switch (arData.success['map']) {

              case 'click':

                  this.showClickMap(arData.success['vals']);

              break;

              case 'heat':
                  
                  this.showHeatkMap(arData.success['vals']);

              break;
          
              
          }

         
    }
}

let grafs = new GetGrafs();