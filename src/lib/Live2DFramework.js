
//============================================================
//============================================================
//  class Live2DFramework
//============================================================
//============================================================
function Live2DFramework() {
}

//============================================================
Live2DFramework.platformManager = null;

//============================================================
//    static Live2DFramework.getPlatformManager()
//============================================================
Live2DFramework.getPlatformManager = function () {
    return Live2DFramework.platformManager;
}

//============================================================
//    static Live2DFramework.setPlatformManager()
//============================================================
Live2DFramework.setPlatformManager = function (platformManager /*IPlatformManager*/) {
    Live2DFramework.platformManager = platformManager;
}
