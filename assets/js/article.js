getarticle()
function getarticle() {
  $.ajax({
    method: 'GET',
    url: '/my/article/cates',  
    success: function(res) {
      if (res.status !== 0) return layer.msg('获取列表失败！')
      layer.msg('获取列表成功！')
      const temp = template('temp', res) 
      $('tbody').html(temp)
    }
  })
}
let indexadd = null
$('#add').click(() => {
  indexadd = layer.open({
    type: 1,
    area: ['500px', '300px'],
    title: '添加文章分类'
    ,content: $('#addcate').html()
  });     
    
})

$('body').on('submit', '#formadd', function(e) {
  e.preventDefault()
  $.ajax({
    method: 'POST',
    url: '/my/article/addcates',
    data: $(this).serialize(),
    success: function(res) {
      console.log(res);
      if (res.status !== 0) return layui.layer.msg('新增文章分类成功！')
      getarticle()
      layer.close(indexadd)
      layui.layer.msg('新增文章分类成功！')
    }
  })
})

let indexedit = null
$('tbody').on('click', '#edit', function(e) {
  indexedit = layer.open({
    type: 1,
    area: ['500px', '300px'],
    title: '修改文章分类'
    ,content: $('#editcate').html()
  });  
  const id = $(this).attr('data-id')
  console.log(id);
  $.ajax({
    method: 'GET',
    url: '/my/article/cates/' + id,      
    success: function(res) {
      if (res.status !== 0) return layer.msg('获取文章分类数据失败！')

      layui.form.val('form-edit', res.data)
    }
  })
})

$('body').on('submit', '#formedit', function(e) {
  e.preventDefault()
  $.ajax({
    method: 'POST',
    url: '/my/article/updatecate',
    data: $(this).serialize(),
    success: function(res) {
      console.log(res);
      if (res.status !== 0) return layui.layer.msg('更新文章分类失败！')
      getarticle()
      layer.close(indexedit)
      layui.layer.msg('更新文章分类成功！')
    }
  })
})


$('tbody').on('click', '#del', function(e) {
  const id = $(this).attr('data-id')
  layer.confirm('删除?', {icon: 3, title:'提示'}, function(index){
    $.ajax({
      method: 'GET',
      url: '/my/article/deletecate/' + id,      
      success: function(res) {
        console.log(res);
        if (res.status !== 0) return layui.layer.msg('删除文章分类失败！')      
        getarticle()
        layui.layer.msg('删除文章分类成功！')
      }    
    })    
    layer.close(index);
  });  
  
})
