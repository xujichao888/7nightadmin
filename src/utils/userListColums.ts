export const columns = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: 100,
        slots: {
            customRender: 'id'
        },
    },
    {
        title: "手机号",
        dataIndex: "tel",
        key: "tel",
        width: 120,
    },
    {
        title: "微信登录",
        dataIndex: "wechatLogin",
        key: "wechatLogin",
        width: 120,
        slots: {
            customRender: 'wechatLogin'
        },
    },
    {
        title: "苹果登录",
        dataIndex: "appleLogin",
        key: "appleLogin",
        width: 120,
        slots: {
            customRender: 'appleLogin'
        },
    },
    {
        title: "性别",
        dataIndex: "sex",
        key: "sex",
        width: 60
    },
    {
        title: "会员级别",
        dataIndex: "vipLevel",
        key: "vipLevel",
        width: 120
    },
    {
        title: "当前余额",
        dataIndex: "availableMoney",
        key: "availableMoney",
        width: 120,
        slots: {
            customRender: 'availableMoney'
        },
    },
    {
        title: "当前次数",
        dataIndex: "availableNum",
        key: "availableNum",
        width: 120,
        slots: {
            customRender: 'availableNum'
        },
    },
    {
        title: "对应客服",
        dataIndex: "customer",
        key: "customer",
        width: 120
    },
    {
        title: "累计消费总额",
        dataIndex: "allPayNum",
        key: "allPayNum",
        width: 120
    },
    {
        title: "注册时间",
        dataIndex: "setInTime",
        key: "setInTime",
        width: 120
    },
    {
        title: "最后登录时间",
        dataIndex: "lastLoginTime",
        key: "lastLoginTime",
        width: 120
    },
    {
        title: "操作",
        dataIndex: "setting",
        key: "setting",
        width: 120,
        slots: {
            customRender: 'setting'
        },
    },
];