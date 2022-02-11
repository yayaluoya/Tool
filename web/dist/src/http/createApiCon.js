/** 父对象键名 */
const parentObjKeyName = Symbol();
/** key值键名 */
const keyKeyName = Symbol();
/**
 * 创建api控制器
 * @param _rootPath 根路径
 * @param _apiObj api对象
 * @param _op 选项
 */
export function createApiCon(_rootPath, _apiObj, _op) {
    //初始化
    _op = Object.assign({ pathNodeKeyName: 'pathNode' }, _op);
    /** 递归创建api控制器 */
    function traverse(_apiObj) {
        for (let [_i, _item] of Object.entries(_apiObj)) {
            //如果值是方法的话
            if (typeof _item == 'function') {
                //重新赋值一个绑定了代理对象的方法
                _apiObj[_i] = _item.bind(getPathObjProxy(_apiObj));
            }
            else if (typeof _item == 'object' && _item) {
                //设置父对象
                _item[parentObjKeyName] = _apiObj;
                //设置键名
                _item[keyKeyName] = _i;
                //递归
                traverse(_item);
            }
        }
    }
    /** 获取一个路径对象代理 */
    function getPathObjProxy(_apiObj) {
        return new Proxy({}, {
            get(_, p) {
                switch (true) {
                    case /^\$?(path|api)$/i.test(p):
                        //返回一个整理好的路径
                        return _rootPath.replace(/\/+$/, '') + '/' + byApiObjGetPath(_apiObj, _op.pathNodeKeyName).replace(/^\/+/, '').replace(/\/+/g, '/');
                }
            },
        });
    }
    //
    traverse(_apiObj);
    //
    return _apiObj;
}
/** 通过api对象获取路径 */
function byApiObjGetPath(_obj, _nodeName) {
    if (!_obj[parentObjKeyName]) {
        return '';
    }
    let _left = byApiObjGetPath(_obj[parentObjKeyName], _nodeName);
    return (_left ? `${_left}/` : '') + (_obj[_nodeName] || _obj[keyKeyName]);
}
//# sourceMappingURL=createApiCon.js.map