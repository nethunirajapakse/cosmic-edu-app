// app/services/api.ts

const APOD_URL =
  "https://api.nasa.gov/planetary/apod?api_key=1pKc1yufNvxAD8CCJoehC1TldqrbCrajcghR9tpe";

export const fetchImage = async () => {
  try {
    const response = await fetch(APOD_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching image: ", error);
    throw error;
  }
};

const NASA_IMAGES_URL =
  "https://images-api.nasa.gov/search?q=galaxy&media_type=image&page_size=10&year_start=2018";
//"https://images-api.nasa.gov/search?q=solar+system+OR+planets+OR+moons+OR+asteroids+OR+comets+OR+stars&media_type=image&page_size=6&year_start=2018";

export const fetchGalaxyData = async () => {
  try {
    const response = await fetch(NASA_IMAGES_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.collection.items;
  } catch (error) {
    console.error("Error fetching galaxy data: ", error);
    throw error;
  }
};
