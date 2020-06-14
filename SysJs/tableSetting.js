var kfJson = {

    colsName: {
        T151: [
            [{
                checkbox: true,
                LAY_CHECKED: false
            }, {
                type: 'numbers'

            }, {
                field: '库房名',
                title: '库房名',
                width: '20%',
                align: 'center',
                templet: '#QueryKeyColor'

            }, {
                field: '柜架号',
                title: '柜架号',
                width: '10%',
                align: 'center',
                templet: '#xmbh'
            }, {
                field: '层号',
                title: '层号',
                width: '10%',
                align: 'center',
                templet: '#xmfzr'

            }, {
                field: '分区号',
                title: '分区号',
                width: '10%',
                align: 'center'
            }, {
                field: '最大容量',
                title: '最大容量',
                width: '10%',
                align: 'center'
            }, {
                field: '现容量',
                title: '现容量',
                width: '10%',
                align: 'center'
            }, {
                field: 'project_status',
                title: '操作',
                width: '25%',
                align: 'center',
                templet: '#opeTpl'
            }, ]
        ],
        T178: {
            rklsjl: [
                [{
                        checkbox: true,
                        LAY_CHECKED: false
                    }, {
                        title: '序号',
                        type: 'numbers',

                    },
                    {
                        field: 'zt',
                        title: '记录图',
                        width: '6%',
                        align: 'center',
                        templet: "#smallPicture"
                    },
                    {
                        field: '登记号',
                        title: '原登记号',
                        width: '10%',
                        align: 'center',
                        templet: "#colorYDJH",
                    },
                    {
                        field: '文物库内编号',
                        title: '现登记号',
                        width: '10%',
                        align: 'center',
                        templet: "#colorWWKNBH",
                    },
                    {
                        field: '批次编号',
                        title: '批次编号',
                        width: '10%',
                        align: 'center'
                    },
                    {
                        field: '记录表流水号',
                        title: '记录表流水号',
                        width: '7%',
                        templet: "#colorJLLSH",
                        align: 'center',

                    }, {
                        field: '记录时间',
                        title: '记录时间',
                        width: '12%',
                        align: 'center',
                        templet: "#colorJLSJ",
                    },
                    //					{
                    //
                    //						field: '存放位置记录',
                    //						title: '存放位置',
                    //						width: '20%',
                    //						align: 'center',
                    //
                    //					},
                    {
                        field: '录入人',
                        title: '录入人',
                        width: '6%',
                        align: 'center',
                        templet: "#colorLRR",
                    },
                    {
                        field: '监督人',
                        title: '监督人',
                        width: '6%',
                        align: 'center',
                        templet: "#colorJDR",
                    },
                    {
                        field: '接收人',
                        title: '接收人',
                        width: '7%',
                        align: 'center',
                        templet: "#colorJSR",
                    },
                    {
                        field: '记录类型',
                        title: '记录类型',
                        width: '6%',
                        align: 'center',

                        templet: "#recordType",
                        templet: "#colorJLLX",
                    }, {
                        title: '操作',
                        width: '14%',
                        align: 'center',
                        templet: '#opeTpl'
                    }

                ]
            ],
            cklsjl: [
                [{
                        checkbox: true,
                        LAY_CHECKED: false,
                        width: '2%'
                    }, {
                        title: '序号',
                        type: 'numbers'
                    }, {
                        field: 'zt',
                        title: '记录图',
                        width: '6%',
                        align: 'center',
                        templet: "#smallPicture"
                    },
                    {
                        field: '登记号',
                        title: '原登记号',
                        width: '10%',
                        templet: "#colorYDJH",
                        align: 'center'
                    },
                    {
                        field: '文物库内编号',
                        title: '现登记号',
                        width: '10%',
                        templet: "#colorDJH",
                        align: 'center'
                    },
                    {
                        field: '批次编号',
                        title: '批次编号',
                        width: '10%',
                        align: 'center'
                    },
                    {
                        field: '出库去向',
                        title: '出库去向',
                        width: '6%',

                        align: 'center'
                    }, {
                        field: '记录表流水号',
                        title: '记录表流水号',
                        width: '9.5%',

                        templet: "#colorJLBLSH",
                        align: 'center'
                    }, {
                        field: '记录时间',
                        title: '记录时间',
                        width: '10%',
                        align: 'center'
                    },
                    {
                        field: '录入人',
                        title: '录入人',
                        width: '5%',
                        align: 'center',
                        templet: "#colorLRR",
                    },
                    {
                        field: '监督人',
                        title: '监督人',
                        width: '5%',
                        align: 'center',
                        templet: "#colorLRR",
                    },
                    {
                        field: '接收人',
                        title: '接收人',
                        width: '5%',
                        align: 'center',
                        templet: "#colorJSR",
                    },
                    {
                        field: '记录类型',
                        title: '记录类型',
                        width: '6%',
                        align: 'center',
                        templet: "#colorJLLX"
                    },
                    {
                        field: '操作类型',
                        title: '操作类型',
                        width: '5%',
                        align: 'center'
                    }, {
                        title: '操作',
                        width: '8.5%',
                        align: 'center',
                        templet: '#opeTpll'
                    }

                ]
            ],
            refuseList: [

                [{
                        checkbox: true,
                        LAY_CHECKED: false,
                        width: '2%'
                    }, {
                        title: '序号',
                        type: 'numbers'
                    }, {
                        field: 'zt',
                        title: '记录图',
                        width: '6%',
                        align: 'center',
                        templet: "#smallPicture"
                    }, {
                        field: '登记号',
                        title: '登记号',
                        width: '7%',
                        templet: "#colorDJH",
                        align: 'center'
                    },
                    {
                        field: '文物库内编号',
                        title: '现登记号',
                        width: '8%',
                        templet: "#colorDJH",
                        align: 'center'
                    },

                    {
                        field: '出库去向',
                        title: '出库去向',
                        width: '9%',

                        align: 'center'
                    }, {
                        field: '记录时间',
                        title: '记录时间',
                        width: '8%',
                        align: 'center'
                    },
                    {
                        field: '录入人',
                        title: '录入人',
                        width: '5%',
                        align: 'center',
                        templet: "#colorLRR",
                    },
                    {
                        field: '审核人',
                        title: '审核人',
                        width: '5%',
                        align: 'center',
                        templet: "#colorLRR",
                    },
                    {
                        field: '审核意见',
                        title: '拒绝原因',
                        width: '24.3%',
                        align: 'center',
                        templet: "#colorJSR",
                    },
                    {
                        field: '记录类型',
                        title: '记录类型',
                        width: '10%',
                        align: 'center',
                        templet: "#colorJLLX"
                    },
                    {
                        field: '操作类型',
                        title: '操作类型',
                        width: '5%',
                        align: 'center'
                    }, {
                        title: '操作',
                        width: '8%',
                        align: 'center',
                        templet: '#opeTpll'
                    }

                ]
            ],
        },


        T305: {
            wwckList: [
                [{
                        checkbox: true,
                        LAY_CHECKED: false
                    }, {
                        title: '序号',
                        type: 'numbers'
                    }, {
                        field: 'zt',
                        title: '记录图',
                        width: '7%',
                        align: 'center',
                        templet: "#smallPicture"
                    }, {
                        field: '登记名称',
                        title: '名称',
                        width: '15%',
                        align: 'center'
                    }, {
                        field: '文物库内编号',
                        title: '现登记号',
                        width: '8%',
                        align: 'center'
                    }, {
                        field: '库房名',
                        title: '库房名',
                        width: '10%',
                        align: 'center',

                    }, {
                        field: '柜架号',
                        title: '柜架号',
                        width: '10%',
                        align: 'center'
                    },
                    {
                        field: '层号',
                        title: '层号',
                        width: '10%',
                        align: 'center'
                    },
                    {
                        field: '分区号',
                        title: '分区号',
                        width: '10%',
                        align: 'center'
                    }, {
                        field: '库存状态',
                        title: '库存状态',
                        width: '5%',
                        align: 'center',
                        templet: '#kczt'
                    }, {
                        field: '',
                        title: '操作',
                        width: '19%',
                        align: 'center',
                        templet: '#opeTpl'
                    }

                ]
            ],
            drkww: [
                [{
                        checkbox: true,
                        LAY_CHECKED: false
                    }, {
                        title: '序号',
                        type: 'numbers'
                    },
                    {
                        field: 'zt',
                        title: '记录图',
                        width: '7%',
                        align: 'center',
                        templet: "#smallPicture",

                    },

                    {
                        field: '登记名称',
                        title: '文物名称',
                        width: '10%',
                        align: 'center',
                        templet: "#colorDJMC",
                    },
                    {
                        field: '现藏品总登记号',
                        title: '原登记号',
                        width: '10%',
                        align: 'center'
                    }, {
                        field: '文物库内编号',
                        title: '现登记号',
                        width: '8%',
                        align: 'center'
                    },
                    {
                        field: '文物级别',
                        title: '文物级别',
                        width: '5%',
                        align: 'center'
                    },
                    {
                        field: '文物类别_具体类别',
                        title: '文物类别',
                        width: '5%',
                        align: 'center'
                    },

                    {
                        field: '外形尺寸',
                        title: '外形尺寸',
                        width: '8%',
                        align: 'center'
                    },
                    {
                        field: '完残程度',
                        title: '完残程度',
                        width: '5%',
                        align: 'center'
                    },
                    {
                        field: '数量',
                        title: '数量',
                        width: '5%',
                        align: 'center'
                    },
                    {
                        field: '数量单位',
                        title: '单位',
                        width: '5%',
                        align: 'center'
                    },

                    {
                        field: '',
                        title: '位置',
                        width: '11.5%',
                        align: 'center',
                        templet: "#positionDisplay"

                    },
                    {
                        field: '库存状态',
                        title: '库存状态',
                        width: '5%',
                        align: 'center',
                        templet: '#kczt'
                    }, {
                        field: '',
                        title: '操作',
                        width: '10%',
                        align: 'center',
                        templet: '#opeTpl'
                    }

                ]
            ],
            dckww: [
                [{
                        checkbox: true,
                        LAY_CHECKED: false
                    }, {
                        title: '序号',
                        type: 'numbers'
                    }, {
                        field: 'zt',
                        title: '记录图',
                        width: '7%',
                        align: 'center',
                        templet: "#smallPicture"
                    }, {
                        field: '登记名称',
                        title: '文物名称',
                        width: '7.5%',
                        align: 'center',
                        templet: "#colorWWMC"
                    }, {
                        field: '登记号',
                        title: '登记号',
                        width: '6%',
                        align: 'center',
                        templet: "#colorWWKNBH"
                    }, {
                        field: '现藏品总登记号',
                        title: '原登记号',
                        width: '7%',
                        align: 'center',
                        templet: "#colorYDJH"
                    },
                    {
                        field: '文物库内编号',
                        title: '现登记号',
                        width: '7%',
                        align: 'center',
                        templet: "#colorWWKNBH"
                    },
                    {
                        field: '文物级别',
                        title: '文物级别',
                        width: '5%',
                        align: 'center',
                        templet: "#colorWWJB"
                    },
                    {
                        field: '文物类别_具体类别',
                        title: '文物类别',
                        width: '5%',
                        align: 'center',
                        templet: "#colorWWLB"
                    },

                    {
                        field: '外形尺寸',
                        title: '外形尺寸',
                        width: '8%',
                        align: 'center',
                        templet: "#colorWXCC"
                    },
                    {
                        field: '完残程度',
                        title: '完残程度',
                        width: '5%',
                        align: 'center',
                        templet: "#colorWCCD"
                    },
                    //					{
                    //						field: '数量',
                    //						title: '数量',
                    //						width: '5%',
                    //						align: 'center',
                    //						templet: "#colorSL"
                    //					},
                    {
                        field: '数量单位',
                        title: '数量单位',
                        width: '5%',
                        align: 'center',
                        templet: "#colorDW"
                    },

                    {
                        field: '',
                        title: '位置',
                        width: '8%',
                        align: 'center',
                        templet: "#positionDisplay"

                    },
                    {
                        field: '考古发掘信息_领队',
                        title: '领队',
                        width: '5%',
                        align: 'center',


                    },
                    {
                        field: '考古发掘信息_出土地点',
                        title: '出土地点',
                        width: '6%',
                        align: 'center',


                    },
                    {
                        field: '库存状态',
                        title: '库存状态',
                        width: '5%',
                        align: 'center',
                        templet: '#kczt'
                    }, {
                        field: '',
                        title: '操作',
                        width: '8%',
                        align: 'center',
                        templet: '#opeTpl'
                    }

                ]
            ],

            wwzllb: [
                [{
                        checkbox: true,
                        LAY_CHECKED: false,
                        width: '2%',
                    }, {
                        title: '序号',
                        type: 'numbers'
                    },
                    {
                        field: 'zt',
                        title: '记录图',
                        width: '7%',
                        align: 'center',
                        templet: "#smallPicture"
                    }, {
                        field: '登记名称',
                        title: '名称',
                        width: '8.5%',
                        align: 'center',
                        templet: '#colorMC'
                    },
                    {
                        field: '现藏品总登记号',
                        title: '原登记号',
                        width: '12%',
                        align: 'center',
                        templet: '#colorYDJH'
                    }, {
                        field: '文物库内编号',
                        title: '现登记号',
                        width: '7%',
                        align: 'center',
                        templet: '#colorWWKNBH'
                    },
                    //					{
                    //						field: '文物级别',
                    //						title: '文物级别',
                    //						width: '5%',
                    //						align: 'center',
                    //						templet: '#colorWWJB'
                    //					},
                    {
                        field: '文物类别_具体类别',
                        title: '文物类别',
                        width: '5%',
                        align: 'center',
                        templet: '#colorWWLB'
                    },

                    {
                        field: '外形尺寸',
                        title: '外形尺寸',
                        width: '5%',
                        align: 'center',
                        templet: '#colorWXCC'
                    },
                    {
                        field: '完残程度',
                        title: '完残程度',
                        width: '5%',
                        align: 'center',
                        templet: '#colorWCCD'
                    },
                    //					{
                    //						field: '数量',
                    //						title: '数量',
                    //						width: '5%',
                    //						align: 'center',
                    //						templet: '#colorSL'
                    //					},
                    {
                        field: '数量单位',
                        title: '单位',
                        width: '5%',
                        align: 'center',
                        templet: '#colorDW'
                    },
                    {
                        field: '考古发掘信息_领队',
                        title: '领队',
                        width: '5%',
                        align: 'center',
                        templet: '#colorLD'

                    },
                    {
                        field: '考古发掘信息_出土地点',
                        title: '出土地点',
                        width: '10%',
                        align: 'center',
                        templet: '#colorCTDD'

                    },
                    {
                        field: '',
                        title: '位置',
                        width: '8%',
                        align: 'center',
                        templet: "#positionDisplay"

                    },

                    {
                        field: '库存状态',
                        title: '库存状态',
                        width: '5%',
                        align: 'center',
                        templet: '#colorKCZT'
                    }, {
                        field: '',
                        title: '操作',
                        width: '13.2%',
                        align: 'center',
                        templet: '#opeTpl'
                    }

                ]
            ]
        },
        T141: [
            [

                {
                    checkbox: true,
                    LAY_CHECKED: false
                },

                {
                    title: '序号',
                    type: 'numbers'
                }, {
                    field: '三维名称',
                    title: '三维名称',
                    width: '20%',
                    align: 'center'
                }, {
                    field: '库房名',
                    title: '库房名',
                    width: '20%',
                    align: 'center'
                }, {
                    field: '文物库内编号',
                    title: '现登记号',
                    width: '20%',
                    align: 'center'
                }, {
                    field: '登记名称',
                    title: '登记名称',
                    width: '20%',
                    align: 'center'
                }, {
                    title: '操作',
                    width: '14.5%',
                    align: 'center',
                    templet: '#opeTpl'
                }

            ]
        ],
        T292: [
            [{
                    checkbox: true,
                    LAY_CHECKED: false
                }, {
                    title: '序号',
                    type: 'numbers',
                    width: '5%',
                }, {
                    field: '月份',
                    title: '月份',
                    width: '8%',
                    align: 'center'
                }, {
                    field: '入库',
                    title: '入库',
                    width: '8%',
                    align: 'center'
                }, {
                    field: '出库',
                    title: '出库',
                    width: '8%',
                    align: 'center'
                }, {
                    field: '文物出展',
                    title: '文物出展',
                    width: '8%',
                    align: 'center'
                }, {
                    field: '文物修复',
                    title: '文物修复',
                    width: '8%',
                    align: 'center'
                }, {
                    field: '文物拍照',
                    title: '文物拍照',
                    width: '8%',
                    align: 'center'
                }, {
                    field: '资料整理',
                    title: '资料整理',
                    width: '8%',
                    align: 'center'
                }, {
                    field: '移库',
                    title: '移库',
                    width: '8%',
                    align: 'center'
                }, {
                    field: '注销',
                    title: '注销',
                    width: '8%',
                    align: 'center'
                }, {
                    field: '移交',
                    title: '移交',
                    width: '10%',
                    align: 'center'
                }, {
                    field: '其他原因',
                    title: '其他原因',
                    width: '10%',
                    align: 'center'
                }

            ]
        ],
        T57: [ //文物属性管理
            [{
                    title: '序号',
                    type: 'numbers'
                },
                {
                    field: '统计区分',
                    title: '类别',
                    width: '17.2%',
                    align: 'center'
                },
                {
                    field: '统计项目',
                    title: '文物属性名称',
                    width: '20%',
                    align: 'center'
                }, {
                    field: '统计内容',
                    title: '文物属性内容',
                    width: '20%',
                    align: 'center'
                }, {
                    field: '统计内容简名',
                    title: '文物属性内容简名',
                    width: '20%',
                    align: 'center'
                }, {
                    field: '操作',
                    title: '操作',
                    width: '20%',
                    align: 'center',
                    templet: '#opeTpl'
                },

            ]
        ],
        T32: [ //系统日志表
            [{
                    title: '序号',
                    type: 'numbers'
                }, {
                    field: 'mUserName',
                    title: '用户名',
                    width: '7.5%',
                    align: 'center',
                    templet: '#colorYHM'
                }, {
                    field: 'mDataTime',
                    title: '时间',
                    width: '10%',
                    align: 'center',
                    templet: '#colorSJ'
                }, {
                    field: 'mUserIP',
                    title: 'IP地址',
                    width: '10%',
                    align: 'center',
                    templet: '#colorIP'
                }, {
                    field: 'mUserBehavior',
                    title: '记录行为',
                    width: '20%',
                    align: 'center',
                    templet: '#colorJLLX'
                }, {
                    field: 'mUserContent',
                    title: '统计内容',
                    width: '50%',
                    align: 'center',
                    templet: '#opeTpl'
                },

            ]
        ],
        T384: [ //系统日志表
            [{
                    title: '序号',
                    type: 'numbers'
                }, {
                    field: 'groupName',
                    title: '组名',
                    width: '95%',
                    align: 'center'
                },

            ]
        ],
        T7000: [ //用户表
            [{
                    title: '序号',
                    type: 'numbers'
                },
                {
                    field: 'mUserName',
                    title: '用户名',
                    width: '15%',
                    align: 'center',
                    templet: "#colorYHM"
                },
                {
                    field: 'realName',
                    title: '真实姓名',
                    width: '10%',
                    align: 'center',
                    templet: "#colorZSXM"
                },
                //				{
                //					field: 'storages',
                //					title: '所属库房',
                //					width: '25%',
                //					align: 'center',
                //					templet: "#colorSSKF"
                //				},
                //				{
                //					field: 'mUserLevel',
                //					title: '用户级别',
                //					width: '25%',
                //					align: 'censter',
                //					templet: "#colorYHJB"
                //				},
                {
                    field: 'Role',
                    title: '角色',
                    width: '50%',
                    align: 'center',
                    templet: "#colorJS"
                },
                {
                    title: '操作',
                    width: '22%',
                    align: 'center',
                    templet: '#opeTpl'
                },

            ]
        ],
        T195: [ //用户表
            [{
                    checkbox: true,
                    LAY_CHECKED: false
                }, {
                    title: '序号',
                    type: 'numbers'
                },
                {
                    field: '登记名称',
                    title: '登记名称',
                    width: '9%',
                    align: 'center',
                    templet: "#colorDJMC"
                },
                {
                    field: '现藏品总登记号',
                    title: '原登记号',
                    width: '8%',
                    align: 'center',
                    templet: "#colorWWKNBH"
                },
                {
                    field: '库房名',
                    title: '库房名',
                    width: '10%',
                    align: 'center',
                    templet: "#colorKFM"
                },
                {
                    field: '错误描述',
                    title: '错误描述',
                    width: '39%',
                    align: 'center',
                    templet: "#colorCWMS"
                },
                {
                    field: '申请更改时间',
                    title: '申请更改时间',
                    width: '10%',
                    align: 'center',
                    templet: "#colorGGSJ"
                },
                {
                    field: '申请人用户名',
                    title: '申请人',
                    width: '8%',
                    align: 'center',
                    templet: "#colorYHM"
                },
                {
                    field: '当前状态',
                    title: '修改状态',
                    width: '10%',
                    align: 'center',
                    templet: "#opeTpl"
                },

            ]
        ],
        T384: [ //用户表
            [{
                    title: '序号',
                    type: 'numbers',
                    width: '15%'
                },
                {
                    field: 'groupName',
                    title: '组名',
                    width: '44%',
                    align: 'center'
                },
                {
                    title: '操作',
                    width: '40%',
                    align: 'center',
                    templet: '#opeTpl'
                },

            ]
        ],
        T386: {
            djblb: [
                [{
                        checkbox: true,
                        LAY_CHECKED: false,
                        fixed: "left"
                    },
                    {
                        title: '序号',
                        type: 'numbers',
                        width: "3%",
                        fixed: "left"


                    },
                    //					{
                    //						field: '文物库内编号',
                    //						title: '现登记号',
                    //						width: '6.5%',
                    //						align: 'center',
                    //						templet: '#colorKNBH'
                    //
                    //					},
                    {
                        field: '编号',
                        title: '编号',
                        width: '10%',
                        align: 'center',
                        templet: '#colorBH',
                        fixed: "left"

                    },
                    {
                        field: '新编号',
                        title: '新编号',
                        width: '8%',
                        align: 'center',
                        templet: '#colornewBH'

                    },
                    //					{
                    //						field: '原始编号',
                    //						title: '原始编号',
                    //						width: '6%',
                    //						align: 'center'
                    //					},
                    {
                        field: '整理编号',
                        title: '整理编号',
                        width: '10%',
                        align: 'center',
                        templet: '#colorzlbh'

                    },
                    {
                        field: '拓片年度',
                        title: '拓片年度',
                        width: '5%',
                        align: 'center',
                        templet: "#colortpnd"
                    },
                    {
                        field: '文物点名称',
                        title: '文物点名称',
                        width: '10%',
                        align: 'center',
                        templet: '#colorwwdmc'
                    },
                    {
                        field: '登记名称',
                        title: '名称',
                        width: '15%',
                        align: 'center',
                        templet: '#colorMC'
                    },

                    //					{
                    //						field: '年代',
                    //						title: '年代',
                    //						width: '4%',
                    //						align: 'center',
                    //						templet: '#colorND'
                    //
                    //					},
                    //					{
                    //						field: '数量',
                    //						title: '数量',
                    //						width: '4%',
                    //						align: 'center',
                    //						templet: '#colorSL'
                    //					},
                    //					{
                    //						field: '载体一类型',
                    //						title: '类型一',
                    //						width: '5%',
                    //						align: 'center',
                    //						templet: '#colorZTYLX'
                    //					},
                    //					{
                    //						field: '载体二类型',
                    //						title: '类型二',
                    //						width: '5%',
                    //						align: 'center',
                    //						templet: '#colorZTELX'
                    //					},
                    {
                        field: '',
                        title: '类型-载体-内容',
                        width: '10%',
                        align: 'center',
                        templet: "#colorlxy"
                    },
                    {
                        field: '位置',
                        title: '位置',
                        width: '15%',
                        align: 'center',
                        templet: "#positionAdress"
                    },
                    {
                        field: '',
                        title: '存放位置',
                        width: '20%',
                        align: 'center',
                        templet: "#positionDisplay"
                    },
                    {
                        field: '库存状态',
                        title: '库存状态',
                        width: '5%',
                        align: 'center',
                        templet: '#kczt',
                        fixed: "right"
                    },
                    {
                        field: 'project_status',
                        title: '操作',
                        width: '20%',
                        align: 'center',
                        templet: '#opeTpl',
                        fixed: "right"
                    }
                ]
            ],
            dckww: [
                [{
                    checkbox: true,
                    LAY_CHECKED: false
                }, {
                    title: '序号',
                    type: 'numbers'
                }, {
                    field: '库内编号',
                    title: '库内编号',
                    width: '10%',
                    align: 'center',
                    templet: '#colorBH'
                }, {
                    field: '编号',
                    title: '编号',
                    width: '5%',
                    align: 'center',
                    templet: '#colorBH'
                }, {
                    field: '登记名称',
                    title: '名称',
                    width: '10%',
                    align: 'center',
                    templet: '#colorWWMC'
                }, {
                    field: '年代',
                    title: '年代',
                    width: '10%',
                    align: 'center',
                    templet: '#colorND'
                }, {
                    field: '调查人',
                    title: '调查人',
                    width: '10%',
                    align: 'center',
                    templet: '#colorDCR'
                }, {
                    field: '载体一类型',
                    title: '类型一',
                    width: '10%',
                    align: 'center',
                    templet: '#colorZTYI'
                }, {
                    field: '载体二类型',
                    title: '类型二',
                    width: '10%',
                    align: 'center',
                    templet: '#colorZTER'
                }, {
                    field: '载体用途',
                    title: '内容',
                    width: '10%',
                    align: 'center',
                    templet: '#colorZTYT'
                }, {
                    field: 'project_status',
                    title: '操作',
                    width: '20%',
                    align: 'center',
                    templet: '#opeTpl'
                }]
            ],
            drkww: [
                [{
                        checkbox: true,
                        LAY_CHECKED: false
                    }, {
                        title: '序号',
                        type: 'numbers'

                    },
                    {
                        field: '文物库内编号',
                        title: '现登记号',
                        width: '7%',
                        align: 'center',
                        templet: ''

                    },
                    {
                        field: '编号',
                        title: '编号',
                        width: '7%',
                        align: 'center',
                        templet: ''

                    },
                    {
                        field: '登记名称',
                        title: '名称',
                        width: '16%',
                        align: 'center',
                        templet: ''
                    },
                    {
                        field: '年代',
                        title: '年代',
                        width: '10%',
                        align: 'center',
                        templet: ''

                    },
                    {
                        field: '数量',
                        title: '数量',
                        width: '5%',
                        align: 'center'
                    },
                    {
                        field: '载体一类型',
                        title: '类型一',
                        width: '6%',
                        align: 'center'
                    },
                    {
                        field: '载体二类型',
                        title: '类型二',
                        width: '6%',
                        align: 'center'
                    },
                    {
                        field: '位置',
                        title: '位置',
                        width: '18%',
                        align: 'center',
                        templet: "#positionDisplay"
                    },

                    {
                        field: 'project_status',
                        title: '操作',
                        width: '19%',
                        align: 'center',
                        templet: '#opeTpl'
                    }
                ]
            ],
            tuTongDetail: [
                [{
                        title: '序号',
                        type: 'numbers'

                    },
                    {
                        field: '文物库内编号',
                        title: '库内编号',
                        width: '25%',
                        align: 'center',
                        templet: ''

                    },
                    {
                        field: '原始编号',
                        title: '编号',
                        width: '25%',
                        align: 'center',
                        templet: ''

                    },
                    {
                        field: '新编号',
                        title: '新编号',
                        width: '10%',
                        align: 'center',
                        templet: ''

                    },
                    {
                        field: '登记名称',
                        title: '名称',
                        width: '25%',
                        align: 'center',
                        templet: ''
                    },
                    {
                        field: '',
                        title: '操作',
                        width: '10%',
                        align: 'center',
                        templet: '#opeTpl'
                    },
                ]
            ]
        },
        T7013: [
            [{
                checkbox: true,
                LAY_CHECKED: false
            }, {

                type: 'numbers'

            }, {
                field: 'rolename',
                title: '角色名称',
                width: '20%',
                align: 'center',
                templet: '#colorJSMC'
            }, {
                field: 'miaoshu',
                title: '角色描述',
                width: '50%',
                align: 'center',
                templet: ''

            }, {
                field: '',
                title: '操作',
                width: '24%',
                align: 'center',
                templet: '#opeTpl'
            }]
        ],

        T175: [
            [{
                    field: 'sysname',
                    title: '名称',
                    width: "33%",
                    align: 'center',
                    id: 'onlynum',

                },
                {
                    field: 'sysvalue',
                    title: '数值',
                    width: "33%",
                    align: 'center',
                    id: 'onlynum',

                },

                {
                    field: '',
                    title: '操作',
                    width: "34%",
                    align: 'center',
                    id: 'onlynum',

                    templet: "#opeTpl"
                },
            ]
        ],
        tuTongCol: [
            [{
                    checkbox: true,
                    LAY_CHECKED: false
                }, {
                    title: '序号',
                    type: 'numbers'

                },
                {
                    field: '图筒编号',
                    title: '图筒编号',
                    width: "25.5%",
                    align: 'center',
                    id: 'onlynum',
                    templet: "#tuTongBH"

                },
                {
                    field: '物品库内编号',
                    title: '物品库内编号',
                    width: "25%",
                    align: 'center',
                    id: 'onlynum',

                },

                {
                    field: '物品名称',
                    title: '物品名称',
                    width: "24%",
                    align: 'center',
                    id: 'onlynum',

                },
                {
                    field: '',
                    title: '操作',
                    width: "20%",
                    align: 'center',
                    id: 'onlynum',
                    templet: "#opeTpl"
                }
            ]
        ],
        wwCol: [
            [{
                    checkbox: true,
                    LAY_CHECKED: false
                }, {
                    title: '序号',
                    type: 'numbers'

                },
                {
                    field: '物品名称',
                    title: '物品名称',
                    width: "15%",
                    align: 'center',
                    id: 'onlynum',

                },
                {
                    field: '物品库内编号',
                    title: '物品库内编号',
                    width: "15%",
                    align: 'center',
                    id: 'onlynum',

                },

                {
                    field: '柜架号',
                    title: '柜架号',
                    width: "10%",
                    align: 'center',
                    id: 'onlynum',

                },
                {
                    field: '层号',
                    title: '层号',
                    width: "10%",
                    align: 'center',
                    id: 'onlynum',

                },

                {
                    field: '分区号',
                    title: '分区号',
                    width: "10%",
                    align: 'center',
                    id: 'onlynum',

                },
                {
                    field: '最大容量',
                    title: '最大容量',
                    width: "8%",
                    align: 'center',
                    id: 'onlynum',

                },
                {
                    field: '现容量',
                    title: '现容量',
                    width: "8%",
                    align: 'center',
                    id: 'onlynum',

                },
                {
                    field: '',
                    title: '操作',
                    width: "18.2%",
                    align: 'center',
                    id: 'onlynum',
                    templet: "#opeTplww"
                }
            ]
        ],
        GetRubbingData: [

            [{
                    checkbox: true,
                    LAY_CHECKED: false
                },
                {
                    title: '序号',
                    type: 'numbers'

                }, {
                    field: '库内编号',
                    title: '库内编号',
                    width: '15%',
                    align: 'center',
                    templet: '#colorKNBH'

                },
                {
                    field: '编号',
                    title: '编号',
                    width: '7%',
                    align: 'center',
                    templet: '#colorBH'

                },

                {
                    field: '名称',
                    title: '名称',
                    width: '9%',
                    align: 'center',
                    templet: '#colorMC'
                },
                {
                    field: '年代',
                    title: '年代',
                    width: '4%',
                    align: 'center',
                    templet: '#colorND'

                },
                {
                    field: '数量',
                    title: '数量',
                    width: '4%',
                    align: 'center',
                    templet: '#colorSL'
                },
                {
                    field: '载体一类型',
                    title: '类型一',
                    width: '5%',
                    align: 'center',
                    templet: '#colorZTYLX'
                },
                {
                    field: '载体二类型',
                    title: '类型二',
                    width: '5%',
                    align: 'center',
                    templet: '#colorZTELX'
                },
                {
                    field: '位置',
                    title: '位置',
                    width: '16%',
                    align: 'center',
                    templet: "#positionAdress"
                },
                {
                    field: '是否入库',
                    title: '是否入库',
                    width: '5%',
                    align: 'center',

                },
                {
                    field: '载体用途',
                    title: '用途',
                    width: '5%',
                    align: 'center',

                },
                {
                    field: '是否已拓',
                    title: '是否已拓',
                    width: '5%',
                    align: 'center',

                },
                {
                    field: '级别',
                    title: '级别',
                    width: '9.3%',
                    align: 'center',

                },
                {
                    field: '调查人',
                    title: '调查人',
                    width: '5%',
                    align: 'center',

                },
                //					{
                //						field: 'project_status',
                //						title: '操作',
                //						width: '5%',
                //						align: 'center',
                //						templet: '#opeTpl'
                //					}
            ]

        ],
        SearchDataRepeatT305: function() {
            return this.T305.wwzllb
        },
        SearchDataRepeatT386: function() {
            return this.T386.djblb
        }
    }

}
Window.kfJson = kfJson