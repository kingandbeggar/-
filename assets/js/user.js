// 表单校验规则
let form = layui.form
let layer = layui.layer
form.verify({
  nickname: function(value) {
    if (value.length > 6) {
      return '不能超过6位字符'
    }
  }
})
getuserinfo()
function getuserinfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    success: function(res) {
      console.log(res);
      if (res.status !== 0) return layer.msg('获取用户信息失败');
      form.val('formdata', res.data)
    }
  })
}

$('#resetbtn').click(function(e) {
  e.preventDefault()
  getuserinfo()
})
$('.layui-form').submit(function(e) {
  e.preventDefault()
  $.ajax({
    method: 'POST',
    url: '/my/userinfo',
    data: $(this).serialize(),
    success: function(res) {
      console.log(res);
      if (res.status !== 0) return layer.msg('修改用户信息失败');
      layer.msg('修改用户信息成功');
      window.parent.getuserinfo()
    }
  })
})