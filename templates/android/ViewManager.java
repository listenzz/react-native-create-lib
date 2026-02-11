package {{packageIdentifier}};

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIManagerHelper;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.ViewManagerDelegate;
import com.facebook.react.uimanager.events.EventDispatcher;
import com.facebook.react.viewmanagers.{{className}}ViewManagerDelegate;
import com.facebook.react.viewmanagers.{{className}}ViewManagerInterface;

import java.util.Map;

public class {{className}}ViewManager extends ViewGroupManager<{{className}}View>
	implements {{className}}ViewManagerInterface<{{className}}View> {
	private final {{className}}ViewManagerDelegate<{{className}}View, {{className}}ViewManager> mDelegate = new {{className}}ViewManagerDelegate<>(this);
	private static final String REACT_CLASS = "{{className}}View";

	@Override
	protected ViewManagerDelegate<{{className}}View> getDelegate() {
		return mDelegate;
	}

	@NonNull
	@Override
	public String getName() {
		return REACT_CLASS;
	}

	@NonNull
	@Override
	protected {{className}}View createViewInstance(@NonNull ThemedReactContext reactContext) {
		return new {{className}}View(reactContext);
	}

	// TODO: Add property setters
	// Example:
	// @Override
	// public void setSampleProperty({{className}}View view, @Nullable String value) {
	// 	view.setSampleProperty(value);
	// }

	// TODO: Add command handlers
	// Example:
	// @Override
	// public void sampleMethod({{className}}View view) {
	// 	view.sampleMethod();
	// }

	@Override
	protected void onAfterUpdateTransaction(@NonNull {{className}}View view) {
		super.onAfterUpdateTransaction(view);
		// TODO: Call view initialization if needed
		// view.initProperties();
	}

	@Nullable
	@Override
	public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
		// TODO: Add event names
		// return MapBuilder.of(
		// 	On{{className}}Event.Name, MapBuilder.of("registrationName", On{{className}}Event.JSEventName)
		// );
		return null;
	}

	@Override
	protected void addEventEmitters(@NonNull ThemedReactContext reactContext, @NonNull {{className}}View view) {
		super.addEventEmitters(reactContext, view);
		// TODO: Set up event emitters
		// Example:
		// view.setOn{{className}}EventListener((data) -> {
		// 	int surfaceId = UIManagerHelper.getSurfaceId(reactContext);
		// 	int viewId = view.getId();
		// 	EventDispatcher eventDispatcher = UIManagerHelper.getEventDispatcherForReactTag(reactContext, viewId);
		// 	if (eventDispatcher != null) {
		// 		On{{className}}Event event = new On{{className}}Event(surfaceId, viewId, data);
		// 		eventDispatcher.dispatchEvent(event);
		// 	}
		// });
	}
}
