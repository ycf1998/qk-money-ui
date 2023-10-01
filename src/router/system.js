import Layout from "@/layouts/DashboardLayout.vue";

export default import.meta.env.VITE_ONLY_UI ? [
    {
        path: '/system',
        component: Layout,
        meta: {
            "title": "系统管理",
            "icon": "sys-manage"
        },
        children: [
            {
                path: 'user',
                name: 'SysUser',
                component: () => import('@/views/system/user/index.vue'),
                meta: {
                    "title": "用户管理",
                    "icon": "sys-user"
                }
            },
            {
                path: 'role',
                name: 'SysRole',
                component: () => import('@/views/system/role/index.vue'),
                meta: {
                    "title": "角色管理",
                    "icon": "sys-role"
                }
            },
            {
                path: 'permission',
                name: 'SysPermission',
                component: () => import('@/views/system/permission/index.vue'),
                meta: {
                    "title": "权限管理",
                    "icon": "sys-permission"
                }
            },
            {
                path: 'dict',
                name: 'SysDict',
                component: () => import('@/views/system/dict/index.vue'),
                meta: {
                    "title": "字典管理",
                    "icon": "sys-dict"
                }
            },
            {
                path: 'tenant',
                name: 'SysTenant',
                component: () => import('@/views/system/tenant/index.vue'),
                meta: {
                    "title": "租户管理",
                    "icon": "sys-tenant"
                }
            }
        ]
    },
] : []