let q ={
  pagenum: 1,
  pagesize: 2,
  cate_id: '',
  state: ''
}
getlist()
function getlist() {
  $.ajax({
    method: 'GET',
    url: '/my/article/list',
    data: q,
    success: function(res) {
      console.log(res);
      if (res.status !== 0) return layui.layer.msg(res.message)
      
      const temp = template('list', res)
      $('tbody').html(temp)
      pagerender(res.total)
    }
  })
}
// 过滤器
template.defaults.imports.dataFormat = function(date) {
  const dt = new Date(date)
  const y = dt.getFullYear()
  const m = add(dt.getMonth() + 1)
  const d = add(dt.getDate())
  const h = add(dt.getHours())
  const min = add(dt.getMinutes())
  const s = add(dt.getSeconds())
  return y + '-' + m + '-' + d  + '-' + h + ':' + min + ':' + s
}
function add(n) {
  return n > 9 ? n : '0' + n
}

// 分类
getcate()
function getcate() {
  $.ajax({
    method: 'GET',
    url: '/my/article/cates',
    success: function(res) {
      console.log(res);
      if (res.status !== 0) return layui.layer.msg(res.message)
      
      const temp = template('cate', res)
      $('[name="cate_id"]').html(temp)
      layui.form.render()
    }
  })
}

$('form').submit(function(e) {
  e.preventDefault()  
  q.cate_id = $('[name="cate_id"]').val()
  q.state = $('[name="state"]').val()
  getlist()
})

function pagerender(data) {
  console.log(data);
  layui.laypage.render({
    elem: 'pagebox' //注意，这里的 test1 是 ID，不用加 # 号
    ,count: data ,
    limit: q.pagesize,
    curr: q.pagenum,
    limits: [1, 2, 3, 4, 5],
    layout: ['count', 'limit', 'prev', 'page', 'next','skip'],
    jump: function(obj, first) {
      q.pagenum = obj.curr
      q.pagesize = obj.limit
      if(!first) {
        getlist() 
      }
      
    }
  });
}


$("tbody").on('click', '.btn-del', function() {
  let len = $('.btn-del').length
  console.log(len);
  console.log(q.pagenum);
  let id = $(this).attr('data-id')
  //eg1
layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
  $.ajax({
    method: 'GET',
    url: '/my/article/delete/' + id,
    success: function(res) {
      console.log(res);
      if (res.status !== 0) return layui.layer.msg(res.message)
      layui.layer.msg(res.message)

      if(len === 1) {
        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
      }
      getlist() 
    }
  })
  
  layer.close(index);
});
})