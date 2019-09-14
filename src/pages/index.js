import {useState} from 'react'
export default () =>  {
  const [str, setStr] = useState('我想在这搞个报表，好不好???')
  return <h1 onClick={() => setStr('我正在构思中~')}>{str}</h1>
}
