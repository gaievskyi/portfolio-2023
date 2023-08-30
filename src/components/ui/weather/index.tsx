export const Weather = ({ temperature = 0 }) => (
  <small className="copyright">{temperature.toFixed()}&#8451; @ Warsaw</small>
)
