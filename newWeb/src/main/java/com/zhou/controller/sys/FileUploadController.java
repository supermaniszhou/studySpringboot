package com.zhou.controller.sys;

import com.zhou.common.base.BaseController;
import com.zhou.util.FormatDateUtil;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping(value = "/fileUpload")
public class FileUploadController extends BaseController {

    @RequestMapping(value = "/toUpload")
    public ModelAndView toUpload() {
        return new ModelAndView(VIEW_PATH + "old/file_upload");
    }


    @RequestMapping(value = "/doUploadFile")
    public Map<String, Object> doUploadFile(HttpServletRequest request, @RequestParam("fileName") String fileName) {
        MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest) request;
        Map<String, MultipartFile> map = multipartHttpServletRequest.getFileMap();

        String ymd= FormatDateUtil.dateToString(new Date(),"yyyyMM");
        try {
            for (Map.Entry<String, MultipartFile> entry : map.entrySet()) {
                //获取文件名称
                MultipartFile file=entry.getValue();
                String originalFileName=file.getOriginalFilename();
                //文件后缀
                String fileSufix=originalFileName.substring(originalFileName.lastIndexOf(".") + 1).toLowerCase();

                //系统文件名
                String newFileName=FormatDateUtil.dateToString(new Date(), "yyyyMMddHHmmssSSS").concat(".").concat(fileSufix);

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return success();
    }

}
