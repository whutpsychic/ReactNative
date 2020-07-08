
//测试用接收器
package com.rtzl_smapp;

import android.widget.Toast;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import java.util.Objects;

public class MyReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        if(Objects.equals(intent.getAction(), "CCJJQ"))
            Toast.makeText(context,"cccq",Toast.LENGTH_SHORT).show();
    }
}