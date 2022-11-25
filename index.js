const {fetchMyIP, fetchCoordsByIP, fetchFlyoverTime, nextISSTimesForMyLocation} = require('./iss');


fetchMyIP((error, ip) => {
  if(error){
    console.log("it didn't work!", error);
    return;
  }

  ip;

  fetchCoordsByIP(ip.ip, (error, data) => {

    if(error){
      console.log("It didn't work!", error)
      return;
    }
    data;

    fetchFlyoverTime(data, (error, time) => {

      if(error){
        console.log("It didn't work!", error)
        return;
      }
        time;

       
       for(const pass in time){
        const datetime = new Date(0);
        datetime.setUTCSeconds(time[pass].risetime);
        const duration = time[pass].duration;
        
        console.log(`Next pass at ${datetime} for ${duration} seconds!`)
      }


          nextISSTimesForMyLocation((error, time) => {
            if(error){
              return console.log("It didn't work!", error)
              }
              

              
              
              
          //   for(let seconds in time){

          // times.setUTCSeconds(time[seconds].risetime);

          // passTimes = `Next Pass at ${Date(times)} for ${Number(time[seconds].duration)} seconds!`;

          
        })

       

      
        
      })
    })
  })




