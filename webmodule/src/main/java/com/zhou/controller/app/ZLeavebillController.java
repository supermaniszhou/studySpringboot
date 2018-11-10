package com.zhou.controller.app;

import com.zhou.common.base.BaseController;
import com.zhou.entity.app.ZLeavebill;
import com.zhou.entity.sys.SysUser;
import com.zhou.service.app.ZLeavebillService;
import com.zhou.util.GenerateUUID;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/12/25 0025.
 */
@RestController
@RequestMapping("/zLeavebill")
public class ZLeavebillController extends BaseController {
    @Autowired
    private ZLeavebillService zLeavebillService;

    @Autowired
    private RedisTemplate<String, Object> template;


    @RequestMapping(value = "/toZLeavebillList")
    public ModelAndView toZLeavebillList(Model model) {
        return new ModelAndView(VIEW_PATH + "app/zLeavebill/ZLeavebill_list");
    }

    @RequestMapping("/getZLeavebillData")
    @ResponseBody
    public Map<String, Object> getZLeavebillData(@RequestParam(value = "pageSize", required = false) int pageSize,
                                                 @RequestParam(value = "pageIndex", required = false) int pageIndex) {

        Map<String, Object> map = new HashedMap();
        ZLeavebill zLeavebill = new ZLeavebill();
        int count = zLeavebillService.queryCount(zLeavebill);
        List<ZLeavebill> list = zLeavebillService.queryList(zLeavebill, pageIndex, pageSize);

        map.put("total", count);
        map.put("rows", list);
        return map;
    }


    @RequestMapping(value = "/doAdd")
    @ResponseBody
    public Map<String, Object> doAdd(HttpServletRequest request, ZLeavebill zLeavebill) {
        String userId = (String) request.getSession().getAttribute("userId");
        try {
            SysUser sysUser = null;
            if (null != userId) {
                ValueOperations<String, Object> ov = template.opsForValue();
                //redis 查询操作
                sysUser = (SysUser) ov.get(userId);
            }
            if (null != sysUser) {
                zLeavebill.setUserId(Integer.toString(sysUser.getId()));
                zLeavebill.setUserName(sysUser.getRealname());
            }
            zLeavebill.setId(GenerateUUID.getUUID());
            zLeavebillService.addObj(zLeavebill);
        } catch (Exception e) {
            e.printStackTrace();
            return error();
        }
        return success();
    }

    @RequestMapping(value = "toEdit")
    @ResponseBody
    public Map<String, Object> toEdit(@RequestParam(value = "id") String id, @RequestParam("flag") String flag) {
        ZLeavebill zLeavebill = null;
        try {
            ZLeavebill obj = new ZLeavebill();
            obj.setId((id));
            zLeavebill = (ZLeavebill) zLeavebillService.queryObj(obj);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return responseTo(SUCCESS_FLAG, SUCCESS_MSG, zLeavebill, flag);
    }

    @RequestMapping(value = "doEdit")
    @ResponseBody
    public Map<String, Object> doEdit(ZLeavebill zLeavebill) {
        try {
            zLeavebillService.updateObj(zLeavebill);
        } catch (Exception e) {
            e.printStackTrace();
            return error();
        }
        return success();
    }

    @RequestMapping(value = "doDel")
    @ResponseBody
    public Map<String, Object> doDel(@RequestParam(value = "id", required = true) String id) {
        try {
            ZLeavebill zLeavebill = new ZLeavebill();
            zLeavebill.setId(id);
            zLeavebillService.deleteObj(zLeavebill);
        } catch (Exception e) {
            e.printStackTrace();
            return error();
        }
        return success();
    }
}