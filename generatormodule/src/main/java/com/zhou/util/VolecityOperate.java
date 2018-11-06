package com.zhou.util;

import com.zhou.strategy.PackageStrategy;
import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.Velocity;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.runtime.RuntimeConstants;
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

public class VolecityOperate {

    public static void loadTemplateToInit(List<List<String>> list, String className, List<String> vmList, String tableName,
                                          List<String> columnList, List<String> fieldList, Map<String, String> columnFieldmap, String tableSchem, Map<String, String> fieldRemarks) {
        VelocityEngine ve = new VelocityEngine();
        ve.setProperty(RuntimeConstants.RESOURCE_LOADER, "classpath");
        ve.setProperty(Velocity.ENCODING_DEFAULT, "UTF-8");
        ve.setProperty(Velocity.INPUT_ENCODING, "UTF-8");
        ve.setProperty(Velocity.OUTPUT_ENCODING, "UTF-8");
        ve.setProperty("classpath.resource.loader.class", ClasspathResourceLoader.class.getName());
        ve.init();
        String outPath = "";
        try {
            outPath = ResourceUtils.getURL("classpath:static/").getPath().concat("\\\\out\\\\");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        if (vmList.size() > 0) {
            PrintWriter writer = null;
            for (int i = 0; i < vmList.size(); i++) {
                String valP = vmList.get(i);
                String targetPath = valP.substring(0, valP.lastIndexOf("\\\\") + 2);
                String vmFileName = valP.substring(valP.lastIndexOf("\\\\") + 2, valP.lastIndexOf("."));
                String targetClass = targetPath.concat(className.concat(vmFileName));

                Template t = ve.getTemplate(vmList.get(i));

                VelocityContext ctx = new VelocityContext();
                List<List<String>> m = list;

                ctx.put("className", className);
                ctx.put("list", m);
                ctx.put("tableName", tableName);
                ctx.put("entityP", PackageStrategy.ENTITY);
                ctx.put("mapperP", PackageStrategy.MAPPER);
                ctx.put("serviceP", PackageStrategy.SERVICE);
                ctx.put("serviceImplP", PackageStrategy.SERVICE_IMPL);
                ctx.put("controllerP", PackageStrategy.CONTROLLER);

                ctx.put("columnFieldmap", columnFieldmap);
                ctx.put("fieldRemarks", fieldRemarks);
                ctx.put("columnList", columnList);
                ctx.put("fieldList", fieldList);

                ctx.put("tableSchem", tableSchem);

                String rootPath = outPath.concat(targetClass);
                File file = new File(rootPath);
                if (!file.getParentFile().exists()) {
                    file.getParentFile().mkdirs();
                }
                try {
                    file.createNewFile();
                } catch (IOException e) {
                    e.printStackTrace();
                }
                try {
                    writer = new PrintWriter(rootPath);
                    t.merge(ctx, writer);
                    writer.flush();
                } catch (FileNotFoundException e) {
                    e.printStackTrace();
                } finally {

                }
            }
            writer.close();

        }

    }

}
