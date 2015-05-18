/**
 * Created by lee on 2015/4/29.
 */
$(function () {
    $("#set").click(
        function () {
            var name = $.trim($("#name").val());
            var age = $.trim($("#age").val());
            var address = $.trim($("#address").val());
            $.get("/ms_save/", {
                    'name': name,
                    'age': age,
                    'address': address
                },
                function (jsons) {
                    alert(jsons)
                    window.location.reload()
                })
        }
    )
});

function deletes(ide) {
    $.get("/ms_delete/", {
            'id': ide
        },
        function (jsons) {
            alert(jsons)
            window.location.reload()
        })
}

function update(ide) {
    var name = $.trim($("#rname_" + ide).val());
    var age = $.trim($("#rage_" + ide).val());
    var address = $.trim($("#raddress_" + ide).val());
    $.get("/ms_update/", {
            'id': ide,
            'name': name,
            'age': age,
            'address': address
        },
        function (jsons) {
            alert(jsons)
            window.location.reload()
        })
}

function getSelected() {
    var row = $('#mangodata').datagrid('getSelected');
    if (row) {
        $.messager.alert("提示", "name:" + row.name + "age:" + row.age + "address:" + row.address);
    }
}
function submitForm() {
    $('#mongo_form').form('submit', {
        url: url,
        onSubmit: function () {

        },
        success: function (data) {
            $.messager.alert('提示', data, 'info');
            $('#data').window('close');
            clearForm();
            $('#mangodata').datagrid('reload');
        }
    });
}

function clearForm() {
    $('#mongo_form').form('clear');
}

var toolbar = [{
    text: '添加数据',
    iconCls: 'icon-add',
    handler: function () {
        $('#data').window('open').window("setTitle", "添加用户");
        url = "mongo_add";
    }
}, {
    text: '修改数据',
    iconCls: 'icon-cut',
    handler: function () {
        var row = $('#mangodata').datagrid('getSelected');
        if (row) {
            $('#data').window('open').window("setTitle", '修改用户');
            $("#mongo_form").form('load', row);
            url = "mongo_update";
        }
    }
}, {
    text: '删除数据',
    iconCls: 'icon-cut',
    handler: function () {
        var row = $('#mangodata').datagrid('getSelected');
        if (row) {
            $.get("/mongo_delete/", {
                    'name': row.name
                },
                function (data) {
                    $.messager.alert('提示', data, 'info');
                    $('#mangodata').datagrid('reload');
                })
        }
    }
}, '-', {
    text: '展示数据',
    iconCls: 'icon-save',
    handler: function () {
        alert(getSelected())
    }
}];

$('#data').pagination({
    pageSize: 10,
    pageList: [5, 10, 15],//可以设置每页记录条数的列表
    beforePageText: '第',//页数文本框前显示的汉字
    afterPageText: '页    共 {pages} 页',
    displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
})