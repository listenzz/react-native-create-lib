package {{packageIdentifier}};

import androidx.annotation.NonNull;

{{packageImports}}

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

public class {{className}}Package implements ReactPackage {

	private final ReactNativeHost reactNativeHost;

	public {{className}}Package(ReactNativeHost reactNativeHost) {
		this.reactNativeHost = reactNativeHost;
	}

    @NonNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactContext) {
        {{nativeModulesCode}}
    }

    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
        {{viewManagersCode}}
    }
}
