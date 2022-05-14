$(function() {
  $('#reg').on('click', () => {
    $('.sign').hide()
    $('.login').show()
  })
  $('#login').on('click', () => {
    $('.sign').show()
    $('.login').hide()
  })
  
  // 表单校验规则
  let form = layui.form
  let layer = layui.layer
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'], 
    repwd: function(value) {
    const password = $('.login [name=password]').val()
    if(password !== value) {
      return '两次密码不一致'
    }
    }
  })
})
// 注册
$('#loginform').on('submit', function(e) {
  e.preventDefault()
  let data = {username: $('#loginform [name="username"]').val(), password: $('#loginform [name="password"]').val()}
  $.post('/api/reguser', data, (res) => {
    if(res.status !== 0) {
      return layer.msg(res.message); 
    }
    layer.msg(res.message); 
    $('#login').click()
  })
})
// 登录
$('#formsign').submit(function(e) {
  e.preventDefault()
  $.ajax({
    url: '/api/login',
    method:'POST',
    data: $(this).serialize(),
    success: function(res) {
      if(res.status !== 0) return layer.msg(res.message); 
      layer.msg(res.message); 
      console.log(res);
      location.href = '/index.html'
      localStorage.setItem('token', res.token)
    }
  })
})