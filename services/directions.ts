export const getDirections = async (
    startLat: number, 
    startLon: number, 
    endLat: number, 
    endLon: number
  ) => {
    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${startLon},${startLat};${endLon},${endLat}?overview=full&geometries=geojson`
    );
  
    if (!response.ok) throw new Error('Failed to fetch directions');
  
    const data = await response.json();
    
    if (!data.routes?.[0]) throw new Error('No route found');
  
    const coordinates = data.routes[0].geometry.coordinates.map(
      ([longitude, latitude]: number[]) => ({
        latitude,
        longitude,
      })
    );
  
    return {
      coordinates,
      distance: `${(data.routes[0].distance / 1000).toFixed(1)} km`,
      duration: `${Math.round(data.routes[0].duration / 60)} min`
    };
  };