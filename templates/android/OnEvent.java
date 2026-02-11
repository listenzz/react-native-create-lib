package {{packageIdentifier}};

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.Event;

public class On{{className}}Event extends Event<On{{className}}Event> {
	public static final String Name = "top{{className}}";
	public static final String JSEventName = "on{{className}}";

	// TODO: Add event payload fields
	// Example:
	// private final String data;

	public On{{className}}Event(int surfaceId, int viewTag) {
		super(surfaceId, viewTag);
		// TODO: Initialize event payload
		// Example:
		// this.data = data;
	}

	@NonNull
	@Override
	public String getEventName() {
		return Name;
	}

	@Nullable
	@Override
	protected WritableMap getEventData() {
		WritableMap event = Arguments.createMap();
		// TODO: Add event data
		// Example:
		// event.putString("data", data);
		return event;
	}
}
