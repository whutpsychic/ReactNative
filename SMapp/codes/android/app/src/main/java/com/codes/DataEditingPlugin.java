package com.test;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

/**
 * This handles the Data Editing intent
 */
public class DataEditingPlugin extends BroadcastReceiver {
    private final static String TAG = "DataEditingPlugin";
    private static final String INTENT_ACTION_EDIT_DATA = "com.codes.intent.action.TAIJI";
    private static final String INTENT_ACTION_SCAN_RESULT = "com.honeywell.tools.action.scan_result";

    @Override
    public void onReceive(final Context context, Intent intent) {
        if (INTENT_ACTION_EDIT_DATA.equals(intent.getAction())) {
            int version = intent.getIntExtra("version", 0);

            // Only the extra string "data" is available
            String data = intent.getStringExtra("data");   

            Intent scanResultIntent = new Intent(INTENT_ACTION_SCAN_RESULT);
            scanResultIntent.putExtra("decode_rslt", data);
            context.sendBroadcast(scanResultIntent);
        }
    }
}
