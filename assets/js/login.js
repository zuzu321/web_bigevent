$(function () {
    //点击注册按钮跳转注册页面
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    // 点击登录按钮的时候
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })

    // 从layui中获取form对象
    const form = layui.form;
    const layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            const pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致';
            }
        }
    })
    $('#form_reg').submit(function (e) {
        //   阻止默认的提交行为
        e.preventDefault()
        // 发起ajax的post请求
        $.ajax({
            url: '/api/reguser',
            method: 'POST',
            data: {
                username: $('.reg-box [name="username"]').val(),
                password: $('.reg-box [name="password"]').val(),
            },
            success(res) {
                if (res.status !== 0) {
                    console.log(res.message || '注册失败');
                    return layer.msg(res.message);
                }
                layer.msg('注册成功');
                $('#link_login').click();
            }
        })
    })

    // 监听 登录表单的提交文件
    $('#form_login').submit(function (e) {
        // 阻止默认提交行为
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})


