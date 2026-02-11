package {{packageIdentifier}};

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactHost;
import com.facebook.react.defaults.DefaultReactHost;

public class {{className}}Module extends Native{{className}}Spec {

    private final ReactApplicationContext reactContext;
    private final ReactHost reactHost;

    public {{className}}Module(ReactApplicationContext reactContext, ReactNativeHost reactNativeHost) {
        super(reactContext);
        this.reactContext = reactContext;
        this.reactHost = DefaultReactHost.getDefaultReactHost(reactContext, reactNativeHost, null);
    }

    @NonNull
    @Override
    public String getName() {
        return "{{classNameWithPrefix}}";
    }

    @Override
    public void sampleMethod(String str, double num, com.facebook.react.bridge.Promise promise) {
        // TODO: Implement some actually useful functionality
        promise.resolve("Received num: " + num + " str: " + str);
    }
}
