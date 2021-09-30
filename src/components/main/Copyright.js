import moment from 'moment';
import './Copyright.css';

const Copyright = props => {
  const name = props.name ?? "Fitness";
  const year = moment().format('yyyy');
  const href = "https://joemart.in/";
  const site = <a href={href} target="_blank" rel='noreferrer'>joemart.in</a>;
  return <small className='mt-1'>
    Copyright © 2021-{year} {name} | a {site} application. All Rights Reserved
  </small>;
};

export default Copyright;
