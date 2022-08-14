
exports.__esModule = true;
var expo_status_bar_1 = require("expo-status-bar");
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var BottomSheet_1 = require("./components/BottomSheet");
function App() {
    var ref = (0, react_1.useRef)(null);
    var onPress = (0, react_1.useCallback)(function () {
        var _a, _b, _c;
        var isActive = (_a = ref === null || ref === void 0 ? void 0 : ref.current) === null || _a === void 0 ? void 0 : _a.isActive();
        if (isActive) {
            (_b = ref === null || ref === void 0 ? void 0 : ref.current) === null || _b === void 0 ? void 0 : _b.scrollTo(0);
        }
        else {
            (_c = ref === null || ref === void 0 ? void 0 : ref.current) === null || _c === void 0 ? void 0 : _c.scrollTo(-200);
        }
    }, []);
    return (<react_native_gesture_handler_1.GestureHandlerRootView style={{ flex: 1 }}>
      <react_native_1.View style={styles.container}>
        <expo_status_bar_1.StatusBar style="light"/>
        <react_native_1.TouchableOpacity style={styles.button} onPress={onPress}/>
        <BottomSheet_1 ref={ref}>
          <react_native_1.View style={{ flex: 1, backgroundColor: 'orange' }}/>
        </BottomSheet_1>
      </react_native_1.View>
    </react_native_gesture_handler_1.GestureHandlerRootView>);
}
exports["default"] = App;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        height: 50,
        borderRadius: 25,
        aspectRatio: 1,
        backgroundColor: 'white',
        opacity: 0.6
    }
});
