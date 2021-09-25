import moment from 'moment';
import './Copyright.css';

const Copyright = props => {
  return <small className='mt-1'>Copyright © 2021-{moment().format('yyyy')} {props.name ?? "Fitness"} | a <a href="https://joemart.in/" target="_blank" rel='noreferrer'>joemart.in</a> application. All Rights Reserved</small>;
};

export default Copyright;
