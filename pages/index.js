import React, {useState} from 'react'
export default () =>  {
  const [str, setStr] = useState('我想在这搞个报表，好不好?')
  return <h1 onClick={() => setStr('你妹的，我只是说说而已~')}>{str}</h1>
}
