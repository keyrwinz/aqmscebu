// eslint-disable-next-line import/prefer-default-export
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
    {
      id: 'usc-mc', lat: 10.299974, lng: 123.898434, text: 'USC MC NODE',
    },
    {
      id: 'usc-sc', lat: 10.300467, lng: 123.887958, text: 'USC SC NODE',
    },
    // {
    //   // [NODE_ID: string], [latitude: number], [longitude: number], [text: string]
    //   id: 'NODE_ID', lat: <latitude>, lng: <longitude>, text: 'TEXT TO DISPLAY FOR THIS NODE'
    // },
  ],
}
