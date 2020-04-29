package com.honeywell.honeywellscansdk;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.MotionEvent;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.honeywell.aidc.AidcManager;
import com.honeywell.aidc.BarcodeFailureEvent;
import com.honeywell.aidc.BarcodeReadEvent;
import com.honeywell.aidc.BarcodeReader;
import com.honeywell.aidc.ScannerUnavailableException;
import com.honeywell.aidc.TriggerStateChangeEvent;

import org.w3c.dom.Text;

import java.util.Date;

public class MainActivity extends AppCompatActivity implements BarcodeReader.TriggerListener,BarcodeReader.BarcodeListener {


AidcManager manager;
    BarcodeReader barcodeReader;
    TextView textView;
    TextView textView2;
    EditText editText;
    Button button1;
    public String BarcodeData;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);
        textView=(TextView)findViewById(R.id.textView);
        textView2=(TextView)findViewById(R.id.textView2);
        editText=(EditText)findViewById(R.id.editText);
        button1=(Button)findViewById(R.id.button);

        ButtonListener b = new ButtonListener();
        button1.setOnTouchListener(b);


        AidcManager.create(this, new AidcManager.CreatedCallback() {
            @Override
            public void onCreated(AidcManager aidcManager) {
                manager = aidcManager;
                barcodeReader = manager.createBarcodeReader();
                try {
                    //true 启动，false禁用码制
                    barcodeReader.setProperty(BarcodeReader.PROPERTY_CODE_128_ENABLED,true);
                    barcodeReader.setProperty(BarcodeReader.PROPERTY_EAN_13_ENABLED,false);

                    //设置按键扫描
                    barcodeReader.setProperty(BarcodeReader.PROPERTY_TRIGGER_CONTROL_MODE,BarcodeReader.TRIGGER_CONTROL_MODE_CLIENT_CONTROL);

                    //必须，启动SCANNER
                    barcodeReader.claim();
                    //
                }catch (Exception e)
                {
                    Toast.makeText(MainActivity.this,"设置失败",Toast.LENGTH_SHORT).show();
                }

                barcodeReader.addBarcodeListener(MainActivity.this);
                barcodeReader.addTriggerListener(MainActivity.this);

            }
        });

    }
    class ButtonListener implements View.OnClickListener, View.OnTouchListener {

        public void onClick(View v) {
            if(v.getId() == R.id.button){
            }
        }

        public boolean onTouch(View v, MotionEvent event) {
            if(v.getId() == R.id.button){
                if(event.getAction() == MotionEvent.ACTION_UP){
                    try{
                        //关闭补光
                        barcodeReader.light(false);
                        //关闭瞄准
                        barcodeReader.aim(false);
                        //关闭解码
                        barcodeReader.decode(false);

                    }catch (Exception e)
                    {
                        Toast.makeText(MainActivity.this,"关闭扫描失败",Toast.LENGTH_SHORT).show();
                    }
                }
                if(event.getAction() == MotionEvent.ACTION_DOWN){
                    try{
                        //开启补光
                        barcodeReader.light(true);
                        //开启瞄准
                        barcodeReader.aim(true);
                        //开启解码
                        barcodeReader.decode(true);
                    }catch (Exception e)
                    {
                        Toast.makeText(MainActivity.this,"关闭扫描失败",Toast.LENGTH_SHORT).show();
                    }
                }
            }
            return false;
        }

    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {
//        if(event.getAction()==MotionEvent.ACTION_DOWN){
//            try{
//                //开启补光
//                barcodeReader.light(true);
//                //开启瞄准
//                barcodeReader.aim(true);
//                //开启解码
//                barcodeReader.decode(true);
//            }catch (Exception e)
//            {
//                Toast.makeText(MainActivity.this,"关闭扫描失败",Toast.LENGTH_SHORT).show();
//            }
//        }
//        //抬起操作
//        if(event.getAction()==MotionEvent.ACTION_UP){
//            try{
//                //关闭补光
//                barcodeReader.light(false);
//                //关闭瞄准
//                barcodeReader.aim(false);
//                //关闭解码
//                 barcodeReader.decode(false);
//
//            }catch (Exception e)
//            {
//                Toast.makeText(MainActivity.this,"关闭扫描失败",Toast.LENGTH_SHORT).show();
//            }
//        }
        return super.onTouchEvent(event);
    }

    //处理扫描事件和条码事件，再扫描事件中实现开关补光
    @Override
    public void onBarcodeEvent(BarcodeReadEvent barcodeReadEvent) {
        //获取扫描头数据
        BarcodeData = barcodeReadEvent.getBarcodeData();

        //运行UI线程，给UI界面元素赋值
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                //Toast.makeText(MainActivity.this,BarcodeData,Toast.LENGTH_SHORT).show();
                editText.setText(new Date().toString());
                // textView.setText(BarcodeData);
                textView2.setText(textView2.getText()+BarcodeData);
                try{
                    //开启补光
                    //barcodeReader.light(true);
                    //开启瞄准
                    //barcodeReader.aim(true);
                    //开启解码
                    //barcodeReader.decode(true);
                }catch (Exception e)
                {
                    Toast.makeText(MainActivity.this,"关闭扫描失败",Toast.LENGTH_SHORT).show();
                }
            }
        });
    }

    @Override
    public void onFailureEvent(BarcodeFailureEvent barcodeFailureEvent) {

    }

    @Override
    public void onTriggerEvent(TriggerStateChangeEvent triggerStateChangeEvent) {
        if(triggerStateChangeEvent.getState()==true)
        {
        try{
            //开启补光
            barcodeReader.light(true);
            //开启瞄准
            barcodeReader.aim(true);
            //开启解码
            barcodeReader.decode(true);
        }catch (Exception e)
        {
            Toast.makeText(MainActivity.this,"开启扫描失败",Toast.LENGTH_SHORT).show();
        }

        }else if(triggerStateChangeEvent.getState()==false)
        {

            try{
                //关闭补光
               barcodeReader.light(false);
                //关闭瞄准
                barcodeReader.aim(false);
                //关闭解码
               barcodeReader.decode(false);

            }catch (Exception e)
            {
                Toast.makeText(MainActivity.this,"关闭扫描失败",Toast.LENGTH_SHORT).show();
            }

        }
    }

    //最小化后要挂起扫描头监听
    @Override
    protected void onPause() {
        super.onPause();
        if(barcodeReader != null) {
            barcodeReader.release();
        }
    }

    //恢复之后启动扫描监听
    @Override
    protected void onResume() {
        super.onResume();
        if(barcodeReader != null)
        {

            try {
                barcodeReader.claim();
            } catch (ScannerUnavailableException e) {

                Toast.makeText(MainActivity.this,"设置失败",Toast.LENGTH_SHORT).show();
            }
        }
    }

    @Override
    //释放扫描头
    protected void onDestroy() {
        super.onDestroy();
        if(barcodeReader !=null)
        {
            //移除监听事件
            barcodeReader.removeBarcodeListener(this);
            barcodeReader.removeTriggerListener(this);
            //关闭扫描头
            barcodeReader.close();

        }
    }
}
