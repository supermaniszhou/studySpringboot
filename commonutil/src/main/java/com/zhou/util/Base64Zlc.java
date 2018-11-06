package com.zhou.util;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

public class Base64Zlc {

    //加密
    public static String encodeString(String info) {
        BASE64Encoder base64Encoder = new BASE64Encoder();
        String result = "";
        try {
            result = base64Encoder.encode(info.getBytes("UTF-8"));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return result;
    }

    //解密
    public static String decodeString(String info) {
        BASE64Decoder base64Decoder = new BASE64Decoder();
        String re = null;
        try {
            re = new String(base64Decoder.decodeBuffer(info), "utf-8");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return re;
    }
}
