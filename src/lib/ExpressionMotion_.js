
//============================================================
//============================================================
//  class L2DExpressionMotion  extends     AMotion
//============================================================
//============================================================
function L2DExpressionMotion() {
    AMotion.prototype.constructor.call(this);
    this.paramList = new Array(); //ArrayList<L2DExpressionParam>
}

L2DExpressionMotion.prototype = new AMotion(); // L2DExpressionMotion extends AMotion

//============================================================
L2DExpressionMotion.EXPRESSION_DEFAULT = "DEFAULT";
L2DExpressionMotion.TYPE_SET = 0;
L2DExpressionMotion.TYPE_ADD = 1;
L2DExpressionMotion.TYPE_MULT = 2;

//============================================================
//    static L2DExpressionMotion.loadJson()
//============================================================
L2DExpressionMotion.loadJson = function (buf) {
    var ret = new L2DExpressionMotion();

    var pm = Live2DFramework.getPlatformManager();
    var json = pm.jsonParseFromBytes(buf);

    ret.setFadeIn(parseInt(json.fade_in) > 0 ? parseInt(json.fade_in) : 1000);
    ret.setFadeOut(parseInt(json.fade_out) > 0 ? parseInt(json.fade_out) : 1000);

    if (json.params == null) {
        return ret;
    }

    var params = json.params;
    var paramNum = params.length;
    ret.paramList = []; //ArrayList<L2DExpressionParam>
    for (var i = 0; i < paramNum; i++) {
        var param = params[i];
        var paramID = param.id.toString();
        var value = parseFloat(param.val);
        var calcTypeInt = L2DExpressionMotion.TYPE_ADD;
        var calc = param.calc != null ? param.calc.toString() : "add";
        if (calc === "add") {
            calcTypeInt = L2DExpressionMotion.TYPE_ADD;
        }
        else if (calc === "mult") {
            calcTypeInt = L2DExpressionMotion.TYPE_MULT;
        }
        else if (calc === "set") {
            calcTypeInt = L2DExpressionMotion.TYPE_SET;
        }
        else {
            calcTypeInt = L2DExpressionMotion.TYPE_ADD;
        }
        if (calcTypeInt == L2DExpressionMotion.TYPE_ADD) {
            var defaultValue = param.def == null ? 0 : parseFloat(param.def);
            value = value - defaultValue;
        }
        else if (calcTypeInt == L2DExpressionMotion.TYPE_MULT) {
            var defaultValue = param.def == null ? 1 : parseFloat(param.def);
            if (defaultValue == 0) defaultValue = 1;
            value = value / defaultValue;
        }

        var item = new L2DExpressionParam();
        item.id = paramID;
        item.type = calcTypeInt;
        item.value = value;

        ret.paramList.push(item);
    }

    return ret;
}


//============================================================
//    L2DExpressionMotion # updateParamExe()
//============================================================
L2DExpressionMotion.prototype.updateParamExe = function (model /*ALive2DModel*/, timeMSec/*long*/, weight /*float*/, motionQueueEnt /*MotionQueueEnt*/) {
    for (var i = this.paramList.length - 1; i >= 0; --i) {
        var param = this.paramList[i]; //L2DExpressionParam
        // if (!param || !param.type) continue;
        if (param.type == L2DExpressionMotion.TYPE_ADD) {
            model.addToParamFloat(param.id, param.value, weight);
        }
        else if (param.type == L2DExpressionMotion.TYPE_MULT) {
            model.multParamFloat(param.id, param.value, weight);
        }
        else if (param.type == L2DExpressionMotion.TYPE_SET) {
            model.setParamFloat(param.id, param.value, weight);
        }
    }
}
