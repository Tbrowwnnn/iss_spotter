const request = require('request');

const fetchMyIP = function(callback) {

  request("https://api.ipify.org?format=json", (error, response, body) => {

    if (error) {
      callback(error);
      return console.log(error);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body);

    return callback(null, ip);
  });

};

const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {

  if(error){
    callback(error, null);
    return;
  }

  const data = JSON.parse(body);

  if(!data.success){
    const message = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`
    callback(Error(message), null);
    return;
  }

  const { latitude, longitude } = data;
  
  return callback(null, { latitude, longitude }); 
  })
};

const fetchFlyoverTime = function(coords, callback){
  
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {

  if(error){
    callback(error, null)
    return;
  }

  
  if(response.statusCode !== 200){
    callback(`Status code ${response.statusCode} when fetching ISS flyover time: ${body}.`,null)
    
    return;
  }

  const riseAndDur = JSON.parse(body).response;

  return callback(null, riseAndDur)

  // console.log(riseAndDur);
  })
}

const nextISSTimesForMyLocation = function(callback){
 return callback()



}

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchFlyoverTime,
  nextISSTimesForMyLocation
};