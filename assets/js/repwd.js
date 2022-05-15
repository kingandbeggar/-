// 表单校验规则
let form = layui.form
let layer = layui.layer
form.verify({
  oldPwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'], 
  newPwd: function(value) {
    const oldpwd = $('.layui-form [name="oldPwd"]').val()
    if(oldpwd === value) {
      return '两次密码不能一致'
    }
  },
  repwd: function(value) {
    if (value !== $('.layui-form [name="newPwd"]').val()) {
      return '两次密码不一致'
    }
  }  
})
$('.layui-form').on('submit', function(e) {
  e.preventDefault()
  console.log(1);
  $.ajax({
    method: 'POST',
    url: '/my/updatepwd',
    data: $(this).serialize(),
    success: function(res) {
      if (res.status !== 0) return layui.layer.msg('更新密码失败！')
      layui.layer.msg('更新密码成功！')
      $('.layui-form')[0].reset()
    }
  })
})

// 重置
$('.resetbtn').click(function() {
  $('.layui-form')[0].reset()
})

