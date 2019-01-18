package com.zhou.entity.sys;

import lombok.Data;

import java.lang.*;
import java.math.*;
import java.io.*;
import java.util.*;

import lombok.Getter;
import lombok.Setter;
import com.zhou.entity.BaseEntity;

@Setter
@Getter
public class SysUserRole extends BaseEntity implements Serializable {
    private Long id;//

    private Long userId;//

    private Long roleId;//

    private Long[] ids;


}

