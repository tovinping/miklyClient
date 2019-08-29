import React, {useState} from 'react'
import { Icon, Modal, message } from 'antd'
import {uploadImg} from '../../api/common'
import styles from './EditorImgs.less'
export default React.forwardRef(({uploaded}, ref) => {
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [bigImg, setBigImg] = useState('')
  function handleDelete(e, url) {
    e.stopPropagation()
    const fileArr = files.filter(item => item !== url)
    setFiles(fileArr)
    uploaded(fileArr)
  }
  function handlePreview(url) {
    setBigImg(url)
    setVisible(true)
  }
  function upLoading(event) {
    const file = event.target.files[0]
    if (!file) return
    setUploading(true)
    uploadImg(file).then(({url}) => {
      const fileArr = files.concat([url])
      setFiles(fileArr)
      uploaded(fileArr)
      setUploading(false)
    }).catch(e=>{
      console.log(e)
      setUploading(false)
      message.error('图片上传失败')
    })
  }
  function addImg() {
    const fileElement = document.getElementById('file')
    fileElement.click()
  }
  const uploadBtn = (
    <div className={styles.addBtn} onClick={addImg}>
      <Icon style={{display: uploading? 'none': 'block'}} className={styles.addIcon} type="plus" />
      <Icon style={{display: uploading? 'block': 'none'}} className={styles.addIcon} type="loading" />
      <input ref={ref} type="file" id='file' accept="image/*" style={{display: 'none'}} onChange={upLoading}/>
      <span>Upload</span>
    </div>
  )
  return (
    <>
      <div style={{display: 'flex'}}>
        {
          files.map(url => 
          <span 
            className={styles.imgItem} 
            style={{background: `url(${url})`}} 
            key={url}
            onClick={() => handlePreview(url)}
          ><Icon className={styles.deleteIcon} type="delete" onClick={(e) => handleDelete(e, url)} /></span>)
        }
        {files.length >= 3 ? null : uploadBtn}
      </div>
      <Modal visible={visible} footer={null} onCancel={() => setVisible(false)}>
        <img alt="preview" style={{ width: '100%' }} src={bigImg} />
      </Modal>
    </>
  )
})