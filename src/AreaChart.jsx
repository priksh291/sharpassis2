import React,{useState,useEffect} from 'react'
import Chart from "react-apexcharts";


const AreaChart = () => {

  const [getdata,setGetdata] = useState([]);
  const [xCoordinates, setXCoordinates] = useState([]);
  const [yCoordinates, setYCoordinates] = useState([]);
  useEffect(()=>{
    const getCommitdata = async() =>{
      const reqData = await fetch("https://api.llama.fi/summary/fees/lyra?dataType=dailyFees");
      const resData = await reqData.json();
      console.log(await resData);

      const totalDataChart = resData.totalDataChart || [];
      const xValues = totalDataChart.map((item) => item[0]);
      const yValues = totalDataChart.map((item) => item[1]);

      // Update the state variables
      setXCoordinates(xValues);
      setYCoordinates(yValues);

    }
    getCommitdata();
  },[])

  
  return (
    <React.Fragment>
      
      <Chart 
      type='area'
      width={1680}
      height={650}

      series={[
        {
          name:'coordinates',
          data: yCoordinates
        }
      ]}

      options={{
        title:{
          text:'AreaChart assigment',
          style:{fontSize:20}
        },

        colors:['#87ceeb'],
        stroke:{width:0,curve:'smooth'},
        // fill:{opacity:5,type:'solid'},

        xaxis:{
          title:{text:"x corrdinates", style:{fontSize:20}},
          
        categories:xCoordinates
        },

        yaxis:{
          title:{text:'y cordinates',style:{fontSize:20}},
          
          categories:yCoordinates
          },


        }
        
      }
      
      >

      </Chart>
      
    </React.Fragment>
  )
}

export default AreaChart
