initEditor()
getlist()
function getlist() {
  $.ajax({
    method: 'GET',
    url: '/my/article/cates',  
    success: function(res) {
      console.log(res);
      if (res.status !== 0) return layer.msg('获取列表失败！')
      const temp = template('getlist', res) 
      console.log(temp);
      $('#listt').html(temp)
      layui.form.render()
    }
  })
}


  // 1. 初始化图片裁剪器
  var $image = $('#image')
  
  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }
  
  // 3. 初始化裁剪区域
  $image.cropper(options)

  $('#btn').click(function() {
    $('#ipt').click()
  })

  $('#ipt').on('change', function(e) {
    if(e.target.files.length === 0) return '请选择文件'
    var file = e.target.files[0]
    var newImgURL = URL.createObjectURL(file)
    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域
   
  })

  let art_states = '已发布'
  $('#save').click(function(e) {
    // e.preventDefault()
    art_states = '草稿'

  })
  $('#form').submit(function(e) {
    e.preventDefault()
    let fd = new FormData($(this)[0])
    fd.append('state', art_states)
    $image
    .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
      width: 400,
      height: 280
    })
    .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
      // 得到文件对象后，进行后续的操作
      fd.append('cover_img', blob)
      fd.forEach(function(v,k) {
        console.log(v, k);
      })
      publishArticle(fd)
    })

    function publishArticle(fd) {
      $.ajax({
        method: 'POST',
        url: '/my/article/add',
        data: fd,
        // 注意：如果向服务器提交的是 FormData 格式的数据，
        // 必须添加以下两个配置项
        contentType: false,
        processData: false,
        success: function(res) {
          if (res.status !== 0) {
            return layer.msg('发布文章失败！')
          }
          console.log(res);
          layer.msg('发布文章成功！')
          // 发布文章成功后，跳转到文章列表页面
          location.href = '/article/article_list.html'
        }
      })
    }
  })