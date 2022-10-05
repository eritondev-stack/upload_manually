import React, { useState } from "react";
import ApexCharts from "apexcharts";
import { useEffect } from "react";
import { useRef } from "react";
import {  IAncor, IProjectsv2 } from "../../models";


var chart: ApexCharts;

interface Props {
  readonly nameProp?: string;
  handleEvent: () => void;
  ancor: IAncor;
  projects: IProjectsv2[];
}

function ChartDashboardAreas({ nameProp, handleEvent, ancor, projects }: Props) {

  const divRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [show, setShow] = useState(false);


  function renderCharts() {
    
    let seriesAlter: number[] = []



    ancor.tbStatusCurrent.forEach((item) => {
      const total = projects.filter((el) => el.status_current.nome === item.nome).length
      seriesAlter.push(total)
    })



    var options = {
      series: [{
        data: seriesAlter
      }],
      colors: ancor.tbStatusCurrent.map((item) => item.color),
      chart: {
        type: "bar",
        events: {
          dataPointSelection: handleEventCharts,
        },
        toolbar: {
          show: false
        },
      },
      legend: {
        show: false,
        position: "bottom",
      },
      tooltip: {
          enabled: false,
      }
    };
    
    //Handle Event Charts
    function handleEventCharts(
      event: MouseEvent,
      chartContext: any,
      config: any
    ) {
      handleEvent()
    }

    chart = new ApexCharts(divRef.current, options);
    chart.render()
    // chart.toggleDataPointSelection = handleEventCharts
  }

  useEffect(() => {
    //'Component montado  
    renderCharts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {

   /*  chart.updateSeries([1,1,1,1,1,1]) */
  }, []);


  useEffect(() => {
    //Component desmontado
    return () => {}
  })



  return (
    <div className="flex flex-row justify-center">
      <div
        style={{
          width: 350,
        }}
        className="relative"
      >
        <div className="relative z-20">
          <div
            ref={divRef}
            id="chart"
            style={{
              width: 350,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ChartDashboardAreas;
