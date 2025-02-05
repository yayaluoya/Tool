import 'core-js';

const { Clipboard } = require('yayaluoya-tool/dist/web/Clipboard');
const { MathUtils } = require('yayaluoya-tool/dist/MathUtils');
const { TimeUtils } = require('yayaluoya-tool/dist/TimeUtils');
const { ObjectUtils } = require('yayaluoya-tool/dist/obj/ObjectUtils');
import { getSpanRect } from 'yayaluoya-tool/dist/web/getSpanRect';

console.log('web端的测试');

require('./objProxy');
require('./base64');
require('./URLTool');
require('./fileT');
require('./instanceT');
require('./BaseEvent');
require('./BaseWS');
require('./objT');
require('./ArrayT');
require('./Crypto');
require('./api');
require('./baseItemTool');
require('./msg');
require('./time');

window.Clipboard = Clipboard;

window.TimeUtils = TimeUtils;
window.MathUtils = MathUtils;
window.ObjectUtils = ObjectUtils;
console.log(2);
require('yayaluoya-tool/dist/index');
import 'yayaluoya-tool/dist/index';

console.log(1);

require('./ie11/index');

console.log(
  '一段文字的尺寸',
  getSpanRect('一段文字的尺寸', {
    fontSize: '16px',
  }),
);
