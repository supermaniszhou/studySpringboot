package com.zhou.util;

import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.LinkedList;
import java.util.List;

public class FileUtil {

    private List<String> list2=new LinkedList<>();

    public List<String> getList2() {
        return list2;
    }

    public void setList2(List<String> list2) {
        this.list2 = list2;
    }

    public FileUtil() {
        try {
            File path = new File(ResourceUtils.getURL("classpath:static/template/").getPath());
            File[] files = path.listFiles();
            tofileList(files);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

    }

    public void tofileList(File[] files) {

        for (File f : files) {
            if (f.isDirectory()) {
                tofileList(f.listFiles());
            } else {
                String path = f.getAbsolutePath();
                String p = path.substring(path.indexOf("static")).toString();
                String place=p.replaceAll("\\\\","\\\\\\\\");
                list2.add(place);
            }

        }

    }
}
