export const G_MAPS_API = (method, coords, body) => {
  let options = {
    method: method,
    body: JSON.stringify(body),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  return fetch(
    `https://roads.googleapis.com/v1/nearestRoads?points=${coords.lat},${
      coords.lng
    }|47.815899,35.170246&key=AIzaSyDR5dtYn2uoLVh_Mvz7kjBlmCXtM9UoItg`,
    options,
  ).then(res => {
    return res.json();
  });
};
