// eslint-disable-next-line import/prefer-default-export
export const Routes = [
  {
    route: '/',
    text: 'Home',
  },
  {
    route: '/data',
    text: 'Data',
  },
  {
    route: '/about',
    text: 'About',
  },
]

export const SocialMediaLinks = [
  { text: 'Github', icon: 'Github', route: 'https://github.com/keyrwinz/aqmscebu' },
  { text: 'Facebook', icon: 'Facebook', route: 'Facebook' },
  { text: 'Twitter', icon: 'Twitter', route: 'Twitter' },
  { text: 'Instagram', icon: 'Instagram', route: 'Instagram' },
]

export const AirMonitoringNodes = {
  center: { lat: 10.3157, lng: 123.8854 },
  zoom: 13,
  nodesLoc: [
    /**
     * @param { string } id -> Used to display selected node in UI
     * @param { string } text -> Used to display as suggested text in search bar
     * @param { number } lat_and_lng -> Latitude and Longitude
     */
    {
      id: 'usc-mc', lat: 10.299974, lng: 123.898434, text: 'University of San Carlos, Main Campus', locality: 'Cebu City',
    },
    {
      id: 'usc-sc', lat: 10.300467, lng: 123.887958, text: 'University of San Carlos, South Campus', locality: 'Cebu City',
    },
    {
      id: 'test-data', lat: 10.3167542, lng: 123.9078344, text: 'Dummy Data, Ayala Center Cebu', locality: 'Cebu City',
    },
    {
      id: 'test-usc-mc-1', lat: 10.296557, lng: 123.898521, text: 'University of San Carlos, Main Campus - Test1', locality: 'Cebu City',
    },
    {
      id: 'test-usc-mc-2', lat: 10.306557, lng: 123.908521, text: 'University of San Carlos, Main Campus - Test2', locality: 'Cebu City',
    },
  ],
}
