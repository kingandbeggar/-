$('.layui-footer').css('text-align', 'center')
getuserinfo()

function getuserinfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',    
    success: function(res) {   
      if (res.status !== 0) {
        return 
      }
      render(res.data)
    }    
  })
}

// 头像渲染
function render(data) {
  if (data.user_pic) {
    $('.userinfo img').attr('src', data.user_pic).show()
    $('.avatar').hide()

  } else {
    $('.userinfo img').hide()
    $('.avatar').show()
  }
  const username = data.nickname || data.username
  $('.avatar').text(username[0].toUpperCase())
  $('.welcome').text('欢迎' + username)

}

// 退出
$('#out').click(() => {
  let layer = layui.layer
  layer.confirm('确认退出?', {icon: 3, title:'提示'}, function(index){
    location.href = '/login.html'
    localStorage.removeItem('token')
    
    layer.close(index);
  });
})