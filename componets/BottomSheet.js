"use strict";
exports.__esModule = true;
var react_native_1 = require("react-native");
var react_1 = require("react");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var react_native_reanimated_1 = require("react-native-reanimated");
var SCREEN_HEIGHT = react_native_1.Dimensions.get('window').height;
var MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;
var BottomSheet = react_1["default"].forwardRef(function (_a, ref) {
    var children = _a.children;
    var translateY = (0, react_native_reanimated_1.useSharedValue)(0);
    var active = (0, react_native_reanimated_1.useSharedValue)(false);
    var scrollTo = (0, react_1.useCallback)(function (destination) {
        'worklet';
        active.value = destination !== 0;
        translateY.value = (0, react_native_reanimated_1.withSpring)(destination, { damping: 50 });
    }, []);
    var isActive = (0, react_1.useCallback)(function () {
        return active.value;
    }, []);
    (0, react_1.useImperativeHandle)(ref, function () { return ({ scrollTo: scrollTo, isActive: isActive }); }, [
        scrollTo,
        isActive,
    ]);
    var context = (0, react_native_reanimated_1.useSharedValue)({ y: 0 });
    var gesture = react_native_gesture_handler_1.Gesture.Pan()
        .onStart(function () {
        context.value = { y: translateY.value };
    })
        .onUpdate(function (event) {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    })
        .onEnd(function () {
        if (translateY.value > -SCREEN_HEIGHT / 3) {
            scrollTo(0);
        }
        else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
            scrollTo(MAX_TRANSLATE_Y);
        }
    });
    var rBottomSheetStyle = (0, react_native_reanimated_1.useAnimatedStyle)(function () {
        var borderRadius = (0, react_native_reanimated_1.interpolate)(translateY.value, [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y], [25, 5], react_native_reanimated_1.Extrapolate.CLAMP);
        return {
            borderRadius: borderRadius,
            transform: [{ translateY: translateY.value }]
        };
    });
    return (<react_native_gesture_handler_1.GestureDetector gesture={gesture}>
        <react_native_reanimated_1.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
          <react_native_1.View style={styles.line}/>
          {children}
        </react_native_reanimated_1.View>
      </react_native_gesture_handler_1.GestureDetector>);
});
var styles = react_native_1.StyleSheet.create({
    bottomSheetContainer: {
        height: SCREEN_HEIGHT,
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        top: SCREEN_HEIGHT,
        borderRadius: 25
    },
    line: {
        width: 75,
        height: 4,
        backgroundColor: 'grey',
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 2
    }
});
exports["default"] = BottomSheet;
